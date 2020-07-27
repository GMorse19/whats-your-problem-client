import axios from 'axios'
import apiUrl from '../apiConfig'

export const showProblem = (id, setProblem) => {
  return axios({
    url: `${apiUrl}/problems/${id}`,
    method: 'GET'
  })
    .then(res => setProblem(res.data.problem))
    .catch(console.error)
}
