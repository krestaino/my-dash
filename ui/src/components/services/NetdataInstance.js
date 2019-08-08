import React, { Component } from 'react';
import { AreaSeries, LineSeries, XYPlot } from 'react-vis';
import 'react-vis/dist/style.css';

import { ReactComponent as IconChevronDown } from '../../assets/svg/chevron-down-solid.svg';

export default class NetdataInstance extends Component {
  constructor(props) {
    super(props);
    this.colWidthRef = React.createRef();
  }

  state = {
    colWidth: 0
  };

  componentDidMount() {
    const { id } = this.props;
    const trigger = document.querySelector(`button[data-trigger='${id}']`);
    const target = document.querySelector(`[data-target='${id}']`);

    trigger.addEventListener('click', () => target.classList.toggle('hidden'));
    window.addEventListener('resize', () => this.setColWidth());
    this.setColWidth();
  }

  setColWidth() {
    this.setState({ colWidth: this.colWidthRef.current.offsetWidth });
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
              <div className="mb-2 text-sm">Usage</div>
              <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full">
                <span>CPU</span>
                <span className={this.average(data.cpu) > 75 ? 'text-red-600' : ''}>{this.average(data.cpu)}%</span>
              </div>
              <div className="mt-1">
                <XYPlot height={30} margin={0} yDomain={[0, 100]} width={this.state.colWidth}>
                  <LineSeries data={this.lineData(data.cpu)} curve={'curveMonotoneX'} color="#4299e1" strokeWidth={1} />
                </XYPlot>
              </div>
              <div className="text-gray-600 dark:text-gray-500 text-sm justify-between flex w-full mt-2">
                <span>RAM</span>
                <span>
                  {data.ramUsage[0].toLocaleString(undefined, {
                    maximumFractionDigits: 1
                  })}
                  <span>%</span>
                </span>
              </div>
              <div className="mt-1">
                <XYPlot height={30} margin={0} width={this.state.colWidth}>
                  <AreaSeries color="#38A169" curve="curveNatural" data={this.areaData(data.ram.result.data).cached} />
                  <AreaSeries color="#3182CE" curve="curveNatural" data={this.areaData(data.ram.result.data).used} />
                  <AreaSeries color="#D53F8C" curve="curveNatural" data={this.areaData(data.ram.result.data).buffers} />
                  <AreaSeries color="#D69E2E" curve="curveNatural" data={this.areaData(data.ram.result.data).free} />
                </XYPlot>
                <div className="text-gray-600 dark:text-gray-500 text-xs flex flex-wrap justify-between mt-1">
                  <span className="mr-2">
                    Free <span className="dot bg-yellow-700"></span>
                  </span>
                  <span className="mr-2">
                    Used <span className="dot bg-blue-700"></span>
                  </span>
                  <span className="mr-2">
                    Cached <span className="dot bg-green-700"></span>
                  </span>
                  <span>
                    Buffers <span className="dot bg-pink-700"></span>
                  </span>
                </div>
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
