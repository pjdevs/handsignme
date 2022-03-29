<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand" href="#">HandSignMe</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav">
            <li v-for="item in items" :key="item" class="nav-item mx-4 d-flex align-items-center">
              <i class="mx-2 my-2" :class="item.icon" style="color: cornflowerblue;" aria-hidden="true"/>
              <router-link :to="item.route" :class="{ 'nav-link': true, 'active': this.$router.currentRoute.path === item.route }" aria-current="page" href="#">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
      <footer class="footer-bs bg-light fixed-bottom container-fluid">
      <div class="row justify-content-center my-4 ms-5">
        <div class="footer-brand d-flex">
          <h2 class="me-2"><i class="bi-file-earmark-pdf-fill" aria-hidden="true"/></h2>
          <p class="mt-2">HandSignMe - 2022 - GPL 3.0</p>
        </div>
      </div>
  </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Home', route: '/', icon: 'bi-house' },
        { title: 'Login', route: '/login', icon: 'bi-person-circle' },
        { title: 'Subscribe', route: '/subscribe', icon: 'bi-pencil-fill' }
      ]
    }
  }
}
</script>
