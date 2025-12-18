import { useMemo } from 'react'
import './App.css'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import type { Board, Cell } from './types'
import { createDefaultBoard } from './utils/board'

const STORAGE_KEY = 'bingoBoard:v1'

const getIndex = (row: number, col: number, size: number) => row * size + col

const App = () => {
  const initialBoard = useMemo(() => createDefaultBoard(2026), [])
  const [board, setBoard] = useLocalStorageState<Board>(
    STORAGE_KEY,
    initialBoard
  )

  const updateCell = (cellId: string, patch: Partial<Cell>) => {
    setBoard({
      ...board,
      updatedAt: new Date().toISOString(),
      cells: board.cells.map((cell) =>
        cell.id === cellId ? { ...cell, ...patch } : cell
      ),
    })
  }

  const toggleDone = (cell: Cell) => {
    updateCell(cell.id, { done: !cell.done })
  }

  return (
    <main className="page">
      <header className="header">
        <div>
          <h1 className="title">{board.title}</h1>
          <p className="meta">
            {board.cells.filter((c) => c.done).length}/25 complete
          </p>
        </div>

        <button
          className="btn"
          type="button"
          onClick={() => setBoard(createDefaultBoard(2026))}>
          Reset board
        </button>
      </header>

      <section className="grid" aria-label="Bingo board">
        {Array.from({ length: board.size }).map((_, row) =>
          Array.from({ length: board.size }).map((_, col) => {
            const idx = getIndex(row, col, board.size)
            const cell = board.cells[idx]

            return (
              <button
                key={cell.id}
                className={`cell ${cell.done ? 'done' : ''}`}
                type="button"
                onClick={() => toggleDone(cell)}>
                <span className="cellText">{cell.text}</span>
              </button>
            )
          })
        )}
      </section>
    </main>
  )
}

export default App
