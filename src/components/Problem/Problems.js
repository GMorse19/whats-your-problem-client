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
  const [option, setOption] = useState(true)

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

  // callback for setting filter for search query
  const find = (arr) => {
    setFil(arr)
  }

  console.log(option)

  // change search query to lower case
  const lowercasedFilter = filter.toLowerCase()
  // filter names or cateogories from problem object
  const nameData = problems.filter(problem => problem.name)
  const catData = problems.filter(problem => problem.category)
  // map problem names or categories to see if they match searc query
  const filteredData = nameData.map(problem => problem.name.toLowerCase().includes(lowercasedFilter))
  const filteredCata = catData.map(problem => problem.category.toLowerCase().includes(lowercasedFilter))
  // loop over queries and an create array for display
  if (option) {
    for (let i = 0; i < filteredData.length; i++) {
      if (filteredData[i] === true) {
        fil.push(nameData[i].name)
      }
    }
  } else {
    for (let i = 0; i < filteredCata.length; i++) {
      if (filteredCata[i] === true) {
        fil.push(catData[i].category)
      }
    }
  }

  // create an array of problem objects that match search query
  const filteredProblems = option ? problems.filter(problem => fil.includes(problem.name)) : problems.filter(problem => fil.includes(problem.category))

  // images for problem categories
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

  // create display for problem cards
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
                <p>- {problem.user.username ? problem.user.username : problem.user.email}</p>
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

  // check for problems before display
  if (!problems) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>)
  }

  return (
    <div className="">
      <div className='search-bar'>
        <Search
          find={find}
          setFilter={setFilter}
          setOption={setOption}
          option={option}
        />
      </div>
      <div className='top'>
        <h1 style={{ textAlign: 'center', fontFamily: 'Righteous' }}>Select your Problem.</h1>
        <Container>
          <Row className="justify-content-center">
            {problemsJsx}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default withRouter(Problems)
