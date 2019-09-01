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
    loading: undefined,
    error: undefined
  };

  inputRef = React.createRef();

  handleSubmit = async event => {
    // On auth form submission, grab the API_KEY from the
    // text input and authenticate it.
    event.preventDefault();
    this.auth(this.inputRef.current.value);
  };

  auth = async API_KEY => {
    try {
      // Show loader.
      this.setState({ loading: true });
      // Set API_KEY in localStorage. Each request to the api uses this
      // localStorage key, so we need to make sure to set it.
      window.localStorage.setItem('API_KEY', API_KEY);

      // The api will respond with 200 if the API_KEY is correct.
      await api(process.env.REACT_APP_AUTH_ENDPOINT);

      // If no error, set the API_KEY in state to render the Services
      // and hide the auth form.
      this.setState({ API_KEY });
    } catch (error) {
      // The api most likely rejected the key, remove it and reset API_KEY state
      // to show the auth form again. The error will also be displayed.
      window.localStorage.removeItem('API_KEY');
      this.setState({ API_KEY: undefined, error: error.toString() });
    } finally {
      // Hide loader.
      this.setState({ loading: false });
    }
  };

  componentDidMount = () => {
    // If API_KEY is set in localStorage, authenticate it.
    const API_KEY = window.localStorage.getItem('API_KEY');

    if (API_KEY) {
      this.auth(API_KEY);
    }
  };

  render() {
    const { API_KEY, loading, error } = this.state;

    // Show loader while authenticating.
    if (loading) {
      return <Loading />;
    }

    // If API_KEY is not set, render form to enter it.
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

    // If not loading and API_KEY is valid, render the Services.
    return this.props.children;
  }
}
