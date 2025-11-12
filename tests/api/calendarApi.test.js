import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en el CalendarApi", () => {
  test("debe de tener la configuración por defecto", () => {
    // console.log(calendarApi);
    // console.log(process.env);

    //Esperamos que el baseURL de la configuración del calendarApi
    //sea igual a la variable de entorno que tenemos configurada
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("debe de tener el x-token en el header de todas las peticiones", async () => {
    //Seteamos un token de prueba en el local Storage
    const tokenTest = "ABC-123-XYZ";
    localStorage.setItem("token", tokenTest);

    //Hacemos una petición de prueba con nuestro calendarApi
    const res = await calendarApi
      .get("/auth")
      .then((res) => res)
      .catch((res) => res);

    //Esperamos que el x-token que está configurados en los headers sea igual
    //al token que estamos seteando

    expect(res.config.headers["x-token"]).toBe(tokenTest);
  });
});
