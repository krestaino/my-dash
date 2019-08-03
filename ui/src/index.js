import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Seafile from "./components/Seafile.js";
import Plex from "./components/Plex.js";
import Unifi from "./components/Unifi.js";
import Netdata from "./components/Netdata.js";
import UptimeRobot from "./components/UptimeRobot.js";

import { ReactComponent as IconSun } from "./assets/svg/sun-solid.svg";
import { ReactComponent as IconMoon } from "./assets/svg/moon-solid.svg";

require("dotenv").config();

class App extends React.Component {
  state = {
    API_KEY: "",
    seafile: null,
    plex: null,
    unifi: null,
    netdataDo: null,
    netdataHome: null,
    uptimeRobot: null
  };

  handleChange = event => {
    this.setState({ API_KEY: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem("API_KEY", this.state.API_KEY);
    window.location.reload();
  };

  fetch() {
    const endpoints = [
      process.env.REACT_APP_SEAFILE_ENDPOINT,
      process.env.REACT_APP_PLEX_ENDPOINT,
      process.env.REACT_APP_UNIFI_ENDPOINT,
      process.env.REACT_APP_NETDATA_DO_ENDPOINT,
      process.env.REACT_APP_NETDATA_HOME_ENDPOINT,
      process.env.REACT_APP_UPTIME_ROBOT_ENDPOINT
    ];

    axios
      .all(
        endpoints.map(endpoint =>
          axios.get(endpoint, {
            params: { API_KEY: localStorage.getItem("API_KEY") }
          })
        )
      )
      .then(
        axios.spread(
          (seafile, plex, unifi, netdataDo, netdataHome, uptimeRobot) => {
            this.setState({
              seafile: seafile.data,
              plex: plex.data,
              unifi: unifi.data,
              netdataDo: netdataDo.data,
              netdataHome: netdataHome.data,
              uptimeRobot: uptimeRobot.data
            });
          }
        )
      )
      .catch(() => {
        localStorage.removeItem("API_KEY");
        window.location.reload();
      });
  }

  componentDidMount() {
    if (localStorage.getItem("API_KEY")) {
      this.fetch();

      if (process.env.NODE_ENV !== "development") {
        setInterval(() => {
          this.fetch();
        }, 5000);
      }
    }
  }

  render() {
    const API_KEY = localStorage.getItem("API_KEY");

    if (!API_KEY) {
      return (
        <form
          className="container mx-auto max-w-lg"
          onSubmit={this.handleSubmit}
        >
          <div className="box flex mt-8">
            <label className="text-gray-600 text-sm flex flex-1 items-center">
              <input
                autoFocus
                className="py-1 px-2 flex flex-1 rounded border dark:border-gray-600 focus:border-gray-600 outline-none bg-transparent"
                type="text"
                value={this.state.API_KEY}
                onChange={this.handleChange}
                placeholder="API Key"
              />
            </label>
            <input
              className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm py-1 px-6 rounded ml-2 cursor-pointer"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      );
    }

    const {
      seafile,
      plex,
      unifi,
      netdataDo,
      netdataHome,
      uptimeRobot
    } = this.state;

    return (
      <div className="container flex flex-col lg:flex-row max-w-7xl mx-auto text-sm xl:text-base pt-8">
        <button
          className="fixed top-0 right-0 m-4 focus:outline-none"
          title="Toggle theme"
          onClick={() =>
            document.querySelector("html").classList.toggle("mode-dark")
          }
        >
          <IconSun className="w-4 dark:hidden" />
          <IconMoon className="w-4 hidden dark:block" />
        </button>
        <UptimeRobot uptimeRobot={uptimeRobot} />
        <Unifi unifi={unifi} />
        <Netdata netdataDo={netdataDo} netdataHome={netdataHome} />
        <Seafile seafile={seafile} />
        <Plex plex={plex} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
