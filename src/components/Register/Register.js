import React, { useState } from "react";
import Header from "../Header/Header";
import LeftPanel from "../LeftPanel/LeftPanel";
import { useHistory } from "react-router-dom";
import "./Register.scss";
import "../Login/Login.scss";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password_1, setPassword_1] = useState("");
  const [password_2, setPassword_2] = useState("");
  const [showErrMessage, setShowErrMessage] = useState(false);
  let hasAccount = false;
  let history = useHistory();

  const addUserUrl = "https://testproject-api-v2.strv.com/users";

  const addUser = async (e) => {
    e.preventDefault();
    try {
      if (password_1 === password_2) {
        await fetch(addUserUrl, {
          method: "POST",
          headers: {
            APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password_1,
          }),
        });
        sendBackHome();
      } else {
        setShowErrMessage(true);
      }
    } catch (err) {
      console.log("registration error", err);
    }
  };

  function sendBackHome () {
    history.push("/");
  }

  const handleAddFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleAddLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleAddEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddPassword_1 = (e) => {
    setPassword_1(e.target.value);
  };
  const handleAddPassword_2 = (e) => {
    setPassword_2(e.target.value);
  };

  return (
    <div className="register_container">
      <Header hasAccount={hasAccount} />
      <div className="left_panel_container">
        <LeftPanel />
      </div>

      <div className="register">
        <div className="login_form__container">
          <div className="login_form__main">
            <div className="login_form__titles">
              <h2>Get started absolutely free.</h2>
              {/* {!errMessage ? ( */}
              <p>Enter your details below.</p>
              {/* ) : (
              <p className="login_error">
                Oops! That email and password combination is not valid!
              </p>
            )} */}
            </div>

            <form method="" action="" onSubmit={addUser}>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {firstName.length > 0 ? "First name" : ""}
                </p>
                <input
                  className={showErrMessage ? "input_error" : ""}
                  onChange={handleAddFirstName}
                  value={firstName}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                />
              </div>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {lastName.length > 0 ? "Last name" : ""}
                </p>
                <input
                  className={showErrMessage ? "input_error" : ""}
                  onChange={handleAddLastName}
                  value={lastName}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                />
              </div>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {email.length > 0 ? "Email" : ""}
                </p>
                <input
                  className={showErrMessage ? "input_error" : ""}
                  onChange={handleAddEmail}
                  value={email}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {password_1.length > 0 ? "Password" : ""}
                </p>
                <div className="login_form__pass">
                  <input
                    className={showErrMessage ? "input_error" : ""}
                    onChange={handleAddPassword_1}
                    value={password_1}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="login_form__input">
                <p className="login_form__input-names">
                  {password_2.length > 0 ? "Reapeat password" : ""}
                </p>
                <div className="login_form__pass">
                  <input
                    className={showErrMessage ? "input_error" : ""}
                    onChange={handleAddPassword_2}
                    value={password_2}
                    type="password"
                    name="password"
                    placeholder="Repeat password"
                  />
                </div>
              </div>
              <br />
              <div className="login_form__button-container">
                <button className="login_form__button" type="submit">
                  {" "}
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

