export interface StarStat {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export interface ChartData {
  labels: string[]
  values: number[]
}

export interface HistoryItem {
  date: string
  user: string
  repo: string
}
