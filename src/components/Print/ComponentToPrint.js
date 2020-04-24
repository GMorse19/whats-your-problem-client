import React from 'react'

class ComponentToPrint extends React.Component {
  constructor (props) {
    super()
    console.log(props)
    this.state = {
      title: props.title,
      content: ''
    }
  }

  render () {
    console.log(this.state.title)
    return (
      <div>
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}

export default ComponentToPrint
