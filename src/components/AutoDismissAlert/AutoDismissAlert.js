import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { heading, message } = this.props
    return (
      <Alert
        dismissible
        style={{ backgroundColor: '#edbe6d' }}
        show={this.state.show}
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
