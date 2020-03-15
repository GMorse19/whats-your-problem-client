import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GeneratorForm = ({ props, generator, answer, handleSubmit, handleChange, cancelPath }) => (

  <div className="problem-board row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="attr1">Name</Form.Label>
          <Form.Control
            type="text"
            value={generator.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="attr2">Pets name</Form.Label>
          <Form.Control
            required
            type="text"
            value={generator.pet}
            name="pet"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="animal">Pick a location</Form.Label>
          <Form.Control
            type="text"
            value={generator.location}
            name="location"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default withRouter(GeneratorForm)
