<template>
  <div class="cropper">
    <div class="wrapper">
      <!--组件-->
      <vueCropper
              ref="cropper2"
              :img="example2.img"
              :outputSize="example2.size"
              :outputType="example2.outputType"
              :info="example2.info"
              :canScale="example2.canScale"
              :autoCrop="example2.autoCrop"
              :autoCropWidth="example2.autoCropWidth"
              :autoCropHeight="example2.autoCropHeight"
              :fixed="example2.fixed"
              :fixedNumber="example2.fixedNumber"
      ></vueCropper>
    </div>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
  </div>
</template>
<script>
  import vueCropper from 'vue-cropper'

  export default {
    data: function () {
      return {
        crap: false,
        previews: {},
        lists: [
          {
            img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
          }
        ],
        option: {
          img: '',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: false
        },
        example2: {
          img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [4, 3]
        },
        downImg: '#'
      }
    },
    methods: {
      changeImg () {
        this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
      },
      startCrop () {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      stopCrop () {
        //  stop
        this.crap = false
        this.$refs.cropper.stopCrop()
      },
      clearCrop () {
        // clear
        this.$refs.cropper.clearCrop()
      },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      finish (type) {
        // 输出
        var test = window.open('about:blank')
        test.document.body.innerHTML = '图片生成中..'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var test = window.open('')
            test.location.href = window.URL.createObjectURL(data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            test.location.href = data
          })
        }
      },

      down (type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg (e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      }
    },
    components: {
      vueCropper
    },
  }
</script>
<style></style>