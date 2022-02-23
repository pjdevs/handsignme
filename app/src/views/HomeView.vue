<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PDFViewer url="sample.pdf"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PDFViewer from '@/components/PDFViewer.vue'

export default {
  name: 'HomeView',
  components: {
    PDFViewer
  }
}
</script>
