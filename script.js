// Select elements
const nameInputContainer = document.getElementById('nameInputContainer');
const gameContainer = document.getElementById('gameContainer');
const startGameButton = document.getElementById('startGame');
const player1NameInput = document.getElementById('player1Name');
const player2NameInput = document.getElementById('player2Name');
const player1Div = document.getElementById('player1');
const player2Div = document.getElementById('player2');
const turnInfo = document.getElementById('turnInfo');

// Other game elements
const dice = document.querySelector('.dice');
const rollButton = document.getElementById('rollDice');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

// Initialize game state
let scores = [0, 0];
let rolls = [0, 0];
let currentPlayer = 0;
let totalRolls = 0;

// Function to start the game
startGameButton.addEventListener('click', () => {
  const player1Name = player1NameInput.value.trim();
  const player2Name = player2NameInput.value.trim();

  if (!player1Name || !player2Name) {
    alert('Silakan masukkan nama kedua pemain!');
    return;
  }

  // Update player names
  player1Div.textContent = `${player1Name}: 0`;
  player2Div.textContent = `${player2Name}: 0`;

  // Show game container and hide name input container
  nameInputContainer.style.display = 'none';
  gameContainer.style.display = 'block';

  // Initialize turn info
  turnInfo.textContent = `Giliran: ${player1Name} (Lemparan ke-1)`;
  player1Div.classList.add('active');
});

// Function to switch active player
function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % 2;
  player1Div.classList.toggle('active', currentPlayer === 0);
  player2Div.classList.toggle('active', currentPlayer === 1);

  const currentPlayerName =
    currentPlayer === 0 ? player1NameInput.value : player2NameInput.value;
  turnInfo.textContent = `Giliran: ${currentPlayerName} (Lemparan ke-${rolls[currentPlayer] + 1})`;
}

// Function to handle dice roll
function rollDice() {
  // Disable button during animation
  rollButton.disabled = true;

  // Add rolling animation
  dice.classList.add('rolling');

  // Simulate dice rolling for 1 second
  setTimeout(() => {
    // Generate a random number between 1 and 6
    const roll = Math.floor(Math.random() * 6) + 1;

    // Remove rolling animation
    dice.classList.remove('rolling');

    // Update dice display
    const diceFaces = ['🎲', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    dice.textContent = diceFaces[roll];

    // Update score and add to player's score
    scores[currentPlayer] += roll;
    rolls[currentPlayer]++;

    // Update score display in player div
    if (currentPlayer === 0) {
      score1.textContent = scores[0];
      player1Div.textContent = `${player1NameInput.value}: ${scores[0]}`;
    } else {
      score2.textContent = scores[1];
      player2Div.textContent = `${player2NameInput.value}: ${scores[1]}`;
    }

    // Check if both players have finished 5 rolls each
    if (rolls[0] >= 5 && rolls[1] >= 5) {
      determineWinner();
      return;
    }

    // Switch player
    switchPlayer();

    // Enable button after animation
    rollButton.disabled = false;
  }, 1000); // Duration of the animation
}

// Determine the winner
function determineWinner() {
  rollButton.disabled = true;
  if (scores[0] > scores[1]) {
    turnInfo.textContent = 'Player 1 menang!';
  } else if (scores[1] > scores[0]) {
    turnInfo.textContent = 'Player 2 menang!';
  } else {
    turnInfo.textContent = 'Permainan seri!';
  }
}

// Reset the game
function resetGame() {
  scores = [0, 0];
  rolls = [0, 0];
  totalRolls = 0;
  currentPlayer = 0;
  score1.textContent = '0';
  score2.textContent = '0';
  dice.textContent = '🎲';
  rollButton.disabled = false;
  turnInfo.textContent = 'Giliran: Player 1 (Lemparan ke-1)';
  player1Div.classList.add('active');
  player2Div.classList.remove('active');
}

// Add event listener for the roll button
rollButton.addEventListener('click', rollDice);

// Initialize game
resetGame();
