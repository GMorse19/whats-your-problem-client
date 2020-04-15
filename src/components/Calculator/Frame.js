/* eslint no-eval: 0 */
// The base of this calculator was created by Olaniran Azeez Olawale
// You can find it at this link
// https://codeburst.io/a-simple-calculator-app-using-react-and-node-42c9b0ea1df8
import React, { Component } from 'react'
import Screen from './Screen'
import Buttons from './Buttons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import WorkSpace from '../WorkSpace/WorkSpace'

import './Calculator.scss'

class Frame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: '',
      answer: '',
      show: true,
      showHint: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  hint = () => {
    this.setState({ showHint: true })
  }

  handleCloseHint = () => {
    this.setState({ showHint: false })
  }

  render () {
    if (!this.props.problem.hint) {
      this.props.problem.hint = 'Sorry, there is no hint for you!'
    }
    return (
      <div>
        {this.state.showHint && <Modal
          dialogClassName="modal-30w"
          style={{ marginTop: '30vh' }}
          show={this.state.showHint}
          onHide={this.handleCloseHint}
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
            {this.props.problem.hint}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#c2760b' }}>
            You can do it!
          </Modal.Footer>
        </Modal>}

        <Modal
          dialogClassName="modal-80w"
          style={{ marginTop: '10vh', paddingBottom: '70px' }}
          show={this.state.show}
          onHide={this.props.handleClose}
        >
          <Modal.Header
            style={{ backgroundColor: '#c2760b' }}
            closeButton
          >
            <Modal.Title className='calc-problem-content'>
              {this.props.problem.content}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#edbe6d' }}>
            <Container>
              <Row className="justify-content-md-center">
                <Col className="box"><WorkSpace /></Col>
                <Col className="box">
                  <div className="frame">
                    <div>
                      <div className="calculator-title">
                      </div>
                      <Screen question={this.state.question} answer={this.state.answer}/>
                      <div className="button-row keys">
                        <Buttons label={'1'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'2'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'3'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'-'} handleClick={this.handleClick} type='action' />
                      </div>
                      <div className="button-row keys">
                        <Buttons label={'4'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'5'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'6'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'+'} handleClick={this.handleClick} type='action' />
                      </div>
                      <div className="button-row keys">
                        <Buttons label={'7'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'8'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'9'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'*'} handleClick={this.handleClick} type='action' />
                      </div>
                      <div className="button-row keys">
                        <Buttons label={'.'} handleClick={this.handleClick} type='input' />
                        <Buttons label={'0'} handleClick={this.handleClick} type='input' />
                        <Buttons label={' '} handleClick={this.handleClick} type='input'/>
                        <Buttons label={'/'} handleClick={this.handleClick} type='action' />
                      </div>
                      <div className="button-row keys">
                        <Buttons label={' '} handleClick={this.handleClick} type='input'/>
                        <Buttons label={' '} handleClick={this.handleClick} type='input'/>
                        <Buttons label={'Cls'} handleClick={this.handleClick} type='action' />
                        <Buttons label={'='} handleClick={this.handleClick} type='action' />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#c2760b' }}>
            <Modal.Title></Modal.Title>
            <Button
              variant="success"
              onClick={this.hint}
            >
              Hint
            </Button>
            <Button
              variant="secondary"
              onClick={this.props.handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleClick (event) {
    const value = event.target.value
    switch (value) {
    case '=': { // if it's an equal sign, use the eval module to evaluate the question
      // convert the answer (in number) to String
      const answer = eval(this.state.question).toString()
      this.setState({ answer })
      break
    }
    case 'Cls': {
      // if it's the Cls sign, just clean our question and answer in the state
      this.setState({ question: '', answer: '' })
      break
    }
    default: {
      // for every other commmand, update the answer in the state
      let que = this.state.question
      this.setState({ question: que += value })
      break
    }
    }
  }
}

// export our frame component. To be used in our client/index.js file
export default Frame
