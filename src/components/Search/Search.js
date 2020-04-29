import React, { useState } from 'react'

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

  const mapArray = props.problems.map(problem => (
    problem.name
  ))

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} className="input" placeholder="Search..." />
      </div>
    </div>
  )
}

export default Search
