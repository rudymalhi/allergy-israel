import React, { Component, Fragment } from 'react'
import Marked from 'react-markdown'
import { X } from 'react-feather'

import './Popup.css'

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: true }
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const { children } = this.props
    return (
      <Fragment>
        {this.state.showPopup ? (
          <div className="Popup-Overlay">
            <div
              className="Popup-Background"
              onClick={this.togglePopup.bind(this)}
            ></div>
            <div className="Popup-Inner">
              <X class="Popup-Close" onClick={this.togglePopup.bind(this)} />
              <Marked source={children}/>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default Popup
