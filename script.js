// API Configuration
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
    userId: null,
    lastSpinTime: 0
};

// DOM Elements
const elements = {
    loginScreen: document.getElementById('login-screen'),
    gameScreen: document.getElementById('game-screen'),
    tokenInput: document.getElementById('token-input'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    username: document.getElementById('username'),
    userAvatar: document.getElementById('user-avatar'),
    chips: document.getElementById('chips'),
    dice: document.getElementById('dice'),
    spinBtn: document.getElementById('spin-btn'),
    reels: [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ],
    winPopup: document.getElementById('win-popup'),
    winCombo: document.getElementById('win-combo'),
    winAmount: document.getElementById('win-amount'),
    claimBtn: document.getElementById('claim-btn')
};

// Helper Functions
function getRandomSymbol() {
    return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}

function resetReel(reel, symbol) {
    reel.innerHTML = '';
    const symbolElement = document.createElement('div');
    symbolElement.className = 'symbol';
    symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
    reel.appendChild(symbolElement);
}

function updateCurrencyDisplay() {
    elements.chips.textContent = gameState.chips;
    elements.dice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => notification.remove(), 3000);
}

// Improved Spin Animation
function spinReel(reel, targetSymbol, duration) {
    const symbols = CONFIG.symbols;
    const targetIndex = symbols.findIndex(s => s.name === targetSymbol.name);
    const spinDistance = 30 + targetIndex; // Total symbols to spin through
    const startTime = Date.now();
    let animationFrame;
    let currentPos = 0;

    // Create initial symbols
    reel.innerHTML = '';
    const visibleSymbols = 3;
    const symbolElements = [];
    
    for (let i = 0; i < visibleSymbols + 2; i++) {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.style.transform = `translateY(${(i-1) * 100}%)`;
        reel.appendChild(symbolElement);
        symbolElements.push(symbolElement);
    }

    function updateSymbols() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = progress < 0.8 ? 
            easeOutQuad(progress / 0.8) * 0.8 : 
            0.8 + easeInQuad((progress - 0.8) / 0.2) * 0.2;

        currentPos = easedProgress * spinDistance;
        
        symbolElements.forEach((el, i) => {
            const symbolPos = (Math.floor(currentPos) + i - 1) % symbols.length;
            const symbolIndex = (symbolPos + symbols.length) % symbols.length;
            el.innerHTML = `<img src="${symbols[symbolIndex].img}" alt="${symbols[symbolIndex].name}">`;
            el.style.transform = `translateY(${(i-1) * 100 + (currentPos % 1) * 100}%)`;
        });

        if (progress < 1) {
            animationFrame = requestAnimationFrame(updateSymbols);
        } else {
            finishSpin();
        }
    }

    function finishSpin() {
        reel.innerHTML = '';
        resetReel(reel, targetSymbol);
        gameState.spinningReels--;
        if (gameState.spinningReels === 0) {
            gameState.isSpinning = false;
            elements.spinBtn.disabled = false;
            checkWin();
        }
    }

    function easeOutQuad(t) { return t * (2 - t); }
    function easeInQuad(t) { return t * t; }

    gameState.spinningReels++;
    updateSymbols();

    return () => cancelAnimationFrame(animationFrame);
}

// Game Functions
async function startSpin() {
    const now = Date.now();
    if (gameState.isSpinning || now - gameState.lastSpinTime < 1000) return;
    gameState.lastSpinTime = now;

    if (gameState.chips < CONFIG.spinCost) {
        showNotification("Not enough chips!", false);
        return;
    }

    elements.spinBtn.disabled = true;
    gameState.isSpinning = true;

    try {
        const spinStart = Date.now();
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
        
        // Adjust spin duration based on server response time
        const serverDelay = Date.now() - spinStart;
        const spinDuration = Math.max(2000 - serverDelay, 1000);

        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        const targetSymbols = elements.reels.map(() => getRandomSymbol());
        gameState.currentSymbols = targetSymbols.map(s => s.name);

        elements.reels.forEach((reel, index) => {
            spinReel(reel, targetSymbols[index], spinDuration);
        });

    } catch (error) {
        console.error('Spin error:', error);
        showNotification(error.message, false);
        gameState.isSpinning = false;
        elements.spinBtn.disabled = false;
    }
}

async function checkWin() {
    const combo = gameState.currentSymbols.join('-');
    let winAmount = CONFIG.payouts[combo] || 
                   (gameState.currentSymbols[0] === gameState.currentSymbols[1] || 
                    gameState.currentSymbols[1] === gameState.currentSymbols[2]) ? CONFIG.payouts['ANY_TWO_MATCH'] : 0;

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
                showWinPopup(combo, winAmount);
                updateCurrencyDisplay();
            }
        } catch (error) {
            console.error('Win error:', error);
        }
    }
}

function showWinPopup(combo, amount) {
    const comboDisplay = combo === 'ANY_TWO_MATCH' ? 
        'Two Matching Symbols' : combo.split('-').join(' ');
    elements.winCombo.textContent = comboDisplay;
    elements.winAmount.textContent = amount;
    elements.winPopup.style.display = 'flex';
}

// Authentication and Initialization
async function loginWithToken(token) {
    try {
        elements.loginBtn.disabled = true;
        const response = await fetch(`${API_BASE_URL}/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error(await response.text());
        const user = await response.json();
        
        gameState.userId = user.id;
        gameState.chips = user.chips;
        gameState.dice = user.dice;
        
        elements.username.textContent = user.username;
        elements.userAvatar.src = user.avatar || 'assets/default-avatar.png';
        elements.loginScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
        updateCurrencyDisplay();
        
        elements.reels.forEach((reel, index) => {
            const symbol = getRandomSymbol();
            gameState.currentSymbols[index] = symbol.name;
            resetReel(reel, symbol);
        });

        showNotification('Login successful!', true);
    } catch (error) {
        showNotification(`Login failed: ${error.message}`, false);
    } finally {
        elements.loginBtn.disabled = false;
    }
}

// Event Listeners
elements.loginBtn.addEventListener('click', () => {
    const token = elements.tokenInput.value.trim();
    if (token) loginWithToken(token);
    else showNotification('Please enter your token', false);
});

elements.spinBtn.addEventListener('click', startSpin);
elements.claimBtn.addEventListener('click', () => {
    elements.winPopup.style.display = 'none';
});
elements.logoutBtn.addEventListener('click', () => {
    fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    }).then(() => {
        elements.loginScreen.style.display = 'block';
        elements.gameScreen.style.display = 'none';
        gameState.userId = null;
        showNotification('Logged out', true);
    });
});

// Initialize Game
async function initGame() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const user = await response.json();
            gameState.userId = user.id;
            gameState.chips = user.chips;
            gameState.dice = user.dice;
            
            elements.username.textContent = user.username;
            elements.userAvatar.src = user.avatar || 'assets/default-avatar.png';
            elements.loginScreen.style.display = 'none';
            elements.gameScreen.style.display = 'block';
            updateCurrencyDisplay();
            
            elements.reels.forEach((reel, index) => {
                const symbol = getRandomSymbol();
                gameState.currentSymbols[index] = symbol.name;
                resetReel(reel, symbol);
            });
        }
    } catch (error) {
        console.log('Not logged in');
    }
}

document.addEventListener('DOMContentLoaded', initGame);
