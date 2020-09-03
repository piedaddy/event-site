import React from "react";
import "./Events.scss";

export default function FutureEvents({
  futureEvents,
  showGrid,
  mappingEventsToGrid,
  mappingEventsToRow,
  objectTest,
  getEventList,
  userID,
}) {
  let eventList;
  if (futureEvents) {
    if (showGrid) {
      eventList = futureEvents.map((event, index) =>
        mappingEventsToGrid(event, index, userID, objectTest, getEventList)
      );
    } else {
      eventList = futureEvents.map((event, index) =>
        mappingEventsToRow(event, index, userID, objectTest, getEventList)
      );
    }
  } else {
    return <div></div>;
  }
  return eventList;
}
