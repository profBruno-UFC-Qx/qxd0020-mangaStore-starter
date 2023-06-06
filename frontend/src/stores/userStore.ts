import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const username = ref('')
  const jwt = ref('')
  const role = ref('')

  const isAdmin = computed(() => role.value == "admin")
  const isAuthenticated = computed(() => jwt.value ? true : false)

  function logout() {
    username.value = ""
    jwt.value = ""
    role.value = ""
  }
  return { username, jwt, role, isAdmin, isAuthenticated, logout }
})