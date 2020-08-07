import React from 'react'

import Modal from 'react-bootstrap/Modal'

export const Hint = ({ showHint, handleCloseHint, hint }) => {
  return (
    <Modal
      dialogClassName="modal-30w"
      style={{ marginTop: '30vh' }}
      show={showHint}
      onHide={handleCloseHint}
    >
      <Modal.Header
        style={{ backgroundColor: '#c2760b' }}
        closeButton
      >
        <Modal.Title>
          Sometimes we all need a little help.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#edbe6d' }}>
        {hint}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#c2760b' }}>
        You can do it!
      </Modal.Footer>
    </Modal>
  )
}
