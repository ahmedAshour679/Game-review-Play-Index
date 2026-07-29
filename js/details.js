const loadingBox = document.getElementById("loadingBox");
const errorBox = document.getElementById("errorBox");
const detailsContent = document.getElementById("detailsContent");

function getGameIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderGameDetails(game) {
  document.getElementById("gameThumbnail").src = game.thumbnail;
  document.getElementById("gameThumbnail").alt = game.title;

  document.getElementById("gameTitle").textContent = game.title;

  document.getElementById("gameGenre").textContent = game.genre;
  document.getElementById("gamePlatform").textContent = game.platform;
  document.getElementById("gamePublisher").textContent = game.publisher;
  document.getElementById("gameReleaseDate").textContent = game.release_date;

  document.getElementById("gameDescription").textContent = game.description;

  document.getElementById("gameLink").href = game.game_url;

  renderScreenshots(game.screenshots);
  renderRequirements(game.minimum_system_requirements);

  detailsContent.classList.remove("d-none");
}

function renderScreenshots(screenshots) {
  const screenshotsRow = document.getElementById("screenshotsRow");
  screenshotsRow.innerHTML = "";

  if (!screenshots || screenshots.length === 0) {
    screenshotsRow.innerHTML = "<p class='text-muted'>No screenshots available for this game.</p>";
    return;
  }

  screenshots.forEach(function (shot) {
    const shotHtml = `
      <div class="col-6 col-md-4 col-lg-3">
        <img src="${shot.image}" alt="Game screenshot" class="screenshot-thumb">
      </div>
    `;
    screenshotsRow.insertAdjacentHTML("beforeend", shotHtml);
  });
}

function renderRequirements(requirements) {
  const requirementsBox = document.getElementById("requirementsBox");

  if (!requirements) {
    requirementsBox.innerHTML = "<p class='mb-0'>No system requirements information available.</p>";
    return;
  }

  requirementsBox.innerHTML = `
    <p class="mb-1"><strong>OS:</strong> ${requirements.os || "Not available"}</p>
    <p class="mb-1"><strong>Processor:</strong> ${requirements.processor || "Not available"}</p>
    <p class="mb-1"><strong>Memory:</strong> ${requirements.memory || "Not available"}</p>
    <p class="mb-1"><strong>Graphics:</strong> ${requirements.graphics || "Not available"}</p>
    <p class="mb-0"><strong>Storage:</strong> ${requirements.storage || "Not available"}</p>
  `;
}

async function loadGameDetails() {
  const gameId = getGameIdFromUrl();

  if (!gameId) {
    loadingBox.classList.add("d-none");
    errorBox.classList.remove("d-none");
    errorBox.querySelector(".alert").textContent = "No game was specified. Go back to the home page and choose a game.";
    return;
  }

  try {
    const game = await getGameById(gameId);
    renderGameDetails(game);
  } catch (error) {
    errorBox.classList.remove("d-none");
    errorBox.querySelector(".alert").textContent = "An error occurred while loading the game details.";
    console.error(error);
  } finally {
    loadingBox.classList.add("d-none");
  }
}

loadGameDetails();
