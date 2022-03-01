<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" elevation="1" app>
      <v-list dense nav>
        <router-link v-for="item in items" :key="item.title" :to="item.route">
          <v-list-item :title="item.title" :prepend-icon="item.icon" link/>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar elevation="1" app shaped>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>HandSignMe</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
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
      ],
      drawer: false
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
