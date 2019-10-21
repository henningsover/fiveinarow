let turnCounter = 0
let nextPlayer = 'X'
let selectedSize
const possibleSizes = 5
const sizeStep = 5
const maxSize = 25


const body = document.querySelector('body')
const gameContainer = document.querySelector('#gameContainer')
const statsContainer = document.querySelector('#statsContainer')
const welcomeMessage = document.querySelector('h2')
const sizeSelection = document.querySelector('#sizeSelection')
const sizeChoices = document.querySelector('#sizeChoices')
const turnsMadeMessage = document.querySelector('#turnsMadeMessage')
const whoseTurnMessage = document.querySelector('#whoseTurnMessage')
const winScreen = document.querySelector('#winScreen')
const winMessage = document.querySelector('#winMessage')

drawSizeSelectionBtns(possibleSizes)

function drawSizeSelectionBtns(sizes) {
  const sizeSelectionBtns = []
  let currentSize = sizeStep
  for (let i = 0; i < sizes; i++) {
    sizeSelectionBtns[i] = document.createElement('button')
    sizeSelectionBtns[i].id = 'size_' + currentSize
    sizeSelectionBtns[i].classList.add('size_selection_button')
    sizeSelectionBtns[i].textContent = `${currentSize}x${currentSize}`
    sizeSelectionBtns[i].addEventListener('click', function (event) {
      selectedSize = parseInt(sizeSelectionBtns[i].id.substring(5));
      drawBoard(selectedSize)
    })
    sizeChoices.appendChild(sizeSelectionBtns[i])
    if (currentSize >= maxSize) break;
    currentSize += sizeStep
  }
}


// let currentButton
function drawBoard(size) {
  sizeSelection.classList.add('hide')
  welcomeMessage.classList.add('hide')
  turnsMadeMessage.classList.remove('hide')
  whoseTurnMessage.classList.remove('hide')


  const board = []
  for (let i = 0; i < size; i++) {
    board[i] = []
    for (let j = 0; j < size; j++) {
      board[i][j] = document.createElement('button')
      board[i][j].id = 'button_' + i + '-' + j
      board[i][j].classList.add('unchecked_button')
      board[i][j].addEventListener('click', function (event) {
        const currentPlayer = turnCounter % 2 === 0 ? 'X' : 'O';
        board[i][j].classList.replace('unchecked_button', 'checked_button_' + currentPlayer)
        board[i][j].textContent = currentPlayer
        board[i][j].disabled = true
        turnCounter++
        const currentButtonY = i
        const currentButtonX = j
        const hasWon = getWinner(board, currentButtonY, currentButtonX, currentPlayer)
        updateStats(turnCounter, hasWon)

      })
      gameContainer.appendChild(board[i][j])
      if ((j + 1) % size === 0) {
        const br = document.createElement('br')
        gameContainer.appendChild(br)
      }
    }
  }
}
updateStats(turnCounter)

function updateStats(turnCounter, winner) {
  if (winner === 'X' || winner === 'O') {
    gameContainer.classList.add('hide')
    winScreen.classList.remove('hide')
    winMessage.classList.remove('hide')
    winMessage.textContent = `${winner} vann!!`
  }
  if (turnCounter % 2 === 0) {
    nextPlayer = 'X'
  } else {
    nextPlayer = 'O'
  }
  turnsMadeMessage.textContent = `${turnCounter} drag har gjorts`
  whoseTurnMessage.textContent = `Det är ${nextPlayer}:s drag`
}

function getWinner(board, staticY, staticX, player) {
  let inRowPoints = 0
  let startRow = staticY - 4
  if (startRow < 0) { startRow = 0 }
  let endRow = staticY + 4
  if (endRow > selectedSize - 1) { endRow = selectedSize - 1}
  let startButton = staticX - 4
  if (startButton < 0) { startButton = 0 }
  let endButton = staticX + 4
  if (endButton > selectedSize -1) { endButton = selectedSize -1}

  for (let i = startRow; i <= endRow; i++) {
    if (board[i][staticX].classList.contains('checked_button_' + player)){
      inRowPoints++
    }
    if (inRowPoints === 5){
      return player
    } 
  }
  inRowPoints = 0

  for (let i = startButton; i <= endButton; i++) {
    if(board[staticY][i].classList.contains('checked_button_' + player)) {
      inRowPoints++
    }
    if (inRowPoints === 5){
      return player
    }
  }
  inRowPoints = 0

  // for (let i = startRow; i <= endRow; i++) {
  //   for (let j = startButton; j <= endButton; i++) {
  //     if(board[i][j].classList.contains('checked_button_' + player)) {
  //       inRowPoints++
  //     }
  //     if (inRowPoints === 5){
  //       return player
  //     }
  //   }
  // }
  // inRowPoints = 0
}

// function showWinScreen(winner) {
//   gameContainer.classList.add('hidden')
//   winScreen.classList.remove('hidden')
//   winMessage.classList.remove('hidden')

// }
// function getStartPlayer() {
//   const returnValue = Math.round(Math.random())
//   if (returnValue === 0) {

//   }
// }
