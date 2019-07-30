import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Unifi extends Component {
  static propTypes = {
    unifi: PropTypes.object
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.unifi)}
      </div>
    )
  }
}
