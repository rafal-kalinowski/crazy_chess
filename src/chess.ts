import type { ChessPiece, Square, PlayerColor } from './types'

export const getPossibleMoves = (piece: ChessPiece, fromSquare: Square, squares: Square[]): string[] => {
  const moves: string[] = []
  const [file, rank] = fromSquare.id.split('')
  const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0)
  const rankIndex = parseInt(rank) - 1

  switch (piece.type) {
    case 'pawn': {
      const direction = piece.color === 'white' ? 1 : -1
      const startRank = piece.color === 'white' ? 1 : 6

      const newRank = rankIndex + direction
      if (newRank >= 0 && newRank < 8) {
        const forwardSquare = String.fromCharCode(file.charCodeAt(0)) + (newRank + 1)
        if (!squares.find(s => s.id === forwardSquare)?.piece) {
          moves.push(forwardSquare)
        }
      }

      if (rankIndex === startRank) {
        const doubleMoveRank = rankIndex + (2 * direction)
        if (doubleMoveRank >= 0 && doubleMoveRank < 8) {
          const intermediate = String.fromCharCode(file.charCodeAt(0)) + (rankIndex + direction + 1)
          const doubleMoveSquare = String.fromCharCode(file.charCodeAt(0)) + (doubleMoveRank + 1)
          if (!squares.find(s => s.id === intermediate)?.piece && !squares.find(s => s.id === doubleMoveSquare)?.piece) {
            moves.push(doubleMoveSquare)
          }
        }
      }

      for (const fileOffset of [-1, 1]) {
        const newFileIndex = fileIndex + fileOffset
        if (newFileIndex >= 0 && newFileIndex < 8) {
          const newFile = String.fromCharCode('a'.charCodeAt(0) + newFileIndex)
          const captureRank = rankIndex + direction
          if (captureRank >= 0 && captureRank < 8) {
            const captureSquare = newFile + (captureRank + 1)
            const capturePiece = squares.find(s => s.id === captureSquare)?.piece
            if (capturePiece && capturePiece.color !== piece.color) {
              moves.push(captureSquare)
            }
          }
        }
      }
      break
    }

    case 'rook': {
      for (const [fileOffset, rankOffset] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        for (let i = 1; i < 8; i++) {
          const newFileIndex = fileIndex + fileOffset * i
          const newRankIndex = rankIndex + rankOffset * i
          if (newFileIndex < 0 || newFileIndex >= 8 || newRankIndex < 0 || newRankIndex >= 8) break
          const target = String.fromCharCode('a'.charCodeAt(0) + newFileIndex) + (newRankIndex + 1)
          const targetPiece = squares.find(s => s.id === target)?.piece
          if (!targetPiece) {
            moves.push(target)
          } else {
            if (targetPiece.color !== piece.color) moves.push(target)
            break
          }
        }
      }
      break
    }

    case 'bishop': {
      for (const [fileOffset, rankOffset] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        for (let i = 1; i < 8; i++) {
          const newFileIndex = fileIndex + fileOffset * i
          const newRankIndex = rankIndex + rankOffset * i
          if (newFileIndex < 0 || newFileIndex >= 8 || newRankIndex < 0 || newRankIndex >= 8) break
          const target = String.fromCharCode('a'.charCodeAt(0) + newFileIndex) + (newRankIndex + 1)
          const targetPiece = squares.find(s => s.id === target)?.piece
          if (!targetPiece) {
            moves.push(target)
          } else {
            if (targetPiece.color !== piece.color) moves.push(target)
            break
          }
        }
      }
      break
    }

    case 'queen': {
      for (const [fileOffset, rankOffset] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        for (let i = 1; i < 8; i++) {
          const newFileIndex = fileIndex + fileOffset * i
          const newRankIndex = rankIndex + rankOffset * i
          if (newFileIndex < 0 || newFileIndex >= 8 || newRankIndex < 0 || newRankIndex >= 8) break
          const target = String.fromCharCode('a'.charCodeAt(0) + newFileIndex) + (newRankIndex + 1)
          const targetPiece = squares.find(s => s.id === target)?.piece
          if (!targetPiece) {
            moves.push(target)
          } else {
            if (targetPiece.color !== piece.color) moves.push(target)
            break
          }
        }
      }
      break
    }

    case 'king': {
      for (const [fileOffset, rankOffset] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const newFileIndex = fileIndex + fileOffset
        const newRankIndex = rankIndex + rankOffset
        if (newFileIndex >= 0 && newFileIndex < 8 && newRankIndex >= 0 && newRankIndex < 8) {
          const target = String.fromCharCode('a'.charCodeAt(0) + newFileIndex) + (newRankIndex + 1)
          const targetPiece = squares.find(s => s.id === target)?.piece
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(target)
          }
        }
      }
      break
    }

    case 'knight': {
      for (const [fileOffset, rankOffset] of [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]) {
        const newFileIndex = fileIndex + fileOffset
        const newRankIndex = rankIndex + rankOffset
        if (newFileIndex >= 0 && newFileIndex < 8 && newRankIndex >= 0 && newRankIndex < 8) {
          const target = String.fromCharCode('a'.charCodeAt(0) + newFileIndex) + (newRankIndex + 1)
          const targetPiece = squares.find(s => s.id === target)?.piece
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(target)
          }
        }
      }
      break
    }
  }

  return moves
}

export const simulateMove = (squares: Square[], from: Square, toId: string): Square[] => {
  return squares.map(s => {
    if (s.id === toId) return { ...s, piece: from.piece }
    if (s.id === from.id) return { ...s, piece: null }
    return s
  })
}

export const isKingInCheck = (color: PlayerColor, squares: Square[]): boolean => {
  const king = squares.find(s => s.piece?.type === 'king' && s.piece?.color === color)
  if (!king) return false
  const opponentColor: PlayerColor = color === 'white' ? 'black' : 'white'
  return squares.some(s => {
    if (!s.piece || s.piece.color !== opponentColor) return false
    return getPossibleMoves(s.piece, s, squares).includes(king.id)
  })
}

// Zwraca tylko legalne ruchy — niezostawiające własnego króla w szachu
export const getLegalMoves = (piece: ChessPiece, fromSquare: Square, squares: Square[]): string[] => {
  return getPossibleMoves(piece, fromSquare, squares).filter(to => {
    return !isKingInCheck(piece.color, simulateMove(squares, fromSquare, to))
  })
}
