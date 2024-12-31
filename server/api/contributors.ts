import type { User, UserStatus } from '~/types'

const users: User[] = [{
  id: 1,
  name: '',
  email: '',
  avatar: {
    src: ''
  },
  status: 'subscribed',
  location: ''
}, {
  id: 2,
  name: '',
  email: '',
  avatar: {
    src: ''
  },
  status: 'unsubscribed',
  location: ''
}]

export default eventHandler(async (event) => {
  const { q, statuses, locations, sort, order } = getQuery(event) as { q?: string, statuses?: UserStatus[], locations?: string[], sort?: 'name' | 'email', order?: 'asc' | 'desc' }

  return users.filter((user) => {
    if (!q) return true

    return user.name.search(new RegExp(q, 'i')) !== -1 || user.email.search(new RegExp(q, 'i')) !== -1
  }).filter((user) => {
    if (!statuses?.length) return true

    return statuses.includes(user.status)
  }).filter((user) => {
    if (!locations?.length) return true

    return locations.includes(user.location)
  }).sort((a, b) => {
    if (!sort) return 0

    const aValue = a[sort]
    const bValue = b[sort]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })
})
