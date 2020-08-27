import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        username: credentials.username,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        identifier: credentials.identifier,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

export const updateUser = (credentials, user) => {
  return axios({
    url: apiUrl + '/update-user',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      credentials: {
        email: credentials.email,
        username: credentials.username
      }
    }
  })
}

// Check availability of username in API
export const checkname = (name) => {
  return axios({
    url: apiUrl + '/checkname',
    method: 'GET',
    params: {
      username: name
    }
  })
}

// Check availability of email in API
export const checkemail = (email) => {
  return axios({
    url: apiUrl + '/checkemail',
    method: 'GET',
    params: {
      email: email
    }
  })
}
