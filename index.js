let turn = 0;
let currPlayer = null;
let board = ['', '', '', '', '', '', '', '', '', ];

function initializeGame() {
    const symbolButtons = Array.from(document.getElementsByClassName('button-symbol'));
    symbolButtons.forEach((button) => {
        button.addEventListener("click", startGame);
    });

    const slots = Array.from(document.getElementsByClassName('slot'));
    slots.forEach((button) => {
        button.disabled = true;
    });

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener("click", restart);
}

function makePlayer(event) { // factory function
    const button = event.target;
    let symbol2, turn1, turn2;
    const symbol1 = button.textContent;
    if(symbol1 === 'X') {
        turn1 = 0;
        symbol2 = 'O';
        turn2 = 1;
    }
    else if(symbol1 === 'O') {
        turn1 = 1;
        symbol2 = 'X';
        turn2 = 0;
    }
    
    return [{symbol:symbol1, turn:turn1}, {symbol:symbol2, turn:turn2}];
}

function disableSymbol() {
    const symbolButtons = Array.from(document.getElementsByClassName('button-symbol'));
    symbolButtons.forEach((button) => {
        button.disabled = true;
    });
}

function startGame(event) {
    const players = makePlayer(event);

    if(players[0].symbol === 'X') {
        currPlayer = players[0];
    } else {
        currPlayer = players[1];
    }

    disableSymbol();

    const slots = Array.from(document.getElementsByClassName('slot'));
    slots.forEach((button) => {
        button.disabled = false;
        button.addEventListener("click", (e) => {
            e.target.textContent = currPlayer.symbol;
            board[e.target.value] = currPlayer.symbol;
            console.log(board);
            turn++;
            if(turn % 2 === players[0].turn)
                currPlayer = players[0];
            else currPlayer = players[1];
            e.target.disabled = true;
            let winner = checkCondition();
            if(winner === 'X' || winner === 'O') {
                console.log(winner + " player wins!");
                restart();
            }
        });
    });
}

function checkCondition() {
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < 9; i++) {
        console.log("yo");
        if(board[winConditions[i][0]] === board[winConditions[i][1]] &&
           board[winConditions[i][1]] === board[winConditions[i][2]])
           return board[winConditions[i][0]];
    }
    return "0";
}

function restart() {
    const symbolButtons = Array.from(document.getElementsByClassName('button-symbol'));
    symbolButtons.forEach((button) => {
        button.addEventListener("click", startGame);
        button.disabled = false;
    });

    const slots = Array.from(document.getElementsByClassName('slot'));
    slots.forEach((button) => {
        button.disabled = true;
        button.textContent = '';
    });
}

initializeGame();