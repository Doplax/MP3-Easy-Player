// :::::::::  FUNCTIONS ::::::::::
function renderizarCanciones() {
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
          <button class="siguiente" onClick="stopMusic()">
            <img src="icon/siguiente.png">
          </button>
        </div>
      </div>
    `;

    swiperWrapper.appendChild(swiperSlide);
  });
}

function stopMusic() {
  const audios = document.querySelectorAll(".audio");
  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
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
];



// :::::::::::  MAIN  ::::::::::
window.onload = () => {

  
  //Cargamos las canciones
  renderizarCanciones();

  
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

