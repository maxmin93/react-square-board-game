import React, { useState } from "react";
import "./App.css";

const Square = ({ value, onClick }) => {
  // useEffect(() => {
  //   if (value) {
  //     console.log(`Square marked:`, value);
  //   }
  // });

  // 내부에 값을 가지면 값 변경도 내부에서 책임져야 함
  // 그렇게 안하려면, 부모의 함수를 연결한다
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ status, squares, handleClick }) => {
  const renderSquare = (i) => {
    // i 값을 바인딩 하여 새로 onClick 함수를 정의함
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

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

const App = ({ game }) => {
  const [squares, setSquares] = useState(game.current); // latest history
  const [info, setInfo] = useState(game.info); // status message
  const status = game.status;
  const nextPlayer = game.nextPlayer; // next player

  // **NOTE: i 는 Board 내부에서 바인딩 된다.
  const handleClick = (i) => {
    // winner가 있거나, 이미 마킹된 위치라면 처리하지 않음 (Rule)
    if (game.info || squares[i]) {
      console.log(`invalid move[${i}]:`, game.info);
      return;
    }
    console.log("handleClick", i);

    // squares를 복제하고, i 위치에 nextPlayer를 마킹한다.
    const nextSquare = game.next();
    nextSquare[i] = nextPlayer;
    setSquares(nextSquare);
    setInfo(game.info);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board status={status} squares={squares} handleClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{info}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default App;
