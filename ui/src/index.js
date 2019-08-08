import React from 'react';
import ReactDOM from 'react-dom';

import UptimeRobot from './components/services/UptimeRobot.js';
import Unifi from './components/services/Unifi.js';
import Netdata from './components/services/Netdata.js';
import Seafile from './components/services/Seafile.js';
import Plex from './components/services/Plex.js';

import Auth from './components/Auth.js';

class App extends React.Component {
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
      <div className="container flex flex-col lg:flex-row max-w-7xl mx-auto text-sm xl:text-base pt-8">
        <UptimeRobot />
        <Unifi />
        <Netdata />
        <Seafile />
        <Plex />
        <ThemeToggle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
