import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

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
export const problemsJsx = (arr) => {
  return (
    arr.map(problem => (
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
  )
}
