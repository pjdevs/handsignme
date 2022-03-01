<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col v-for="pdfId of pdfIdList" :key="pdfId">
        <v-card class="pa-2 ma-3" outlined tile>
          <PDFItem :pdfId="pdfId"/>
        </v-card>
      </v-col>
      <v-btn class="ma-3 justify-center" icon="mdi-book-plus-outline"></v-btn>
    </v-row>
  </div>
</template>

<script>
import PDFItem from '@/components/PDFItem.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      pdfIdList: [0, 12, 9, 6, 4, 8]
    }
  },
  components: {
    PDFItem
  }
}
</script>
