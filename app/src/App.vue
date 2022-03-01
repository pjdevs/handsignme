<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            HandSignMe
          </v-list-item-title>
          <v-list-item-subtitle>
            Menu
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <router-link v-for="item in items" :key="item.title" :to="item.route">
          <v-list-item :title="item.title" :prepend-icon="item.icon" link/>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
    </v-app-bar>
    <v-main>
      <v-container fill-height fluid>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Home', route: '/', icon: 'mdi-home' }
      ]
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  a, a:visited, a:hover, a:active {
    color: inherit;
  }
</style>
