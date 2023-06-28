import { Global } from "../Helpers/Global";

const baseUrl = Global.url
/**
 * Hook usado para menejar las peticions HTTP
 * @returns useFetch function
 */
const useFetch = () => {

  async function sendRequest(path, method = "GET", body = "") {
    let cargando = true;
    let url = baseUrl + path;

    // Opciones de configuración para la petición
    let opciones = {};

    if (method == "GET" || method == "DELETE") {
      opciones = {
        method: method,
      };
    } else if (method == "POST" || method == "PUT") {
      opciones = {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
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
  }
  return { sendRequest  }
};

export default useFetch;