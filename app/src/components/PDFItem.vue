<template>
  <div class="pdf-item">
      <div class="pdf-thumbnail">
        <router-link :to="{ name: 'sign', params: { pdfId: pdfId } }">
          <img class="pdf-thumbnail-img" v-bind:src="`/api/pdf/thumbnail/${pdfId}`" alt="A PDF thumbnail">
          <p>{{pdfName}}</p>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PDFItem',
  props: {
    pdfId: {
      type: Number,
      required: true
    },
    pdfName: {
      type: String,
      required: true
    }
  }
}
</script>
