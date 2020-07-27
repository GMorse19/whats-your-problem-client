import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'

import Frame from '../Calculator/Frame'
import Share from '../Share/Share'
import Print from '../Print/Print'
import { showProblem } from '../../api/problem'
import { showLikes, like, unlike } from '../../api/likes'
import { emptyHeart, redHeart } from '../../images/hearts'
import { imageShare } from '../../images/share'

const Problem = props => {
  const [problem, setProblem] = useState(null)
  const [flag, setFlag] = useState(null)
  const [guess, setGuess] = useState({ answer: '' })
  const [showWin, setShowWin] = useState(false)
  const [showLoss, setShowLoss] = useState(false)
  const [show, setShow] = useState(false)
  const [share, setShare] = useState(false)

  const userId = props.user ? props.user.id : null

  useEffect(() => {
    showProblem(props.match.params.id, setProblem)
  }, [])

  if (props.user) {
    useEffect(() => {
      showLikes(props.match.params.id, props.user.token, setFlag)
    }, [])
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (guess.answer === problem.answer) {
      handleShowWin()
    } else {
      handleLoss()
    }
    setGuess({ answer: '' })
  }

  const handleChange = event => {
    event.persist()
    setGuess({ ...guess, [event.target.name]: event.target.value })
  }

  const handleLike = event => {
    setFlag(true)
    like(event, problem.id, props.user.token)
  }

  const handleUnlike = event => {
    setFlag(false)
    unlike(event, problem.id, props.user.token)
  }

  const handleShare = () => setShare(prevState => (!prevState))
  const handleShow = () => setShow(prevState => (!prevState))
  const handleShowWin = () => setShowWin(prevState => (!prevState))
  const handleLoss = () => setShowLoss(prevState => (!prevState))

  if (!problem) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className="problem-board">
        <Modal dialogClassName="modal-50w" show={showWin} onHide={handleShowWin}>
          <Modal.Header closeButton>
            <Modal.Title>You Won! The answer is {problem.answer}</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are on a roll! Try another</Modal.Body>
          <Modal.Footer>
            <Modal.Title>Good Job!</Modal.Title>
            <Button variant="secondary" onClick={handleShowWin}>
              Close
            </Button>
            <Button variant="primary" as={'a'} href={'#/problems'}>
              Try Another
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal dialogClassName="modal-50w" show={showLoss} onHide={handleLoss}>
          <Modal.Header closeButton>
            <Modal.Title>Sorry, You lost. Please try again.</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sorry. Better luck next time!!!</Modal.Body>
          <Modal.Footer>
            <Modal.Title>You can do it!</Modal.Title>
            <Button variant="secondary" onClick={handleLoss}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLoss}>
              Try Again
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <h1 className='problem-title'>{problem.name}</h1>
          <p>Created by: {problem.user.username ? problem.user.username : problem.user.email}</p>
          <p>Category: {problem.category}</p>
          <div className='question'>
            <div className='question2'>
              <h2 className='question-content'>{problem.content}</h2>
            </div>
          </div>
        </div>
        <div>
          <div className='delete-update'>
            {(userId === problem.user.id || userId === 1) && <Button
              href={`#problems/${props.match.params.id}/update`}
              variant="primary"
              className="mr-2"
              problem={problem}
              props={props}>
              Update
            </Button>}
          </div>
          <div className='form-field' style={{ float: 'right', width: '200px' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} style={{ alignItems: 'center' }}>
                <Col>
                  <Form.Control
                    className='shadow'
                    type="text"
                    autoComplete='off'
                    placeholder="Answer..."
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

        <Button
          className='shadow'
          onClick={handleShow}
          props={props}
          problem={problem}
          style={{ margin: '10px', backgroundColor: '#4a4a4a', border: 'none', float: 'left' }}
        >
          Work-Space
        </Button>
      </div>

      <br />

      <div className='lower-buttons'>

        <Tooltip title='share' arrow leaveDelay={200} TransitionComponent={Zoom}>
          <Button
            onClick={handleShare}
            style={{ margin: '10px', background: 'none', border: 'none' }}
          >{imageShare}</Button>
        </Tooltip>

        {props.user && !flag &&
        <Tooltip title='like' enterDelay={500} arrow>
          <Button
            style={{
              background: 'none',
              border: 'none' }}
            onClick={handleLike}>{emptyHeart}</Button></Tooltip>}
        {props.user && flag &&
        <Tooltip title='unlike' enterDelay={500} arrow>
          <Button
            style={{
              background: 'none',
              border: 'none' }}
            onClick={handleUnlike}>{redHeart}</Button></Tooltip>}

        <Print
          className='lower-buttons'
          props={props}
          user={problem.user.email}
          content={problem.content}
          title={problem.name}
        />

      </div>

      {share && <div>
        <Share
          handleClose={handleShare}
        />
      </div>}

      {show && <div>
        <Frame
          props={props}
          problem={problem}
          handleClose={handleShow}
        />
      </div>}

    </div>
  )
}

export default withRouter(Problem)
