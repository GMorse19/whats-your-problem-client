import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
// import ComponentToPrint from './ComponentToPrint'

class ComponentToPrint extends React.Component {
  constructor (props) {
    super()
    console.log(props)
    this.state = {
      title: props.title,
      content: props.content
    }
  }

  render () {
    console.log(this.state.title)
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h6>{this.state.content}</h6>
      </div>
    )
  }
}

const Example = (props) => {
  const componentRef = useRef()
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint title={props.title} content={props.content} ref={componentRef} />
    </div>
  )
}

export default Example
