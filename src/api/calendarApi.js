import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

//Configurar interceptores
// ejecuto un interceptor al momento de hacer una request
calendarApi.interceptors.request.use((config) => {
  //Añado un header personalizado (x-token como está definido en el backend)
  //y mantengo cualquier otro header que ya esté establecido con el operador spread
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  //Vuelvo a retornar la configuracion
  return config;
});

export default calendarApi;
