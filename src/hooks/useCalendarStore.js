import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onLoadEvents,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  //Esta función parece un thunk pero no lo es xD
  const startSavingEvent = async (calendarEvent) => {
    //todo Actualizar evento

    //Si el calendarEvent posee un id entonces significa que estoy actualizando
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent(calendarEvent));
    }
    //Caso contrario, significa que estoy creando un nuevo evento
    else {
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    }
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.events);

      // console.log({ events });

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
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
    startLoadingEvents,
  };
};
