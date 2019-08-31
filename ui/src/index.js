import React from 'react';
import ReactDOM from 'react-dom';

import UptimeRobot from './components/services/UptimeRobot.js';
import Unifi from './components/services/Unifi.js';
import Netdata from './components/services/Netdata.js';
import Seafile from './components/services/Seafile.js';
import Plex from './components/services/Plex.js';

import Auth from './components/Auth.js';
import Service from './components/Service.js';
import ThemeToggle from './components/ThemeToggle.js';

class App extends React.Component {
  state = {
    uptimeRobot: undefined,
    unifi: undefined,
    netdataDo: undefined,
    netdataHome: undefined,
    seafile: undefined,
    plex: undefined
  };

  render() {
    if (!window.localStorage.getItem('API_KEY')) {
      return (
        <div className="container mx-auto max-w-lg py-8 px-4">
          <h1>My Dash</h1>
          <Auth />
          <ThemeToggle />
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row max-w-full mx-auto text-sm xl:text-base pt-8">
        <ThemeToggle />
        <div className="lg:w-1/5 px-4">
          <h2>Uptime Robot</h2>
          <Service
            endpoint={process.env.REACT_APP_UPTIME_ROBOT_ENDPOINT}
            refreshRate={30000}
            successFetch={({ data }) => this.setState({ uptimeRobot: data })}
          >
            <UptimeRobot data={this.state.uptimeRobot} />
          </Service>
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Unifi</h2>
          <Service
            endpoint={process.env.REACT_APP_UNIFI_ENDPOINT}
            refreshRate={5000}
            successFetch={({ data }) => this.setState({ unifi: data })}
          >
            <Unifi data={this.state.unifi} />
          </Service>
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Netdata</h2>
          <ul>
            <Service
              endpoint={process.env.REACT_APP_NETDATA_DO_ENDPOINT}
              refreshRate={5000}
              successFetch={({ data }) => this.setState({ netdataDo: data })}
            >
              <Netdata data={this.state.netdataDo} url={process.env.REACT_APP_NETDATA_DO_URL} />
            </Service>
            <Service
              endpoint={process.env.REACT_APP_NETDATA_HOME_ENDPOINT}
              refreshRate={5000}
              successFetch={({ data }) => this.setState({ netdataHome: data })}
            >
              <Netdata data={this.state.netdataHome} url={process.env.REACT_APP_NETDATA_HOME_URL} />
            </Service>
          </ul>
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Seafile</h2>
          <Service
            endpoint={process.env.REACT_APP_SEAFILE_ENDPOINT}
            refreshRate={5000}
            successFetch={({ data }) => this.setState({ seafile: data })}
          >
            <Seafile data={this.state.seafile} />
          </Service>
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Plex</h2>
          <Service
            endpoint={process.env.REACT_APP_PLEX_ENDPOINT}
            refreshRate={5000}
            successFetch={({ data }) => this.setState({ plex: data })}
          >
            <Plex data={this.state.plex} />
          </Service>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
