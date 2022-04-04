<template>
    <div class="container">
        <form class="form-signin" @submit.prevent="signup">
            <h2 class="form-signin-heading">Create an account</h2>
            <div v-if="err" class="alert alert-danger">
                {{err}}
            </div>
            <label for="inputEmail" class="sr-only">Email</label>
            <input v-model="email" type="email" id="inputEmail" name="email" class="form-control" placeholder="Email" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input v-model="password" type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
            <label for="inputPassword" class="sr-only">Repeat Password</label>
            <input v-model="password2" type="password" id="inputPassword2" name="password2" class="form-control" placeholder="Repeat Password" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
        </form>
    </div>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'SignupView',
  data () {
    return {
      email: '',
      password: '',
      password2: '',
      err: undefined
    }
  },
  methods: {
    async signup () {
      const vm = this

      http.post('/api/auth/signup', new URLSearchParams({
        email: vm.email,
        password: vm.password,
        password2: vm.password2
      }))
        .then(res => {
          vm.$router.push('/login')
        })
        .catch(err => {
          vm.err = err.response.data.msg
        })
    }
  }
}
</script>
