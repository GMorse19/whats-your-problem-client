import React, { useState, useEffect } from 'react'
import { Redirect, withRouter, Prompt } from 'react-router-dom'
// import axios from 'axios'

// import apiUrl from '../../../apiConfig'
import ProblemForm from './ProblemForm'
import { showProblem, patchProblem, deleteProblem } from '../../../api/problem'

const ProblemUpdate = (props) => {
  const [prompt, setPrompt] = useState(false)
  const [problem, setProblem] = useState({
    name: '',
    content: '',
    hint: '',
    solution: '',
    category: '',
    answer: '',
    rating: ''
  })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showProblem(props.match.params.id, setProblem)
  }, [])

  const handleChange = event => {
    event.persist()
    setProblem(problem => ({ ...problem, [event.target.name]: event.target.value }))
  }

  const handleDelete = event => {
    setPrompt(true)
    deleteProblem(props)
  }

  const handleSubmit = event => {
    setPrompt(true)
    event.preventDefault()
    patchProblem(props, problem, setUpdated)
  }

  if (updated) {
    return <Redirect to={`/problems/${props.match.params.id}`} />
  }

  return (
    <div>
      <Prompt
        when={!prompt}
        message="Are you sure you want to leave?"
      />
      <ProblemForm
        props={props}
        problem={problem}
        handleDelete={handleDelete}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`#home/${props.match.params.id}`}
      />
    </div>
  )
}

export default withRouter(ProblemUpdate)
