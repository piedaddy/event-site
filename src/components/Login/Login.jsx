import React, { useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import Header from "../Header/Header";
import EyeSVG from "../SVG/EyeSVG";
import { useHistory } from "react-router-dom";
import "./Login.scss";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  let history = useHistory();
  let hasAccount = true;
  const loginURL = "https://testproject-api-v2.strv.com/auth/native";

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${loginURL}`, {
        method: "POST",
        headers: {
          APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
          "Content-type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setErrMessage(true);
      } else if (data.id !== null) {
        history.push({
          pathname: "/home",
          state: {
            userInfo: data,
            authToken: response.headers.get("Authorization"),
          },
        });
      }
    } catch (err) {
      console.log("login errror");
    }
  };

  const handleAddEmail = (e) => {
    setEmail(e.target.value);
    setErrMessage(false);
  };

  const handleAddPassword = (e) => {
    setPassword(e.target.value);
    setErrMessage(false);
  };

  return (
    <>
      <section className="login_form">
        <Header hasAccount={hasAccount} />
        <div className="left_panel_container">
          <LeftPanel />
        </div>
        <div className="login_form__container">
          <div className="login_form__main">
            <div className="login_form__titles">
              <h2>Sign in to Eventio.</h2>
              {!errMessage ? (
                <p>Enter your details below.</p>
              ) : (
                <p className="login_error">
                  Oops! That email and password combination is not valid!
                </p>
              )}
            </div>

            <form method="" action="" onSubmit={userLogin}>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {email.length > 0 ? "Email" : ""}
                </p>
                <input
                  className={errMessage ? "input_error" : ""}
                  onChange={handleAddEmail}
                  value={email}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {password.length > 0 ? "Password" : ""}
                </p>
                <div className="login_form__pass">
                  <input
                    className={errMessage ? "input_error" : ""}
                    onChange={handleAddPassword}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <EyeSVG />
                </div>
              </div>
              <br />
              <div className="login_form__button-container">
              <button className="login_form__button" type="submit">
                {" "}
                SIGN IN
              </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
