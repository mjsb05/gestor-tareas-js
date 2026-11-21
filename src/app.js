import { obtenerTareas, guardarTareas } from "./storage.js";


let tareas = obtenerTareas();
let filtroActual = "todas";


const formTarea = document.getElementById("form-tarea");
const inputTarea = document.getElementById("input-tarea");
const mensajeError = document.getElementById("mensaje-error");
const listaTareas = document.getElementById("lista-tareas");
const estadoVacio = document.getElementById("estado-vacio");
const botonesFiltro = document.querySelectorAll(".btn-filtro");


const renderizarTareas = () => {

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtroActual === "pendientes") return !tarea.completada;
    if (filtroActual === "completadas") return tarea.completada;
    return true; 
  });


  listaTareas.innerHTML = "";


  if (tareasFiltradas.length === 0) {
    estadoVacio.classList.remove("oculto");
  } else {
    estadoVacio.classList.add("oculto");
  }

  // Creamos cada elemento <li>
  tareasFiltradas.forEach((tarea) => {
    const li = document.createElement("li");
    li.className = `tarea-item ${tarea.completada ? "completada" : ""}`;

    const spanTexto = document.createElement("span");
    spanTexto.className = "tarea-texto";
    spanTexto.textContent = tarea.texto;
    spanTexto.addEventListener("click", () => alternarCompletada(tarea.id));

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });
};


const actualizarYGuardar = (nuevasTareas) => {
  tareas = nuevasTareas;
  guardarTareas(tareas);
  renderizarTareas();
};

const agregarTarea = (texto) => {
  const nuevaTarea = {
    id: Date.now(), 
    texto,
    completada: false,
  };
  actualizarYGuardar([...tareas, nuevaTarea]);
};

const alternarCompletada = (id) => {
  const tareasActualizadas = tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
  );
  actualizarYGuardar(tareasActualizadas);
};

const eliminarTarea = (id) => {
  const tareasRestantes = tareas.filter((tarea) => tarea.id !== id);
  actualizarYGuardar(tareasRestantes);
};

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault(); 
  const textoLimpio = inputTarea.value.trim();

 
  if (!textoLimpio) {
    mensajeError.textContent = "Por favor, escribe una tarea antes de agregar.";
    mensajeError.classList.remove("oculto");
    return;
  }

  mensajeError.classList.add("oculto");
  agregarTarea(textoLimpio);
  inputTarea.value = "";
});

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {

    botonesFiltro.forEach((b) => b.classList.remove("activo"));
    boton.classList.add("activo");

    filtroActual = boton.dataset.filtro;
    renderizarTareas();
  });
});

renderizarTareas();