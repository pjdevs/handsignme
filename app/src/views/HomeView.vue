<template>
  <div class="home row my-4">
    <div class="col">
      <div class="row overflow-auto">
        <div class="d-flex col mb-4" v-for="pdf of pdfList" :key="pdf.id">
          <div class="card pa-2 ma-2">
            <PDFItem :pdfId="pdf.id" :pdfName="pdf.name"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <form method="POST" action="/api/pdf/upload" class="d-flex" enctype="multipart/form-data">
        <input name="file" class="form-control me-2" type="file" aria-label="File" accept="application/pdf">
        <button class="btn btn-outline-success" type="submit">Upload</button>
      </form>
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
