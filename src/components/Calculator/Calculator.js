import React from 'react'

import Buttons from './Buttons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import WorkSpace from '../WorkSpace/WorkSpace'
import Screen from './Screen'

const Calculator = ({ question, answer, handleClick }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="box"><WorkSpace /></Col>
        <Col className="box">
          <div className="frame">
            <div>
              <div className="calculator-title">
              </div>
              <Screen question={question} answer={answer}/>
              <div className="button-row keys">
                <Buttons label={'1'} handleClick={handleClick} type='input' />
                <Buttons label={'2'} handleClick={handleClick} type='input' />
                <Buttons label={'3'} handleClick={handleClick} type='input' />
                <Buttons label={'-'} handleClick={handleClick} type='action' />
              </div>
              <div className="button-row keys">
                <Buttons label={'4'} handleClick={handleClick} type='input' />
                <Buttons label={'5'} handleClick={handleClick} type='input' />
                <Buttons label={'6'} handleClick={handleClick} type='input' />
                <Buttons label={'+'} handleClick={handleClick} type='action' />
              </div>
              <div className="button-row keys">
                <Buttons label={'7'} handleClick={handleClick} type='input' />
                <Buttons label={'8'} handleClick={handleClick} type='input' />
                <Buttons label={'9'} handleClick={handleClick} type='input' />
                <Buttons label={'*'} handleClick={handleClick} type='action' />
              </div>
              <div className="button-row keys">
                <Buttons label={'.'} handleClick={handleClick} type='input' />
                <Buttons label={'0'} handleClick={handleClick} type='input' />
                <Buttons label={' '} handleClick={handleClick} type='input'/>
                <Buttons label={'/'} handleClick={handleClick} type='action' />
              </div>
              <div className="button-row keys">
                <Buttons label={' '} handleClick={handleClick} type='input'/>
                <Buttons label={' '} handleClick={handleClick} type='input'/>
                <Buttons label={'Cls'} handleClick={handleClick} type='action' />
                <Buttons label={'='} handleClick={handleClick} type='action' />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Calculator
