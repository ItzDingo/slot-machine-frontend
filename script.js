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
    baseMultipliers: {
      1: 1.05,
      2: 1.10,
      3: 1.15,
      4: 1.20,
      5: 1.30,
      6: 1.40,
      7: 1.55,
      8: 1.75,
      9: 2.00,
      10: 2.30
    },
    incrementFactors: {
      1: 0.0085,
      2: 0.0095,
      3: 0.0105,
      4: 0.0115,
      5: 0.0130,
      6: 0.0150,
      7: 0.0175,
      8: 0.0200,
      9: 0.0230,
      10: 0.0265
    },
    houseEdge: 0.03
  }
};

// Game State
let gameState = {
  chips: 1000,
  dice: 50,
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
    baseMultiplier: 1.0,
    currentMultiplier: 1.0,
    revealedCells: 0,
    totalCells: 25,
    minePositions: [],
    currentWin: 0,
    gameActive: false,
    multiplierIncrement: 0
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
  minesWinRate: document.getElementById('mines-win-rate'),
  loadingIndicator: document.querySelector('.spinner-container'),
  minesMultiplierDisplay: document.getElementById('mines-multiplier-display')
};

// Helper Functions
function getRandomSymbol() {
  return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}

function updateCurrencyDisplay() {
  elements.chipsDisplay.textContent = gameState.chips;
  elements.diceDisplay.textContent = gameState.dice;
  elements.minesChips.textContent = gameState.chips;
  elements.minesDice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');
  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Mines Game Functions
function createMinesGrid() {
  if (!elements.minesGrid) return;
  
  elements.minesGrid.innerHTML = '';
  
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'mines-cell';
    cell.dataset.index = i;
    cell.dataset.probability = '0%';
    cell.addEventListener('click', () => revealMineCell(i));
    elements.minesGrid.appendChild(cell);
  }
}

function placeMines(minesCount) {
  gameState.minesGame.minePositions = [];
  const positions = Array.from({length: 25}, (_, i) => i);
  
  // Fisher-Yates shuffle
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  gameState.minesGame.minePositions = positions.slice(0, minesCount);
}

function revealMineCell(index) {
  if (!gameState.minesGame.gameActive) return;

  const cell = elements.minesGrid.children[index];
  if (cell.classList.contains('revealed')) return;

  // Mine hit
  if (gameState.minesGame.minePositions.includes(index)) {
    cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
    cell.classList.add('mine');
    endMinesGame(false);
    return;
  }

  // Safe cell
  cell.classList.add('revealed');
  gameState.minesGame.revealedCells++;
  
  // Calculate new multiplier
  gameState.minesGame.currentMultiplier = parseFloat(
    (gameState.minesGame.baseMultiplier + 
     (gameState.minesGame.multiplierIncrement * gameState.minesGame.revealedCells))
    .toFixed(6)
  );
  
  gameState.minesGame.currentWin = Math.floor(
    gameState.minesGame.betAmount * gameState.minesGame.currentMultiplier
  );

  // Update UI
  updateMinesGameUI();
  
  // Check win condition
  if (gameState.minesGame.revealedCells === (25 - gameState.minesGame.minesCount)) {
    endMinesGame(true);
  }
}

function updateMinesGameUI() {
  elements.minesCurrentWin.textContent = gameState.minesGame.currentWin;
  elements.minesMultiplier.textContent = `${gameState.minesGame.currentMultiplier.toFixed(4)}x`;
  
  // Update cell probabilities
  Array.from(elements.minesGrid.children).forEach((cell, i) => {
    if (!cell.classList.contains('revealed') && !cell.classList.contains('mine')) {
      const remainingCells = 25 - gameState.minesGame.revealedCells;
      const remainingMines = gameState.minesGame.minesCount - 
        gameState.minesGame.minePositions.filter(pos => 
          elements.minesGrid.children[pos].classList.contains('revealed')
        ).length;
      const prob = (remainingMines / remainingCells) * 100;
      cell.dataset.probability = `${Math.round(prob)}%`;
    }
  });
}

