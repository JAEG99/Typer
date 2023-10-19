/* eslint-disable max-len */
// Declare variables at the beginning
let mistakes = 0; // Variable to track mistakes
let isTyping = false; // Flag to check if typing is in progress
const wpm = 0; // Initialize words per minute
const selectedDifficulty = 'easy'; // Initialize with the default difficulty

// Create an object to store high scores by difficulty
const highScores = {
  easy: [],
  medium: [],
  hard: [],
};

// Function to save a high score for a specific difficulty
const saveHighScore = function(score, difficulty) {
  const scores = highScores[difficulty] || [];

  const newScore = {
    score: score,
    date: new Date().toLocaleString(),
  };

  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score); // Sort scores in descending order
  highScores[difficulty] = scores;
  localStorage.setItem('highScores', JSON.stringify(highScores));
};

// Function to display high scores for a specific difficulty
const displayHighScores = function(difficulty) {
  const scores = highScores[difficulty] || [];
  const highScoresList = document.getElementById('highScoresList');

  // Clear the previous high scores
  highScoresList.innerHTML = '';

  scores.forEach((score, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${score.score} WPM - ${score.date}`;
    highScoresList.appendChild(li);
  });
};

// Check if the current page is the game page
if (window.location.pathname.endsWith('game.html')) {
  // Define paragraphs for different difficulties
  const paragraphs = {
    easy: [
      // Easy difficulty paragraphs
      'Balloons are round and colorful. They float up high when we let them go. We tie them with strings and watch them dance in the sky. At parties, we love balloons because they make us smile. Balloons are like magical, floating orbs that come in all sorts of bright and cheerful colors. When we fill them with air, they puff up into big, round shapes that seem to almost glow with happiness.',
      'Butterflies are like nature\'s colorful fairies. They wear beautiful, patterned wings that look like tiny pieces of art. These delicate insects love to visit flowers and sip sweet nectar, and when they do, they move around by fluttering from one flower to another, just like a gentle, flying dance. When you spot them in the garden, it\'s like discovering living rainbows that brighten up the day!',
      'Fireworks are like sparkly surprises that light up the night sky. When we set them off, they make big booming sounds and burst into amazing colors that fill the darkness with awe. You can see bright red, blue, green, and golden lights, like shimmering jewels in the sky.',
      'Seashells are like hidden treasures waiting for us by the ocean. They don\'t all look the same; some are big, some are small, and they come in many different shapes and colors. When we visit the beach, it\'s like going on a treasure hunt in the soft sand to find these special gifts from the sea. And the best part is, each seashell has its own unique story, like a message from the ocean, just waiting for us to discover and listen to..',
    ],
    medium: [
      // Medium difficulty paragraphs
      'In a cozy, little cottage by the edge of a tranquil lake, an old fisherman sat quietly with his Surrounded by the charm of his cozy cottage, the old fisherman, Mr. Thompson, sat in tranquil anticipation. The sun\'s warm hues of orange and pink painted the sky as he patiently watched the water\'s surface, hopeful for a gentle tug on his line, and all the while, he marveled at the beauty of nature\'s evening display.fishing rod. The sun painted the sky with warm hues of orange and pink as he patiently waited for a fish to bite.',
      'Under the shade of a massive oak tree, children played, their laughter echoing through the park. Birds sang in harmony as a gentle breeze rustled the leaves. It was a perfect day for a picnic with friends and family. Families spread out colorful blankets, sharing delicious food and stories. The park was alive with the joyful spirit of togetherness.',
      'The ancient castle stood on the hill, its stone walls telling tales of centuries gone by. Tourists explored its winding corridors, captivated by the history that lingered in every nook and cranny. Ghostly legends whispered through the air. Within the castle\'s courtyard, vibrant flowers added a touch of life to the ancient stones, contrasting with the haunting whispers of legends that enchanted the air.',
      'Amidst the emerald fields, a rainbow stretched across the sky, its vibrant colors casting a magical glow. A gentle rain was falling, and the scent of fresh earth filled the air. Nature was painting a masterpiece, and all was right in the world. As the raindrops danced on the leaves, a chorus of frogs and crickets serenaded the scene, harmonizing with nature\'s masterpiece, creating a symphony of serenity and joy.',
    ],
    hard: [
      // Hard difficulty paragraphs
      'Amidst the cacophony of a bustling metropolis, a solitary street musician plays a haunting melody on his violin, captivating the hearts of passersby. The sound reverberates through the concrete canyons, echoing the collective yearning of a city that never sleeps. In the midst of the urban whirlwind, the musician\'s haunting notes became a balm for the city\'s soul, offering solace and unity to its diverse, ever-moving inhabitants.',
      'In the intricate labyrinth of life, we often find ourselves at crossroads, making choices that define our destiny. It is in these moments that our true character shines. The decisions we make ripple through time, shaping the narrative of our existence. Navigating life\'s labyrinth, we confront junctions where choices mold our future, revealing our essence. Our actions resonate through eternity, crafting our unique life story.',
      'The enigmatic beauty of the cosmos has long fascinated astronomers, who dedicate their lives to unraveling the mysteries of the universe, one celestial body at a time. They peer through the telescopes, studying distant galaxies, and ponder the origins of dark matter, pushing the boundaries of human understanding. With relentless passion, astronomers explore the cosmos, each discovery a step closer to understanding the universe\'s secrets, igniting our shared quest for knowledge.',
      'A virtuoso pianist takes center stage, captivating the audience with an electrifying performance that resonates deep within the souls of all who bear witness to his artistry. His fingers dance across the ivory keys, invoking emotions that transcend language, leaving the world in awe of the power of music. The pianist\'s music is a sonic voyage, a magical odyssey that traverses the realms of the heart and soul, uniting humanity through the universal language of melody.',
    ],
  };

  // Add an event listener to disable the backspace key
  document.addEventListener('keydown', function(event) {
    const inpField = document.querySelector('.typing-input');
    if (event.keyCode === 8 && document.activeElement === inpField) {
      event.preventDefault();
    }
  });

  const typingText = document.querySelector('.typed-text p');
  const inpField = document.querySelector('.typing-input');
  const tryAgainBtn = document.querySelector('button');
  const timeTag = document.querySelector('.time-left span b');
  const mistakeTag = document.querySelector('.errors span');
  const wpmTag = document.querySelector('.wpm span');
  const cpmTag = document.querySelector('.cpm span');

  let timer;
  const maxTime = 60;
  let timeLeft = maxTime;
  let charIndex = (mistakes = isTyping = 0);
  // eslint-disable-next-line no-unused-vars
  let totalCharacters = 0;

  let timerReachedZero = false;

  const difficultySelect = document.getElementById('difficulty');
  let selectedDifficulty = 'easy';

  difficultySelect.addEventListener('change', function() {
    selectedDifficulty = difficultySelect.value;
    resetGame();
  });

  // Load a random paragraph when the game starts
  const loadParagraph = function() {
    // Select a random paragraph based on the chosen difficulty
    const paragraphArray = paragraphs[selectedDifficulty];
    const ranIndex = Math.floor(Math.random() * paragraphArray.length);
    typingText.innerHTML = '';
    // Split and add each character of the paragraph as spans
    paragraphs[selectedDifficulty][ranIndex].split('').forEach((char) => {
      const span = `<span>${char}</span>`;
      typingText.innerHTML += span;
      totalCharacters++;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => inpField.focus());
    typingText.addEventListener('click', () => inpField.focus());
  };

  // Reset the game to its initial state
  const resetGame = function() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = '';
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;

    if (timeLeft === 0) {
      // Calculate accuracy after the timer reaches 0
      calculateAccuracy(document.getElementById('inputText'));

      saveHighScore(wpm, selectedDifficulty);
      displayHighScores(selectedDifficulty); // Display updated high scores here
    }
  };

  // Calculate typing accuracy
  const calculateAccuracy = function() {
    const accuracyLabel = document.querySelector('.errors p');
    const accuracy = ((charIndex - mistakes) / charIndex) * 100;

    accuracyLabel.textContent = 'Mistakes:';

    if (timerReachedZero) {
      accuracyLabel.textContent = 'Accuracy:';
    }

    mistakeTag.textContent = `${accuracy.toFixed(2)}%`;
  };

  // Play a timer sound
  const playTimerSound = function() {
    const timerSound = document.getElementById('timerSound');
    timerSound.play();
  };

  // JS for initatinbg typing within the input field
  const initTyping = function() {
    const characters = typingText.querySelectorAll('span');
    const typedChar = inpField.value.split('')[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
      if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }
      if (typedChar == null) {
        if (charIndex > 0) {
          charIndex--;
          if (characters[charIndex].classList.contains('incorrect')) {
            mistakes--;
          }
          characters[charIndex].classList.remove('correct', 'incorrect');
        }
      } else {
        if (characters[charIndex].innerText == typedChar) {
          characters[charIndex].classList.add('correct');
        } else {
          mistakes++;
          characters[charIndex].classList.add('incorrect');
        }
        charIndex++;
      }
      characters.forEach((span) => span.classList.remove('active'));
      characters[charIndex].classList.add('active');
      let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

      wpmTag.innerText = wpm;
      mistakeTag.innerText = mistakes;
      cpmTag.innerText = charIndex - mistakes;
    } else {
      clearInterval(timer);
      inpField.value = '';
      if (timeLeft === 0) {
        calculateAccuracy(document.getElementById('inputText'));
        saveHighScore(wpm, selectedDifficulty);
        displayHighScores(selectedDifficulty); // Display updated high scores
      }
    }
  };

  // Initialize typing and timer
  const initTimer = function() {
    if (timeLeft > 0) {
      timeLeft--;
      timeTag.innerText = timeLeft;
      const wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
      wpmTag.innerText = wpm;
    } else {
      clearInterval(timer);
      timerReachedZero = true;
      calculateAccuracy(document.getElementById('inputText'));
      playTimerSound();

      // Check if timeLeft is zero here and display high scores
      if (timeLeft === 0) {
        calculateAccuracy(document.getElementById('inputText'));
        const wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        saveHighScore(wpm, selectedDifficulty);
        displayHighScores(selectedDifficulty); // Display updated high scores
      }
    }
  };

  // Load a random paragraph when the game starts
  loadParagraph();

  inpField.addEventListener('input', initTyping);
  tryAgainBtn.addEventListener('click', resetGame);
}

// JS for the button on the landing page
document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startButton');

  if (startButton) {
    startButton.addEventListener('click', function() {
      window.location.href = 'game.html';
    });
  }
});

displayHighScores(selectedDifficulty);

// JS for disabling autocorrect
function disableAutoCorrect(inputElement) {
  inputElement.setAttribute('autocomplete', 'off');
  inputElement.setAttribute('autocapitalize', 'none');
}

