document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const startButton = document.getElementById('startButton');
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');
    const boardElement = document.getElementById('board');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isGameActive = true;
    let playerXName, playerOName;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (board[index] || !isGameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(`player${currentPlayer}`);

        if (checkWin()) {
            alert(`${currentPlayer === 'X' ? playerXName : playerOName} wins!`);
            isGameActive = false;
        } else if (board.every(cell => cell)) {
            alert('It\'s a tie!');
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('playerX', 'playerO');
        });
        currentPlayer = 'X';
        isGameActive = true;
    }

    function startGame() {
        playerXName = playerXInput.value.trim() || 'Player X';
        playerOName = playerOInput.value.trim() || 'Player O';
        if (!playerXName || !playerOName) {
            alert('Please enter names for both players.');
            return;
        }
        document.querySelector('.players').style.display = 'none';
        boardElement.style.display = 'grid';
        resetButton.style.display = 'block';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    startButton.addEventListener('click', startGame);
});
