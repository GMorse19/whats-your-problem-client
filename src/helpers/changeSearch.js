export const changeSearch = (letter, fil, problems, filter) => {
  // change search query to lower case
  const lowercasedFilter = filter.toLowerCase()
  // filter names or cateogories from problem object
  const dataMap = problems.filter(problem => `problem.${letter}`)
  // map problem names or categories to see if they match searc query
  const filtered = dataMap.map(problem => letter === 'name'
    ? problem.name.toLowerCase().includes(lowercasedFilter)
    : problem.category.toLowerCase().includes(lowercasedFilter))
  // loop over queries and an create array for display
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === true) {
      letter === 'name'
        ? fil.push(dataMap[i].name)
        : fil.push(dataMap[i].category)
    }
  }
}
