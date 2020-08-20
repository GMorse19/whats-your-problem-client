export const checkValid = ({ state, setState }) => {
  console.log(state)
  const re = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$!%&*(),.?":{}|<>^+=])(.{8,15})$/
  if (state.email.includes('@')) {
    setState({ emailVal: true })
  }
  if (state.username.length >= 6) {
    setState({ usernameVal: true })
  }
  if (re.test(state.password)) {
    setState({ passwordVal: true })
  }
  if (state.passwordConfirmation === state.password) {
    setState({ passwordConfirmationVal: true })
  }
}
