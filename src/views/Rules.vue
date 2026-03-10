<template>
  <div class="rules-page">
    <div class="rules-header">
      <h1>♔ Zasady gry w szachy</h1>
      <p>Poznaj podstawowe zasady królewskiej gry</p>
    </div>

    <div class="rules-content">
      <div class="rule-section">
        <h2>🎯 Cel gry</h2>
        <p>Celem gry w szachy jest <strong>zamatowanie króla przeciwnika</strong>. Mat oznacza sytuację, w której król jest zagrożony (szach) i nie może uciec przed atakiem.</p>
      </div>

      <div class="rule-section">
        <h2>♟️ Bierki i ich ruchy</h2>
        <div class="pieces-grid">
          <div class="piece-rule">
            <div class="piece-symbol">♔</div>
            <div class="piece-info">
              <h3>Król</h3>
              <p>Może poruszać się o jedno pole w dowolnym kierunku (poziomo, pionowo, na ukos). To najważniejsza bierka - jej utrata oznacza przegraną.</p>
            </div>
          </div>

          <div class="piece-rule">
            <div class="piece-symbol">♕</div>
            <div class="piece-info">
              <h3>Hetman</h3>
              <p>Najsilniejsza bierka. Może poruszać się o dowolną liczbę pól w linii prostej (poziomo, pionowo, na ukos).</p>
            </div>
          </div>

          <div class="piece-rule">
            <div class="piece-symbol">♖</div>
            <div class="piece-info">
              <h3>Wieża</h3>
              <p>Może poruszać się o dowolną liczbę pól poziomo lub pionowo. Uczestniczy w roszadzie.</p>
            </div>
          </div>

          <div class="piece-rule">
            <div class="piece-symbol">♗</div>
            <div class="piece-info">
              <h3>Goniec</h3>
              <p>Może poruszać się o dowolną liczbę pól na ukos. Zawsze pozostaje na polach tego samego koloru.</p>
            </div>
          </div>

          <div class="piece-rule">
            <div class="piece-symbol">♘</div>
            <div class="piece-info">
              <h3>Skoczek</h3>
              <p>Porusza się w kształcie litery "L" - o dwa pola w jednym kierunku, potem o jedno pole w bok. Może przeskakiwać inne bierki.</p>
            </div>
          </div>

          <div class="piece-rule">
            <div class="piece-symbol">♙</div>
            <div class="piece-info">
              <h3>Pion</h3>
              <p>Porusza się o jedno pole do przodu (pierwszy ruch może być o dwa pola). Bije na ukos. Po dotarciu do końca szachownicy może zostać zamieniony na inną bierkę.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rule-section">
        <h2>🏁 Rozpoczęcie gry</h2>
        <ul>
          <li>Białe bierki zawsze rozpoczynają grę</li>
          <li>Gracze wykonują ruchy na przemian</li>
          <li>Można poruszyć tylko jedną bierkę na ruch</li>
          <li>Nie można przeskoczyć własnych bierek (oprócz skoczka)</li>
        </ul>
      </div>

      <div class="rule-section">
        <h2>⚔️ Bicie bierek</h2>
        <ul>
          <li>Bicie polega na zajęciu pola przeciwnika</li>
          <li>Bita bierka zostaje usunięta z szachownicy</li>
          <li>Bicie nie jest obowiązkowe</li>
          <li>Pion bije inaczej niż się porusza (na ukos)</li>
        </ul>
      </div>

      <div class="rule-section">
        <h2>🏰 Roszada</h2>
        <p>Specjalny ruch wykonywany przez króla i wieżę jednocześnie:</p>
        <ul>
          <li>Król przesuwa się o dwa pola w kierunku wieży</li>
          <li>Wieża przeskakuje przez króla i staje obok niego</li>
          <li>Można wykonać tylko gdy: król i wieża nie były jeszcze ruszane, między nimi nie ma innych bierek, król nie jest w szachu</li>
        </ul>
      </div>

      <div class="rule-section">
        <h2>👑 Szach i mat</h2>
        <div class="checkmate-info">
          <div class="check-info">
            <h3>Szach</h3>
            <p>Gdy król jest atakowany przez bierkę przeciwnika. Gracz musi natychmiast obronić króla (przesunąć go, zasłonić lub zbić atakującą bierkę).</p>
          </div>
          <div class="mate-info">
            <h3>Mat</h3>
            <p>Gdy król jest w szachu i nie ma możliwości ucieczki. To kończy grę - gracz z zamatowanym królem przegrywa.</p>
          </div>
        </div>
      </div>

      <div class="rule-section">
        <h2>🔄 Remis</h2>
        <p>Gra kończy się remisem w następujących sytuacjach:</p>
        <ul>
          <li><strong>Pat</strong> - gracz nie może wykonać żadnego dozwolonego ruchu, ale jego król nie jest w szachu</li>
          <li><strong>Brak materiału</strong> - żaden z graczy nie ma wystarczająco bierek do zamatowania</li>
          <li><strong>Powtórzenie pozycji</strong> - ta sama pozycja powtarza się trzykrotnie</li>
          <li><strong>50 ruchów</strong> - przez 50 ruchów nie było bicia ani ruchu pionem</li>
          <li><strong>Zgoda graczy</strong> - obaj gracze zgadzają się na remis</li>
        </ul>
      </div>

      <div class="rule-section">
        <h2>💡 Wskazówki dla początkujących</h2>
        <div class="tips-grid">
          <div class="tip">
            <h4>🎯 Kontroluj centrum</h4>
            <p>Piony w centrum szachownicy dają przewagę przestrzenną</p>
          </div>
          <div class="tip">
            <h4>⚡ Rozwijaj bierki</h4>
            <p>Wynoś bierki z pierwszego rzędu, aby mogły aktywnie uczestniczyć w grze</p>
          </div>
          <div class="tip">
            <h4>🛡️ Bezpieczeństwo króla</h4>
            <p>Wykonaj roszadę wcześnie, aby zabezpieczyć króla</p>
          </div>
          <div class="tip">
            <h4>👀 Patrz na całą szachownicę</h4>
            <p>Nie skupiaj się tylko na jednej części - szachy to gra całej szachownicy</p>
          </div>
        </div>
      </div>
    </div>

    <div class="back-to-game">
      <router-link to="/" class="btn btn-primary">
        ← Wróć do gry
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Komponent z zasadami gry w szachy
</script>

