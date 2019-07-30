import React from "react";
import axios from "axios";

export default class App extends React.Component {
  state = {
    seafile: null,
    plex: null,
    unifi: null,
    netdataDo: null,
    netdataHome: null,
    uptimeRobot: null
  };

  getSeafile() {
    return axios.get("//localhost:4000/seafile");
  }

  getPlex() {
    return axios.get("//localhost:4000/plex");
  }

  getUnifi() {
    return axios.get("//localhost:4000/unifi");
  }

  getNetdataDo() {
    return axios.get("//localhost:4000/netdata-do");
  }

  getNetdataHome() {
    return axios.get("//localhost:4000/netdata-home");
  }

  getUptimeRobot() {
    return axios.get("//localhost:4000/uptime-robot");
  }

  componentDidMount() {
    axios
      .all([
        this.getSeafile(),
        this.getPlex(),
        this.getUnifi(),
        this.getNetdataDo(),
        this.getNetdataHome(),
        this.getUptimeRobot()
      ])
      .then(
        axios.spread(
          (seafile, plex, unifi, netdataDo, netdataHome, uptimeRobot) => {
            this.setState({ seafile: seafile.data });
            this.setState({ plex: plex.data });
            this.setState({ unifi: unifi.data });
            this.setState({ netdataDo: netdataDo.data });
            this.setState({ netdataHome: netdataHome.data });
            this.setState({ uptimeRobot: uptimeRobot.data });
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
