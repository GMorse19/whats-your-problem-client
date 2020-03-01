/* eslint no-eval: 0 */
// This base of this calculator was created by Olaniran Azeez Olawale
// You can find it at this link
// https://codeburst.io/a-simple-calculator-app-using-react-and-node-42c9b0ea1df8
import React from 'react'
import Screen from './Screen'
import Button from './Buttons'

class Frame extends React.Component {
  constructor () {
    super()
    this.state = {
      question: '',
      answer: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <div className="frame">
        <div className="calculator-title">
          R_N Calculator
        </div>
        <Screen question={this.state.question} answer={this.state.answer}/>
        <div className="button-row">
          <Button label={'1'} handleClick={this.handleClick} type='input' />
          <Button label={'2'} handleClick={this.handleClick} type='input' />
          <Button label={'3'} handleClick={this.handleClick} type='input' />
          <Button label={'4'} handleClick={this.handleClick} type='input' />
          <Button label={'-'} handleClick={this.handleClick} type='action' />
          <Button label={'+'} handleClick={this.handleClick} type='action' />
        </div>
        <div className="button-row">
          <Button label={'5'} handleClick={this.handleClick} type='input' />
          <Button label={'6'} handleClick={this.handleClick} type='input' />
          <Button label={'7'} handleClick={this.handleClick} type='input' />
          <Button label={'8'} handleClick={this.handleClick} type='input' />
          <Button label={'*'} handleClick={this.handleClick} type='action' />
          <Button label={'/'} handleClick={this.handleClick} type='action' />
        </div>
        <div className="button-row">
          <Button label={'9'} handleClick={this.handleClick} type='input' />
          <Button label={'.'} handleClick={this.handleClick} type='input' />
          <Button label={'0'} handleClick={this.handleClick} type='input' />
          <Button label={'Cls'} handleClick={this.handleClick} type='action' />
          <Button label={'='} handleClick={this.handleClick} type='action' />
        </div>
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
