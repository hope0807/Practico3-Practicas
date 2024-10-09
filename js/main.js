const formulario = document.getElementById('formulario');
const busqueda = document.getElementById('busqueda');
const botonBuscar = document.getElementById('boton-buscar');
const gridGifs = document.getElementById('grid-gifs');

const apiKey = "lONxdVQtw341n10XulzNAMTpuBtcWr3q";
const urlBase = `https://api.giphy.com/v1/gifs/search`;

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const terminoBusqueda = busqueda.value.trim();
  if (terminoBusqueda !== '') {
    buscarGifs(terminoBusqueda);
  }
});

function buscarGifs(terminoBusqueda) {
  const url = `${urlBase}?api_key=${apiKey}&q=${terminoBusqueda}&limit=9`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.data.length > 0) {
        const gifs = data.data;
        mostrarGifs(gifs);
      } else {
        console.log("No se encontraron resultados");
      }
    })
    .catch((error) => console.error("Error al buscar GIFs:", error));
}

function mostrarGifs(gifs) {
  gridGifs.innerHTML = '';
  gifs.forEach((gif) => {
    const img = document.createElement('img');
    img.src = gif.images.downsized.url;
    img.classList.add('gif');
    gridGifs.appendChild(img);
  });
}