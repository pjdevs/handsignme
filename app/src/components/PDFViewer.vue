<template>
  <div class="pdf-viewer">
    <div v-if="!loading" class="section">
      <button @click="previous">Previous</button>
      <button @click="next">Next</button>
      <button @click="zoom">+</button>
      <button @click="unzoom">-</button>
      <span>{{Math.round(currentScale * 100) + '%'}}</span>
      <span>{{index}} / {{doc.numPages}}</span>
    </div>
    <div class="pdf-page-wrapper section">
      <canvas v-bind:class="{ invisible: loading }" id="pdf-page"></canvas>
    </div>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import * as pdfjs from 'pdfjs-dist'

export default {
  name: 'PDFViewer',
  provide: {
    pdfjs: pdfjs
  },
  data () {
    return {
      index: 1,
      currentScale: Number(this.scale),
      loading: false,
      doc: { numPages: 0 },
      signature: {
        x: 0.65,
        y: 0.85,
        width: 0.3,
        height: 0.1,
        color: 'black',
        rectColor: ['red', 'orange', 'purple'][Math.floor(Math.random() * 3)]
      },
      signatureRect: { x: 0, y: 0, width: 0, height: 0 }
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    workerUrl: {
      type: String,
      default: 'pdf.worker.min.js'
    },
    page: {
      type: Number,
      default: 1
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  watch: {
    index (oldIndex, newIndex) {
      this.render()
    },
    currentScale (oldScale, newScale) {
      this.render()
    }
  },
  methods: {
    async render () {
      const vm = this

      const doc = toRaw(this.doc)
      const page = await doc.getPage(this.index)

      const viewport = page.getViewport({ scale: vm.currentScale })
      // Support HiDPI-screens.
      const outputScale = window.devicePixelRatio || 1

      const canvas = document.getElementById('pdf-page')
      const context = canvas.getContext('2d')

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
        canvasContext: context,
        transform: transform,
        viewport: viewport
      }

      await page.render(renderContext).promise

      this.signatureRect.x = this.signature.x * docWidth
      this.signatureRect.y = this.signature.y * docHeight
      this.signatureRect.width = this.signature.width * docWidth
      this.signatureRect.height = this.signature.height * docHeight

      context.strokeStyle = this.signature.rectColor
      context.lineWidth = 5 * this.currentScale
      context.rect(this.signatureRect.x, this.signatureRect.y, this.signatureRect.width, this.signatureRect.height)
      context.stroke()
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
    registerSignatureHandler () {
      // Setup canvas
      const vm = this
      const canvas = document.getElementById('pdf-page')
      const ctx = canvas.getContext('2d')

      // Globals vars for PC clicks handle
      let lastPosition = { x: 0, y: 0 }
      let position = { x: 0, y: 0 }
      let isDrawing = false

      // Helper functions
      function setDrawStyle () {
        ctx.strokeStyle = vm.signature.color
        ctx.lineWidth = 3 * vm.currentScale
      }

      function insideSignatureRect (position) {
        return vm.signatureRect.x <= position.x && position.x <= vm.signatureRect.x + vm.signatureRect.width &&
                          vm.signatureRect.y <= position.y && position.y <= vm.signatureRect.y + vm.signatureRect.height
      }

      // PC functions
      function handleStartDrawing (e) {
        lastPosition.x = e.offsetX
        lastPosition.y = e.offsetY

        if (!insideSignatureRect(lastPosition)) { return }

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
            setDrawStyle()
            ctx.stroke()
          }

          lastPosition.x = position.x
          lastPosition.y = position.y
        }

        canvas.onmouseup = handleEndDrawing
        canvas.onmousemove = handleDrawing
      }

      // Mobile functions
      function handleStartDrawingMobile (e) {
        const canvasRect = canvas.getBoundingClientRect()

        function getTouchPosition (e) {
          const touch = e.touches[0]
          return { x: (touch.pageX - canvasRect.x) * window.devicePixelRatio || 1, y: (touch.pageY - canvasRect.y) * window.devicePixelRatio || 1 }
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
            setDrawStyle()
            ctx.stroke()
          }

          lastPosition.x = position.x
          lastPosition.y = position.y
        }

        canvas.ontouchend = handleEndDrawingMobile
        canvas.ontouchmove = handleDrawingMobile

        return false
      }

      // Setup handlers
      canvas.onmousedown = handleStartDrawing
      canvas.ontouchstart = handleStartDrawingMobile
    }
  },
  mounted () {
    const vm = this
    pdfjs.GlobalWorkerOptions.workerSrc = this.workerUrl
    this.loading = true

    pdfjs.getDocument(this.url).promise
      .then(doc => {
        vm.doc = doc
        return vm.render()
      })
      .then(() => {
        vm.loading = false
        vm.registerSignatureHandler()
      })
      .catch(alert)
  }
}
</script>

<style>
    canvas {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .pdf-page-wrapper {
        overflow: scroll;
        scrollbar-width: none;
    }

    .pdf-page-wrapper::-webkit-scrollbar {
        display:none;
    }

    .invisible {
        display: none;
    }
</style>
