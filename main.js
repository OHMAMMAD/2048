class Board {
  constructor(size) {
    this.board = new Array(size).fill(new Array(size).fill(0));
    this.boardSize = size;
    this.score = 0;

    this.summon_random();
  }

  summon_random() {
    let r = Math.floor(Math.random() * this.boardSize);
    let c = Math.floor(Math.random() * this.boardSize);

    
    while (this.board[r][c] != 0) {
      r = Math.floor(Math.random() * this.boardSize);
      c = Math.floor(Math.random() * this.boardSize);
    }

    console.log(r);
    console.log(c);

    this.board[r][c] = Math.floor(Math.random() * 10) === 0 ? 4 : 2;
  }

  show_board() {
    for (let i = 0; i < this.boardSize; i++) {
      let line = "";
      for (let j = 0; j < this.boardSize; j++) {
        line += this.board[i][j].toString() + "   ";
      }
      console.log(line);
      console.log();
    }
  }
}

let board = new Board(4);
console.log(board.board)
