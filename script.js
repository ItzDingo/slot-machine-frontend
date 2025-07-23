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
    },
    mines: {
        minBet: 1,
        maxBet: 100,
        minMines: 1,
        maxMines: 7,
        multipliers: {
            1: 1.1,
            2: 1.25,
            3: 1.5,
            4: 1.75,
            5: 2.0,
            6: 2.5,
            7: 3.0
        },
        gridSizes: {
            1: 3,  // 3x3 grid for 1 mine
            2: 4,  // 4x4 grid for 2 mines
            3: 5,  // 5x5 grid for 3-4 mines
            4: 5,
            5: 6,  // 6x6 grid for 5-7 mines
            6: 6,
            7: 6
        }
    }
};

// Enhanced Game State
let gameState = {
    chips: 0,
    dice: 0,
    isSpinning: false,
    spinningReels: 0,
    currentSymbols: [],
    winAmount: 0,
    winCombo: null,
    userId: null,
    authChecked: false,
    currentGame: null,
    minesGame: {
        betAmount: 0,
        minesCount: 0,
        multiplier: 1.0,
        revealedCells: 0,
        totalCells: 0,
        minePositions: [],
        currentWin: 0
    }
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
    loadingIndicator: createLoadingIndicator(),
    
    // Mines Game elements
    gameSelectScreen: document.getElementById('game-select-screen'),
    slotMachineBtn: document.getElementById('slot-machine-btn'),
    minesGameBtn: document.getElementById('mines-game-btn'),
    minesGameScreen: document.getElementById('mines-game-screen'),
    minesBetInput: document.getElementById('mines-bet-input'),
    minesCountInput: document.getElementById('mines-count-input'),
    minesStartBtn: document.getElementById('mines-start-btn'),
    minesGrid: document.getElementById('mines-grid'),
    minesCurrentWin: document.getElementById('mines-current-win'),
    minesMultiplier: document.getElementById('mines-multiplier'),
    minesCashoutBtn: document.getElementById('mines-cashout-btn'),
    minesGameOverPopup: document.getElementById('mines-game-over-popup'),
    minesGameOverMessage: document.getElementById('mines-game-over-message'),
    minesGameOverAmount: document.getElementById('mines-game-over-amount')
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

// Enhanced Slot Machine Functions
async function startSpin() {
    if (gameState.isSpinning || gameState.chips < CONFIG.spinCost) {
        if (gameState.chips < CONFIG.spinCost) {
            showNotification("Not enough chips!", false);
        }
        return;
    }

    initSpinState();
    const targetSymbols = elements.reels.map(() => getRandomSymbol());
    startEnhancedSpinAnimation(targetSymbols);
    
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

function startEnhancedSpinAnimation(targetSymbols) {
    gameState.currentSymbols = targetSymbols.map(s => s.name);
    const baseDuration = 2500;
    const spinCycles = 5;
    
    elements.reels.forEach((reel, index) => {
        const duration = baseDuration + (index * 300);
        enhancedSpinReel(reel, targetSymbols[index], duration, spinCycles);
    });
}

function enhancedSpinReel(reel, targetSymbol, duration, cycles) {
    const symbols = CONFIG.symbols;
    let startTime = null;
    const symbolHeight = 100;
    const totalSymbols = 5;

    const symbolElements = [];
    for (let i = 0; i < totalSymbols; i++) {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        reel.appendChild(symbolElement);
        symbolElements.push(symbolElement);
    }

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const spinProgress = Math.min(progress / duration, 1);
        
        // Cubic easing for smoother acceleration/deceleration
        const easedProgress = spinProgress < 0.5 
            ? 4 * spinProgress * spinProgress * spinProgress 
            : 1 - Math.pow(-2 * spinProgress + 2, 3) / 2;

        if (spinProgress < 1) {
            const basePosition = -easedProgress * (symbolHeight * cycles * symbols.length);
            
            symbolElements.forEach((element, i) => {
                const position = basePosition + (i * symbolHeight);
                const symbolIndex = Math.floor(-basePosition / symbolHeight) + i;
                const symbol = symbols[symbolIndex % symbols.length];
                
                element.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
                element.style.transform = `translateY(${position}%)`;
                
                // Add slight rotation effect during spin
                if (spinProgress < 0.9) {
                    element.style.transform += ` rotateX(${spinProgress * 360}deg)`;
                }
            });
            
            requestAnimationFrame(animateSpin);
        } else {
            // Final landing animation
            reel.innerHTML = '';
            resetReel(reel, targetSymbol);
            
            // Add bounce effect when landing
            const centerSymbol = reel.querySelector('.symbol:nth-child(2)');
            centerSymbol.style.animation = 'landingBounce 0.5s ease-out';
            
            gameState.spinningReels--;
            
            if (gameState.spinningReels === 0) {
                completeSpin();
            }
        }
    }

    requestAnimationFrame(animateSpin);
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
                updateGameStateAfterWin(data, winAmount, winCombo);
                showWinPopup(winCombo, winAmount);
            }
        } catch (error) {
            console.error('Win claim error:', error);
        }
    }
}

