<template>
  <div class="sign">
    <PDFViewer ref="viewer" :src="`/api/pdf/file/${$route.params.pdfId}`"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PDFViewer from '@/components/PDFViewer.vue'

export default {
  name: 'SignView',
  components: {
    PDFViewer
  }
}
</script>
