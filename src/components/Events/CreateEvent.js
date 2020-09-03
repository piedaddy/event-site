import React, { useState } from "react";
import "../Header/Header.scss";
import "./Events.scss";
import moment from "moment";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import CloseSVG from "../SVG/CloseSVG";

export default function CreateEvent({ userInfo, authToken }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [titleErrMessage, setTitleErrMessage] = useState(false);
  const [descErrMessage, setDescErrMessage] = useState(false);
  const [timeErrMessage, setTimeErrMessage] = useState(false);
  const [dateErrMessage, setDateErrMessage] = useState(false);
  const [capacityErrMessage, setCapacityErrMessage] = useState(false);
  let location = useLocation();
  let history = useHistory();
  let checkTitle = title.length > 0;
  let checkDesc = description.length > 0;
  let checkTime = startTime.length > 0;
  let checkDate = startDate.length > 0;
  let checkCapacity = capacity > 0;
  const eventUrl = "https://testproject-api-v2.strv.com/events";

  const addNewEvent = async (e) => {
    e.preventDefault();
    let momentObj = moment(startDate + startTime, "YYYY-MM-DDLT");
    let dateTime = momentObj.format("YYYY-MM-DDTHH:mm:ss");
    const requestParams = {
      method: "POST",
      headers: {
        APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
        "Content-type": "application/json",
        Authorization: location.state.authToken,
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        startsAt: dateTime,
        capacity: capacity,
      }),
    };
    const response = await fetch(eventUrl, requestParams);
    await response.json();
    if (!checkDesc) {
      setDescErrMessage(true);
    } else if (!checkTitle) {
      setTitleErrMessage(true);
    } else if (!checkTime) {
      setTimeErrMessage(true);
    } else if (!checkDate) {
      setDateErrMessage(true);
    } else if (!checkCapacity) {
      setCapacityErrMessage(true);
    } else {
      handleRedirectToHomepage();
    }
  };

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
    setTitleErrMessage(false);
  };
  const handleAddDescription = (e) => {
    setDescription(e.target.value);
    setDescErrMessage(false);
  };
  const handleAddStartDate = (e) => {
    setStartDate(e.target.value);
    setDateErrMessage(false);
  };

  const handleAddStartTime = (e) => {
    setStartTime(e.target.value);
    setTimeErrMessage(false);
  };
  const handleAddCapacity = (e) => {
    setCapacity(e.target.value);
    setCapacityErrMessage(false);
  };

  const handleRedirectToHomepage = () => {
    history.push({
      pathname: "/home",
      state: {
        userInfo: location.state.userInfo,
        authToken: location.state.authToken,
      },
    });
  };

  return (
    <div className="create_event">
      <div className="homepage-header">
        <p>E.</p>
        <div className="create_close" onClick={handleRedirectToHomepage}>
          <CloseSVG />
          <span>Close</span>
        </div>
      </div>
      <div className="create_event_form_container">
        <div className="create_event_form">
          <div className="form_heading">
            <span>Create new event.</span>
            <p>Enter details below.</p>
          </div>
          <form method="" action="" onSubmit={addNewEvent}>
            <div className={`inputs ${titleErrMessage ? "input_error" : ""}`}>
              <input
                onChange={handleAddTitle}
                value={title}
                type="text"
                name="title"
                placeholder="Title"
              ></input>
              {titleErrMessage ? "Title needs to be filled out" : ""}
            </div>
            <div className={`inputs ${descErrMessage ? "input_error" : ""}`}>
              <input
                onChange={handleAddDescription}
                value={description}
                type="text"
                name="description"
                placeholder="Description"
              ></input>
              {descErrMessage ? "Description needs to be filled out" : ""}
            </div>
            <div className={`inputs ${dateErrMessage ? "input_error" : ""}`}>
              <input
                onChange={handleAddStartDate}
                value={startDate}
                type="date"
                name="startDate"
                placeholder="Date"
              ></input>
              {dateErrMessage ? "Date needs to be filled out" : ""}
            </div>
            <div className={`inputs ${timeErrMessage ? "input_error" : ""}`}>
              <input
                onChange={handleAddStartTime}
                value={startTime}
                type="time"
                name="startTime"
                placeholder="Time"
              ></input>
              {timeErrMessage ? "Time needs to be filled out" : ""}
            </div>
            <div
              className={`inputs ${capacityErrMessage ? "input_error" : ""}`}
            >
              <input
                onChange={handleAddCapacity}
                value={capacity}
                type="number"
                name="capacity"
                placeholder="Capacity"
              ></input>
              {capacityErrMessage ? "Capacity needs to be filled out" : ""}
            </div>
            <div className="add_event_button">
              <button>CREATE NEW EVENT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