function hasTwoMatchingSymbols() {
    const [a, b, c] = gameState.currentSymbols;
    return a === b || b === c || a === c;
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
    elements.winAmountDisplay.textContent = `+${amount}`;
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

// Mines Game Functions (updated to properly load user data)
function showGameSelectScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    elements.gameSelectScreen.style.display = 'block';
    elements.gameScreen.style.display = 'none';
    elements.minesGameScreen.style.display = 'none';
    updateCurrencyDisplay();
}

function startSlotMachineGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'slots';
    elements.gameSelectScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    elements.minesGameScreen.style.display = 'none';
}

function startMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'mines';
    elements.gameSelectScreen.style.display = 'none';
    elements.gameScreen.style.display = 'none';
    elements.minesGameScreen.style.display = 'block';
    setupMinesGameUI();
}

function setupMinesGameUI() {
    gameState.minesGame = {
        betAmount: 0,
        minesCount: 0,
        multiplier: 1.0,
        revealedCells: 0,
        totalCells: 0,
        minePositions: [],
        currentWin: 0
    };
    
    elements.minesCurrentWin.textContent = '0';
    elements.minesMultiplier.textContent = '1.00x';
    elements.minesGrid.innerHTML = '';
}

function startNewMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }

    const betAmount = parseInt(elements.minesBetInput.value);
    const minesCount = parseInt(elements.minesCountInput.value);
    
    if (isNaN(betAmount)) {
        showNotification("Please enter a valid bet amount", false);
        return;
    }
    
    if (betAmount < CONFIG.mines.minBet || betAmount > CONFIG.mines.maxBet) {
        showNotification(`Bet amount must be between ${CONFIG.mines.minBet} and ${CONFIG.mines.maxBet}`, false);
        return;
    }
    
    if (isNaN(minesCount)) {
        showNotification("Please select number of mines", false);
        return;
    }
    
    if (minesCount < CONFIG.mines.minMines || minesCount > CONFIG.mines.maxMines) {
        showNotification(`Number of mines must be between ${CONFIG.mines.minMines} and ${CONFIG.mines.maxMines}`, false);
        return;
    }
    
    if (betAmount > gameState.chips) {
        showNotification("Not enough chips for this bet", false);
        return;
    }
    
    // Deduct chips via API
    fetch(`${API_BASE_URL}/api/spin`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            userId: gameState.userId,
            cost: betAmount
        }),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        gameState.minesGame.betAmount = betAmount;
        gameState.minesGame.minesCount = minesCount;
        gameState.minesGame.multiplier = CONFIG.mines.multipliers[minesCount];
        gameState.minesGame.currentWin = betAmount;
        
        const gridSize = CONFIG.mines.gridSizes[minesCount];
        gameState.minesGame.totalCells = gridSize * gridSize;
        createMinesGrid(gridSize);
        placeMines(minesCount, gridSize);
    })
    .catch(error => {
        console.error('Mines game start error:', error);
        showNotification('Failed to start mines game', false);
    });
}

function createMinesGrid(size) {
    elements.minesGrid.innerHTML = '';
    elements.minesGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'mines-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => revealMineCell(i));
        elements.minesGrid.appendChild(cell);
    }
}

