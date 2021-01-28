import React, { useState } from "react";
//import logo from "./logo.svg";
import portal from "./portal.png";
import Board from "./components/Board";
import rick from "./rick.png";
//import pickleRick from "./pickleRick.png";
import astley from "./astley.png";
const picRick = <img className="rick" src={rick} alt="Rick Sanchez" />;
const ricPick = <img className="rick" src={astley} alt="Rick Astley" />;
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
  } else if (!winner && movesList.stepNumber === 9) {
    status = `Draw: You're both losers`;
  } else {
    status = `Next player ${
      movesList.xIsNext ? ": Rick Sanchez" : ": Rick Astley"
    }`;
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
          {status === `Winner: Rick Astley` && (
            <iframe
              title="rickroll"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )}{" "}
          {status === `Winner: Rick Sanchez` && (
            <iframe
              title="sanchezRoll"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/izDc3G9ZRfw?autoplay=1"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )}
          {status === `Draw: You're both losers` && (
            <iframe
              title="draw"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/r06WA0mJ4ww?autoplay=1"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )}
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
