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
              <i class="mx-2 my-2" :class="item.icon" style="color: cornflowerblue;"></i>
              <router-link :to="item.route" :class="{ 'nav-link': true, 'active': this.$router.currentRoute.path === item.route }" aria-current="page" href="#">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
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
