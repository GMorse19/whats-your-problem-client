import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Search from '../Search/Search'

import './Problem.scss'

const Problems = props => {
  const [problems, setProblems] = useState([])
  const [filter, setFilter] = useState('')
  const [fil, setFil] = useState([])

  const find = (arr) => {
    setFil(arr)
  }

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

  const lowercasedFilter = filter.toLowerCase()

  const nameData = problems.filter(problem => problem.name)

  const filteredData = nameData.map(problem => problem.name.toLowerCase().includes(lowercasedFilter))

  for (let i = 0; i < filteredData.length; i++) {
    if (filteredData[i] === true) {
      fil.push(nameData[i].name)
    }
  }

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

  const filteredProblems = problems.filter(problem => fil.includes(problem.name))

  console.log(filteredProblems)
  console.log(problems)

  const problemsJsx = filteredProblems.map(problem => (
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
              <div className='user-email'>
                <p>- {problem.user.email}</p>
              </div>
              <div className='problem-category'>
                <p>{problem.category}</p>
              </div>
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
      <Search
        problems={problems}
        fil={fil}
        find={find}
        setFilter={setFilter}
      />
      <h1 style={{ textAlign: 'center', fontFamily: 'Righteous' }}>Select your Problem.</h1>
      <Container>
        <Row className="justify-content-center">
          {problemsJsx}
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Problems)
