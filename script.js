// API Configuration
const API_BASE_URL = 'https://slot-machine-backend-34lg.onrender.com';

// Game Configuration
const CONFIG = {
    spinCost: 10,
    spinSettings: {
        minDuration: 1000,
        maxDuration: 2000
    },
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

// Notification System
function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = isSuccess ? 'notification-success' : 'notification-error';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
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

// Enhanced Authentication Functions
async function checkAuthStatus() {
    try {
        // Show loading state
        loginScreen.innerHTML = '<div class="loading">Checking session...</div>';
        
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        
        if (response.ok) {
            const user = await response.json();
            handleSuccessfulLogin(user);
            return true;
        } else {
            // Clear invalid session data
            localStorage.removeItem('lastKnownUserId');
            await clearSessionCookies();
            showLoginScreen();
            return false;
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        showLoginScreen();
        return false;
    }
}

async function clearSessionCookies() {
    try {
        await fetch(`${API_BASE_URL}/auth/clear-cookies`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Failed to clear cookies:', error);
    }
}

async function handleDiscordLogin() {
    try {
        // Show loading state
        discordLoginBtn.disabled = true;
        discordLoginBtn.textContent = 'Redirecting...';
        
        // Store current URL for redirect back after auth
        localStorage.setItem('preAuthUrl', window.location.href);
        
        // Redirect to Discord auth
        window.location.href = `${API_BASE_URL}/auth/discord`;
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Failed to initiate login', false);
        discordLoginBtn.disabled = false;
        discordLoginBtn.textContent = 'Login with Discord';
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
    loginScreen.innerHTML = `
        <div class="login-container">
            <h2>Login to Play</h2>
            <button id="discord-login" class="login-btn">
                Login with Discord
            </button>
            ${window.location.hostname === 'localhost' ? 
              '<button id="dev-login" class="login-btn">Dev Login</button>' : ''}
        </div>
    `;
    
    document.getElementById('discord-login').addEventListener('click', handleDiscordLogin);
    
    // Add dev login for local testing
    if (document.getElementById('dev-login')) {
        document.getElementById('dev-login').addEventListener('click', handleDevLogin);
    }
    
    loginScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}

async function handleDevLogin() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/dev`, {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            await checkAuthStatus();
        }
    } catch (error) {
        console.error('Dev login failed:', error);
    }
}

async function logout() {
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.removeItem('lastKnownUserId');
        localStorage.removeItem('preAuthUrl');
        window.location.href = window.location.origin;
    } catch (error) {
        console.error('Logout failed:', error);
        showNotification('Failed to logout. Please try again.', false);
    }
}

// Initialize Game
async function initGame() {
    // First clear any existing session
    await clearSessionCookies();
    
    // Set up event listeners
    spinBtn.addEventListener('click', startSpin);
    claimBtn.addEventListener('click', claimWin);
    
    // Check URL for auth code first
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code')) {
        try {
            loginScreen.innerHTML = '<div class="loading">Completing login...</div>';
            
            // Exchange code for token
            const authResponse = await fetch(`${API_BASE_URL}/auth/token`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    code: urlParams.get('code')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (authResponse.ok) {
                window.history.replaceState({}, document.title, window.location.pathname);
                await checkAuthStatus();
            } else {
                throw new Error('Token exchange failed');
            }
        } catch (error) {
            console.error('Auth processing error:', error);
            showNotification('Login failed. Please try again.', false);
            showLoginScreen();
        }
    } else {
        // Regular session check
        await checkAuthStatus();
    }
    
    // Initialize game if authenticated
    if (gameState.userId) {
        reels.forEach((reel, index) => {
            const symbol = getRandomSymbol();
            gameState.currentSymbols[index] = symbol.name;
            resetReel(reel, symbol);
        });
    }
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
