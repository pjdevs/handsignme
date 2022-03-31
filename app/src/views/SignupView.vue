<template>
    <div class="container">
    <form method="POST" action="/api/auth/signup" class="form-signin">
        <h2 class="form-signin-heading">Create an account</h2>
        <v-if key="errorMessage">
            <div class="alert alert-danger">
                {{errorMessage}}
            </div>
        </v-if>
        <label for="inputUsername" class="sr-only">Email</label>
        <input type="text" id="inputUsername" name="email" class="form-control" placeholder="Email" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
        <label for="inputPassword" class="sr-only">Repeat Password</label>
        <input type="password" id="inputPassword2" name="password2" class="form-control" placeholder="Repeat Password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
    </form>
    </div>
</template>

<script>

export default {
  name: 'SignupView',
  data () {

  }
}
</script>
