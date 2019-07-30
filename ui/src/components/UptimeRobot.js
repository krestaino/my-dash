import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UptimeRobot extends Component {
  static propTypes = {
    uptimeRobot: PropTypes.object
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.uptimeRobot)}
      </div>
    )
  }
}
