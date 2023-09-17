const paragraphs = [
  // Array of paragraphs for typing challenge
    "The sun dipped below the horizon, casting long shadows across the tranquil landscape. The air was cool and crisp, carrying with it the faint scent of pine trees. As the stars began to twinkle in the evening sky, a sense of calm settled over the world.",
    "The bustling city streets were alive with the sounds of honking horns and chattering pedestrians. Neon signs illuminated the night, creating a colorful tapestry of light and motion. Amidst the chaos, a sense of excitement permeated the air, promising adventures yet to be discovered.",
    "In a quiet corner of the library, an old book sat on a dusty shelf, its pages yellowed with age. As the librarian turned its delicate pages, a world of forgotten stories and ancient wisdom unfolded. Each word seemed to carry a piece of history, waiting to be cherished once more.",
    "The waves crashed against the shore with a rhythmic cadence, as seagulls soared gracefully through the salty breeze. The sand beneath my feet was warm and soothing, a reminder of nature's embrace. With every step, I felt a deeper connection to the vast ocean before me."
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
  const accuracy = (mistakes / (charIndex || 1)) * 100; 

  accuracyLabel.textContent = "Mistakes:";

  if (timerReachedZero) {
    accuracyLabel.textContent = "Accuracy:";
  }

  mistakeTag.textContent = `${accuracy.toFixed(2)}%`;
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
inpField.addEventListener("keydown", function (e) {
  if (e.keyCode === 8) {
    e.preventDefault(); 
  }
});


// Load an initial paragraph when the page loads
loadParagraph();

// Event listeners for input and restart button
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

  
