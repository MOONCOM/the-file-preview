<template>
  <div class="wrap">
    <div class="pdf-container" ref="pdfContainer"></div>
  </div>
</template>

<script>
import * as pdfJS from 'pdfjs-dist/legacy/build/pdf';
// 设置pdf.worker.js文件的引入地址
pdfJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry');

export default {
  name: 'pdf-preview',
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pdfUrl: '', // PDF的base64
      pdfDoc: null, // pdfjs 生成的对象
      scale: 1, // 放大倍数
    };
  },
  async mounted() {
    this.pdfUrl = decodeURIComponent(this.url);
    this.init();
  },
  methods: {
    // 初始化pdf
    init() {
      pdfJS.getDocument(this.pdfUrl).promise.then(async (pdfDoc_) => {
        this.pdfDoc = pdfDoc_;
        const pageCount = this.pdfDoc.numPages;
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= pageCount; i++) {
          // eslint-disable-next-line no-await-in-loop
          await this.renderPage(i);
        }
      });
    },
    // 渲染pdf
    renderPage(num) {
      // let canvas = this.$refs.myCanvas;
      const canvas = document.createElement('canvas');
      // Using promise to fetch the page
      return this.pdfDoc.getPage(num).then((page) => {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const bsr = ctx.webkitBackingStorePixelRatio
            || ctx.mozBackingStorePixelRatio
            || ctx.msBackingStorePixelRatio
            || ctx.oBackingStorePixelRatio
            || ctx.backingStorePixelRatio
            || 1;
        const ratio = dpr / bsr;
        const viewport = page.getViewport({ scale: this.scale });
        canvas.width = viewport.width * ratio;
        canvas.className = num;
        canvas.height = viewport.height * ratio;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        const renderContext = {
          canvasContext: ctx,
          viewport,
        };
          // 数据渲染到canvas画布上
        page.render(renderContext);
        this.$refs.pdfContainer.appendChild(canvas);
      });
    },
  },
};
</script>

<style scoped>
  .wrap {
    display: flex;
    flex-direction: column;
  }
  .wrap .pdf-container {
    flex: 1;
    overflow: auto;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
