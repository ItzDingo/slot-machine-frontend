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
                1: 1.04,  2: 1.07,  3: 1.10,
                4: 1.14,  5: 1.18,  6: 1.23,
                7: 1.29,  8: 1.35,  9: 1.42,
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
        rows: 15,
        pegSpacing: 30,
        ballRadius: 8,
        pegRadius: 6,
        bucketWidth: 40,
        multipliers: {
            low: [1.2, 1.5, 2, 3, 5, 8, 12, 20, 30, 50],
            medium: [1.5, 2, 3, 5, 8, 12, 20, 30, 50, 100],
            high: [2, 3, 5, 8, 12, 20, 30, 50, 100, 200]
        },
        physics: {
            gravity: 0.2,
            bounce: 0.6,
            friction: 0.99,
            pegBounce: 0.8
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
    blinkoGame: {
        betAmount: 0,
        riskLevel: 'medium',
        balls: [],
        pegs: [],
        buckets: [],
        currentMultiplier: 1.0,
        totalWin: 0,
        gameActive: false,
        animationId: null
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
    blinkoGameScreen: document.getElementById('blinko-game-screen'),
    blinkoBetInput: document.getElementById('blinko-bet-input'),
    blinkoRiskSelect: document.getElementById('blinko-risk-select'),
    blinkoDropBtn: document.getElementById('blinko-drop-btn'),
    blinkoBackBtn: document.getElementById('blinko-back-to-menu-btn'),
    blinkoBoard: document.getElementById('blinko-board'),
    blinkoBuckets: document.getElementById('blinko-buckets'),
    blinkoMultiplier: document.getElementById('blinko-multiplier'),
    blinkoWinAmount: document.getElementById('blinko-win-amount'),
    blinkoWinPopup: document.getElementById('blinko-win-popup'),
    blinkoWinPosition: document.getElementById('blinko-win-position'),
    blinkoWinValue: document.getElementById('blinko-win-value'),
    blinkoClaimBtn: document.getElementById('blinko-claim-btn'),
    blinkoUsername: document.getElementById('blinko-username'),
    blinkoAvatar: document.getElementById('blinko-avatar'),
    blinkoChips: document.getElementById('blinko-chips'),
    blinkoDice: document.getElementById('blinko-dice')
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
    if (elements.blinkoChips) elements.blinkoChips.textContent = gameState.chips.toFixed(2);
    if (elements.blinkoDice) elements.blinkoDice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger reflow to apply initial styles
    notification.offsetHeight;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
async function startNewMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }

    const betAmount = parseFloat(elements.minesBetInput?.value);
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
function startBlinkoGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'blinko';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'block';
    
    setupBlinkoGame();
}

function setupBlinkoGame() {
    gameState.blinkoGame = {
        betAmount: 0,
        riskLevel: 'medium',
        balls: [],
        pegs: [],
        buckets: [],
        currentMultiplier: 1.0,
        totalWin: 0,
        gameActive: false,
        animationId: null
    };
    
    if (elements.blinkoMultiplier) elements.blinkoMultiplier.textContent = '1.00x';
    if (elements.blinkoWinAmount) elements.blinkoWinAmount.textContent = '0.00';
    if (elements.blinkoBoard) elements.blinkoBoard.innerHTML = '';
    if (elements.blinkoBuckets) elements.blinkoBuckets.innerHTML = '';
    
    createBlinkoBoard();
    createBlinkoBuckets();
}

function createBlinkoBoard() {
    if (!elements.blinkoBoard) return;
    
    const boardWidth = elements.blinkoBoard.clientWidth;
    const pegSpacing = CONFIG.blinko.pegSpacing;
    const pegRadius = CONFIG.blinko.pegRadius;
    
    // Create pegs in triangular pattern
    for (let row = 0; row < CONFIG.blinko.rows; row++) {
        const pegsInRow = row + 1;
        const startX = (boardWidth - (pegsInRow * pegSpacing)) / 2;
        
        for (let col = 0; col < pegsInRow; col++) {
            const peg = document.createElement('div');
            peg.className = 'blinko-peg';
            peg.style.left = `${startX + col * pegSpacing}px`;
            peg.style.top = `${50 + row * pegSpacing}px`;
            elements.blinkoBoard.appendChild(peg);
            
            gameState.blinkoGame.pegs.push({
                element: peg,
                x: startX + col * pegSpacing,
                y: 50 + row * pegSpacing,
                radius: pegRadius
            });
        }
    }
}

