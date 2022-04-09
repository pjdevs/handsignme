<template>
  <section class="vh-100">
  <!-- Jumbotron -->
  <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            Hand Sign Me <br />
            <span class="text-primary">Sign your document</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            Signature tool to electronically sign documents.<br/>
            Sign your own documents and send invitations to sign.
          </p>
        </div>
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <div class="container">
                  <form class="form-signin" @submit.prevent="signup">
                      <h2 class="form-signin-heading">Create an account</h2>
                      <div v-if="err" class="alert alert-danger">
                          {{err}}
                      </div>
                      <!-- Email input -->
                      <div class="form-outline mb-4">
                        <input v-model="email" type="email" id="inputEmail" name="email" class="form-control" placeholder="Email" required autofocus>
                        <label for="inputEmail" class="sr-only">Email address</label>
                      </div>
                      <!-- Password input -->
                      <div class="form-outline mb-4">
                        <input v-model="password" type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
                        <label for="inputPassword" class="sr-only">Password</label>
                      </div>
                      <!-- Password input -->
                      <div class="form-outline mb-4">
                        <input v-model="password2" type="password" id="inputPassword2" name="password2" class="form-control" placeholder="Confirm Password" required>
                        <label for="inputPassword" class="sr-only">Confirm Password</label>
                      </div>
                      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
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