async function startNewMinesGame() {
  const betAmount = parseInt(elements.minesBetInput.value);
  const minesCount = parseInt(elements.minesCountInput.value);

  // Validate inputs
  if (isNaN(betAmount) || betAmount < CONFIG.mines.minBet || betAmount > CONFIG.mines.maxBet) {
    showNotification(`Bet must be between ${CONFIG.mines.minBet} and ${CONFIG.mines.maxBet}`, false);
    return;
  }

  if (isNaN(minesCount) || minesCount < CONFIG.mines.minMines || minesCount > CONFIG.mines.maxMines) {
    showNotification(`Mines must be between ${CONFIG.mines.minMines} and ${CONFIG.mines.maxMines}`, false);
    return;
  }

  if (betAmount > gameState.chips) {
    showNotification("Not enough chips", false);
    return;
  }

  // Deduct bet
  gameState.chips -= betAmount;
  updateCurrencyDisplay();

  // Initialize game
  gameState.minesGame = {
    betAmount,
    minesCount,
    baseMultiplier: CONFIG.mines.baseMultipliers[minesCount],
    currentMultiplier: CONFIG.mines.baseMultipliers[minesCount],
    multiplierIncrement: CONFIG.mines.incrementFactors[minesCount],
    revealedCells: 0,
    totalCells: 25,
    minePositions: [],
    currentWin: betAmount,
    gameActive: true
  };

  // Create grid and place mines
  createMinesGrid();
  placeMines(minesCount);

  // Update UI
  elements.minesCurrentWin.textContent = gameState.minesGame.currentWin;
  elements.minesMultiplier.textContent = `${gameState.minesGame.currentMultiplier.toFixed(4)}x`;
  elements.minesBetInput.disabled = true;
  elements.minesCountInput.disabled = true;
  elements.minesStartBtn.disabled = true;
  elements.minesCashoutBtn.disabled = false;
}

function cashoutMinesGame() {
  if (!gameState.minesGame.gameActive || gameState.minesGame.revealedCells === 0) {
    showNotification("Reveal at least one cell first", false);
    return;
  }
  
  endMinesGame(true);
}

async function endMinesGame(isWin) {
  gameState.minesGame.gameActive = false;
  
  // Reveal all mines
  gameState.minesGame.minePositions.forEach(pos => {
    const cell = elements.minesGrid.children[pos];
    if (!cell.classList.contains('revealed')) {
      cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
      cell.classList.add('mine');
    }
  });

  if (isWin) {
    // Add winnings
    gameState.chips += gameState.minesGame.currentWin;
    gameState.minesStats.wins++;
    gameState.minesStats.totalWins += gameState.minesGame.currentWin;
    
    // Show win message
    elements.minesGameOverMessage.textContent = "You Won!";
    elements.minesGameOverAmount.textContent = `+${gameState.minesGame.currentWin}`;
  } else {
    // Show loss message
    elements.minesGameOverMessage.textContent = "Game Over!";
    elements.minesGameOverAmount.textContent = `-${gameState.minesGame.betAmount}`;
  }

  // Update stats
  gameState.minesStats.totalGames++;
  updateCurrencyDisplay();
  
  // Show game over popup
  elements.minesGameOverPopup.style.display = 'flex';
}

// Slot Machine Functions
async function startSpin() {
  if (gameState.isSpinning || gameState.chips < CONFIG.spinCost) {
    if (gameState.chips < CONFIG.spinCost) {
      showNotification("Not enough chips", false);
    }
    return;
  }

  // Show loading
  elements.loadingIndicator.style.display = 'flex';
  gameState.isSpinning = true;
  elements.spinBtn.disabled = true;

  // Deduct cost
  gameState.chips -= CONFIG.spinCost;
  updateCurrencyDisplay();

  // Start visual spin
  const targetSymbols = elements.reels.map(() => getRandomSymbol());
  gameState.currentSymbols = targetSymbols.map(s => s.name);
  
  // Animate each reel
  elements.reels.forEach((reel, index) => {
    const duration = 3000 + (index * 500);
    animateReelSpin(reel, targetSymbols[index], duration, () => {
      gameState.spinningReels--;
      if (gameState.spinningReels === 0) {
        completeSpin();
      }
    });
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/spin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: gameState.userId,
        cost: CONFIG.spinCost
      }),
      credentials: 'include'
    });

    const data = await response.json();
    gameState.chips = data.newBalance;
  } catch (error) {
    console.error('Spin error:', error);
    showNotification('Spin failed', false);
  } finally {
    elements.loadingIndicator.style.display = 'none';
  }
}

function animateReelSpin(reel, targetSymbol, duration, callback) {
  const startTime = performance.now();
  const symbols = CONFIG.symbols;
  const spinCycles = 10;

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    if (progress < 1) {
      // Calculate position
      const easedProgress = Math.pow(progress, 2); // Easing function
      const virtualPosition = easedProgress * spinCycles * symbols.length;
      
      // Update reel display
      reel.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const symbolIndex = Math.floor(virtualPosition) + i;
        const symbol = symbols[symbolIndex % symbols.length];
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        symbolElement.style.transform = `translateY(${(i - 1) * 100}%)`;
        reel.appendChild(symbolElement);
      }
      
      requestAnimationFrame(animate);
    } else {
      // Spin complete
      reel.innerHTML = '';
      resetReel(reel, targetSymbol);
      callback();
    }
  }

  requestAnimationFrame(animate);
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

function completeSpin() {
  gameState.isSpinning = false;
  elements.spinBtn.disabled = false;
  checkWin();
}

