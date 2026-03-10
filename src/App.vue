<script setup lang="ts">
// Main App component with router
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <h2>♔ Crazy Chess</h2>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Gra</router-link>
        <router-link to="/rules" class="nav-link">Zasady</router-link>
        <a href="#" class="nav-link">O grze</a>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand h2 {
  margin: 0;
  color: #42b883;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #42b883;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