function createBlinkoBuckets() {
    if (!elements.blinkoBuckets) return;
    
    const bucketCount = CONFIG.blinko.rows + 1;
    const bucketWidth = CONFIG.blinko.bucketWidth;
    const multipliers = CONFIG.blinko.multipliers[gameState.blinkoGame.riskLevel];
    
    for (let i = 0; i < bucketCount; i++) {
        const bucket = document.createElement('div');
        bucket.className = 'blinko-bucket';
        bucket.dataset.index = i;
        bucket.dataset.multiplier = multipliers[Math.min(i, multipliers.length - 1)];
        bucket.textContent = String.fromCharCode(65 + i);
        bucket.setAttribute('data-multiplier', multipliers[Math.min(i, multipliers.length - 1)]);
        elements.blinkoBuckets.appendChild(bucket);
        
        gameState.blinkoGame.buckets.push({
            element: bucket,
            x: i * bucketWidth + bucketWidth / 2,
            y: elements.blinkoBuckets.clientHeight / 2,
            width: bucketWidth,
            multiplier: multipliers[Math.min(i, multipliers.length - 1)]
        });
    }
}

async function dropBlinkoBall() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }

    const betAmount = parseFloat(elements.blinkoBetInput?.value);
    
    if (isNaN(betAmount)) {
        showNotification("Please enter a valid bet amount", false);
        return;
    }
    
    if (betAmount < CONFIG.blinko.minBet || betAmount > CONFIG.blinko.maxBet) {
        showNotification(`Bet amount must be between ${CONFIG.blinko.minBet} and ${CONFIG.blinko.maxBet}`, false);
        return;
    }
    
    if (betAmount > gameState.chips) {
        showNotification("Not enough chips for this bet", false);
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
                cost: betAmount
            }),
            credentials: 'include'
        });

        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        gameState.blinkoGame.betAmount = betAmount;
        gameState.blinkoGame.riskLevel = elements.blinkoRiskSelect?.value || 'medium';
        
        createBlinkoBall();
        
        if (!gameState.blinkoGame.animationId) {
            gameState.blinkoGame.animationId = requestAnimationFrame(animateBlinkoBalls);
        }
    } catch (error) {
        console.error('Blinko ball drop error:', error);
        showNotification('Failed to drop ball. Please try again.', false);
    }
}

function createBlinkoBall() {
    if (!elements.blinkoBoard) return;
    
    const ball = document.createElement('div');
    ball.className = 'blinko-ball';
    
    // Start position at top center of board
    const startX = elements.blinkoBoard.clientWidth / 2;
    const startY = 20;
    
    ball.style.left = `${startX}px`;
    ball.style.top = `${startY}px`;
    elements.blinkoBoard.appendChild(ball);
    
    gameState.blinkoGame.balls.push({
        element: ball,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
        radius: CONFIG.blinko.ballRadius,
        settled: false,
        bucketIndex: -1
    });
}

function animateBlinkoBalls() {
    const physics = CONFIG.blinko.physics;
    const boardHeight = elements.blinkoBoard?.clientHeight || 500;
    const boardWidth = elements.blinkoBoard?.clientWidth || 500;
    const bucketHeight = elements.blinkoBuckets?.clientHeight || 40;
    
    let activeBalls = 0;
    
    gameState.blinkoGame.balls.forEach(ball => {
        if (ball.settled) return;
        
        activeBalls++;
        
        // Apply gravity
        ball.vy += physics.gravity;
        
        // Apply friction
        ball.vx *= physics.friction;
        ball.vy *= physics.friction;
        
        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Check for collisions with pegs
        gameState.blinkoGame.pegs.forEach(peg => {
            const dx = ball.x - peg.x;
            const dy = ball.y - peg.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < ball.radius + peg.radius) {
                // Collision detected
                peg.element.style.animation = 'pegGlow 0.3s';
                setTimeout(() => {
                    peg.element.style.animation = '';
                }, 300);
                
                // Calculate collision normal
                const nx = dx / distance;
                const ny = dy / distance;
                
                // Calculate relative velocity
                const p = 2 * (ball.vx * nx + ball.vy * ny);
                
                // Update ball velocity (bounce)
                ball.vx = (ball.vx - p * nx) * physics.pegBounce;
                ball.vy = (ball.vy - p * ny) * physics.pegBounce;
                
                // Move ball out of collision
                const overlap = ball.radius + peg.radius - distance;
                ball.x += nx * overlap * 1.1;
                ball.y += ny * overlap * 1.1;
            }
        });
        
        // Check for wall collisions
        if (ball.x < ball.radius) {
            ball.x = ball.radius;
            ball.vx *= -physics.bounce;
        } else if (ball.x > boardWidth - ball.radius) {
            ball.x = boardWidth - ball.radius;
            ball.vx *= -physics.bounce;
        }
        
        // Check if ball reached bottom
        if (ball.y > boardHeight - ball.radius - bucketHeight) {
            // Check which bucket it landed in
            const bucketIndex = Math.floor(ball.x / CONFIG.blinko.bucketWidth);
            const bucket = gameState.blinkoGame.buckets[bucketIndex];
            
            if (bucket) {
                ball.settled = true;
                ball.bucketIndex = bucketIndex;
                
                // Calculate win amount
                const multiplier = bucket.multiplier;
                const winAmount = gameState.blinkoGame.betAmount * multiplier;
                
                gameState.blinkoGame.currentMultiplier = multiplier;
                gameState.blinkoGame.totalWin += winAmount;
                
                if (elements.blinkoMultiplier) {
                    elements.blinkoMultiplier.textContent = `${multiplier.toFixed(2)}x`;
                }
                if (elements.blinkoWinAmount) {
                    elements.blinkoWinAmount.textContent = gameState.blinkoGame.totalWin.toFixed(2);
                }
                
                // Show win popup
                showBlinkoWinPopup(bucketIndex, winAmount);
            }
        }
        
        // Update ball position
        ball.element.style.left = `${ball.x - ball.radius}px`;
        ball.element.style.top = `${ball.y - ball.radius}px`;
    });
    
    // Remove settled balls after a delay
    gameState.blinkoGame.balls = gameState.blinkoGame.balls.filter(ball => {
        if (ball.settled && Date.now() - ball.settled > 3000) {
            ball.element.remove();
            return false;
        }
        return true;
    });
    
    if (activeBalls > 0) {
        gameState.blinkoGame.animationId = requestAnimationFrame(animateBlinkoBalls);
    } else {
        gameState.blinkoGame.animationId = null;
    }
}

