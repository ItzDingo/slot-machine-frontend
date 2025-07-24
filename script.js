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
        minBet: 0.1,
        maxBet: 1000,
        minMines: 1,
        maxMines: 10,
        gridSize: 5,
        getMultiplier: function(minesCount, revealedCells) {
            const baseMultipliers = {
                1: 1.04, 2: 1.07, 3: 1.10,
                4: 1.14, 5: 1.18, 6: 1.23,
                7: 1.29, 8: 1.35, 9: 1.42,
                10: 2
            };
            
            const growthCurve = [
                { cells: 1, factor: 1.00 },
                { cells: 2, factor: 1.05 },
                { cells: 5, factor: 1.15 },
                { cells: 10, factor: 1.30 },
                { cells: 15, factor: 1.50 },
                { cells: 20, factor: 1.75 },
                { cells: 24, factor: 2.10 }
            ];
            
            const base = baseMultipliers[minesCount] || 1.0;
            
            let growth = 1.0;
            for (let i = growthCurve.length - 1; i >= 0; i--) {
                if (revealedCells >= growthCurve[i].cells) {
                    growth = growthCurve[i].factor;
                    break;
                }
            }
            
            const rawMultiplier = base * growth;
            const withHouseEdge = rawMultiplier * (1 - this.houseEdge);
            return parseFloat(withHouseEdge.toFixed(4));
        },
        houseEdge: 0.03
    },
    blinko: {
        minBet: 0.1,
        maxBet: 1000,
        multipliers: {
            low: [8.0, 3.0, 1.5, 1.2, 1.0, 0.5, 0.3, 0.5, 1.0, 1.2, 1.5, 3.0, 8.0, 15.0, 25.0],
            medium: [15.0, 6.0, 2.5, 1.8, 1.2, 0.7, 0.3, 0.2, 0.3, 0.7, 1.2, 1.8, 2.5, 6.0, 15.0],
            high: [25.0, 12.0, 4.0, 2.0, 1.0, 0.5, 0.2, 0.1, 0.2, 0.5, 1.0, 2.0, 4.0, 12.0, 25.0]
        }
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
    },
    blinkoGame: {
        balls: [],
        pegs: [],
        multiplierSlots: [],
        animationId: null,
        totalDropped: 0,
        totalWon: 0,
        currentRisk: 'medium'
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
    blinkoLogoutBtn: document.getElementById('blinko-logout-btn'),
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
    blinkoGameBtn: document.getElementById('blinko-game-btn'),
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
    minesWinRate: document.getElementById('mines-win-rate'),
    blinkoGameScreen: document.getElementById('blinko-game-screen'),
    blinkoCanvas: document.getElementById('blinko-canvas'),
    blinkoUsername: document.getElementById('blinko-username'),
    blinkoAvatar: document.getElementById('blinko-avatar'),
    blinkoChips: document.getElementById('blinko-chips'),
    blinkoDice: document.getElementById('blinko-dice'),
    blinkoBetInput: document.getElementById('blinko-bet-input'),
    blinkoRiskSelect: document.getElementById('blinko-risk-select'),
    blinkoDropBtn: document.getElementById('blinko-drop-btn'),
    blinkoBackToMenuBtn: document.getElementById('blinko-back-to-menu-btn'),
    blinkoTotalDropped: document.getElementById('blinko-total-dropped'),
    blinkoTotalWon: document.getElementById('blinko-total-won')
};

// Blinko Game Variables
let blinkoCtx;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 700;
const PEG_RADIUS = 8;
const BALL_RADIUS = 6;
const GRAVITY = 0.3;
const BOUNCE = 0.7;
const FRICTION = 0.99;

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
    if (elements.chipsDisplay) elements.chipsDisplay.textContent = gameState.chips.toFixed(2);
    if (elements.diceDisplay) elements.diceDisplay.textContent = gameState.dice;
    if (elements.minesChips) elements.minesChips.textContent = gameState.chips.toFixed(2);
    if (elements.minesDice) elements.minesDice.textContent = gameState.dice;
    if (elements.blinkoChips) elements.blinkoChips.textContent = gameState.chips.toFixed(2);
    if (elements.blinkoDice) elements.blinkoDice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Slot Machine Functions (unchanged from original)
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

