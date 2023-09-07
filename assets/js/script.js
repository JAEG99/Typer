const paragraphs = [
    "The sun dipped below the horizon, casting long shadows across the tranquil landscape. The air was cool and crisp, carrying with it the faint scent of pine trees. As the stars began to twinkle in the evening sky, a sense of calm settled over the world.",
    "The bustling city streets were alive with the sounds of honking horns and chattering pedestrians. Neon signs illuminated the night, creating a colorful tapestry of light and motion. Amidst the chaos, a sense of excitement permeated the air, promising adventures yet to be discovered.",
    "In a quiet corner of the library, an old book sat on a dusty shelf, its pages yellowed with age. As the librarian turned its delicate pages, a world of forgotten stories and ancient wisdom unfolded. Each word seemed to carry a piece of history, waiting to be cherished once more.",
    "The waves crashed against the shore with a rhythmic cadence, as seagulls soared gracefully through the salty breeze. The sand beneath my feet was warm and soothing, a reminder of nature's embrace. With every step, I felt a deeper connection to the vast ocean before me."
  ];

  const typingText = document.querySelector(".typed-text p"),
    inpField = document.querySelector(".typing-input"),
    tryAgainBtn = document.querySelector("button"),
    mistakeTag = document.querySelector(".errors span"),
    wpmTag = document.querySelector(".wpm span"),
    cmpTag = document.querySelector(".cmp span");

    function loadParagraph() {
      const ranIndex = Math.floor(Math.random() * paragraphs.length);
      typingText.innerHTML = "";
      paragraphs[runIndex].split(" ").forEach(function((char)  => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span").classList.add("active");
    document.addEventListener("Keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
  }

    function initTyping() {
      let characters = typingText.querySelectorAll("span");
      let typedChar = inpField.value.split(" ")[charIndex];
      if (charIndex < characters.length - 1 && timeleft > 0) {

      }
    }

    function initTimer() {

    }

    function resetGame() {

    }

    loadParagraph();
    
