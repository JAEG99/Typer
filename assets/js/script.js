const paragraphs = [
    "The sun dipped below the horizon, casting long shadows across the tranquil landscape. The air was cool and crisp, carrying with it the faint scent of pine trees. As the stars began to twinkle in the evening sky, a sense of calm settled over the world.",
    "The bustling city streets were alive with the sounds of honking horns and chattering pedestrians. Neon signs illuminated the night, creating a colorful tapestry of light and motion. Amidst the chaos, a sense of excitement permeated the air, promising adventures yet to be discovered.",
    "In a quiet corner of the library, an old book sat on a dusty shelf, its pages yellowed with age. As the librarian turned its delicate pages, a world of forgotten stories and ancient wisdom unfolded. Each word seemed to carry a piece of history, waiting to be cherished once more.",
    "The waves crashed against the shore with a rhythmic cadence, as seagulls soared gracefully through the salty breeze. The sand beneath my feet was warm and soothing, a reminder of nature's embrace. With every step, I felt a deeper connection to the vast ocean before me."
  ];

  const typingText = document.querySelector(".typed-text p"),
  inpField = document.querySelector(".typing-input"),
  tryAgainBtn = document.querySelector("button"),
  timeTag = document.querySelector(".time-left span b"),
  mistakeTag = document.querySelector(".errors span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span");
let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0),
  totalCharacters = 0;

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
      calculateAccuracy();
    }
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function calculateAccuracy() {
  const accuracy = ((totalCharacters - mistakes) / totalCharacters) * 100;
  mistakeTag.innerText = `${accuracy.toFixed(2)}%`;
}

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

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

  
