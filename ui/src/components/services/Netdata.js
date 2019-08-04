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
            <NetdataInstance
              data={netdataDo}
              url={process.env.REACT_APP_NETDATA_DO_URL}
            />
          )}
          {!netdataHome ? (
            <Loading response={netdataHome} />
          ) : (
            <NetdataInstance
              data={netdataHome}
              url={process.env.REACT_APP_NETDATA_HOME_URL}
            />
          )}
        </ul>
      </div>
    );
  }
}

class NetdataInstance extends Component {
  render() {
    const { data, url } = this.props;

    return (
      <li className="box mb-8" key={data.uid}>
        <a
          className="hover:underline"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.mirrored_hosts[0]}
        </a>
        <div className="text-gray-600 dark:text-gray-500 text-xs">
          {data.os_name} {data.os_version}
        </div>
        <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
          <div className="mb-2 text-sm">Alarms</div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Critical</span>
            <span className={data.alarms.critical && "text-red-600"}>
              {data.alarms.critical}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Warning</span>
            <span className={data.alarms.warning && "text-yellow-600"}>
              {data.alarms.warning}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Normal</span>
            <span className="text-green-600">{data.alarms.normal}</span>
          </div>
        </div>
      </li>
    );
  }
}
