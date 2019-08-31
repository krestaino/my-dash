import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as IconError } from '../../assets/svg/exclamation-triangle-solid.svg';
import { ReactComponent as IconSuccess } from '../../assets/svg/check-circle-solid.svg';
import { ReactComponent as IconPaused } from '../../assets/svg/circle-solid.svg';

const constants = {
  STATUS_DOWN: 9,
  STATUS_UP: 2,
  STATUS_PAUSED: 0
};

export default class UptimeRobot extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      monitors: PropTypes.arrayOf(
        PropTypes.shape({
          friendly_name: PropTypes.string,
          status: PropTypes.number,
          url: PropTypes.string
        })
      )
    })
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
    <ul className="box mb-8 flex lg:flex-col flex-wrap">
      {this.props.data.monitors.map(({ friendly_name, status, url }) => (
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
  );
}
