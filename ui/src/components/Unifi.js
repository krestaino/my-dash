import React, { Component } from "react";
import PropTypes from "prop-types";
import { distanceInWordsToNow } from "date-fns";

import Loading from "./Loading.js";

export default class Unifi extends Component {
  static propTypes = {
    unifi: PropTypes.array
  };

  render() {
    const { unifi } = this.props;
    return (
      <div className="w-1/5 px-4">
        <h2>Unifi</h2>
        {unifi === null ? (
          <Loading />
        ) : (
          unifi.data.map(system => {
            return (
              <li className="box mb-8 flex flex-col" key={system.subsystem}>
                <div className="justify-between flex w-full">
                  <span className="uppercase">{system.subsystem}</span>
                  {system.num_user && (
                    <span className="text-gray-600 text-sm">
                      Clients: {system.num_user}
                    </span>
                  )}
                  {system.remote_user_num_active && (
                    <span className="text-gray-600 text-sm">
                      Clients: {system.remote_user_num_active}
                    </span>
                  )}
                </div>
                <div className="text-gray-600 text-xs">
                  {system.wan_ip && <div>IP: {system.wan_ip}</div>}
                  {system["tx_bytes-r"] && (
                    <div>Tx: {system["tx_bytes-r"]}</div>
                  )}
                  {system["rx_bytes-r"] && (
                    <div>Rx: {system["rx_bytes-r"]}</div>
                  )}
                  {system.remote_user_tx_bytes && (
                    <div>Tx: {system.remote_user_tx_bytes}</div>
                  )}
                  {system.remote_user_rx_bytes && (
                    <div>Rx: {system.remote_user_rx_bytes}</div>
                  )}
                </div>
              </li>
            );
          })
        )}
      </div>
    );
  }
}
