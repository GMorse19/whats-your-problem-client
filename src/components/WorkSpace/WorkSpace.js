import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class WorkSpace extends Component {
  constructor () {
    super()

    this.state = {
      space: ''
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = event => this.setState({ space: '' })

  render () {
    return (
      <div style={{ width: '250px', backgroundColor: '#303030', borderRadius: '10px', textAlign: 'center' }}>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label style={{ color: 'white', marginTop: '10px' }}>Work Space</Form.Label>
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
          <Button style={{ width: '220px', marginBottom: '10px' }} type="submit" onClick={this.handleSubmit}>CLEAR</Button>
        </Container>
      </div>
    )
  }
}
export default WorkSpace