function placeMines(minesCount, gridSize) {
    gameState.minesGame.minePositions = [];
    const totalCells = gridSize * gridSize;
    
    while (gameState.minesGame.minePositions.length < minesCount) {
        const randomPos = Math.floor(Math.random() * totalCells);
        if (!gameState.minesGame.minePositions.includes(randomPos)) {
            gameState.minesGame.minePositions.push(randomPos);
        }
    }
}

function revealMineCell(index) {
    const cell = elements.minesGrid.children[index];
    
    if (cell.classList.contains('revealed')) {
        return;
    }
    
    if (gameState.minesGame.minePositions.includes(index)) {
        cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
        cell.classList.add('mine');
        endMinesGame(false);
        return;
    }
    
    cell.classList.add('revealed');
    gameState.minesGame.revealedCells++;
    
    gameState.minesGame.currentWin = Math.floor(gameState.minesGame.betAmount * gameState.minesGame.multiplier * gameState.minesGame.revealedCells);
    elements.minesCurrentWin.textContent = gameState.minesGame.currentWin;
    elements.minesMultiplier.textContent = `${(gameState.minesGame.multiplier * gameState.minesGame.revealedCells).toFixed(2)}x`;
    
    const safeCells = gameState.minesGame.totalCells - gameState.minesGame.minesCount;
    if (gameState.minesGame.revealedCells === safeCells) {
        endMinesGame(true);
    }
}

function cashoutMinesGame() {
    if (gameState.minesGame.revealedCells === 0) {
        showNotification("You need to reveal at least one cell to cashout", false);
        return;
    }
    
    endMinesGame(true);
}

function endMinesGame(isWin) {
    gameState.minesGame.minePositions.forEach(pos => {
        const cell = elements.minesGrid.children[pos];
        if (!cell.classList.contains('revealed')) {
            cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
            cell.classList.add('mine');
        }
    });
    
    if (isWin) {
        // Claim win via API
        fetch(`${API_BASE_URL}/api/win`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                amount: gameState.minesGame.currentWin
            }),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            gameState.chips = data.newBalance;
            updateCurrencyDisplay();
            
            elements.minesGameOverMessage.textContent = "You Won!";
            elements.minesGameOverAmount.textContent = `+${gameState.minesGame.currentWin}`;
            elements.minesGameOverPopup.style.display = 'flex';
        })
        .catch(error => {
            console.error('Win claim error:', error);
            showNotification('Failed to claim win', false);
        });
    } else {
        elements.minesGameOverMessage.textContent = "Game Over!";
        elements.minesGameOverAmount.textContent = `-${gameState.minesGame.betAmount}`;
        elements.minesGameOverPopup.style.display = 'flex';
    }
}

function closeMinesGameOverPopup() {
    elements.minesGameOverPopup.style.display = 'none';
    setupMinesGameUI();
}

// Enhanced Authentication Functions
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
    showGameSelectScreen();
    updateCurrencyDisplay();
    
    // Preload symbols for slot machine
    elements.reels.forEach((reel, index) => {
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
    });
    
    // Force a UI update in case we're switching from mines game
    if (gameState.currentGame === 'mines') {
        setupMinesGameUI();
    }
}

function showLoginScreen() {
    elements.loginScreen.style.display = 'block';
    elements.gameScreen.style.display = 'none';
    elements.gameSelectScreen.style.display = 'none';
    elements.minesGameScreen.style.display = 'none';
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

// Add new CSS animation for landing bounce
const style = document.createElement('style');
style.textContent = `
    @keyframes landingBounce {
        0% { transform: translateY(0%) scale(1); }
        50% { transform: translateY(-20%) scale(1.1); }
        100% { transform: translateY(0%) scale(1); }
    }
`;
document.head.appendChild(style);

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

elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
elements.minesGameBtn.addEventListener('click', startMinesGame);
elements.minesStartBtn.addEventListener('click', startNewMinesGame);
elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);

// Initialize Game
async function initGame() {
    try {
        const authCheck = await checkAuthStatus();
        if (authCheck && !gameState.authChecked) {
            gameState.authChecked = true;
            // Additional initialization if needed
        }
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

document.addEventListener('DOMContentLoaded', initGame);
