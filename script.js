let gameStarted = false;
let activePlayer = 'player1';
let player1Time = 0;
let player2Time = 0;
let timerInterval = null;

const timeInput = document.getElementById('time-input');
const startButton = document.getElementById('start-game');
const resetButton = document.getElementById('reset');
const player1Timer = document.getElementById('player1');
const player2Timer = document.getElementById('player2');

function updateDisplay(player, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.querySelector(`#${player} .time-display`).textContent = timeString;
    
    // Update browser tab title if game is running
    if (gameStarted) {
        document.title = `${timeString} - Chess Timer`;
    } else {
        document.title = 'Chess Timer';
    }
}

function switchPlayer() {
    if (!gameStarted) return;
    
    activePlayer = activePlayer === 'player1' ? 'player2' : 'player1';
    
    player1Timer.classList.toggle('active');
    player2Timer.classList.toggle('active');
    
    document.querySelector('#player1 .player-status').textContent = activePlayer === 'player1' ? 'Active' : 'Waiting';
    document.querySelector('#player2 .player-status').textContent = activePlayer === 'player2' ? 'Active' : 'Waiting';
}

function startGame() {
    if (gameStarted) return;
    
    const initialTime = parseInt(timeInput.value) * 60;
    player1Time = initialTime;
    player2Time = initialTime;
    
    updateDisplay('player1', player1Time);
    updateDisplay('player2', player2Time);
    
    gameStarted = true;
    startButton.disabled = true;
    timeInput.disabled = true;
    
    timerInterval = setInterval(() => {
        if (activePlayer === 'player1') {
            player1Time--;
            updateDisplay('player1', player1Time);
            
            if (player1Time <= 0) {
                endGame('Player 2 wins! Player 1 ran out of time.');
            }
        } else {
            player2Time--;
            updateDisplay('player2', player2Time);
            
            if (player2Time <= 0) {
                endGame('Player 1 wins! Player 2 ran out of time.');
            }
        }
    }, 1000);
}

function endGame(message) {
    clearInterval(timerInterval);
    gameStarted = false;
    alert(message);
    resetGame();
}

function resetGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    activePlayer = 'player1';
    
    player1Timer.classList.add('active');
    player2Timer.classList.remove('active');
    
    document.querySelector('#player1 .player-status').textContent = 'Waiting';
    document.querySelector('#player2 .player-status').textContent = 'Waiting';
    
    startButton.disabled = false;
    timeInput.disabled = false;
    
    const initialTime = parseInt(timeInput.value) * 60;
    updateDisplay('player1', initialTime);
    updateDisplay('player2', initialTime);
    
    document.title = 'Chess Timer';
}

// Event Listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Click on player timers to switch turns
player1Timer.addEventListener('click', () => {
    if (gameStarted && activePlayer === 'player2') {
        switchPlayer();
    }
});

player2Timer.addEventListener('click', () => {
    if (gameStarted && activePlayer === 'player1') {
        switchPlayer();
    }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    
    if (e.code === 'Space') {
        e.preventDefault();
        switchPlayer();
    }
}); 