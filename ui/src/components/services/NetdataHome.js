import React, { Component } from 'react';

import NetdataInstance from './NetdataInstance.js';
import Service from '../Service.js';

export default class NetdataHome extends Component {
  state = {
    data: undefined
  };

  render = () => (
    <Service
      endpoint={process.env.REACT_APP_NETDATA_HOME_ENDPOINT}
      refreshRate={5000}
      successFetch={({ data }) => this.setState({ data: data })}
    >
      <NetdataInstance data={this.state.data} url={process.env.REACT_APP_NETDATA_HOME_URL} />
    </Service>
  );
}