// Mines Game Functions (unchanged from original)
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
    
    if (elements.minesCurrentWin) elements.minesCurrentWin.textContent = '0.00';
    if (elements.minesMultiplier) elements.minesMultiplier.textContent = '1.0000x';
    if (elements.minesGrid) elements.minesGrid.innerHTML = '';
    
    if (elements.minesBetInput) {
        elements.minesBetInput.disabled = false;
        elements.minesBetInput.value = '';
    }
    if (elements.minesCountInput) {
        elements.minesCountInput.disabled = false;
        elements.minesCountInput.value = '';
    }
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

    const betAmount = parseFloat(elements.minesBetInput?.value);
    const minesCount = parseInt(elements.minesCountInput?.value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
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
    
    gameState.minesGame.multiplier = CONFIG.mines.getMultiplier(
        gameState.minesGame.minesCount,
        gameState.minesGame.revealedCells
    );
    
    gameState.minesGame.currentWin = parseFloat(
        (gameState.minesGame.betAmount * gameState.minesGame.multiplier).toFixed(4)
    );
    
    if (elements.minesCurrentWin) {
        elements.minesCurrentWin.textContent = gameState.minesGame.currentWin.toFixed(4);
    }
    if (elements.minesMultiplier) {
        elements.minesMultiplier.textContent = `${gameState.minesGame.multiplier.toFixed(4)}x`;
    }
    
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
            if (elements.minesGameOverAmount) {
                elements.minesGameOverAmount.textContent = `+${gameState.minesGame.currentWin.toFixed(4)}`;
            }
            if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'flex';
        } catch (error) {
            console.error('Win claim error:', error);
            showNotification('Failed to claim win', false);
        }
    } else {
        if (elements.minesGameOverMessage) elements.minesGameOverMessage.textContent = "Game Over!";
        if (elements.minesGameOverAmount) {
            elements.minesGameOverAmount.textContent = `-${gameState.minesGame.betAmount.toFixed(4)}`;
        }
        if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'flex';
    }
}

function closeMinesGameOverPopup() {
    if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'none';
    setupMinesGameUI();
}

// Blinko Game Functions
function initBlinkoGame() {
    if (!elements.blinkoCanvas) return;
    
    blinkoCtx = elements.blinkoCanvas.getContext('2d');
    elements.blinkoCanvas.width = CANVAS_WIDTH;
    elements.blinkoCanvas.height = CANVAS_HEIGHT;
    
    setupBlinkoGame();
    startBlinkoAnimation();
}

function setupBlinkoGame() {
    gameState.blinkoGame.balls = [];
    gameState.blinkoGame.pegs = [];
    gameState.blinkoGame.multiplierSlots = [];
    
    createBlinkoBoard();
    updateBlinkoStats();
}

function createBlinkoBoard() {
    // Create rectangular peg layout - lower and closer to buckets
    const rows = 10; // Reduced from 14
    const cols = 13; // Reduced from 15 for better coverage
    const pegSpacingX = 40; // Increased spacing
    const pegSpacingY = 45; // Increased spacing
    const startY = 150; // Moved down from 80
    const startX = (CANVAS_WIDTH - (cols - 1) * pegSpacingX) / 2;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Offset every other row for better ball interaction
            const offsetX = (row % 2) * (pegSpacingX / 2);
            const x = startX + col * pegSpacingX + offsetX;
            const y = startY + row * pegSpacingY;
            
            // Only add peg if it's within bounds
            if (x >= 80 && x <= CANVAS_WIDTH - 80) {
                gameState.blinkoGame.pegs.push({
                    x: x,
                    y: y,
                    glowing: false,
                    glowTime: 0
                });
            }
        }
    }
    
    // Create multiplier slots at the bottom
    const slotCount = 15;
    const slotWidth = CANVAS_WIDTH / slotCount;
    const multipliers = CONFIG.blinko.multipliers[gameState.blinkoGame.currentRisk];
    
    for (let i = 0; i < slotCount; i++) {
        gameState.blinkoGame.multiplierSlots.push({
            x: i * slotWidth,
            y: CANVAS_HEIGHT - 50,
            width: slotWidth,
            height: 50,
            multiplier: multipliers[i],
            highlight: false
        });
    }
}

