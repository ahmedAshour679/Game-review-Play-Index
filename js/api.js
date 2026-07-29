const API_KEY = "b8914af251msh3df8820d4f41c61p19db42jsn7463296b3a30";

const API_HOST = "free-to-play-games-database.p.rapidapi.com";
const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com";

const requestOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST
  }
};

async function fetchFromApi(url) {
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error("API request failed: " + response.status);
  }

  const data = await response.json();
  return data;
}

async function getAllGames() {
  const url = `${BASE_URL}/api/games`;
  return await fetchFromApi(url);
}

async function getGamesSorted(sortBy) {
  const url = `${BASE_URL}/api/games?sort-by=${sortBy}`;
  return await fetchFromApi(url);
}

async function getGamesByPlatform(platform) {
  const url = `${BASE_URL}/api/games?platform=${platform}`;
  return await fetchFromApi(url);
}

async function getGamesByCategory(category) {
  const url = `${BASE_URL}/api/games?category=${category}`;
  return await fetchFromApi(url);
}

async function getGamesFiltered(platform, category, sortBy) {
  let url = `${BASE_URL}/api/games?`;

  const params = [];
  if (platform && platform !== "all") params.push(`platform=${platform}`);
  if (category) params.push(`category=${category}`);
  if (sortBy) params.push(`sort-by=${sortBy}`);

  url += params.join("&");
  return await fetchFromApi(url);
}

async function getGameById(id) {
  const url = `${BASE_URL}/api/game?id=${id}`;
  return await fetchFromApi(url);
}

async function getGamesByTag(tag, platform) {
  let url = `${BASE_URL}/api/filter?tag=${tag}`;
  if (platform) url += `&platform=${platform}`;
  return await fetchFromApi(url);
}
