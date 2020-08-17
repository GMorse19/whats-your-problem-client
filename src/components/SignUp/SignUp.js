import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Signup.scss'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: {
        value: '',
        valid: false
      },
      username: {
        value: '',
        valid: false
      },
      identifier: '',
      password: {
        value: '',
        valid: false
      },
      passwordConfirmation: {
        value: '',
        valid: false
      }
    }
  }

  handleChange = event => {
    this.setState({
    // [event.target.name]: event.target.value
      [event.target.name]: { value: event.target.value, valid: !!event.target.value }
    })
    console.log(this.state)
  }

  onSignUp = event => {
    event.preventDefault()
    this.setState({ identifier: this.state.email.value })
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
        this.setState({ email: { value: '' }, password: { value: '' }, passwordConfirmation: { value: '' } })
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, username, password, passwordConfirmation } = this.state
    const errorMessage = 'Please fill out correctly!'
    const noMessage = ''
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
                className={email.valid ? 'is-valid' : 'is-invalid'}
              >
                {email.valid ? errorMessage : noMessage }
              </Form.Text>
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
