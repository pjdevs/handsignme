<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#"><i class="bi-file-earmark-pdf-fill" aria-hidden="true"/> HandSignMe</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
        <ul id="nav" class="navbar-nav ml-auto">
          <li v-for="item in items" :key="item" class="nav-item mx-4 d-flex align-items-center">
            <i class="m-2" :class="item.icon" style="color: cornflowerblue;" aria-hidden="true"/>
            <router-link :to="item.route" :class="{ 'nav-link': true, 'active': this.$route.fullPath === item.route }" aria-current="page" href="#">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Login', route: '/login', icon: 'bi-person-circle' },
        { title: 'Signup', route: '/signup', icon: 'bi-pencil-fill' }
      ]
    }
  }
}
</script>
<style scoped>
/*===== NAVBAR =====*/
.navbar-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s; }

.sticky {
  position: fixed;
  z-index: 99;
  background-color: #fff;
  -webkit-box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s; }
  .sticky .navbar {
    padding: 10px 0; }

.navbar {
  padding: 0;
  border-radius: 5px;
  position: relative;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  padding: 35px 0; }

.navbar-brand {
  padding: 0; }
  .navbar-brand img {
    max-width: 150px; }

.navbar-toggler {
  padding: 0; }
  .navbar-toggler .toggler-icon {
    width: 30px;
    height: 2px;
    background-color: #222;
    display: block;
    margin: 5px 0;
    position: relative;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s; }
  .navbar-toggler.active .toggler-icon:nth-of-type(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 7px; }
  .navbar-toggler.active .toggler-icon:nth-of-type(2) {
    opacity: 0; }
  .navbar-toggler.active .toggler-icon:nth-of-type(3) {
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
    top: -7px; }

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
    -webkit-box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 5px 12px; } }

@media (max-width: 767px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
    -webkit-box-shadow: 0px 15px 20px 0px rgba(56, 66, 77, 0.1);
    -moz-box-shadow: 0px 15px 20px 0px rgba(56, 66, 77, 0.1);
    box-shadow: 0px 15px 20px 0px rgba(56, 66, 77, 0.1);
    padding: 5px 12px; } }

.navbar-nav .nav-item {
  margin-left: 45px;
  position: relative; }
  .navbar-nav .nav-item:first-child {
    margin-left: 0; }
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .navbar-nav .nav-item {
      margin-left: 30px; } }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .navbar-nav .nav-item {
      margin: 0; } }
  @media (max-width: 767px) {
    .navbar-nav .nav-item {
      margin: 0; } }
  .navbar-nav .nav-item a {
    font-size: 16px;
    font-weight: 600;
    color: #38424D;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s;
    position: relative; }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      .navbar-nav .nav-item a {
        display: block;
        padding: 4px 0; } }
    @media (max-width: 767px) {
      .navbar-nav .nav-item a {
        display: block;
        padding: 4px 0; } }
  .navbar-nav .nav-item.active > a, .navbar-nav .nav-item:hover > a {
    color: #0898E7; }
  .navbar-nav .nav-item:hover .sub-menu {
    top: 100%;
    opacity: 1;
    visibility: visible; }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      .navbar-nav .nav-item:hover .sub-menu {
        top: 0; } }
    @media (max-width: 767px) {
      .navbar-nav .nav-item:hover .sub-menu {
        top: 0; } }
  .navbar-nav .nav-item .sub-menu {
    width: 200px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 110%;
    left: 0;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s; }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      .navbar-nav .nav-item .sub-menu {
        position: relative;
        width: 100%;
        top: 0;
        display: none;
        opacity: 1;
        visibility: visible; } }
    @media (max-width: 767px) {
      .navbar-nav .nav-item .sub-menu {
        position: relative;
        width: 100%;
        top: 0;
        display: none;
        opacity: 1;
        visibility: visible; } }
    .navbar-nav .nav-item .sub-menu li {
      display: block; }
      .navbar-nav .nav-item .sub-menu li a {
        display: block;
        padding: 8px 20px;
        color: #222; }
        .navbar-nav .nav-item .sub-menu li a.active, .navbar-nav .nav-item .sub-menu li a:hover {
          padding-left: 25px;
          color: #0898E7; }

.navbar-nav .sub-nav-toggler {
  display: none; }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .navbar-nav .sub-nav-toggler {
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      background: none;
      color: #222;
      font-size: 18px;
      border: 0;
      width: 30px;
      height: 30px; } }
  @media (max-width: 767px) {
    .navbar-nav .sub-nav-toggler {
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      background: none;
      color: #222;
      font-size: 18px;
      border: 0;
      width: 30px;
      height: 30px; } }
  .navbar-nav .sub-nav-toggler span {
    width: 8px;
    height: 8px;
    border-left: 1px solid #222;
    border-bottom: 1px solid #222;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    position: relative;
    top: -5px; }
</style>
