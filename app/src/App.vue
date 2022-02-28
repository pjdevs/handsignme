<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item>
          <router-link to="/">Home</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>
