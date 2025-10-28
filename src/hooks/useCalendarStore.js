import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  //Esta función parece un thunk pero no lo es xD
  const startSavingEvent = async (calendarEvent) => {
    //TODO llegar al backend

    //Espero el ok

    //Si el calendarEvent posee un id entonces significa que estoy actualizando
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent(calendarEvent));
    }
    //Caso contrario, significa que estoy creando un nuevo evento
    else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  return {
    //Propiedades
    events,
    activeEvent,
    //La doble exlamación es para trasnformar a booleano
    //Si hay un evento activo devuelve true, si es null entonces devuelve false
    hasEventSelected: !!activeEvent,

    //Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
