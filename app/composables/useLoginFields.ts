export function useLoginFields() {
  const fields = [{
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'email'
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your secret access code'
  }]

  return {
    fields
  }
}
