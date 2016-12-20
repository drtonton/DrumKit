function renderKeys() {
  let markup = '';

  for (let i = 0; i < keyboardArray.length; i++) {
    const key = keyboardArray[i];

    markup +=
      `<div class="key" data-key=${key.dataKey}>
        <kbd>${key.letter}</kbd>
        <span class="sound">${key.sound}</span>
        <audio data-key=${key.dataKey} src=sounds/${key.sound}.wav />
      </div>`;
  }

  return markup;
};

function paintBackground() {
  const body = document.querySelector('body');
  const randomColor = JSON.stringify(Math.floor(Math.random() * 1000000));

  body.style.backgroundColor = `#${randomColor}`;
}

function playSound(event) {
  const keyCode = event.keyCode;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  key.classList.add('playing');

  paintBackground();
}

function removeTransition(event) {
  if (event.propertyName !== 'transform') return;

  this.classList.remove('playing');
}

document.getElementById('keys').innerHTML = renderKeys();
document.querySelectorAll('.key').forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
