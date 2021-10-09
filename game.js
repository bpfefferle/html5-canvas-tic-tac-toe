/*******************************************************
    PROGRAMMER: BRENT PFEFFERLE
    VERSION: 1.0
    DATE: 10/9/21
    PURPOSE: TIC-TAC-TOE GAME USING HTML5 CANVAS.
********************************************************/
const textScreen = document.getElementById('text')
const gameScreen = document.getElementById('game')
const ctxTextScreen = textScreen.getContext('2d')
const ctxGameScreen = gameScreen.getContext('2d')
const offset = 50
gameScreen.width = gameScreen.height = textScreen.width = 600

class TicTacToe
{
    constructor(board = [], cellSize, playerTurn, totalTurns, playerXWon, playerOWon, isGameOver)
    {
      this.cellSize = cellSize
      this.isGameOver = isGameOver
      this.playerTurn = playerTurn
      this.totalTurns = totalTurns
      this.playerXWon = playerXWon
      this.playerOWon = playerOWon
      this.board = board
    }
    init() // Used to reset the game.
    {
        for (let row = 0; row < game.board.length; row++)
        {
            for (let col = 0; col < game.board[row].length; col++)
            {
                game.board[row][col] = 0
                
            }  
        }
        game.isGameOver = false
        game.playerXWon = false
        game.playerOWon = false
        game.playerTurn = 'X'
        game.totalTurns = 0
        game.drawGame()
    }
    drawGame() // Draw game board and text.
    {   
        ctxGameScreen.lineWidth = 5
        ctxTextScreen.clearRect(0, 0, textScreen.width, textScreen.height)
        ctxGameScreen.clearRect(0, 0, gameScreen.width, gameScreen.height)
        gameText('48px Verdana', '#F2FDFF', 'center', textScreen.width/2, textScreen.height/2, 'Tic Tac Toe')
        gameText('36px Verdana', '#EE5622', 'center', textScreen.width/2, textScreen.height/2 + offset, 'X goes first.')
        ctxGameScreen.strokeStyle = '#F2FDFF'
        // The loop that prints out a 3x3 grid.
        for (let row = 0; row < this.board.length; row++)
        {
            for (let col = 0; col < this.board[row].length; col++)
            {   
                let x = col * this.cellSize
                let y = row * this.cellSize
                ctxGameScreen.strokeRect(x, y, this.cellSize, this.cellSize)
            } 
        }   
    }
    drawMarker(mouseX, mouseY) // Check if a valid move before drawing an X or O within a clicked cell.
    {   
        ctxGameScreen.lineWidth = 15
        for (let row = 0; row < this.board.length; row++)
        {
            for (let col = 0; col < this.board[row].length; col++)
            {
              let xCor = col * this.cellSize
              let yCor = row * this.cellSize
              
              if (mouseX >= xCor && mouseX <= xCor + this.cellSize && mouseY >= yCor && mouseY <= yCor + this.cellSize)
              { 
                // Switch statement that alternates player turns.
                switch (this.playerTurn)
                {
                    case 'X':
                        if (this.board[row][col] === 1 || this.board[row][col] === -1)
                        {
                            gameText('36px Verdana', '#EE5622', 'center', textScreen.width/2, textScreen.height/2 + offset, "Invalid move, try again.")  
                            break; 
                        }
                        else
                        {
                            ctxGameScreen.strokeStyle = '#EE5622'
                            ctxGameScreen.beginPath()
                            ctxGameScreen.moveTo(xCor + offset, yCor + offset)
                            ctxGameScreen.lineTo(xCor + this.cellSize - offset, yCor + this.cellSize - offset)
                            ctxGameScreen.moveTo(xCor + offset, yCor + this.cellSize - offset)
                            ctxGameScreen.lineTo(xCor + this.cellSize - offset, yCor + offset)
                            ctxGameScreen.stroke()
                            this.board[row][col] = 1
                            this.totalTurns += 1
                            this.playerTurn = 'O'
                            gameText('36px Verdana', '#ECA72C', 'center', textScreen.width/2, textScreen.height/2 + offset, "O's turn.")
                            break;
                        }
                    case 'O':
                        if (this.board[row][col] === 1 || this.board[row][col] === -1)
                        {
                            gameText('36px Verdana', '#ECA72C', 'center', textScreen.width/2, textScreen.height/2 + offset, "Invalid move, try again.") 
                            break;
                        }
                        else
                        {
                            ctxGameScreen.strokeStyle = '#ECA72C'
                            ctxGameScreen.beginPath()
                            ctxGameScreen.arc(xCor + (this.cellSize / 2), yCor + (this.cellSize / 2), 50, 0, 2 * Math.PI)
                            ctxGameScreen.stroke()
                            this.board[row][col] = -1
                            this.totalTurns += 1
                            this.playerTurn = 'X'
                            gameText('36px Verdana', '#EE5622', 'center', textScreen.width/2, textScreen.height/2 + offset, "X's turn.")
                            break;
                        }
                }
              }
            } 
        }
    }
    checkWin() // Check if a win has occured.
    {   
        // Check horizontal win for X or O.
        for (let y = 0; y < this.board.length; y++)
        {
            for (let x = 0; x < this.board[y].length; x++)
            {
                if (this.board[y][x] === 1 && this.board[y][x + 1] === 1 & this.board[y][x + 2] === 1)
                {
                    this.playerXWon = true
                    return this.isGameOver = true
                }
                else if (this.board[y][x] === -1 && this.board[y][x + 1] === -1 & this.board[y][x + 2] === -1)
                {
                    this.playerOWon = true
                    return this.isGameOver = true
                }
            }
        }
        // Check vertical win for X or O.
        for (let row = 0; row < this.board.length; row++)
        {
            if (this.board[0][row] + this.board[1][row] + this.board[2][row] === 3)
            {
                this.playerXWon = true
                return this.isGameOver = true
            }
            else if (this.board[0][row] + this.board[1][row] + this.board[2][row] === -3)
            {
                this.playerOWon = true
                return this.isGameOver = true
            }
        }
        // Check diagonal win for X or O.
        if (this.board[0][0] + this.board[1][1] + this.board[2][2] === 3 || 
            this.board[2][0] + this.board[1][1] + this.board[0][2] === 3)
        {
            this.playerXWon = true
            return this.isGameOver = true   
        } 
        else if (this.board[0][0] + this.board[1][1] + this.board[2][2] === -3 || 
                this.board[2][0] + this.board[1][1] + this.board[0][2] === -3)
        {
            this.playerOWon = true
            return this.isGameOver = true
        }
        // Check draw.
        if (this.totalTurns === 9)
        {
            if (this.isGameOver === false)
            {
                ctxTextScreen.clearRect(0, 0, textScreen.width, textScreen.height)
                gameText('48px Verdana', '#F2FDFF', 'center', textScreen.width/2, textScreen.height/2, 'Tic Tac Toe')
                gameText('36px Verdana', '#EE5622', 'center', textScreen.width/2, textScreen.height/2 + offset, "Draw! Play again?")
                return this.isGameOver = true
            }
        }
    }
}  // End of class.