<style scoped>
.rules-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.rules-header {
  text-align: center;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.rules-header h1 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.rules-header p {
  color: #6c757d;
  font-size: 1.2rem;
  margin: 0;
}

.rules-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.rule-section {
  margin-bottom: 2.5rem;
}

.rule-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #42b883;
  padding-bottom: 0.5rem;
}

.rule-section p {
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.rule-section ul {
  color: #495057;
  line-height: 1.6;
  padding-left: 1.5rem;
}

.rule-section li {
  margin-bottom: 0.5rem;
}

.pieces-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.piece-rule {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.piece-symbol {
  font-size: 2.5rem;
  min-width: 60px;
  text-align: center;
}

.piece-info h3 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.piece-info p {
  margin: 0;
  color: #495057;
  line-height: 1.5;
}

.checkmate-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.check-info, .mate-info {
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.check-info {
  background: linear-gradient(135deg, #ffc107, #ff8c00);
  color: white;
}

.mate-info {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
}

.check-info h3, .mate-info h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.tip {
  padding: 1rem;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.tip h4 {
  color: #1976d2;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.tip p {
  margin: 0;
  color: #424242;
  font-size: 0.9rem;
}

.back-to-game {
  text-align: center;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
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

/* Responsywność */
@media (max-width: 768px) {
  .rules-header h1 {
    font-size: 2rem;
  }
  
  .pieces-grid {
    grid-template-columns: 1fr;
  }
  
  .checkmate-info {
    grid-template-columns: 1fr;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
