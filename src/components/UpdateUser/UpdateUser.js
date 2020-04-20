import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateUser } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './UpdateUser.scss'

class UpdateUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      email: this.props.user.email,
      username: this.props.user.username
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateUser = event => {
    event.preventDefault()

    const { alert, history, user, setUser } = this.props

    updateUser(this.state, user)
      .then(() => setUser({
        id: user.id,
        email: this.state.email,
        username: this.state.username,
        votes: user.votes,
        token: user.token
      }))
      .then(() => alert({
        heading: 'Change User Success',
        message: messages.changeUserSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ password: '', email: '', username: '' })
        alert({
          heading: 'Update User Failed',
          message: messages.changeUserFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { password, email, username } = this.state

    return (
      <div className="popup2">
        <div className="mt-3 p-4">
          <h3>Update Profile</h3>
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
            <Form.Group controlId="username">
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

export default withRouter(UpdateUser)
