document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const cells = document.querySelectorAll("[data-cell]");
    const currentTurnSpan = document.getElementById("currentTurn");
    const resetButton = document.getElementById("resetButton");

    let currentPlayer = "X";
    let gameActive = true;

    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (
                cells[a].innerText === cells[b].innerText &&
                cells[a].innerText === cells[c].innerText &&
                cells[a].innerText !== ""
            ) {
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return [...cells].every(cell => cell.innerText !== "");
    }

    function handleCellClick(event) {
        if (!gameActive || event.target.innerText !== "") return;

        event.target.innerText = currentPlayer;

        if (checkWinner()) {
            gameActive = false;
            alert(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            gameActive = false;
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            currentTurnSpan.innerText = currentPlayer;
        }
    }

    function resetGame() {
        cells.forEach(cell => (cell.innerText = ""));
        currentPlayer = "X";
        currentTurnSpan.innerText = currentPlayer;
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
