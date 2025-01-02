export interface Update {
  id: string
  date: string
  type: string
  title: string
  description: string
  tags: string[]
  repository: string
}

export interface ContentType {
  name: string
  icon: string
  count: number
  percentage: number
}

export interface UpdateStats {
  label: string
  value: string
}
