import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import ProblemCreateForm from './ProblemCreateForm.js'

const ProblemCreate = props => {
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
    event.preventDefault()

    axios({
      url: `${apiUrl}/problems`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { problem }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a problem', variant: 'success' })
        props.history.push(`problems/${response.data.problem.id}`)
      })
      .catch(console.error)
  }

  return (
    <div className="problem-board">
      <ProblemCreateForm
        problem={problem}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(ProblemCreate)
