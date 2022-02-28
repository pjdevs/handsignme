<template>
  <div class="home">
    <div class="pdf-list d-flex">
      <v-card v-for="pdfId of pdfIdList" :key="pdfId" class="pa-2 ma-3" outlined tile>
        <PDFItem :pdfId="pdfId"/>
      </v-card>
      <v-btn class="ma-3">Add</v-btn>
    </div>
  </div>
</template>

<script>
import PDFItem from '@/components/PDFItem.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      pdfIdList: [0, 12, 9, 6]
    }
  },
  components: {
    PDFItem
  }
}
</script>
