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
    userId: null
};

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const tokenInput = document.getElementById('token-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameDisplay = document.getElementById('username');
const userAvatar = document.getElementById('user-avatar');
const chipsDisplay = document.getElementById('chips');
const diceDisplay = document.getElementById('dice');
const spinBtn = document.getElementById('spin-btn');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const winPopup = document.getElementById('win-popup');
const winComboDisplay = document.getElementById('win-combo');
const winAmountDisplay = document.getElementById('win-amount');
const claimBtn = document.getElementById('claim-btn');

// Helper Functions
function getRandomSymbol() {
    return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}

function resetReel(reel, centerSymbol) {
    reel.innerHTML = '';
    const symbolElement = document.createElement('div');
    symbolElement.className = 'symbol';
    symbolElement.innerHTML = `<img src="${centerSymbol.img}" alt="${centerSymbol.name}">`;
    reel.appendChild(symbolElement);
}

function updateCurrencyDisplay() {
    chipsDisplay.textContent = gameState.chips;
    diceDisplay.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Improved Spin Animation
function spinReel(reel, targetSymbol, duration, isLastReel) {
    const symbols = CONFIG.symbols;
    const symbolHeight = 100; // Each symbol takes 100% height
    const spinCycles = 8; // Number of full rotations before stopping
    let startTime = null;
    let animationFrameId = null;

    // Clear previous symbols
    reel.innerHTML = '';

    // Create buffer of symbols (3 above and 3 below visible area)
    const visibleSymbols = 3; // Number of symbols visible in the reel
    const buffer = 3;
    const totalSymbols = visibleSymbols + buffer * 2;
    const symbolElements = [];
    
    // Create initial set of symbols
    for (let i = 0; i < totalSymbols; i++) {
        const symbolIndex = Math.abs((i - buffer) % symbols.length);
        const symbol = symbols[symbolIndex];
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        symbolElement.style.position = 'absolute';
        symbolElement.style.width = '100%';
        symbolElement.style.height = '100%';
        symbolElement.style.transform = `translateY(${(i - buffer) * symbolHeight}%)`;
        reel.appendChild(symbolElement);
        symbolElements.push({
            element: symbolElement,
            index: symbolIndex
        });
    }

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Custom easing function for smooth start and stop
        const easedProgress = progress < 0.7 ? 
            easeOutQuad(progress / 0.7) * 0.7 : 
            0.7 + easeInQuad((progress - 0.7) / 0.3) * 0.3;

        // Calculate position with easing
        const totalDistance = spinCycles * symbols.length * symbolHeight;
        const currentPos = -easedProgress * totalDistance;

        // Position all symbols
        symbolElements.forEach((symbol, i) => {
            const position = (currentPos + (i - buffer) * symbolHeight) % (symbols.length * symbolHeight);
            const normalizedPos = position < 0 ? position + symbols.length * symbolHeight : position;
            symbol.element.style.transform = `translateY(${normalizedPos}%)`;
            
            // Update symbol if it goes out of view
            if (normalizedPos > (visibleSymbols + 0.5) * symbolHeight) {
                const newIndex = (symbol.index - 1) % symbols.length;
                symbol.index = newIndex < 0 ? symbols.length - 1 : newIndex;
                symbol.element.innerHTML = `<img src="${symbols[symbol.index].img}" alt="${symbols[symbol.index].name}">`;
            } else if (normalizedPos < -0.5 * symbolHeight) {
                const newIndex = (symbol.index + 1) % symbols.length;
                symbol.index = newIndex;
                symbol.element.innerHTML = `<img src="${symbols[newIndex].img}" alt="${symbols[newIndex].name}">`;
            }
        });

        if (progress < 1) {
            animationFrameId = requestAnimationFrame(animateSpin);
        } else {
            // Animation complete - show final result
            finishSpin();
        }
    }

    function finishSpin() {
        reel.innerHTML = '';
        resetReel(reel, targetSymbol);
        gameState.spinningReels--;
        
        if (gameState.spinningReels === 0) {
            gameState.isSpinning = false;
            spinBtn.disabled = false;
            checkWin();
        }
    }

    // Easing functions
    function easeOutQuad(t) {
        return t * (2 - t);
    }
    
    function easeInQuad(t) {
        return t * t;
    }

    // Start the animation
    gameState.spinningReels++;
    animationFrameId = requestAnimationFrame(animateSpin);

    // Cleanup function
    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
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
        
        gameState.isSpinning = true;
        gameState.spinningReels = reels.length;
        gameState.winAmount = 0;
        gameState.winCombo = null;
        spinBtn.disabled = true;
        winPopup.style.display = 'none';

        const targetSymbols = reels.map(() => getRandomSymbol());
        gameState.currentSymbols = targetSymbols.map(s => s.name);

        reels.forEach((reel, index) => {
            const duration = 2000 + Math.random() * 1000; // 2-3 seconds duration
            spinReel(reel, targetSymbols[index], duration, index === reels.length - 1);
        });
    } catch (error) {
        console.error('Spin error:', error);
        showNotification('Failed to start spin. Please try again.', false);
    }
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
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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

// Authentication
async function loginWithToken(token) {
    try {
        loginBtn.disabled = true;
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
        loginBtn.disabled = false;
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
    
    usernameDisplay.textContent = user.username;
    userAvatar.src = user.avatar || 'assets/default-avatar.png';
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    updateCurrencyDisplay();
    
    // Initialize reels
    reels.forEach((reel, index) => {
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
    });
}

function showLoginScreen() {
    loginScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    gameState.userId = null;
    tokenInput.value = '';
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
loginBtn.addEventListener('click', async () => {
    const token = tokenInput.value.trim();
    if (token) {
        await loginWithToken(token);
    } else {
        showNotification('Please enter your token', false);
    }
});

logoutBtn.addEventListener('click', logout);
spinBtn.addEventListener('click', startSpin);
claimBtn.addEventListener('click', claimWin);

// Initialize Game
async function initGame() {
    await checkAuthStatus();
    
    // Initialize reels if authenticated
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
