<template>
  <div class="upload my-4">
    <form method="POST" action="/api/pdf/upload" enctype="multipart/form-data">
      <div class="row mb-4">
        <div class="col col-offset mt-2">
          <div class="form-floating align-middle">
            <input name="name" id="name" ref="name" class="form-control" type="text" placeholder="" required>
            <label for="name">Name</label>
          </div>
        </div>
      </div>
      <div class="row mb-4">
          <div class="col">
            <input class="form-control" name="file" type="file" ref="file" aria-label="File" accept="application/pdf" required>
          </div>
          <div class="col">
            <div class="form-check mt-1">
              <input class="form-check-input" name="showOtherSignatures" id="showOtherSignatures" ref="showOtherSignatures" type="checkbox">
              <label class="form-check-label" for="showOtherSignatures">Show other signatories signatures ?</label>
            </div>
          </div>
        </div>
      <div class="row justify-content-center mb-4">
        <div class="col-12">
          <label for="description">Description</label>
          <textarea name="description" id="description" ref="description" class="form-control" placeholder=""></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-outline-success" ref="upload" type="submit" :disabled="submiting">Upload</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'UploadView',
  data () {
    return {
      submiting: false
    }
  },
  components: {
  },
  mounted () {
    this.$refs.upload.addEventListener('click', (e) => {
      const validationInputs = new Array(...document.getElementsByTagName('input'))

      if (validationInputs.some(elem => !elem.checkValidity())) {
        return
      }

      e.preventDefault()

      const data = new FormData()

      data.append('file', this.$refs.file.files[0])
      data.append('name', this.$refs.name.value)
      data.append('description', this.$refs.description.value)
      data.append('showOtherSignatures', this.$refs.showOtherSignatures.checked)

      const req = http.post('/api/pdf/upload', data)

      this.submiting = true

      req
        .then(res => {
          console.log('Response status is ' + res.status)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.submiting = false
        })
    })
  }
}
</script>
