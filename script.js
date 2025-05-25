const loadingScreen = document.getElementById('loadingScreen');
const sasukeLoadingScreen = document.getElementById('sasukeLoadingScreen');
const itachiLoadingScreen = document.getElementById('itachiLoadingScreen'); // <-- Add this line
const welcomeScreen = document.getElementById('welcomeScreen');
const cakeScreen = document.getElementById('cakeScreen');
const wishScreen = document.getElementById('wishScreen');
const startBtn = document.getElementById('startBtn');
const increaseAge = document.getElementById('increaseAge');
const decreaseAge = document.getElementById('decreaseAge');
const ageDisplay = document.getElementById('ageDisplay');
const candlesDiv = document.getElementById('candles');
const celebrateBtn = document.getElementById('celebrateBtn');
const birthdaySong = document.getElementById('birthdaySong');
const wishMessage = document.getElementById('wishMessage');
const confettiDiv = document.getElementById('confetti');
const nameInput = document.getElementById('nameInput');
const cakeLabel = document.getElementById('cakeLabel');
let userName = "";

let age = 0;
const maxAge = 120;
let candlesLit = false;
let blowing = false;

startBtn.onclick = () => {
  userName = nameInput.value.trim() || "Friend";
  // Show loading screen
  showScreen(loadingScreen);
  setTimeout(() => {
    showSpecialWish(userName);
  }, 1800); // 1.8 seconds loading, adjust as desired
};

