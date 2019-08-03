import React, { Component } from "react";

import api from "../../api.js";
import Loading from "../Loading.js";

export default class Netdata extends Component {
  state = {
    netdataDo: null,
    netdataHome: null
  };

  async fetch() {
    const netdataDo = await api(process.env.REACT_APP_NETDATA_DO_ENDPOINT);
    const netdataHome = await api(process.env.REACT_APP_NETDATA_HOME_ENDPOINT);
    this.setState({ netdataDo, netdataHome });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { netdataDo, netdataHome } = this.state;

    return (
      <div className="lg:w-1/5 px-4">
        <h2>Netdata</h2>
        <ul>
          {!netdataDo ? (
            <Loading response={netdataDo} />
          ) : (
            <NetdataInstance server={netdataDo} />
          )}
          {!netdataHome ? (
            <Loading response={netdataHome} />
          ) : (
            <NetdataInstance server={netdataHome} />
          )}
        </ul>
      </div>
    );
  }
}

class NetdataInstance extends Component {
  render() {
    const server = this.props.server;

    return (
      <li className="box mb-8" key={server.uid}>
        <div>{server.mirrored_hosts[0]}</div>
        <div className="text-gray-600 dark:text-gray-500 text-xs">
          {server.os_name} {server.os_version}
        </div>
        <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
          <div className="mb-2 text-sm">Alarms</div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Critical</span>
            <span className={server.alarms.critical && "text-red-600"}>
              {server.alarms.critical}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Warning</span>
            <span className={server.alarms.warning && "text-yellow-600"}>
              {server.alarms.warning}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Normal</span>
            <span className="text-green-600">{server.alarms.normal}</span>
          </div>
        </div>
      </li>
    );
  }
}
