import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalForm = ({ title, body, button, href, button2, footer, show, onHide, onClick, onClick2 }) => {
  return (
    <Modal dialogClassName="modal-50w" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Modal.Title>{footer}</Modal.Title>
        <Button variant="secondary" onClick={onClick}>
          {button}
        </Button>
        {onClick2 &&
        <Button variant="primary" onClick={onClick2}>
          {button2}
        </Button>
        }
        {href && <Button variant="primary" as={'a'} href={href}>
            Try Another
        </Button>}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm
