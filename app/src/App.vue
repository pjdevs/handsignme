<template>
  <router-view name="Navbar"/>
  <div class="container vh-100">
    <router-view/>
  </div>
  <Footer/>
</template>

<script>
import http from '@/http-common'
import Footer from './components/FooterComponent.vue'

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
  components: {
    Footer
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
