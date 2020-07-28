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

export const postProblem = (props, problem) => {
  axios({
    url: `${apiUrl}/problems`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${props.user.token}`
    },
    data: { problem }
  })
    .then(response => {
      props.alert({ heading: 'Success', message: 'You created a problem', variant: 'success' })
      props.history.push(`problems/${response.data.problem.id}`)
    })
    .catch(console.error)
}
