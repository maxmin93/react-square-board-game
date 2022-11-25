import React, { useState, useEffect } from "react";
import "./App.css";

const Square = ({ value, onClick }) => {
  // 내부에 값을 가지면 값 변경도 내부에서 처리해야 함
  // 외부의 이벤트를 가져와 처리하던지
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

function calculateWinner(squares) {
  // 8가지의 승리 조건
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
      return squares[a]; // 승리한 플레이어의 표시: X 또는 O
    }
  }
  return null; // 승리자가 없음
}

const Board = ({ handleInfo }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [order, setOrder] = useState(0);

  // 렌더링 이후에 실행되는 함수
  useEffect(function verifyScore() {
    if (order >= 9) {
      const count = squares.reduce((acc, curr) => {
        return curr !== null ? acc + 1 : acc;
      }, 0);
      console.log("Play count =", count);
      if (count === 9) {
        const winner = calculateWinner(squares);
        let info = `Winner=${winner ? "'" + winner + "'" : "None"}`;
        console.log(info);
        handleInfo(info); // send game-info to parent
      }
    }
  });

  const handleClick = (i) => {
    if (squares[i] !== null) {
      console.log("Already filled");
      return;
    }

    // New Array를 만들지 않으면 React는 렌더링을 건너뛴다.
    // 당연히 Square 에도 value 값이 바뀌지 않는다.
    const nextSquares = squares.slice(); // 얕은 복사본 생성
    nextSquares[i] = order % 2 === 0 ? "X" : "O";
    setSquares(nextSquares);
    setOrder(order + 1);
    console.log(`Click[${order}] : Square[${i}] => ${nextSquares[i]}`);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const status = "Next player: " + (order % 2 === 0 ? "X" : "O");

  return (
    <div>
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
    </div>
  );
};

const App = () => {
  const [info, setInfo] = useState("");
  const changeInfo = (info) => {
    setInfo(info);
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board handleInfo={changeInfo} />
      </div>
      <div className="game-info">
        <div>{info}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default App;
