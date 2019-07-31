import React, { Component } from "react";
import PropTypes from "prop-types";

import Loading from "./Loading.js";

export default class Seafile extends Component {
  static propTypes = {
    seafile: PropTypes.array
  };

  render() {
    const { seafile } = this.props;
    return (
      <div className="w-1/5 mx-4">
        <h2>Seafile</h2>
        {seafile === null ? (
          <Loading />
        ) : (
          seafile.map(drive => {
            return (
              <li className="box mb-8 justify-between flex" key={drive.id}>
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
              </li>
            );
          })
        )}
      </div>
    );
  }
}
