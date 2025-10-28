//Fab -> Floating Action Button

import { useCalendarStore, useUiStore } from "../../hooks";

export const FadDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleDeleteEvent = () => {
    startDeletingEvent();
  };

  return (
    <button
      style={{ display: hasEventSelected ? "" : "none" }}
      className="btn btn-danger fab-danger"
      onClick={handleDeleteEvent}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </div>
    </button>
  );
};
