<template>
  <div>
    <!--上传图片，左边图片，右边上传按钮和描述文字图片比例3:2（裁剪图片）-->
    <div class="picUpload iptFormLen">
      <div class="thumb-zone">
        <img class="thumb" :src="imgUrl">
        <i class="el-icon-circle-close del" v-show="isImageState==1" @click="delImgUrl"></i>
      </div>
      <div class="right">
        <div class="upload-btn">
          <el-button type="primary" size="mini">上传文件</el-button>
          <input v-show="isImageState===0" type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file">
          <input v-show="isImageState===1" type="button" class="file">
        </div>
        <p class="des">1. {{options.des}}</p>
        <p class="des">2. {{options.des2}}</p>
      </div>
    </div>
    <!--截图-->
    <el-dialog title="" :visible.sync="dialogCropperVisible" :show-close="false">
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
          //console.log('截取的图片', res);
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
        // 清空 文件选择器
//        var obj = document.getElementById("uploads") ;
//        obj.outerHTML = obj.outerHTML;
        let e = event;
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          //alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
          return false
        }
        let reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            //data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result;
          }
          that.option.img = data; //赋值到图片截取弹出层
          that.dialogCropperVisible = true; //确定弹出图片截取层
        }
        // 转化为base64
        reader.readAsDataURL(file);
        // 转化为blob
        //reader.readAsArrayBuffer(file)
      },
      // 取消截取功能
      cancelImg () {
        let that = this;
        that.dialogCropperVisible = false; //确定弹出图片截取层
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
        // 清空 文件选择器,不可以清空，否则，如果点击“取消”，则打不开截图层
//        var obj = document.getElementById("uploads") ;
//        obj.outerHTML = obj.outerHTML;
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
<style lang="less" scope>
  .el-dialog{margin:0 auto 50px!important;}
  .vue-cropper{height: 60%!important;;}
  .picUpload{display: flex; justify-content: flex-start;align-items: center;
    .right{margin-left:20px;
      .des{line-height: 24px;font-size:12px;color:#999;}
    }
    .thumb-zone{width:150px;height:100px;position:relative;border:1px solid #dcdfe6;
      .thumb{max-width:100%;max-height:100%;width:auto;height:auto;}
      .del{font-size:20px;position:absolute;top: -8px; right:-8px;}
    }
    .upload-btn{width:80px;height:28px;position:relative;
      .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
    }
  }
</style>