// Function for managing in-game text.
let gameText = (font, color, align, xPos, yPos, string) =>
{
    this.font = font
    this.color = color
    this.align = align
    this.xPos = xPos
    this.yPos = yPos
    this.string = string
    ctxTextScreen.font = font
    ctxTextScreen.fillStyle = color
    ctxTextScreen.textAlign = align
    ctxTextScreen.fillText(string, xPos, yPos)
}

// Start of game.
let game = new TicTacToe([[0,0,0], [0,0,0], [0,0,0]], 200, 'X', 0, false, false, false)
game.drawGame()

// Click event for tic-tac-toe grid.
gameScreen.addEventListener('mousedown', function gameCanvas(e)
{
    ctxTextScreen.clearRect(0, 0, textScreen.width, textScreen.height)
    gameText('48px Verdana', '#F2FDFF', 'center', textScreen.width/2, textScreen.height/2, 'Tic Tac Toe')

    // Get mouse coordinates.
    let rect = gameScreen.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top 

    game.drawMarker(x, y)
    game.checkWin()

    // Game over detected, declare a winner or draw.
    if (game.isGameOver === true)
    {
        gameScreen.removeEventListener('mousedown', gameCanvas)
        ctxTextScreen.clearRect(0, 0, textScreen.width, textScreen.height)
        gameText('48px Verdana', '#F2FDFF', 'center', textScreen.width/2, textScreen.height/2, 'Tic Tac Toe')
        
        if (game.playerXWon === true)
        {
            gameText('36px Verdana', '#EE5622', 'center', textScreen.width/2, textScreen.height/2 + offset, 'X wins! Play again?')  
        } 
        else if (game.playerOWon === true)
        {
            gameText('36px Verdana', '#ECA72C', 'center', textScreen.width/2, textScreen.height/2 + offset, 'O wins! Play again?')
        }
        else
        {
            gameText('36px Verdana', '#EE5622', 'center', textScreen.width/2, textScreen.height/2 + offset, "Draw! Play again?")
        }

        // Click event for game text, restart game.
        textScreen.addEventListener('mousedown', function textCanvas()
        {
            game.init()
            textScreen.removeEventListener('mousedown', textCanvas)
            gameScreen.addEventListener('mousedown', gameCanvas)
        })
    }
})