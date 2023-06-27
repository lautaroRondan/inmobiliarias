export const PetitionFetch = async (url, metodo, datosGuardar = "") => {
  // Variable para indicar si la petición está en curso o ha finalizado  
  let cargando = true;

  // Opciones de configuración para la petición
  let opciones = {};

  if (metodo == "GET" || metodo == "DELETE") {
    opciones = {
      method: metodo,
    };
  } else if (metodo == "POST" || metodo == "PUT") {
    opciones = {
      method: metodo,
      body: JSON.stringify(datosGuardar),
      headers: {
        "Content-Type": "application/json",
      },
    }
  }

  // Se realiza la petición HTTP utilizando fetch
  const peticion = await fetch(url, opciones);
  // Se convierte la respuesta en formato JSON
  const datos = await peticion.json();
  // La petición ha finalizado, se actualiza el estado de cargando
  cargando = false;

  return {
    datos,
    cargando
  };
};