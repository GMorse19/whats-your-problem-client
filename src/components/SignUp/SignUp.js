import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import update from 'immutability-helper'
import $ from 'jquery'
import { run, ruleRunner } from './Validation/ruleRunner.js'
import { required, mustMatch, minLength } from './Validation/rules.js'

import './Signup.scss'

const fieldValidations = [
  ruleRunner('username', 'User Name', required),
  ruleRunner('email', 'Email', required),
  ruleRunner('password1', 'Password', required, minLength(6)),
  ruleRunner('password2', 'Password Confirmation', mustMatch('password1', 'Password'))
]

class SignUp extends Component {
  constructor () {
    super()
    this.handleFieldChanged = this.handleFieldChanged.bind(this)
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this)
    this.errorFor = this.errorFor.bind(this)

    this.state = {
      email: '',
      username: '',
      identifier: '',
      password: '',
      passwordConfirmation: '',
      showErrors: false,
      validationErrors: { }
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    const newState = this.state
    newState.validationErrors = run(newState, fieldValidations)
    // this.setState(newState)
    console.log(newState)
  }

  errorFor (field) {
    return this.state.validationErrors[field] || ''
  }

  handleFieldChanged (field) {
    return (e) => {
      // update() is provided by React Immutability Helpers
      // https://facebook.github.io/react/docs/update.html
      const newState = update(this.state, {
        [field]: { $set: e.target.value }
      })
      newState.validationErrors = run(newState, fieldValidations)
      this.setState(newState)
    }
  }

  handleSubmitClicked () {
    this.setState({ showErrors: true })
    if ($.isEmptyObject(this.state.validationErrors) === false) return null
    return this.props.onCreateAccount(this.state)
  }

  onSignUp = event => {
    event.preventDefault()
    this.setState({ identifier: this.state.email })
    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, username, password, passwordConfirmation } = this.state

    return (
      <div className="popup2">
        <div className="mt-3 p-4">
          <h3>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="email" className="mt-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                autoComplete='off'
                className="account-info input"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
                maxLength="35"
                errorText={this.errorFor('email')}
              />
              <Form.Text>Valid Email Required</Form.Text>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                className="account-info username input"
                name="username"
                value={username}
                type="username"
                placeholder="Username"
                onChange={this.handleChange}
                maxLength="20"
              />
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                className="account-info password input"
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                maxLength="20"
              />
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                className="account-info password input"
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <Form.Text></Form.Text>
            </Form.Group>
            <Link to='/' className="cancel-button" onClick={this.closeWindow}>
              Cancel
            </Link>
            <Button
              type="submit"
              className='submit-button'
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
