<template>
  <div class="chess-board-container">
    <!-- Timer -->
    <div class="timer-display">
      <div class="timer white-timer" :class="{ active: currentPlayer === 'white' && gameStarted }">
        <div class="timer-label">Białe</div>
        <div class="timer-value" :class="{ warning: whiteTime < 60, danger: whiteTime < 30 }">
          {{ formatTime(whiteTime) }}
        </div>
      </div>
      <div class="timer black-timer" :class="{ active: currentPlayer === 'black' && gameStarted }">
        <div class="timer-label">Czarne</div>
        <div class="timer-value" :class="{ warning: blackTime < 60, danger: blackTime < 30 }">
          {{ formatTime(blackTime) }}
        </div>
      </div>
    </div>

    <div v-if="isComputerThinking" class="computer-thinking">
      <div class="thinking-spinner"></div>
      <span>Komputer myśli...</span>
    </div>
    <div class="chess-board" :class="{ 'flipped': playerColor === 'black' }">
      <div
        v-for="(square, index) in boardSquares"
        :key="index"
        :class="[
          'square',
          square.color,
          { 
            'highlighted': square.highlighted,
            'possible-move': square.possibleMove,
            'selected': square.selected,
            'dragging-over': square.draggingOver
          }
        ]"
        @click="handleSquareClick(square)"
        @dragover.prevent="handleDragOver(square, $event)"
        @dragenter.prevent="handleDragEnter(square, $event)"
        @dragleave.prevent="handleDragLeave(square, $event)"
        @drop.prevent="handleDrop(square, $event)"
      >
        <div
          v-if="square.piece"
          class="piece"
          :class="[
            `piece-${square.piece.color}`,
            { 'dragging': square.piece === draggedPiece }
          ]"
          :draggable="true"
          @dragstart="handleDragStart(square, $event)"
          @dragend="handleDragEnd"
        >
          {{ getPieceSymbol(square.piece) }}
        </div>
        <div v-if="square.coordinate" class="coordinate">
          {{ square.coordinate }}
        </div>
        <!-- Wskaźnik możliwego ruchu -->
        <div v-if="square.possibleMove && !square.piece" class="move-indicator"></div>
        <div v-if="square.possibleMove && square.piece" class="capture-indicator"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ChessPiece, Square, PlayerColor, GameMode, CastlingRights } from '../types'
import { PIECE_SYMBOLS, FILES, RANKS, DEFAULT_TIME_CONTROL, COMPUTER_MOVE_DELAY } from '../constants'
import { getLegalMoves, isKingInCheck, hasAnyLegalMove } from '../chess'
import { playMove, playCapture, playCheck, playCheckmate, playCastling } from '../sounds'

// Stan szachownicy
const boardSquares = ref<Square[]>([])
const draggedPiece = ref<ChessPiece | null>(null)
const draggedFromSquare = ref<Square | null>(null)
const currentPlayer = ref<PlayerColor>('white')
const gameMode = ref<GameMode>('computer') // Domyślnie gra z komputerem
const isComputerThinking = ref(false)
const playerColor = ref<PlayerColor>('white') // Kolor gracza
const gameOver = ref(false)
const castlingRights = ref<CastlingRights>({
  whiteKingside: true,
  whiteQueenside: true,
  blackKingside: true,
  blackQueenside: true,
})

// Timer
const whiteTime = ref(DEFAULT_TIME_CONTROL)
const blackTime = ref(DEFAULT_TIME_CONTROL)
const timerInterval = ref<number | null>(null)
const gameStarted = ref(false)

// Symbole bierek w stylu chess.com
const pieceSymbols = PIECE_SYMBOLS

// Funkcja do pobierania symbolu bierki
const getPieceSymbol = (piece: ChessPiece): string => {
  return pieceSymbols[piece.color][piece.type]
}

