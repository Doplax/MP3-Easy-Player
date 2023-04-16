

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
          <button class="anterior"">
            <img src="icon/anterior.png">
          </button>
          <button class="siguiente" >
            <img src="icon/siguiente.png">
          </button>
        </div>
      </div>
    `;

    swiperWrapper.appendChild(swiperSlide);
  });
}
// Ejecutamos la función al cargar la página
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

};

