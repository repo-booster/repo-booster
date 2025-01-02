export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/', '/login', '/signup']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired) {
    return navigateTo('/login')
  }
})