// Funkcje timera
const startTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
  
  timerInterval.value = setInterval(() => {
    if (currentPlayer.value === 'white') {
      whiteTime.value--
      if (whiteTime.value <= 0) {
        endGame('black') // Czarne wygrywają na czas
      }
    } else {
      blackTime.value--
      if (blackTime.value <= 0) {
        endGame('white') // Białe wygrywają na czas
      }
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const resetTimer = () => {
  stopTimer()
  whiteTime.value = DEFAULT_TIME_CONTROL
  blackTime.value = DEFAULT_TIME_CONTROL
  gameStarted.value = false
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const endGame = (winner: PlayerColor) => {
  stopTimer()
  gameOver.value = true
  setTimeout(() => {
    alert(`Gra zakończona! Wygrały ${winner === 'white' ? 'białe' : 'czarne'}!`)
  }, 1500)
}

// Funkcja do resetowania gry
const resetGame = () => {
  stopTimer()
  gameOver.value = false
  castlingRights.value = { whiteKingside: true, whiteQueenside: true, blackKingside: true, blackQueenside: true }
  const squares = createBoard()
  boardSquares.value = setupInitialPosition(squares)
  currentPlayer.value = 'white'
  clearHighlights()
  resetTimer()
  console.log('Gra zresetowana')
}

// Funkcja do ustawienia koloru gracza
const setPlayerColor = (color: PlayerColor) => {
  playerColor.value = color
  // Resetuj grę z nowym kolorem
  resetGame()
  console.log(`Gracz wybrał kolor: ${color}`)
}

// Funkcja do tworzenia szachownicy
const createBoard = (): Square[] => {
  const squares: Square[] = []
  const files = FILES
  const ranks = RANKS
  
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const coordinate = files[file] + ranks[rank]
      const isLight = (rank + file) % 2 === 0
      
      squares.push({
        id: coordinate,
        color: isLight ? 'light' : 'dark',
        piece: null,
        coordinate: '',
        highlighted: false,
        possibleMove: false,
        selected: false,
        draggingOver: false
      })
    }
  }
  
  return squares
}

// Funkcja do ustawienia początkowego układu bierek
const setupInitialPosition = (squares: Square[]): Square[] => {
  const updatedSquares = [...squares]
  
  // Czarne bierki (rząd 8 - góra)
  const blackPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  for (let i = 0; i < 8; i++) {
    const squareIndex = i // rząd 8 (indeksy 0-7)
    updatedSquares[squareIndex].piece = {
      type: blackPieces[i] as any,
      color: 'black'
    }
  }
  
  // Czarne piony (rząd 7)
  for (let i = 0; i < 8; i++) {
    const squareIndex = 8 + i // rząd 7 (indeksy 8-15)
    updatedSquares[squareIndex].piece = {
      type: 'pawn',
      color: 'black'
    }
  }
  
  // Białe piony (rząd 2)
  for (let i = 0; i < 8; i++) {
    const squareIndex = 48 + i // rząd 2 (indeksy 48-55)
    updatedSquares[squareIndex].piece = {
      type: 'pawn',
      color: 'white'
    }
  }
  
  // Białe bierki (rząd 1 - dół)
  const whitePieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  for (let i = 0; i < 8; i++) {
    const squareIndex = 56 + i // rząd 1 (indeksy 56-63)
    updatedSquares[squareIndex].piece = {
      type: whitePieces[i] as any,
      color: 'white'
    }
  }
  
  return updatedSquares
}

// Funkcja do czyszczenia podświetleń
const clearHighlights = () => {
  boardSquares.value.forEach(square => {
    square.highlighted = false
    square.possibleMove = false
    square.selected = false
    square.draggingOver = false
  })
}

// Funkcja do podświetlania możliwych ruchów
const highlightPossibleMoves = (piece: ChessPiece, fromSquare: Square) => {
  clearHighlights()
  fromSquare.selected = true
  getLegalMoves(piece, fromSquare, boardSquares.value, castlingRights.value).forEach(move => {
    const square = boardSquares.value.find(s => s.id === move)
    if (square) square.possibleMove = true
  })
}

// Funkcje obsługi drag & drop
const handleDragStart = (square: Square, event: DragEvent) => {
  if (gameOver.value || (gameMode.value === 'computer' && currentPlayer.value !== playerColor.value)) {
    event.preventDefault()
    return
  }
  
  if (!square.piece || square.piece.color !== currentPlayer.value) return
  
  draggedPiece.value = square.piece
  draggedFromSquare.value = square
  highlightPossibleMoves(square.piece, square)
  
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', square.id)
  }
}

const handleDragEnd = () => {
  clearHighlights()
  draggedPiece.value = null
  draggedFromSquare.value = null
}

const handleDragOver = (square: Square, event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = square.possibleMove ? 'move' : 'none'
  }
}

