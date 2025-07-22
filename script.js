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
    spinAnimations: []
};

// DOM Elements
const elements = {
    loginScreen: document.getElementById('login-screen'),
    gameScreen: document.getElementById('game-screen'),
    tokenInput: document.getElementById('token-input'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    usernameDisplay: document.getElementById('username'),
    userAvatar: document.getElementById('user-avatar'),
    chipsDisplay: document.getElementById('chips'),
    diceDisplay: document.getElementById('dice'),
    spinBtn: document.getElementById('spin-btn'),
    reels: [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ],
    winPopup: document.getElementById('win-popup'),
    winComboDisplay: document.getElementById('win-combo'),
    winAmountDisplay: document.getElementById('win-amount'),
    claimBtn: document.getElementById('claim-btn'),
    loadingIndicator: createLoadingIndicator()
};

function createLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'spin-loading';
    indicator.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(indicator);
    return indicator;
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
    elements.chipsDisplay.textContent = gameState.chips;
    elements.diceDisplay.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => notification.remove(), 3000);
}

// Game Functions
async function startSpin() {
    if (gameState.isSpinning || gameState.chips < CONFIG.spinCost) {
        if (gameState.chips < CONFIG.spinCost) {
            showNotification("Not enough chips!", false);
        }
        return;
    }

    initSpinState();
    const targetSymbols = elements.reels.map(() => getRandomSymbol());
    startContinuousSpinAnimation();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/spin`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
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
        
        stopSpinAnimation(targetSymbols);
    } catch (error) {
        console.error('Spin error:', error);
        showNotification('Failed to process spin. Please try again.', false);
        resetSpinState();
        elements.reels.forEach((reel, index) => {
            const symbol = getRandomSymbol();
            resetReel(reel, symbol);
            gameState.currentSymbols[index] = symbol.name;
        });
    }
}

function initSpinState() {
    gameState.isSpinning = true;
    gameState.spinningReels = elements.reels.length;
    gameState.winAmount = 0;
    gameState.winCombo = null;
    elements.spinBtn.disabled = true;
    elements.winPopup.style.display = 'none';
    elements.loadingIndicator.classList.add('show');
}

function startContinuousSpinAnimation() {
    gameState.spinAnimations = [];
    elements.reels.forEach(reel => {
        const animation = {
            position: 0,
            speed: 0.5 + Math.random() * 0.3,
            frameId: null
        };
        
        function animate() {
            animation.position += animation.speed;
            updateReelPosition(reel, animation.position);
            animation.frameId = requestAnimationFrame(animate);
        }
        
        animate();
        gameState.spinAnimations.push(animation);
    });
}

function updateReelPosition(reel, position) {
    const symbols = CONFIG.symbols;
    const symbolHeight = 100;
    const visibleSymbols = 3;
    
    reel.innerHTML = '';
    
    for (let i = 0; i < visibleSymbols; i++) {
        const symbolPos = position + i;
        const symbolIndex = Math.floor(symbolPos) % symbols.length;
        const symbol = symbols[symbolIndex];
        const offset = (symbolPos % 1) * symbolHeight;
        
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        symbolElement.style.transform = `translateY(${offset - symbolHeight}%)`;
        reel.appendChild(symbolElement);
    }
}

function stopSpinAnimation(targetSymbols) {
    gameState.spinAnimations.forEach(anim => {
        cancelAnimationFrame(anim.frameId);
    });
    
    elements.reels.forEach((reel, index) => {
        animateToFinalPosition(reel, targetSymbols[index], 1000 + (index * 300), index === elements.reels.length - 1);
    });
}

function animateToFinalPosition(reel, targetSymbol, duration, isLastReel) {
    let startTime = null;
    const startPosition = 0;
    const endPosition = Math.ceil(startPosition / CONFIG.symbols.length) * CONFIG.symbols.length;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentPosition = startPosition + (endPosition - startPosition) * easedProgress;
        
        updateReelPosition(reel, currentPosition);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            reel.innerHTML = '';
            resetReel(reel, targetSymbol);
            gameState.currentSymbols[elements.reels.indexOf(reel)] = targetSymbol.name;
            gameState.spinningReels--;
            
            if (gameState.spinningReels === 0) {
                completeSpin();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function completeSpin() {
    resetSpinState();
    checkWin();
    highlightWinningSymbols();
}

function resetSpinState() {
    gameState.isSpinning = false;
    elements.spinBtn.disabled = false;
    elements.loadingIndicator.classList.remove('show');
}

function highlightWinningSymbols() {
    if (!gameState.winCombo) return;
    
    elements.reels.forEach((reel, index) => {
        const symbols = reel.querySelectorAll('.symbol');
        if (gameState.winCombo === 'ANY_TWO_MATCH' || 
            gameState.currentSymbols.filter(s => s === gameState.currentSymbols[index]).length >= 2) {
            symbols[1].classList.add('win-highlight');
        }
    });
}

async function checkWin() {
    const combo = gameState.currentSymbols.join('-');
    let winAmount = 0;
    let winCombo = null;
    
    if (CONFIG.payouts[combo]) {
        winAmount = CONFIG.payouts[combo];
        winCombo = combo;
    } else if (hasTwoMatchingSymbols()) {
        winAmount = CONFIG.payouts['ANY_TWO_MATCH'];
        winCombo = 'ANY_TWO_MATCH';
    }

    if (winAmount > 0) {
        await processWin(winAmount, winCombo);
    }
}

function hasTwoMatchingSymbols() {
    const [a, b, c] = gameState.currentSymbols;
    return a === b || b === c || a === c;
}

async function processWin(amount, combo) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/win`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                amount: amount
            }),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            updateGameStateAfterWin(data, amount, combo);
            showWinPopup(combo, amount);
        }
    } catch (error) {
        console.error('Win claim error:', error);
    }
}

