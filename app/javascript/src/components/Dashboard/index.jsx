import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Sidebar from "components/Common/Sidebar";

import PasswordEdit from "./Account/Passwords/Edit";
import Profile from "./Account/Profile";
import JobSheets from "./JobSheets";

const Home = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <Switch>
        <Route exact path="/job_sheets" component={JobSheets} />
        <Route exact path="/my/password/edit" component={PasswordEdit} />
        <Route exact path="/my/profile" component={Profile} />
        <Redirect from="/" to="/job_sheets" />
      </Switch>
    </div>
  );
};

export default Home;
