# CLAUDE.md

Ten plik zawiera wskazówki dla Claude Code (claude.ai/code) podczas pracy z tym repozytorium.

## Komendy

```bash
npm run dev          # Uruchom serwer deweloperski (Vite)
npm run build        # Sprawdzenie typów + build produkcyjny
npm run preview      # Podgląd builda produkcyjnego
npm run lint         # ESLint z automatyczną naprawą
npm run format       # Formatowanie Prettier dla src/
npm run type-check   # Sprawdzenie TypeScript bez emitowania plików
```

Brak skonfigurowanego frameworka testowego.

## Architektura

Gra szachowa Vue 3 ("Crazy Chess") zbudowana z Vite, TypeScript, Pinia i Vue Router.

**Punkt wejścia:** `src/main.ts` — tworzy aplikację, rejestruje Pinia i Vue Router, montuje do `#app`.

**Trasy** (zdefiniowane bezpośrednio w `main.ts`):
- `/` → `src/views/Home.vue` — widok gry
- `/rules` → `src/views/Rules.vue` — statyczna strona z zasadami

**Główna logika gry** znajduje się w całości w `src/components/ChessBoard.vue`. Jest to samodzielny komponent zarządzający:
- Stanem szachownicy jako płaską tablicą 64 obiektów `Square` (indeks 0 = a8, indeks 63 = h1)
- Generowaniem ruchów dla każdego typu bierki (`getPossibleMoves`)
- Interakcjami kliknięcia i HTML5 drag-and-drop
- 15-minutowymi odliczającymi timerami dla każdego gracza
- Prostym przeciwnikiem komputerowym wykonującym losowe ruchy (`makeComputerMove`)
- Obróceniem szachownicy gdy gracz wybierze czarne

**Eksponowane API** (`defineExpose`): `resetGame`, `setPlayerColor`, `formatTime`, `whiteTime`, `blackTime`, `currentPlayer`, `gameStarted`, `playerColor` — wywoływane z `Home.vue` przez template ref.

**Współdzielone typy:** `src/types.ts` — `ChessPiece`, `Square`, `PlayerColor`, `GameMode`, `GameState`, `Move`, `GameResult`, `GameSettings` itp.

**Współdzielone stałe:** `src/constants.ts` — symbole Unicode bierek (`PIECE_SYMBOLS`), tablice `FILES`/`RANKS`, `DEFAULT_TIME_CONTROL` (15 min), `COMPUTER_MOVE_DELAY` (500 ms), kolory pól.

**Brak zaimplementowanych store'ów Pinia** — cały stan gry to lokalne refy wewnątrz `ChessBoard.vue`.

**Brakujące funkcje w obecnej implementacji:** brak wykrywania szacha/mata/pata, brak roszady, brak bicia w przelocie, brak promocji pionka, brak historii ruchów, cofanie ruchu to zaślepka w `Home.vue`.
