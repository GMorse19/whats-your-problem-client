import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
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
      .catch(console.error)
  }, [])

  const division = <Image
    src='division.png'
    width={ 250 }
  />

  const addition = <Image
    src='addition.png'
    width={ 250 }
  />

  const subtraction = <Image
    src='subtraction.png'
    width={ 250 }
  />

  const times = <Image
    src='times.png'
    width={ 250 }
  />

  const other = <Image
    src='symbols.png'
    width={ 250 }
  />

  const problemsJsx = problems.map(problem => (
    <div key={problem.id}>
      {<a
        style={{ textDecoration: 'none' }}
        className="box"
        as={'a'}
        href={`#/problems/${problem.id}`}>
        <Col>
          <div className="popup problems-list">
            <div className='category-image'>
              {(problem.category === 'division') && division}
              {(problem.category === 'addition') && addition}
              {(problem.category === 'subtraction') && subtraction}
              {(problem.category === 'multiplication') && times}
              {(problem.category !== 'division') &&
              (problem.category !== 'addition') &&
              (problem.category !== 'subtraction') &&
              (problem.category !== 'multiplication') &&
              other}
            </div>
            <div className='title-box'>
              <h2 className='title'>
                {problem.name}
              </h2>
            </div>
            <div className='problem-info'>
              <p>Creator: {problem.user.email}</p>
              <p>Category: {problem.category}</p>
            </div>
          </div>
        </Col>
      </a>}
    </div>
  ))

  if (!problems) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>)
  }

  return (
    <div className="">
      <h1 style={{ textAlign: 'center', fontFamily: 'Righteous' }}>Select your Problem.</h1>
      <Container>
        <Row className="justify-content-md-center">
          {problemsJsx}
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Problems)
