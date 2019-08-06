import React, { Component } from 'react';
import classNames from 'classnames';

import api from '../../api.js';
import Loading from '../Loading.js';

import { ReactComponent as IconError } from '../../assets/svg/exclamation-triangle-solid.svg';
import { ReactComponent as IconSuccess } from '../../assets/svg/check-circle-solid.svg';

export default class UptimeRobot extends Component {
  state = {
    uptimeRobot: null
  };

  async fetch() {
    const uptimeRobot = await api(process.env.REACT_APP_UPTIME_ROBOT_ENDPOINT);
    this.setState({ uptimeRobot });
  }

  componentDidMount() {
    this.fetch();

    setInterval(() => {
      this.fetch();
    }, 30000);
  }

  render() {
    const { uptimeRobot } = this.state;

    return (
      <div className="lg:w-1/5 px-4">
        <h2>Uptime Robot</h2>
        {!uptimeRobot ? (
          <Loading response={uptimeRobot} />
        ) : (
          <ul className="box mb-8 flex lg:flex-col flex-wrap">
            {uptimeRobot.monitors.map(monitor => {
              return (
                <li className="flex items-center w-1/2 lg:w-full mb-1" key={monitor.friendly_name}>
                  <div
                    className={classNames({
                      'mr-2': true,
                      'text-green-600': monitor.status === 2,
                      'text-red-600': monitor.status !== 2
                    })}
                  >
                    {monitor.status === 2 ? <IconSuccess className="w-4" /> : <IconError className="w-4" />}
                  </div>
                  <a
                    className="hover:underline"
                    href={`https://uptimerobot.com/dashboard#${monitor.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {monitor.friendly_name}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
