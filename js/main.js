const gamesGrid = document.getElementById("gamesGrid");
const loadingBox = document.getElementById("loadingBox");
const errorBox = document.getElementById("errorBox");
const platformSelect = document.getElementById("platformSelect");
const sortSelect = document.getElementById("sortSelect");
const categoryLinks = document.querySelectorAll(".category-link");
const activeCategoryLabel = document.getElementById("activeCategoryLabel");

let currentCategory = "";

function showLoading() {
  loadingBox.classList.remove("d-none");
  gamesGrid.innerHTML = "";
  errorBox.classList.add("d-none");
}

function hideLoading() {
  loadingBox.classList.add("d-none");
}

function showError(message) {
  errorBox.classList.remove("d-none");
  errorBox.querySelector(".alert").textContent = message;
}

function renderGames(games) {
  gamesGrid.innerHTML = "";

  if (!games || games.length === 0) {
    showError("No games match this selection right now.");
    return;
  }

  games.forEach(function (game) {
    const cardHtml = `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="game-card">
          <img src="${game.thumbnail}" alt="${game.title}">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <div class="d-flex flex-wrap gap-2 my-2">
              <span class="tag-badge">${game.genre}</span>
              <span class="tag-badge">${game.platform}</span>
            </div>
            <a href="details.html?id=${game.id}" class="btn btn-accent w-100 mt-2">
              Game Details
            </a>
          </div>
        </div>
      </div>
    `;
    gamesGrid.insertAdjacentHTML("beforeend", cardHtml);
  });
}

async function loadGames() {
  showLoading();

  const platform = platformSelect.value;
  const sortBy = sortSelect.value;

  try {
    const games = await getGamesFiltered(platform, currentCategory, sortBy);
    renderGames(games);
  } catch (error) {
    showError("An error occurred while loading games. Check the API Key in api.js");
    console.error(error);
  } finally {
    hideLoading();
  }
}

categoryLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    categoryLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    currentCategory = link.dataset.category;

    const labelText = currentCategory === "" ? "All" : link.textContent.trim();
    activeCategoryLabel.textContent = "Category: " + labelText;

    loadGames();
  });
});

platformSelect.addEventListener("change", loadGames);
sortSelect.addEventListener("change", loadGames);

loadGames();
