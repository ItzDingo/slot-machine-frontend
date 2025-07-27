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
        minBet: 0.1,  // Now accepts decimal bets
        maxBet: 10000,
        minMines: 1,
        maxMines: 10,
        getGridSize: function(minesCount) {
            if (minesCount <= 6) return 5;    // 5x5 grid (25 cells)
            if (minesCount <= 9) return 6;    // 6x6 grid (36 cells)
            return 6;                         // 7x7 grid (49 cells)
        },
        getMultiplier: function(minesCount, revealedCells) {
    // Base risk multipliers - higher mines = higher base multiplier
    const baseMultipliers = {
        1: 1.04,   // Lowest base for 1 mine
        2: 1.07,
        3: 1.10,
        4: 1.15,
        5: 1.18,
        6: 1.23,
        7: 1.30,
        8: 1.45,
        9: 1.65,
        10: 2   // Highest base for 10 mines
    };
    
    // Growth factors - higher mines get more aggressive growth per reveal
    const growthFactors = {
        1: 0.02,   // +2% per reveal for 1 mine
        2: 0.03,
        3: 0.04,
        4: 0.05,
        5: 0.06,
        6: 0.08,
        7: 0.10,
        8: 0.13,
        9: 0.16,
        10: 0.20   // +20% per reveal for 10 mines
    };
    
    // Get base and growth values based on mine count
    const base = baseMultipliers[minesCount] || 1.0;
    const growth = growthFactors[minesCount] || 0.05;
    
    // Calculate multiplier with compounding growth
    const rawMultiplier = base * Math.pow(1 + growth, revealedCells);
    
    // Apply house edge and return with 4 decimal precision
    const withHouseEdge = rawMultiplier * (1 - this.houseEdge);
    return parseFloat(withHouseEdge.toFixed(4));
},
        houseEdge: 0.03  // 3% house edge
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
    if (elements.chipsDisplay) elements.chipsDisplay.textContent = gameState.chips.toFixed(2);
    if (elements.diceDisplay) elements.diceDisplay.textContent = gameState.dice;
    if (elements.minesChips) elements.minesChips.textContent = gameState.chips.toFixed(2);
    if (elements.minesDice) elements.minesDice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Slot Machine Functions (unchanged)
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

// Mines Game Functions (updated for float numbers)
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
    if (elements.minesCashoutBtn) {
    elements.minesCashoutBtn.disabled = true;
    elements.minesCashoutBtn.classList.add('disabled');
}
    
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
    
    const gridSize = CONFIG.mines.getGridSize(gameState.minesGame.minesCount);
    gameState.minesGame.totalCells = gridSize * gridSize;
    
    // Clear existing grid
    elements.minesGrid.innerHTML = '';
    
    // Set up the grid template
    elements.minesGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    // Create cells
    for (let i = 0; i < gameState.minesGame.totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'mines-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => revealMineCell(i));
        elements.minesGrid.appendChild(cell);
    }
}


function placeMines(minesCount) {
    const gridSize = CONFIG.mines.getGridSize(minesCount);
    const totalCells = gridSize * gridSize;
    
    gameState.minesGame.minePositions = [];
    const positions = Array.from({length: totalCells}, (_, i) => i);
    
    // Fisher-Yates shuffle
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
    
    // Check if cell contains a mine
    if (gameState.minesGame.minePositions.includes(index)) {
        cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
        cell.classList.add('mine');
        endMinesGame(false);
        return;
    }
    
    // Reveal the safe cell
    cell.classList.add('revealed');
    cell.innerHTML = '<div class="safe-cell"></div>'; // Add visual for safe cell
    gameState.minesGame.revealedCells++;
    
    // Calculate new multiplier with the updated system
    gameState.minesGame.multiplier = CONFIG.mines.getMultiplier(
        gameState.minesGame.minesCount,
        gameState.minesGame.revealedCells
    );
    
    // Update current win with precise decimal values
    gameState.minesGame.currentWin = parseFloat(
        (gameState.minesGame.betAmount * gameState.minesGame.multiplier).toFixed(4)
    );
    
    // Update UI
    if (elements.minesCurrentWin) {
        elements.minesCurrentWin.textContent = gameState.minesGame.currentWin.toFixed(4);
    }
    if (elements.minesMultiplier) {
        elements.minesMultiplier.textContent = `${gameState.minesGame.multiplier.toFixed(4)}x`;
    }
    
    // Enable cashout button after minimum 2 reveals
    // Enable cashout button after 2 reveals
if (gameState.minesGame.revealedCells >= 2 && elements.minesCashoutBtn) {
    elements.minesCashoutBtn.disabled = false;
    elements.minesCashoutBtn.classList.remove('disabled');
} else {
    elements.minesCashoutBtn.disabled = true;
    elements.minesCashoutBtn.classList.add('disabled');
}
    
    // Add visual feedback for multiplier increase
    cell.querySelector('.safe-cell').textContent = `+${(CONFIG.mines.growthFactors[gameState.minesGame.minesCount] * 100).toFixed(0)}%`;
    setTimeout(() => {
        if (cell.querySelector('.safe-cell')) {
            cell.querySelector('.safe-cell').textContent = '';
        }
    }, 1000);
    
    // Check for automatic win if all safe cells are revealed
    const safeCells = gameState.minesGame.totalCells - gameState.minesGame.minesCount;
    if (gameState.minesGame.revealedCells === safeCells) {
        endMinesGame(true);

    }
}

function cashoutMinesGame() {
    // Minimum 2 cells must be revealed before cashing out
    if (gameState.minesGame.revealedCells < 2) {
        showNotification("You need to reveal at least 2 cells to cashout", false);
        return;
    }
    
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
            // More detailed error handling
            if (response.status === 401) {
                console.log('Session expired or not authenticated');
            } else {
                console.error('Auth check failed with status:', response.status);
            }
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
        if (!authCheck) {
            console.log('User not authenticated, showing login screen');
            showLoginScreen();
        } else {
            console.log('User authenticated');
            gameState.authChecked = true;
        }
    } catch (error) {
        console.error('Initialization error:', error);
        showLoginScreen();
    }
}

document.addEventListener('DOMContentLoaded', initGame);
