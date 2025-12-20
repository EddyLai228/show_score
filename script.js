// Four-corner Slot-Machine Score System
// ==========================================================

const DIGITS = 4;                
const COUNT_UP_DURATION = 5000;   // 5秒从0递增到目标分数
const SPIN_INTERVAL = 60;        

// Store target scores for each display
const targetScores = {
  'score1': 0,
  'score2': 0,
  'score3': 0,
  'score4': 0
};     

// Initialize digits for a specific display
function initDigits(displayId) {
  const display = document.getElementById(displayId);
  display.innerHTML = '';

  for (let i = 0; i < DIGITS; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'digit-card';

    const card = document.createElement('div');
    card.className = 'card';

    const f = document.createElement('div');
    f.className = 'face front';
    f.textContent = '0';

    const b = document.createElement('div');
    b.className = 'face back';
    b.textContent = '0';

    card.appendChild(f);
    card.appendChild(b);
    wrap.appendChild(card);
    display.appendChild(wrap);

    if (i < DIGITS - 1) {
      const sep = document.createElement('div');
      sep.className = 'slot-separator';
      display.appendChild(sep);
    }
  }
}

// Update display to show a number
function updateDisplay(displayId, number) {
  const str = number.toString().padStart(DIGITS, '0');
  const display = document.getElementById(displayId);
  const cards = display.querySelectorAll('.digit-card .card .front');
  
  cards.forEach((card, index) => {
    card.textContent = str[index];
  });
}

// Animate score: count from 0, incrementing by 1 each step
// Fast at start, slow down as approaching target
function animateScore(displayId, targetNumber) {
  const display = document.getElementById(displayId);
  let currentNumber = 0;
  const startTime = Date.now();
  const duration = 10000; // 10 seconds total
  
  const countInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Calculate target number at this moment using easing
    // Fast at beginning, slow at end
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const targetAtThisMoment = Math.floor(targetNumber * easeOutCubic);
    
    // Increment towards the target position smoothly
    if (currentNumber < targetAtThisMoment) {
      const remaining = targetAtThisMoment - currentNumber;
      // Adjust increment based on how far we are from intermediate target
      const increment = Math.max(1, Math.ceil(remaining / 10));
      currentNumber = Math.min(currentNumber + increment, targetAtThisMoment);
    }
    
    updateDisplay(displayId, currentNumber);
    
    if (progress >= 1 || currentNumber >= targetNumber) {
      clearInterval(countInterval);
      updateDisplay(displayId, targetNumber);
    }
  }, 30);
}

function spinToNumber(displayId, num) {
  animateScore(displayId, num);
}

// Initialize all four displays
initDigits('score1');
initDigits('score2');
initDigits('score3');
initDigits('score4');

// Add click listener to center start button
document.getElementById('centerStartBtn').addEventListener('click', () => {
  // Trigger all four scores
  ['score1', 'score2', 'score3', 'score4'].forEach(scoreId => {
    const score = targetScores[scoreId] || Math.floor(Math.random() * 100000);
    spinToNumber(scoreId, score);
  });
});

function setScore(displayId, number) {
  targetScores[displayId] = number;
}

// 範例：設定各個角落的目標分數
setScore('score1', 5280); // 設定左上角分數為 5280 無距
setScore('score2', 5090); // 設定右上角分數為 5090 友實
setScore('score3', 5020); // 設定左下角分數為 5020 發達
setScore('score4', 5000); // 設定右下角分數為 4260 誠潔