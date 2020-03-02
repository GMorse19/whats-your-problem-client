/* eslint no-eval: 0 */
// This base of this calculator was created by Olaniran Azeez Olawale
// You can find it at this link
// https://codeburst.io/a-simple-calculator-app-using-react-and-node-42c9b0ea1df8
import React from 'react'
import Screen from './Screen'
import Buttons from './Buttons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './Calculator.scss'

class Frame extends React.Component {
  constructor () {
    super()
    this.state = {
      question: '',
      answer: '',
      show: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleShow = () => this.setState({ show: true })
  handleClose = () => this.setState({ show: false })

  render () {
    console.log(this.show)
    return (
      <div>
        <Modal className="modal-dialog" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            Calculator
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="frame">
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
                <Buttons label={'#'} />
                <Buttons label={'/'} handleClick={this.handleClick} type='action' />
              </div>
              <div className="button-row keys">
                <Buttons label={' '} />
                <Buttons label={' '} />
                <Buttons label={'Cls'} handleClick={this.handleClick} type='action' />
                <Buttons label={'='} handleClick={this.handleClick} type='action' />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Title></Modal.Title>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={this.handleShow}>
          Calculator
        </Button>
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
