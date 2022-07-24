class Board {
  constructor(size) {
    this.boardSize = size;
    this.board = this.giveEmptyBoard();
    this.score = 0;

    this.summon_random();
    this.summon_random();
  }

  summon_random() {
    if (!this.board.some((elem) => elem.some((elem2) => elem2 === 0))) {  // exit if there is no zeros
      return;
    }

    let r = Math.floor(Math.random() * this.boardSize);
    let c = Math.floor(Math.random() * this.boardSize);

    while (this.board[r][c] != 0) {
      r = Math.floor(Math.random() * this.boardSize);
      c = Math.floor(Math.random() * this.boardSize);
    }

    this.board[r][c] = Math.floor(Math.random() * 10) === 0 ? 4 : 2;
  }

  giveEmptyBoard() {
    let a = [];
    for (let i = 0; i < this.boardSize; i++) {
      let b = [];
      for (let j = 0; j < this.boardSize; j++) {
        b.push(0);
      }
      a.push(b);
    }

    return a;
  }

  move() {
    let newBorad = this.giveEmptyBoard();
    for (let i = 0; i < this.boardSize; i++) {
      let counter = 0;
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] == 0) {
          continue;
        }

        newBorad[i][counter] = this.board[i][j];
        counter++;
      }
    }

    this.board = newBorad;
  }

  merge() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize - 1; j++) {
        if (this.board[i][j] != 0 && this.board[i][j] == this.board[i][j + 1]) {
          this.board[i][j] *= 2;
          this.board[i][j + 1] = 0;

          this.score += this.board[i][j];
        }
      }
    }
  }

  reverse() {
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = this.board[i].reverse();
    }
  }

  transpose() {
    let newBoard = this.giveEmptyBoard();
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        newBoard[i][j] = this.board[j][i];
      }
    }
    this.board = newBoard;
  }

  left() {
    this.move();
    this.merge();
    this.move();

    this.summon_random();
    this.gameOver();
  }

  right() {
    this.reverse();
    this.move();
    this.merge();
    this.move();
    this.reverse();

    this.summon_random();
    this.gameOver();
  }

  up() {
    this.transpose();
    this.move();
    this.merge();
    this.move();
    this.transpose();

    this.summon_random();
    this.gameOver();
  }

  down() {
    this.transpose();
    this.reverse();
    this.move();
    this.merge();
    this.move();
    this.reverse();
    this.transpose();

    this.summon_random();
    this.gameOver();
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

  horizMoveExists() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize - 1; j++) {
        if (this.board[i][j] == this.board[i][j + 1]) {
          return true;
        }
      }
    }
    return false;
  }
  verticMoveExists() {
    for (let i = 0; i < this.boardSize - 1; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] == this.board[i + 1][j]) {
          return true;
        }
      }
    }
    return false;
  }

  gameOver() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] == 0) {
          return;
        }
      }
    }
    if (this.horizMoveExists() || this.verticMoveExists()) {
      return;
    }

    console.log("You Lose!");
    process.exit();
  }
}

let board = new Board(4);
board.show_board();

const prompt = require("prompt-sync")();

let userKey = prompt("W / A / S / D:  ").toLowerCase();

while (userKey != " ") {
  switch (userKey) {
    case "w":
      board.up();
      break;
    case "a":
      board.left();
      break;
    case "s":
      board.down();
      break;
    case "d":
      board.right();
      break;
    default:
      console.log("try again");
  }

  board.show_board();
  console.log();
  console.log(`Score: ${board.score}`);

  userKey = prompt("W / A / S / D:  ").toLowerCase();
}
