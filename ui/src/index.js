import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './components/Auth.js';
import Services from './components/Services.js';
import ThemeToggle from './components/ThemeToggle.js';

class App extends React.PureComponent {
  render = () => (
    <div>
      <ThemeToggle />
      <Auth>
        <Services />
      </Auth>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
