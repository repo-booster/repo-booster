export interface ChartData {
  labels: string[]
  values: number[]
}

export interface ChartPeriod {
  label: string
  value: '7d' | '30d' | '90d' | '1y'
}