function showSpecialWish(name) {
  let oldOverlay = document.getElementById('wishOverlay');
  if (oldOverlay) oldOverlay.remove();

  let wishOverlay = document.createElement('div');
  wishOverlay.id = 'wishOverlay';
  wishOverlay.style.position = 'fixed';
  wishOverlay.style.top = 0;
  wishOverlay.style.left = 0;
  wishOverlay.style.width = '100vw';
  wishOverlay.style.height = '100vh';
  // Themed background:
  wishOverlay.style.background = 'radial-gradient(circle at 60% 40%, #ffe0f7 0%, #ffb6e6 60%, #ff69b4 100%)';
  wishOverlay.style.boxShadow = '0 0 120px 40px #ffb6e6 inset';
  wishOverlay.style.display = 'flex';
  wishOverlay.style.flexDirection = 'column';
  wishOverlay.style.justifyContent = 'center';
  wishOverlay.style.alignItems = 'center';
  wishOverlay.style.zIndex = 9999;
  // Optional: add a subtle sparkle effect
  wishOverlay.innerHTML = `
    <div style="position:absolute;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1;">
      ${Array.from({length: 18}).map(() => {
        const left = Math.random()*100;
        const top = Math.random()*100;
        const size = 12 + Math.random()*10;
        const delay = Math.random()*2;
        return `<div style="
          position:absolute;
          left:${left}vw;
          top:${top}vh;
          width:${size}px;
          height:${size}px;
          background:radial-gradient(circle, #fff8 70%, #ffb6e6 100%);
          border-radius:50%;
          opacity:0.7;
          animation: sparkleMove 2.5s linear ${delay}s infinite alternate;
          "></div>`;
      }).join('')}
    </div>
  `;
  document.body.appendChild(wishOverlay);

  const phrases = [
    `Happy Birthday, ${name}!`,
    "Wishing you joy and laughter,",
    "to the best person in the world,",
    "may all your dreams come true!",
    "Let's celebrate your special day!"
  ];

  phrases.forEach((phrase, idx) => {
    const el = document.createElement('div');
    el.className = 'wish-phrase';
    el.style.opacity = 0;
    el.style.fontSize = idx === 0 ? '2.5rem' : '1.7rem';
    el.style.fontWeight = idx === 0 ? 'bold' : 'normal';
    el.style.color = '#ff69b4';
    el.style.margin = '0.5rem 0';
    el.style.transition = 'opacity 0.7s';
    el.textContent = phrase;
    wishOverlay.appendChild(el);
  });

  const phraseEls = wishOverlay.querySelectorAll('.wish-phrase');
  let i = 0;
  function showNextPhrase() {
    if (i < phraseEls.length) {
      phraseEls[i].style.opacity = 1;
      i++;
      setTimeout(showNextPhrase, 1200);
    } else {
      setTimeout(() => {
        wishOverlay.style.transition = 'opacity 0.7s';
        wishOverlay.style.opacity = 0;
        setTimeout(() => {
          wishOverlay.remove();
          // Show Sasuke loading screen before cake page
          showScreen(sasukeLoadingScreen);
          setTimeout(() => {
            showScreen(cakeScreen);
            updateCakeLabel();
          }, 1800); // 1.8 seconds for Sasuke loading
        }, 700);
      }, 1200);
    }
  }
  setTimeout(showNextPhrase, 600);
}

function updateCakeLabel() {
  cakeLabel.textContent = `Happy Bday ${userName}!`;
}

function showScreen(screen) {
  [welcomeScreen, cakeScreen, wishScreen, loadingScreen, sasukeLoadingScreen, itachiLoadingScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');

  // Add stars only to wishScreen
  if (screen === wishScreen) {
    // Remove old stars
    document.querySelectorAll('#wishScreen .star').forEach(e => e.remove());
    // Add new stars
    for (let i = 0; i < 24; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.width = (6 + Math.random() * 10) + 'px';
      star.style.height = star.style.width;
      star.style.animationDelay = (Math.random() * 2) + 's';
      wishScreen.appendChild(star);
    }
  }
}

increaseAge.onclick = () => {
  if (age < maxAge) {
    age++;
    updateAge();
  }
};

decreaseAge.onclick = () => {
  if (age > 0) {
    age--;
    updateAge();
  }
};

function updateAge() {
  ageDisplay.textContent = age;
  renderCandles(age);
  celebrateBtn.classList.toggle('hidden', age === 0);
  updateCakeLabel();
  candlesLit = false; // <-- Reset so candles can be lit again
  blowing = false;    // <-- Reset blowing state as well
}

function renderCandles(count) {
  candlesDiv.innerHTML = '';
  const cakeWidth = 320;
  for (let i = 0; i < count; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    const left = ((cakeWidth - 14) / (count + 1)) * (i + 1);
    candle.style.left = `${left}px`;
    candle.style.top = '0px';
    candle.dataset.index = i;
    candlesDiv.appendChild(candle);
  }
}

const danceGifs = document.getElementById('danceGifs');
celebrateBtn.onclick = () => {
  if (age > 0 && !candlesLit) {
    // Dynamically add dance GIFs side by side (Dance1-7)
    danceGifs.innerHTML = '';
    danceGifs.style.display = 'flex';
    ['Dance1.gif', 'Dance2.gif', 'Dance3.gif', 'Dance4.gif', 'Dance5.gif', 'Dance6.gif', 'Dance7.gif'].forEach((gif, idx) => {
      const img = document.createElement('img');
      img.src = `assets/${gif}`;
      img.alt = `Dance ${idx + 1}`;
      img.style.height = '80px';
      img.style.margin = '0 10px';
      danceGifs.appendChild(img);
    });
    lightCandles();
    birthdaySong.currentTime = 0;
    birthdaySong.play();
    startBlowDetection();
    candlesLit = true;
  }
};

function blowCandles() {
  const flames = document.querySelectorAll('.flame');
  const candles = document.querySelectorAll('.candle');
  // Animate each flame and candle: one by one
  flames.forEach((flame, i) => {
    setTimeout(() => {
      flame.style.transition = 'opacity 0.6s, transform 0.6s';
      flame.style.opacity = 0;
      flame.style.transform = 'scale(0.2)';
      // After flame is out, fade out the candle itself
      setTimeout(() => {
        const candle = candles[i];
        if (candle) {
          candle.style.transition = 'opacity 0.5s, transform 0.5s';
          candle.style.opacity = 0;
          candle.style.transform = 'translateY(-30px) scale(0.2)';
        }
        // After the last candle, hide and remove dance GIFs
        if (i === flames.length - 1) {
          danceGifs.style.display = 'none';
          danceGifs.innerHTML = '';
          setTimeout(() => {
            showScreen(itachiLoadingScreen);
            setTimeout(() => {
              showScreen(wishScreen);
              launchConfetti();
              setupWishTyping();
            }, 1800); // 1.8 seconds for Itachi loading
          }, 600);
        }
      }, 600);
    }, i * 400);
  });
}

function lightCandles() {
  const candleEls = document.querySelectorAll('.candle');
  candleEls.forEach(candle => {
    const flame = document.createElement('div');
    flame.className = 'flame';
    candle.appendChild(flame);
  });
}

function startBlowDetection() {
  if (blowing) return;
  blowing = true;
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      mic.connect(analyser);
      analyser.fftSize = 256;
      const data = new Uint8Array(analyser.frequencyBinCount);

      let blowDetectedFrames = 0;
      const requiredFrames = 15; // Require 15 consecutive loud frames for extra accuracy
      const threshold = 140; // Much higher threshold for only heavy blows

      function detectBlow() {
        analyser.getByteFrequencyData(data);
        const volume = data.reduce((a, b) => a + b) / data.length;
        if (volume > threshold) {
          blowDetectedFrames++;
        } else {
          blowDetectedFrames = 0;
        }
        if (blowDetectedFrames >= requiredFrames) {
          blowCandles();
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
        } else {
          requestAnimationFrame(detectBlow);
        }
      }
      detectBlow();
    })
    .catch(() => {
      blowCandles();
    });
}

function setupWishTyping() {
  // Remove any previous wish UI
  const oldInput = document.getElementById('wishInput');
  const oldBtn = document.getElementById('finishWishBtn');
  const oldDisplay = document.getElementById('wishDisplay');
  if (oldInput) oldInput.remove();
  if (oldBtn) oldBtn.remove();
  if (oldDisplay) oldDisplay.remove();

  wishMessage.textContent = "Type your wish below!";

  // Create a magical, glassy input
  const wishInput = document.createElement('input');
  wishInput.id = 'wishInput';
  wishInput.type = 'text';
  wishInput.placeholder = 'Enter your magical wish...';
  wishInput.maxLength = 100;
  wishInput.style.fontSize = '1.3rem';
  wishInput.style.margin = '1.5rem 0 0.5rem 0';
  wishInput.style.padding = '0.8rem 1.5rem';
  wishInput.style.borderRadius = '30px';
  wishInput.style.border = '2px solid #ff69b4';
  wishInput.style.background = 'rgba(255,255,255,0.35)';
  wishInput.style.backdropFilter = 'blur(10px)';
  wishInput.style.boxShadow = '0 4px 32px 0 rgba(255,105,180,0.25), 0 0 0 4px #fff3 inset';
  wishInput.style.outline = 'none';
  wishInput.style.width = '80%';
  wishInput.style.textAlign = 'center';
  wishInput.style.color = '#d2691e';
  wishInput.style.transition = 'border 0.3s, box-shadow 0.3s, background 0.3s';
  wishInput.onfocus = () => {
    wishInput.style.border = '2.5px solid #4caf50';
    wishInput.style.boxShadow = '0 0 24px #4caf50a0, 0 0 0 4px #fff3 inset';
    wishInput.style.background = 'rgba(255,255,255,0.55)';
  };
  wishInput.onblur = () => {
    wishInput.style.border = '2px solid #ff69b4';
    wishInput.style.boxShadow = '0 4px 32px 0 rgba(255,105,180,0.25), 0 0 0 4px #fff3 inset';
    wishInput.style.background = 'rgba(255,255,255,0.35)';
  };
  wishScreen.appendChild(wishInput);

  // Create finish button
  const finishBtn = document.createElement('button');
  finishBtn.id = 'finishWishBtn';
  finishBtn.textContent = 'Finish';
  finishBtn.style.fontSize = '1.2rem';
  finishBtn.style.marginTop = '1.2rem';
  finishBtn.style.padding = '0.7rem 2.2rem';
  finishBtn.style.borderRadius = '30px';
  finishBtn.style.background = 'linear-gradient(90deg, #ff69b4 60%, #4caf50 100%)';
  finishBtn.style.color = '#fff';
  finishBtn.style.border = 'none';
  finishBtn.style.boxShadow = '0 2px 12px #ff69b4a0, 0 0 16px #fff8';
  finishBtn.style.cursor = 'pointer';
  finishBtn.style.letterSpacing = '1px';
  finishBtn.style.fontWeight = 'bold';
  finishBtn.style.textShadow = '0 2px 8px #fff8';
  finishBtn.onmouseover = () => {
    finishBtn.style.background = 'linear-gradient(90deg, #4caf50 60%, #ff69b4 100%)';
    finishBtn.style.boxShadow = '0 2px 24px #4caf50a0, 0 0 16px #fff8';
  };
  finishBtn.onmouseout = () => {
    finishBtn.style.background = 'linear-gradient(90deg, #ff69b4 60%, #4caf50 100%)';
    finishBtn.style.boxShadow = '0 2px 12px #ff69b4a0, 0 0 16px #fff8';
  };
  wishScreen.appendChild(finishBtn);

  finishBtn.onclick = () => {
    const wishText = wishInput.value.trim();
    if (!wishText) {
      wishInput.focus();
      wishInput.style.border = '2.5px solid #ff0000';
      wishInput.style.boxShadow = '0 0 16px #ff0000a0';
      return;
    }
    // Show wish text
    const wishDisplay = document.createElement('div');
    wishDisplay.id = 'wishDisplay';
    wishDisplay.textContent = `"${wishText}"`;
    wishDisplay.style.fontSize = '2rem';
    wishDisplay.style.margin = '1.2rem 0';
    wishDisplay.style.color = '#ff69b4';
    wishDisplay.style.fontWeight = 'bold';
    wishDisplay.style.letterSpacing = '1px';
    wishDisplay.style.transition = 'opacity 1.2s, transform 1.2s, filter 1.2s';
    wishDisplay.style.textShadow = '0 2px 24px #fff8, 0 0 12px #ff69b4a0, 0 0 40px #fff8';
    wishDisplay.style.filter = 'drop-shadow(0 0 8px #ff69b4)';
    wishDisplay.style.background = 'rgba(255,255,255,0.18)';
    wishDisplay.style.borderRadius = '24px';
    wishDisplay.style.padding = '0.7rem 2.2rem';
    wishDisplay.style.backdropFilter = 'blur(4px)';
    wishScreen.appendChild(wishDisplay);

    // Remove input and button
    wishInput.remove();
    finishBtn.remove();

    // Animate wish text like dust (fade, blur, float up, scatter)
    setTimeout(() => {
      wishDisplay.style.opacity = 0;
      wishDisplay.style.transform = 'translateY(-80px) scale(1.3) rotate(-10deg)';
      wishDisplay.style.filter = 'blur(16px) brightness(2) drop-shadow(0 0 32px #fff)';
      setTimeout(() => {
        wishDisplay.remove();
        wishMessage.textContent = "Your wish will come true soon! ✨";
        wishMessage.style.color = "#4caf50";
        wishMessage.style.fontWeight = "bold";
        wishMessage.style.textShadow = "0 2px 16px #fff8, 0 0 8px #4caf50a0";
      }, 1200);
    }, 1200);
  };
}

function launchConfetti() {
  confettiDiv.innerHTML = '';
  for (let i = 0; i < 160; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-10px';
    conf.style.width = `${6 + Math.random() * 8}px`;
    conf.style.height = `${12 + Math.random() * 12}px`;
    conf.style.background = `linear-gradient(135deg, hsl(${Math.random()*360},90%,70%), #fff)`;
    conf.style.opacity = 0.85;
    conf.style.borderRadius = '3px';
    conf.style.transform = `rotate(${Math.random()*360}deg)`;
    conf.style.boxShadow = `0 0 8px hsl(${Math.random()*360},90%,80%)`;
    confettiDiv.appendChild(conf);
    animateConfetti(conf, i);
  }
}

function animateConfetti(conf, i) {
  const duration = 2000 + Math.random() * 2000;
  const endTop = 80 + Math.random() * 15;
  conf.animate([
    { top: '-10px', opacity: 1 },
    { top: endTop + 'vh', opacity: 0.7 }
  ], {
    duration: duration,
    easing: 'ease-out',
    fill: 'forwards'
  });
  setTimeout(() => conf.remove(), duration + 1000);
}

// Initialize
updateAge();