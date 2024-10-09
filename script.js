const word = "sigma"; // Correct word to guess
let currentGuess = "";
let attempts = 0;
const maxAttempts = 6;

const guessGrid = document.querySelector(".guess-grid");
const guessInput = document.getElementById("guess-input");
const submitGuessButton = document.getElementById("submit-guess");
const resetGameButton = document.getElementById("reset-game"); // Get Reset button
const errorAlert = document.getElementById("error-alert");
const successAlert = document.getElementById("success-alert");
const nextPageButton = document.getElementById("next-page");

// Set up the guess grid with empty tiles
function initializeGrid() {
    guessGrid.innerHTML = ''; // Clear previous tiles
    for (let i = 0; i < maxAttempts * 5; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        guessGrid.appendChild(tile);
    }
}

// Initialize game
initializeGrid();

// Handle submit button click
submitGuessButton.addEventListener("click", handleGuess);

// Allow submitting guess with Enter key
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

function handleGuess() {
    currentGuess = guessInput.value.toLowerCase();
    
    if (currentGuess.length !== 5) {
        showAlert(errorAlert, "Guess must be 5 letters long!");
        return;
    }

    if (attempts >= maxAttempts) {
        showAlert(errorAlert, "No more attempts!");
        return;
    }

    updateGrid(currentGuess);
    
    if (currentGuess === word) {
        showAlert(successAlert, "Congratulations! You guessed it!");
        nextPageButton.style.display = "block"; // Show "Next" button upon success
    } else if (++attempts >= maxAttempts) {
        showAlert(errorAlert, "Out of attempts! Reset to try again!");
    }
    
    guessInput.value = ""; // Clear the input after guess
}

function updateGrid(guess) {
    const tiles = document.querySelectorAll(".tile");
    const start = attempts * 5;

    for (let i = 0; i < 5; i++) {
        const tile = tiles[start + i];
        tile.textContent = guess[i];

        if (guess[i] === word[i]) {
            tile.classList.add("correct");
        } else if (word.includes(guess[i])) {
            tile.classList.add("wrong-location");
        } else {
            tile.classList.add("wrong");
        }
    }
}

function showAlert(alertElement, message) {
    alertElement.textContent = message;
    alertElement.style.display = "block";
    setTimeout(() => {
        alertElement.style.display = "none";
    }, 2000);
}

// Event listener for "Next" button
document.getElementById("wordle-next").addEventListener("click", function() {
    window.location.href = "connects.html"; // Redirect to connects game
});

// Reset button functionality
resetGameButton.addEventListener("click", resetGame);

function resetGame() {
    currentGuess = "";
    attempts = 0;
    initializeGrid(); // Reinitialize the grid
    guessInput.value = ""; // Clear input field
    nextPageButton.style.display = "none"; // Hide "Next" button
    errorAlert.style.display = "none"; // Hide error alert
    successAlert.style.display = "none"; // Hide success alert
}

// Initialize the game on page load
initializeGrid();
