import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './components/Auth.js';
import Services from './components/Services.js';
import ThemeToggle from './components/ThemeToggle.js';

class App extends React.PureComponent {
  render = () => (
    <div>
      <ThemeToggle />
      {!window.localStorage.getItem('API_KEY') ? <Auth /> : <Services />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
