import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as IconError } from '../assets/svg/exclamation-triangle-solid.svg';

export default class Error extends PureComponent {
  static propTypes = {
    error: PropTypes.string
  };

  render = () => (
    <div className="text-red-600">
      <IconError className="mx-auto mt-8 w-4" />
      <p className="text-xs text-center mt-4 px-4">{this.props.error}</p>
    </div>
  );
}
