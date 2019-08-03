import React from "react";
import ReactDOM from "react-dom";

import Seafile from "./components/Seafile.js";
import Plex from "./components/Plex.js";
import Unifi from "./components/Unifi.js";
import Netdata from "./components/Netdata.js";
import UptimeRobot from "./components/UptimeRobot.js";
import ThemeToggle from "./components/ThemeToggle.js";
import Auth from "./components/Auth.js";

require("dotenv").config();

class App extends React.Component {
  render() {
    const API_KEY = localStorage.getItem("API_KEY");

    if (!API_KEY) {
      return <Auth />;
    }

    return (
      <div className="container flex flex-col lg:flex-row max-w-7xl mx-auto text-sm xl:text-base pt-8">
        <ThemeToggle />
        <UptimeRobot />
        <Unifi />
        <Netdata />
        <Seafile />
        <Plex />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
