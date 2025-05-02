let coins = 0;
let gameInterval;
let gameData = [];

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }, 1000);

  loadGames();
  startCoinTimer();
});

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function loadGames() {
  fetch("assets/data/games.json")
    .then(res => res.json())
    .then(games => {
      gameData = games;
      const gameList = document.getElementById("game-list");
      gameList.innerHTML = "";
      games.forEach(game => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <button onclick="openGame('${game.url}')">Play</button>
        `;
        gameList.appendChild(div);
      });
    });
}

function openGame(url) {
  const modal = document.getElementById("gameModal");
  const frame = document.getElementById("gameFrame");
  frame.src = url;
  modal.style.display = "flex";
}

function closeGame() {
  const modal = document.getElementById("gameModal");
  document.getElementById("gameFrame").src = "";
  modal.style.display = "none";
}

function goFullscreen() {
  const frame = document.getElementById("gameFrame");
  if (frame.requestFullscreen) frame.requestFullscreen();
}

function openInNewTab() {
  window.open(document.getElementById("gameFrame").src, '_blank');
}

function filterGames() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const filteredGames = gameData.filter(game =>
    game.title.toLowerCase().includes(searchQuery)
  );
  loadFilteredGames(filteredGames);
}

function loadFilteredGames(filteredGames) {
  const gameList = document.getElementById("game-list");
  gameList.innerHTML = "";
  filteredGames.forEach(game => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <button onclick="openGame('${game.url}')">Play</button>
    `;
    gameList.appendChild(div);
  });
}

function updateFeedbackForm() {
  const type = document.getElementById("feedbackType").value;
  const container = document.getElementById("feedbackFields");
  container.innerHTML = "";
  if (type === "game") {
    container.innerHTML = '<input placeholder="Game Title"><input placeholder="Game URL">';
  } else if (type === "bug") {
    container.innerHTML = '<input placeholder="Page"><textarea placeholder="Describe the bug"></textarea>';
  } else if (type === "other") {
    container.innerHTML = '<textarea placeholder="Your message"></textarea>';
  }
}

function submitFeedback() {
  alert("Thanks for your feedback!");
}

function startCoinTimer() {
  gameInterval = setInterval(() => {
    coins += 2;
    console.log(`Coins: ${coins}`);
  }, 60000); // Adds 2 coins every minute
}

function clearProgress() {
  localStorage.clear();
  alert("Progress cleared!");
}

function buyPack() {
  if (coins >= 5) {
    alert("Pack opening not implemented yet!");
    coins -= 5; // Deduct coins for buying a pack
  } else {
    alert("You need more coins!");
  }
}