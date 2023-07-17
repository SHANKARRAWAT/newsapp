import React, { Component } from 'react'
import spin from './spin.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div>
          <div className="text-center">
          <img src={spin} alt="loading"  />
          </div>
      </div>
    )
  }
}
