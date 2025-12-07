/* Variable Declarations */
const squares = document.getElementsByClassName('square');
const gamePrompt = document.getElementById('gamePrompt');

const players = ['X', 'O'];
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer, gameFinished;

/* Reset the game automatically when the game loads */
resetGame();

/* Add listeners to the tic-tac-toe squares to check for user input */
for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if(gameFinished) return;
        if(squares[i].textContent !== "") return;
        
        squares[i].textContent = currentPlayer;

        if(checkWin(currentPlayer)) {
            gameFinished = true;
            gamePrompt.textContent = "Game over! " + currentPlayer + " wins!"
        }
        else if (checkTie()) {
            gameFinished = true;
            gamePrompt.textContent = "Game is tied!"
        }
        else {
            currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
            gamePrompt.textContent = currentPlayer + "'s turn!";
        }
    });
}


/* Functions */

//resets the game and starts the game with player X
function resetGame() {
    gameFinished = false;

    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }

    currentPlayer = players[0];
    gamePrompt.textContent = currentPlayer + "'s turn!";
}

//If the player who just moved has a winning combination, then they win.
function checkWin(player) {
    for (let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i];
        if(squares[a].textContent === player && squares[b].textContent === player && squares[c].textContent === currentPlayer)
            return true;
    }
    return false;
}

//We've already verified that none of the players won, so if there are no empty squares left then the game is a draw.
function checkTie() {
    for(let i = 0; i < squares.length; i++){
        if(squares[i].textContent === '')
            return false;
    }
    return true;
}