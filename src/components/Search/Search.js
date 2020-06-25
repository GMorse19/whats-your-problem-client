import React from 'react'
import { withRouter } from 'react-router-dom'

const Search = ({ find, setFilter }) => {
  const handleChange = event => {
    event.persist()
    find(fil)
    setFilter(event.target.value)
  }

  // empty array to set callback find()
  const fil = []

  return (
    <div>
      <input onChange={handleChange} />
    </div>
  )
}

export default withRouter(Search)
