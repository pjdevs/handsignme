<template>
  <router-view name="Navbar"/>
  <div class="container vh-100">
    <router-view/>
  </div>
  <footer class="text-lg-start bg-light text-black mt-4">
    <div class="text-center p-3">
      HandSignMe - 2022 - GPL 3.0
    </div>
  </footer>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Login', route: '/login', icon: 'bi-person-circle' },
        { title: 'Signup', route: '/signup', icon: 'bi-pencil-fill' }
      ]
    }
  },
  methods: {
    async logout () {
      const vm = this

      http.post('/api/auth/logout')
        .then(res => {
          vm.$router.push('/login')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>
