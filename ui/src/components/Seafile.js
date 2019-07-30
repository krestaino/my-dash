import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Seafile extends Component {
  static propTypes = {
    seafile: PropTypes.array
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.seafile)}
      </div>
    )
  }
}
