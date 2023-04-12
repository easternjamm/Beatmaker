class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "/sounds/kick-classic.wav";
    this.currentSnare = "/sounds/snare-acoustic01.wav";
    this.currentHihat = "/sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
  }
  // Toggle .active class on pads
  activePad() {
    this.classList.toggle("active");
  }
  // Increase the index while looping over the pads
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads and animate them
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // Check if pads are active and play the respective sound if they are
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  // Starts the playback and sets speed in function of bpm
  start() {
    const interval = (60 / this.bpm) * 1000;
    // Check if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // Clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  // Switch playBtn text and class
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  // Change selected sound
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
}

const drumKit = new DrumKit();

// Event listeners

// Add a click event on all pads
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
// Add a click event on the play button
drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});
// Add an event listener to select
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
