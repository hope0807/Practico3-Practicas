const formulario = document.getElementById('formulario');/*asigna la variable formulario al elemento con id formulario*/
const busqueda = document.getElementById('busqueda');/*asigna la varialble busqueda al elemento con id busqueda*/
const botonBuscar = document.getElementById('boton-buscar');/*asigna la variable botonBuscar al elemento con id boton-buscar*/
const gridGifs = document.getElementById('grid-gifs');/*asigna variable gridGifs al elemento con el id grid-gifs*/

const apiKey = "lONxdVQtw341n10XulzNAMTpuBtcWr3q"; /*clave API*/
const urlBase = `https://api.giphy.com/v1/gifs/search`;/*asigna URL base de la api para buscar gifs a variable urlBase*/

formulario.addEventListener('submit', (e) => { 
  e.preventDefault(); /*evita que el formulario se envie de manera predeterminada*/
  const terminoBusqueda = busqueda.value.trim();
  if (terminoBusqueda !== '') {/*verifica si la busqueda no esta vacia*/
    buscarGifs(terminoBusqueda);
  }
});

function buscarGifs(terminoBusqueda) {
  const url = `${urlBase}?api_key=${apiKey}&q=${terminoBusqueda}&limit=9`;/*contruye url de la api para buscar gifs con un limite de 9*/
  fetch(url)
    .then((response) => response.json())/*convierte la respuesta de la api en objeto JSON*/
    .then((data) => {/*procesa el objeto JSON y verifica si hay resultados*/
      if (data.data.length > 0) {/*si hay resultados de GIFs se los muestra al usuario*/
        const gifs = data.data;
        mostrarGifs(gifs);
      } else {/*si no hay resultados muestra el mensaje al usuario*/
        console.log("No se encontraron resultados");
      }
    })
    .catch((error) => console.error("Error al buscar GIFs:", error));/*muestra cualquier error que ocurra*/
}

function mostrarGifs(gifs) {
  gridGifs.innerHTML = '';
  gifs.forEach((gif) => {
    const img = document.createElement('img');/*crea un nuevo elemento img*/
    img.src = gif.images.downsized.url;
    img.classList.add('gif');
    gridGifs.appendChild(img);
  });
}