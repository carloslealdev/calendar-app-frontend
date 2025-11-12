import {
  authSlice,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("pruebas en authSlice", () => {
  test("debe de regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("debe de realizar un logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de realizar un logout con un mensaje de error", () => {
    const errorMessageCustom = "Ejecutando Logout";

    const state = authSlice.reducer(
      authenticatedState,
      onLogout(errorMessageCustom)
    );

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessageCustom,
    });
  });

  test("debe de limpiar el mensaje de error", () => {
    const errorMessageCustom = "Ejecutando Logout";

    const state = authSlice.reducer(
      authenticatedState,
      onLogout(errorMessageCustom)
    );

    const newState = authSlice.reducer(state, onClearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
