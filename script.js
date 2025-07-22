// Game Configuration
const CONFIG = {
    spinCost: 10,
    initialChips: 30,
    initialDice: 0,
    spinSettings: {
        minDuration: 5000,
        maxDuration: 7000,
        spinUpTime: 200,
        spinDownTime: 500,
        maxSpeed: 20
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
    chips: CONFIG.initialChips,
    dice: CONFIG.initialDice,
    isSpinning: false,
    spinningReels: 0,
    currentSymbols: [],
    winAmount: 0,
    winCombo: null
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

// Initialize Game
initGame();

function initGame() {
    // Set up event listeners
    spinBtn.addEventListener('click', startSpin);
    claimBtn.addEventListener('click', claimWin);
    
    // Initialize reels
    reels.forEach((reel, index) => {
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
    });
    
    updateCurrencyDisplay();
}

function startSpin() {
    if (gameState.isSpinning || gameState.chips < CONFIG.spinCost) {
        if (gameState.chips < CONFIG.spinCost) {
            alert("Not enough chips!");
        }
        return;
    }

    // Deduct chips
    gameState.chips -= CONFIG.spinCost;
    updateCurrencyDisplay();
    
    // Reset state
    gameState.isSpinning = true;
    gameState.spinningReels = reels.length;
    gameState.winAmount = 0;
    gameState.winCombo = null;
    spinBtn.disabled = true;
    winPopup.style.display = 'none';

    // Set target symbols
    const targetSymbols = reels.map(() => getRandomSymbol());
    gameState.currentSymbols = targetSymbols.map(s => s.name);

    // Start spinning all reels
    reels.forEach((reel, index) => {
        const duration = CONFIG.spinSettings.minDuration + 
                       Math.random() * (CONFIG.spinSettings.maxDuration - CONFIG.spinSettings.minDuration);
        spinReel(reel, targetSymbols[index], duration, index === reels.length - 1);
    });
}

function spinReel(reel, targetSymbol, duration, isLastReel) {
    // Create extended reel strip
    reel.innerHTML = '';
    const symbols = [];
    for (let i = -2; i <= 2; i++) {
        const symbol = i === 0 ? targetSymbol : getRandomSymbol();
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        symbolElement.style.transform = `translateY(${i * 100}%)`;
        reel.appendChild(symbolElement);
        symbols.push(symbolElement);
    }

    let currentPosition = 0;
    let currentSpeed = 0;
    const startTime = Date.now();
    const stopTime = startTime + duration;
    const slowDownTime = stopTime - CONFIG.spinSettings.spinDownTime;

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;

        if (now < stopTime) {
            // Acceleration
            if (elapsed < CONFIG.spinSettings.spinUpTime) {
                currentSpeed = easeIn(elapsed / CONFIG.spinSettings.spinUpTime) * CONFIG.spinSettings.maxSpeed;
            } 
            // Deceleration
            else if (now > slowDownTime) {
                const decelProgress = 1 - ((stopTime - now) / CONFIG.spinSettings.spinDownTime);
                currentSpeed = easeOut(decelProgress) * CONFIG.spinSettings.maxSpeed;
            }
            // Full speed
            else {
                currentSpeed = CONFIG.spinSettings.maxSpeed;
            }

            // Move symbols down
            currentPosition += currentSpeed;

            // Update positions
            symbols.forEach((symbol, i) => {
                symbol.style.transform = `translateY(${(i - 2) * 100 + currentPosition}%)`;
            });

            // Infinite scroll
            if (currentPosition > 200) {
                currentPosition = 0;
                const firstSymbol = symbols.shift();
                firstSymbol.style.transform = `translateY(${symbols.length * 100}%)`;
                firstSymbol.innerHTML = `<img src="${getRandomSymbol().img}" alt="symbol">`;
                symbols.push(firstSymbol);
            }

            requestAnimationFrame(animate);
        } else {
            // Stop the reel
            resetReel(reel, targetSymbol);
            gameState.spinningReels--;

            // If last reel, check for win after delay
            if (isLastReel) {
                setTimeout(() => {
                    checkWin();
                    gameState.isSpinning = false;
                    spinBtn.disabled = false;
                }, 2000);
            }
        }
    }

    requestAnimationFrame(animate);
}

function checkWin() {
    const combo = gameState.currentSymbols.join('-');
    
    if (CONFIG.payouts[combo]) {
        gameState.winAmount = CONFIG.payouts[combo];
        gameState.winCombo = combo;
        showWinPopup(combo, gameState.winAmount);
    } else if (gameState.currentSymbols[0] === gameState.currentSymbols[1] || 
               gameState.currentSymbols[1] === gameState.currentSymbols[2] || 
               gameState.currentSymbols[0] === gameState.currentSymbols[2]) {
        gameState.winAmount = CONFIG.payouts['ANY_TWO_MATCH'];
        gameState.winCombo = 'ANY_TWO_MATCH';
        showWinPopup('ANY_TWO_MATCH', gameState.winAmount);
    }
}

function showWinPopup(combo, amount) {
    const comboDisplay = combo === 'ANY_TWO_MATCH' ? 
        'Two Matching Symbols' : 
        combo.split('-').join(' ');
    
    winComboDisplay.innerHTML = `
        <div class="combo-symbols">${comboDisplay}</div>
    `;
    winAmountDisplay.textContent = amount;
    winPopup.style.display = 'flex';
}

function claimWin() {
    gameState.chips += gameState.winAmount;
    gameState.winAmount = 0;
    gameState.winCombo = null;
    updateCurrencyDisplay();
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

// Easing functions
function easeIn(t) { return t * t; }
function easeOut(t) { return t * (2 - t); }