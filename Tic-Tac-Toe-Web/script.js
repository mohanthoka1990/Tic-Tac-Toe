const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartBtn');

let currentPlayer = 'X'; 
let gameActive = true; 
let gameState = Array(9).fill(""); 

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return; 
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue; 
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true; 
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false; 
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false; 
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; 
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill(""); 
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', restartGame);

statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
