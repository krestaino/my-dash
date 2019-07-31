import React, { Component } from "react";
import PropTypes from "prop-types";

import Loading from "./Loading.js";

export default class Plex extends Component {
  static propTypes = {
    plex: PropTypes.object
  };

  displayTime(millisec) {
    const normalizeTime = time =>
      time.length === 1 ? time.padStart(2, "0") : time;

    let seconds = (millisec / 1000).toFixed(0);
    let minutes = Math.floor(parseInt(seconds) / 60).toString();
    let hours = "";

    if (parseInt(minutes) > 59) {
      hours = normalizeTime(Math.floor(parseInt(minutes) / 60).toString());
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
    const { plex } = this.props;

    return (
      <div className="lg:w-1/5 px-4 mb-8">
        <h2>Plex</h2>
        {plex === null ? (
          <Loading />
        ) : (
          <ul>
            {plex.MediaContainer.size > 0 ? (
              plex.MediaContainer.Metadata.map((stream, index) => {
                return (
                  <li className="box mb-8" key={index}>
                    {stream.grandparentTitle ? (
                      <div>{stream.grandparentTitle}</div>
                    ) : (
                      <div>{stream.title}</div>
                    )}
                    <div className="text-gray-600 text-sm">
                      {stream.parentIndex && stream.index && (
                        <span className="pr-2">
                          S{stream.parentIndex} · E{stream.index} {stream.title}
                        </span>
                      )}
                    </div>
                    {(!stream.parentIndex || !stream.index) && (
                      <div className="text-gray-600 text-sm">{stream.year}</div>
                    )}
                    <div className="text-gray-600 text-sm">
                      {this.displayTime(stream.duration, "H mm")}
                    </div>
                    <div className="flex items-center mt-4 bg-gray-200 -m-4 p-4 relative">
                      <img
                        alt={stream.User.title}
                        className="rounded-full h-8 w-8 mr-4"
                        src={stream.User.thumb}
                      />
                      <div className="text-gray-600 text-sm">
                        <div>{stream.User.title}</div>
                        <div>
                          {stream.Player.device} · {stream.Player.platform}
                        </div>
                      </div>
                      <div
                        className="absolute bg-blue-500 h-1 inset-x-0 top-0"
                        style={{
                          width:
                            (stream.viewOffset / stream.duration) * 100 + "%"
                        }}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="box text-center text-gray-600 text-sm">
                No active streams
              </div>
            )}
          </ul>
        )}
      </div>
    );
  }
}