function updateGameStateAfterWin(data, amount, combo) {
    gameState.chips = data.newBalance;
    gameState.winAmount = amount;
    gameState.winCombo = combo;
    updateCurrencyDisplay();
}

function showWinPopup(combo, amount) {
    const comboDisplay = combo === 'ANY_TWO_MATCH' 
        ? 'Two Matching Symbols' 
        : createComboSymbolsDisplay(combo);
    
    elements.winComboDisplay.innerHTML = comboDisplay;
    elements.winAmountDisplay.textContent = amount;
    elements.winPopup.style.display = 'flex';
}

function createComboSymbolsDisplay(combo) {
    const symbols = combo.split('-').map(name => {
        const symbol = CONFIG.symbols.find(s => s.name === name);
        return `<img src="${symbol.img}" alt="${symbol.name}" class="combo-symbol">`;
    });
    return `<div class="combo-symbols">${symbols.join('')}</div>`;
}

async function claimWin() {
    gameState.winAmount = 0;
    gameState.winCombo = null;
    elements.winPopup.style.display = 'none';
}

// Authentication
async function loginWithToken(token) {
    try {
        elements.loginBtn.disabled = true;
        const response = await fetch(`${API_BASE_URL}/auth/token`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token }),
            credentials: 'include'
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Invalid response: ${text.substring(0, 100)}`);
        }

        const data = await response.json();
        
        if (response.ok) {
            handleSuccessfulLogin(data);
            showNotification('Login successful!', true);
            return true;
        } else {
            throw new Error(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification(`Login failed: ${error.message}`, false);
        return false;
    } finally {
        elements.loginBtn.disabled = false;
    }
}

async function logout() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            showLoginScreen();
            showNotification('Logged out successfully', true);
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('Failed to logout. Please try again.', false);
    }
}

function handleSuccessfulLogin(user) {
    gameState.userId = user.id;
    gameState.chips = user.chips;
    gameState.dice = user.dice;
    
    elements.usernameDisplay.textContent = user.username;
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

function showLoginScreen() {
    elements.loginScreen.style.display = 'block';
    elements.gameScreen.style.display = 'none';
    gameState.userId = null;
    elements.tokenInput.value = '';
}

async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const user = await response.json();
            handleSuccessfulLogin(user);
            return true;
        } else {
            showLoginScreen();
            return false;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showLoginScreen();
        return false;
    }
}

// Event Listeners
elements.loginBtn.addEventListener('click', async () => {
    const token = elements.tokenInput.value.trim();
    if (token) {
        await loginWithToken(token);
    } else {
        showNotification('Please enter your token', false);
    }
});

elements.logoutBtn.addEventListener('click', logout);
elements.spinBtn.addEventListener('click', startSpin);
elements.claimBtn.addEventListener('click', claimWin);

// Initialize Game
async function initGame() {
    await checkAuthStatus();
    
    if (gameState.userId) {
        elements.reels.forEach((reel, index) => {
            const symbol = getRandomSymbol();
            gameState.currentSymbols[index] = symbol.name;
            resetReel(reel, symbol);
        });
    }
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
