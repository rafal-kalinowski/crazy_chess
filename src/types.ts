// Typy dla gry w szachy

export interface ChessPiece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  color: 'white' | 'black'
}

export interface Square {
  id: string
  color: 'light' | 'dark'
  piece: ChessPiece | null
  coordinate: string
  highlighted: boolean
  possibleMove: boolean
  selected: boolean
  draggingOver: boolean
}

export type PlayerColor = 'white' | 'black'

export interface CastlingRights {
  whiteKingside: boolean
  whiteQueenside: boolean
  blackKingside: boolean
  blackQueenside: boolean
}

export type GameMode = 'human' | 'computer'

export interface GameState {
  currentPlayer: PlayerColor
  gameMode: GameMode
  playerColor: PlayerColor
  gameStarted: boolean
  isComputerThinking: boolean
}

export interface TimerState {
  whiteTime: number
  blackTime: number
  timerInterval: number | null
}

export interface Move {
  from: string
  to: string
  piece: ChessPiece
  capturedPiece?: ChessPiece
}

export interface GameResult {
  winner: PlayerColor
  reason: 'checkmate' | 'timeout' | 'resignation' | 'stalemate'
}

// Typy dla symboli bierek
export interface PieceSymbols {
  white: {
    king: string
    queen: string
    rook: string
    bishop: string
    knight: string
    pawn: string
  }
  black: {
    king: string
    queen: string
    rook: string
    bishop: string
    knight: string
    pawn: string
  }
}

// Typy dla koordynat szachownicy
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type Coordinate = `${File}${Rank}`

// Typy dla pozycji na szachownicy
export interface Position {
  file: number // 0-7 (a-h)
  rank: number // 0-7 (1-8)
}

// Typy dla walidacji ruchów
export interface MoveValidation {
  isValid: boolean
  reason?: string
  isCheck?: boolean
  isCheckmate?: boolean
  isStalemate?: boolean
}

// Typy dla historii gry
export interface GameHistory {
  moves: Move[]
  currentMoveIndex: number
}

// Typy dla ustawień gry
export interface GameSettings {
  timeControl: number // w sekundach
  gameMode: GameMode
  playerColor: PlayerColor
  soundEnabled: boolean
  animationsEnabled: boolean
}
