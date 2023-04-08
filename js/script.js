/*
Archivo: script.js
Script general para elementos gráficos del template html,
navegación y funciones auxiliares.
*/

// Expande y contrae el menú en vísta móvil
// ... alternando la clase "collapse" de bootstrap
document.querySelector('.navbar-toggler').addEventListener('click', function () {
  document.querySelector('.navbar-collapse').classList.toggle('collapse');
});


// Inicia el juego si en el link se indica el anchor #jugar
// Se utiliza para disparar la acción con el botón de la página de instrucciones.
let jugar = (window.location.hash == '#jugar');
if (jugar) {
  iniciarJuego();
}

/********FUNCIONES AUXILIARES***************/
// Retorna un número aleatorio >= 0 y < n
function randomN (n) {
  return Math.floor(Math.random() * n);
}

// Desordena un array
function desordenarArray (array) {
  let longitud = array.length;

  // Recorre el array
  for (let i=0; i < longitud; i++)
  {
    // Intercambia de lugar el valor del elemento acutal
    //...con el valor de otro elemento aleatorio
    let rand = randomN(longitud);
    let temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }
}