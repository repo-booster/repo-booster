export function useAuthProviders() {
  const providers = [
    {
      label: 'Launch with GitHub',
      icon: 'i-simple-icons-github',
      color: 'white' as const,
      click: () => {
        console.log('Redirecting to GitHub space dock')
      }
    },
    {
      label: 'Launch with Bitbucket',
      icon: 'i-simple-icons-bitbucket',
      color: 'white' as const,
      click: () => {
        console.log('Redirecting to Bitbucket space dock')
      }
    },
    {
      label: 'Launch with GitLab',
      icon: 'i-simple-icons-gitlab',
      color: 'white' as const,
      click: () => {
        console.log('Redirecting to GitLab space dock')
      }
    }
  ]

  return {
    providers
  }
}
