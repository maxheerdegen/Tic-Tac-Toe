function Gameboard () {
    const board = [[0,0,0], [0,0,0], [0,0,0]];
    
    const printBoard = () => {
        board.map((row) => console.log(row));
    };

    const chooseCell = (row, column, marker) => {
        if (board[row][column] !== 0) {
            console.log("Cell already taken!");
            return false;
        }

        board[row][column] = marker;
        return true;
    }

    return {printBoard, chooseCell};
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

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players [1] : players[0];
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s Turn:`);
    }

    const playRound = (row, column) => {
        console.log(`Put ${activePlayer.name}'s marker into row ${row} and column ${column}`);
        if (board.chooseCell(row, column, activePlayer.marker)) {
            switchPlayerTurn();
        }

        printNewRound();
    }

    printNewRound();

    return {playRound};
}

const game = GameController();