<template>

<div class="container">
  <form method="POST" action="/login" class="form-signin">
    <h2 class="form-signin-heading">Please log in</h2>
    <v-if key="errorMessage">
        <div class="alert alert-danger">
            {{errorMessage}}
        </div>
    </v-if>
    <label for="inputUsername" class="sr-only">Username</label>
    <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
    <a href="/app/signup" class="btn btn-lg btn-primary btn-block m-2">Register</a>
    <a href="/auth/google">Sign up with google</a>
  </form>
</div>
</template>

<script>

export default {
  name: 'LoginView',
  data () {

  }
}
</script>
