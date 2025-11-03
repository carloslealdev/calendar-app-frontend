import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños del Jefe",
//   notes: "Comprar pastel",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Carlos",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeEvent: null,
    isLoadingEvents: true,
  },
  reducers: {
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;

      //La siguiente lógica me permite verificar si hay algun cambio en los eventos de manera local
      // y evitar modificar el state si no hay eventos nuevos
      //Barremos todos los eventos que llegan como payload y cotejamos si todos los eventos de state(que ya vienen de la base de datos)
      //coinciden con los que se reciben en en payload de manera local
      payload.forEach((event) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === event.id);

        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        //Este fitro devuelve todos los eventos cuyo id sea distinto al id del evento activo
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
