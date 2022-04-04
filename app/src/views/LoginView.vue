<template>

<div class="container">
  <form ref="loginForm" class="form-signin" @submit.prevent="login">
    <h2 class="form-signin-heading">Please log in</h2>
    <div v-if="err" class="alert alert-danger">
        {{err}}
    </div>
    <label for="inputUsername" class="sr-only">Email</label>
    <input v-model="email" type="text" id="inputUsername" name="email" class="form-control" placeholder="Email" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="password" type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
    <a href="/app/signup" class="btn btn-lg btn-primary btn-block m-2">Register</a>
  </form>
</div>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'LoginView',
  data () {
    return {
      email: '',
      password: '',
      err: undefined
    }
  },
  methods: {
    login () {
      const vm = this

      http.post('/api/auth/login', new URLSearchParams({
        email: vm.email,
        password: vm.password
      }))
        .then(res => {
          vm.$router.push(this.$route.query.redirect || '/')
        })
        .catch(err => {
          vm.err = err.response.data
        })
    }
  }
}
</script>
