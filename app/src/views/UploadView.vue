<template>
  <div class="upload my-4">
    <form method="POST" ref="upload" action="/api/pdf/upload" enctype="multipart/form-data">
      <h2 class="form-signin-heading">Document informations</h2>
      <div v-if="err" class="alert alert-danger">
        {{err}}
      </div>
      <div class="row mb-4">
        <div class="col mt-2">
          <div class="form-floating align-middle">
            <input name="name" id="name" ref="name" class="form-control require-validation" type="text" placeholder="" required>
            <label for="name">Name</label>
          </div>
        </div>
      </div>
      <div class="row mb-4">
          <div class="col">
            <input class="form-control require-validation" name="file" type="file" ref="file" aria-label="File" accept="application/pdf" required>
          </div>
          <div class="col">
            <div class="form-check mt-1">
              <input class="form-check-input" name="showOtherSignatures" id="showOtherSignatures" ref="showOtherSignatures" type="checkbox">
              <label class="form-check-label" for="showOtherSignatures">Show other signatories signatures ?</label>
            </div>
          </div>
        </div>
      <div class="row mb-4">
        <div class="col-12">
          <label for="description">Description</label>
          <textarea name="description" id="description" ref="description" class="form-control" placeholder=""></textarea>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="row">
            <label for="signatoryEmail">Signatories</label>
            <div class="input-group mb-3">
              <input type="email" class="form-control" ref="signatoryEmail" id="signatoryEmail" placeholder="Add a signatory (signatory@mail.com)" aria-label="New signatory e-mail" @change="checkValidSignatories">
              <button class="btn btn-outline-secondary" @click="addSignatory" type="button"><i class="bi-envelope-plus" aria-hidden="true"/></button>
            </div>
          </div>
          <div>
            <div class="row d-flex" v-for="(signatory, index) in signatories" :key="index">
              <div class="col">
                <input class="form-control" type="email" readonly :value="signatory.email">
              </div>
              <div class="col-1">
                <button class="btn btn-outline-secondary" type="button" @click="removeSignatory(index)"><i class="bi-trash" aria-hidden="true"/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="btn btn-outline-success" type="submit" :disabled="submiting">Upload</button>
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
      signatories: [
      ],
      submiting: false,
      err: undefined
    }
  },
  watch: {
    signatories (oldValue, newValue) {
      this.checkValidSignatories(null)
    }
  },
  methods: {
    checkValidSignatories (input) {
      if (this.signatories.length <= 0) {
        this.$refs.signatoryEmail.setCustomValidity('You must add at least one signatory')
      } else {
        this.$refs.signatoryEmail.setCustomValidity('')
      }
    },
    addSignatory () {
      if (this.$refs.signatoryEmail.value !== '' && !this.$refs.signatoryEmail.validity.typeMismatch) {
        this.signatories = this.signatories.concat([{ email: this.$refs.signatoryEmail.value }])
        this.$refs.signatoryEmail.value = ''
      } else {
        this.$refs.signatoryEmail.setCustomValidity('You must enter a valid email')
        this.$refs.signatoryEmail.reportValidity()
      }
    },
    removeSignatory (index) {
      this.signatories = this.signatories.filter((_, i) => i !== index)
    }
  },
  mounted () {
    this.checkValidSignatories(null)

    this.$refs.upload.addEventListener('submit', (e) => {
      if (!this.$refs.upload.checkValidity()) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      const data = new FormData()

      data.append('file', this.$refs.file.files[0])
      data.append('name', this.$refs.name.value)
      data.append('description', this.$refs.description.value)
      data.append('showOtherSignatures', this.$refs.showOtherSignatures.checked)
      data.append('signatories', JSON.stringify(this.signatories))

      const req = http.post('/api/pdf/upload', data)

      this.submiting = true
      const vm = this

      req
        .then(res => {
          this.$router.push('/')
        })
        .catch(err => {
          vm.err = err.response.data.error.msg
        })
        .then(() => {
          this.submiting = false
        })
    }, false)
  }
}
</script>
