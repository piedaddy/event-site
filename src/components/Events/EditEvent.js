import React from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

export default function EditEvent({
  eventID,
  auth,
  userInfo,
  userEventList,
  firstInitial,
  lastInitial,
  isFromHome,
}) {
  let location = useLocation();
  let history = useHistory();
  let newEventList = location.state.userEventList;

  const deleteURL = "https://testproject-api-v2.strv.com/events/";

  const handleDeleteEvent = async () => {
    await fetch(`${deleteURL}${location.state.eventID}`, {
      method: "DELETE",
      headers: {
        APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
        Authorization: location.state.auth,
        "Content-type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
      },
    });
    newEventList = newEventList.filter(
      (event) => event.id !== location.state.eventID
    );
    //location.state.isFromHome ? handleSendBackHome() : handleSendBackToProfile()
    handleSendBackToProfile();
  };

  function handleSendBackToProfile() {
    if (location) {
      history.push({
        pathname: "/profile",
        state: {
          userInfo: location.state.userInfo,
          authToken: location.state.auth,
          userEventList: newEventList,
          firstInitial: location.state.firstInitial,
          lastInitial: location.state.lastInitial,
        },
      });
    }
  }

  function handleSendBackHome() {
    if (location) {
      history.push({
        pathname: "/home",
        state: {
          userInfo: newEventList,
          authToken: location.state.auth,
        },
      });
    }
  }

  return (
    <div>
      edit event
      <button onClick={handleDeleteEvent}>delete</button>
    </div>
  );
}
