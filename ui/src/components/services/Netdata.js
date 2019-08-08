import React, { Component } from 'react';

import api from '../../api.js';
import Instance from './NetdataInstance.js';
import Loading from '../Loading.js';

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
    const instances = [
      { data: this.state.netdataDo, url: process.env.REACT_APP_NETDATA_DO_URL, id: 'do' },
      { data: this.state.netdataHome, url: process.env.REACT_APP_NETDATA_HOME_URL, id: 'home' }
    ];

    return (
      <div className="lg:w-1/5 px-4">
        <h2>Netdata</h2>
        <ul>
          {instances.map(instance =>
            !instance.data ? (
              <Loading response={instance.data} />
            ) : (
              <Instance data={instance.data} url={instance.url} id={instance.id} />
            )
          )}
        </ul>
      </div>
    );
  }
}
