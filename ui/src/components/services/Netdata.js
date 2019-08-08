import React, { Component } from 'react';

import api from '../../api.js';
import Loading from '../Loading.js';

import { ReactComponent as IconChevronDown } from '../../assets/svg/chevron-down-solid.svg';

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

    setInterval(() => {
      this.fetch();
    }, 2000);
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
            <NetdataInstance data={netdataDo} url={process.env.REACT_APP_NETDATA_DO_URL} id="do" />
          )}
          {!netdataHome ? (
            <Loading response={netdataHome} />
          ) : (
            <NetdataInstance data={netdataHome} url={process.env.REACT_APP_NETDATA_HOME_URL} id="home" />
          )}
        </ul>
      </div>
    );
  }
}

class NetdataInstance extends Component {
  componentDidMount() {
    const { id } = this.props;
    const trigger = document.querySelector(`button[data-trigger='${id}']`);
    const target = document.querySelector(`[data-target='${id}']`);

    trigger.addEventListener('click', () => {
      target.classList.toggle('hidden');
    });
  }

  average(points) {
    let total = 0;
    for (let i = 0; i < points.length; i++) {
      total += points[i];
    }
    return (total / points.length).toFixed(1);
  }

  render() {
    const { data, id, url } = this.props;

    return (
      <li className="box mb-8" key={data.info.uid}>
        <a className="hover:underline" href={url} rel="noopener noreferrer" target="_blank">
          {data.info.mirrored_hosts[0]}
        </a>
        <div className="text-gray-600 dark:text-gray-500 text-xs">
          {data.info.os_name} {data.info.os_version}
        </div>
        <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
          <div className="mb-2 text-sm">Alarms</div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Critical</span>
            <span className={data.info.alarms.critical && 'text-red-600'}>{data.info.alarms.critical}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Warning</span>
            <span className={data.info.alarms.warning && 'text-yellow-600'}>{data.info.alarms.warning}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Normal</span>
            <span className="text-green-600">{data.info.alarms.normal}</span>
          </div>
          <div className="hidden target" data-target={id}>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div className="mb-2 text-sm">Usage</div>
              <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
                <span>CPU</span>
                <span className={this.average(data.cpu.result) > 75 && 'text-red-600'}>
                  {this.average(data.cpu.result)}%
                </span>
              </div>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 mt-4 -m-4 cursor-pointer">
            <button
              className="px-4 py-2 justify-between flex w-full items-center focus:outline-none text-sm text-gray-600 dark:text-gray-500"
              data-trigger={id}
              title="Expand"
            >
              <span>More info</span>
              <IconChevronDown className="w-3" />
            </button>
          </div>
        </div>
      </li>
    );
  }
}
