import React, { Component } from "react";
import PropTypes from "prop-types";

import Loading from "./Loading.js";

export default class Netdata extends Component {
  static propTypes = {
    netdataDo: PropTypes.object,
    netdataHome: PropTypes.object
  };

  render() {
    const { netdataDo, netdataHome } = this.props;
    const data = [netdataDo, netdataHome];
    return (
      <div className="lg:w-1/5 px-4">
        <h2>Netdata</h2>
        {netdataDo === null && netdataHome === null ? (
          <Loading />
        ) : (
          <ul>
            {data.map(server => (
              <li className="box mb-8" key={server.uid}>
                <div>{server.mirrored_hosts[0]}</div>
                <div className="text-gray-600 text-xs">
                  {server.os_name} {server.os_version}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
