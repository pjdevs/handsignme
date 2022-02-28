<template>
  <div class="pdf-item">
      <div class="pdf-thumbnail">
        <img class="pdf-thumbnail-img" v-bind:src="`/api/pdf/thumbnail/${pdfId}`" alt="A PDF thumbnail">
        <router-link :to="{ name: 'sign', params: { pdfId: pdfId } }">
          <p>{{pdfInfo.name}}</p>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PDFItem',
  data () {
    return {
      pdfInfo: {
        id: 0,
        name: 'My super PDF'
      }
    }
  },
  props: {
    pdfId: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
