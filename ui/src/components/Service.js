import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../api.js';
import Error from './Error.js';
import Loading from './Loading.js';

export default class Service extends Component {
  static propTypes = {
    endpoint: PropTypes.string,
    successFetch: PropTypes.func,
    refreshRate: PropTypes.number
  };

  state = {
    error: undefined,
    loading: true
  };

  fetch = async () => {
    const { endpoint, successFetch } = this.props;

    try {
      const data = await api(endpoint);
      successFetch({ data });
    } catch (error) {
      this.setState({ error: error.toString() });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount = () => {
    this.fetch();

    setInterval(() => {
      this.fetch();
    }, this.props.refreshRate);
  };

  render() {
    const { loading, error } = this.state;

    if (error) {
      return <Error error={error} />;
    }

    if (loading) {
      return <Loading />;
    }

    return this.props.children;
  }
}
