import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateUser } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './UpdateUser.scss'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      password: '',
      email: '',
      username: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateUser = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    updateUser(this.state, user)
      .then(() => alert({
        heading: 'Change User Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ password: '', email: '', username: '' })
        alert({
          heading: 'Update User Failed',
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { password, email, username } = this.state

    return (
      <div className="popup2">
        <div className="mt-3 p-4">
          <h3>Change Password</h3>
          <Form onSubmit={this.onUpdateUser}>
            <Form.Group controlId="password" className="mt-4">
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
            <Form.Group controlId="email">
              <Form.Label>New Email</Form.Label>
              <Form.Control
                required
                className="account-info password input"
                name="email"
                value={email}
                type="email"
                placeholder="New Email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                required
                className="account-info password input"
                name="username"
                value={username}
                type="username"
                placeholder="New Username"
                onChange={this.handleChange}
              />
            </Form.Group>
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

export default withRouter(ChangePassword)
