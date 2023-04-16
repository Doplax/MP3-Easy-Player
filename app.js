// :::::::::  FUNCTIONS ::::::::::
function renderSongs() {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = "";

  songs.forEach((song, index) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    swiperSlide.innerHTML = `
      <div class="player">
        <div class="cover">
          <img src="${song.image}" />
        </div>

        <div class="song">
          <h1 class="title">${song.title}</h1>
          <h2 class="artist">${song.artist}</h2>
        </div>

        <audio class="audio" id="audio${index}" preload="true" controls>
          <source type="audio/mp3" src="${song.path}">
        </audio>
        <div class="buttons">
          <div class="previous" onClick="stopMusic()">
            <img src="/icon/previous.png">
          </div>
          <div class="playPause" id="playPause${index}">
            <img src="icon/play.png" id="playPauseIcon${index}">
          </div>
          <div class="next" onClick="stopMusic()">
            <img src="/icon/next.png">
          </div>
        </div>
      </div>
    `;
    swiperWrapper.appendChild(swiperSlide);
    
    // To add playPause feature
    const playPauseButton = document.querySelector(`#playPause${index}`);
    playPauseButton.addEventListener("click", () => playPause(index));
  });
}

function stopMusic() {
  const audios = document.querySelectorAll(".audio");
  const playPauseIcons = document.querySelectorAll("[id^='playPauseIcon']");

  audios.forEach((audio, index) => {
    audio.pause();
    audio.currentTime = 0;
    playPauseIcons[index].src = "icon/play.png";
  });
}

function playPause(index) {
  const audio = document.querySelector(`#audio${index}`);
  const playPauseIcon = document.querySelector(`#playPauseIcon${index}`);

  if (audio.paused) {
    audio.play();
    playPauseIcon.src = "icon/pause.png";
  } else {
    audio.pause();
    playPauseIcon.src = "icon/play.png";
  }
}

// ::::::::::  Variables :::::::::::::::
const songs = [
  {
    title: "FEEL ME??",
    artist: "Trueno",
    path: "./songs/Trueno-FEEL-ME.mp3",
    image: "./img/Trueno-FEEL-ME.webp",
  },  
  {
    title: "Redbone",
    artist: "Childish Gambino",
    path: "./songs/ChildishGambino-Redbone.mp3",
    image: "./img/ChildishGambino-Redbone.webp",  
  },
  {
    title: "Viene y Va",
    artist: "C.Tangana",
    path: "./songs/c.tangana-VieneyVa.mp3",
    image: "./img/c.tangana-VieneyVa.webp",  
  },
  {
    title: "Umi (Remix)",
    artist: "Parkineos",
    path: "./songs/Rojuu-Umi(Parkineos-Remix).mp3",
    image: "./img/Rojuu-Umi(Parkineos-Remix).webp",  
  },
];

// :::::::::::  MAIN  ::::::::::
window.onload = () => {
  renderSongs();

  
  // Inicializar el Carousel
  const swiper = new Swiper(".swiper", {
    cssMode: false,
    navigation: {
      nextEl: ".next",
      prevEl: ".previous",
    },
  });
  swiper.on("slideChange", stopMusic);
};

