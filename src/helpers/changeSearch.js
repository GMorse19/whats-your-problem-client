export const changeSearch = (letter, fil, problems, filter) => {
  // change search query to lower case
  const lowercasedFilter = filter.toLowerCase()
  const dataMap = problems.filter(problem => `problem.${letter}`)
  const filtered = dataMap.map(problem => letter === 'name'
    ? problem.name.toLowerCase().includes(lowercasedFilter)
    : problem.category.toLowerCase().includes(lowercasedFilter))
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === true) {
      letter === 'name'
        ? fil.push(dataMap[i].name)
        : fil.push(dataMap[i].category)
    }
  }
}
