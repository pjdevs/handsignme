<template>
  <div class="home row my-4">
    <div class="col-9">
      <div class="row overflow-auto">
        <div class="d-flex col-auto my-4" v-for="pdf of pdfList" :key="pdf.id">
          <div class="card p-2 m-2">
            <PDFItem :pdfId="pdf.id" :pdfName="pdf.name"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <router-link class="d-flex text-decoration-none" to="/upload">
        <i class="bi-file-earmark-plus-fill" style="font-size: 2em;" aria-hidden="true"/>
        <p class="lead decoration-none text-muted m-2">Share a new document</p>
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
