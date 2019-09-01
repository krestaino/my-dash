import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Auth from './components/Auth.js';
import Services from './components/Services.js';
import ThemeToggle from './components/ThemeToggle.js';

class App extends React.PureComponent {
  render = () => (
    <Fragment>
      <ThemeToggle />
      <Auth>
        <Services />
      </Auth>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
