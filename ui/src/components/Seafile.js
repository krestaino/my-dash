import React, { Component } from "react";
import PropTypes from "prop-types";
import { distanceInWordsToNow } from "date-fns";

import Loading from "./Loading.js";

export default class Seafile extends Component {
  static propTypes = {
    seafile: PropTypes.array
  };

  render() {
    const { seafile } = this.props;
    return (
      <div className="w-1/5 px-4">
        <h2>Seafile</h2>
        {seafile === null ? (
          <Loading />
        ) : (
          seafile.map(drive => {
            return (
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
                  <span className="text-gray-600 text-sm">
                    {drive.size_formatted}
                  </span>
                </div>
                <div className="text-gray-600 text-xs">
                  <span>Last modified: </span>
                  <span>{distanceInWordsToNow(new Date(drive.mtime * 1000))}</span>
                  <span> ago</span>
                </div>
              </li>
            );
          })
        )}
      </div>
    );
  }
}
