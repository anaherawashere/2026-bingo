import type { Board, Cell } from '../types'

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const createEmptyCell = (): Cell => ({
  id: makeId(),
  text: 'Click to add',
  details: '',
  difficulty: 'medium',
  themeRow: '',
  done: false,
})

export const createDefaultBoard = (year = 2026): Board => ({
  id: makeId(),
  title: `${year} Bingo`,
  year,
  size: 5,
  cells: Array.from({ length: 25 }, createEmptyCell),
  updatedAt: new Date().toISOString(),
})
