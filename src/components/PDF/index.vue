<template>
  <div id="cpdf" class="cpdf">
    <!-- eslint-disable -->
    <div class="center">
      <div class="el-row top-bar">
        <a-col :span="12" :offset="5">
          <div class="page-cont inline">
            <a-button class="el-icon-arrow-left" icon="left" title="上一页" @click.prevent="prev"></a-button>
            <a-button class="el-icon-arrow-right" icon="right" title="下一页" @click.prevent="next"></a-button>
            <p class="page-num">Page: <span v-text="page_num"></span> / <span v-text="page_count"></span></p>
          </div>
          <div class="scale-cont inline">
            <a-icon type="zoom-in" class="el-icon-zoom-in" title="放大" @click.prevent="addscale"></a-icon>
            <a-icon type="zoom-out" class="el-icon-zoom-out" title="缩小" @click.prevent="minus"></a-icon>
          </div>
          <div class="down-cont inline">
            <a-icon type="download" class="el-icon-download" title="下载" @click.prevent="pdfDownLoad"></a-icon>
          </div>
          <div class="close-cont">
            <a-icon type="close-circle" class="el-icon-circle-close" title="关闭" @click.prevent="closepdf"></a-icon>
          </div>
        </a-col>
      </div>
      <div v-if="page_num === 0" class="loading"></div>
      <canvas class="canvasstyle" id="the-canvas"></canvas>
    </div>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
export default {
  name: 'Cpdf',
  props: {
    pdfurl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pdfDoc: null, // pdfjs 生成的对象
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 1, // 放大倍数
      page_num: 0, // 当前页数
      page_count: 0, // 总页数
      maxscale: 2, // 最大放大倍数
      minscale: 0.8 // 最小放大倍数
    }
  },
  computed: {
    ctx () {
      const id = document.getElementById('the-canvas')
      return id.getContext('2d')
    }
  },
  mounted () {
    PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
    PDFJS.getDocument(this.pdfurl).then(pdfDoc_ => { // 初始化pdf
      this.pdfDoc = pdfDoc_
      this.page_count = this.pdfDoc.numPages
      this.renderPage(this.pageNum)
    })
  },
  methods: {
    renderPage (num) { // 渲染pdf
      this.pageRendering = true
      const canvas = document.getElementById('the-canvas')
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then(page => {
        var viewport = page.getViewport(this.scale)
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: this.ctx,
          viewport: viewport
        }
        var renderTask = page.render(renderContext)

        // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending)
            this.pageNumPending = null
          }
        })
      })
      this.page_num = this.pageNum
    },

    addscale () { // 放大
      if (this.scale >= this.maxscale) {
        return
      }
      this.scale += 0.1
      this.queueRenderPage(this.pageNum)
    },
    minus () { // 缩小
      if (this.scale <= this.minscale) {
        return
      }
      this.scale -= 0.1
      this.queueRenderPage(this.pageNum)
    },
    prev () { // 上一页
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
    },
    next () { // 下一页
      if (this.pageNum >= this.page_count) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    },
    closepdf () { // 关闭PDF
      this.$emit('closepdf')
    },
    queueRenderPage (num) {
      if (this.pageRendering) {
        this.pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
    pdfDownLoad () {
      let blobUrl = this.pdfurl
      const filename = this.subStr(this.pdfurl)
      const a = document.createElement('a')
      if (a.click) {
        a.href = blobUrl
        a.target = '_parent'
        if ('download' in a) {
          a.download = filename
        }
        (document.body || document.documentElement).appendChild(a)
        a.click()
        a.parentNode.removeChild(a)
      } else {
        if (window.top === window &&
          blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
          var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&'
          blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&')
        }
        window.open(blobUrl, '_parent')
      }
    },
    subStr (str) {
      // eslint-disable-next-line no-useless-escape
      const index = str.lastIndexOf('\/')
      return str.substring(index, str.length)
    }
  }
}
</script>

<style lang="less" scoped>
  .canvasstyle {
    position: relative;
    z-index: 10;
  }
  .cpdf {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8);
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    .center {
      text-align: center;
      height: 100%;
      overflow: auto;
      padding-top: 48px;
      .contor {
        margin-bottom: 10px;
      }
    }
  }
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #444444;
    padding: 10px 0;
    box-shadow: 0 2px 2px #111;
    z-index: 100001;
  }
  .inline {
    display: inline-block;
    vertical-align: middle;
    span {
      font-size: 22px;
      color: #ddd;
      cursor: pointer;
    }
  }
  .page-cont {
    box-sizing: border-box;
    padding-top: 0;
    margin-right: 20px;
    .page-num {
      display: inline-block;
      color: #ddd;
      margin-bottom: 0;
      margin-left: 5px;
    }
    .ant-btn {
      margin: 0 2px;
      background-color: #666;
      border-color: #666;
      color: #ddd;
      &:hover,
      &:focus,
      &visited {
        border-color: #666 !important;
        color: #fff !important;
      }
    }
    span {
      font-size: 14px;
    }
  }
  .scale-cont {
    margin-right: 15px;
    .el-icon-zoom-in,
    .el-icon-zoom-out {
      margin: 0 5px;
      font-size: 22px;
      color: #ddd;
      font-weight: normal;
      &:hover {
        color: #fff;
      }
    }
  }
  .down-cont {
    .el-icon-download {
      font-size: 20px;
      color: #ddd;
      &:hover {
        color: #fff;
      }
    }
  }
  .close-cont {
    position: fixed;
    right: 20px;
    top: 10px;
    vertical-align: middle;
    z-index: 99;
    .el-icon-circle-close {
      font-size: 28px;
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }

  .loading {
    position: absolute !important;
    left: 47%;
    transform: translateX(-50%);
    top: 42%;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 4px solid rgba(255, 255, 255, 0.2);
    border-right: 4px solid rgba(255, 255, 255, 0.2);
    border-bottom: 4px solid rgba(255, 255, 255, 0.2);
    border-left: 4px solid #ffffff;
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
    z-index: 5;
  }
  .loading,
  .loading:after {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  @-webkit-keyframes load8 {
    0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    }
    100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    }
    100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    }
  }
</style>
