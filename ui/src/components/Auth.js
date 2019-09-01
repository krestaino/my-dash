import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../api.js';
import Loading from './Loading.js';

export default class Auth extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  state = {
    API_KEY: undefined,
    loading: true,
    error: undefined
  };

  inputRef = React.createRef();

  handleSubmit = async event => {
    event.preventDefault();
    this.auth(this.inputRef.current.value);
  };

  auth = async API_KEY => {
    try {
      window.localStorage.setItem('API_KEY', API_KEY);
      await api(process.env.REACT_APP_AUTH_ENDPOINT);
      this.setState({ API_KEY });
    } catch (error) {
      window.localStorage.removeItem('API_KEY');
      this.setState({ API_KEY: undefined, error: error.toString() });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount = () => {
    const API_KEY = window.localStorage.getItem('API_KEY');
    API_KEY ? this.auth(API_KEY) : this.setState({ loading: false });
  };

  render() {
    const { API_KEY, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!API_KEY) {
      return (
        <div className="container mx-auto max-w-lg py-8 px-4">
          <h1>My Dash</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="box flex mt-8">
              <label className="text-gray-600 dark:text-gray-500 text-sm flex flex-1 items-center">
                <input
                  autoFocus
                  className="py-1 px-2 flex flex-1 rounded border outline-none bg-transparent dark:border-gray-600"
                  type="text"
                  ref={this.inputRef}
                  placeholder="API_KEY"
                />
              </label>
              <input
                className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 dark:text-gray-300 text-sm py-1 px-6 rounded ml-2 cursor-pointer"
                type="submit"
                value="Connect"
              />
            </div>
            {error && <div className="text-red-600 text-xs text-center mt-4 px-4">{error}</div>}
          </form>
        </div>
      );
    }

    return this.props.children;
  }
}
