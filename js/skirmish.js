let skirmish_sounds = false;

const skirmishLink = document.getElementById("skirmish");

skirmishLink.addEventListener("click", (event) => {
  event.preventDefault(); // prevent page jump

  if (skirmishLink.classList.contains("skirmishOn")) {
    // Switch to "off"
    skirmishLink.classList.remove("skirmishOn");
    skirmishLink.classList.add("skirmishOff");
    skirmishLink.textContent = "Skirmish (off)";
    skirmish_sounds = false;
  } else {
    // Switch to "on"
    skirmishLink.classList.remove("skirmishOff");
    skirmishLink.classList.add("skirmishOn");
    skirmishLink.textContent = "Skirmish (on)";
    skirmish_sounds = true;
  }
});

const bell = new Audio("./sounds/1.mp3");
const pirate = new Audio("./sounds/2.mp3");
const skirmish = new Audio("./sounds/3.mp3");

function playAudio(audio) {
  return new Promise((resolve) => {
    audio.play();
    audio.onended = resolve;
  });
}

async function playSequence() {
  await playAudio(bell);
  await playAudio(pirate);
  await playAudio(skirmish);
}

// modern browsers are so fucking retarded... should fix audio not playing 
document.addEventListener("click", () => {
  const silent = new Audio();
  silent.play().catch(() => {});
}, { once: true });

// Interval to check the time
let playedThisMinute = false;
setInterval(() => {
  const now = new Date();
    // sea skirmish is at 43minutes past the clock every hour so play at 42 minutes to give time to notify
  if (now.getMinutes() === 43 && now.getSeconds() === 0 && !playedThisMinute) {
  //if ( now.getMinutes() === 42  && now.getSeconds() === 0 && !playedThisMinute) {
    if(skirmish_sounds){
        console.log("playing sounds")
        playSequence();
        playedThisMinute = true;
    }
    
  }

  if (now.getSeconds() !== 0) {
    playedThisMinute = false;
  }
}, 1000);