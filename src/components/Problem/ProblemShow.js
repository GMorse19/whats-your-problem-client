import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'

import WorkSpace from '../WorkSpace/WorkSpace'
import Share from '../Share/Share'
import Print from '../Print/Print'
import ModalForm from '../ModalForm/ModalForm'
import { showProblem } from '../../api/problem'
import { showLikes, like } from '../../api/likes'
import { emptyHeart, redHeart } from '../../images/hearts'
import { imageShare } from '../../images/share'
import { random } from '../../helpers/random'
import messages from '../ModalForm/messages'

const Problem = props => {
  const [problem, setProblem] = useState(null)
  const [flag, setFlag] = useState(null)
  const [guess, setGuess] = useState({ answer: '' })
  const [showWin, setShowWin] = useState(false)
  const [showLoss, setShowLoss] = useState(false)
  const [show, setShow] = useState(false)
  const [share, setShare] = useState(false)

  const handleShare = () => setShare(prevState => (!prevState))
  const handleShow = () => setShow(prevState => (!prevState))
  const handleShowWin = () => setShowWin(prevState => (!prevState))
  const handleLoss = () => setShowLoss(prevState => (!prevState))

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
    guess.answer === problem.answer ? handleShowWin() : handleLoss()
    setGuess({ answer: '' })
  }

  const handleChange = event => {
    event.persist()
    setGuess({ ...guess, [event.target.name]: event.target.value })
  }

  const handleLike = event => {
    let status = ''
    setFlag(prevState => (!prevState))
    flag ? status = 'unlike' : status = 'like'
    like(event, problem.id, props.user.token, status)
  }

  if (!problem) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className="problem-board">
        <ModalForm
          title={messages.winTitle + problem.answer}
          body={random(messages.winBody)}
          footer={random(messages.winFooter)}
          show={showWin}
          onHide={handleShowWin}
          button='Close'
          button2='Try Another'
          onClick={handleShowWin}
          href={'#/problems'}
        />
        <ModalForm
          body={messages.loseTitle}
          title={messages.loseBody}
          footer={messages.loseFooter}
          button='Close'
          button2='Try Again'
          show={showLoss}
          onClick={handleLoss}
          onClick2={handleLoss}
          onHide={handleLoss}
        />

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

        <Tooltip title='share' arrow enterDelay={900} leaveDelay={200} TransitionComponent={Zoom}>
          <Button
            onClick={handleShare}
            style={{ margin: '10px', background: 'none', border: 'none' }}
          >{imageShare}</Button>
        </Tooltip>

        {props.user &&
        <Tooltip title={flag ? 'unlike' : 'like'} enterDelay={900} arrow>
          <Button
            style={{
              background: 'none',
              border: 'none' }}
            onClick={handleLike}>{flag ? redHeart : emptyHeart}</Button></Tooltip>}

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
        <WorkSpace
          props={props}
          problem={problem}
          handleClose={handleShow}
        />
      </div>}

    </div>
  )
}

export default withRouter(Problem)
