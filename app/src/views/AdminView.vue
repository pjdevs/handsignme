<template>
  <div class="admin-space">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/app/admin">AdminSpace</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="#" @click="showUserList()">Users</a>
            </li>
             <li class="nav-item">
              <a class="nav-link active" href="#" @click="showDocList()">Documents</a>
            </li>
          </ul>
          <form class="d-flex" method="POST" action="/" novalidate>
            <input class="form-control me-2" type="search" placeholder="Search" name="search" aria-label="Search">
            <button class="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <table class="table">
      <caption>{{mode == 'userList' ? 'Complete user list' : 'Complete document list'}}</caption>
      <thead v-if="mode == 'userlist'">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <thead v-if="mode == 'doclist'">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Owner</th>
        </tr>
      </thead>
      <tbody v-if="mode == 'userlist'">
        <tr v-for="user of users"  :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
      <tbody v-if="mode == 'doclist'">
        <tr v-for="doc of docs" :key="doc.id">
          <th scope="row">{{ doc.id }}</th>
          <td>{{ doc.name }}</td>
          <td>{{ doc.ownerId }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'AdminView',
  data () {
    return {
      users: [],
      docs: [],
      mode: 'userlist'
    }
  },
  methods: {
    showUserList: function () {
      this.mode = 'userlist'
    },
    showDocList: function () {
      this.mode = 'doclist'
    }
  },
  mounted () {
    const vm = this

    http.get('/api/admin/user/all')
      .then((res) => {
        vm.users = res.data
      })
      .catch(error => console.error(`There was an error retrieving the user list: ${error}`))
    http.get('/api/admin/file/all')
      .then((res) => {
        vm.docs = res.data
      })
      .catch(error => console.error(`There was an error retrieving the pdf list: ${error}`))
  }
}
</script>
