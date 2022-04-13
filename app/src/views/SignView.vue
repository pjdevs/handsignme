<template>
  <div class="sign">
    <div class="row d-flex align-items-center my-4">
      <div class="col mx-2">
        <PDFViewer v-if="file !== null" ref="viewer" :src="file"/>
      </div>
      <div class="col mx-2 justify-content-center">
        <div v-for="(step, index) in steps" :key="index" class="row d-flex">
          <p>
            {{ index + 1 }}.
            <span v-if="step.signed">A signé p.{{ step.page }}</span>
            <span v-else>Doit signer p.{{ step.page }}</span>
            <i v-if="step.signed" class="m-2 bi-check-lg" style="color: green;" aria-hidden="true"/>
            <i v-else class="m-2 bi-x" style="color: red;" aria-hidden="true"/>
          </p>
        </div>
        <div class="row">
          <button class="btn btn-success">Definitive sign</button>
        </div>
      </div>
      <div class="col mx-2">
        <div class="row d-flex">
          <p>
            <i class="m-2 bi-check-circle" style="color: green;" aria-hidden="true"/>
            Integrity of the document verified under identifier {{ doc.hash }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PDFViewer from '@/components/PDFViewer.vue'
import http from '@/http-common'

export default {
  name: 'SignView',
  components: {
    PDFViewer
  },
  data () {
    return {
      doc: {
        id: 0,
        description: 'Please sign this convention because it is very important',
        hash: 'e89a8fcabcfedad457a421e54df451b8'
      },
      file: null,
      steps: [
        { page: 1, signed: true },
        { page: 2, signed: false }
      ]
    }
  },
  created () {

  },
  mounted () {
    const vm = this

    http.get('/api/pdf/file', {
      responseType: 'blob',
      headers: {
        Authorization: vm.$route.params.token
      }
    })
      .then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' })
        vm.file = window.URL.createObjectURL(blob)
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>
