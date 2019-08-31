import React, { Component } from 'react';
import classNames from 'classnames';

import Service from '../Service.js';

import { ReactComponent as IconError } from '../../assets/svg/exclamation-triangle-solid.svg';
import { ReactComponent as IconSuccess } from '../../assets/svg/check-circle-solid.svg';
import { ReactComponent as IconPaused } from '../../assets/svg/circle-solid.svg';

const constants = {
  STATUS_DOWN: 9,
  STATUS_UP: 2,
  STATUS_PAUSED: 0
};

export default class UptimeRobot extends Component {
  state = {
    data: []
  };

  getStatusIcon = status => {
    if (status === constants.STATUS_UP) {
      return <IconSuccess className="w-4" />;
    } else if (status === constants.STATUS_DOWN) {
      return <IconError className="w-4" />;
    } else {
      return <IconPaused className="w-4" />;
    }
  };

  getStatusText = status => {
    if (status === constants.STATUS_UP) {
      return 'Up';
    } else if (status === constants.STATUS_DOWN) {
      return 'Down';
    } else {
      return 'Paused';
    }
  };

  render = () => (
    <Service
      endpoint={process.env.REACT_APP_UPTIME_ROBOT_ENDPOINT}
      refreshRate={30000}
      successFetch={({ data }) => this.setState({ data: data.monitors })}
    >
      <ul className="box mb-8 flex lg:flex-col flex-wrap">
        {this.state.data.map(({ friendly_name, status, url }) => (
          <li className="flex items-center w-1/2 lg:w-full mb-1" key={friendly_name}>
            <div
              className={classNames({
                'mr-2': true,
                'text-gray-600': status === constants.STATUS_PAUSED,
                'text-green-600': status === constants.STATUS_UP,
                'text-red-600': status === constants.STATUS_DOWN
              })}
              title={this.getStatusText(status)}
            >
              {this.getStatusIcon(status)}
            </div>
            <a className="hover:underline" href={url} rel="noopener noreferrer" target="_blank">
              {friendly_name}
            </a>
          </li>
        ))}
      </ul>
    </Service>
  );
}
