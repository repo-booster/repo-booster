interface Suggestion {
    type: 'success' | 'warning' | 'error'
    text: string
  }
  
  export interface ScanResults {
    score: number
    suggestions: Suggestion[]
  }
  
  export interface ScanOptions {
    includeMetadata: boolean
    checkLinks: boolean
    analyzeSEO: boolean
  }