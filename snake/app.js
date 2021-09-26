const board = document.querySelector('#board');
const scoresNode = document.querySelector('#scores');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal h3');
const modalAction = document.querySelector('.modal button');
const SQUARES_NUMBERS = 300;
const countColumns = board.clientWidth / 20;
const countRows = SQUARES_NUMBERS / countColumns;
const squares = [];
const timeOut = 300;
let firstStart = true;
const colors = [
  '#e74c3c',
  '#8e44ad',
  '#3498db',
  '#e67e22',
  '#2ecc71',
  '#cc2e2e',
];

modalAction.addEventListener('click', start);

for (let i = 0; i < SQUARES_NUMBERS; i++) {
  const square = document.createElement('div');
  
  square.classList.add('square');
  board.append(square);
  squares.push(square);
}

function start() {
  let timeOutId = null;
  let direction = 'right';
  let canChangeDirection = true;
  let scores = 0;
  let snake = [[1, 1]];
  let target = [
    getRandomInteger(1, countRows),
    getRandomInteger(1, countColumns),
  ];
  
  modal.style.display = 'none';
  renderSnake();
  timeOutId = setTimeout(moveSnake, timeOut);
  
  document.addEventListener('keydown', (e) => {
    if (!canChangeDirection) {
      return;
    }
  
    switch (e.key) {
      case 'ArrowUp': {
        if (direction !== 'down') {
          direction = 'up';
        }
        break;
      }
      case 'ArrowDown': {
        if (direction !== 'up') {
          direction = 'down';
        }
        break;
      }
      case 'ArrowRight': {
        if (direction !== 'left') {
          direction = 'right';
        }
        break;
      }
      case 'ArrowLeft': {
        if (direction !== 'right') {
          direction = 'left';
        }
        break;
      }
    }
    canChangeDirection = false;
  });
  
  function renderSnake() {
    squares.forEach(item => {
      removeColor(item);
    })
    
    snake.forEach(item => {
      const square = getSquare(...item);
      
      setColor(square);
    });
  
    renderTarget();
  }
  
  function moveSnake() {
    const last = [...snake[snake.length - 1]];
    let gameOver = false;
    
    snake = snake.map((item, index, arr) => {
      let position = [...item];
      const first = index === 0;
      const lastIndex = snake.length - 1;
      
      if (first) {
        switch (direction) {
          case 'up': {
            position[0]--;
            
            if (position[0] < 1) {
              position[0] = countRows;
            }
            
            break;
          }
          case 'down': {
            position[0]++;
            
            if (position[0] > countRows) {
              position[0] = 1;
            }
            
            break;
          }
          case 'right': {
            position[1]++;
            
            if (position[1] > countColumns) {
              position[1] = 1;
            }
            
            break;
          }
          case 'left': {
            position[1]--;
            
            if (position[1] < 1) {
              position[1] = countColumns;
            }
            
            break;
          }
        }
        
        arr.forEach((item, index) => {
          if (index === 0) {
            return;
          }
          
          if (position[0] === item[0] && position[1] === item[1]) {
            return gameOver = true;
          }
        });
      } else {
        position = [...snake[index - 1]];
      }
      
      return position;
    });
    
    if (gameOver) {
      return gameOverFunction();
    }
    
    if (snake[0][0] === target[0] && snake[0][1] === target[1]) {
      snake.push(last);
      setTarget();
      scores++;
      scoresNode.innerText = `Счёт: ${scores}`;
    }
    
    renderSnake();
    
    timeOutId = setTimeout(() => {
      canChangeDirection = true;
      moveSnake();
    }, timeOut);
  }
  
  function setTarget() {
    target = [getRandomInteger(1, countRows), getRandomInteger(1, countColumns)];
  }
  
  function renderTarget() {
    const square = getSquare(...target);
    
    setColor(square);
  }
  
  function gameOverFunction() {
    clearTimeout(timeOutId);
    modalTitle.innerHTML = `Игра закончена<br>Счёт ${scores}`;
    modalAction.innerText = 'Начать заново';
    modal.style.display = 'flex';
  }
}

function setColor(element) {
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
  element.style.backgroundColor = '#1d1d1d';
  element.style.boxShadow = '0 0 2px #000';
}

function getRandomColor() {
  const index = getRandomInteger(0, colors.length);
  return colors[index];
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min)) + min;
}

function getSquare(row, column) {
  const squareIndex = (row - 1) * countColumns + column - 1;
  
  return squares[squareIndex];
}