//Este custom hook es una implementacion distinta para trabajar con Redux
// donde usualmente se trabaja con thunks
// para este ejercicio evitaremos el uso de thunks

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    // console.log({ email, password });

    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });

      //almaceno en el local Storage el token que devuelve el post a la api
      localStorage.setItem("token", data.token);
      //Puedo almacenar también la fecha y el momento en el que se crea el token
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      //   console.log(error.response.data.msg);
      dispatch(onLogout(error.response.data?.msg || ""));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  //Esta funcion permite revalidar el token mientras que el usuario está
  //trabajando en la app
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);

      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    //*Propiedades
    status,
    user,
    errorMessage,

    //*Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
