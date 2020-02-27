import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ProblemForm = ({ props, problem, handleSubmit, handleChange, cancelPath }) => (

  <div className="problem-board row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            value={problem.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="content">Enter your problem.</Form.Label>
          <Form.Control
            required
            type="text"
            value={problem.content}
            name="content"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category">Choose A Category</Form.Label>
          <Form.Check
            type="radio"
            label="Addition"
            value="addition"
            checked={problem.category === 'addition'}
            name="category"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Subtraction"
            value="subtraction"
            checked={problem.category === 'subtraction'}
            name="category"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Division"
            value="division"
            checked={problem.category === 'division'}
            name="category"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Multiplication"
            value="multiplication"
            checked={problem.category === 'multiplication'}
            name="category"
            onChange={handleChange}
          />
          <br/>
          <Form.Label>Or create your own category here.</Form.Label>
          <Form.Control
            placeholder="Create Category Here..."
            value={problem.category}
            name="category"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Hint</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hint Here..."
            value={problem.hint}
            name="hint"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Solution</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Solution Here..."
            value={problem.solution}
            name="solution"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Answer</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Answer Here..."
            value={problem.answer}
            name="answer"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Link to="/problems">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default withRouter(ProblemForm)
