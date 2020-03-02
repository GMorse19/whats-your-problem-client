import React from 'react'
import Container from 'react-bootstrap/Container'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const WorkSpace = () => {
  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Work Space</Form.Label>
          <Form.Control style={{ height: '300px', width: '250px' }} as="textarea" rows="3" />
        </Form.Group>
      </Form>
      <Button>CLEAR</Button>
    </Container>
  )
}
export default WorkSpace
