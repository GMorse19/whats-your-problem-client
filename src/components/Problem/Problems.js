import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Search from '../Search/Search'
import { getProblems } from '../../api/problem'
import { changeSearch } from '../../helpers/changeSearch'
import { problemsJsx } from '../../helpers/problemsJsx'

import './Problem.scss'

const Problems = props => {
  const [problems, setProblems] = useState([])
  const [filter, setFilter] = useState('')
  const [fil, setFil] = useState([])
  const [option, setOption] = useState(true)

  useEffect(() => {
    getProblems(setProblems)
  }, [])

  // callback for setting filter for search query
  // as query is entered
  const find = (arr) => {
    setFil(arr)
  }

  // Check the state of the search filter
  option ? changeSearch('name', fil, problems, filter) : changeSearch('category', fil, problems, filter)

  // create an array of problem objects that match search query
  const filteredProblems = option ? problems.filter(problem => fil.includes(problem.name))
    : problems.filter(problem => fil.includes(problem.category))

  // List of problems created with map helper.
  const problemsList = problemsJsx(filteredProblems)

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
            {problemsList}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default withRouter(Problems)
