export interface Milestone {
  id: string
  title: string
  description: string
  status: 'planned' | 'in-progress' | 'completed'
  current: boolean
  targetDate?: string
  tasks: Task[]
  contributors: Contributor[]
}

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Contributor {
  id: string
  name: string
  avatar: string
}

export interface OpenRole {
  id: string
  title: string
  description: string
  skills: string[]
}

export interface ProjectStats {
  label: string
  value: string
}
