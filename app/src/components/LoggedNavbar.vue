<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#"><i class="bi-file-earmark-pdf-fill" aria-hidden="true"/> HandSignMe</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav">
          <li v-for="item in items" :key="item" class="nav-item mx-4 d-flex align-items-center">
            <i class="m-2" :class="item.icon" style="color: cornflowerblue;" aria-hidden="true"/>
            <router-link :to="item.route" :class="{ 'nav-link': true, 'active': this.$route.fullPath === item.route }" aria-current="page" href="#">{{item.title}}</router-link>
          </li>
          <li class="nav-item d-flex btn" @click="logout">
            <i class="m-2 bi-power" style="color: cornflowerblue;" aria-hidden="true"/>
            <a class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Upload', route: '/upload', icon: 'bi-file-earmark-plus-fill' }
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
