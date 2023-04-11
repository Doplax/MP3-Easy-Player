//// Variables botones
//let anterior = document.querySelectorAll(".anterior");
//let siguiente = document.querySelectorAll(".siguiente");

//let audio1 = document.getElementById("audio1");
//let audio2 = document.getElementById("audio2");
//let audio3 = document.getElementById("audio3");

//let audio = document.querySelectorAll("audio.audio");

//// Etiqueta Audio, detener canciom al reproducir otra etiqueta audio

//audio[0].addEventListener("play", () => {
//  audio2.currentTime = 0;
//  audio2.pause();

//  audio3.currentTime = 0;
//  audio3.pause();
//});

//audio[1].addEventListener("play", () => {
//  audio1.currentTime = 0;
//  audio1.pause();

//  audio3.currentTime = 0;
//  audio3.pause();
//});

//audio[2].addEventListener("play", () => {
//  audio1.currentTime = 0;
//  audio1.pause();

//  audio2.currentTime = 0;
//  audio2.pause();
//});

//// Cambiar canción
//function otraCancion() {
//  audio1.currentTime = 0;
//  audio1.pause();

//  audio2.currentTime = 0;
//  audio2.pause();

//  audio3.currentTime = 0;
//  audio3.pause();
//}

//// Carousel
//var swiper = new Swiper(".swiper", {
//  cssMode: false,
//  navigation: {
//    nextEl: ".siguiente",
//    prevEl: ".anterior",
//  },
//});


// Crear un objeto con las canciones, rutas e imágenes
const canciones = [
  {
    titulo: "TITULO1",
    artista: "ARTISTA1",
    ruta: "./canciones/7 Rings.mp3",
    imagen: "./img/7-rings.jpg",
  },  
  {
    titulo: "TITULO2",
    artista: "ARTISTA1",
    ruta: "./canciones/7 Rings.mp3",
    imagen: "./img/7-rings.jpg",  
  },
  {
    titulo: "TITULO3",
    artista: "ARTISTA1",
    ruta: "./canciones/7 Rings.mp3",
    imagen: "./img/7-rings.jpg",  
  },
];

function inicializarWaveSurfer() {
  canciones.forEach((cancion, index) => {
    const audio = document.getElementById(`audio${index}`);
    const waveform = document.getElementById(`waveform${index}`);

    // Crear una instancia de WaveSurfer y asociarla con el elemento de audio
    const wavesurfer = WaveSurfer.create({
      container: waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      height: 80,
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      mediaControls: true,
      mediaControlsSize: 1,
      hideScrollbar: true,
      backend: 'MediaElement',
    });

    wavesurfer.load(audio);

    // Actualizar el espectro de audio al cambiar de canción
    audio.addEventListener("play", () => {
      wavesurfer.play();
    });

    audio.addEventListener("pause", () => {
      wavesurfer.pause();
    });

    audio.addEventListener("seeking", () => {
      wavesurfer.seekTo(audio.currentTime / audio.duration);
    });
  });
}


// Función para renderizar las canciones
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
          <button class="anterior" onclick="cambiarCancion(-1)">
            <img src="icon/anterior.png">
          </button>
          <button class="siguiente" onclick="cambiarCancion(1)">
            <img src="icon/siguiente.png">
          </button>
        </div>
      </div>
    `;

    swiperWrapper.appendChild(swiperSlide);
  });
}

// Función para cambiar la canción
function cambiarCancion(direccion) {
  const swiper = document.querySelector(".swiper").swiper;
  const indiceActual = swiper.activeIndex;
  const audioActual = document.getElementById(`audio${indiceActual}`);

  // Detener la canción actual
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }

  // Actualizar el índice de la canción actual
  if (direccion === 1) {
    swiper.slideNext();
  } else {
    swiper.slidePrev();
  }
}

// Llamar a la función renderizarCanciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderizarCanciones();

  // Inicializar el Carousel
  var swiper = new Swiper(".swiper", {
    cssMode: false,
    navigation: {
      nextEl: ".siguiente",
      prevEl: ".anterior",
    },
  });
  inicializarWaveSurfer()
});