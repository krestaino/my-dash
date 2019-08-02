import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Loading from "./Loading.js";
import blur from "../blur.js";
import { ReactComponent as IconError } from "../assets/svg/exclamation-triangle-solid.svg";
import { ReactComponent as IconSuccess } from "../assets/svg/check-circle-solid.svg";

export default class UptimeRobot extends Component {
  static propTypes = {
    uptimeRobot: PropTypes.array
  };

  render() {
    const { uptimeRobot } = this.props;

    return (
      <div className="lg:w-1/5 px-4">
        <h2>Uptime Robot</h2>
        {uptimeRobot === null ? (
          <Loading />
        ) : (
          <ul className="box mb-8">
            {uptimeRobot.map(monitor => {
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
                    className="hover:underline"
                    href={`https://uptimerobot.com/dashboard#${monitor.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={blur}
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
