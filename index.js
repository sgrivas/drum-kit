let keysPressed = [];
var keysPressedEl = document.getElementById("keysPressed");
var playButton=document.getElementById('play')

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`); //get the audio file
  const key = document.querySelector(`.key[data-key="${e.key}"]`); //get the key div
  if (!audio) return; //stop the function from running all together
  audio.currentTime = 0; //rewind to start of sound
  audio.play();
  key.classList.add("playing");
  keysPressed.push(e.key);
  const upper = keysPressed.map((element) => {
    return element.toUpperCase();
  });
  keysPressedEl.textContent = upper.join(" ");
}

var sounds=[]
var reversed

playButton.addEventListener('click', function(){
  for (let index = 0; index < keysPressed.length; index++) {
    const audio = document.querySelector(`audio[data-key="${keysPressed[index]}"]`);
    sounds.push(audio)
  }
  reversed=sounds.reverse();
  playQueuedSounds();
})

function playQueuedSounds(){
  if (reversed.length === 0) return;
  var sound = reversed.pop(); // get last sound and remove it
  sound.play();
  sound.onended = function() { // go look at the queue again once current sound is finished
    playQueuedSounds();
  };
}

function removeTransform(e) {
  if (e.propertyName !== "transform") return; //skip it if it's not a transform
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransform));

window.addEventListener("keydown", playSound);
