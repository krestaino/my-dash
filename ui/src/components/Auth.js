import React, { Component } from 'react';

import api from '../api.js';

export default class Auth extends Component {
  inputRef = React.createRef();

  state = {
    API_KEY: '',
    error: ''
  };

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
      this.setState({ API_KEY: undefined, error });
      window.localStorage.removeItem('API_KEY');
    }
  };

  componentDidMount = () => {
    const API_KEY = window.localStorage.getItem('API_KEY');

    if (API_KEY) {
      this.auth(API_KEY);
    }
  };

  render() {
    if (!this.state.API_KEY) {
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
            <div className="text-red-600 text-xs text-center mt-4 px-4">{this.state.error.toString()}</div>
          </form>
        </div>
      );
    }

    return this.props.children;
  }
}
