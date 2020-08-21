export const emailTest = (email) => {
  return email.includes('@')
}
export const usernameTest = (username) => {
  return username.length >= 6
}
export const passwordTest = (password) => {
  const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[@#$!%&*(),.?":{}|<>^+=])(?!.*[^a-zA-Z0-9@#$!%&*(),.?":{}|<>^+=])(.{8,35})$/
  return re.test(password)
}
export const passwordCapital = (password) => {
  const re = /^(?=.*[A-Z])/
  return re.test(password)
}
export const passwordSpecial = (password) => {
  const re = /^(?=.*[@#$!%&*(),.?":{}|<>^+=])/
  return re.test(password)
}
export const passwordNumber = (password) => {
  const re = /^(?=.*[0-9])/
  return re.test(password)
}
export const passwordLength = (password) => {
  return password.length >= 8
}
export const passwordConfirmationTest = (pw, pw2) => {
  return pw === pw2
}
