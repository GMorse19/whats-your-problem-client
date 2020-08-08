import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class ScratchPad extends Component {
  constructor () {
    super()

    this.state = {
      space: ''
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = () => this.setState({ space: '' })

  render () {
    return (
      <Col className="box scratch-pad">
        <div style={{ height: '400px', width: '250px', backgroundColor: '#303030', borderRadius: '10px', textAlign: 'center' }}>
          <Container>
            <Form>
              <Form.Group>
                <Form.Label style={{ color: 'white', marginTop: '10px' }}>Scratch Pad</Form.Label>
                <Form.Control
                  name="space"
                  value={this.state.space}
                  onChange={this.handleChange}
                  className="work-space"
                  style={{ height: '280px', width: '220px', borderRadius: '10px', color: 'white', backgroundColor: '#303030' }}
                  as="textarea"
                />
              </Form.Group>
            </Form>
            <Button style={{ backgroundColor: '#FF9933', border: 'none', width: '220px', marginBottom: '10px' }} type="submit" onClick={this.handleSubmit}>CLEAR</Button>
          </Container>
        </div>
      </Col>
    )
  }
}

export default ScratchPad
