export function useAuthValidation() {
  const validate = (state: any) => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Space email required for identification' })
    if (!state.password) errors.push({ path: 'password', message: 'Access code required for entry' })
    return errors
  }

  return {
    validate
  }
}