function updateBlinkoStats() {
    if (elements.blinkoTotalDropped) {
        elements.blinkoTotalDropped.textContent = gameState.blinkoGame.totalDropped;
    }
    if (elements.blinkoTotalWon) {
        elements.blinkoTotalWon.textContent = gameState.blinkoGame.totalWon.toFixed(2);
    }
}

async function dropBlinkoBall() {
    const betAmount = parseFloat(elements.blinkoBetInput?.value);
    
    if (isNaN(betAmount) || betAmount < CONFIG.blinko.minBet || betAmount > CONFIG.blinko.maxBet) {
        showNotification(`Bet must be between ${CONFIG.blinko.minBet} and ${CONFIG.blinko.maxBet}`, false);
        return;
    }
    
    if (betAmount > gameState.chips) {
        showNotification("Not enough chips!", false);
        return;
    }
    
    try {
        // Deduct bet amount
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

        if (!response.ok) throw new Error('Failed to place bet');

        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        // Create new ball
        const ball = {
            x: CANVAS_WIDTH / 2,
            y: 30,
            vx: (Math.random() - 0.5) * 2,
            vy: 0,
            radius: BALL_RADIUS,
            betAmount: betAmount,
            bouncing: false
        };
        
        gameState.blinkoGame.balls.push(ball);
        gameState.blinkoGame.totalDropped++;
        updateBlinkoStats();
        
    } catch (error) {
        console.error('Blinko ball drop error:', error);
        showNotification('Failed to drop ball', false);
    }
}

function updateBlinkoBalls() {
    for (let i = gameState.blinkoGame.balls.length - 1; i >= 0; i--) {
        const ball = gameState.blinkoGame.balls[i];
        
        // Apply gravity
        ball.vy += GRAVITY;
        
        // Apply friction
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;
        
        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Bounce off side walls
        if (ball.x - ball.radius < 50) {
            ball.x = 50 + ball.radius;
            ball.vx = Math.abs(ball.vx) * BOUNCE;
        }
        if (ball.x + ball.radius > CANVAS_WIDTH - 50) {
            ball.x = CANVAS_WIDTH - 50 - ball.radius;
            ball.vx = -Math.abs(ball.vx) * BOUNCE;
        }
        
        // Check collision with pegs
        gameState.blinkoGame.pegs.forEach(peg => {
            const dx = ball.x - peg.x;
            const dy = ball.y - peg.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < ball.radius + PEG_RADIUS) {
                // Collision detected - prevent sticking by ensuring minimum separation
                const angle = Math.atan2(dy, dx);
                const minDistance = PEG_RADIUS + ball.radius + 1; // Add 1px buffer
                
                ball.x = peg.x + Math.cos(angle) * minDistance;
                ball.y = peg.y + Math.sin(angle) * minDistance;
                
                // Calculate bounce with more randomness to prevent sticking
                const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                const minSpeed = 2; // Ensure minimum speed to prevent sticking
                const actualSpeed = Math.max(speed * BOUNCE, minSpeed);
                
                ball.vx = Math.cos(angle) * actualSpeed + (Math.random() - 0.5) * 4;
                ball.vy = Math.sin(angle) * actualSpeed + Math.random() * 2; // Add downward bias
                
                // Make peg glow
                peg.glowing = true;
                peg.glowTime = 30;
            }
            
            // Update glow
            if (peg.glowing) {
                peg.glowTime--;
                if (peg.glowTime <= 0) {
                    peg.glowing = false;
                }
            }
        });
        
        // Ensure ball doesn't get stuck by adding minimum downward velocity
        if (Math.abs(ball.vy) < 0.5) {
            ball.vy += 0.5;
        }
        
        // Check if ball reached bottom
        if (ball.y > CANVAS_HEIGHT - 60) {
            // Find which slot the ball landed in
            const slotIndex = Math.floor(ball.x / (CANVAS_WIDTH / gameState.blinkoGame.multiplierSlots.length));
            const clampedIndex = Math.max(0, Math.min(slotIndex, gameState.blinkoGame.multiplierSlots.length - 1));
            const slot = gameState.blinkoGame.multiplierSlots[clampedIndex];
            
            if (slot) {
                const winAmount = ball.betAmount * slot.multiplier;
                handleBlinkoWin(winAmount);
                
                // Highlight slot briefly
                slot.highlight = true;
                setTimeout(() => slot.highlight = false, 500);
            }
            
            // Remove ball
            gameState.blinkoGame.balls.splice(i, 1);
        }
    }
}

