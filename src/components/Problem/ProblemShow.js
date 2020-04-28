import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Frame from '../Calculator/Frame'
import Share from '../Share/Share'

import Print from '../Print/Print'

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
    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setProblem(res.data.problem))
      .catch(console.error)
  }, [])

  if (props.user) {
    useEffect(() => {
      axios({
        url: `${apiUrl}/problems/${props.match.params.id}/likes`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${props.user.token}`
        }
      })
        .then(res => setFlag(res.data[0]))
        .catch(console.error)
    }, [])
  }

  // const handleDelete = event => {
  //   axios({
  //     url: `${apiUrl}/problems/${props.match.params.id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     }
  //   })
  //     .then(() => {
  //       props.alert({ heading: 'Success', message: 'You deleted a problem', variant: 'success' })
  //       props.history.push('/problems')
  //     })
  //     .catch(() => {
  //       props.alert({ heading: 'Uh Oh!', message: 'You did not delete a problem', variant: 'warning' })
  //     })
  // }

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
    axios({
      url: `${apiUrl}/problems/${problem.id}/like`,
      method: 'PUT',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
  }

  const handleUnlike = event => {
    setFlag(false)
    axios({
      url: `${apiUrl}/problems/${problem.id}/unlike`,
      method: 'PUT',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
  }

  const image = <img
    src='share-icon.png'
    style={{ width: '20px' }}
  />

  const emptyHeart = <img
    src='empty-heart.png'
    style={{ width: '30px' }}
  />

  const redHeart = <img
    src='red-heart.png'
    style={{ width: '30px' }}
  />

  const handleShare = () => setShare(prevState => (!prevState))
  const handleShow = () => setShow(prevState => (!prevState))
  const handleShowWin = () => setShowWin(true)
  const handleCloseWin = () => {
    setShowWin(false)
    setGuess({ answer: '' })
  }
  const handleLoss = () => setShowLoss(prevState => (!prevState))

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
        <Modal dialogClassName="modal-50w" show={showLoss} onHide={handleLoss}>
          <Modal.Header closeButton>
            <Modal.Title>Sorry, You lost. Please try again.</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sorry. Better luck next time!</Modal.Body>
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
          <p>Created by: {problem.user.email}</p>
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
      </div>
      <div style={{ float: 'left' }}>
        <Button
          className='shadow'
          onClick={handleShow}
          props={props}
          problem={problem}
          style={{ margin: '10px', backgroundColor: '#4a4a4a', border: 'none', float: 'left' }}
        >
          Work-Space
        </Button>

        <Tooltip title='share' arrow leaveDelay={200} TransitionComponent={Zoom}>
          <Button
            onClick={handleShare}
            style={{ margin: '10px', background: 'none', border: 'none' }}
          >{image}</Button></Tooltip>

        {props.user &&
      !flag &&
      <Tooltip title='like' enterDelay={500} arrow>
        <Button
          style={{
            background: 'none',
            border: 'none' }}
          onClick={handleLike}>{emptyHeart}</Button></Tooltip>}
        {props.user &&
      flag &&
      <Tooltip title='unlike' enterDelay={500} arrow>
        <Button
          style={{
            background: 'none',
            border: 'none' }}
          onClick={handleUnlike}>{redHeart}</Button></Tooltip>}
      </div>
      <div><Print
        props={props}
        user={problem.user.email}
        content={problem.content}
        title={problem.name}
      /></div>

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