function checkWin() {
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
    gameState.chips += winAmount;
    gameState.winAmount = winAmount;
    gameState.winCombo = winCombo;
    updateCurrencyDisplay();
    showWinPopup(winCombo, winAmount);
  }
}

function hasTwoMatchingSymbols() {
  const [a, b, c] = gameState.currentSymbols;
  return a === b || b === c || a === c;
}

function showWinPopup(combo, amount) {
  elements.winComboDisplay.innerHTML = combo === 'ANY_TWO_MATCH' 
    ? 'Two Matching Symbols' 
    : createComboSymbolsDisplay(combo);
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

function claimWin() {
  gameState.winAmount = 0;
  gameState.winCombo = null;
  elements.winPopup.style.display = 'none';
}

// Authentication Functions
async function loginWithToken(token) {
  try {
    elements.loginBtn.disabled = true;
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      credentials: 'include'
    });

    const data = await response.json();
    if (response.ok) {
      handleSuccessfulLogin(data);
      showNotification('Login successful', true);
    } else {
      throw new Error(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    showNotification(`Login failed: ${error.message}`, false);
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
      showNotification('Logged out', true);
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    showNotification('Logout failed', false);
  }
}

function handleSuccessfulLogin(user) {
  gameState.userId = user.id;
  gameState.chips = user.chips;
  gameState.dice = user.dice;
  
  elements.usernameDisplay.textContent = user.username;
  elements.userAvatar.src = user.avatar || 'assets/default-avatar.png';
  elements.minesUsername.textContent = user.username;
  elements.minesAvatar.src = user.avatar || 'assets/default-avatar.png';
  
  showGameSelectScreen();
  updateCurrencyDisplay();
}

function showLoginScreen() {
  elements.loginScreen.style.display = 'block';
  elements.gameScreen.style.display = 'none';
  elements.gameSelectScreen.style.display = 'none';
  elements.minesGameScreen.style.display = 'none';
  gameState.userId = null;
  elements.tokenInput.value = '';
}

function showGameSelectScreen() {
  elements.loginScreen.style.display = 'none';
  elements.gameScreen.style.display = 'none';
  elements.minesGameScreen.style.display = 'none';
  elements.gameSelectScreen.style.display = 'block';
}

function startSlotMachineGame() {
  elements.loginScreen.style.display = 'none';
  elements.gameSelectScreen.style.display = 'none';
  elements.minesGameScreen.style.display = 'none';
  elements.gameScreen.style.display = 'block';
  gameState.currentGame = 'slots';
}

function startMinesGame() {
  elements.loginScreen.style.display = 'none';
  elements.gameSelectScreen.style.display = 'none';
  elements.gameScreen.style.display = 'none';
  elements.minesGameScreen.style.display = 'block';
  gameState.currentGame = 'mines';
  setupMinesGameUI();
}

function setupMinesGameUI() {
  gameState.minesGame = {
    betAmount: 0,
    minesCount: 0,
    baseMultiplier: 1.0,
    currentMultiplier: 1.0,
    revealedCells: 0,
    totalCells: 25,
    minePositions: [],
    currentWin: 0,
    gameActive: false,
    multiplierIncrement: 0
  };
  
  elements.minesCurrentWin.textContent = '0';
  elements.minesMultiplier.textContent = '1.0000x';
  elements.minesGrid.innerHTML = '';
  elements.minesBetInput.disabled = false;
  elements.minesCountInput.disabled = false;
  elements.minesStartBtn.disabled = false;
  elements.minesCashoutBtn.disabled = true;
}

function closeMinesGameOverPopup() {
  elements.minesGameOverPopup.style.display = 'none';
  setupMinesGameUI();
}

// Initialize Game
function initGame() {
  setupEventListeners();
  showLoginScreen();
}

// Event Listeners
function setupEventListeners() {
  // Login
  elements.loginBtn.addEventListener('click', () => {
    const token = elements.tokenInput.value.trim();
    if (token) loginWithToken(token);
    else showNotification('Enter your token', false);
  });

  // Logout
  elements.logoutBtn.addEventListener('click', logout);
  elements.minesLogoutBtn.addEventListener('click', logout);

  // Game selection
  elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
  elements.minesGameBtn.addEventListener('click', startMinesGame);

  // Slot machine
  elements.spinBtn.addEventListener('click', startSpin);
  elements.claimBtn.addEventListener('click', claimWin);

  // Mines game
  elements.minesStartBtn.addEventListener('click', startNewMinesGame);
  elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
  document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);

  // Navigation
  elements.backToMenuBtn.addEventListener('click', showGameSelectScreen);
  elements.minesBackToMenuBtn.addEventListener('click', showGameSelectScreen);
}

// Start the game
document.addEventListener('DOMContentLoaded', initGame);
