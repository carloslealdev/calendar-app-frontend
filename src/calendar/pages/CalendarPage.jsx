import { Calendar } from "react-big-calendar";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FadDelete,
  NavBar,
} from "../";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGettet = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });

    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#18ee18" : "#465660",
      // borderRadius: "0px",
      opacity: 0.8,
      color: "black",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    // setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />

      <Calendar
        defaultView={lastView}
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGettet}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />

      <FabAddNew />
      <FadDelete />
    </>
  );
};
