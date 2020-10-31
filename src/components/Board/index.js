import React, { useState } from "react";
import Square from "../Square";
import { uuid } from "uuidv4";

function Board(props) {
  const [square, setSquare] = useState(Array(9).fill(null));

  return (
    <div>
      {/* <div className="status">{status}</div> */}
      {square.map((value, index) => {
        return (
          <div className="mySquares">
            <Square
              className="board-row"
              onClick={() => {
                props.onClick(index);
              }}
              key={uuid()}
              value={props.squares[index]}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Board;
