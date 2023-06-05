import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const username = ref('')
  const jwt = ref('')
  const role = ref('')

  return { username, jwt, role }
})