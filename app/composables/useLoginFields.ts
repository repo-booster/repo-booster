export function useLoginFields() {
  const fields = [{
    name: 'email',
    type: 'email',
    label: 'Space Email',
    placeholder: 'astronaut@space.station'
  }, {
    name: 'password',
    label: 'Access Code',
    type: 'password',
    placeholder: 'Enter your secret access code'
  }]

  return {
    fields
  }
}
