import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Plex extends Component {
  static propTypes = {
    plex: PropTypes.object
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.plex)}
      </div>
    )
  }
}
