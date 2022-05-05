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
          <div class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" v-model="searchTerm" aria-label="Search">
            <a v-if="mode == 'userList'" href="#" type="button" class="btn btn-outline-light" @click="findUser(searchTerm)">Search</a>
            <a v-if="mode == 'docList'" href="#" type="button" class="btn btn-outline-light" @click="findFile(searchTerm)">Search</a>
          </div>
        </div>
      </div>
    </nav>

    <table class="table">
      <caption>{{mode == 'userList' ? 'Complete user list' : 'Complete document list'}}</caption>
      <thead v-if="mode == 'userList'">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <thead v-if="mode == 'docList'">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Owner</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="mode == 'userList'">
        <tr v-for="(user, index) in users"  :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td class="text-end">
            <a href="#" type="button" class="btn btn-danger btn-small" @click="deleteUser(user, index);"><i class="bi bi-trash3" aria-hidden="true"></i> Delete</a>
          </td>
        </tr>
      </tbody>
      <tbody v-if="mode == 'docList'">
        <tr v-for="(doc, index) in docs" :key="doc.id">
          <th scope="row">{{ doc.id }}</th>
          <td>{{ doc.name }}</td>
          <td>{{ doc.ownerId }}</td>
          <td class="text-end">
            <a href="#" type="button" class="btn btn-danger btn-small" @click="deleteFile(doc, index);"><i class="bi bi-trash3" aria-hidden="true"></i> Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="deletionMessage" class="alert alert-success" role="alert">
          {{deletionMessage}}
    </div>
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
      deletionDone: undefined,
      deletionMessage: undefined,
      mode: 'userList',
      searchTerm: undefined
    }
  },
  methods: {
    showUserList: function () {
      this.mode = 'userList'
      this.deletionDone = undefined
      this.deletionMessage = undefined
      http.get('/api/admin/user/all')
        .then((res) => {
          this.users = res.data
        })
        .catch(error => console.error(`There was an error retrieving the user list: ${error}`))
    },
    showDocList: function () {
      this.mode = 'docList'
      this.deletionDone = undefined
      this.deletionMessage = undefined
      http.get('/api/admin/file/all')
        .then((res) => {
          this.docs = res.data
        })
        .catch(error => console.error(`There was an error retrieving the pdf list: ${error}`))
    },
    findUser: function (email) {
      http.get(`/api/admin/user/find/${email}`)
        .then((res) => {
          this.users = res.data
        })
        .catch(error => console.error(`There was an error finding the user: ${error}`))
    },
    findFile: function (name) {
      http.get(`/api/admin/file/find/${name}`)
        .then((res) => {
          this.docs = res.data
        })
        .catch(error => console.error(`There was an error finding the file: ${error}`))
    },
    deleteUser: function (user, index) {
      http.delete(`/api/admin/user/delete/${user.id}`)
        .then((res) => {
          this.users.splice(index, 1)
          this.deletionDone = 'userDeleted'
          this.deletionMessage = `User "${user.email}" was successfully deleted.`
        })
        .catch(error => console.error(`There was an error deleting user: ${error}`))
    },
    deleteFile: function (doc, index) {
      http.delete(`/api/admin/file/delete/${doc.id}`)
        .then((res) => {
          this.docs.splice(index, 1)
          this.deletionDone = 'fileDeleted'
          this.deletionMessage = `file "${doc.name}" was successfully deleted.`
        })
        .catch(error => console.error(`There was an error deleting file: ${error}`))
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
