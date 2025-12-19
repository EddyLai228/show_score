// Four-corner Slot-Machine Score System
// ==========================================================

const DIGITS = 5;                
const SPIN_DURATION = 1000;       
const SPIN_INTERVAL = 60;        
const STOP_DELAY_STEP = 500;

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

function spinDigit(card, stopDigit, delay) {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');

  let spinning = true;

  const interval = setInterval(() => {
    if (!spinning) return;
    const rand = Math.floor(Math.random() * 10);
    front.textContent = rand;
  }, SPIN_INTERVAL);

  setTimeout(() => {
    spinning = false;
    clearInterval(interval);

    back.textContent = stopDigit;
    card.classList.add('flip');

    card.addEventListener(
      'transitionend',
      () => {
        front.textContent = stopDigit;
        card.classList.remove('flip');
        card.classList.add('jump');
        setTimeout(() => card.classList.remove('jump'), 200);
      },
      { once: true }
    );
  }, delay);
}

function spinToNumber(displayId, num) {
  const str = num.toString().padStart(DIGITS, '0');
  const display = document.getElementById(displayId);
  const cards = display.querySelectorAll('.digit-card .card');

  // Right to left stopping: ones digit stops first
  for (let i = 0; i < DIGITS; i++) {
    const indexFromRight = DIGITS - 1 - i;
    const delay = SPIN_DURATION + i * STOP_DELAY_STEP;
    spinDigit(cards[indexFromRight], str[indexFromRight], delay);
  }
}

function randomScore(displayId) {
  const randomNum = Math.floor(Math.random() * 100000);
  spinToNumber(displayId, randomNum);
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

// ========== 直接設定分數的功能 ==========
// 使用方式：
// setScore('score1', 12345);  // 設定左上角分數為 12345（按開始後才會顯示）
// setScore('score2', 98765);  // 設定右上角分數為 98765（按開始後才會顯示）
// setScore('score3', 50000);  // 設定左下角分數為 50000（按開始後才會顯示）
// setScore('score4', 77777);  // 設定右下角分數為 77777（按開始後才會顯示）

function setScore(displayId, number) {
  targetScores[displayId] = number;
}

// 範例：設定各個角落的目標分數
setScore('score1', 12345); // 設定左上角分數為 12345
setScore('score2', 98765); // 設定右上角分數為 98765
setScore('score3', 20000); // 設定左下角分數為 50000
setScore('score4', 77777); // 設定右下角分數為 77777