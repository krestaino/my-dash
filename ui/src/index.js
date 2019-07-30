import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Seafile from "./components/Seafile.js";
import Plex from "./components/Plex.js";
import Unifi from "./components/Unifi.js";
import NetdataDo from "./components/NetdataDo.js";
import NetdataHome from "./components/NetdataHome.js";
import UptimeRobot from "./components/UptimeRobot.js";

class App extends React.Component {
  state = {
    seafile: null,
    plex: null,
    unifi: null,
    netdataDo: null,
    netdataHome: null,
    uptimeRobot: null
  };

  fetch() {
    const endpoints = [
      "//localhost:4000/seafile",
      "//localhost:4000/plex",
      "//localhost:4000/unifi",
      "//localhost:4000/netdata-do",
      "//localhost:4000/netdata-home",
      "//localhost:4000/uptime-robot"
    ];

    return endpoints.map(endpoint => axios.get(endpoint));
  }

  componentDidMount() {
    axios.all(this.fetch()).then(
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
    );
  }

  render() {
    const {
      seafile,
      plex,
      unifi,
      netdataDo,
      netdataHome,
      uptimeRobot
    } = this.state;
    return (
      <div className="App">
        <Seafile seafile={seafile} />
        <Plex plex={plex} />
        <Unifi unifi={unifi} />
        <NetdataDo netdataDo={netdataDo} />
        <NetdataHome netdataHome={netdataHome} />
        <UptimeRobot uptimeRobot={uptimeRobot} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
