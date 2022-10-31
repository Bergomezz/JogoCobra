let canvas = document.getElementById('snake')
let context = canvas.getContext('2d');
let box = 32
let snake = []
const bgColor = 'black'
const sColor = 'white'
const foodColor = 'red'

snake[0] = {
  x: 8 * box,
  y: 8 * box,
}
let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
}
let fast = 15
let medium = 100
let slow = 100

function generateBox(color, x, y, w, h) {
  context.fillStyle = color
  context.fillRect(x, y, w, h)
}

function createBG() {
  generateBox(bgColor, 0, 0, 16 * box, 16 * box)
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    generateBox(sColor, snake[i].x, snake[i].y, box, box)
  }
}
function clearSnake() {
  for (i = 0; i < snake.length; i++) {
    generateBox(bgColor, snake[i].x, snake[i].y, box, box)
  }
}
function drawFood() {
  generateBox(foodColor, food.x, food.y, box, box)
}

function snakeMoviment(speed) {
  clearSnake();
  for (let item of snake) {
    if (direction == 'right') {
      item.x += speed
    }
    if (direction == 'left') {
      item.x -= speed
    }
    if (direction == 'up') {
      item.y += speed
    }
    if (direction == 'down') {
      item.y -= speed
    }
  }
  createSnake();
  console.log("s", snake);

}

document.addEventListener('keydown', update)

function update(e) {
  if (e.keyCode == 37 && direction != 'right') direction = 'left'
  if (e.keyCode == 40 && direction != 'down') direction = 'up'
  if (e.keyCode == 39 && direction != 'left') direction = 'right'
  if (e.keyCode == 38 && direction != 'up') direction = 'down'
}

function startGame() {
  snakeMoviment(fast)
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].x < 0 && direction == 'right') snake[0].y = 16 * box

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game)
      alert('Game Over: Try Again')
      btn.className = 'restart'
    }
  }
}

createBG()
drawFood()

let snakeX = snake[0].x
let snakeY = snake[0].y

if (direction == 'right') snakeX += box
if (direction == 'left') snakeX -= box
if (direction == 'up') snakeY -= box
if (direction == 'down') snakeY += box

if (snakeX != food.x || snakeY != food.y) {
  snake.pop()
} else {
  food.x = Math.floor(Math.random() * 15 + 1) * box
  food.y = Math.floor(Math.random() * 15 + 1) * box
}

let newHead = {
  x: snakeX,
  y: snakeY,
}

snake.unshift(newHead)

let btn = document.querySelector('#refresh')

btn.addEventListener('click', () => {
  location.reload()
})

let game = setInterval(startGame, 100)