function showBlinkoWinPopup(bucketIndex, winAmount) {
    if (!elements.blinkoWinPopup || !elements.blinkoWinPosition || !elements.blinkoWinValue) return;
    
    const bucketLetter = String.fromCharCode(65 + bucketIndex);
    elements.blinkoWinPosition.textContent = `Bucket ${bucketLetter}`;
    elements.blinkoWinValue.textContent = winAmount.toFixed(2);
    elements.blinkoWinPopup.style.display = 'flex';
}

async function claimBlinkoWin() {
    if (gameState.blinkoGame.totalWin <= 0) {
        if (elements.blinkoWinPopup) elements.blinkoWinPopup.style.display = 'none';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/win`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                amount: gameState.blinkoGame.totalWin
            }),
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            gameState.chips = data.newBalance;
            updateCurrencyDisplay();
            
            gameState.blinkoGame.totalWin = 0;
            if (elements.blinkoWinAmount) elements.blinkoWinAmount.textContent = '0.00';
        }
    } catch (error) {
        console.error('Blinko win claim error:', error);
        showNotification('Failed to claim win. Please try again.', false);
    }
    
    if (elements.blinkoWinPopup) elements.blinkoWinPopup.style.display = 'none';
}

// Navigation Functions
function showGameSelectScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'none';
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
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'none';
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
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'block';
    setupMinesGameUI();
}

function setupMinesGameUI() {
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
}

function showLoginScreen() {
    if (elements.loginScreen) elements.loginScreen.style.display = 'block';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.blinkoGameScreen) elements.blinkoGameScreen.style.display = 'none';
    gameState.userId = null;
    if (elements.tokenInput) elements.tokenInput.value = '';
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
    if (elements.blinkoUsername) elements.blinkoUsername.textContent = user.username;
    if (elements.blinkoAvatar) elements.blinkoAvatar.src = user.avatar || 'assets/default-avatar.png';
    
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
    } else if (gameState.currentGame === 'blinko') {
        setupBlinkoGame();
    }
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

// Event Listeners
document.addEventListener('DOMContentLoaded', initGame);

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
if (elements.blinkoLogoutBtn) elements.blinkoLogoutBtn.addEventListener('click', logout);
if (elements.spinBtn) elements.spinBtn.addEventListener('click', startSpin);
if (elements.claimBtn) elements.claimBtn.addEventListener('click', claimWin);
if (elements.blinkoClaimBtn) elements.blinkoClaimBtn.addEventListener('click', claimBlinkoWin);

if (elements.slotMachineBtn) elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
if (elements.minesGameBtn) elements.minesGameBtn.addEventListener('click', startMinesGame);
if (elements.blinkoGameBtn) elements.blinkoGameBtn.addEventListener('click', startBlinkoGame);
if (elements.minesStartBtn) elements.minesStartBtn.addEventListener('click', startNewMinesGame);
if (elements.minesCashoutBtn) elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
if (elements.blinkoDropBtn) elements.blinkoDropBtn.addEventListener('click', dropBlinkoBall);

if (document.getElementById('mines-game-over-close')) {
    document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);
}

if (elements.backToMenuBtn) elements.backToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.minesBackToMenuBtn) elements.minesBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.blinkoBackBtn) elements.blinkoBackBtn.addEventListener('click', showGameSelectScreen);

// Handle risk level change
if (elements.blinkoRiskSelect) {
    elements.blinkoRiskSelect.addEventListener('change', () => {
        gameState.blinkoGame.riskLevel = elements.blinkoRiskSelect.value;
        createBlinkoBuckets();
    });
}
