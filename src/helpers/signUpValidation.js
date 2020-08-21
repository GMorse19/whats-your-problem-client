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
export const passwordConfirmationTest = (pw, pw2) => {
  return pw === pw2
}
