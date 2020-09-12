import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signUp, signIn, checkInfo } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import signUpMessages from './signUpMessages'
import {
  emailTest,
  emailValid,
  usernameTest,
  usernameLength,
  passwordTest,
  passwordLength,
  passwordCapital,
  passwordLower,
  passwordSpecial,
  passwordNumber,
  passwordConfirmationTest
} from '../../helpers/signUpValidation'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Signup.scss'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      openEmail: false,
      openPass: false,
      openUser: false,
      emailAvail: false,
      emailValid: false,
      emailVal: false,
      username: '',
      usernameVal: false,
      usernameLength: false,
      usernameAvail: false,
      identifier: '',
      submit: false,
      password: '',
      passwordVal: false,
      passwordLength: false,
      passwordCapital: false,
      passwordLower: false,
      passwordSpecial: false,
      passwordNumber: false,
      passwordConfirmation: '',
      passwordConfirmationVal: false,
      property: document.documentElement.style.setProperty('--border-show', 'none')
    }
  }

  checkValid = () => {
    this.setState({ emailVal: emailTest(this.state.email, this.state.emailAvail) })
    this.setState({ emailValid: emailValid(this.state.email) })
    this.setState({ usernameVal: usernameTest(this.state.username, this.state.usernameAvail) })
    this.setState({ usernameLength: usernameLength(this.state.username) })
    this.setState({ passwordVal: passwordTest(this.state.password) })
    this.setState({ passwordLength: passwordLength(this.state.password) })
    this.setState({ passwordCapital: passwordCapital(this.state.password) })
    this.setState({ passwordLower: passwordLower(this.state.password) })
    this.setState({ passwordSpecial: passwordSpecial(this.state.password) })
    this.setState({ passwordNumber: passwordNumber(this.state.password) })
    this.setState({ passwordConfirmationVal: passwordConfirmationTest(this.state.password, this.state.passwordConfirmation) })
  }

  handleChange = event => {
    const name = event.target.name

    this.setState({ [event.target.name]: event.target.value },
      (name === 'username' || name === 'email')
        ? () => checkInfo(this.state[name], name)
          .then(res => this.setState({ [`${name}Avail`]: res.data }))
          .then(() => { this.checkValid() })
          .catch(error => { console.error(error) }) : () => { this.checkValid() })
  }

  redX = <img
    src='red-x.svg'
    className='red-x'
    onMouseEnter={() => this.onHover(this.state.open)}
    onMouseLeave={() => this.onHover(this.state.open)}
  />

  greenCheck = <img
    src='green-check.png'
    className='green-check'
  />

  onHover = (prevState, state) => {
    if (state === 'openEmail') {
      this.setState({ openEmail: !prevState })
    } else if (state === 'openPass') {
      this.setState({ openPass: !prevState })
    } else if (state === 'openUser') {
      this.setState({ openUser: !prevState })
    }
  }

  onSignUp = event => {
    event.preventDefault()
    this.setState({
      identifier: this.state.email,
      submit: true })
    this.checkValid()
    this.setState({ property: document.documentElement.style.setProperty('--border-show', 'solid') })
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
    const {
      email,
      openPass,
      openUser,
      openEmail,
      emailAvail,
      emailValid,
      username,
      usernameLength,
      password,
      passwordConfirmation,
      submit,
      emailVal,
      usernameVal,
      usernameAvail,
      passwordVal,
      passwordConfirmationVal
    } = this.state
    return (
      <div className="popup2">
        <div className="mt-3 p-4">
          <h3>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="email" className="mt-4">
              <Form.Label>Email address</Form.Label><br />

              <Form.Control
                required
                autoComplete='off'
                className={!emailVal ? 'account-info-signup-red email input' : 'account-info-signup email input'}
                type="email"
                name="email"
                value={email.value}
                placeholder="Email"
                onChange={this.handleChange}
                maxLength="35"
              />
              {submit && <div className='image-div'><img
                src={!emailVal ? 'red-x.svg' : 'green-check.png'}
                className={!emailVal ? 'red-x' : 'green-check'}
                onMouseEnter={!emailVal ? () => this.onHover(this.state.openEmail, 'openEmail') : undefined}
                onMouseLeave={!emailVal ? () => this.onHover(this.state.openEmail, 'openEmail') : undefined}
              /></div>}
              {openEmail && <div className='error-message-div'>
                <div>{submit && !emailVal && !emailValid && signUpMessages.email}</div>
                <div>{submit && !emailVal && emailAvail && signUpMessages.emailAvail}</div>
              </div>}
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                className={!usernameVal ? 'account-info-signup-red username input' : 'account-info-signup username input'}
                name="username"
                value={username.value}
                type="username"
                placeholder="Username"
                onChange={this.handleChange}
                maxLength="20"
              />

              {submit && <div className='image-div'><img
                src={!usernameVal ? 'red-x.svg' : 'green-check.png'}
                className={!usernameVal ? 'red-x' : 'green-check'}
                onMouseEnter={!usernameVal ? () => this.onHover(this.state.openUser, 'openUser') : undefined}
                onMouseLeave={!usernameVal ? () => this.onHover(this.state.openUser, 'openUser') : undefined}
              /></div>}
              {openUser && <div className='error-message-div'>
                <div>{submit && !usernameVal && !usernameLength && signUpMessages.username}</div>
                <div>{submit && !usernameVal && usernameAvail && signUpMessages.usernameAvail}</div>
              </div>}

            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                className={submit && !passwordVal ? 'account-info-signup-red input' : 'account-info-signup input'}
                name="password"
                value={password.value}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                maxLength="20"
              />

              {submit && <div className='image-div'><img
                src={!passwordVal ? 'red-x.svg' : 'green-check.png'}
                className={!passwordVal ? 'red-x' : 'green-check'}
                onMouseEnter={!passwordVal ? () => this.onHover(this.state.openPass, 'openPass') : undefined}
                onMouseLeave={!passwordVal ? () => this.onHover(this.state.openPass, 'openPass') : undefined}
              /></div>}
              {openPass && <div className='error-message-div'>
                <div>{submit && !passwordVal && !this.state.passwordLength && signUpMessages.passwordLength}</div>
                <div>{submit && !passwordVal && !this.state.passwordCapital && signUpMessages.passwordCapital}</div>
                <div>{submit && !passwordVal && !this.state.passwordSpecial && signUpMessages.passwordSpecial}</div>
                <div>{submit && !passwordVal && !this.state.passwordLower && signUpMessages.passwordLower}</div>
                <div>{submit && !passwordVal && !this.state.passwordNumber && signUpMessages.passwordNumber}</div>
              </div>}

            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                className={!passwordConfirmationVal ? 'account-info-signup-red input' : 'account-info-signup input'}
                name="passwordConfirmation"
                value={passwordConfirmation.value}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              {submit && <div className='image-div'><img
                src={!passwordConfirmationVal ? 'red-x.svg' : 'green-check.png'}
                className={!passwordConfirmationVal ? 'red-x' : 'green-check'}
              /></div>}

              <Form.Text className={!passwordConfirmationVal ? 'is-invalid' : 'is-valid'}>
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
