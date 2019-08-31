import React, { Component } from 'react';
import { distanceInWordsToNow } from 'date-fns';

import Service from '../Service.js';

export default class Seafile extends Component {
  state = {
    data: []
  };

  render = () => (
    <Service
      endpoint={process.env.REACT_APP_SEAFILE_ENDPOINT}
      refreshRate={5000}
      successFetch={({ data }) => this.setState({ data })}
    >
      <ul>
        {this.state.data.map(drive => (
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
    </Service>
  );
}