const handleDragEnter = (square: Square, event: DragEvent) => {
  if (square.possibleMove) {
    square.draggingOver = true
  }
}

const handleDragLeave = (square: Square, event: DragEvent) => {
  square.draggingOver = false
}

const handleDrop = (square: Square, event: DragEvent) => {
  square.draggingOver = false
  
  if (!draggedPiece.value || !draggedFromSquare.value || !square.possibleMove) {
    return
  }
  
  // Wykonaj ruch
  makeMove(draggedFromSquare.value, square)
}

// Aktualizuje prawa do roszady po ruchu
const updateCastlingRights = (piece: ChessPiece, fromId: string) => {
  if (piece.type === 'king') {
    if (piece.color === 'white') { castlingRights.value.whiteKingside = false; castlingRights.value.whiteQueenside = false }
    else { castlingRights.value.blackKingside = false; castlingRights.value.blackQueenside = false }
  }
  if (piece.type === 'rook') {
    if (fromId === 'h1') castlingRights.value.whiteKingside = false
    if (fromId === 'a1') castlingRights.value.whiteQueenside = false
    if (fromId === 'h8') castlingRights.value.blackKingside = false
    if (fromId === 'a8') castlingRights.value.blackQueenside = false
  }
}

// Funkcja do wykonania ruchu
const makeMove = (fromSquare: Square, toSquare: Square) => {
  if (gameOver.value) return

  const piece = fromSquare.piece!
  const isCapture = !!toSquare.piece

  // Wykryj roszadę: król przesuwa się o 2 pola w poziomie
  const fromFile = fromSquare.id.charCodeAt(0) - 'a'.charCodeAt(0)
  const toFile = toSquare.id.charCodeAt(0) - 'a'.charCodeAt(0)
  const isCastling = piece.type === 'king' && Math.abs(fromFile - toFile) === 2

  // Wykonaj ruch króla
  toSquare.piece = piece
  fromSquare.piece = null

  // Jeśli roszada — przesuń też wieżę
  if (isCastling) {
    const rank = fromSquare.id[1]
    const kingside = toFile > fromFile
    const rookFromId = kingside ? `h${rank}` : `a${rank}`
    const rookToId = kingside ? `f${rank}` : `d${rank}`
    const rookFrom = boardSquares.value.find(s => s.id === rookFromId)!
    const rookTo = boardSquares.value.find(s => s.id === rookToId)!
    rookTo.piece = rookFrom.piece
    rookFrom.piece = null
  }

  updateCastlingRights(piece, fromSquare.id)

  if (!gameStarted.value) {
    gameStarted.value = true
    startTimer()
  }

  currentPlayer.value = currentPlayer.value === 'white' ? 'black' : 'white'
  clearHighlights()

  const nextPlayer = currentPlayer.value
  const inCheck = isKingInCheck(nextPlayer, boardSquares.value)
  const noMoves = !hasAnyLegalMove(nextPlayer, boardSquares.value, castlingRights.value)

  if (inCheck && noMoves) {
    playCheckmate()
    endGame(nextPlayer === 'white' ? 'black' : 'white')
    return
  } else if (isCastling) {
    playCastling()
  } else if (inCheck) {
    playCheck()
  } else if (isCapture) {
    playCapture()
  } else {
    playMove()
  }

  if (gameMode.value === 'computer' && currentPlayer.value !== playerColor.value) {
    setTimeout(makeComputerMove, COMPUTER_MOVE_DELAY)
  }
}

// Funkcja do wykonania ruchu komputera
const makeComputerMove = () => {
  if (isComputerThinking.value) return
  
  isComputerThinking.value = true
  
  const computerColor = playerColor.value === 'white' ? 'black' : 'white'

  // Zbierz wszystkie legalne ruchy komputera (ta sama logika co dla gracza)
  const legalMoves: { from: Square; to: string }[] = []
  boardSquares.value.forEach(square => {
    if (square.piece && square.piece.color === computerColor) {
      getLegalMoves(square.piece, square, boardSquares.value, castlingRights.value).forEach(to => {
        legalMoves.push({ from: square, to })
      })
    }
  })

  if (legalMoves.length > 0) {
    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
    const targetSquare = boardSquares.value.find(s => s.id === randomMove.to)
    if (targetSquare) {
      makeMove(randomMove.from, targetSquare)
    }
  }

  isComputerThinking.value = false
}

