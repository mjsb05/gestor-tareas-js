import { Tarea } from "./types";

const STORAGE_KEY = "gestor_tareas_v1";

export const obtenerTareas = (): Tarea[] => {
  try {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    return datosGuardados ? (JSON.parse(datosGuardados) as Tarea[]) : [];
  } catch (error) {
    console.error("Error al leer tareas de localStorage:", error);
    return [];
  }
};

export const guardarTareas = (tareas: Tarea[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  } catch (error) {
    console.error("Error al guardar tareas en localStorage:", error);
  }
};