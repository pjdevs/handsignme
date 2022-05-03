<template>
  <div class="home row my-4">
    <div class="col-9">
      <div class="row overflow-auto">
        <div class="d-flex col-auto my-4" v-for="pdf of pdfList" :key="pdf.id">
          <div class="card p-2 m-2 border-2" :class="{ 'border-success': pdf.signed, 'border-warning': !pdf.signed }">
            <PDFItem :pdfId="pdf.id" :pdfName="pdf.name"/>
            <p class="text-center text-success" v-if="pdf.signed">Complete <i class="bi-file-earmark-check" aria-hidden="true"></i></p>
            <p v-else class="text-center text-warning">In progress...</p>
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
        console.log(pdfList.data)
      })
      .catch(alert)
  }
}
</script>
