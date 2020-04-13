import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
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
    setGuess({ answer: '' })
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
        <Modal dialogClassName="modal-50w" show={showWin} onHide={handleCloseWin}>
          <Modal.Header closeButton>
            <Modal.Title>You Won! The answer is {problem.answer}</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are on a roll! Try another</Modal.Body>
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
        <Modal dialogClassName="modal-50w" show={showLoss} onHide={handleCloseLoss}>
          <Modal.Header closeButton>
            <Modal.Title>Sorry, You lost. Please try again.</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sorry. Better luck next time!</Modal.Body>
          <Modal.Footer>
            <Modal.Title>You can do it!</Modal.Title>
            <Button variant="secondary" onClick={handleCloseLoss}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseLoss}>
              Try Again
            </Button>
          </Modal.Footer>
        </Modal>
        <h1 className='problem-title'>{problem.name}</h1>
        <p>Created by: {problem.user.email}</p>
        <p>Category: {problem.category}</p>
        <div className='question'>
          <div className='question2'>
            <h2 className='question-content'>{problem.content}</h2>
          </div>
        </div>
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
          <div className='form-field' style={{ float: 'right' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} style={{ alignItems: 'center' }}>
                <Col>
                  <Form.Control
                    className='shadow'
                    type="text"
                    autoComplete='off'
                    placeholder="Enter Answer Here..."
                    value={guess.answer}
                    name="answer"
                    onChange={handleChange}
                  />
                </Col>
                <Button
                  className='shadow'
                  column="true"
                  sm={2}
                  style={{ margin: '10px', backgroundColor: '#4a4a4a', border: 'none' }}
                  variant="primary"
                  type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      <Button
        className='shadow'
        onClick={handleShow}
        props={props}
        problem={problem}
        style={{ margin: '10px', backgroundColor: '#4a4a4a', border: 'none' }}
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
