const API_BASE_URL = 'https://slot-machine-backend-34lg.onrender.com';

// Game Configuration
const CONFIG = {
    spinCost: 10,
    symbols: [
        { name: '7', img: 'assets/7.png' },
        { name: 'dollar', img: 'assets/dollar.png' },
        { name: 'bell', img: 'assets/bell.png' },
        { name: 'diamond', img: 'assets/diamond.png' },
        { name: 'cherry', img: 'assets/cherry.png' },
        { name: 'coin', img: 'assets/coin.png' },
        { name: '1', img: 'assets/1.png' },
        { name: '0', img: 'assets/0.png' },
        { name: 'lemon', img: 'assets/lemon.png' },
        { name: 'card', img: 'assets/card.png' },
        { name: 'star', img: 'assets/star.png' },
        { name: 'clover', img: 'assets/clover.png' }
    ],
    payouts: {
        '7-7-7': 500,
        'diamond-diamond-diamond': 300,
        'bell-bell-bell': 200,
        'cherry-cherry-cherry': 100,
        'card-card-card': 400,
        'clover-clover-clover': 50,
        'ANY_TWO_MATCH': 20
    }
};

// Game State
let gameState = {
    chips: 0,
    dice: 0,
    isSpinning: false,
    spinningReels: 0,
    currentSymbols: [],
    winAmount: 0,
    winCombo: null,
    userId: null
};

// DOM Elements
const spinBtn = document.getElementById('spin-btn');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const chipsDisplay = document.getElementById('chips');
const diceDisplay = document.getElementById('dice');
const winPopup = document.getElementById('win-popup');
const winComboDisplay = document.getElementById('win-combo');
const winAmountDisplay = document.getElementById('win-amount');
const claimBtn = document.getElementById('claim-btn');
const discordLoginBtn = document.getElementById('discord-login');
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const logoutBtn = document.getElementById('logout-btn');
const userAvatar = document.getElementById('user-avatar');
const loggedInUser = document.getElementById('logged-in-user');
const notification = document.getElementById('notification');
const notificationMsg = document.getElementById('notification-message');

// Notification System
function showNotification(message, isSuccess) {
    notification.className = isSuccess ? 'notification-success' : 'notification-error';
    notificationMsg.textContent = message;
    notification.classList.add('notification-show');
    
    setTimeout(() => {
        notification.classList.remove('notification-show');
    }, 3000);
}

// Authentication
// Replace your checkAuthStatus function with this:
async function checkAuthStatus() {
    try {
        // First check localStorage for cached user
        const cachedUserId = localStorage.getItem('lastKnownUserId');
        if (!cachedUserId) {
            showLoginScreen();
            return;
        }

        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            credentials: 'include' // This is crucial for sending cookies
        });

        if (response.status === 401) {
            // Session expired or invalid
            localStorage.removeItem('lastKnownUserId');
            showLoginScreen();
            return;
        }

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const user = await response.json();
        handleSuccessfulLogin(user);
        showNotification(`Welcome back, ${user.username}!`, true);

    } catch (error) {
        console.error('Auth check failed:', error);
        showLoginScreen();
        
        // Check if we came from a failed login redirect
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('login_failed')) {
            showNotification('Login failed. Please try again.', false);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
}

function handleSuccessfulLogin(user) {
    gameState.userId = user.id;
    gameState.chips = user.chips;
    gameState.dice = user.dice;
    
    loggedInUser.textContent = user.username;
    userAvatar.src = user.avatar || 'assets/default-avatar.png';
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    updateCurrencyDisplay();
    
    localStorage.setItem('lastKnownUserId', user.id);
}

function showLoginScreen() {
    loginScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    gameState.userId = null;
}

async function logout() {
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.removeItem('lastKnownUserId');
        window.location.href = window.location.origin;
    } catch (error) {
        console.error('Logout failed:', error);
        showNotification('Failed to logout. Please try again.', false);
    }
}

// Game Functions
async function startSpin() {
    if (gameState.isSpinning || gameState.chips < CONFIG.spinCost) {
        if (gameState.chips < CONFIG.spinCost) {
            showNotification("Not enough chips!", false);
        }
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/spin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: gameState.userId,
                cost: CONFIG.spinCost
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Spin failed');

        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        gameState.isSpinning = true;
        gameState.spinningReels = reels.length;
        gameState.winAmount = 0;
        gameState.winCombo = null;
        spinBtn.disabled = true;
        winPopup.style.display = 'none';

        const targetSymbols = reels.map(() => getRandomSymbol());
        gameState.currentSymbols = targetSymbols.map(s => s.name);

        reels.forEach((reel, index) => {
            const duration = CONFIG.spinSettings.minDuration + 
                           Math.random() * (CONFIG.spinSettings.maxDuration - CONFIG.spinSettings.minDuration);
            spinReel(reel, targetSymbols[index], duration, index === reels.length - 1);
        });
    } catch (error) {
        console.error('Spin error:', error);
        showNotification('Failed to start spin. Please try again.', false);
    }
}

