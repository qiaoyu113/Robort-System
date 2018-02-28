<template>
  <div>
    <!--上传图片，左边图片，右边上传按钮和描述文字图片比例3:2-->
    <div class="picUpload iptFormLen flexStart">
      <div class="thumb-zone">
        <img class="thumb" :src="imgUrl">
        <i class="el-icon-circle-close del" v-show="isImageState==1" @click="delImgUrl"></i>
      </div>
      <div class="right">
        <div class="upload-btn">
          <el-button type="primary" size="mini">上传文件</el-button>
            <!--<input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file" >-->
          <input v-if="isImageState===1" type="button" class="file">
          <input v-if="isImageState===0" type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file" >
        </div>
        <p class="des">1. {{options.des}}</p>
        <p class="des">2. {{options.des2}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {pluginService} from '../../service/pluginService'

  export default {
    props: ['options'],
    data () {
      return {
        isImageState: 0, // 显示删除图片图标
        imgUrl: '', // 图片显示路径
        naturalWidth: 0, // 图片实际宽度
        naturalHeight: 0 // 图片实际高度
      }
    },
    components: {},
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
      uploadImg (event) {
        let that = this;
        //
        let e = event || window.event;
        let file = e.target.files[0];
        let limit = parseFloat(file.size / 1024 / 1024) ; //  kb=file.size / 1024; mb= file.size / 1024 / 1024;
          // 是否符合m*n
          let reader = new FileReader();
          let imgFile;
          reader.onload = function (e) {
             imgFile = e.target.result;
              let image = new Image();
              image.src = imgFile;
              that.naturalWidth = image.width;
              that.naturalHeight = image.height;

//              console.log('真实宽', that.naturalWidth);
//              console.log('真实高', that.naturalHeight);
//              console.log('限制宽', that.options.imgWidth);
//              console.log('限制高', that.options.imgHeight);
              if(that.naturalWidth == that.options.imgWidth && that.naturalHeight== that.options.imgHeight){
                  if(limit <= that.options.limit){
                      let formData = new FormData();
                      formData.append('myFile', file);
                      pluginService.uploadFile(formData).then(function (res) {
                          //console.log('上传的图片', res);
                          if(res.data.success){
                              that.$emit('getPictureUrl', res.data.datas.myFile);
                              that.imgUrl = that.$store.state.picHead + res.data.datas.myFile;
                              that.isImageState=1;
                              // 清空 文件选择器
                              var obj = document.getElementById("uploads") ;
                              obj.outerHTML = '';
                          }
                      });
                  }else{
                      that.$message({
                          type: 'error',
                          message: '上传图片大小不能超过'+ that.options.limit + 'M'});
                  }
              }
              else{
                  that.$message({
                      type: 'error',
                      message: '请上传宽高为' + that.options.imgWidth +'*' + that.options.imgHeight + '的图片'});
              }
              // -------------------
          };
          reader.readAsDataURL(file);

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
  .picUpload{display: flex; justify-content: flex-start;align-items: center;
    .right{margin-left:20px;
      .des{line-height: 24px;font-size:12px;color:#999;}
    }
    .thumb-zone{width:150px;height:100px;position:relative;
      .thumb{width:100%;height:100%;}
      .del{font-size:20px;position:absolute;top: -8px; right:-8px;}
    }
    .upload-btn{width:80px;height:28px;position:relative;
      .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
    }
  }
  .flexStart{justify-content: flex-start;
    .thumb-zone{display:flex;justify-content:center; align-items: center; border:1px solid #bbb;
      .thumb{max-width:150px;max-height: 100px; width: auto;height: auto;}
    }
  }
</style>