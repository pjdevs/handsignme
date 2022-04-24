<template>
  <div class="pdf-viewer">
    <div class="col">
      <div class="row text-center">
        <div v-if="!loading">
          <div>
            <button class="btn ma-4" elevation="0" @click="previous"><i class="bi-arrow-bar-left" aria-hidden="true"/></button>
            <span>{{index}} / {{numPages}}</span>
            <button class="btn ma-4" elevation="0" @click="next"><i class="bi-arrow-bar-right" aria-hidden="true"/></button>
            <div class="vr"></div>
            <button class="btn ma-4" elevation="0" @click="unzoom"><i class="bi-dash" aria-hidden="true"/></button>
            <span>{{Math.round(currentScale * 100) + '%'}}</span>
            <button class="btn ma-4" elevation="0" @click="zoom"><i class="bi-plus" aria-hidden="true"/></button>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div v-if="loading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="pdf-page-wrapper"  v-bind:class="{ 'visually-hidden': loading }">
            <canvas class="shadow p-3 mb-5 bg-body rounded overflow-scroll" ref="pdfPage"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as pdfjs from 'pdfjs-dist'

export default {
  name: 'PDFViewer',
  data () {
    return {
      index: 1,
      currentScale: Number(this.scale),
      loading: false,
      numPages: 0,
      configData: [
        {
          page: 1,
          signature: []
        }
      ]
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    scale: {
      type: Number,
      default: 1
    },
    signMode: {
      type: Boolean,
      default: false
    },
    showOtherSignatures: {
      type: Boolean,
      default: false
    },
    signatory: {
      type: Object
    },
    otherSignatories: {
      type: Array
    },
    config: {
      type: Array,
      default: () => {
        return [
          {
            email: 'foo@bar.com',
            signature: {
              rect: {
                x: 0.65,
                y: 0.85,
                width: 0.3,
                height: 0.1,
                color: 'purple'
              },
              color: 'black'
            },
            page: 1
          },
          {
            email: 'foo@bar.com',
            signature: {
              rect: {
                x: 0.25,
                y: 0.85,
                width: 0.3,
                height: 0.1,
                color: 'red'
              },
              color: 'black'
            },
            page: 1
          }
        ]
      }
    }
  },
  watch: {
    index (oldIndex, newIndex) {
      this.render()
    },
    currentScale (oldScale, newScale) {
      this.render()
    },
    src (oldSrc, newSrc) {
      const vm = this

      this.fetchDocument()
        .then(() => {
          vm.index = 1
        })
    }
  },
  methods: {
    signatureData () {
      return this.configData
    },
    renderConfig (ctx, configObject, docWidth, docHeight) {
      ctx.rect(
        configObject.signature.rect.x * docWidth,
        configObject.signature.rect.y * docHeight,
        configObject.signature.rect.width * docWidth,
        configObject.signature.rect.height * docHeight
      )
      ctx.strokeStyle = configObject.signature.rect.color
      ctx.lineWidth = 5 * this.currentScale
      ctx.stroke()

      ctx.beginPath()
      for (const signature of this.configData) {
        if (signature.page === this.index) {
          for (const line of signature.signature) {
            ctx.moveTo(line.from.x * docWidth, line.from.y * docHeight)
            ctx.lineTo(line.to.x * docWidth, line.to.y * docHeight)
          }
        }
      }
      ctx.closePath()

      if (this.showOtherSignatures) {
        ctx.beginPath()
        for (const signatory of this.otherSignatories) {
          for (const signature of signatory.data) {
            if (signature.page === this.index) {
              for (const line of signature.signature) {
                ctx.moveTo(line.from.x * docWidth, line.from.y * docHeight)
                ctx.lineTo(line.to.x * docWidth, line.to.y * docHeight)
              }
            }
          }
        }
        ctx.closePath()
      }

      ctx.strokeStyle = configObject.signature.color
      ctx.lineWidth = 3 * this.currentScale
      ctx.stroke()
    },
    setupConfig (ctx, docWidth, docHeight) {
      for (const configObject of this.config) {
        if (configObject.page === this.index && configObject.signature) {
          if (this.showOtherSignatures || configObject.email === this.signatory.email) {
            this.renderConfig(ctx, configObject, docWidth, docHeight)

            if (this.signMode) {
              this.registerSignatureHandler(configObject, docWidth, docHeight)
            }
          }
        }
      }
    },
    async render () {
      const vm = this

      const page = await this.doc.getPage(this.index)
      const viewport = page.getViewport({ scale: vm.currentScale })
      const outputScale = window.devicePixelRatio || 1 // Support HiDPI-screens.

      this.cleanHandlers.forEach(handler => handler())
      const canvas = this.$refs.pdfPage
      const ctx = canvas.getContext('2d')

      const docWidth = Math.floor(viewport.width * outputScale)
      const docHeight = Math.floor(viewport.height * outputScale)

      canvas.width = docWidth
      canvas.height = docHeight
      canvas.style.width = Math.floor(viewport.width) + 'px'
      canvas.style.height = Math.floor(viewport.height) + 'px'

      const transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null

      const renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: viewport
      }

      await page.render(renderContext).promise
      this.setupConfig(ctx, docWidth, docHeight)
    },
    previous () {
      if (this.index > 1) { this.index-- }
    },
    next () {
      if (this.index < this.doc.numPages) { this.index++ }
    },
    zoom () {
      if (this.currentScale < 3) {
        this.currentScale += 0.1
      }
    },
    unzoom () {
      if (this.currentScale >= 0.2) {
        this.currentScale -= 0.1
      }
    },
    registerSignatureHandler (configObject, docWidth, docHeight) {
      // Setup canvas
      const vm = this
      const canvas = this.$refs.pdfPage
      const ctx = canvas.getContext('2d')

      // Globals vars for PC clicks handle
      let lastPosition = { x: 0, y: 0 }
      let position = { x: 0, y: 0 }
      let isDrawing = false

      // Helper functions
      function insideSignatureRect (position) {
        return configObject.signature.rect.x * docWidth <= position.x &&
          position.x <= configObject.signature.rect.x * docWidth + configObject.signature.rect.width * docWidth &&
          configObject.signature.rect.y * docHeight <= position.y &&
          position.y <= configObject.signature.rect.y * docHeight + configObject.signature.rect.height * docHeight
      }

      // PC functions
      function handleStartDrawing (e) {
        lastPosition.x = e.offsetX
        lastPosition.y = e.offsetY

        if (!insideSignatureRect(lastPosition)) {
          return
        }

        isDrawing = true

        function handleEndDrawing (e) {
          isDrawing = false
        }

        function handleDrawing (e) {
          position.x = e.offsetX
          position.y = e.offsetY

          if (!insideSignatureRect(position)) { return }

          if (isDrawing && (position.x !== lastPosition.x || position.y !== lastPosition.y)) {
            ctx.beginPath()
            ctx.moveTo(lastPosition.x, lastPosition.y)
            ctx.lineTo(position.x, position.y)
            ctx.closePath()
            ctx.strokeStyle = configObject.signature.color
            ctx.lineWidth = 3 * vm.currentScale
            ctx.stroke()

            vm.configData[0].signature.push({
              from: {
                x: lastPosition.x / docWidth,
                y: lastPosition.y / docHeight
              },
              to: {
                x: position.x / docWidth,
                y: position.y / docHeight
              }
            })

            lastPosition.x = position.x
            lastPosition.y = position.y
          }
        }

        canvas.addEventListener('mouseup', handleEndDrawing)
        canvas.addEventListener('mousemove', handleDrawing)
      }

      // Mobile functions
      function handleStartDrawingMobile (e) {
        const canvasRect = canvas.getBoundingClientRect()

        function getTouchPosition (e) {
          const touch = e.touches[0]
          return { x: (touch.pageX - canvasRect.x) * (window.devicePixelRatio || 1), y: (touch.pageY - canvasRect.y) * (window.devicePixelRatio || 1) }
        }

        lastPosition = getTouchPosition(e)

        if (!insideSignatureRect(lastPosition)) { return true }

        e.preventDefault()

        isDrawing = true

        function handleEndDrawingMobile (e) {
          e.preventDefault()
          isDrawing = false
        }

        function handleDrawingMobile (e) {
          position = getTouchPosition(e)

          if (!insideSignatureRect(position)) { return }

          e.preventDefault()

          if (isDrawing && (position.x !== lastPosition.x || position.y !== lastPosition.y)) {
            ctx.beginPath()
            ctx.moveTo(lastPosition.x, lastPosition.y)
            ctx.lineTo(position.x, position.y)
            ctx.closePath()
            ctx.strokeStyle = configObject.signature.color
            ctx.lineWidth = 3 * vm.currentScale
            ctx.stroke()

            lastPosition.x = position.x
            lastPosition.y = position.y
          }
        }

        canvas.addEventListener('touchend', handleEndDrawingMobile)
        canvas.addEventListener('touchmove', handleDrawingMobile)

        return false
      }

      // Setup handlers
      canvas.addEventListener('mousedown', handleStartDrawing)
      canvas.addEventListener('touchstart', handleStartDrawingMobile)

      this.cleanHandlers.push(() => {
        canvas.removeEventListener('mousedown', handleStartDrawing)
        canvas.removeEventListener('touchstart', handleStartDrawingMobile)
      })
    },
    fetchDocument () {
      const vm = this

      return pdfjs.getDocument(this.src).promise
        .then(doc => {
          vm.doc = doc
          vm.numPages = doc.numPages
          return vm.render()
        })
        .then(() => {
          vm.loading = false
        })
        .catch(console.log)
    }
  },
  mounted () {
    this.loading = true
    this.doc = { numPages: 0 }
    this.cleanHandlers = []

    pdfjs.GlobalWorkerOptions.workerSrc = '/app/js/pdf.worker.min.js'
    this.fetchDocument()
  }
}
</script>
