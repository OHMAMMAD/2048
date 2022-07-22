

import random;


class Board:
    def __init__(self, size):
        self.board = [];
        self.board_size = size;
        self.score = 0;

        for i in range(size):
            self.board.append([0, 0, 0, 0]);


        # place 2 random values: 
        self.summon_random();
        self.summon_random();

    def summon_random(self):
        r, c = random.randrange(0, self.board_size), random.randrange(0, self.board_size);
        while (self.board[r][c] != 0):
            r, c = random.randrange(0, self.board_size), random.randrange(0, self.board_size);
        self.board[r][c] = (2 if (random.randint(1, 10) != 10) else 4);

    def move(self):
        board = self.board;
        new_board = [[0 for x in range(self.board_size)] for x in range(self.board_size)];
        for i in range(self.board_size):
            counter = 0;
            for j in range(self.board_size):
                if (board[i][j] == 0):
                    continue;
                new_board[i][counter] = board[i][j];
                counter += 1;

        self.board = new_board;

    
    def merge(self):
        for i in range(self.board_size):
            for j in range(self.board_size-1):
                if (self.board[i][j] != 0 and self.board[i][j] == self.board[i][j+1]):
                    self.board[i][j] *= 2;
                    self.board[i][j+1] = 0;

                    self.score += self.board[i][j];

    def reverse_horiz(self):
        new_board = [];
        for i in range(len(self.board)):
            row = [0 for x in range(self.board_size)];
            for j in range(len(self.board[i])):
                row[-(j+1)] = self.board[i][j];
            new_board.append(row);
        self.board = new_board;

    def transpose(self):
        new_board = [[0 for x in range(self.board_size)] for x in range(self.board_size)];
        for i in range(self.board_size):
            for j in range(self.board_size):
                new_board[i][j] = self.board[j][i];
        self.board = new_board;
                

    def show_board(self):
        for row in self.board:
            for item in row:
                print(str(item) + '   ', end="");
            
            print('\n')

    def left(self):
        self.move();
        self.merge();
        self.move();

    def right(self):
        self.reverse_horiz();
        self.move();
        self.merge();
        self.move();
        self.reverse_horiz();

    def up(self):
        self.transpose();
        self.move();
        self.merge();
        self.move();
        self.transpose();
    
    def down(self):
        self.transpose();
        self.reverse_horiz();
        self.move();
        self.merge();
        self.move();
        self.reverse_horiz();
        self.transpose();


def main():
    
    board = Board(4);

    user_key = None;

    while (user_key != ' '):
        board.show_board();
        user_key = input("W\\A\\S\\D: ").lower();


        b = board.board;
        if user_key == 'w':
            board.up();
        elif user_key == 'a':
            board.left();
        elif user_key == 's':
            board.down();
        elif user_key == 'd':
            board.right();
        else:
            continue;

        if b != board.board:
            board.summon_random();


if (__name__ == "__main__"):
    main();

