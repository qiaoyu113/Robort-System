<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="视频名称" prop="title">
        <el-input v-model="form.title" size="mini" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="pic">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl"></upload-img>
      </el-form-item>
      <el-form-item label="选择视频" prop="video">
          <div class="v-upload-btn">
            <el-button size="mini" type="primary">点击上传</el-button>
            <input type="file" id="uploadVideo" accept="*" @change="uploadVideo" class="file">
          </div>
          <p class="v-des">请上传mp4格式，且不超过500M</p>
          <div class="video-list">
            <p class="v-des" v-for="(item, key, index) in fileList">
              <span>{{ item.name }}</span><!--<span style="margin-left:10px;color:#bbb;">{{item.size}}M</span>-->
              <i class="el-icon-close" @click="delVideo" v-if="fileList.length > 0"></i>
              <i class="el-icon-circle-check"  v-if="fileList.length > 0"></i>
            </p><!-- v-if="percent<1 && percent>0"-->
            <img class="progress" :width="percent">
          </div>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input placeholder="请输入简介" v-model="form.desc" name="desc" class="iptFormLen itemLeft"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')" size="mini">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import uploadImg from '../../../component/upload/uploadLR.vue'
  import {pluginService} from '../../../service/pluginService'
  import {contentService} from '../../../service/contentService'
  let myEditor;// 富文本编辑器
  export default {
    props: [],
    data () {
      return {
        form: {
          title: '', // 名称
          pic: '', // 图片
          video: '', // 视频
          desc: '' //简介
        }, // 新增表单
        rules: {
          title: [
            { required: true, message: '请输入演示视频名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在30个字符以内', trigger: 'blur' }
          ],
          pic: [
            { required: true, message: '请上传演示视频图片', trigger: 'blur' },
          ],
          video: [
            { required: true, message: '请上传演示视频', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请输入简介', trigger: 'blur' }
          ]
        }, //表单验证
        percent: 0,
        fileList: [],
        ossOption: { // oss上传视频
            region: 'oss-cn-shanghai',
            accessKeyId: '',
            accessKeySecret: '',
            stsToken: '',
            bucket: 'shiatang'
        },
        myOption: {
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 900,
          autoCropHeight: 600,
          // 开启宽度和高度比例
          fixedNumber: [3, 2],
          // 描述文字一
          des: '建议尺寸为900*600，不大于2m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        } //截图

      }
    },
    components: {'upload-img': uploadImg},
    mounted () {
      let that = this;
      that.editor(); // 初始化富文本编辑器
      that.getYunToken(); // 得到阿里云token
    },
    methods: {
      // 表单提交
      submit (form) {
        let that = this;
        that.form.desc = myEditor.getData();
        // 表单验证
        this.$refs[form].validate((valid) => {
          if (valid) { //验证成功
            //console.log('tijiao', that.form);
            contentService.addVideoDemo({
                name: that.form.title,
                cover: that.form.pic,
                video: that.form.video,
                description: that.form.desc}).then(function (res) {
                  //console.log('submit success', res);
                  if(res.data.success){
                      that.$router.push({name: 'videoDemo'});
                  }
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      // 图片上传
      myPicUrl (val) {
        let that = this;
        that.form.pic = val;// 封面图
      },
      // 视频上传
      uploadVideo (event) {
        let that = this;
        let e = event || window.event;
        let file = e.target.files[0];
        let fileName = file.name;
        let limit = parseFloat(file.size / 1024 / 1024) ; //  kb=file.size / 1024; mb= file.size / 1024 / 1024;
        let key ='upload/'+that.getNowFormatDate()+'/'+ file.name; // 新文件名称
        let  suffix = file.name.substr(file.name.lastIndexOf(".")).toLowerCase(); // 文件后缀名
          // 只可以上传一个视频
        if(that.fileList.length >= 1){
            this.$alert('只可以上传一个视频', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
            return false;
        }
        // 请上传mp4格式的视频
        if(suffix!='.mp4'){
            this.$alert('请上传MP4格式的视频', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
            return false;
        }
        // 视频小于500mb
        if(limit < 500){
            let client = new OSS.Wrapper(that.ossOption);
            // 上传
            client.multipartUpload(key, file, {
                progress: function* (percentage, cpt) {
                    // 上传进度
                    //_this.percentage = percentage
                    //console.log('percentage', percentage);
                    //console.log('cpt', cpt);
                }
            }).then((results) => {
                // 上传完成
                //console.log(results,'上传完成');
                that.form.video = "http://shiatang.oss-cn-shanghai.aliyuncs.com/"+key;
                  let option = {
                    name: fileName,
                    size: Math.floor(limit),
                  }
                  that.fileList.push(option);
            }).catch((err) => {
                console.log(err)
            });
          var obj = document.getElementById("uploadVideo") ;
          obj.outerHTML = obj.outerHTML;
        }else{
           // 不超过500m
            this.$alert('上传视频的大小不能超过500mb', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
        }
      },
      getYunToken () { // 获取阿里云token
          let that = this;
          pluginService.getYunToken().then(function (res) {
             //console.log('获取阿里云token', res);
              if(res.data.success){
                  let info = res.data.datas;
                  that.ossOption.accessKeyId = info.accesskeyid;
                  that.ossOption.accessKeySecret = info.accesskeysecret;
                  that.ossOption.stsToken = info.securitytoken;
              }
          });
      },
      progress (p) {
            return function (done) {
                done();
            };
      },
      getNowFormatDate () { //  给上传的视频重命名为当前时间
          let date = new Date();
          let seperator1 = "-";
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          let currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
      },
      // 删除视频
      delVideo () {
          let that = this;
          that.fileList = [];
          that.form.video = '';

//          document.getElementById('uploadVideo').outerHTML = ''// 清空文件选择器;
      },
      // 富文本编辑器
      editor(){
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("desc");
        myEditor.setData("");
      },
    }
  }
</script>
<style lang="less">
  .el-form-item__content,.el-form-item__label{line-height:28px;}
  .el-upload-list__item-name [class^=el-icon]{height:auto!important;}
  .el-form-item__content{margin-left:78px!important;}
  .el-upload-list{width: 600px;}
  .el-upload-list__item-status-label{top:5px;}
  .container{
    font-size:14px;color:#333;
    padding: 20px;
    .iptFormLen{
      width: 600px;
    }
    .v-des{line-height:24px;padding:0 8px;margin-top:10px;font-size:12px;color:#999;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;}
    .video-list{width:600px;
       .v-des{color:#333;display:flex;justify-content: flex-start; align-items: center;}
       .el-icon-circle-check{margin-left:10px;cursor:pointer;color:#67c23a;display:block;}
       .el-icon-close{margin-left:10px;cursor:pointer; display:none;}
       .v-des:hover{background:#eee;}
       .v-des:hover .el-icon-circle-check{display:none;}
       .v-des:hover .el-icon-close{display:block;}
    }
    .v-upload-btn{width:80px;height:28px;position:relative;
      .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
    }
    .progress{height:2px;border-radius:2px;background:#4EAAFE;}
    .thumb{width:150px;height:100px;}
  }
</style>