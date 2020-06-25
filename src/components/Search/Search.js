import React from 'react'
import { withRouter } from 'react-router-dom'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

const Search = ({ find, problems, setFilter }) => {
  // const [filter, setFilter] = useState('')
  // const [fil, setFil] = useState([])

  const handleChange = event => {
    event.persist()
    find(fil)
    setFilter(event.target.value)
  }

  // const lowercasedFilter = filter.toLowerCase()

  const fil = []

  // Object.filter = (obj, predicate) =>
  //   Object.keys(obj)
  //     .filter(key => predicate(obj[key]))
  //     .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})

  // const filteredData = Object.filter(data, buddy => buddy.name.includes(lowercasedFilter))
  // const nameData = problems.filter(problem => problem.name)

  // const filteredData = nameData.map(problem => problem.name.toLowerCase().includes(lowercasedFilter))

  // for (let i = 0; i < filteredData.length; i++) {
  //   if (filteredData[i] === true) {
  //     fil.push(nameData[i].name)
  //   }
  // }

  return (
    <div>
      <input onChange={handleChange} />
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
