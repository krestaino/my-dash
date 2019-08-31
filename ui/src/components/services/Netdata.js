import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { ReactComponent as IconChevronDown } from '../../assets/svg/chevron-down-solid.svg';

export default class Netdata extends Component {
  static propTypes = {
    data: PropTypes.shape({
      info: PropTypes.shape({
        mirrored_hosts: PropTypes.arrayOf(PropTypes.string),
        os_name: PropTypes.string,
        os_version: PropTypes.string,
        alarms: PropTypes.shape({
          critical: PropTypes.number,
          warning: PropTypes.number,
          normal: PropTypes.number
        }),
        uid: PropTypes.string
      })
    }),
    url: PropTypes.string
  };

  state = {
    colWidth: 0,
    monitors: [
      {
        name: 'Usage',
        family: 'CPU',
        endpoint: 'system.cpu',
        value: undefined
      },
      {
        name: 'Usage (10min)',
        family: 'CPU',
        endpoint: 'system.cpu&alarm=10min_cpu_usage',
        value: undefined
      },
      {
        name: 'Used',
        family: 'RAM',
        endpoint: 'system.ram&alarm=ram_in_use',
        value: undefined
      },
      {
        name: 'Total',
        family: 'Processes',
        endpoint: 'system.active_processes&alarm=active_processes_limit',
        value: undefined
      },
      {
        name: '/',
        family: 'Disks',
        endpoint: 'disk_space._&alarm=disk_space_usage',
        value: undefined
      },
      {
        name: '/media/vault',
        family: 'Disks',
        endpoint: 'disk_space._media_vault&alarm=disk_space_usage',
        value: undefined
      }
    ]
  };

  componentDidMount = () => {
    const id = this.props.data.info.uid;
    const trigger = document.querySelector(`button[data-trigger='${id}']`);
    const target = document.querySelector(`[data-target='${id}']`);

    trigger.addEventListener('click', () => target.classList.toggle('hidden'));

    this.getData();

    setInterval(() => {
      this.getData();
    }, 2000);
  };

  getData = () => {
    this.state.monitors.map(async monitor => {
      let { endpoint, value } = monitor;
      const svg = await axios.get(this.props.url + '/api/v1/badge.svg?chart=' + endpoint + '&units=null');
      const temp = document.createElement('div');
      temp.innerHTML = svg.data;
      const html = temp.firstChild;
      value = html.querySelector('.bdge-lbl-val').innerHTML;
      this.setState({ [endpoint]: value });
    });
  };

  colorValue = ({ value, warning, critical }) => {
    if (value >= critical) {
      return 'text-red-600';
    } else if (value >= warning) {
      return 'text-yellow-600';
    } else {
      return 'text-green-600';
    }
  };

  render() {
    const { data, url } = this.props;

    const cpu = this.state.monitors.filter(({ family }) => family === 'CPU');
    const ram = this.state.monitors.filter(({ family }) => family === 'RAM');
    const processes = this.state.monitors.filter(({ family }) => family === 'Processes');
    const disks = this.state.monitors.filter(({ family }) => family === 'Disks');

    return (
      <li className="box mb-8">
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
          <div className="hidden target" data-target={data.info.uid}>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div className="mb-2 text-sm">CPU</div>
              {cpu.map(({ name, endpoint }) => (
                <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                  <span>{name}</span>
                  <span
                    className={this.colorValue({
                      value: this.state[endpoint],
                      warning: 75,
                      critical: 85
                    })}
                  >
                    {this.state[endpoint]}%
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div className="mb-2 text-sm">RAM</div>
              {ram.map(({ name, endpoint }) => (
                <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                  <span>{name}</span>
                  <span
                    className={this.colorValue({
                      value: this.state[endpoint],
                      warning: 80,
                      critical: 90
                    })}
                  >
                    {this.state[endpoint]}%
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
              <div>
                <div className="mb-2 text-sm">Processes</div>
                {processes.map(({ name, endpoint }) => (
                  <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full" key={endpoint}>
                    <span>{name}</span>
                    <span
                      className={this.colorValue({
                        value: this.state[endpoint],
                        warning: 25000,
                        critical: 28000
                      })}
                    >
                      {this.state[endpoint]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t dark:border-gray-700 mt-4 -m-4 p-4">
                <div className="mb-2 text-sm">Disks</div>
                {disks.map(
                  ({ name, endpoint }) =>
                    this.state[endpoint] !== '-' && (
                      <div
                        className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full"
                        key={endpoint}
                      >
                        <span>{name}</span>
                        <span
                          className={this.colorValue({
                            value: this.state[endpoint],
                            warning: 80,
                            critical: 90
                          })}
                        >
                          {this.state[endpoint]}%
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 mt-4 -m-4 cursor-pointer">
            <button
              className="px-4 py-2 justify-between flex w-full items-center focus:outline-none text-sm text-gray-600 dark:text-gray-500"
              data-trigger={data.info.uid}
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
