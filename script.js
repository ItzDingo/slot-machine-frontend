const API_BASE_URL = 'https://slot-machine-backend-34lg.onrender.com';

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
const elements = {
  loginScreen: document.getElementById('login-screen'),
  gameScreen: document.getElementById('game-screen'),
  tokenInput: document.getElementById('token-input'),
  loginBtn: document.getElementById('login-btn'),
  logoutBtn: document.getElementById('logout-btn'),
  username: document.getElementById('username'),
  userAvatar: document.getElementById('user-avatar'),
  chips: document.getElementById('chips'),
  dice: document.getElementById('dice'),
  spinBtn: document.getElementById('spin-btn'),
  reels: [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
  ],
  winPopup: document.getElementById('win-popup'),
  winCombo: document.getElementById('win-combo'),
  winAmount: document.getElementById('win-amount'),
  claimBtn: document.getElementById('claim-btn')
};

// Core Functions
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
  elements.chips.textContent = gameState.chips;
  elements.dice.textContent = gameState.dice;
}

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');
  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => notification.remove(), 3000);
}

// Game Logic
async function startSpin() {
  if (gameState.isSpinning) return;
  if (!gameState.userId) {
    showNotification("Please login first", false);
    return;
  }
  if (gameState.chips < CONFIG.spinCost) {
    showNotification("Not enough chips!", false);
    return;
  }

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

    if (response.status === 401) {
      showNotification("Session expired - please login again", false);
      showLoginScreen();
      return;
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Spin failed');

    gameState.chips = data.newBalance;
    updateCurrencyDisplay();
    gameState.isSpinning = true;
    elements.spinBtn.disabled = true;
    elements.winPopup.style.display = 'none';

    const targetSymbols = elements.reels.map(() => getRandomSymbol());
    gameState.currentSymbols = targetSymbols.map(s => s.name);

    elements.reels.forEach((reel, index) => {
      const duration = 1000 + Math.random() * 2000;
      spinReel(reel, targetSymbols[index], duration);
    });
  } catch (error) {
    console.error('Spin error:', error);
    showNotification(`Spin failed: ${error.message}`, false);
    elements.spinBtn.disabled = false;
  }
}

function spinReel(reel, targetSymbol, duration) {
  let startTime = null;
  const symbols = CONFIG.symbols;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    if (progress < 1) {
      reel.innerHTML = '';
      for (let i = -1; i <= 1; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const element = document.createElement('div');
        element.className = 'symbol';
        element.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        element.style.transform = `translateY(${-100 * progress * 10 + (i * 100)}%)`;
        reel.appendChild(element);
      }
      requestAnimationFrame(animate);
    } else {
      resetReel(reel, targetSymbol);
      gameState.spinningReels--;
      if (gameState.spinningReels === 0) {
        gameState.isSpinning = false;
        elements.spinBtn.disabled = false;
        checkWin();
      }
    }
  }

  gameState.spinningReels++;
  requestAnimationFrame(animate);
}

async function checkWin() {
  const combo = gameState.currentSymbols.join('-');
  let winAmount = CONFIG.payouts[combo] || 
    (gameState.currentSymbols.some((v,i,a) => a.indexOf(v) !== i) ? CONFIG.payouts['ANY_TWO_MATCH'] : 0;

  if (winAmount > 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/win`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: gameState.userId,
          amount: winAmount
        }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        gameState.chips = data.newBalance;
        gameState.winAmount = winAmount;
        elements.winCombo.textContent = combo === 'ANY_TWO_MATCH' ? 'Two Matching Symbols' : combo.split('-').join(' ');
        elements.winAmount.textContent = winAmount;
        elements.winPopup.style.display = 'flex';
        updateCurrencyDisplay();
      }
    } catch (error) {
      console.error('Win error:', error);
    }
  }
}

// Auth Functions
async function loginWithToken(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');

    gameState.userId = data.id;
    gameState.chips = data.chips;
    gameState.dice = data.dice;
    
    elements.username.textContent = data.username;
    elements.userAvatar.src = data.avatar;
    elements.loginScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    updateCurrencyDisplay();

    elements.reels.forEach((reel, index) => {
      const symbol = getRandomSymbol();
      gameState.currentSymbols[index] = symbol.name;
      resetReel(reel, symbol);
    });

    return true;
  } catch (error) {
    console.error('Login error:', error);
    showNotification(`Login failed: ${error.message}`, false);
    return false;
  }
}

function showLoginScreen() {
  elements.loginScreen.style.display = 'block';
  elements.gameScreen.style.display = 'none';
  gameState.userId = null;
  elements.tokenInput.value = '';
}

async function logout() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    showLoginScreen();
    showNotification('Logged out successfully', true);
  } catch (error) {
    console.error('Logout error:', error);
    showNotification('Logout failed', false);
  }
}

async function checkAuthStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      credentials: 'include'
    });
    
    if (response.ok) {
      const user = await response.json();
      gameState.userId = user.id;
      gameState.chips = user.chips;
      gameState.dice = user.dice;
      
      elements.username.textContent = user.username;
      elements.userAvatar.src = user.avatar;
      elements.loginScreen.style.display = 'none';
      elements.gameScreen.style.display = 'block';
      updateCurrencyDisplay();

      elements.reels.forEach((reel, index) => {
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
      });
    } else {
      showLoginScreen();
    }
  } catch (error) {
    showLoginScreen();
  }
}

// Event Listeners
elements.loginBtn.addEventListener('click', async () => {
  const token = elements.tokenInput.value.trim();
  if (token) {
    elements.loginBtn.disabled = true;
    await loginWithToken(token);
    elements.loginBtn.disabled = false;
  } else {
    showNotification('Please enter your token', false);
  }
});

elements.logoutBtn.addEventListener('click', logout);
elements.spinBtn.addEventListener('click', startSpin);
elements.claimBtn.addEventListener('click', () => {
  elements.winPopup.style.display = 'none';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
});
