<template>
  <div class="home">
    <v-row justify="start">
      <v-col class="d-inline-flex" lg="auto" v-for="pdf of pdfList" :key="pdf.id">
        <v-card class="pa-2 ma-2" outlined tile>
          <PDFItem :pdfId="pdf.id" :pdfName="pdf.name"/>
        </v-card>
      </v-col>
      <v-col class="d-inline-flex" lg="auto">
        <v-btn class="ma-2 justify-center" icon="mdi-book-plus-outline"></v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PDFItem from '@/components/PDFItem.vue'
import http from '@/http-common'

export default {
  name: 'HomeView',
  data () {
    return {
      pdfList: []
    }
  },
  components: {
    PDFItem
  },
  created () {
    const vm = this

    http.get('/api/pdf/list')
      .then(pdfList => {
        vm.pdfList = pdfList.data
      })
      .catch(alert)
  }
}
</script>
