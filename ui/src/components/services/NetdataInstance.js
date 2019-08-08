import React, { Component } from 'react';
import axios from 'axios';

import { ReactComponent as IconChevronDown } from '../../assets/svg/chevron-down-solid.svg';

export default class NetdataInstance extends Component {
  constructor(props) {
    super(props);
    this.colWidthRef = React.createRef();
  }

  state = {
    colWidth: 0,
    monitors: [
      {
        name: 'Usage (10min)',
        family: 'CPU',
        endpoint: 'system.cpu&alarm=10min_cpu_usage',
        value: null
      },
      {
        name: 'Used',
        family: 'RAM',
        endpoint: 'system.ram&alarm=ram_in_use',
        value: null
      },
      {
        name: 'Free',
        family: 'RAM',
        endpoint: 'mem.available&alarm=ram_available',
        value: null
      },
      {
        name: 'Total',
        family: 'Processes',
        endpoint: 'system.active_processes&alarm=active_processes_limit',
        value: null
      },
      {
        name: '/',
        family: 'Disks',
        endpoint: 'disk_space._&alarm=disk_space_usage',
        value: null
      },
      {
        name: '/media/vault',
        family: 'Disks',
        endpoint: 'disk_space._media_vault&alarm=disk_space_usage',
        value: null
      },
      {
        name: 'Sent',
        family: 'TCP',
        endpoint: 'ipv4.tcphandshake&alarm=1m_ipv4_tcp_resets_sent',
        value: null
      },
      {
        name: 'Received',
        family: 'TCP',
        endpoint: 'ipv4.tcphandshake&alarm=10s_ipv4_tcp_resets_received',
        value: null
      }
    ]
  };

  componentDidMount() {
    const { id } = this.props;
    const trigger = document.querySelector(`button[data-trigger='${id}']`);
    const target = document.querySelector(`[data-target='${id}']`);

    trigger.addEventListener('click', () => target.classList.toggle('hidden'));

    this.getData();

    setInterval(() => {
      this.getData();
    }, 2000);
  }

  getData() {
    this.state.monitors.map(async monitor => {
      let { endpoint, value } = monitor;
      const test = await axios.get(this.props.url + '/api/v1/badge.svg?chart=' + endpoint);
      const temp = document.createElement('div');
      temp.innerHTML = test.data;
      const html = temp.firstChild;
      value = html.querySelector('.bdge-lbl-val[fill]').innerHTML;
      this.setState({ [endpoint]: value });
    });
  }

  areaData(data) {
    let free = [],
      used = [],
      cached = [],
      buffers = [];

    data.forEach((point, index) => {
      free.push({ x: index, y: point[1] });
      used.push({ x: index, y: point[2] });
      cached.push({ x: index, y: point[3] });
      buffers.push({ x: index, y: point[4] });
    });
    return { free, used, cached, buffers };
  }

  lineData(data) {
    let arr = [];
    data.reverse().forEach((point, index) => arr.push({ x: index, y: point }));
    return arr;
  }

  average(points) {
    let total = 0;
    let _points = points.slice(0, 2);

    for (let i = 0; i < _points.length; i++) {
      total += _points[i];
    }

    return (total / _points.length).toFixed(1);
  }

  render() {
    const { data, id, url } = this.props;

    const CPU = this.state.monitors.filter(({ family }) => family === 'CPU');
    const RAM = this.state.monitors.filter(({ family }) => family === 'RAM');
    const Processes = this.state.monitors.filter(({ family }) => family === 'Processes');
    const Disks = this.state.monitors.filter(({ family }) => family === 'Disks');
    const TCP = this.state.monitors.filter(({ family }) => family === 'TCP');

    return (
      <li className="box mb-8" key={data.info.uid}>
        <a className="hover:underline" href={url} rel="noopener noreferrer" target="_blank">
          {data.info.mirrored_hosts[0]}
        </a>
        <div className="text-gray-600 dark:text-gray-500 text-xs" ref={this.colWidthRef}>
          {data.info.os_name} {data.info.os_version}
        </div>
        <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
          <div className="mb-2 text-sm">Alarms</div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Critical</span>
            <span className={data.info.alarms.critical ? 'text-red-600' : ''}>{data.info.alarms.critical}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Warning</span>
            <span className={data.info.alarms.warning ? 'text-yellow-600' : ''}>{data.info.alarms.warning}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
            <span>Normal</span>
            <span className="text-green-600">{data.info.alarms.normal}</span>
          </div>
          <div className="hidden target" data-target={id}>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div className="mb-2 text-sm">CPU</div>
              <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
                <span>Usage</span>
                <span className={this.average(data.cpu) > 75 ? 'text-red-600' : ''}>{this.average(data.cpu)}%</span>
              </div>
              {CPU.map(({ name, endpoint }) => (
                <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                  <span>{name}</span>
                  <span>{this.state[endpoint]}</span>
                </div>
              ))}
            </div>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div className="mb-2 text-sm">RAM</div>
              {RAM.map(({ name, endpoint }) => (
                <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                  <span>{name}</span>
                  <span>{this.state[endpoint]}</span>
                </div>
              ))}
            </div>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div>
                <div className="mb-2 text-sm">Processes</div>
                {Processes.map(({ name, endpoint }) => (
                  <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                    <span>{name}</span>
                    <span>{this.state[endpoint]}</span>
                  </div>
                ))}
              </div>
              <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
                <div className="mb-2 text-sm">Disks</div>
                {Disks.map(
                  ({ name, endpoint }) =>
                    this.state[endpoint] !== '-' && (
                      <div
                        className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full"
                        key={endpoint}
                      >
                        <span>{name}</span>
                        <span>{this.state[endpoint]}</span>
                      </div>
                    )
                )}
              </div>
              <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
                <div className="mb-2 text-sm">TCP</div>
                {TCP.map(({ name, endpoint }) => (
                  <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                    <span>{name}</span>
                    <span>{this.state[endpoint]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 mt-4 -m-4 cursor-pointer">
            <button
              className="px-4 py-2 justify-between flex w-full items-center focus:outline-none text-sm text-gray-600 dark:text-gray-500"
              data-trigger={id}
              title="Expand"
            >
              <span>
                <span className="more">More</span>
                <span className="less">Less</span>
                <span> info</span>
              </span>
              <IconChevronDown className="w-3" />
            </button>
          </div>
        </div>
      </li>
    );
  }
}