// Funkcja obsługi kliknięcia na pole
const handleSquareClick = (square: Square) => {
  if (gameOver.value) return
  if (gameMode.value === 'computer' && currentPlayer.value !== playerColor.value) return
  
  if (square.piece && square.piece.color === currentPlayer.value) {
    highlightPossibleMoves(square.piece, square)
  } else if (square.possibleMove && draggedFromSquare.value) {
    // Wykonaj ruch przez kliknięcie
    makeMove(draggedFromSquare.value, square)
  } else {
    clearHighlights()
  }
}

// Eksportuj funkcje dla komponentu nadrzędnego
defineExpose({
  resetGame,
  setPlayerColor,
  formatTime,
  whiteTime,
  blackTime,
  currentPlayer,
  gameStarted,
  playerColor
})

// Inicjalizacja szachownicy
onMounted(() => {
  const squares = createBoard()
  boardSquares.value = setupInitialPosition(squares)
})

// Cleanup timer przy unmount
onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.chess-board-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
}

.computer-thinking {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  font-weight: 600;
}

.thinking-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.timer-display {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.timer {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.timer.active {
  border-color: #42b883;
  box-shadow: 0 0 10px rgba(66, 184, 131, 0.3);
  transform: scale(1.05);
}

.timer-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
}

.timer-value {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: #2c3e50;
}

.timer-value.warning {
  color: #f39c12;
}

.timer-value.danger {
  color: #e74c3c;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.chess-board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 480px;
  height: 480px;
  border: 3px solid #8B4513;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease;
}

.chess-board.flipped {
  transform: rotate(180deg);
}

.square {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.square.light {
  background-color: #F0D9B5; /* Jasny brąz */
}

.square.dark {
  background-color: #B58863; /* Ciemny brąz */
}

.square:hover {
  box-shadow: inset 0 0 0 2px #FFD700;
}

.square.highlighted {
  background-color: #FFFF99 !important;
  box-shadow: inset 0 0 0 2px #FF6B6B;
}

.square.selected {
  background-color: #FFD700 !important;
  box-shadow: inset 0 0 0 3px #FF8C00;
}

.square.possible-move {
  position: relative;
}

.square.dragging-over {
  background-color: #90EE90 !important;
  box-shadow: inset 0 0 0 2px #32CD32;
}

.piece {
  font-size: 2.5rem;
  font-weight: bold;
  user-select: none;
  transition: transform 0.2s ease;
  line-height: 1;
}

.piece-white {
  color: #ffffff;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000,
    -2px  0   0 #000,
     2px  0   0 #000,
     0   -2px 0 #000,
     0    2px 0 #000;
}

.piece-black {
  color: #4a4a4a;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000,
    -2px  0   0 #000,
     2px  0   0 #000,
     0   -2px 0 #000,
     0    2px 0 #000;
}

.chess-board.flipped .piece {
  transform: rotate(180deg);
}

.piece:hover {
  transform: scale(1.1);
}

.chess-board.flipped .piece:hover {
  transform: rotate(180deg) scale(1.1);
}

.piece.dragging {
  opacity: 0.5;
  transform: scale(1.2);
  z-index: 1000;
}

.chess-board.flipped .piece.dragging {
  transform: rotate(180deg) scale(1.2);
}

.move-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  pointer-events: none;
}

.capture-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid rgba(255, 0, 0, 0.7);
  border-radius: 4px;
  pointer-events: none;
}

.coordinate {
  position: absolute;
  font-size: 0.7rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

/* Koordynaty na krawędziach */
.square:nth-child(1) .coordinate,
.square:nth-child(2) .coordinate,
.square:nth-child(3) .coordinate,
.square:nth-child(4) .coordinate,
.square:nth-child(5) .coordinate,
.square:nth-child(6) .coordinate,
.square:nth-child(7) .coordinate,
.square:nth-child(8) .coordinate {
  bottom: 2px;
  right: 4px;
}

.square:nth-child(8n+1) .coordinate {
  top: 2px;
  left: 4px;
}

/* Responsywność */
@media (max-width: 600px) {
  .chess-board {
    width: 320px;
    height: 320px;
  }
  
  .piece {
    font-size: 1.8rem;
  }
}
</style>
