// Slot-Machine Spin Animation + Flip System
// ==========================================================
// Adds: spinning → slowing down → stopping → flip
// Now digits stop from RIGHT → LEFT (ones first → highest digit last)

const DIGITS = 5;                
const SPIN_DURATION = 1000;       
const SPIN_INTERVAL = 60;        
const STOP_DELAY_STEP = 700;     

function initDigits() {
  const display = document.getElementById('scoreDisplay');
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

function spinToNumber(num) {
  const str = num.toString().padStart(DIGITS, '0');
  const cards = document.querySelectorAll('.digit-card .card');

  // ❗ 右 → 左 停法：個位數先停
  for (let i = 0; i < DIGITS; i++) {
    const indexFromRight = DIGITS - 1 - i; // 4,3,2,1,0
    const delay = SPIN_DURATION + i * STOP_DELAY_STEP;
    spinDigit(cards[indexFromRight], str[indexFromRight], delay);
  }
}

function randomScore() {
  const v = 12345;
  spinToNumber(v);
}

document.getElementById('startBtn').addEventListener('click', randomScore);

initDigits();
