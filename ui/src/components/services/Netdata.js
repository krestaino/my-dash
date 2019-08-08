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

    document.querySelector(`button[data-trigger='${id}']`).addEventListener('click', () => {
      document.querySelector(`[data-target='${id}']`).classList.toggle('hidden');
    });
  }

  render() {
    const { data, id, url } = this.props;

    return (
      <li className="box mb-8" key={data.uid}>
        <a className="hover:underline" href={url} rel="noopener noreferrer" target="_blank">
          {data.mirrored_hosts[0]}
        </a>
        <div className="text-gray-600 dark:text-gray-500 text-xs">
          {data.os_name} {data.os_version}
        </div>
        <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
          <div className="mb-2 text-sm">Alarms</div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Critical</span>
            <span className={data.alarms.critical && 'text-red-600'}>{data.alarms.critical}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Warning</span>
            <span className={data.alarms.warning && 'text-yellow-600'}>{data.alarms.warning}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Normal</span>
            <span className="text-green-600">{data.alarms.normal}</span>
          </div>
          <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4 hidden target" data-target={id}>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus lectus id velit scelerisque, vel
              mattis velit fringilla. Integer et porttitor sem. Donec nulla neque, ullamcorper at dui ac, iaculis
              malesuada lacus. In bibendum non purus et molestie. Pellentesque convallis sollicitudin elit, ac mattis
              lorem volutpat vel. Aenean id lacus quis ex laoreet fringilla eu quis nunc. Vivamus non accumsan felis, ac
              ullamcorper nisl.
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
