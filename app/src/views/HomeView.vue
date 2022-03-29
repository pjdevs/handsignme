<template>
  <div class="home row my-4">
    <div class="col col-10">
      <div class="row overflow-auto">
        <div class="d-flex col mb-4" v-for="pdf of pdfList" :key="pdf.id">
          <div class="card pa-2 ma-2">
            <PDFItem :pdfId="pdf.id" :pdfName="pdf.name"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2">
      <router-link to="/upload">
        <i class="bi-file-earmark-plus-fill" style="font-size: 2em;"></i>
      </router-link>
    </div>
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
