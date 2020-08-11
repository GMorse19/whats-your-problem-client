import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import { mathImages } from './mathImages'

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
                {(problem.category === 'division') && <Image width={250} src={mathImages[1]} />}
                {(problem.category === 'addition') && <Image width={250} src={mathImages[0]} />}
                {(problem.category === 'subtraction') && <Image width={250} src={mathImages[2]} />}
                {(problem.category === 'multiplication') && <Image width={250} src={mathImages[3]} />}
                {(problem.category !== 'division') &&
                (problem.category !== 'addition') &&
                (problem.category !== 'subtraction') &&
                (problem.category !== 'multiplication') &&
                <Image width={250} src={mathImages[4]} />}
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
