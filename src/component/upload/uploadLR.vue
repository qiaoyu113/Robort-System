<template>
  <div>
    <!--上传图片，左边图片，右边上传按钮和描述文字图片比例3:2-->
    <div class="picUpload iptFormLen">
      <div class="thumb-zone">
        <img class="thumb" :src="imgUrl">
        <i class="el-icon-circle-close del" v-show="isImageState==1" @click="delImgUrl"></i>
      </div>
      <div class="right">
        <div class="upload-btn">
          <el-button type="primary" size="mini">上传文件</el-button>
          <input v-show="isImageState===0" type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file">
          <input v-show="isImageState===1" type="button" class="file" @click="aa">
        </div>
        <p class="des">1. {{options.des}}</p>
        <p class="des">2. {{options.des2}}</p>
      </div>
    </div>
    <!--截图-->
    <el-dialog title="" :visible.sync="dialogCropperVisible" show-close="true">
      <vue-cropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="options.fixedNumber"
      ></vue-cropper>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelImg">取消</el-button>
            <el-button size="mini" type="primary" @click="finish('base64')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueCropper from 'vue-cropper'
  import {pluginService} from '../../service/pluginService'

  export default {
    props: ['options'],
    data () {
      return {
        option: {
          img: '',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 开启宽度和高度比例
          fixed: true
        }, //截图
        dialogCropperVisible: false, // 是否显示
        isImageState: 0, // 显示删除图片图标
        imgUrl: '', // 图片显示路径
      }
    },
    components: {'vue-cropper': VueCropper},
    mounted () {},
    methods: {
      aa () {
        console.log('换了安安')
      },
      //删除图片路径
      delImgUrl () {
        let that = this;
        that.isImageState = 0; // 显示图片上传按钮
        that.imgUrl = ''; // 清空页面显示的图片路径
        that.$emit('getPictureUrl', '');// 清空form表单要提交的图片路径
      },
      // 图片上传至服务器
      postToService (base64, width, height) {
        let that = this;
        pluginService.uploadFileBase64({base64Img: base64, width: width, height: height}).then(function (res) {
          console.log('截取的图片', res);
          if(res.data.success){
            that.$emit('getPictureUrl', res.data.datas);
            that.dialogCropperVisible = false;
            that.imgUrl = that.$store.state.picHead + res.data.datas;
            that.isImageState = 1;
          }
        });
      },
      // 图片截取输出
      finish (type) {
        let that = this;
        // 输出
        //console.log('截取类型',type);
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            // blob:http://localhost:8090/1dd58c90-3625-4e27-8daf-fa2c8dbd6c7f
            //var test = window.open('')
            //test.location.href = window.URL.createObjectURL(data)
          });
        } else {
          this.$refs.cropper.getCropData((data) => {
            that.postToService(data, that.options.autoCropWidth, that.options.autoCropHeight);
          });
        }
      },
      // 图片上传，打开文件选择器
      uploadImg (event) {
        let that = this;
        console.log(1);
        // 清空 文件选择器
        var obj = document.getElementById("uploads") ;
        obj.outerHTML = obj.outerHTML;
        //
        console.log(2);
        let e = event;
        console.log(3);
        var file = e.target.files[0];
        console.log(4);
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
          console.log(5);
          return false
        }
        console.log(6);
        let reader = new FileReader();
        console.log(7);
        reader.onload = (e) => {
          let data;
          console.log(8);
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            //data = window.URL.createObjectURL(new Blob([e.target.result]))
            console.log(9);
          } else {
            data = e.target.result;
            console.log(10);
          }
          console.log(11);
          that.option.img = data; //赋值到图片截取弹出层
          console.log(12);
          that.dialogCropperVisible = true; //确定弹出图片截取层
          console.log(13);
        }
        // 转化为base64
        console.log(14);
        reader.readAsDataURL(file);
        console.log(15);
        // 转化为blob
        //reader.readAsArrayBuffer(file)
      },
      // 取消截取功能
      cancelImg () {
        let that = this;

          console.log(35555);
        that.dialogCropperVisible = false; //确定弹出图片截取层
          console.log(34444);
          that.option = {
              img: '',
              info: true,
              size: 1,
              outputType: 'jpeg',
              canScale: false,
              autoCrop: true,
              // 开启宽度和高度比例
              fixed: true
          }; //截图重置
          //document.querySelector('.el-dialog__wrapper').removeChild();
          console.log(36666);
      }
    },
    watch: {
      isImageState(cur, old){
        return cur;
      },
      imgUrl (cur, old){
        return cur;
      }
    }
  }
</script>
<style lang="less">
  .el-dialog{margin:0 auto 50px!important;}
  .vue-cropper{height: 60%!important;;}
  .picUpload{display: flex; justify-content: flex-start;align-items: center;
    .right{margin-left:20px;
      .des{line-height: 24px;font-size:12px;color:#999;}
    }
    .thumb-zone{width:150px;height:100px;position:relative;
      /*.thumb{width:100%;height:100%;}*/
      .del{font-size:20px;position:absolute;top: -8px; right:-8px;}
    }
    .upload-btn{width:80px;height:28px;position:relative;
      .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
    }
  }
</style>