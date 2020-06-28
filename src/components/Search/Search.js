import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'

import './Search.scss'

const Search = ({ find, setFilter, setOption, option }) => {
  const handleChange = event => {
    event.persist()
    find(fil)
    setFilter(event.target.value)
  }

  const handleClick = () => {
    setOption(!option)
  }

  // empty array to set callback find()
  const fil = []

  return (
    <div className='search-wrapper'>
      <div style={{ display: 'flex', justifyContent: 'center', zIndex: '100' }}>
        <Tooltip title='Search by name or category' arrow leaveDelay={200} TransitionComponent={Zoom}>
          <Button className='search-button search-input' onClick={handleClick}>
          Search By
          </Button>
        </Tooltip>
        <Form.Group style={{ width: '50vw' }}>
          <Form.Control
            className='search-input search-info'
            onChange={handleChange}
            placeholder={option ? 'name' : 'category'}
          />
        </Form.Group>
      </div>
    </div>
  )
}

export default withRouter(Search)