function spinReel(reel, targetSymbol, duration, isLastReel) {
    const symbols = CONFIG.symbols;
    let startTime = null;
    let currentPosition = 0;
    let currentSymbolIndex = 0;

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const spinProgress = Math.min(progress / duration, 1);

        if (spinProgress < 1) {
            currentPosition = -100 * spinProgress * 10;
            currentSymbolIndex = Math.floor(Math.random() * symbols.length);
            
            reel.innerHTML = '';
            for (let i = -1; i <= 1; i++) {
                const symbol = symbols[(currentSymbolIndex + i + symbols.length) % symbols.length];
                const symbolElement = document.createElement('div');
                symbolElement.className = 'symbol';
                symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
                symbolElement.style.transform = `translateY(${currentPosition + (i * 100)}%)`;
                reel.appendChild(symbolElement);
            }
            
            requestAnimationFrame(animateSpin);
        } else {
            gameState.currentSymbols[reels.indexOf(reel)] = targetSymbol.name;
            resetReel(reel, targetSymbol);
            gameState.spinningReels--;
            
            if (gameState.spinningReels === 0) {
                gameState.isSpinning = false;
                spinBtn.disabled = false;
                checkWin();
            }
        }
    }

    requestAnimationFrame(animateSpin);
}

async function checkWin() {
    const combo = gameState.currentSymbols.join('-');
    let winAmount = 0;
    let winCombo = null;
    
    if (CONFIG.payouts[combo]) {
        winAmount = CONFIG.payouts[combo];
        winCombo = combo;
    } else if (gameState.currentSymbols[0] === gameState.currentSymbols[1] || 
               gameState.currentSymbols[1] === gameState.currentSymbols[2] || 
               gameState.currentSymbols[0] === gameState.currentSymbols[2]) {
        winAmount = CONFIG.payouts['ANY_TWO_MATCH'];
        winCombo = 'ANY_TWO_MATCH';
    }

    if (winAmount > 0) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/win`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: gameState.userId,
                    amount: winAmount
                }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                gameState.chips = data.newBalance;
                gameState.winAmount = winAmount;
                gameState.winCombo = winCombo;
                showWinPopup(winCombo, winAmount);
                updateCurrencyDisplay();
            }
        } catch (error) {
            console.error('Win claim error:', error);
        }
    }
}

function showWinPopup(combo, amount) {
    const comboDisplay = combo === 'ANY_TWO_MATCH' ? 
        'Two Matching Symbols' : 
        combo.split('-').join(' ');
    
    winComboDisplay.innerHTML = `<div class="combo-symbols">${comboDisplay}</div>`;
    winAmountDisplay.textContent = amount;
    winPopup.style.display = 'flex';
}

async function claimWin() {
    gameState.winAmount = 0;
    gameState.winCombo = null;
    winPopup.style.display = 'none';
}

// Helper Functions
function getRandomSymbol() {
    return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}

function resetReel(reel, centerSymbol) {
    reel.innerHTML = '';
    for (let i = -1; i <= 1; i++) {
        const symbol = i === 0 ? centerSymbol : getRandomSymbol();
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        symbolElement.style.transform = `translateY(${i * 100}%)`;
        reel.appendChild(symbolElement);
    }
}

function updateCurrencyDisplay() {
    chipsDisplay.textContent = gameState.chips;
    diceDisplay.textContent = gameState.dice;
}

// Initialize Game
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle successful login redirect
    if (urlParams.has('login_success')) {
        window.history.replaceState({}, document.title, window.location.pathname);
        showNotification('Login successful! Loading your data...', true);
    }
    
    // Initialize game regardless of auth state
    initGame();
    
    // Check auth status with retry logic
    const checkAuthWithRetry = async (attempt = 0) => {
        try {
            await checkAuthStatus();
        } catch (error) {
            if (attempt < 2) { // Retry up to 2 times
                setTimeout(() => checkAuthWithRetry(attempt + 1), 1000 * (attempt + 1));
            }
        }
    }
    
    checkAuthWithRetry();
    // Set up event listeners
    spinBtn.addEventListener('click', startSpin);
    claimBtn.addEventListener('click', claimWin);
    discordLoginBtn.addEventListener('click', () => {
        window.location.href = `${API_BASE_URL}/auth/discord`;
    });
    logoutBtn.addEventListener('click', logout);
    
    // Initialize reels if authenticated
    if (gameState.userId) {
        reels.forEach((reel, index) => {
            const symbol = getRandomSymbol();
            gameState.currentSymbols[index] = symbol.name;
            resetReel(reel, symbol);
        });
    }
});
