// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useState} from 'react'

function Board() {
  const [states, setStates] = useState([Array(9).fill(null)])
  const [step, setStep] = useState(states.length - 1)
  // const [squares, setSquares] = useState(() => Array(9).fill(null))

  let nextValue = calculateNextValue(states[step])
  let winner = calculateWinner(states[step])
  let status = calculateStatus(winner, states[step], nextValue)

  function selectSquare(square) {
    if (winner || states[step][square]) {
      return
    }

    const squaresCopy = [...states[step]]

    setStep(step => step + 1)

    squaresCopy[square] = nextValue

    setStates([...states, squaresCopy])
  }

  function restart() {
    // setSquares(Array(9).fill(null))
    setStep(0)
    setStates([Array(9).fill(null)])
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {states[step][i]}
      </button>
    )
  }

  function goBack() {
    if (step < 1) {
      return
    }
    setStep(step => step - 1)
  }

  function goForward() {
    if (step === states.length - 1) {
      return
    }
    setStep(step => step + 1)
  }

  return (
    <div>
      {/* 🐨 put the status here */}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <button onClick={goBack}>Go back</button>
      <button onClick={goForward}>Go Forward</button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
