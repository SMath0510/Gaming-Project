def printBoard(board):
    for i in range(0,3):
        print("| ",end="")
        for j in range(0,3):
            print(board[i][j],"| ", end="")
        print("\n|---|---|---|")

def checkWin(board):
    if(board[0][0]==board[0][1]==board[0][2]!='-'):
        print(f"Player {board[0][0]} wins")
        return True
    if(board[1][0]==board[1][1]==board[1][2]!='-'):
        print(f"Player {board[1][1]} wins")
        return True
    if(board[2][0]==board[2][1]==board[2][2]!='-'):
        print(f"Player {board[2][0]} wins")
        return True
    if(board[0][0]==board[1][0]==board[2][0]!='-'):
        print(f"Player {board[2][0]} wins")
        return True
    if(board[0][1]==board[1][1]==board[2][1]!='-'):
        print(f"Player {board[1][1]} wins")
        return True
    if(board[0][2]==board[1][2]==board[2][2]!='-'):
        print(f"Player {board[1][2]} wins")
        return True
    if(board[0][0]==board[1][1]==board[2][2]!='-'):
        print(f"Player {board[1][1]} wins")
        return True
    if(board[2][0]==board[1][1]==board[0][2]!='-'):
        print(f"Player {board[1][1]} wins")
        return True
    return False

if __name__ == "__main__":
    board = [['-','-','-'],['-','-','-'],['-','-','-']]
    turn = 1 # 1 for X and 0 for O
    print("Welcome to Tic Tac Toe")
    while(True):
        printBoard(board)
        if(turn==1):
            print("Player 1's chance")
            while(True):
                xbox = int(input("Please enter a x-value "))
                ybox = int(input("Please enter a y-value "))
                xbox= xbox - 1
                ybox = ybox - 1
                if(board[xbox][ybox]=='-'):
                    board[xbox][ybox]='x'
                    break
                else:
                    print("Invalid Input, Enter Again")
            turn=0
        else:
            print("Player 2's chance")
            while(True):
                xbox = int(input("Please enter a x-value "))
                ybox = int(input("Please enter a y-value "))
                xbox= xbox - 1
                ybox = ybox - 1
                if(board[xbox][ybox]=='-'):
                    board[xbox][ybox]='o'
                    break
                else:
                    print("Invalid Input, Enter Again")
            turn=1
        flag = checkWin(board)
        if(flag):
            printBoard(board)
            break
        
    
