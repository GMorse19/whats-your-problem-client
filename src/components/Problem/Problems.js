import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

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
      {<a
        className="box"
        as={'a'}
        href={`#/problems/${problem.id}`}>
        <p
          className="popup"
          style={{ color: 'black', margin: '5px', textAlign: 'center', backgroundColor: '#c2760b' }}>
          {problem.name}
          <br/>
          <br/>
          Category: {problem.category}
          <br/>
          <br/>
          Created by - {problem.user.email}
        </p>
      </a>}
    </div>
  ))

  return (
    <div className="">
      <h1 style={{ textAlign: 'center' }}>Choose your problem!</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Col className="">{problemsJsx}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Problems)
