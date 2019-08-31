import React, { Component } from 'react';

import { ReactComponent as IconSun } from '../assets/svg/sun-solid.svg';
import { ReactComponent as IconMoon } from '../assets/svg/moon-solid.svg';

export default class ThemeToggle extends Component {
  setTheme = theme => {
    const htmlSelector = document.querySelector('html');

    if (theme === 'light') {
      window.localStorage.setItem('THEME', 'light');
      htmlSelector.classList.remove('mode-dark');
    } else {
      window.localStorage.setItem('THEME', 'dark');
      htmlSelector.classList.add('mode-dark');
    }
  };

  componentDidMount = () => {
    const theme = window.localStorage.getItem('THEME');

    if (theme) {
      this.setTheme(theme);
    }
  };

  render = () => (
    <div className="absolute top-0 right-0 m-4">
      <button className="focus:outline-none dark:hidden" title="Set dark theme" onClick={() => this.setTheme('dark')}>
        <IconSun className="w-4 dark:hidden" />
      </button>
      <button
        className="focus:outline-none hidden dark:block"
        title="Set light theme"
        onClick={() => this.setTheme('light')}
      >
        <IconMoon className="w-4" />
      </button>
    </div>
  );
}
