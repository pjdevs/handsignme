<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col v-for="pdfId of pdfIdList" :key="pdfId">
        <v-card class="pa-2 ma-2" outlined tile>
          <PDFItem :pdfId="pdfId"/>
        </v-card>
      </v-col>
      <v-col>
        <v-btn class="ma-2 justify-center" icon="mdi-book-plus-outline"></v-btn>
      </v-col>
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
