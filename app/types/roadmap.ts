export type BadgeColor = 'green' | 'yellow' | 'red' | 'gray'

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

/**
 * Get the badge color based on task difficulty.
 * @param difficulty - The difficulty level of a task.
 * @returns A `BadgeColor` that represents the difficulty level.
 */
export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): BadgeColor {
  switch (difficulty) {
    case 'easy':
      return 'green'
    case 'medium':
      return 'yellow'
    case 'hard':
      return 'red'
    default:
      return 'gray'
  }
}
