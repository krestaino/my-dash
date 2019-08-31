import React from 'react';
import ReactDOM from 'react-dom';

import UptimeRobot from './components/services/UptimeRobot.js';
import Unifi from './components/services/Unifi.js';
import NetdataDo from './components/services/NetdataDo.js';
import NetdataHome from './components/services/NetdataHome.js';
import Seafile from './components/services/Seafile.js';
import Plex from './components/services/Plex.js';

import Auth from './components/Auth.js';
import ThemeToggle from './components/ThemeToggle.js';

class App extends React.Component {
  render = () =>
    !window.localStorage.getItem('API_KEY') ? (
      <div className="container mx-auto max-w-lg py-8 px-4">
        <h1>My Dash</h1>
        <Auth />
        <ThemeToggle />
      </div>
    ) : (
      <div className="flex flex-col lg:flex-row max-w-full mx-auto text-sm xl:text-base pt-8">
        <ThemeToggle />
        <div className="lg:w-1/5 px-4">
          <h2>Uptime Robot</h2>
          <UptimeRobot />
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Unifi</h2>
          <Unifi />
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Netdata</h2>
          <ul>
            <NetdataDo />
            <NetdataHome />
          </ul>
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Seafile</h2>
          <Seafile />
        </div>
        <div className="lg:w-1/5 px-4">
          <h2>Plex</h2>
          <Plex />
        </div>
      </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
