import React, { Component } from "react";

import { ReactComponent as IconSun } from "../assets/svg/sun-solid.svg";
import { ReactComponent as IconMoon } from "../assets/svg/moon-solid.svg";

export default class ThemeToggle extends Component {
  render() {
    return (
      <button
        className="fixed top-0 right-0 m-4 focus:outline-none"
        title="Toggle theme"
        onClick={() =>
          document.querySelector("html").classList.toggle("mode-dark")
        }
      >
        <IconSun className="w-4 dark:hidden" />
        <IconMoon className="w-4 hidden dark:block" />
      </button>
    );
  }
}
