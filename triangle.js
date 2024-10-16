const gameContainer = document.getElementById('game-container');
          const scoreElement = document.getElementById('score');
          const timerElement = document.getElementById('timer');
          const startBtn = document.getElementById('startBtn');
          const pauseBtn = document.getElementById('pauseBtn');

          let score = 0;
          let timeLeft = 30;
          let gameInterval;
          let isPaused = false;

          function createTriangle() {
              const triangle = document.createElement('div');
              triangle.classList.add('triangle');
              triangle.style.left = Math.random() * (gameContainer.offsetWidth - gameContainer.offsetWidth * 0.1) + 'px';
              triangle.style.top = '-8vmin';
              triangle.style.borderBottomColor = getBrightColor();
              gameContainer.appendChild(triangle);

              const speed = (Math.random() * 0.5 + 0.5) * gameContainer.offsetHeight / 100;
        
              function moveTriangle() {
                  if (!isPaused) {
                      const top = parseFloat(triangle.style.top);
                      if (top >= gameContainer.offsetHeight) {
                          gameContainer.removeChild(triangle);
                      } else {
                          triangle.style.top = (top + speed) + 'px';
                          requestAnimationFrame(moveTriangle);
                      }
                  } else {
                      requestAnimationFrame(moveTriangle);
                  }
              }

              moveTriangle();

              triangle.addEventListener('click', () => {
                  if (!isPaused) {
                      gameContainer.removeChild(triangle);
                      score++;
                      scoreElement.textContent = `Score: ${score}`;
                  }
              });
          }

          function getBrightColor() {
              const hue = Math.floor(Math.random() * 360);
              return `hsl(${hue}, 100%, 50%)`;
          }

          function startGame() {
              score = 0;
              timeLeft = 30;
              scoreElement.textContent = 'Score: 0';
              timerElement.textContent = 'Time: 30';
              isPaused = false;

              clearInterval(gameInterval);
              gameInterval = setInterval(() => {
                  if (!isPaused) {
                      createTriangle();
                      timeLeft--;
                      timerElement.textContent = `Time: ${timeLeft}`;

                      if (timeLeft <= 0) {
                          endGame();
                      }
                  }
              }, 1000);
          }

          function endGame() {
              clearInterval(gameInterval);
              alert(`Game Over! Your score is: ${score}`);
              resetGame();
          }

          function resetGame() {
              gameContainer.innerHTML = `
                  <div id="score">Score: 0</div>
                  <div id="timer">Time: 30</div>
                  <div id="controls">
                      <button id="startBtn">Start</button>
                      <button id="pauseBtn">Pause</button>
                  </div>
              `;
              score = 0;
              timeLeft = 30;
              isPaused = false;
              startBtn.textContent = 'Start';
              pauseBtn.textContent = 'Pause';
          }

          function pauseGame() {
              isPaused = !isPaused;
              pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
          }

          startBtn.addEventListener('click', startGame);
          pauseBtn.addEventListener('click', pauseGame);

          window.addEventListener('resize', () => {
              resetGame();
          });