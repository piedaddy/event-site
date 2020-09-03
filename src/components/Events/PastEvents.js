import React from "react";
import "./Events.scss";

export default function PastEvents({
  showGrid,
  pastEvents,
  mappingEventsToGrid,
  mappingEventsToRow,
  objectTest,
  getEventList,
  userID,
}) {
  let eventList;

  if (pastEvents) {
    if (showGrid) {
      eventList = pastEvents.map((event, index) =>
        mappingEventsToGrid(event, index, userID, objectTest, getEventList)
      );
    } else {
      eventList = pastEvents.map((event, index) =>
        mappingEventsToRow(event, index, userID, objectTest, getEventList)
      );
    }
  }

  return (
    <div>
      {eventList.length === 0 ? (
        <div className="empty_past_event_message">
          <p>There are no past events!</p>
        </div>
      ) : (
        eventList
      )}
    </div>
  );
}
