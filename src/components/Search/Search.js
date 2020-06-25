import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'

import './Search.scss'

const Search = ({ find, setFilter }) => {
  const handleChange = event => {
    event.persist()
    find(fil)
    setFilter(event.target.value)
  }

  // empty array to set callback find()
  const fil = []

  return (
    <div className='search-wrapper'>
      <div style={{ display: 'flex', justifyContent: 'center', zIndex: '100' }}>
        <Form.Group style={{ width: '50vw' }}>
          <Form.Control
            className='search-input search-info'
            onChange={handleChange}
            placeholder='search'
          />
        </Form.Group>
      </div>
    </div>
  )
}

export default withRouter(Search)
