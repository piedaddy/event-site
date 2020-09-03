import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DropdownSVG from "../SVG/DropdownSVG";
import "./Header.scss";

export default function HomepageHeader({
  firstName,
  lastName,
  firstInitial,
  lastInitial,
  handleShowUserProfile,
  userInfo,
  authToken,
  eventList,
  userID,
  isHome,
}) {
  const [showMenu, setShowMenu] = useState(false);
  let history = useHistory();
  let userEvents;

  function showMenuOptions() {
    setShowMenu(!showMenu);
  }

  function handleGoHome() {
    if (!isHome) {
      history.push({
        pathname: "/home",
        state: {
          userInfo: userInfo,
          authToken: authToken,
        },
      });
    }
  }
  function handleLogOut() {
    return history.push("/");
  }

  return (
    <div className="homepage-header">
      <p onClick={handleGoHome}>E.</p>
      <div className="homepage_header_right">
        <div className="user-header">
          <div className="username-circle">
            <span>
              {firstInitial}
              {lastInitial}
            </span>
          </div>
          <span className="username_name" onClick={handleShowUserProfile}>
            {firstName} {lastName}
          </span>
          <div onClick={showMenuOptions}>
            <DropdownSVG />
          </div>
        </div>
        {showMenu ? (
          <span className="header_menu" onClick={handleLogOut}>
            Log Out
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
