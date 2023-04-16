// :::::::::  FUNCTIONS ::::::::::
function renderSongs() {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = "";


  canciones.forEach((cancion, index) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    swiperSlide.innerHTML = `
      <div class="reproductor">
        <div class="portada">
          <img src="${cancion.imagen}" />
        </div>

        <div class="cancion">
          <h1 class="titulo">${cancion.titulo}</h1>
          <h2 class="artista">${cancion.artista}</h2>
        </div>

        <audio class="audio" id="audio${index}" preload="true" controls>
          <source type="audio/mp3" src="${cancion.ruta}">
        </audio>
        <div class="botones">
          <button class="anterior" onClick="stopMusic()">
            <img src="icon/anterior.png">
          </button>
          <div class="reproducirPausar" id="reproducirPausar${index}">
            <img src="icon/play.png" id="playPauseIcon${index}">
          </div>
          <button class="siguiente" onClick="stopMusic()">
            <img src="icon/siguiente.png">
          </button>
        </div>
      </div>
    `;
    swiperWrapper.appendChild(swiperSlide);
    
    // To add pausePlay feature
    const reproducirPausarButton = document.querySelector(`#reproducirPausar${index}`);
    reproducirPausarButton.addEventListener("click", () => reproducirPausar(index));
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



function reproducirPausar(index) {
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
const canciones = [
  {
    titulo: "FEEL ME??",
    artista: "Trueno",
    ruta: "./canciones/Trueno-FEEL-ME.mp3",
    imagen: "./img/Trueno-FEEL-ME.webp",
  },  
  {
    titulo: "Umi (Remix)",
    artista: "Parkineos",
    ruta: "./canciones/Rojuu-Umi(Parkineos-Remix).mp3",
    imagen: "./img/Rojuu-Umi(Parkineos-Remix).webp",  
  },
  {
    titulo: "Redbone",
    artista: "Childish Gambino",
    ruta: "./canciones/ChildishGambino-Redbone.mp3",
    imagen: "./img/ChildishGambino-Redbone.webp",  
  },
  {
    titulo: "Viene y Va",
    artista: "C.Tangana",
    ruta: "./canciones/c.tangana-VieneyVa.mp3",
    imagen: "./img/c.tangana-VieneyVa.webp",  
  },
];



// :::::::::::  MAIN  ::::::::::
window.onload = () => {

  
  //Cargamos las canciones
  renderSongs();

  
  // Inicializar el Carousel
  const swiper = new Swiper(".swiper", {
    cssMode: false,
    navigation: {
      nextEl: ".siguiente",
      prevEl: ".anterior",
    },
  });
  swiper.on("slideChange", stopMusic);
};

