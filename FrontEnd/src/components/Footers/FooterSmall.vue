<template>
  <footer
    class="pb-6"
    :class="[
      absolute ? 'absolute w-full bottom-0 bg-blueGray-800' : 'relative',
    ]"
  >
    <div class="container mx-auto px-4">
      <hr class="mb-6 border-b-1 border-blueGray-600" />
        <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © {{ date }}  by
            <a
              href="https://www.creative-tim.com?ref=vn-footer"
              class="text-blueGray-500 hover:text-blueGray-800"
            >
              HandSignMe Team
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
