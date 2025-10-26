let boxes = document.querySelectorAll('.cell');
let resetbtn = document.querySelector('#reset-btn');
let resetscorebtn = document.querySelector('#reset-score-btn');
let msg = document.querySelector('.status');
let score = document.querySelector('.score-value');
let scorex = document.querySelector('#x');
let scoreo = document.querySelector('#o');

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.innerText !== '') return; 
        if (turnO) {
            cell.innerText = 'O';
            turnO = false;
            msg.innerText = "Player X's turn";
            msg.style.backgroundColor = '#fafafa';
        } else {
            cell.innerText = 'X';
            turnO = true;
            msg.innerText = "Player O's turn";
            msg.style.backgroundColor = '#fafafa';
        }
        checkWin();
    });
});

const resetGame = () => {
    boxes.forEach((cell) => {
        cell.innerText = '';
    });
    turnO = true;
    msg.innerText = "Player O's turn";
    msg.style.backgroundColor = '#fafafa';
};

const resetscore = () => {
    boxes.forEach((cell) => {
        cell.innerText = '';
    });

    turnO = true;
    scorex.innerText = '0';
    scoreo.innerText = '0';
    msg.innerText = "Player O's turn";
    msg.style.backgroundColor = '#fafafa';
};

resetbtn.addEventListener('click', resetGame);
resetscorebtn.addEventListener('click', resetscore);

const checkWin = () => {
    for (let pattern of winpatterns) {
        console.log(pattern[0],pattern[1],pattern[2]);

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !='' || pos2 != '' || pos3 != '') {
            if (pos1 === pos2 && pos2 === pos3) {
                msg.innerText = `Player ${pos1} wins!`;
                msg.style.backgroundColor = '#ffe600ff';
                boxes.forEach((cell) => {
                    cell.style.pointerEvents = 'none';
                });

                const enableCells = () => boxes.forEach(c => c.style.pointerEvents = 'auto');
                resetbtn.addEventListener('click', enableCells, { once: true });
                resetscorebtn.addEventListener('click', enableCells, { once: true });

                if (pos1 === 'X') {
                    scorex.innerText = parseInt(scorex.innerText) + 1;
                } else {
                    scoreo.innerText = parseInt(scoreo.innerText) + 1;
                }
            }
    }
}
};
