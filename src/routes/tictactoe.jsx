import { useState } from 'react'
import './styles.css'
import { useEffect } from 'react';
import { getAImoveX, getAImoveO } from '../ai';

let playerisX = true;

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ squares, onPlay }) {
  const [xIsNext, setxIsNext] = useState(playerisX);

  console.log(xIsNext);

  async function handleClick(i) {

    console.log(xIsNext + " " + playerisX);

    if (squares[i] || calculateWinner(squares) || xIsNext !== playerisX) {
      return;
    }

    setxIsNext(!playerisX);

    //immutability
    const nextSquares = squares.slice();
    //if(xIsNext){
    nextSquares[i] = playerisX ? "X" : "O"; // REAL PLAYER
    //}else{
    //nextSquares[i] = "O";
    //}
    onPlay(nextSquares);

    await new Promise(r => setTimeout(r, 500));

    const winner = calculateWinner(nextSquares);
    if (!winner && nextSquares.includes(null)) {
      const aiMove = playerisX ? getAImoveO(nextSquares) : getAImoveX(nextSquares);
      nextSquares[aiMove] = playerisX ? "O" : "X";
      onPlay(nextSquares);
    }
    setxIsNext(playerisX);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    if (winner === 'X' && playerisX || winner === 'O' && !playerisX) {
      status = 'Player wins';
    }
    else {
      status = 'AI wins';
    }
  } else if (!squares.slice().includes(null)) {
    status = 'tie';
  } else {
    if (xIsNext && playerisX || !playerisX && !xIsNext) {
      status = 'Players Move';
    } else {
      status = 'AIs Move';
    }
  }

  const rows = [];

  for (let i = 0; i < 3; i++) {
    const start = i * 3;
    const rowSquares = squares.slice(start, start + 3);

    rows.push(
      <div className="board-row" key={i}>
        {rowSquares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handleClick(start + index)} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game({ whomoves }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  //const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  playerisX = (whomoves === "playerisX");

  useEffect(() => {
    if (!playerisX) {
      const timeout = setTimeout(() => {
        const initialSquares = Array(9).fill(null);
        const aiMove = getAImoveX(initialSquares); // AI's first move in the center square
        initialSquares[aiMove] = 'X'; // Set AI's first move
        setHistory([initialSquares]); // Update history with AI's first move
        setCurrentMove(0); // Reset current move
      }, 500); // Delay of 500 milliseconds

      return () => clearTimeout(timeout); // Cleanup the timeout
    } else {
      console.log("player is not first(x)");
    }
  }, []); // Run only once when the component mounts

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (<li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>);
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol> {moves} </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

