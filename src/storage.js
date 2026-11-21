const  STORAGE_KEY = "gestor_tareas";

export const obtenerTareas = () => {
    try {
        const datosGuardados = localStorage.getItem(STORAGE_KEY);
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    }catch (error) {
        console.error("Error al leer las tareas de localStorage:", error);
        return[];
    }
};

export const guardarTareas = () => {
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    }catch(error){
        console.error("Error al guardar las tareas en localStorage:", error);
    }
};