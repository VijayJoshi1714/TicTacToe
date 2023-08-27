const board = document.querySelector(".container");
const cells = document.querySelectorAll(".cell");
// const cell = document.querySelector(".cell");
const restartBtn = document.querySelector(".restartBtn")
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const winnerMessage = document.querySelector(".winner-message");


let currentP = 'X';
let nextP = 'O';
let current = currentP;

const start = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            if (e.target.textContent === "") {

                e.target.textContent = current;
                if (winner() === true) {
                    winnerMessage.textContent = `Winner is : ${current}`;
                    winnerMessage.style.display = 'block'; // Show the winner message

                }
                else if (tie()) {
                    winnerMessage.textContent = `In_THE_Mix`;
                    winnerMessage.style.display = 'block'; // Show the tie message

                }
                else {

                    chance();
                }
                // winner();
            }
            else {

            }
        });
    });
};

const chance = () => {
    if (current === currentP) {
        current = nextP;
    }
    else {
        current = currentP;
    }
}

const winner = () => {
    const winset = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < winset.length; i++) {
        const [p1, p2, p3] = winset[i];

        if (cells[p1].textContent !== '' &&
            cells[p1].textContent === cells[p2].textContent &&
            cells[p2].textContent === cells[p3].textContent) {
            return true;
        }
    }
    return false;
}

const tie = () => {
    let emptyCellsCount = 0;
    cells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !winner();
}

const restartGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    winnerMessage.style.display = 'none'; // Hide the winner message
    current = currentP;
    start();
}


restartBtn.addEventListener('click', restartGame);
start();

