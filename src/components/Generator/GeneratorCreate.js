import React, { useState } from 'react'
// import axios from 'axios'
import { withRouter } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
import GeneratorForm from './GeneratorForm.js'

const GeneratorCreate = props => {
  const [generator, setGenerator] = useState({
    attr1: '',
    attr2: '',
    animal: ''
  })
  const [answer, setAnswer] = useState({ sentence: '' })

  const handleChange = event => {
    event.persist()
    setGenerator({ ...generator, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('handle submit!!' + generator.attr1)
    const content = 'There once was a ' + generator.animal + ' named ' + generator.attr1 + ' who loved to chase ' + generator.attr2
    setAnswer(content)

    console.log(answer)
  }
  console.log(answer)
  return (
    <div className="generator-board">
      <GeneratorForm
        generator={generator}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
      <h1>Answer:<br /> {[...answer]}</h1>
    </div>
  )
}

export default withRouter(GeneratorCreate)
