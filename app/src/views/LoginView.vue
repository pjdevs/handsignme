<template>
<section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <div class="container">
          <form ref="loginForm" class="form-signin" @submit.prevent="login">
            <h2 class="form-signin-heading">Please log in</h2>
            <div v-if="err" class="alert alert-danger">
                {{err}}
            </div>
            <!-- Mail input -->
            <div class="form-outline mb-4">
              <input v-model="email" type="text" id="inputUsername" name="email" class="form-control" placeholder="Email" required autofocus>
              <label for="inputUsername" class="sr-only">Email address</label>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-3">
              <input v-model="password" type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
              <label for="inputPassword" class="sr-only">Password</label>
            </div>
            <div class="text-center text-lg-start mt-4 pt-2">
              <button class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;" type="submit">Log in</button>
              <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/app/signup"
                  class="link-danger">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
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
<style scoped>
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}
</style>
