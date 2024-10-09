// Select elements
const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthday-card");
const confetti = document.getElementById("confetti");

// Envelope click event
envelope.addEventListener("click", () => {
    envelope.style.display = "none"; // Hide the envelope
    birthdayCard.style.display = "block"; // Show the birthday card
    showConfetti(); // Trigger confetti
});

// Function to create confetti
function showConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfettiPiece();
    }
}

// Function to create a single confetti piece
function createConfettiPiece() {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.position = "absolute";
    piece.style.backgroundColor = getRandomColor();
    piece.style.width = "10px";
    piece.style.height = "10px";
    piece.style.opacity = Math.random();
    piece.style.left = Math.random() * window.innerWidth + "px";
    piece.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(piece);

    // Animate falling
    setTimeout(() => {
        piece.style.transition = "top 2.5s ease-in, opacity 1s"; // Adjusted duration
        piece.style.top = window.innerHeight + "px"; // Fall down
        piece.style.opacity = 0; // Fade out
    }, 0);

    // Remove piece after animation
    piece.addEventListener("transitionend", () => {
        piece.remove();
    });
}

// Function to get a random color
function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F33FFF", "#FF33A8"];
    return colors[Math.floor(Math.random() * colors.length)];
}
