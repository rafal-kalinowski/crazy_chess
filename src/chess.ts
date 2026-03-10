import type { ChessPiece, Square, PlayerColor, CastlingRights } from './types'

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

// Zwraca dozwolone ruchy roszady dla króla (pola docelowe króla)
export const getCastlingMoves = (color: PlayerColor, squares: Square[], rights: CastlingRights): string[] => {
  const moves: string[] = []
  const rank = color === 'white' ? '1' : '8'
  const kingSquare = squares.find(s => s.id === `e${rank}`)

  if (!kingSquare?.piece || kingSquare.piece.type !== 'king' || kingSquare.piece.color !== color) return moves
  if (isKingInCheck(color, squares)) return moves

  const kingsideRight = color === 'white' ? rights.whiteKingside : rights.blackKingside
  const queensideRight = color === 'white' ? rights.whiteQueenside : rights.blackQueenside

  if (kingsideRight) {
    const f = squares.find(s => s.id === `f${rank}`)
    const g = squares.find(s => s.id === `g${rank}`)
    const h = squares.find(s => s.id === `h${rank}`)
    if (!f?.piece && !g?.piece && h?.piece?.type === 'rook' && h.piece.color === color) {
      const throughF = simulateMove(squares, kingSquare, `f${rank}`)
      const throughG = simulateMove(squares, kingSquare, `g${rank}`)
      if (!isKingInCheck(color, throughF) && !isKingInCheck(color, throughG)) {
        moves.push(`g${rank}`)
      }
    }
  }

  if (queensideRight) {
    const b = squares.find(s => s.id === `b${rank}`)
    const c = squares.find(s => s.id === `c${rank}`)
    const d = squares.find(s => s.id === `d${rank}`)
    const a = squares.find(s => s.id === `a${rank}`)
    if (!b?.piece && !c?.piece && !d?.piece && a?.piece?.type === 'rook' && a.piece.color === color) {
      const throughD = simulateMove(squares, kingSquare, `d${rank}`)
      const throughC = simulateMove(squares, kingSquare, `c${rank}`)
      if (!isKingInCheck(color, throughD) && !isKingInCheck(color, throughC)) {
        moves.push(`c${rank}`)
      }
    }
  }

  return moves
}

// Zwraca tylko legalne ruchy — niezostawiające własnego króla w szachu (+ roszada)
export const getLegalMoves = (piece: ChessPiece, fromSquare: Square, squares: Square[], rights?: CastlingRights): string[] => {
  const moves = getPossibleMoves(piece, fromSquare, squares).filter(to => {
    return !isKingInCheck(piece.color, simulateMove(squares, fromSquare, to))
  })
  if (piece.type === 'king' && rights) {
    moves.push(...getCastlingMoves(piece.color, squares, rights))
  }
  return moves
}

// Sprawdza czy gracz ma jakikolwiek legalny ruch
export const hasAnyLegalMove = (color: PlayerColor, squares: Square[], rights?: CastlingRights): boolean => {
  return squares.some(s => {
    if (!s.piece || s.piece.color !== color) return false
    return getLegalMoves(s.piece, s, squares, rights).length > 0
  })
}
