<template>

<div class="container">
  <form class="form-signin" @submit.prevent="login">
    <h2 class="form-signin-heading">Please log in</h2>
    <v-if key="errorMessage">
        <div class="alert alert-danger">
            {{errorMessage}}
        </div>
    </v-if>
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
import { authenticate } from '@/auth'

export default {
  name: 'LoginView',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      http.post('/api/auth/login')
        .then(res => {
          authenticate()
          this.$router.push('/')
        })
        .catch(err => {
          alert(err.msg)
        })
    }
  }
}
</script>
