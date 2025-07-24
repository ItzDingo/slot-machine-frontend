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
        maxBet: 1000,
        minMines: 1,
        maxMines: 10,
        gridSize: 5,
        multipliers: {
            1: { 1: 1.0436, 5: 1.2345, 10: 1.5432, 15: 2.0123, 20: 2.7456, 24: 3.7890 },
            2: { 1: 1.0567, 5: 1.3456, 10: 1.7890, 15: 2.4567, 20: 3.4567, 23: 4.5678 },
            3: { 1: 1.0678, 5: 1.4567, 10: 2.0123, 15: 2.8901, 20: 4.1234, 22: 5.4321 },
            4: { 1: 1.0789, 5: 1.5678, 10: 2.2345, 15: 3.3456, 20: 4.8901, 21: 6.5432 },
            5: { 1: 1.0890, 5: 1.6789, 10: 2.4567, 15: 3.7890, 20: 5.6789 },
            6: { 1: 1.1012, 5: 1.7890, 10: 2.6789, 15: 4.2345, 19: 6.7890 },
            7: { 1: 1.1123, 5: 1.9012, 10: 2.9012, 15: 4.6789, 18: 7.8901 },
            8: { 1: 1.1234, 5: 2.0123, 10: 3.1234, 15: 5.1234, 17: 8.9012 },
            9: { 1: 1.1345, 5: 2.1234, 10: 3.3456, 15: 5.5678, 16: 9.0123 },
            10: { 1: 1.1456, 5: 2.2345, 10: 3.5678, 15: 6.0123 }
        },
        houseEdge: 0.03
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
    authChecked: false,
    currentGame: null,
    minesGame: {
        betAmount: 0,
        minesCount: 0,
        multiplier: 1.0,
        revealedCells: 0,
        totalCells: 25,
        minePositions: [],
        currentWin: 0,
        gameActive: false
    },
    minesStats: {
        totalGames: 0,
        wins: 0,
        totalWins: 0,
        totalGamesPlayed: 0
    }
};

// DOM Elements
const elements = {
    loginScreen: document.getElementById('login-screen'),
    gameScreen: document.getElementById('game-screen'),
    tokenInput: document.getElementById('token-input'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    minesLogoutBtn: document.getElementById('mines-logout-btn'),
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
    minesGameOverAmount: document.getElementById('mines-game-over-amount'),
    minesUsername: document.getElementById('mines-username'),
    minesAvatar: document.getElementById('mines-avatar'),
    minesChips: document.getElementById('mines-chips'),
    minesDice: document.getElementById('mines-dice'),
    backToMenuBtn: document.getElementById('back-to-menu-btn'),
    minesBackToMenuBtn: document.getElementById('mines-back-to-menu-btn'),
    minesWinsCounter: document.getElementById('mines-wins-counter'),
    minesWinRate: document.getElementById('mines-win-rate')
};

// Helper Functions
function getRandomSymbol() {
    return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}

function resetReel(reel, centerSymbol) {
    if (!reel) return;
    
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
    if (elements.chipsDisplay) elements.chipsDisplay.textContent = gameState.chips;
    if (elements.diceDisplay) elements.diceDisplay.textContent = gameState.dice;
    if (elements.minesChips) elements.minesChips.textContent = gameState.chips;
    if (elements.minesDice) elements.minesDice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Slot Machine Functions
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
    if (elements.spinBtn) elements.spinBtn.disabled = true;
    if (elements.winPopup) elements.winPopup.style.display = 'none';
}

function startEnhancedSpinAnimation(targetSymbols) {
    gameState.currentSymbols = targetSymbols.map(s => s.name);
    const baseDuration = 2000;
    const spinCycles = 4;
    
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const duration = baseDuration + (index * 400);
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
        
        const easedProgress = spinProgress;

        if (spinProgress < 1) {
            const basePosition = -easedProgress * (symbolHeight * cycles * symbols.length);
            
            symbolElements.forEach((element, i) => {
                const position = basePosition + (i * symbolHeight);
                const symbolIndex = Math.floor(-basePosition / symbolHeight) + i;
                const symbol = symbols[symbolIndex % symbols.length];
                
                element.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
                element.style.transform = `translateY(${position}%)`;
            });
            
            requestAnimationFrame(animateSpin);
        } else {
            reel.innerHTML = '';
            resetReel(reel, targetSymbol);
            
            const centerSymbol = reel.querySelector('.symbol:nth-child(2)');
            if (centerSymbol) centerSymbol.style.animation = 'landingBounce 0.5s ease-out';
            
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
    if (elements.spinBtn) elements.spinBtn.disabled = false;
}

function highlightWinningSymbols() {
    if (!gameState.winCombo) return;
    
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const symbols = reel.querySelectorAll('.symbol');
        if (symbols[1] && (gameState.winCombo === 'ANY_TWO_MATCH' || 
            gameState.currentSymbols.filter(s => s === gameState.currentSymbols[index]).length >= 2)) {
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
    if (!elements.winComboDisplay || !elements.winAmountDisplay || !elements.winPopup) return;
    
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
        return symbol ? `<img src="${symbol.img}" alt="${symbol.name}" class="combo-symbol">` : '';
    });
    return `<div class="combo-symbols">${symbols.join('')}</div>`;
}

async function claimWin() {
    gameState.winAmount = 0;
    gameState.winCombo = null;
    if (elements.winPopup) elements.winPopup.style.display = 'none';
}

// Mines Game Functions
function showGameSelectScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'block';
    updateCurrencyDisplay();
}

function startSlotMachineGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'slots';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'block';
}

function startMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'mines';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'block';
    setupMinesGameUI();
}

async function setupMinesGameUI() {
    gameState.minesGame = {
        betAmount: 0,
        minesCount: 0,
        multiplier: 1.0,
        revealedCells: 0,
        totalCells: 25,
        minePositions: [],
        currentWin: 0,
        gameActive: false
    };
    
    if (elements.minesCurrentWin) elements.minesCurrentWin.textContent = '0';
    if (elements.minesMultiplier) elements.minesMultiplier.textContent = '1.00x';
    if (elements.minesGrid) elements.minesGrid.innerHTML = '';
    
    if (elements.minesBetInput) elements.minesBetInput.disabled = false;
    if (elements.minesCountInput) elements.minesCountInput.disabled = false;
    if (elements.minesStartBtn) elements.minesStartBtn.disabled = false;
    if (elements.minesCashoutBtn) elements.minesCashoutBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/mines/stats?userId=${gameState.userId}`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            gameState.minesStats.totalGames = data.totalGames || 0;
            gameState.minesStats.wins = data.wins || 0;
            gameState.minesStats.totalWins = data.totalWins || 0;
            gameState.minesStats.totalGamesPlayed = data.totalGamesPlayed || 0;
        }
    } catch (error) {
        console.error('Failed to load mines stats:', error);
    }
    
    updateMinesStats();
}

function updateMinesStats() {
    if (elements.minesWinsCounter) elements.minesWinsCounter.textContent = gameState.minesStats.wins;
    const winRate = gameState.minesStats.totalGames > 0 
        ? Math.round((gameState.minesStats.wins / gameState.minesStats.totalGames) * 100)
        : 0;
    if (elements.minesWinRate) elements.minesWinRate.textContent = `${winRate}%`;
}

async function startNewMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }

    const betAmount = parseInt(elements.minesBetInput?.value);
    const minesCount = parseInt(elements.minesCountInput?.value);
    
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
    
    if (elements.minesBetInput) elements.minesBetInput.disabled = true;
    if (elements.minesCountInput) elements.minesCountInput.disabled = true;
    if (elements.minesStartBtn) elements.minesStartBtn.disabled = true;
    if (elements.minesCashoutBtn) elements.minesCashoutBtn.disabled = false;
    
    gameState.minesStats.totalGames++;
    updateMinesStats();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/spin`, {
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
        });

        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        gameState.minesGame.betAmount = betAmount;
        gameState.minesGame.minesCount = minesCount;
        gameState.minesGame.multiplier = 1.0;
        gameState.minesGame.currentWin = betAmount;
        gameState.minesGame.gameActive = true;
        
        createMinesGrid();
        placeMines(minesCount);

        await fetch(`${API_BASE_URL}/api/mines/start`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                betAmount,
                minesCount
            }),
            credentials: 'include'
        });
    } catch (error) {
        console.error('Mines game start error:', error);
        showNotification('Failed to start mines game', false);
        setupMinesGameUI();
    }
}

function createMinesGrid() {
    if (!elements.minesGrid) return;
    
    elements.minesGrid.innerHTML = '';
    elements.minesGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
    
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'mines-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => revealMineCell(i));
        elements.minesGrid.appendChild(cell);
    }
}

function placeMines(minesCount) {
    gameState.minesGame.minePositions = [];
    const positions = Array.from({length: 25}, (_, i) => i);
    
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    gameState.minesGame.minePositions = positions.slice(0, minesCount);
}

