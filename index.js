let turn = 0;
let board = ['', '', '', '', '', '', '', '', '', ];
let player ;
let currPlayer;

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
    });
}

function startGame(event) {
    player = makePlayer(event);
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

    return {name:name, symbol:symbol, turn:turn};
}

function setSymbol(event) {
    const button = event.target;

    button.textContent = currPlayer;
    button.disabled = true;

    turn++
    if(turn % 2 === player.turn)
        currPlayer = player.symbol;
    else if(player.symbol === 'X') {
        currPlayer = 'O';
    }
    else {
        currPlayer = 'X';
    }
}

initialize();