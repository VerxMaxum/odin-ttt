let turn = 0;
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let player;
let currPlayer;
let winningGames = 0;

const buttonSymbols = Array.from(document.getElementsByClassName('button-symbol'));
const slots = Array.from(document.getElementsByClassName('slot'));
const restartButton = document.getElementById('restart');

const dialog1 = document.querySelector('dialog');
const dialog2 = document.querySelector('body > dialog:last-child');

const selfScore = document.querySelector('#scoreboard > p:first-child');
const oppScore = document.querySelector('#scoreboard > p:last-child');

const again = document.getElementById('again');

function initialize() {
    dialog1.showModal();
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
    again.addEventListener("click", redo);
}

function startGame(event) {
    player = makePlayer(event);
    console.log(player);
    dialog1.close();
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
    button.textContent = " ";
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

    selfScore.textContent = "You: " + player.win;
    oppScore.textContent = "Oppponent: " + (winningGames - player.win);

    const result = document.querySelector('dialog > div > p');

    if(winningGames >= 3 && winningGames - player.win === 3) {
        console.log("You lose");
        result.textContent = "You lose! >:D";
        dialog2.showModal();
    } else if(winningGames >= 3 && player.win === 3){
        console.log("You won!");
        result.textContent = `${player.name}, you won! :D`;
        dialog2.showModal();
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
        button.addEventListener("mouseenter", setFuture);
        button.addEventListener("mouseleave", removeFuture);
    });
    for(let i = 0; i < 9; i++) {
        board[i] = " ";
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

function redo() {
    slots.forEach((s) => {
        s.disabled = true;
        s.textContent = ' ';
        s.addEventListener("mouseenter", setFuture);
        s.addEventListener("mouseleave", removeFuture);
    });
    buttonSymbols.forEach((b) => {
        b.disabled = false;
    });
    for(let i = 0; i < board.length; i++) {
        board[i] = " ";
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

    selfScore.textContent = "You: 0";
    oppScore.textContent = "Opponent: 0";

    const nameInput = document.querySelector('input[type="text"]');
    nameInput.value = " ";

    dialog2.close();
    dialog1.showModal();
}

function restart() {
    slots.forEach((s) => {
        s.disabled = true;
        s.textContent = ' ';
        s.addEventListener("mouseenter", setFuture);
        s.addEventListener("mouseleave", removeFuture);
    });
    buttonSymbols.forEach((b) => {
        b.disabled = false;
    });
    for(let i = 0; i < board.length; i++) {
        board[i] = " ";
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

    selfScore.textContent = "You: 0";
    oppScore.textContent = "Opponent: 0";

    let nameInput = document.querySelector('input[type="text"]');
    nameInput.value = "";

    dialog1.showModal();
}

initialize();