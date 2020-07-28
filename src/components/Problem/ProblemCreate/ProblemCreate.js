import React, { useState } from 'react'
import { withRouter, Prompt } from 'react-router-dom'

import { postProblem } from '../../../api/problem'
import ProblemForm from '../ProblemForm/ProblemForm'

const ProblemCreate = props => {
  const [prompt, setPrompt] = useState(false)
  const [problem, setProblem] = useState({
    name: '',
    content: '',
    hint: '',
    solution: '',
    category: '',
    answer: '',
    rating: '' })

  const handleChange = event => {
    event.persist()
    setProblem({ ...problem, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    setPrompt(true)
    event.preventDefault()
    postProblem(props, problem)
  }

  return (
    <div className="problem-board">
      <Prompt
        when={!prompt}
        message="Are you sure you want to leave?"
      />
      <ProblemForm
        problem={problem}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(ProblemCreate)
