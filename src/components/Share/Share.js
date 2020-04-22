import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'

import './Share.scss'

class Share extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true
    }
    // this.handleClick = this.handleClick.bind(this)
  }
  render () {
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={this.props.handleClose}
        >
          <Modal.Header closeButton>Share This problem!!</Modal.Header>
          <Modal.Body>
            <p>Share!!</p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Title>Good Job!</Modal.Title>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Share
