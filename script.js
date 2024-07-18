function Gameboard () {
    let board = [["","",""], ["","",""], ["","",""]];
    
    const printBoard = () => {
        board.map((row) => console.log(row));
    };

    const getBoard = () => board;

    const chooseCell = (row, column, marker) => {
        if (board[row][column] !== "") {
            console.log("Cell already taken!");
            return false;
        }

        board[row][column] = marker;
        return true;
    }

    const checkForWinningBoard = () => {
        for (let i= 0; i < board.length; i++) {
            for (let j = 1; j< board[i].length; j++) {
                if (board[i][j] !== board[i][j-1] || board[i][j] === ""){
                    break;
                }
                if (j === 2) return true;
            } 
        }

        for (let j = 0; j < board[0].length; j++) {
            for (let i = 1; i < board.length; i++) {
                if (board[i][j] !== board[i-1][j] || board[i][j] === "") {
                    break
                }
                if (i === 2) return true;
            }
        }

        if (((board[0][0] === board[1][1] && board[1][1] === board[2][2])
            || (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
            && (board[1][1] !== "")) {
            return true;
        }

        return false;
    }

    const resetBoard = () => {
        board = [["","",""], ["","",""], ["","",""]];
        console.log("New Round has started!");
    }

    return {printBoard, getBoard, chooseCell, checkForWinningBoard, resetBoard};
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    board = Gameboard();

    const players = [
    {
        name: playerOneName,
        marker: "X"
    },
    {
        name: playerTwoName,
        marker: "O"
    }
    ];

    let activePlayer = players[0];
    let winner = "";

    const getActivePlayer = () => activePlayer;

    const getWinner = () => winner = activePlayer.name;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players [1] : players[0];
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s Turn:`);
    }

    const playRound = (row, column) => {
        if (winner === "") {
            console.log(`Put ${activePlayer.name}'s marker into row ${row} and column ${column}`);
            if (board.chooseCell(row, column, activePlayer.marker)) {
                displayWin();
                switchPlayerTurn();
            }

            printNewRound();
        }
        else {
            console.log("Game is over!");
        }
    }

    const displayWin = () => {
       if (board.checkForWinningBoard()) {
           console.log(`${winner} has won!`);
           return getWinner();
       }
    }

    const startNewGame = () => {
        winner = "";
        board.resetBoard();
    }

    printNewRound();

    return {playRound, getActivePlayer, getWinner, displayWin, startNewGame, getBoard: board.getBoard};
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const winnerDiv = document.querySelector(".winner");
    const startButton =  document.querySelector(".start");

    const updateScreen = () => {
        boardDiv.textContent = "";
        winnerDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const winner = game.displayWin();

        playerTurnDiv.textContent = `${activePlayer.name}'s Turn!`;
        if(winner !== undefined) winnerDiv.textContent = `${winner} has won!`;

        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                cellButton.textContent = cell;
                boardDiv.appendChild(cellButton);
            })
        });
    }

    boardDiv.addEventListener("click", (e) => {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    })

    startButton.addEventListener("click", () => {
        game.startNewGame();
        updateScreen();
    })

    updateScreen();
}

ScreenController();