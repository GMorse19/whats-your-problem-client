import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './ProblemUpdate.scss'

const ProblemForm = ({ problem, handleDelete, handleSubmit, handleChange }) => (

  <div className='review-form'>
    <div className="review-scroll">
      <h1 className="main-header">Create a Problem.</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="question2">
          <Form.Label className="question-header" htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            autoComplete='off'
            placeholder="Enter Name Here..."
            value={problem.name}
            name="name"
            onChange={handleChange}
            className="review-text-input input"
            maxLength="33"
          />
        </Form.Group>
        <Form.Group className="question2 mt-0">
          <Form.Label className="question-header" htmlFor="content">Enter your problem.</Form.Label>
          <Form.Control
            required
            style={{ height: '60px' }}
            as="textarea"
            type="text"
            autoComplete='off'
            placeholder="Enter Content Here..."
            value={problem.content}
            name="content"
            onChange={handleChange}
            className="review-text-input input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category">Choose A Category</Form.Label>
          <Form.Row className="justify-content-center">
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Addition"
              value="addition"
              checked={problem.category === 'addition'}
              name="category"
              onChange={handleChange}
              id="category1"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Subtraction"
              value="subtraction"
              checked={problem.category === 'subtraction'}
              name="category"
              onChange={handleChange}
              id="category2"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Division"
              value="division"
              checked={problem.category === 'division'}
              name="category"
              onChange={handleChange}
              id="category3"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Multiplication"
              value="multiplication"
              checked={problem.category === 'multiplication'}
              name="category"
              onChange={handleChange}
              id="category4"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Other"
              value="other"
              checked={problem.category === 'other'}
              name="category"
              onChange={handleChange}
              id="category5"
            />
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Hint</Form.Label>
          <Form.Control
            autoComplete='off'
            type="text"
            placeholder="Enter Hint Here..."
            value={problem.hint}
            name="hint"
            onChange={handleChange}
            className="review-text-input input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Solution</Form.Label>
          <Form.Control
            autoComplete='off'
            type="text"
            placeholder="Enter Solution Here..."
            value={problem.solution}
            name="solution"
            onChange={handleChange}
            className="review-text-input input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Answer</Form.Label>
          <Form.Control
            required
            autoComplete='off'
            type="text"
            placeholder="Enter Answer Here..."
            value={problem.answer}
            name="answer"
            onChange={handleChange}
            className="review-text-input input"
          />
        </Form.Group>
        <Link to='/' className="cancel-button" onClick={this.closeWindow}>
          Cancel
        </Link>
        <Button className='submit-button' type="submit">Submit</Button>
      </Form>
      <Button
        onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(e) }}
        className="btn btn-danger">
        delete
      </Button>
    </div>
  </div>
)

export default withRouter(ProblemForm)
