<template>
  <div class="home">
    <h1>Welcome to Crazy Chess!</h1>
    <p>Your Vue.js application is ready to go.</p>
    <div class="features">
      <h2>Features included:</h2>
      <ul>
        <li>✅ Vue 3 with Composition API</li>
        <li>✅ TypeScript support</li>
        <li>✅ Vue Router for navigation</li>
        <li>✅ Pinia for state management</li>
        <li>✅ Vite for fast development</li>
        <li>✅ ESLint & Prettier for code quality</li>
        <li>✅ VueUse utilities</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is a Vue 3 Composition API setup
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.features {
  margin-top: 2rem;
  text-align: left;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}
</style>
