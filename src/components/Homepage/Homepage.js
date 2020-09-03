import React, { useState, useEffect } from "react";
import PastEvents from "../Events/PastEvents";
import FutureEvents from "../Events/FutureEvents";
import HomepageHeader from "../Header/HomepageHeader";
import GridSVG from "../SVG/GridSVG";
import ListSVG from "../SVG/ListSVG";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { mappingEventsToGrid, mappingEventsToRow } from "../../utils";
import moment from "moment";
import "./Homepage.scss";
import "../Events/Events.scss";

export default function Homepage({ userInfo, authToken }) {
  const [eventList, setEventList] = useState([]);
  const [userID, setUserID] = useState(null);
  const [firstInitial, setFirstInitial] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showPast, setShowPast] = useState(false);
  const [showFuture, setShowFuture] = useState(false);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [isFromHome, setIsFromHome] = useState(true);
  let todayDate = moment().format();
  let location = useLocation();
  let history = useHistory();
  let userEvents, list;
  let isHome = true;
  const eventListUrl = "https://testproject-api-v2.strv.com/events";

  const objectTest = {
    userID: userID,
    userEventList: userEvents,
    auth: location.state.authToken,
    userInfo: location.state.userInfo,
    firstInitial: firstInitial,
    lastInitial: lastInitial,
    isFromHome: isFromHome,
  };

  const getEventList = async (e) => {
    const response = await fetch(eventListUrl, {
      method: "GET",
      headers: {
        APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
        "Content-type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
      },
    });
    const data = await response.json();
    setEventList(data);
  };

  useEffect(() => {
    setStates();
    getEventList();
    getUserEventList();
  }, []);

  const setStates = async () => {
    setUserID(location.state.userInfo.id);
    setFirstInitial(location.state.userInfo.firstName.charAt(0).toUpperCase());
    setLastInitial(location.state.userInfo.lastName.charAt(0).toUpperCase());
  };

  const getUserEventList = () => {
    userEvents = eventList.filter((event) => event.owner.id === userID);
    eventList.map((event) => {
      event.attendees.map((attendee) => {
        if (userID === attendee.id) {
          userEvents.push(event);
        }
      });
    });
  };

  const getPastEventList = () => {
    setShowAll(false);
    setShowFuture(false);
    setShowPast(true);
    setPastEvents(eventList.filter((event) => event.startsAt < todayDate));
  };

  const getFutureEventList = () => {
    setShowAll(false);
    setShowFuture(true);
    setShowPast(false);
    setFutureEvents(eventList.filter((event) => event.startsAt > todayDate));
  };

  const getAllEventList = () => {
    setShowAll(true);
    setShowFuture(false);
    setShowPast(false);
    getEventList();
  };

  function handleShowUserProfile() {
    getUserEventList();
    history.push({
      pathname: "/profile",
      state: {
        userInfo: location.state.userInfo,
        authToken: location.state.authToken,
        userEventList: userEvents,
        firstInitial: firstInitial,
        lastInitial: lastInitial,
        isFromHome: isFromHome,
        eventList: eventList,
      },
    });
  }

  function handleEventGridStyle() {
    setShowGrid(true);
  }
  function handleEventListStyle() {
    setShowGrid(false);
  }

  if (showGrid) {
    list = eventList.map((event, index) =>
    mappingEventsToGrid(event, index, userID, objectTest, getEventList)
    );
  } else {
    list = eventList.map((event, index) =>
    mappingEventsToRow(event, index, userID, objectTest, getEventList)
    );
  }

  return (
    <div className="homepage">
      <div>
        <HomepageHeader
          firstName={location.state.userInfo.firstName}
          lastName={location.state.userInfo.lastName}
          firstInitial={firstInitial}
          lastInitial={lastInitial}
          handleShowUserProfile={handleShowUserProfile}
          authToken={location.state.authToken}
          eventList={eventList}
          userID={location.state.userInfo.id}
          isHome={isHome}
        />
        <div className="homepage_nav">
          <div className="homepage_nav__buttons">
            <button onClick={getAllEventList}>ALL EVENTS</button>
            <button onClick={getPastEventList}>PAST EVENTS</button>
            <button onClick={getFutureEventList}>FUTURE EVENTS</button>
          </div>
          <div className="display_icons">
            <div className={`${showGrid ? "active" : ""}`}>
              <GridSVG handleEventGridStyle={handleEventGridStyle} />
            </div>
            <div className={`${!showGrid ? "active" : ""}`}>
              <ListSVG handleEventListStyle={handleEventListStyle} />
            </div>
          </div>
        </div>

        <div className="event_list_container">
          {showGrid ? (
            <div className="event_list_grid_container">
              {location !== null && showAll ? list : ""}
              {location !== null && showFuture ? (
                <FutureEvents
                  futureEvents={futureEvents}
                  showGrid={showGrid}
                  mappingEventsToGrid={mappingEventsToGrid}
                  objectTest={objectTest}
                  getEventList={getEventList}
                  userID={location.state.userInfo.id}
                />
              ) : (
                ""
              )}
              {location !== null && showPast ? (
                <PastEvents
                  pastEvents={pastEvents}
                  showGrid={showGrid}
                  mappingEventsToGrid={mappingEventsToGrid}
                  objectTest={objectTest}
                  getEventList={getEventList}
                  userID={location.state.userInfo.id}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="event_list_rows_container">
              {location !== null && showAll ? list : ""}
              {location !== null && showFuture ? (
                <FutureEvents
                  futureEvents={futureEvents}
                  showGrid={showGrid}
                  mappingEventsToRow={mappingEventsToRow}
                  objectTest={objectTest}
                  getEventList={getEventList}
                  userID={location.state.userInfo.id}
                />
              ) : (
                ""
              )}
              {location !== null && showPast ? (
                <PastEvents
                  pastEvents={pastEvents}
                  mappingEventsToRow={mappingEventsToRow}
                  showGrid={showGrid}
                  objectTest={objectTest}
                  getEventList={getEventList}
                  userID={location.state.userInfo.id}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        <Link
          to={{
            pathname: "/event/add",
            state: {
              userInfo: location.state.userInfo,
              authToken: location.state.authToken,
            },
          }}
          className="add_event_link"
        >
          <button className="add_event_button">
            <p>+</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
