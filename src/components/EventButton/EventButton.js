import React from "react";
import { useHistory } from "react-router-dom";
import "./EventButton.scss";
// import { getNewAuthToken } from "../Api/tokenCheck";

export default function Button({
  isUserAttending,
  isUserOwner,
  userID,
  auth,
  eventID,
  userEventList,
  firstInitial,
  lastInitial,
  userInfo,
  isFromHome,
  getEventList,
  getUserEventList
}) {
 
  let history = useHistory();
  const joinURL = "https://testproject-api-v2.strv.com/events/";

  const handleJoinEvent = async () => {
    try {
      const response = await fetch(`${joinURL}${eventID}/attendees/me`, {
        method: "POST",
        headers: {
          APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
          Authorization: auth,
          "Content-type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
        },
      });
      await response.json();
      getEventList && getEventList();
      getUserEventList && getUserEventList();
    } catch (err) {
      console.log("joining event error", err);
    }
  };

  const handleLeaveEvent = async () => {
    try {
      const response = await fetch(`${joinURL}${eventID}/attendees/me`, {
        method: "DELETE",
        headers: {
          APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
          Authorization: auth,
          "Content-type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
        },
      });
      await response.json();
      getEventList && getEventList();
    } catch (err) {
      console.log("leaving event error", err);
    }
  };

  function handleEditEvent() {
    if (eventID) {
      history.push({
        pathname: "/event/edit",
        state: {
          eventID: eventID,
          auth: auth,
          userEventList: userEventList,
          firstInitial: firstInitial,
          lastInitial: lastInitial,
          userInfo: userInfo,
          isFromHome: isFromHome,
        },
      });
    }
  }

  return (
    <div>
      {isUserOwner ? (
        <div className="event_list_button__owner">
          <button onClick={handleEditEvent}>EDIT</button>
        </div>
      ) : !isUserAttending ? (
        <div onClick={handleJoinEvent} className="event_list_button__join">
          <button>JOIN</button>
        </div>
      ) : (
        <div onClick={handleLeaveEvent} className="event_list_button__leave">
          <button>LEAVE</button>
        </div>
      )}
    </div>
  );
}
