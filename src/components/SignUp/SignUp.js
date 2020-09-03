import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'

import { signUp, signIn, checkname, checkemail } from '../../api/auth'
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
      open: false,
      emailAvail: false,
      emailValid: false,
      emailVal: false,
      username: '',
      usernameVal: false,
      usernameLength: false,
      usernameTaken: false,
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
    this.setState({ usernameVal: usernameTest(this.state.username, this.state.usernameTaken) })
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
    if (event.target.name === 'username') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => checkname(this.state.username)
        .then(res => this.setState({ usernameTaken: res.data }))
        .then(() => { this.checkValid() }))
    } else if (event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => checkemail(this.state.email)
        .then(res => this.setState({ emailAvail: res.data }))
        .then(() => { this.checkValid() }))
    } else {
      this.setState({
        [event.target.name]: event.target.value
      }, () => { this.checkValid() })
    }
  }

  onHover = (prevState) => {
    setTimeout(() => this.setState({ open: !prevState }), 1000)
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
      open,
      emailAvail,
      emailValid,
      username,
      usernameLength,
      password,
      passwordConfirmation,
      submit,
      emailVal,
      usernameVal,
      usernameTaken,
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

              <img
                src='red-x.svg'
                className='red-x'
                onMouseEnter={() => this.onHover(this.state.open)}
                onMouseLeave={() => this.onHover(this.state.open)}
              />
              {open && <div>Hello</div>}

              <Form.Text className={!emailValid ? 'is-invalid' : 'is-valid'}>
                {submit && !emailVal && signUpMessages.email}
                {submit && (emailValid ? signUpMessages.checked : signUpMessages.redX)}
              </Form.Text>
              <Form.Text className={emailAvail ? 'is-invalid' : 'is-valid'}>
                {submit && !emailVal && signUpMessages.emailAvail}
                {submit && (!emailAvail ? signUpMessages.checked : signUpMessages.redX)}
              </Form.Text>
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

              <img src='red-x.svg' className='red-x'/>

              <Form.Text className={!usernameLength ? 'is-invalid' : 'is-valid'}>
                {submit && !usernameVal && signUpMessages.username}
                {submit && !usernameVal && (usernameLength ? signUpMessages.checked : signUpMessages.redX)}
              </Form.Text>
              <Form.Text className={usernameTaken ? 'is-invalid' : 'is-valid'}>
                {submit && !usernameVal && signUpMessages.usernameTaken}
                {submit && !usernameVal && (!usernameTaken ? signUpMessages.checked : signUpMessages.redX)}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  className={submit && !passwordVal ? 'account-info-signup-red password input' : 'account-info-signup password input'}
                  name="password"
                  value={password.value}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  maxLength="20"
                />

                <img src='red-x.svg' className='red-x'/>

                <InputGroup.Append>{submit && !passwordVal &&
                <Dropdown>
                  <Dropdown.Toggle style={{ borderRadius: '0px 24px 24px 0px' }} variant={!passwordVal ? 'danger' : 'success'} id="dropdown-basic">
                  </Dropdown.Toggle>

                  <Dropdown.Menu alignRight className='drop-menu'>
                    <Dropdown.Item className={!this.state.passwordLength ? 'is-invalid' : 'is-valid'}>{!passwordVal && signUpMessages.passwordLength}{this.state.passwordLength ? signUpMessages.checked : signUpMessages.redX}</Dropdown.Item>
                    <Dropdown.Item className={!this.state.passwordCapital ? 'is-invalid' : 'is-valid'}>{!passwordVal && signUpMessages.passwordCapital }{this.state.passwordCapital ? signUpMessages.checked : signUpMessages.redX}</Dropdown.Item>
                    <Dropdown.Item className={!this.state.passwordSpecial ? 'is-invalid' : 'is-valid'}>{!passwordVal && signUpMessages.passwordSpecial }{this.state.passwordSpecial ? signUpMessages.checked : signUpMessages.redX}</Dropdown.Item>
                    <Dropdown.Item className={!this.state.passwordLower ? 'is-invalid' : 'is-valid'}>{!passwordVal && signUpMessages.passwordLower}{this.state.passwordLower ? signUpMessages.checked : signUpMessages.redX}</Dropdown.Item>
                    <Dropdown.Item className={!this.state.passwordNumber ? 'is-invalid' : 'is-valid'}>{!passwordVal && signUpMessages.passwordNumber}{this.state.passwordNumber ? signUpMessages.checked : signUpMessages.redX}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                }
                </InputGroup.Append>
              </InputGroup>
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

              <img src='red-x.svg' className='red-x'/>

              <Form.Text className={!passwordConfirmationVal ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordConfirmationVal && signUpMessages.passwordConfirmation }
                {submit && passwordConfirmationVal && signUpMessages.checked}
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
