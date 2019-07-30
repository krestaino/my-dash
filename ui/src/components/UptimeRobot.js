import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Loading from "./Loading.js";
import { ReactComponent as IconError } from "../assets/exclamation-triangle-solid.svg";
import { ReactComponent as IconSuccess } from "../assets/check-circle-solid.svg";

export default class UptimeRobot extends Component {
  static propTypes = {
    uptimeRobot: PropTypes.object
  };

  formatUrl(url) {
    return url.startsWith("http") ? url : "//" + url;
  }

  render() {
    const { uptimeRobot } = this.props;

    return (
      <div className="p-2 relative inline-block">
        <h2 className="text-xl">Uptime Robot</h2>
        {uptimeRobot === null ? (
          <Loading />
        ) : (
          <ul>
            {uptimeRobot.monitors.map(monitor => {
              return (
                <li className="flex items-center" key={monitor.friendly_name}>
                  <div
                    className={classNames({
                      "mr-2": true,
                      "text-green-600": monitor.status === 2,
                      "text-red-600": monitor.status !== 2
                    })}
                  >
                    {monitor.status === 2 ? <IconSuccess /> : <IconError />}
                  </div>
                  <a
                    href={this.formatUrl(monitor.url)}
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
