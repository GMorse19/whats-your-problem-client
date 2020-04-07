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
        style={{ textDecoration: 'none' }}
        className="box"
        as={'a'}
        href={`#/problems/${problem.id}`}>
        <Col>
          <div
            className="popup"
            style={{ wordWrap: 'break-word', color: 'black', margin: '5px', textAlign: 'center', backgroundColor: '#c2760b', overflowY: 'scroll' }}>
            <h2 style={{ fontFamily: 'Righteous', overflow: 'hidden' }}>{problem.name}</h2>
            <br/>
              Created by - {problem.user.email}
            <br/>
            <br/>
            <h3 style={{ fontFamily: 'Pacifico' }}>{problem.category}</h3>
          </div>
        </Col>
      </a>}
    </div>
  ))

  return (
    <div className="">
      <h1 style={{ textAlign: 'center', fontFamily: 'Righteous' }}>Our Problems.</h1>
      <Container>
        <Row className="justify-content-md-center">
          {problemsJsx}
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Problems)
