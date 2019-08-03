import React, { Component } from "react";
import { distanceInWordsToNow } from "date-fns";

import api from "../api.js";
import Loading from "./Loading.js";

export default class Seafile extends Component {
  state = {
    seafile: null
  };

  async fetch() {
    const seafile = await api(process.env.REACT_APP_SEAFILE_ENDPOINT);
    this.setState({ seafile });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { seafile } = this.state;

    return (
      <div className="lg:w-1/5 px-4">
        <h2>Seafile</h2>
        {!seafile ? (
          <Loading response={seafile} />
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
                  <span className="text-gray-600 dark:text-gray-500 text-sm">
                    {drive.size_formatted}
                  </span>
                </div>
                <div className="text-gray-600 dark:text-gray-500 text-xs">
                  <span>Last modified: </span>
                  <span>
                    {distanceInWordsToNow(new Date(drive.mtime * 1000))}
                  </span>
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
