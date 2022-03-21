<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          to="/"
        >
          HAND SIGN ME
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="setNavbarOpen"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none"
        :class="[navbarOpen ? 'block rounded shadow-lg' : 'hidden']"
        id="example-navbar-warning"
      >

        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">

          <li>

             <router-link
                to="/auth/login"
                class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap "
              >
              <img alt="..." class="w-5 mr-1" src="../../assets/img/count.png" style="float:left;"/> Connexion
              </router-link>
          </li>
          <li>
             <router-link
                to="/auth/register"
                class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap "
              >
              <img alt="..." class="w-5 mr-1" src="../../assets/img/log.png" style="float:left;"/>  S'inscrire
      </router-link>
          </li>
          <li>
             <router-link
                to="/Profile"
                class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap "
              >
              <img alt="..." class="w-5 mr-1" src="../../assets/img/user.png" style="float:left;"/>  Profile
            </router-link>
          </li>
          <li class="flex items-center">
            <button
              class="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
            >
              <i class="fa fa-upload" aria-hidden="true"></i> Sélectionner un fichier
            </button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      navbarOpen: false
    }
  },
  methods: {
    setNavbarOpen: function () {
      this.navbarOpen = !this.navbarOpen
    }
  }

}
</script>
