import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import ShareButton from './ShareButtons'

import './Share.scss'

class Share extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true
    }
  }

  shareUrl = window.location.href

  render () {
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={this.props.handleClose}
        >
          <Modal.Header style={{ backgroundColor: '#c2760b' }} closeButton>Share this problem with your friends!</Modal.Header>
          <Modal.Body style={{ textAlign: 'center', backgroundColor: '#edbe6d' }}>
            <ShareButton
              shareUrl={this.shareUrl}
            />
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#c2760b' }}>
            <Modal.Title></Modal.Title>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Share
