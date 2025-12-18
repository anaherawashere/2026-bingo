export type Difficulty = 'easy' | 'medium' | 'hard'

export type Cell = {
  id: string
  text: string
  details?: string
  difficulty: Difficulty
  themeRow?: string
  done: boolean
  dateDone?: string
  link?: string
}

export type Board = {
  id: string
  title: string
  year: number
  size: 5
  cells: Cell[] // length 25
  updatedAt: string
}
