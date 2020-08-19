import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import signUpMessages from './signUpMessages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Signup.scss'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      emailVal: false,
      username: '',
      usernameVal: false,
      identifier: '',
      submit: false,
      password: '',
      passwordVal: false,
      passwordConfirmation: '',
      passwordConfirmationVal: false
    }
  }

  checkValid = () => {
    console.log(this.state.password)
    const re = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$!%&*(),.?":{}|<>^+=])(.{8,15})$/
    if (this.state.email.includes('@')) {
      this.setState({ emailVal: true })
    }
    if (this.state.username.length >= 6) {
      this.setState({ usernameVal: true })
    }
    if (re.test(this.state.password)) {
      this.setState({ passwordVal: true })
    }
    if (this.state.passwordConfirmation === this.state.password) {
      this.setState({ passwordConfirmationVal: true })
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()
    this.setState({
      identifier: this.state.email,
      submit: true,
      emailVal: false,
      usernameVal: false,
      passwordVal: false,
      passwordConfirmationVal: false })
    this.checkValid()
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
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, username, password, passwordConfirmation, submit, emailVal, usernameVal, passwordVal, passwordConfirmationVal } = this.state
    console.log(this.state.password)
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
                value={email.value}
                placeholder="Email"
                onChange={this.handleChange}
                maxLength="35"
              />
              <Form.Text
                className={email.valid ? 'is-invalid' : 'is-valid'}
              >
                {submit && !emailVal && signUpMessages.email}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                className="account-info username input"
                name="username"
                value={username.value}
                type="username"
                placeholder="Username"
                onChange={this.handleChange}
                maxLength="20"
              />
              <Form.Text
                className={username.valid ? 'is-invalid' : 'is-valid'}
              >
                {submit && !usernameVal && signUpMessages.username }
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                className="account-info password input"
                name="password"
                value={password.value}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                maxLength="20"
              />
              <Form.Text
                className={password.valid ? 'is-invalid' : 'is-valid'}
              >
                {submit && !passwordVal && signUpMessages.password }
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                className="account-info password input"
                name="passwordConfirmation"
                value={passwordConfirmation.value}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <Form.Text
                className={passwordConfirmation.valid ? 'is-invalid' : 'is-valid'}
              >
                {submit && !passwordConfirmationVal && signUpMessages.passwordConfirmation }
              </Form.Text>
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
