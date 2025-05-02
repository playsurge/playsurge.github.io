// Global Variables
let currentTab = 'home';
let isDarkMode = false;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
let coins = 0;

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        isDarkMode = true;
    } else {
        document.body.classList.remove('dark-mode');
        isDarkMode = false;
    }
    localStorage.setItem('isDarkMode', isDarkMode);
});

// Show and Hide Alerts
function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.classList.add('alert', type);
    alert.innerHTML = `<span>${message}</span><button class="close-btn" onclick="closeAlert(this)">×</button>`;
    document.body.appendChild(alert);

    // Auto-close after 5 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);

    console.log(`[ALERT - ${type.toUpperCase()}] ${message}`);
}

// Close alert manually
function closeAlert(button) {
    const alert = button.parentElement;
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
}

// Test Alert Buttons in Settings
function testAlert(type, message) {
    showAlert(type, message);
}

// Toggle Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(e.target.getAttribute('data-tab')).classList.add('active');
    });
});

// Favorites Toggle
function toggleFavorites() {
    const gameList = document.querySelector('.game-list');
    gameList.innerHTML = '';
    favorites.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `<h3>${game.title}</h3><p>${game.description}</p>`;
        gameList.appendChild(gameCard);
    });
}

function toggleRecentlyPlayed() {
    const gameList = document.querySelector('.game-list');
    gameList.innerHTML = '';
    recentlyPlayed.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `<h3>${game.title}</h3><p>${game.description}</p>`;
        gameList.appendChild(gameCard);
    });
}

// Modal Window Logic
function openGameModal(game) {
    const modal = document.querySelector('.game-modal');
    modal.classList.add('open');
    modal.innerHTML = `
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <button onclick="toggleFavorite(game)">Favorite</button>
        <button onclick="closeModal()">Close</button>
    `;
}

function closeModal() {
    document.querySelector('.game-modal').classList.remove('open');
}

function toggleFavorite(game) {
    if (favorites.includes(game)) {
        favorites = favorites.filter(fav => fav !== game);
    } else {
        favorites.push(game);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}