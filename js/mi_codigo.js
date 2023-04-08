var indice_pregunta_actual=0;
var total_puntos=0;
const nombre_Alumno="Fernandez Florencia";
const maximo_preguntas_por_jugada=10;
const puntos_resultado_bien=6;

function mostrarResultado(){
  document.querySelector('#pantalla-juego').classList.add('d-none');
  document.querySelector('#pantalla-resultado').classList.remove('bien');
  document.querySelector('#pantalla-resultado').classList.remove('mal');
    if (total_puntos>=puntos_resultado_bien) {
        document.querySelector('#pantalla-resultado').classList.add('bien');
    }else{
      document.querySelector('#pantalla-resultado').classList.add('mal');
    }
    document.querySelector('#resultado-puntos').textContent=total_puntos;
    document.querySelector('#pantalla-resultado').classList.remove('d-none');
}


function mostrarPregunta (pregunta) {
  document.querySelector('#pregunta-numero').textContent = (indice_pregunta_actual+1) + ') ';
  document.querySelector('#pregunta-texto').textContent = pregunta.pregunta;
  document.querySelector("#pregunta-imagen").src=pregunta.imagen_src;
  let div_opciones = document.querySelectorAll('#opciones div');
  let input_opciones = document.querySelectorAll('#opciones input');
  let label_opciones = document.querySelectorAll('#opciones label');
 
  
  for (let i = 0; i < 3; i++) {
    div_opciones[i].classList.remove('correcta');
    div_opciones[i].classList.remove('erronea');

    input_opciones[i].checked = false;
    input_opciones[i].value = pregunta.opciones[i];
    label_opciones[i].textContent = pregunta.opciones[i];
  }
}

function obtenerSiguientePregunta () {
  indice_pregunta_actual++;

  if (indice_pregunta_actual < preguntas.length && indice_pregunta_actual < maximo_preguntas_por_jugada)
  {
    return preguntas[indice_pregunta_actual];
  }
  else
  {
    return null;
  }
}


function iniciarJuego () {
  document.querySelector('#pantalla-inicio').classList.add('d-none');
  document.querySelector('#pantalla-resultado').classList.add('d-none');
  
  document.querySelector('#header').classList.remove('d-none');
  document.querySelector('#pantalla-juego').classList.remove('d-none');

  indice_pregunta_actual = 0;
  total_puntos = 0;
  
  desordenarArray(preguntas);

  mostrarPregunta(preguntas[indice_pregunta_actual]);
}




let boton_jugar=document.querySelector('#inicio-boton-jugar');
boton_jugar.addEventListener('click',iniciarJuego);


function verificarPreguntaActual () {
  let pregunta = preguntas[indice_pregunta_actual];

  let input_opciones = document.querySelectorAll('input');
  
  // Recorre todas las opciones
  for (let opcion of input_opciones) {
    // Obtiene el elemento <div> (el recuadro) que contiene a la opción
    // El <div> de cada opción tiene una clase con el mismo nombre que el id del <input>
    let recuadro = document.querySelector("." + opcion.id);

    if (opcion.value == pregunta.respuesta_correcta) {
      recuadro.classList.add('correcta');
      if (opcion.checked) {
        total_puntos++;
      }
    }
    else
    {
      if (opcion.checked) {
        recuadro.classList.add('erronea');
      }
    }
  }
}



function manejadorBotonVerificar() {
  
  let opcion_seleccionada=document.querySelector('input:checked');
  if (opcion_seleccionada) {
    verificarPreguntaActual();
    document.querySelector('#boton-verificar').classList.add('d-none');
    document.querySelector('#boton-siguiente').classList.remove('d-none');
  }
  
  
}
let boton_verificar = document.querySelector('#boton-verificar');
boton_verificar.addEventListener('click', manejadorBotonVerificar);

//Acciones del botón Siguiente
function manejadorBotonSiguiente() {
  let pregunta = obtenerSiguientePregunta();
  if (pregunta != null) {
    mostrarPregunta(pregunta);
  }
  else {
    mostrarResultado();
  }
  document.querySelector('#boton-siguiente').classList.add('d-none');
  document.querySelector('#boton-verificar').classList.remove('d-none');
}
let boton_siguiente = document.querySelector('#boton-siguiente');
boton_siguiente.addEventListener('click', manejadorBotonSiguiente );

// Activa el botón volver a jugar de la página de resultados.
let boton_volver_a_jugar=document.querySelector('#resultado-boton-volver-a-jugar');
boton_volver_a_jugar.addEventListener('click',iniciarJuego);