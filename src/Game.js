import React, { useState } from "react";
//import logo from "./logo.svg";
import portal from "./portal.png";
import Board from "./components/Board";
import rick from "./rick.png";
import pickleRick from "./pickleRick.png";
const picRick = <img className="rick" src={rick} alt="Rick" />;
const ricPick = <img className="rick" src={pickleRick} alt="Pickle Rick" />;
function Game() {
  const [movesList, setMovesList] = useState({
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  });

  function handleClick(index) {
    const history = movesList.history.slice(0, movesList.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = movesList.xIsNext ? picRick : ricPick;
    setMovesList({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !movesList.xIsNext,
    });
  }
  const myHistory = movesList.history;
  const current = myHistory[movesList.stepNumber];

  function jumpTo(step) {
    const myHistory = [
      ...movesList.history.slice(0, movesList.stepNumber + 1),
      ...movesList.history.slice(movesList.stepNumber + 1),
    ];
    setMovesList({
      history: myHistory,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  const winner = calculateWinner(current.squares);

  const moves = myHistory.map((step, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`;

    return (
      <button className="buttons" onClick={() => jumpTo(move)}>
        {desc}
      </button>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner.props.alt}`;
    console.log(winner);
  } else {
    status = `Next player ${movesList.xIsNext ? ": Rick" : ": Pickle Rick"}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="myHeader">
          {" "}
          <img src={portal} className="App-logo" alt="logo" />{" "}
          <span className="green">{"Rick -"}</span>{" "}
          <span className="white">{"Tac"}</span>{" "}
          <span className="green">{"  - Toe"}</span>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(index) => handleClick(index)}
          />{" "}
        </div>{" "}
        <div className="game-info">
          <div className="status">{status}</div>
          {moves}
        </div>
      </header>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Game;