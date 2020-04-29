import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Search = props => {
  const [problems, setProblems] = useState([])
  const [filtered, setFiltered] = useState([])

  const handleChange = (e) => {
    setProblems(mapArray)
    console.log(filtered)
    console.log(problems)
    // Variable to hold the original version of the list
    let currentList = []
    // Variable to hold the filtered list before putting into state
    let newList = []

    // If the search bar isn't empty
    if (e.target.value !== '') {
      // Assign the original list to currentList
      currentList = problems

      // Use .filter() to determine which problems should be displayed
      // based on the search terms
      newList = currentList.filter(problem => {
        // change current problem to lowercase
        const lc = problem.toLowerCase()
        // change search term to lowercase
        const filter = e.target.value.toLowerCase()
        // check to see if the current list problem includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter)
      })
    } else {
      // If the search bar is empty, set newList to original task list
      newList = problems
    }
    // Set the filtered state based on what our rules added to newList
    setFiltered(newList)
  }

  const handleSubmit = event => {
    console.log(filtered)
    event.preventDefault()

    // axios({
    //   url: `${apiUrl}/problems/${props.match.params.id}`,
    //   method: 'PATCH',
    //   headers: {
    //     'Authorization': `Token token=${props.user.token}`
    //   },
    //   data: { problem }
    // })
    //   .then(response => {
    //     props.alert({ heading: 'Success', message: 'You updated a problem', variant: 'success' })
    //     setUpdated(true)
    //     props.history.push('/problems')
    //   })
    //   .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  const mapArray = props.problems.map(problem => (
    problem.name
  ))

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="">
          <Form.Label className="" htmlFor="name">Search</Form.Label>
          <Form.Control
            type="text"
            autoComplete='on'
            placeholder="Search..."
            name="search"
            onChange={handleChange}
            className=""
            maxLength="33"
          />
        </Form.Group>
        <Button className='submit-button' type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default Search