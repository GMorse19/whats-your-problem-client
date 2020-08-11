// create an array of problem objects that match search query
export const filteredProblems = (option, problems, fil) => {
  option ? problems.filter(problem => fil.includes(problem.name))
    : problems.filter(problem => fil.includes(problem.category))
}
