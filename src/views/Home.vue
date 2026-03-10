<template>
  <div class="home">
    <div class="game-header">
      <h1>Crazy Chess</h1>
      <div class="game-info">
        <div class="color-selection">
          <button 
            class="color-btn white-btn" 
            :class="{ active: selectedColor === 'white' }"
            @click="selectColor('white')"
          >
            ♔ Białe
          </button>
          <button 
            class="color-btn black-btn" 
            :class="{ active: selectedColor === 'black' }"
            @click="selectColor('black')"
          >
            ♚ Czarne
          </button>
        </div>
      </div>
    </div>
    
    <div class="chess-section">
      <ChessBoard ref="chessBoardRef" />
    </div>
    
    <div class="game-controls">
      <button class="btn btn-primary" @click="startNewGame">Nowa gra</button>
      <button class="btn btn-secondary">Cofnij ruch</button>
      <button class="btn btn-secondary">Poddaj się</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChessBoard from '../components/ChessBoard.vue'
import type { PlayerColor } from '../types'

const chessBoardRef = ref<InstanceType<typeof ChessBoard> | null>(null)
const selectedColor = ref<PlayerColor>('white')

const startNewGame = () => {
  if (chessBoardRef.value) {
    chessBoardRef.value.resetGame()
    console.log('Nowa gra rozpoczęta!')
  }
}

const selectColor = (color: PlayerColor) => {
  selectedColor.value = color
  if (chessBoardRef.value) {
    chessBoardRef.value.setPlayerColor(color)
  }
}
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.game-header h1 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.game-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.color-selection {
  display: flex;
  gap: 1rem;
}

.color-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.white-btn {
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
  color: #2c3e50;
  border-color: #dee2e6;
}

.white-btn:hover {
  background: linear-gradient(45deg, #e9ecef, #dee2e6);
  transform: translateY(-2px);
}

.white-btn.active {
  border-color: #42b883;
  box-shadow: 0 0 10px rgba(66, 184, 131, 0.3);
  background: linear-gradient(45deg, #42b883, #20c997);
  color: white;
}

.black-btn {
  background: linear-gradient(45deg, #2c3e50, #495057);
  color: white;
  border-color: #495057;
}

.black-btn:hover {
  background: linear-gradient(45deg, #495057, #6c757d);
  transform: translateY(-2px);
}

.black-btn.active {
  border-color: #42b883;
  box-shadow: 0 0 10px rgba(66, 184, 131, 0.3);
  background: linear-gradient(45deg, #42b883, #20c997);
}

.chess-section {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.game-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.btn-secondary {
  background: linear-gradient(45deg, #6c757d, #495057);
  color: white;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
}

/* Responsywność */
@media (max-width: 768px) {
  .game-header h1 {
    font-size: 2rem;
  }
  
  .game-info {
    flex-direction: column;
    text-align: center;
  }
  
  .player-info {
    justify-content: center;
  }
  
  .game-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style>
