import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const user = ref<{ name: string; email: string } | null>(null)

  // Getters
  const isAuthenticated = computed(() => user.value !== null)
  const isDarkMode = computed(() => theme.value === 'dark')

  // Actions
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setUser(userData: { name: string; email: string } | null) {
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  return {
    // State
    isLoading,
    theme,
    user,
    // Getters
    isAuthenticated,
    isDarkMode,
    // Actions
    setLoading,
    toggleTheme,
    setUser,
    logout,
  }
})
