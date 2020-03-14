import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GeneratorForm = ({ props, generator, answer, handleSubmit, handleChange, cancelPath }) => (

  <div className="problem-board row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="attr1">Attr1</Form.Label>
          <Form.Control
            type="text"
            value={generator.attr1}
            name="attr1"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="attr2">Pick a Noun</Form.Label>
          <Form.Control
            required
            type="text"
            value={generator.attr2}
            name="attr2"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="animal">Pick an animal</Form.Label>
          <Form.Control
            type="text"
            value={generator.animal}
            name="animal"
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
