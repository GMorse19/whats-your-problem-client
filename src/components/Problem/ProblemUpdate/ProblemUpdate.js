import React, { useState, useEffect } from 'react'
import { Redirect, withRouter, Prompt } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../../apiConfig'
import ProblemForm from './ProblemForm'

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
    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setProblem(res.data.problem))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setProblem(problem => ({ ...problem, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    setPrompt(true)
    event.preventDefault()

    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { problem }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a problem', variant: 'success' })
        setUpdated(true)
        props.history.push('/problems')
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
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
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`#home/${props.match.params.id}`}
      />
    </div>
  )
}

export default withRouter(ProblemUpdate)