async function handleBlinkoWin(amount) {
    if (amount > 0) {
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
                gameState.chips = data.newBalance;
                gameState.blinkoGame.totalWon += amount;
                updateCurrencyDisplay();
                updateBlinkoStats();
            }
        } catch (error) {
            console.error('Blinko win error:', error);
        }
    }
}

function drawBlinkoGame() {
    if (!blinkoCtx) return;
    
    // Clear canvas
    blinkoCtx.fillStyle = '#1a1a1a';
    blinkoCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // No background borders - removed square border
    
    // Draw pegs
    gameState.blinkoGame.pegs.forEach(peg => {
        blinkoCtx.beginPath();
        blinkoCtx.arc(peg.x, peg.y, PEG_RADIUS, 0, Math.PI * 2);
        
        if (peg.glowing) {
            const glowIntensity = peg.glowTime / 30;
            blinkoCtx.fillStyle = `rgba(255, 215, 0, ${0.3 + glowIntensity * 0.7})`;
            blinkoCtx.shadowColor = '#FFD700';
            blinkoCtx.shadowBlur = 15 * glowIntensity;
        } else {
            blinkoCtx.fillStyle = '#666';
            blinkoCtx.shadowBlur = 0;
        }
        
        blinkoCtx.fill();
        blinkoCtx.strokeStyle = '#FFD700';
        blinkoCtx.lineWidth = 2;
        blinkoCtx.stroke();
    });
    
    // Draw multiplier slots
    gameState.blinkoGame.multiplierSlots.forEach((slot, index) => {
        blinkoCtx.fillStyle = slot.highlight ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        blinkoCtx.fillRect(slot.x, slot.y, slot.width, slot.height);
        
        blinkoCtx.strokeStyle = '#FFD700';
        blinkoCtx.lineWidth = 1;
        blinkoCtx.strokeRect(slot.x, slot.y, slot.width, slot.height);
        
        // Draw multiplier text
        blinkoCtx.fillStyle = slot.multiplier >= 1 ? '#4CAF50' : '#f44336';
        blinkoCtx.font = 'bold 12px Arial';
        blinkoCtx.textAlign = 'center';
        blinkoCtx.fillText(
            `${slot.multiplier}x`,
            slot.x + slot.width / 2,
            slot.y + slot.height / 2 + 4
        );
    });
    
    // Draw balls
    gameState.blinkoGame.balls.forEach(ball => {
        blinkoCtx.beginPath();
        blinkoCtx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        blinkoCtx.fillStyle = '#FF5733';
        blinkoCtx.fill();
        blinkoCtx.strokeStyle = '#FFD700';
        blinkoCtx.lineWidth = 2;
        blinkoCtx.stroke();
    });
}

function startBlinkoAnimation() {
    function animate() {
        updateBlinkoBalls();
        drawBlinkoGame();
        gameState.blinkoGame.animationId = requestAnimationFrame(animate);
    }
    animate();
}

function stopBlinkoAnimation() {
    if (gameState.blinkoGame.animationId) {
        cancelAnimationFrame(gameState.blinkoGame.animationId);
        gameState.blinkoGame.animationId = null;
    }
}

