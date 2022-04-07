import http from '@/http-common'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    async verify () {
      try {
        await http.post('/api/auth/check')

        return true
      } catch (err) {
        return false
      }
    }
  }
})
