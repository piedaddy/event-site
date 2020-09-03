import React, { useState } from "react";
import { useLocation } from "react-router";
import HomepageHeader from "../Header/HomepageHeader";
import { mappingEventsToGrid, mappingEventsToRow } from "../../utils";
import GridSVG from "../SVG/GridSVG";
import ListSVG from "../SVG/ListSVG";
import "./User.scss";
import "../Events/Events.scss";
import "../Homepage/Homepage.scss";

export default function UserProfile({
  userInfo,
  authToken,
  userEventList,
  firstInitial,
  lastInitial,
  isFromHome,
  eventList,
}) {
  const [showGrid, setShowGrid] = useState(true);
  let location = useLocation();
  let firstI = location.state.firstInitial;
  let lastI = location.state.lastInitial;
  let firstName = location.state.userInfo.firstName;
  let lastName = location.state.userInfo.lastName;
  let email = location.state.userInfo.email;
  let userEvents = location.state.userEventList;
  let userID = location.state.userInfo.id;
  let auth = location.state.authToken;
  let eventsGrid, eventsList;
  let isHome = false;

  const objectTest = {
    userID: userID,
    userEventList: location.state.userEventList,
    auth: location.state.authToken,
    userInfo: location.state.userInfo,
    firstInitial: location.state.firstInitial,
    lastInitial: location.state.lastInitial,
    isFromHome: location.state.isFromHome,
  };

  const getUserEventList = () => {
    userEvents = location.state.eventList.filter(
      (event) => event.owner.id === userID
    );
    location.state.eventList.map((event) => {
      event.attendees.map((attendee) => {
        if (userID === attendee.id) {
          userEvents.push(event);
        }
      });
    });
  };

  if (location.state.userEventList) {
    eventsGrid = userEvents.map((event, index) =>
    mappingEventsToGrid(event, index, userID, objectTest, getUserEventList)
    );
  }
  if (location.state.userEventList) {
    eventsList = userEvents.map((event, index) =>
    mappingEventsToRow(event, index, userID, objectTest)
    );
  }

  function handleShowGrid() {
    setShowGrid(true);
  }
  function handleShowList() {
    setShowGrid(false);
  }

  return (
    <>
      {location !== null ? (
        <div className="user_profile">
          <HomepageHeader
            firstName={firstName}
            lastName={lastName}
            firstInitial={firstI}
            lastInitial={firstI}
            userInfo={location.state.userInfo}
            authToken={auth}
          />
          <div className="user_profile__banner">
            <div className="user_profile__info">
              <div className="circle">
                <span>
                  {firstI}
                  {lastI}
                </span>
              </div>
              <div className="user_profile__info info">
                <p>
                  {firstName} {lastName}
                </p>
                <p>{email}</p>
              </div>
            </div>
          </div>

          <div className="user_profile__events">
            <span>My events</span>
            <div className="display_icons">
              <div className={`${showGrid ? "active" : ""}`}>
                <GridSVG handleEventGridStyle={handleShowGrid} />
              </div>
              <div className={`${!showGrid ? "active" : ""}`}>
                <ListSVG handleEventListStyle={handleShowList} />
              </div>
            </div>
          </div>
          <div className="event_list_container">
            {showGrid ? (
              <div className="event_list_grid_container"> {eventsGrid}</div>
            ) : (
              <div className="event_list_rows_container">{eventsList} </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
