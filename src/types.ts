export type FiltroEstado = "todas" | "pendientes" | "completadas";

export interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}