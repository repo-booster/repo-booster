export default defineEventHandler(async (event) => {
  const { keyword } = getQuery(event)
  const apiKey = process.env.SEMRUSH_API_KEY
  const response = await $fetch(`https://api.semrush.com/?type=phrase_all&key=${apiKey}&phrase=${keyword}&database=us`)
  return response
})
