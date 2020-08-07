/* eslint no-eval: 0 */
// The base of this calculator was created by Olaniran Azeez Olawale
// You can find it at this link
// https://codeburst.io/a-simple-calculator-app-using-react-and-node-42c9b0ea1df8
import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { Calculator } from './Calculator/Calculator'
import ScratchPad from './ScratchPad/ScratchPad'
import { Hint } from './Hint/Hint'

import './Calculator/Calculator.scss'

class WorkSpace extends Component {
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
        {this.state.showHint &&
          <Hint
            hint={this.props.problem.hint}
            showHint={this.state.showHint}
            handleCloseHint={this.handleCloseHint}
          />}

        <Modal
          dialogClassName="modal-90w"
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
                <ScratchPad />
                <Calculator
                  question={this.state.question}
                  answer={this.state.answer}
                  handleClick={this.handleClick}
                />
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#c2760b' }}>
            <Button
              variant="success"
              onClick={this.hint}
            >Hint</Button>
            <Button
              variant="secondary"
              onClick={this.props.handleClose}
            >Close</Button>
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

export default WorkSpace
