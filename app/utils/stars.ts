// Star type definition
export interface Star {
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

// Utility functions for star generation
export const generateStar = (): Star => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.5 + 0.3,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2
})

export const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, generateStar)
}
