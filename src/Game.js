class Game {
  constructor() {
    this._history = [Array(9).fill(null)]; // with initial squares
  }

  // read-only properties
  get current() {
    return this._history[this._history.length - 1];
  }
  get step() {
    return this.current.filter((square) => square !== null).length;
  }
  get nextPlayer() {
    return (this.step + 1) % 2 === 0 ? "O" : "X";
  }
  get info() {
    const winner = this.checkWinner();
    return winner ? `Winner='${winner}'` : null;
  }
  get status() {
    if (this.info) {
      return "Game Over";
    }
    return "Next player: " + this.nextPlayer;
  }

  // methods
  next() {
    if (this.checkWinner()) {
      return this.current; // 승리자가 있으면, 더 이상 진행하지 않음
    }
    const squares = this.current.slice(); // 얇은 복사
    this._history.push(squares); // save to history
    return squares;
  }
  checkWinner() {
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
    let squares = this.current;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // 승리한 플레이어의 표시: X 또는 O
      }
    }
    return null; // 승리자가 없음
  }
}

export default Game;
