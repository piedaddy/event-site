import React from "react";
import "./PageNotFound.scss";
import "../Login/Login.scss";
import PageNotFoundSvg from "../SVG/PageNotFoundSvg";
import LeftPanel from "../LeftPanel/LeftPanel";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page_not_found">
      <div className="left_panel_container">
        <LeftPanel />
      </div>
      <div className="vader_svg">
        <PageNotFoundSvg />
      </div>
      <div className="pnf_error">
        <div>
          <h2>404 Error - page not found.</h2>
          <p>
            It seems like Darth Vadar just hit our website and dropped it down.
          </p>
          <p>
            Please press the refresh button and everything should be fine again.
          </p>
          <div className="pnf_button">
            <Link to="/">
              <button>REFRESH</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
