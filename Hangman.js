let text = document.querySelector('.text');
let words = [
    "apple", "banana", "grape", "orange", "strawberry", 
    "elephant", "giraffe", "monkey", "dolphin", "kangaroo",
    "ocean", "mountain", "desert", "river", "island",
    "pencil", "notebook", "laptop", "keyboard", "monitor",
    "football", "basketball", "cricket", "tennis", "badminton",
    "doctor", "teacher", "engineer", "artist", "musician",
    "happy", "excited", "brave", "curious", "grateful",
    "summer", "autumn", "winter", "spring", "rainy",
    "morning", "evening", "midnight", "afternoon", "sunset"
];
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 6;

// Select random word
let randomWord = words[Math.floor(Math.random() * words.length)];

// Function to update displayed word
function updateWordDisplay() {
    const displayWord = randomWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(" ");
    text.innerHTML = displayWord;

    // Check if player won
    if (!displayWord.includes("_")) {
        setTimeout(() => alert("🎉 You won!"), 100);
        resetGame();
    }
}

// Initialize display word
updateWordDisplay();

// On-screen keyboard
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
alphabets.forEach(letterButton => {
    const button = document.createElement('button');
    button.innerText = letterButton;
    document.querySelector(".keys").appendChild(button);

    button.addEventListener('click', () => {
        const letter = letterButton.toLowerCase();
        
        // Prevent duplicate clicks
        if (guessedLetters.includes(letter) || wrongGuesses >= maxGuesses) return;

        if (randomWord.includes(letter)) {
            guessedLetters.push(letter);
        } else {
            wrongGuesses++;
            revealHangmanPart(wrongGuesses);
        }


        updateWordDisplay();

        // Check if player lost
        if (wrongGuesses >= maxGuesses) {
            setTimeout(() => alert(`💀 Game Over! The word was "${randomWord}"`), 100);
            setTimeout(()=>{resetGame()},200);
        }
    });
});

// Function to reveal hangman parts on incorrect guesses
function revealHangmanPart(step) {
    const parts = ['.head', '.body', '.leftarm', '.rightarm', '.leftleg', '.rightleg'];
    if (step <= parts.length) {
        document.querySelector(parts[step - 1]).style.display = 'block';
    }
}

function resetGame() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters=[];
    wrongGuesses = 0;
      // Hide all hangman parts
      document.querySelectorAll('.human div').forEach(part => part.style.display = 'none');

    updateWordDisplay();
    }