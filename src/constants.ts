import type { PieceSymbols } from './types'

// Symbole bierek w stylu chess.com
export const PIECE_SYMBOLS: PieceSymbols = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
}

// Koordynaty szachownicy
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const
export const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'] as const

// Ustawienia gry
export const DEFAULT_TIME_CONTROL = 15 * 60 // 15 minut w sekundach
export const COMPUTER_MOVE_DELAY = 500 // Opóźnienie ruchu komputera w ms

// Kolory pól szachownicy
export const LIGHT_SQUARE_COLOR = '#F0D9B5'
export const DARK_SQUARE_COLOR = '#B58863'

// Typy bierek
export const PIECE_TYPES = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'] as const

// Kolory graczy
export const PLAYER_COLORS = ['white', 'black'] as const

// Tryby gry
export const GAME_MODES = ['human', 'computer'] as const