function revealMineCell(index) {
    if (!gameState.minesGame.gameActive || !elements.minesGrid) return;
    
    const cell = elements.minesGrid.children[index];
    if (!cell || cell.classList.contains('revealed')) return;
    
    if (gameState.minesGame.minePositions.includes(index)) {
        cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
        cell.classList.add('mine');
        endMinesGame(false);
        return;
    }
    
    cell.classList.add('revealed');
    gameState.minesGame.revealedCells++;
    
    const minesCount = gameState.minesGame.minesCount;
    const revealed = gameState.minesGame.revealedCells;
    const multiplierData = CONFIG.mines.multipliers[minesCount];
    
    let currentMultiplier = 1.0;
    for (const [cells, mult] of Object.entries(multiplierData)) {
        if (revealed >= parseInt(cells)) {
            currentMultiplier = mult;
        } else {
            break;
        }
    }
    
    gameState.minesGame.multiplier = currentMultiplier;
    gameState.minesGame.currentWin = Math.floor(gameState.minesGame.betAmount * currentMultiplier);
    
    if (elements.minesCurrentWin) elements.minesCurrentWin.textContent = gameState.minesGame.currentWin;
    if (elements.minesMultiplier) elements.minesMultiplier.textContent = `${currentMultiplier.toFixed(2)}x`;
    
    const safeCells = 25 - gameState.minesGame.minesCount;
    if (gameState.minesGame.revealedCells === safeCells) {
        endMinesGame(true);
    }
}

function cashoutMinesGame() {
    if (!gameState.minesGame.gameActive || gameState.minesGame.revealedCells === 0) {
        showNotification("You need to reveal at least one cell to cashout", false);
        return;
    }
    
    endMinesGame(true);
}

async function endMinesGame(isWin) {
    gameState.minesGame.gameActive = false;
    if (elements.minesCashoutBtn) elements.minesCashoutBtn.disabled = true;
    
    if (elements.minesGrid) {
        gameState.minesGame.minePositions.forEach(pos => {
            const cell = elements.minesGrid.children[pos];
            if (cell && !cell.classList.contains('revealed')) {
                cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
                cell.classList.add('mine');
            }
        });
    }
    
    if (isWin) {
        gameState.minesStats.wins++;
        gameState.minesStats.totalWins += gameState.minesGame.currentWin;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/win`, {
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
            });
            
            const data = await response.json();
            gameState.chips = data.newBalance;
            updateCurrencyDisplay();
            
            if (elements.minesGameOverMessage) elements.minesGameOverMessage.textContent = "You Won!";
            if (elements.minesGameOverAmount) elements.minesGameOverAmount.textContent = `+${gameState.minesGame.currentWin}`;
            if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'flex';
        } catch (error) {
            console.error('Win claim error:', error);
            showNotification('Failed to claim win', false);
        }
    } else {
        if (elements.minesGameOverMessage) elements.minesGameOverMessage.textContent = "Game Over!";
        if (elements.minesGameOverAmount) elements.minesGameOverAmount.textContent = `-${gameState.minesGame.betAmount}`;
        if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'flex';
    }
}

function closeMinesGameOverPopup() {
    if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'none';
    setupMinesGameUI();
}

// Authentication Functions
async function loginWithToken(token) {
    try {
        if (elements.loginBtn) elements.loginBtn.disabled = true;
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
        if (elements.loginBtn) elements.loginBtn.disabled = false;
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
    
    if (elements.usernameDisplay) elements.usernameDisplay.textContent = user.username;
    if (elements.userAvatar) elements.userAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.minesUsername) elements.minesUsername.textContent = user.username;
    if (elements.minesAvatar) elements.minesAvatar.src = user.avatar || 'assets/default-avatar.png';
    
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    showGameSelectScreen();
    updateCurrencyDisplay();
    
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
    });
    
    if (gameState.currentGame === 'mines') {
        setupMinesGameUI();
    }
}

function showLoginScreen() {
    if (elements.loginScreen) elements.loginScreen.style.display = 'block';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    gameState.userId = null;
    if (elements.tokenInput) elements.tokenInput.value = '';
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

// Add CSS animation for landing bounce
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
if (elements.loginBtn) {
    elements.loginBtn.addEventListener('click', async () => {
        const token = elements.tokenInput?.value.trim();
        if (token) {
            await loginWithToken(token);
        } else {
            showNotification('Please enter your token', false);
        }
    });
}

if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', logout);
if (elements.minesLogoutBtn) elements.minesLogoutBtn.addEventListener('click', logout);
if (elements.spinBtn) elements.spinBtn.addEventListener('click', startSpin);
if (elements.claimBtn) elements.claimBtn.addEventListener('click', claimWin);

if (elements.slotMachineBtn) elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
if (elements.minesGameBtn) elements.minesGameBtn.addEventListener('click', startMinesGame);
if (elements.minesStartBtn) elements.minesStartBtn.addEventListener('click', startNewMinesGame);
if (elements.minesCashoutBtn) elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
if (document.getElementById('mines-game-over-close')) {
    document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);
}
if (elements.backToMenuBtn) elements.backToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.minesBackToMenuBtn) elements.minesBackToMenuBtn.addEventListener('click', showGameSelectScreen);

// Initialize Game
async function initGame() {
    try {
        const authCheck = await checkAuthStatus();
        if (authCheck && !gameState.authChecked) {
            gameState.authChecked = true;
        }
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

document.addEventListener('DOMContentLoaded', initGame);
