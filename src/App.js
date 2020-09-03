import React from "react";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage.js";
import CreateEvent from "./components/Events/CreateEvent.js";
import EditEvent from "./components/Events/EditEvent";

import PastEvents from "./components/Events/PastEvents.js";
import FutureEvents from "./components/Events/FutureEvents.js";
import PageNotFound from "./components/PageNotFound/PageNotFound.js";
import Register from "./components/Register/Register.js";
import UserProfile from "./components/User/UserProfile.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";



function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Switch>
        <Route exact path={"/"} component={Login} />
        <Route path={"/home"} component={Homepage}/>
        {/* <Route path={"/home"} render={(props) => <EventList {...props}/>}/> */}
        <Route path={"/profile"} component={UserProfile}/>
        <Route path={"/event/add"} component={CreateEvent}/>
        <Route path={"/event/edit"} component={EditEvent}/>
        <Route path={"/register"} component={Register}/>
        <Route path={"/future"} component={FutureEvents}/>
        <Route path={"/past"} component={PastEvents}/>



        <Route component={PageNotFound}/>



        </Switch>
      </div>
    </Router>
  );
}

export default App;