function updateBlinkoRisk() {
    // Check if there are balls currently dropping
    if (gameState.blinkoGame.balls.length > 0) {
        showNotification("Cannot change risk level while balls are dropping!", false);
        // Reset select to current risk
        if (elements.blinkoRiskSelect) {
            elements.blinkoRiskSelect.value = gameState.blinkoGame.currentRisk;
        }
        return;
    }
    
    const risk = elements.blinkoRiskSelect?.value || 'medium';
    gameState.blinkoGame.currentRisk = risk;
    
    // Update multiplier slots
    const multipliers = CONFIG.blinko.multipliers[risk];
    gameState.blinkoGame.multiplierSlots.forEach((slot, index) => {
        slot.multiplier = multipliers[index];
    });
}

// Game Navigation Functions
function showGameSelectScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    hideAllScreens();
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'block';
    updateCurrencyDisplay();
    stopBlinkoAnimation();
}

function startSlotMachineGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'slots';
    hideAllScreens();
    if (elements.gameScreen) elements.gameScreen.style.display = 'block';
    stopBlinkoAnimation();
}

function startMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'mines';
    hideAllScreens();
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'block';
    setupMinesGameUI();
    stopBlinkoAnimation();
}

function startBlinkoGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'blinko';
    hideAllScreens();
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'block';
    initBlinkoGame();
}

function hideAllScreens() {
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'none';
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
    
    // Update all user displays
    const userDisplays = [
        { username: elements.usernameDisplay, avatar: elements.userAvatar },
        { username: elements.minesUsername, avatar: elements.minesAvatar },
        { username: elements.blinkoUsername, avatar: elements.blinkoAvatar }
    ];
    
    userDisplays.forEach(display => {
        if (display.username) display.username.textContent = user.username;
        if (display.avatar) display.avatar.src = user.avatar || 'assets/default-avatar.png';
    });
    
    showGameSelectScreen();
    updateCurrencyDisplay();
    
    // Initialize slot machine reels
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
    });
}

function showLoginScreen() {
    hideAllScreens();
    if (elements.loginScreen) elements.loginScreen.style.display = 'block';
    gameState.userId = null;
    if (elements.tokenInput) elements.tokenInput.value = '';
    stopBlinkoAnimation();
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

// Logout buttons
if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', logout);
if (elements.minesLogoutBtn) elements.minesLogoutBtn.addEventListener('click', logout);
if (elements.blinkoLogoutBtn) elements.blinkoLogoutBtn.addEventListener('click', logout);

// Game buttons
if (elements.spinBtn) elements.spinBtn.addEventListener('click', startSpin);
if (elements.claimBtn) elements.claimBtn.addEventListener('click', claimWin);

// Game selection
if (elements.slotMachineBtn) elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
if (elements.minesGameBtn) elements.minesGameBtn.addEventListener('click', startMinesGame);
if (elements.blinkoGameBtn) elements.blinkoGameBtn.addEventListener('click', startBlinkoGame);

// Mines game
if (elements.minesStartBtn) elements.minesStartBtn.addEventListener('click', startNewMinesGame);
if (elements.minesCashoutBtn) elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
if (document.getElementById('mines-game-over-close')) {
    document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);
}

// Blinko game
if (elements.blinkoDropBtn) elements.blinkoDropBtn.addEventListener('click', dropBlinkoBall);
if (elements.blinkoRiskSelect) elements.blinkoRiskSelect.addEventListener('change', updateBlinkoRisk);

// Back to menu buttons
if (elements.backToMenuBtn) elements.backToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.minesBackToMenuBtn) elements.minesBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.blinkoBackToMenuBtn) elements.blinkoBackToMenuBtn.addEventListener('click', showGameSelectScreen);

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes landingBounce {
        0% { transform: translateY(0%) scale(1); }
        50% { transform: translateY(-20%) scale(1.1); }
        100% { transform: translateY(0%) scale(1); }
    }
`;
document.head.appendChild(style);

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
