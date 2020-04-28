import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'

import Button from 'react-bootstrap/Button'

class ComponentToPrint extends React.Component {
  constructor (props) {
    super()

    this.state = {
      title: props.title,
      content: props.content,
      user: props.user
    }
  }

  render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Righteous' }}>Whats Your Problem?</h1>
        <p>https://gmorse19.github.io/whats-your-problem-client/</p>
        <hr />
        <h2>{this.state.title}</h2>
        <br />
        <h3>{this.state.content}</h3>
        <br />
        <div style={{ float: 'right' }}>
          <p>
            Created by: {this.state.user}
          </p>
        </div>
      </div>
    )
  }
}

const Example = (props) => {
  const componentRef = useRef()
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button
          style={{ margin: '10px', backgroundColor: '#4a4a4a', border: 'none' }}
        >
          Print
        </Button>}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <ComponentToPrint
          title={props.title}
          user={props.user}
          content={props.content}
          ref={componentRef} />
      </div>
    </div>
  )
}

export default Example
