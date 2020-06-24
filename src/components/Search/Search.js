import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

const Search = ({ find, problems }) => {
  const [filter, setFilter] = useState('')

  const handleChange = event => {
    event.persist()
    setFilter(event.target.value)
    find(fil)
  }

  const lowercasedFilter = filter.toLowerCase()

  const fil = []

  // Object.filter = (obj, predicate) =>
  //   Object.keys(obj)
  //     .filter(key => predicate(obj[key]))
  //     .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})

  // const filteredData = Object.filter(data, buddy => buddy.name.includes(lowercasedFilter))
  const nameData = problems.filter(problem => problem.name)

  const filteredData = nameData.map(problem => problem.name.toLowerCase().includes(lowercasedFilter))

  for (let i = 0; i < filteredData.length; i++) {
    if (filteredData[i] === true) {
      fil.push(nameData[i].name)
    }
  }

  return (
    <div>
      <input value={filter} onChange={handleChange} />
      {fil.map(item => (
        <div key={item}>
          <div>
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(Search)
