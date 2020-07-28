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

export const deleteProblem = (props) => {
  axios({
    url: `${apiUrl}/problems/${props.match.params.id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${props.user.token}`
    }
  })
    .then(() => {
      props.alert({ heading: 'Success', message: 'You deleted a problem', variant: 'success' })
      props.history.push('/problems')
    })
    .catch(() => {
      props.alert({ heading: 'Uh Oh!', message: 'You did not delete a problem', variant: 'warning' })
    })
}

export const patchProblem = (props, problem, setUpdated) => {
  axios({
    url: `${apiUrl}/problems/${props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${props.user.token}`
    },
    data: { problem }
  })
    .then(response => {
      props.alert({ heading: 'Success', message: 'You updated a problem', variant: 'success' })
      setUpdated(true)
      props.history.push('/problems')
    })
    .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
}
