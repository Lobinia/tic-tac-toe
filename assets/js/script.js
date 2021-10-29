// Initial data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let turn = '';
let warning = '';
let running = true;

reset();


// Events

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})


// Functions

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(running && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function togglePlayer() {
    player = (player === 'o') ? 'x' : 'o';
    renderInfo();
}

function reset() {
    warning = '';
    
    let random = Math.floor(Math.random()*2);
    player = (random === 0) ? 'x' : 'o';

    for (let i in square) {
        square[i] = '';
    };

    running = true;

    renderSquare()
    renderInfo()
}


function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    isItOver()
};

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
};

function isItOver(){
    if(checkWinnerFor('x')) {
        warning = `"X" won`;
        running = false;
        endGameSound('win')
    } else if(checkWinnerFor('o')) {
        warning = `"O" won`;
        running = false;
        endGameSound('win')
    } else if(isItFull()){
        warning = 'Draw';
        running = false;
        endGameSound('draw')
    }
}

function checkWinnerFor(player) {
    let winConditions = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in winConditions){
        let pArray = winConditions[w].split(',');
        hasWon = pArray.every((option)=>{
            if(square[option] === player) {
                return true;
            } else {
                return false;
            }
        });

        if(hasWon) {
            return true;
        }
    }
    return false;
}

function isItFull() {
    for(let v in square) {
        if(square[v] === '') {
            return false;
        }
    }
    return true;
}

function endGameSound(sound) {
    var audio = new Audio(`assets/sounds/${sound}.mp3`);
    audio.play();
}