import React, { Component } from "react";

import api from "../../api.js";
import Loading from "../Loading.js";

export default class Plex extends Component {
  state = {
    plex: null
  };

  async fetch() {
    const plex = await api(process.env.REACT_APP_PLEX_ENDPOINT);
    this.setState({ plex });
  }

  componentDidMount() {
    this.fetch();

    setInterval(() => {
      this.fetch();
    }, 5000);
  }

  displayTime(millisec) {
    const normalizeTime = time =>
      time.length === 1 ? time.padStart(2, "0") : time;

    let seconds = (millisec / 1000).toFixed(0);
    let minutes = Math.floor(parseInt(seconds) / 60).toString();
    let hours = "";

    if (parseInt(minutes) > 59) {
      hours = Math.floor(parseInt(minutes) / 60).toString();
      minutes = normalizeTime(
        (parseInt(minutes) - parseInt(hours) * 60).toString()
      );
    }

    if (hours !== "") {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  }

  render() {
    const { plex } = this.state;

    return (
      <div className="lg:w-1/5 px-4">
        <h2>Plex</h2>
        {!plex ? (
          <Loading response={plex} />
        ) : (
          <ul>
            {plex.MediaContainer.size > 0 ? (
              plex.MediaContainer.Metadata.map((stream, index) => (
                <li className="box mb-8" key={index}>
                  {stream.grandparentTitle ? (
                    <div>{stream.grandparentTitle}</div>
                  ) : (
                    <div>{stream.title}</div>
                  )}
                  <div className="text-gray-600 dark:text-gray-500 text-sm">
                    {stream.parentIndex && stream.index && (
                      <span className="pr-2">
                        S{stream.parentIndex} · E{stream.index} {stream.title}
                      </span>
                    )}
                  </div>
                  {(!stream.parentIndex || !stream.index) && (
                    <div className="text-gray-600 dark:text-gray-500 text-sm">
                      {stream.year}
                    </div>
                  )}
                  <div className="text-gray-600 dark:text-gray-500 text-sm">
                    {this.displayTime(stream.duration, "H mm")}
                  </div>
                  <div className="flex items-center mt-4 -m-4 p-4 relative border-t dark:border-gray-700">
                    <img
                      alt={stream.User.title}
                      className="rounded-full h-8 w-8 mr-4"
                      src={stream.User.thumb}
                    />
                    <div className="text-gray-600 dark:text-gray-500 text-sm">
                      <div>{stream.User.title}</div>
                      <div>
                        {stream.Player.device} · {stream.Player.platform}
                      </div>
                    </div>
                    <div
                      className="absolute bg-blue-500 h-1 inset-x-0 top-0 -mt-1"
                      style={{
                        width: (stream.viewOffset / stream.duration) * 100 + "%"
                      }}
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="box text-center text-gray-600 dark:text-gray-500 text-sm mb-8">
                No active streams
              </div>
            )}
          </ul>
        )}
      </div>
    );
  }
}
