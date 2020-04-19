import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Signin.scss'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      identifier: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ identifier: '', password: '' })
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { identifier, password } = this.state

    return (
      <div className="popup2">
        <div className="mt-3 p-4">
          <h3 className="">Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="identifier" className="mt-4">
              <Form.Label>use email or username</Form.Label>
              <Form.Control
                autoComplete='off'
                className="account-info input"
                type="identifier"
                name="identifier"
                value={identifier}
                placeholder="Login"
                onChange={this.handleChange}
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

export default withRouter(SignIn)
