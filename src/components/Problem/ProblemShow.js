import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Problem = props => {
  const [problem, setProblem] = useState(null)
  const userId = props.user ? props.user_id : null
  useEffect(() => {
    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setProblem(res.data.problem))
      .catch(console.error)
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/problems/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a problem', variant: 'success' })
        props.history.push('/problems')
      })
      .catch(() => {
        props.alert({ heading: 'Uh Oh!', message: 'You did not delete a problem', variant: 'warning' })
      })
  }

  if (!problem) {
    return <p>Loading...</p>
  }
  console.log(problem)
  return (
    <div className="problem-board">
      <h1>{problem.name}</h1>
      <h4>Content: {problem.content}</h4>
      <h6>Category: {problem.category}</h6>
      <h6>ID: {problem.id}</h6>
      <h6>User: {problem.user.email}</h6>
      <div>
        {userId === problem.user_id && <Button
          href={`#problems/${props.match.params.id}/update`}
          variant="primary"
          className="mr-2"
          problem={problem}
          props={props}>
          Update
        </Button>}
        {userId === problem.user_id && <Button
          onClick={handleDelete}
          className="btn btn-danger">
          delete
        </Button>}
      </div>
    </div>
  )
}

export default withRouter(Problem)
