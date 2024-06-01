let turn = 0;
let board = ['', '', '', '', '', '', '', '', ''];
let player;
let currPlayer;
let winningGames = 0;

const buttonSymbols = Array.from(document.getElementsByClassName('button-symbol'));
const slots = Array.from(document.getElementsByClassName('slot'));
const restartButton = document.getElementById('restart');

const dialog = document.querySelector('dialog');

function initialize() {
    dialog.showModal();
    buttonSymbols.forEach((button) => {
        button.addEventListener("click", startGame);
    });

    slots.forEach((button) => {
        button.disabled = true;
        button.addEventListener("click", setSymbol);
        button.addEventListener("mouseenter", setFuture);
        button.addEventListener("mouseleave", removeFuture);
    });
    
    restartButton.addEventListener("click", restart);
}

function startGame(event) {
    player = makePlayer(event);
    console.log(player);
    dialog.close();
    slots.forEach((button) => {
        button.disabled = false;
    });

    if(turn % 2 === player.turn)
        currPlayer = player.symbol;
    else if(player.symbol === 'X') {
        currPlayer = 'O';
    }
    else {
        currPlayer = 'X';
    }
}

function makePlayer(event) {
    let name, symbol, turn;
    event.preventDefault();
    let pressedSymbol = event.target.textContent;
    if(pressedSymbol === 'X') {
        symbol = 'X';
        turn = 0;
    }
    else {
        symbol = 'O';
        turn = 1;
    }

    let nameInput = document.querySelector('input[type="text"]');

    name = nameInput.value;

    return {name:name, symbol:symbol, turn:turn, win:0};
}

function setSymbol(event) {
    const button = event.target;

    button.textContent = currPlayer;
    button.disabled = true;
    board[button.value] = currPlayer;
    console.log(board);
    turn++;
    if(turn % 2 === player.turn)
        currPlayer = player.symbol;
    else if(player.symbol === 'X') {
        currPlayer = 'O';
    }
    else {
        currPlayer = 'X';
    }

    button.removeEventListener("mouseenter", setFuture);
    button.removeEventListener("mouseleave", removeFuture);
    checkWinner();
}

function setFuture(event) {
    const button = event.target;
    button.textContent = currPlayer;
}

function removeFuture(event) {
    const button = event.target;
    button.textContent = "";
}

function checkWinner() {
    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    console.log(player.symbol);

    win.forEach((w) => {
        if(board[w[0]] === board[w[1]] &&
           board[w[1]] === board[w[2]]) {
            if(board[w[0]] === player.symbol) {
                winningGames++;
                player.win++;
                console.log("You won this round")
                clearGame();
            } else if(board[w[0]] !== '') {
                console.log("Your foe won this round");
                winningGames++;
                clearGame();
            }
        }
        else if(!board.includes('')) {
            console.log("It's a tie in this round");
            clearGame();
        }
    });

    console.log(`Winning games: ${winningGames}`);

    if(winningGames >= 3 && winningGames - player.win === 3) {
        console.log("You lose");
        restart();
    } else if(winningGames >= 3 && player.win === 3){
        console.log("You won!");
        restart();
    }
}

function clearGame() {
    console.log(turn);
    console.log(player);
    turn = 0;
    console.log(turn);
    slots.forEach((button) => {
        button.textContent = "";
        button.disabled = false;
    });
    for(let i = 0; i < 9; i++) {
        board[i] = "";
    }

    if(turn % 2 === player.turn)
        currPlayer = player.symbol;
    else if(player.symbol === 'X') {
        currPlayer = 'O';
    }
    else {
        currPlayer = 'X';
    }
}

function restart() {
    slots.forEach((s) => {
        s.disabled = true;
        s.textContent = '';
    });
    buttonSymbols.forEach((b) => {
        b.disabled = false;
    });
    for(let i = 0; i < board.length; i++) {
        board[i] = "";
    }

    if(turn % 2 === player.turn)
        currPlayer = player.symbol;
    else if(player.symbol === 'X') {
        currPlayer = 'O';
    }
    else {
        currPlayer = 'X';
    }

    currPlayer = null;
    player = null;
    turn = 0;
    winningGames = 0;
    console.log(board);

    let nameInput = document.querySelector('input[type="text"]');
    nameInput.value = "";

    dialog.showModal();
}

initialize();