import apiUrl from '../apiConfig'
import axios from 'axios'

export const showLikes = (id, token, setFlag) => {
  axios({
    url: `${apiUrl}/problems/${id}/likes`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${token}`
    }
  })
    .then(res => setFlag(res.data[0]))
    .catch(console.error)
}

export const like = (event, id, token) => {
  axios({
    url: `${apiUrl}/problems/${id}/like`,
    method: 'PUT',
    headers: {
      'Authorization': `Token token=${token}`
    }
  })
}

export const unlike = (event, id, token) => {
  axios({
    url: `${apiUrl}/problems/${id}/unlike`,
    method: 'PUT',
    headers: {
      'Authorization': `Token token=${token}`
    }
  })
}
