import React from "react";
import axios from "axios";

export default class App extends React.Component {
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

  componentDidMount() {
    axios
      .all([
        this.getSeafile(),
        this.getPlex(),
        this.getUnifi(),
        this.getNetdataDo(),
        this.getNetdataHome()
      ])
      .then(
        axios.spread((seafile, plex, unifi, netdataDo, netdataHome) => {
          console.log(seafile.data);
          console.log(plex.data);
          console.log(unifi.data);
          console.log(netdataDo.data);
          console.log(netdataHome.data);
        })
      );
  }

  render() {
    return <div className="App" />;
  }
}
