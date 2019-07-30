import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NetdataHome extends Component {
  static propTypes = {
    netdataHome: PropTypes.object
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.netdataHome)}
      </div>
    )
  }
}
