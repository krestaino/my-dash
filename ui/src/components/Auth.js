import React, { Component } from "react";

export default class Auth extends Component {
  state = {
    API_KEY: ""
  };

  handleChange = event => {
    this.setState({ API_KEY: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem("API_KEY", this.state.API_KEY);
    window.location.reload();
  };

  render() {
    return (
      <form className="container mx-auto max-w-lg" onSubmit={this.handleSubmit}>
        <div className="box flex mt-8">
          <label className="text-gray-600 dark:text-gray-500 text-sm flex flex-1 items-center">
            <input
              autoFocus
              className="py-1 px-2 flex flex-1 rounded border dark:border-gray-600 focus:border-gray-600 outline-none bg-transparent"
              type="text"
              value={this.state.API_KEY}
              onChange={this.handleChange}
              placeholder="API Key"
            />
          </label>
          <input
            className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-500 dark:text-gray-300 text-sm py-1 px-6 rounded ml-2 cursor-pointer"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    );
  }
}
