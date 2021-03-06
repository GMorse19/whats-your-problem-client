import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import UpdateUser from '../UpdateUser/UpdateUser'
import Problems from '../Problem/Problems.js'
import ProblemCreate from '../Problem/ProblemCreate/ProblemCreate'
import ProblemShow from '../Problem/ProblemShow.js'
import ProblemUpdate from '../Problem/ProblemUpdate/ProblemUpdate'
import Home from '../Home/Home.js'
import Generator from '../Generator/Generator'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state
    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route user={user} exact path='/' render={() => (
            <Home alert={this.alert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-user' render={() => (
            <UpdateUser alert={this.alert} user={user} setUser={this.setUser}/>
          )} />
          <Route user={user} exact path='/problems' render={() => (
            <Problems alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/problem-create' render={() => (
            <ProblemCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/problems/:id/update' render={() => (
            <ProblemUpdate alert={this.alert} user={user} />
          )} />
          <Route user={user} exact path='/problems/:id' render={() => (
            <ProblemShow alert={this.alert} user={user} />
          )} />
          <Route user={user} path='/generator' render={() => (
            <Generator alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
