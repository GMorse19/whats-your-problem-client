import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Frame from '../Calculator/Frame'

const Problem = props => {
  const [problem, setProblem] = useState(null)
  const [guess, setGuess] = useState({ answer: '' })
  const [showWin, setShowWin] = useState(false)
  const [showLoss, setShowLoss] = useState(false)
  const [show, setShow] = useState(false)

  const userId = props.user ? props.user.id : null

  useEffect(() => {
    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setProblem(res.data.problem))
      .catch(console.error)
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a problem', variant: 'success' })
        props.history.push('/problems')
      })
      .catch(() => {
        props.alert({ heading: 'Uh Oh!', message: 'You did not delete a problem', variant: 'warning' })
      })
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (guess.answer === problem.answer) {
      handleShowWin()
    } else {
      handleShowLoss()
    }
  }

  const handleChange = event => {
    event.persist()
    setGuess({ ...guess, [event.target.name]: event.target.value })
  }

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const handleShowWin = () => setShowWin(true)
  const handleCloseWin = () => {
    setShowWin(false)
    setGuess({ answer: '' })
  }
  const handleShowLoss = () => setShowLoss(true)
  const handleCloseLoss = () => setShowLoss(false)

  if (!problem) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className="problem-board">
        <Modal className="modal-dialog" show={showWin} onHide={handleCloseWin}>
          <Modal.Header closeButton>
            <Modal.Title>You Won! The answer is {problem.answer}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Blah Blah</Modal.Body>
          <Modal.Footer>
            <Modal.Title>Good Job!</Modal.Title>
            <Button variant="secondary" onClick={handleCloseWin}>
              Close
            </Button>
            <Button variant="primary" as={'a'} href={'#/problems'}>
              Try Another
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal className="modal-dialog" show={showLoss} onHide={handleCloseLoss}>
          <Modal.Header closeButton>
            <Modal.Title>Sorry, You lost. Please try again.</Modal.Title>
          </Modal.Header>
          <Modal.Body>Blah Blah</Modal.Body>
          <Modal.Footer>
            <Modal.Title>Sorry.</Modal.Title>
            <Button variant="secondary" onClick={handleCloseLoss}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseLoss}>
              Try Again
            </Button>
          </Modal.Footer>
        </Modal>
        <h1>{problem.name}</h1>
        <h4>{problem.content}</h4>
        <h6>Category: {problem.category}</h6>
        <h6>Created by: {problem.user.email}</h6>
        <div>
          {userId === problem.user.id && <Button
            href={`#problems/${props.match.params.id}/update`}
            variant="primary"
            className="mr-2"
            problem={problem}
            props={props}>
            Update
          </Button>}
          {userId === problem.user.id && <Button
            onClick={handleDelete}
            className="btn btn-danger">
            delete
          </Button>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">Place your answer below!</Form.Label>
              <Form.Control
                type="text"
                autoComplete='off'
                placeholder="Enter Answer Here..."
                value={guess.answer}
                name="answer"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
      <Button
        onClick={handleShow}
        props={props}
        problem={problem}
      >
        Work-Space
      </Button>
      {show && <div>
        <Frame
          props={props}
          problem={problem}
          handleClose={handleClose}
        />
      </div>}
    </div>
  )
}

export default withRouter(Problem)
