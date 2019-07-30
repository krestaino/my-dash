import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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
    return (
      <div className="App">
        <ul>
          <li>
            <pre>{JSON.stringify(this.state.seafile)}</pre>
          </li>
          <li>
            <pre>{JSON.stringify(this.state.plex)}</pre>
          </li>
          <li>
            <pre>{JSON.stringify(this.state.unifi)}</pre>
          </li>
          <li>
            <pre>{JSON.stringify(this.state.netdataDo)}</pre>
          </li>
          <li>
            <pre>{JSON.stringify(this.state.netdataHome)}</pre>
          </li>
          <li>
            <pre>{JSON.stringify(this.state.uptimeRobot)}</pre>
          </li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
