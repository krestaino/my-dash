import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';

export default class Seafile extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        size_formatted: PropTypes.string,
        mtime: PropTypes.number
      })
    )
  };

  render = () => (
    <ul>
      {this.props.data.map(drive => (
        <li className="box mb-8 flex flex-col" key={drive.id}>
          <div className="justify-between flex w-full">
            <a
              className="hover:underline"
              href={`https://seafile.kmr.io/library/${drive.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {drive.name}
            </a>
            <span className="text-gray-600 dark:text-gray-500 text-sm">{drive.size_formatted}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-xs">
            <span>Last modified: </span>
            <span>{distanceInWordsToNow(new Date(drive.mtime * 1000))}</span>
            <span> ago</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
