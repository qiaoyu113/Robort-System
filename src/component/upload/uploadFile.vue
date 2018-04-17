<!--
author: Liu xiaohong
create: 2018-03-15
desc:上传文件

-->
<template>
  <div class="uploadFile"><!--普通上传文件组件-->
    <div class="upload-btn">
      <el-button type="primary" size="mini">上传文件</el-button>
      <input type="file" id="uploads" accept="*" @change="uploadFile" class="file">
    </div>
    <p class="v-des" v-if="isShowDes">
      <span>{{ fileName }}</span>
      <i class="el-icon-close" @click="delFile"></i>
      <i class="el-icon-circle-check"></i>
    </p>
  </div>

</template>
<script type="text/ecmascript-6">
  import {pluginService} from '../../service/pluginService'

  export default {
    props: ['options'],
    data () {
      return {
        isShowDes: 0,
        fileName: '' // 文件名称
      }
    },
    components: {},
    mounted () {},
    methods: {
      //删除图片路径
      delFile () {
        let that = this;
        that.fileName = '';
        that.isShowDes = 0;
        that.$emit('getFileUrl', '');// 清空form表单要提交的图片路径
      },
      // 图片上传至服务器
      uploadFile (event) {
        let that = this;
        let e = event || window.event;
        let file = e.target.files[0];
        let fileName = file.name;
        // console.log('file', file);
        let formData = new FormData();
        formData.append('myFile', file); // myFile就是key
        pluginService.uploadFile(formData).then(function (res) {
          // console.log('上传的', res);
          if(res.data.success){
            that.fileName = fileName;
            that.isShowDes = 1;
            that.$emit('getFileUrl', res.data.datas.myFile);
          }
        });
      }
    }
  }
</script>
<style lang="less">
  .upload-btn{width:80px;height:28px;position:relative;
    .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
  }
  .v-des{line-height:24px;padding:0 8px;margin-top:10px;font-size:12px;
    color:#333;display:flex;justify-content: flex-start; align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-icon-circle-check{margin-left:10px;cursor:pointer;color:#67c23a;display:block;}
  .el-icon-close{margin-left:10px;cursor:pointer; display:none;}
  .v-des:hover{background:#eee;}
  .v-des:hover .el-icon-circle-check{display:none;}
  .v-des:hover .el-icon-close{display:block;}
</style>