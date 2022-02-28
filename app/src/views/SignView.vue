<template>
  <div class="sign">
    <PDFViewer ref="viewer" src="../sample.pdf"/>
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
