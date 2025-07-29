// API Configuration
const API_BASE_URL = 'https://slot-machine-backend-34lg.onrender.com';

// Game Configuration
const CONFIG = {
    spinCost: 10,
    lootboxCost: 50,
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
    lootboxItems: [
        { name: 'MP7 Abyssal Apparition', img: 'spins/MP7-Abyssal-Apparition.png', rarity: 'legendary', chance: 1.07, value: 500 },
        { name: 'SCAR20 Poultrygeist', img: 'spins/SCAR-20-Poultrygeist-Skin.png', rarity: 'common', chance: 14.28, value: 50 },
        { name: 'M4A1-S Night Terror', img: 'spins/M4A1-S-Night-Terror.png', rarity: 'epic', chance: 3.2, value: 200 },
        { name: 'P2000 Lifted Spirits', img: 'spins/P2000-Lifted-Spirits.png', rarity: 'common', chance: 14.28, value: 50 },
        { name: 'USP-S Ticket to Hell', img: 'spins/USP-Ticket-to-Hell-Skin.png', rarity: 'epic', chance: 2.55, value: 200 },
        { name: 'MAG-7 Foresight', img: 'spins/MAG-7-Foresight-Skin.png', rarity: 'common', chance: 14.28, value: 50 },
        { name: 'G3SG1 Dream Glade', img: 'spins/G3SG1-Dream-Glade-Skin.png', rarity: 'uncommon', chance: 11.28, value: 100 },
        { name: 'AK-47 Nightwish', img: 'spins/AK-47-Nightwish-Skin.png', rarity: 'legendary', chance: 0.32, value: 500 },
        { name: 'XM1014 Zombie Offensive', img: 'spins/XM1014-Zombie-Offensive-Skin.png', rarity: 'uncommon', chance: 11.28, value: 100 },
        { name: 'MP9 Starlight Protector', img: 'spins/MP9-Starlight-Protector-Skin.png', rarity: 'legendary', chance: 0.32, value: 500 },
        { name: 'PP-Bizon Space Cat', img: 'spins/PP-Bizon-Space-Cat-Skin.png', rarity: 'uncommon', chance: 14.28, value: 100 },
        { name: 'Dual Berettas Melondrama', img: 'spins/Dual-Berettas-Melondrama-Skin.png', rarity: 'legendary', chance: 1.07, value: 500 },
        { name: 'Five SeveN Scrawl', img: 'spins/Five-SeveN-Scrawl-Skin.png', rarity: 'common', chance: 11.28, value: 50 },
        { name: 'FAMAS Rapid Eye Movement', img: 'spins/FAMAS-Rapid-Eye-Movement-Skin.png', rarity: 'legendary', chance: 1.07, value: 500 },
        { name: 'MAC-10 Ensnared', img: 'spins/MAC-10-Ensnared-Skin.png', rarity: 'common', chance: 14.28, value: 50 },
        { name: 'MP5-SD Necro Jr', img: 'spins/MP5-SD-Necro-Jr-Skin.png', rarity: 'common', chance: 14.28, value: 50 },
        { name: 'Sawed-Off Spirit Board', img: 'spins/Sawed-Off-Spirit-Board-Skin.png', rarity: 'common', chance: 14.28, value: 15 },
        { name: 'Knife', img: 'spins/gold.png', rarity: 'mythic', chance: 0.3, value: 0 }
    ],
    // New knife system for mythic rewards
    knifes: [
        { name: 'Butterfly Knife Black Laminate', img: 'spins/Butterfly-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Huntsman Knife Black Laminate', img: 'spins/Huntsman-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Bowie Knife Bright Water', img: 'spins/Bowie-Knife-Bright-Water-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Butterfly Knife Lore', img: 'spins/Butterfly-Knife-Lore-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Huntsman Knife Freehand', img: 'spins/Huntsman-Knife-Freehand-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Huntsman Knife Lore', img: 'spins/Huntsman-Knife-Lore-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Butterfly Knife Autotronic', img: 'spins/Butterfly-Knife-Autotronic-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Huntsman Knife Bright Water', img: 'spins/Huntsman-Knife-Bright-Water-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Butterfly Knife Freehand', img: 'spins/Butterfly-Knife-Freehand-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Shadow Daggers Freehand', img: 'spins/Shadow-Daggers-Freehand-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Huntsman Knife Gamma Doppler', img: 'spins/Huntsman-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Butterfly Knife Gamma Doppler', img: 'spins/Butterfly-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Bowie Knife Gamma Doppler', img: 'spins/Bowie-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Shadow Daggers Gamma Doppler', img: 'spins/Shadow-Daggers-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Falchion Knife Gamma Doppler', img: 'spins/Falchion-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Bowie Knife Lore', img: 'spins/Bowie-Knife-Lore-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Bowie Knife Black Laminate', img: 'spins/Bowie-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Falchion Knife Autotronic', img: 'spins/Falchion-Knife-Autotronic-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Bowie Knife Autotronic', img: 'spins/Bowie-Knife-Autotronic-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Bowie Knife Freehand', img: 'spins/Bowie-Knife-Freehand-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 },
        { name: 'Falchion Knife Black Laminate', img: 'spins/Falchion-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.00867, value: 5000 }
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
        maxBet: 100000,
        minMines: 1,
        maxMines: 10,
        getGridSize: function(minesCount) {
            if (minesCount <= 6) return 5;
            if (minesCount <= 9) return 6;
            return 7;
        },
        getMultiplier: function(minesCount, revealedCells) {
            const baseMultipliers = {
                1: 1.04,
                2: 1.07,
                3: 1.10,
                4: 1.15,
                5: 1.18,
                6: 1.23,
                7: 1.30,
                8: 1.45,
                9: 1.65,
                10: 2
            };
            
            const growthFactors = {
                1: 0.02,
                2: 0.03,
                3: 0.04,
                4: 0.05,
                5: 0.06,
                6: 0.08,
                7: 0.10,
                8: 0.13,
                9: 0.16,
                10: 0.20
            };
            
            const base = baseMultipliers[minesCount] || 1.0;
            const growth = growthFactors[minesCount] || 0.05;
            
            const rawMultiplier = base * Math.pow(1 + growth, revealedCells);
            
            const withHouseEdge = rawMultiplier * (1 - this.houseEdge);
            return parseFloat(withHouseEdge.toFixed(4));
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
    },
    lootboxGame: {
        isSpinning: false,
        currentItem: null
    },
    inventory: []
};

// Loot Box Variables
let lootboxItems = [];
let isLootboxSpinning = false;
let spinAnimation = null;

// Inventory Variables
let currentSellingItem = null;

// DOM Elements
const elements = {
    loginScreen: document.getElementById('login-screen'),
    gameScreen: document.getElementById('game-screen'),
    tokenInput: document.getElementById('token-input'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    minesLogoutBtn: document.getElementById('mines-logout-btn'),
    lootboxLogoutBtn: document.getElementById('lootbox-logout-btn'),
    inventoryLogoutBtn: document.getElementById('inventory-logout-btn'),
    usernameDisplay: document.getElementById('username'),
    userAvatar: document.getElementById('user-avatar'),
    lootboxUsername: document.getElementById('lootbox-username'),
    lootboxAvatar: document.getElementById('lootbox-avatar'),
    inventoryUsername: document.getElementById('inventory-username'),
    inventoryAvatar: document.getElementById('inventory-avatar'),
    chipsDisplay: document.getElementById('chips'),
    diceDisplay: document.getElementById('dice'),
    lootboxChips: document.getElementById('lootbox-chips'),
    lootboxDice: document.getElementById('lootbox-dice'),
    inventoryChips: document.getElementById('inventory-chips'),
    inventoryDice: document.getElementById('inventory-dice'),
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
    lootboxBtn: document.getElementById('lootbox-btn'),
    inventoryBtn: document.getElementById('inventory-btn'),
    minesGameScreen: document.getElementById('mines-game-screen'),
    lootboxScreen: document.getElementById('lootbox-screen'),
    inventoryScreen: document.getElementById('inventory-screen'),
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
    lootboxBackToMenuBtn: document.getElementById('lootbox-back-to-menu-btn'),
    inventoryBackToMenuBtn: document.getElementById('inventory-back-to-menu-btn'),
    minesWinsCounter: document.getElementById('mines-wins-counter'),
    minesWinRate: document.getElementById('mines-win-rate'),
    lootboxSpinBtn: document.getElementById('lootbox-spin-btn'),
    lootboxItemsTrack: document.getElementById('lootbox-items-track'),
    lootboxPopup: document.getElementById('lootbox-popup'),
    lootboxItemWon: document.getElementById('lootbox-item-won'),
    lootboxItemName: document.getElementById('lootbox-item-name'),
    lootboxRarity: document.getElementById('lootbox-rarity'),
    lootboxClaimBtn: document.getElementById('lootbox-claim-btn'),
    inventoryItems: document.getElementById('inventory-items'),
    inventoryTotalItems: document.getElementById('inventory-total-items'),
    inventorySellPanel: document.getElementById('inventory-sell-panel'),
    inventorySellImg: document.getElementById('inventory-sell-img'),
    inventorySellName: document.getElementById('inventory-sell-name'),
    inventorySellValue: document.getElementById('inventory-sell-value'),
    inventorySellInput: document.getElementById('inventory-sell-input'),
    inventorySellMax: document.getElementById('inventory-sell-max'),
    inventorySellBtn: document.getElementById('inventory-sell-btn'),
    inventorySellTotal: document.getElementById('inventory-sell-total'),
    inventorySellClose: document.querySelector('.inventory-sell-close')
};

// Helper Functions
function getRandomSymbol() {
    return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}

// Updated lootbox item selection with new chance system
function getRandomLootboxItem() {
    // Calculate total weight (sum of all chances)
    const totalWeight = CONFIG.lootboxItems.reduce((sum, item) => sum + item.chance, 0);
    
    // Generate random number between 0 and total weight
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (const item of CONFIG.lootboxItems) {
        cumulativeWeight += item.chance;
        if (random <= cumulativeWeight) {
            return item;
        }
    }
    
    // Fallback to first item if no item was selected
    return CONFIG.lootboxItems[0];
}

// New function to get random knife for mythic items
function getRandomKnife() {
    if (CONFIG.knifes.length === 0) {
        // If no knives configured, return a default knife
        return { name: 'Default Knife', img: 'spins/default-knife.png', rarity: 'legendary', value: 1000 };
    }
    
    // Calculate total weight for knives
    const totalWeight = CONFIG.knifes.reduce((sum, knife) => sum + knife.chance, 0);
    
    // Generate random number between 0 and total weight
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (const knife of CONFIG.knifes) {
        cumulativeWeight += knife.chance;
        if (random <= cumulativeWeight) {
            return knife;
        }
    }
    
    // Fallback to first knife if no knife was selected
    return CONFIG.knifes[0];
}

// Modified Loot Box functions

function initializeLootboxItems() {
    const track = document.getElementById('lootbox-items-track');
    if (!track) return;
    
    track.innerHTML = '';
    
    // Create a more balanced item pool based on new chance system
    const itemsPool = [];
    CONFIG.lootboxItems.forEach(item => {
        // Add items based on their chance (higher chance = more copies)
        // Scale the chance to get reasonable number of copies
        const count = Math.max(1, Math.floor(item.chance * 10));
        for (let i = 0; i < count; i++) {
            itemsPool.push(item);
        }
    });
    
    // Shuffle the items properly
    for (let i = itemsPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [itemsPool[i], itemsPool[j]] = [itemsPool[j], itemsPool[i]];
    }
    
    // Create exactly 3 copies for seamless looping
    const singleLoop = itemsPool.slice(0, 50); // Use 50 items per loop for good variety
    for (let loop = 0; loop < 3; loop++) {
        singleLoop.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `lootbox-item ${item.rarity}`;
            itemElement.innerHTML = `<img src="${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">`;
            itemElement.dataset.itemName = item.name;
            itemElement.style.minWidth = '120px'; // Ensure consistent sizing
            itemElement.style.minHeight = '120px';
            track.appendChild(itemElement);
        });
    }
    
    // Reset position and ensure no transitions
    track.style.transform = 'translateX(0px)';
    track.style.transition = 'none';
    track.style.opacity = '1'; // Ensure visibility
}

// Update the claimLootboxWin function to prevent items from disappearing
async function claimLootboxWin() {
    if (elements.lootboxPopup) elements.lootboxPopup.style.display = 'none';
    
    // Don't reinitialize items immediately - keep them visible
    // Only reinitialize if needed for the next spin
    const track = document.getElementById('lootbox-items-track');
    if (track) {
        track.style.opacity = '1'; // Ensure items remain visible
    }
    
    // Add the won item to inventory
    if (gameState.lootboxGame.currentItem) {
        addItemToInventory(gameState.lootboxGame.currentItem);
    }
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
    if (elements.lootboxChips) elements.lootboxChips.textContent = gameState.chips.toFixed(2);
    if (elements.lootboxDice) elements.lootboxDice.textContent = gameState.dice;
    if (elements.inventoryChips) elements.inventoryChips.textContent = gameState.chips.toFixed(2);
    if (elements.inventoryDice) elements.inventoryDice.textContent = gameState.dice;
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

async function startLootboxSpin() {
    if (isLootboxSpinning || gameState.chips < CONFIG.lootboxCost) {
        if (gameState.chips < CONFIG.lootboxCost) {
            showNotification("Not enough chips!", false);
        }
        return;
    }

    isLootboxSpinning = true;
    if (elements.lootboxSpinBtn) elements.lootboxSpinBtn.disabled = true;
    
    // Deduct chips first
    try {
        const response = await fetch(`${API_BASE_URL}/api/spin`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                cost: CONFIG.lootboxCost
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Lootbox spin failed');
        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
    } catch (error) {
        console.error('Lootbox spin error:', error);
        showNotification('Failed to process lootbox spin. Please try again.', false);
        resetLootboxSpinState();
        return;
    }

    const track = document.getElementById('lootbox-items-track');
    const container = track.parentElement;
    
    // Get the winning item first
    const resultItem = getRandomLootboxItem();
    console.log('Target item:', resultItem.name, 'Rarity:', resultItem.rarity);
    
    // Find a suitable target item in the middle section (second loop)
    const allItems = track.querySelectorAll('.lootbox-item');
    const itemsPerLoop = allItems.length / 3;
    const middleStart = Math.floor(itemsPerLoop);
    const middleEnd = Math.floor(itemsPerLoop * 2);
    
    let targetIndex = -1;
    
    // Look for the target item in the middle section first
    for (let i = middleStart; i < middleEnd; i++) {
        const item = allItems[i];
        const itemName = item.dataset.itemName || item.querySelector('img').alt;
        if (itemName === resultItem.name) {
            targetIndex = i;
            break;
        }
    }
    
    // If not found in middle, look in first section and map to middle
    if (targetIndex === -1) {
        for (let i = 0; i < middleStart; i++) {
            const item = allItems[i];
            const itemName = item.dataset.itemName || item.querySelector('img').alt;
            if (itemName === resultItem.name) {
                targetIndex = i + itemsPerLoop; // Use the equivalent in the middle section
                break;
            }
        }
    }
    
    // Final fallback - use any item in middle section
    if (targetIndex === -1) {
        console.error('Target item not found, using fallback');
        targetIndex = middleStart + Math.floor(Math.random() * (middleEnd - middleStart));
    }
    
    // Animation variables  
    const itemWidth = 140; // 120px width + 20px gap
    const containerCenter = container.offsetWidth / 2;
    const loopWidth = (allItems.length / 3) * itemWidth;
    
    // Generate random stopping position for variety
    const randomOffset = Math.random() * loopWidth; // Random position within one loop
    let currentPosition = randomOffset; // Start from random position
    
    let velocity = 8; // Start velocity
    const maxVelocity = 25; // Max speed
    const acceleration = 1.1;
    const minVelocity = 0.3; // When to stop
    
    let phase = 'accelerating';
    let spinTime = 0;
    const minSpinTime = 4500; // 4.5 seconds minimum
    const maxSpinTime = 5500; // 5.5 seconds maximum  
    const targetSpinTime = minSpinTime + Math.random() * (maxSpinTime - minSpinTime);
    
    function animate() {
        spinTime += 16; // Approximate 60fps
        
        // Phase management
        if (phase === 'accelerating' && spinTime > targetSpinTime * 0.3) {
            phase = 'decelerating';
        }
        
        // Velocity control
        if (phase === 'accelerating') {
            velocity = Math.min(velocity * acceleration, maxVelocity);
        } else if (phase === 'decelerating') {
            // Gradual deceleration
            velocity *= 0.985;
        }
        
        // Position update
        currentPosition += velocity;
        
        // Seamless looping - keep track position within bounds
        while (currentPosition >= loopWidth) {
            currentPosition -= loopWidth;
        }
        
        // Apply transform - move left (negative direction)
        track.style.transform = `translateX(${-currentPosition}px)`;
        track.style.transition = 'none'; // Ensure no CSS transitions interfere
        
        // Check if we should stop (no more repositioning!)
        if (spinTime >= targetSpinTime && velocity <= minVelocity) {
            // Calculate which item is in the center highlight box
            // The center position relative to the track (adjusted slightly left)
            const centerPosition = currentPosition + containerCenter - 50; // Move 15px to the left
            
            // Find the item that's closest to this center position
            const nearestItemIndex = Math.round(centerPosition / itemWidth);
            
            // Make sure we get a valid item from the middle section
            const itemsPerLoop = allItems.length / 3;
            const middleStart = Math.floor(itemsPerLoop);
            let finalItemIndex = (nearestItemIndex % itemsPerLoop) + middleStart;
            
            // Ensure the index is within bounds
            if (finalItemIndex >= allItems.length) {
                finalItemIndex = middleStart + (finalItemIndex - middleStart) % itemsPerLoop;
            }
            
            // Get the centered item
            const centeredItem = allItems[finalItemIndex];
            
            if (centeredItem) {
                const itemName = centeredItem.dataset.itemName || centeredItem.querySelector('img').alt;
                const wonItem = CONFIG.lootboxItems.find(item => item.name === itemName) || resultItem;
                
                console.log('Stopped at position:', currentPosition, 'Center position:', centerPosition, 'Item:', wonItem.name);
                
                // Check if the item is mythic and should get a knife instead
                let finalReward = wonItem;
                if (wonItem.rarity === 'mythic') {
                    const randomKnife = getRandomKnife();
                    console.log('Mythic item won! Giving random knife:', randomKnife.name, 'Knife rarity:', randomKnife.rarity);
                    finalReward = randomKnife;
                }
                
                // Show result immediately - no more animations!
                setTimeout(() => {
                    showLootboxPopup(finalReward);
                    resetLootboxSpinState();
                }, 200);
            } else {
                // Fallback to original result
                let finalReward = resultItem;
                if (resultItem.rarity === 'mythic') {
                    const randomKnife = getRandomKnife();
                    console.log('Fallback mythic item! Giving random knife:', randomKnife.name);
                    finalReward = randomKnife;
                }
                
                setTimeout(() => {
                    showLootboxPopup(finalReward);
                    resetLootboxSpinState();
                }, 200);
            }
            return; // Stop the animation completely
        }
        
        // Continue animation
        if (isLootboxSpinning) {
            requestAnimationFrame(animate);
        }
    }
    
    // Start the animation
    requestAnimationFrame(animate);
}

function resetLootboxSpinState() {
    isLootboxSpinning = false;
    if (elements.lootboxSpinBtn) {
        elements.lootboxSpinBtn.disabled = false;
    }
    if (spinAnimation) {
        cancelAnimationFrame(spinAnimation);
        spinAnimation = null;
    }
    console.log('Lootbox spin state reset - can spin again');
}

function showLootboxPopup(item) {
    if (!elements.lootboxPopup || !elements.lootboxItemWon || !elements.lootboxItemName || !elements.lootboxRarity) return;
    
    elements.lootboxItemWon.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
    elements.lootboxItemName.textContent = item.name;
    elements.lootboxRarity.textContent = item.rarity.toUpperCase();
    
    // Set rarity class
    elements.lootboxItemWon.className = 'lootbox-item-won';
    elements.lootboxItemWon.classList.add(item.rarity);
    elements.lootboxRarity.className = 'lootbox-rarity';
    elements.lootboxRarity.classList.add(item.rarity);
    
    // Store the current item
    gameState.lootboxGame.currentItem = item;
    
    elements.lootboxPopup.style.display = 'flex';
}

// Inventory Functions
function addItemToInventory(item) {
    // Check if item already exists in inventory
    const existingItem = gameState.inventory.find(i => i.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        gameState.inventory.push({
            name: item.name,
            img: item.img,
            rarity: item.rarity,
            value: item.value || 0,
            quantity: 1
        });
    }
    
    // Sort inventory by rarity (mythic -> legendary -> epic -> uncommon -> common)
    gameState.inventory.sort((a, b) => {
        const rarityOrder = ['mythic', 'legendary', 'epic', 'uncommon', 'common'];
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    });
    
    // Update inventory display if we're currently viewing it
    if (gameState.currentGame === 'inventory') {
        updateInventoryDisplay();
    }
}

function updateInventoryDisplay() {
    if (!elements.inventoryItems) return;
    
    elements.inventoryItems.innerHTML = '';
    
    if (gameState.inventory.length === 0) {
        elements.inventoryItems.innerHTML = '<div class="inventory-empty">Your inventory is empty</div>';
        elements.inventoryTotalItems.textContent = '0 items';
        return;
    }
    
    elements.inventoryTotalItems.textContent = `${gameState.inventory.length} items`;
    
    gameState.inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = `inventory-item ${item.rarity}`;
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="inventory-item-img">
            <div class="inventory-item-name">${item.name}</div>
            <div class="inventory-item-rarity">${item.rarity}</div>
            <div class="inventory-item-count">${item.quantity}</div>
        `;
        
        itemElement.addEventListener('click', () => showSellPanel(item));
        elements.inventoryItems.appendChild(itemElement);
    });
}

function showSellPanel(item) {
    if (!elements.inventorySellPanel) return;
    
    currentSellingItem = item;
    
    elements.inventorySellImg.src = item.img;
    elements.inventorySellImg.alt = item.name;
    elements.inventorySellName.textContent = item.name;
    elements.inventorySellValue.textContent = `Value: ${item.value} chips each`;
    elements.inventorySellInput.value = 1;
    elements.inventorySellInput.max = item.quantity;
    elements.inventorySellMax.textContent = `/ ${item.quantity}`;
    elements.inventorySellTotal.textContent = `Total: ${item.value} chips`;
    
    elements.inventorySellPanel.style.display = 'block';
}

function updateSellTotal() {
    if (!currentSellingItem || !elements.inventorySellInput) return;
    
    const quantity = parseInt(elements.inventorySellInput.value) || 0;
    const maxQuantity = currentSellingItem.quantity;
    const value = currentSellingItem.value;
    
    // Validate input
    if (quantity < 1) {
        elements.inventorySellInput.value = 1;
    } else if (quantity > maxQuantity) {
        elements.inventorySellInput.value = maxQuantity;
    }
    
    const validQuantity = parseInt(elements.inventorySellInput.value);
    const total = validQuantity * value;
    
    if (elements.inventorySellTotal) {
        elements.inventorySellTotal.textContent = `Total: ${total} chips`;
    }
}

async function sellInventoryItem() {
    if (!currentSellingItem || !elements.inventorySellInput) return;
    
    const quantity = parseInt(elements.inventorySellInput.value) || 0;
    const maxQuantity = currentSellingItem.quantity;
    const value = currentSellingItem.value;
    
    if (quantity < 1 || quantity > maxQuantity) {
        showNotification('Invalid quantity', false);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory/sell`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                itemName: currentSellingItem.name,
                quantity: quantity,
                totalValue: quantity * value
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to sell item');
        
        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        // Update inventory
        const itemIndex = gameState.inventory.findIndex(i => i.name === currentSellingItem.name);
        if (itemIndex !== -1) {
            gameState.inventory[itemIndex].quantity -= quantity;
            
            // Remove item if quantity reaches 0
            if (gameState.inventory[itemIndex].quantity <= 0) {
                gameState.inventory.splice(itemIndex, 1);
            }
        }
        
        showNotification(`Sold ${quantity} ${currentSellingItem.name} for ${quantity * value} chips`, true);
        
        // Update inventory display
        updateInventoryDisplay();
        closeSellPanel();
    } catch (error) {
        console.error('Sell error:', error);
        showNotification('Failed to sell item', false);
    }
}

function closeSellPanel() {
    if (elements.inventorySellPanel) {
        elements.inventorySellPanel.style.display = 'none';
    }
    currentSellingItem = null;
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
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
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
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
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
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'block';
    setupMinesGameUI();
}

function startLootboxGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'lootbox';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'block';
    
    // Initialize lootbox items
    initializeLootboxItems();
    
    if (elements.lootboxSpinBtn) elements.lootboxSpinBtn.disabled = false;
}

function startInventoryScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'inventory';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'block';
    
    // Load inventory from server
    loadInventory();
}

async function loadInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory?userId=${gameState.userId}`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            gameState.inventory = data.items || [];
            updateInventoryDisplay();
        }
    } catch (error) {
        console.error('Failed to load inventory:', error);
        showNotification('Failed to load inventory', false);
    }
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
    
    elements.minesGrid.innerHTML = '';
    elements.minesGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
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
    cell.innerHTML = '<div class="safe-cell"></div>';
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
    
    if (gameState.minesGame.revealedCells >= 2 && elements.minesCashoutBtn) {
        elements.minesCashoutBtn.disabled = false;
        elements.minesCashoutBtn.classList.remove('disabled');
    } else {
        elements.minesCashoutBtn.disabled = true;
        elements.minesCashoutBtn.classList.add('disabled');
    }
    
    cell.querySelector('.safe-cell').textContent = `+${(CONFIG.mines.growthFactors[gameState.minesGame.minesCount] * 100).toFixed(0)}%`;
    setTimeout(() => {
        if (cell.querySelector('.safe-cell')) {
            cell.querySelector('.safe-cell').textContent = '';
        }
    }, 1000);
    
    const safeCells = gameState.minesGame.totalCells - gameState.minesGame.minesCount;
    if (gameState.minesGame.revealedCells === safeCells) {
        endMinesGame(true);
    }
}

function cashoutMinesGame() {
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
    gameState.inventory = user.inventory || [];
    
    if (elements.usernameDisplay) elements.usernameDisplay.textContent = user.username;
    if (elements.userAvatar) elements.userAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.minesUsername) elements.minesUsername.textContent = user.username;
    if (elements.minesAvatar) elements.minesAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.lootboxUsername) elements.lootboxUsername.textContent = user.username;
    if (elements.lootboxAvatar) elements.lootboxAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.inventoryUsername) elements.inventoryUsername.textContent = user.username;
    if (elements.inventoryAvatar) elements.inventoryAvatar.src = user.avatar || 'assets/default-avatar.png';
    
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
    } else if (gameState.currentGame === 'lootbox') {
        startLootboxGame();
    } else if (gameState.currentGame === 'inventory') {
        startInventoryScreen();
    }
}

function showLoginScreen() {
    if (elements.loginScreen) elements.loginScreen.style.display = 'block';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
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
if (elements.lootboxLogoutBtn) elements.lootboxLogoutBtn.addEventListener('click', logout);
if (elements.inventoryLogoutBtn) elements.inventoryLogoutBtn.addEventListener('click', logout);
if (elements.spinBtn) elements.spinBtn.addEventListener('click', startSpin);
if (elements.claimBtn) elements.claimBtn.addEventListener('click', claimWin);
if (elements.lootboxClaimBtn) elements.lootboxClaimBtn.addEventListener('click', claimLootboxWin);

if (elements.slotMachineBtn) elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
if (elements.minesGameBtn) elements.minesGameBtn.addEventListener('click', startMinesGame);
if (elements.lootboxBtn) elements.lootboxBtn.addEventListener('click', startLootboxGame);
if (elements.inventoryBtn) elements.inventoryBtn.addEventListener('click', startInventoryScreen);
if (elements.minesStartBtn) elements.minesStartBtn.addEventListener('click', startNewMinesGame);
if (elements.minesCashoutBtn) elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
if (elements.lootboxSpinBtn) elements.lootboxSpinBtn.addEventListener('click', startLootboxSpin);
if (document.getElementById('mines-game-over-close')) {
    document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);
}
if (elements.backToMenuBtn) elements.backToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.minesBackToMenuBtn) elements.minesBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.lootboxBackToMenuBtn) elements.lootboxBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.inventoryBackToMenuBtn) elements.inventoryBackToMenuBtn.addEventListener('click', showGameSelectScreen);

// Inventory event listeners
if (elements.inventorySellInput) {
    elements.inventorySellInput.addEventListener('input', updateSellTotal);
}

if (elements.inventorySellBtn) {
    elements.inventorySellBtn.addEventListener('click', sellInventoryItem);
}

if (elements.inventorySellClose) {
    elements.inventorySellClose.addEventListener('click', closeSellPanel);
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

document.addEventListener('DOMContentLoaded', initGame);
