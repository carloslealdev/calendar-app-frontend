import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("pruebas en uiSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    // console.log(uiSlice.getInitiawlState());

    //Este test garantiza solo esta condición
    //Si en algun momento se agregan propiedades nuevas al initialState
    // entonces se debería actualizar el test

    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test("debe de cambiar el isDateModalOpen correctamente", () => {
    let state = uiSlice.getInitialState();

    //Abrimos el modal con acción respectica y hacemos el expect
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
