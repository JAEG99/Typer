if (window.location.pathname.endsWith("game.html")) {
const paragraphs = [
  // Array of paragraphs for typing challenge
    "In the heart of the dense, emerald forest, ancient trees stood tall, their branches intertwined in a dance that had lasted for centuries. Shafts of golden sunlight pierced through the thick canopy, illuminating the moss-covered ground below. As I walked deeper into this enchanted woodland, I felt a sense of wonder and reverence for the natural world.",
    "Amidst the bustling streets of the vibrant metropolis, skyscrapers reached for the heavens, their glass facades reflecting the urban symphony of life. The city's diverse inhabitants hurried along, each with their own story to tell. It was a place where dreams were born and ambitions soared, a microcosm of human existence.",
    "High atop the rugged mountains, a lonely mountain goat navigated treacherous cliffs with unmatched grace. The air was thin and crisp, and the view from this lofty perch was breathtaking. I marveled at the sheer grandeur of the world below, a reminder of nature's indomitable spirit.",
    "In the quiet solitude of a dimly lit library, rows upon rows of ancient books filled the shelves. Each tome held the collective knowledge and wisdom of generations long past. As I opened one of these weathered volumes, I was transported to distant lands and eras, where history came alive through the printed word."
  ];

  const typingText = document.querySelector(".typed-text p"), // Element to display the typing text
  inpField = document.querySelector(".typing-input"), // Input field where the user types
  tryAgainBtn = document.querySelector("button"), // Restart button
  timeTag = document.querySelector(".time-left span b"), // Element to display time remaining
  mistakeTag = document.querySelector(".errors span"), // Element to display mistake count
  wpmTag = document.querySelector(".wpm span"), // Element to display words per minute
  cpmTag = document.querySelector(".cpm span"); // Element to display characters per minute
let timer,
  maxTime = 60, // Maximum time for the typing challenge in seconds
  timeLeft = maxTime, // Current time remaining
  charIndex = (mistakes = isTyping = 0), // Variables for tracking characters, mistakes, and typing status
  totalCharacters = 0; // Total characters in the typing text

  // Function to load a random paragraph for the typing challenge
function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
    totalCharacters++; 
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
let timerReachedZero = false;

// Function to calculate and display accuracy
function calculateAccuracy() {
  const accuracyLabel = document.querySelector(".errors p");
  const accuracy = ((totalCharacters - mistakes) / totalCharacters) * 100;

  accuracyLabel.textContent = "Accuracy:";

  if (timerReachedZero) {
    accuracyLabel.textContent = "Mistakes:";
  }

  mistakeTag.textContent = `${accuracy.toFixed(2)}%`;
}

// Function to handle typing and update stats
function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
    if (timeLeft === 0) {
      calculateAccuracy(document.getElementById("inputText"));
    }
  }
}


// Function to calculate accuracy
function calculateAccuracy() {
  const accuracyLabel = document.querySelector(".errors p");
  const accuracy = ((charIndex - mistakes) / charIndex) * 100; 

  accuracyLabel.textContent = "Mistakes:";

  if (timerReachedZero) {
    accuracyLabel.textContent = "Accuracy:";
  }

  mistakeTag.textContent = `${accuracy.toFixed(2)}%`;
}

// Function to play the timer sound
function playTimerSound() {
  const timerSound = document.getElementById("timerSound");
  timerSound.play();
}


// Function to calculate and update the timer
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
    timerReachedZero = true;
    calculateAccuracy(document.getElementById("inputText"));
    playTimerSound();

  
  }
}

// Function to reset the typing challenge
function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

// Event listener for handling backspace key (prevent default behavior)
if (inpField) { // Check if inpField exists on the current page
  inpField.addEventListener("keydown", function (e) {
    if (e.keyCode === 8) {
      e.preventDefault();
    }
  });
}

// Load an initial paragraph when the page loads
loadParagraph();

// Event listeners for input and restart button
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

}
// JS for the button on the landing page
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");

  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "game.html";
    });
  }
});