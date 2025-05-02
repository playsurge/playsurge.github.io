// Toggle theme
const themeToggleBtn = document.querySelector('.theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.documentElement.setAttribute('data-theme', 
    document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  themeToggleBtn.textContent = themeToggleBtn.textContent === '🌙' ? '🌞' : '🌙';
});

// Game modal functionality
const modal = document.getElementById('gameModal');
const gameIframe = document.getElementById('gameIframe');
const closeModalBtn = document.querySelector('.close-button');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const favoritesBtn = document.getElementById('favoritesBtn');

function openModal(gameUrl) {
  gameIframe.src = gameUrl;
  modal.style.display = 'flex';
}

function closeModal() {
  gameIframe.src = '';
  modal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);

fullscreenBtn.addEventListener('click', () => {
  if (gameIframe.requestFullscreen) {
    gameIframe.requestFullscreen();
  } else if (gameIframe.mozRequestFullScreen) {
    gameIframe.mozRequestFullScreen();
  } else if (gameIframe.webkitRequestFullscreen) {
    gameIframe.webkitRequestFullscreen();
  } else if (gameIframe.msRequestFullscreen) {
    gameIframe.msRequestFullscreen();
  }
});

// Toggle active tab and add purple underline
const tabs = document.querySelectorAll('.nav-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.nav-tab.active-tab').classList.remove('active-tab');
    tab.classList.add('active-tab');

    document.querySelector('.tab.active-tab').classList.remove('active-tab');
    document.getElementById(tab.dataset.tab).classList.add('active-tab');
  });
});

// Handle feedback form based on selection
const feedbackTypeSelect = document.getElementById('feedbackType');
const feedbackFields = document.getElementById('feedbackFields');

feedbackTypeSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  feedbackFields.innerHTML = ''; // Clear previous fields

  if (value === 'game') {
    feedbackFields.innerHTML = `
      <label for="gameName">Game Name:</label>
      <input type="text" id="gameName" required />
      <label for="gameUrl">Game URL:</label>
      <input type="url" id="gameUrl" required />
    `;
  } else if (value === 'bug') {
    feedbackFields.innerHTML = `
      <label for="bugDescription">Bug Description:</label>
      <textarea id="bugDescription" required></textarea>
    `;
  } else if (value === 'other') {
    feedbackFields.innerHTML = `
      <label for="otherFeedback">Your Feedback:</label>
      <textarea id="otherFeedback" required></textarea>
    `;
  }
});