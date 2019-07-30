import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NetdataDo extends Component {
  static propTypes = {
    netdataDo: PropTypes.object
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.netdataDo)}
      </div>
    )
  }
}
