import {Tarea, FiltroEstado} from "./types";
import { obtenerTareas, guardarTareas } from "./storage";

let tareas: Tarea[] = obtenerTareas();
let filtroActual: FiltroEstado = "todas";

const formulario = document.querySelector("#form-tarea") as HTMLFormElement;
const inputTarea = document.querySelector("#input-tarea") as HTMLInputElement;
const mensajeError = document.querySelector("#mensaje-error") as HTMLParagraphElement;
const listaTareas = document.querySelector("#lista-tareas") as HTMLUListElement;
const botonesFiltro = document.querySelectorAll<HTMLButtonElement>(".btn-filtro");

const renderizarTareas = (): void => {
  listaTareas.innerHTML = "";

  const tareasFiltradas = tareas.filter((tarea: Tarea) => {
    if (filtroActual === "pendientes") return !tarea.completada;
    if (filtroActual === "completadas") return tarea.completada;
    return true;
  });

  if (tareasFiltradas.length === 0) {
    listaTareas.innerHTML = `<li class="vacio">No hay tareas en esta vista.</li>`;
    return;
  }

  tareasFiltradas.forEach((tarea: Tarea) => {
    const li = document.createElement("li");
    li.className = `tarea-item ${tarea.completada ? "completada" : ""}`;

    li.innerHTML = `
      <span class="tarea-texto" data-id="${tarea.id}">${tarea.texto}</span>
      <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>`;

    listaTareas.appendChild(li);
  });
};

formulario.addEventListener("submit", (e: SubmitEvent) =>{
  e.preventDefault();
  const texto = inputTarea.value.trim();

  if(!texto){
    mensajeError.classList.remove("oculto");
    return
  }

  mensajeError.classList.add("oculto");
  const nuevaTarea: Tarea = {
    id: Date.now(),
    texto,
    completada: false,
  };

  tareas = [...tareas, nuevaTarea];
  guardarTareas(tareas);
  formulario.reset();
  renderizarTareas();
});


listaTareas.addEventListener("click", (e: MouseEvent)=>{
  const objetivo = e.target as HTMLElement;
  const idAttr = objetivo.dataset.id;
  if (!idAttr) return;

  const id = Number(idAttr);

  if(objetivo.classList.contains("tarea-texto")){
    tareas = tareas.map((t:Tarea) =>
    t.id === id ? {...t,  completada: !t.completada}: t
    );
    guardarTareas(tareas);
    renderizarTareas();
  }

  if (objetivo.classList.contains("btn-eliminar")) {
    tareas = tareas.filter((t: Tarea) => t.id !== id);
    guardarTareas(tareas);
    renderizarTareas();
  }
});

botonesFiltro.forEach((boton: HTMLButtonElement) => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach((b) => b.classList.remove("activo"));
    boton.classList.add("activo");

    filtroActual = (boton.dataset.filtro as FiltroEstado) || "todas";
    renderizarTareas();
  });
});

renderizarTareas();