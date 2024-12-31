export default defineEventHandler(async (event) => {
  const { owner, repo, token: queryToken } = getQuery(event)

  // Use token from query or environment variable
  const token = queryToken || process.env.GITHUB_TOKEN

  const headers = token
    ? { Authorization: `token ${token}` }
    : {}

  const response = await $fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
  return response
})
