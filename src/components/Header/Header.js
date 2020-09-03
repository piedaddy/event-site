import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header({ hasAccount }) {
  return (
    <div className="header">
      <div className="header__container">
        <span>E.</span>
        {hasAccount ? (
          <p>
            Don't have an account? <Link to="/register">SIGN UP</Link>
          </p>
        ) : (
          <p>
            Already have an account? <Link to="/">SIGN IN</Link>
          </p>
        )}
      </div>
    </div>
  );
}
