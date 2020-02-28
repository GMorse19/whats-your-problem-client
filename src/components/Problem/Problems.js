import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom'

import './Problem.scss'

const Problems = props => {
  const [problems, setProblems] = useState([])
  // const userId = props.user.id

  useEffect(() => {
    axios({
      url: `${apiUrl}/problems`,
      method: 'GET'
    })
      .then(response => {
        setProblems(response.data.problems)
      })
      .then(() => props.alert({ heading: 'Success', message: 'You got Problems', variant: 'success' }))
      .catch(console.error)
  }, [])

  const problemsJsx = problems.map(problem => (
    <div key={problem.id}>
      {<Button
        className="box list inner-shadow"
        as={'a'}
        href={`#/problems/${problem.id}`}>
        <p
          className="text-shadow">
          {problem.name}
          <br/>
          Category: {problem.category}
          <br/>
          Created by - {problem.user.email}
        </p>
      </Button>}
    </div>
  ))

  return (
    <div className="">
      <h1 style={{ textAlign: 'center' }}>Choose a problem to UPDATE or DELETE.</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box">{problemsJsx}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Problems)
