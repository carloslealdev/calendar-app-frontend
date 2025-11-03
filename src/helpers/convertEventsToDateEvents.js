import { parseISO } from "date-fns";

//Funcion para transformar el string de las fechas a un formato que soporte react-big-calendar
export const convertEventsToDateEvents = (events = []) => {
  return events.map((event) => {
    event.start = parseISO(event.start);
    event.end = parseISO(event.end);

    return event;
  });
};
