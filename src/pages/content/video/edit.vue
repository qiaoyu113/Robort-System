<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="视频名称" prop="title">
        <el-input v-model="form.title" size="mini" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="pic">
        <div class="picUpload iptFormLen">
          <div class="thumb-zone">
            <img class="thumb" :src="imgUrl">
            <i class="el-icon-circle-close del" v-show="isImageState==1" @click="delImgUrl"></i>
          </div>
          <div class="right">
            <div class="upload-btn">
              <el-button type="primary" size="mini">上传文件</el-button>
              <input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file">
            </div>
            <p class="des">1. 建议尺寸为900*600，不大于2m，支持.png .jpg .jpeg</p>
            <p class="des">2. 说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。</p>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="选择视频" prop="video">
        <div class="v-upload-btn">
          <el-button size="mini" type="primary">点击上传</el-button>
          <input type="file" id="uploadVideo" accept="*" @change="uploadVideo" class="file">
        </div>
        <p class="v-des">请上传mp4格式，且不超过500M</p>
        <div class="video-list">
          <p class="v-des" v-for="(item, key, index) in fileList">
            <span>{{ item.name }}</span><span style="margin-left:10px;color:#bbb;">{{item.size}}M</span>
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
    <!--截图-->
    <el-dialog title="" :visible.sync="dialogCropperVisible">
      <vue-cropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
      ></vue-cropper>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="finish('base64')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueCropper from 'vue-cropper'
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
        ossOption: { // oss上传
          region: 'oss-cn-shanghai',
          accessKeyId: '',
          accessKeySecret: '',
          stsToken: '',
          bucket: 'shiatang'
        },
        option: {
          img: '',
          info: true,
          size: 1,
          //outputType: 'jpeg',
          outputType: 'jpeg || png || webp',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 900,
          autoCropHeight: 600,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [3, 2]
        }, //截图
        isImageState: 0, // 显示删除图片图标
        imgUrl: '', // 图片显示路径

      }
    },
    components: {'vue-cropper': VueCropper},
    mounted () {
      let that = this;
      localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiMeWFiOW8gOWni-W4puS9oOmjniIsInVzZXJJZCI6IjEiLCJwbGF0Zm9ybSI6IlBDSDUiLCJwZXJtaXNzaW9ucyI6WyJYVEdMOlFVRVJZIl0sImV4cCI6MTUxNzYzODM5MywibmJmIjoxNTE3MDMzNTkzfQ.g4jxqOPEm0MrH0q2ecyksVt-3lXJmvMBQVfZmwomd8c';
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
            //alert('submit!');
            console.log('tijiao', that.form);
            contentService.addVideoDemo({
              name: that.form.title,
              cover: that.form.pic,
              video: that.form.video,
              description: that.form.desc}).then(function (res) {
              console.log('submit success', res);
              if(res.data.success){
                //that.dialogFormVisible = false;
                that.$router.push({name: 'videoDemo'});
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除图片路径
      delImgUrl () {
        let that = this;
        that.isImageState = 0; // 显示图片上传按钮
        that.imgUrl = ''; // 清空页面显示的图片路径
        that.form.pic = ''; // 清空form表单要提交的图片路径
      },
      // 图片上传至服务器
      postToService (base64, width, height) {
        let that = this;
        //console.log(2);
        pluginService.uploadFileBase64({base64Img: base64, width: width, height: height}).then(function (res) {
          //console.log('截取的图片', res);
          if(res.data.success){
            that.form.pic = res.data.datas;
            that.imgUrl = that.$store.state.picHead + res.data.datas;
            that.isImageState=1;
            that.dialogCropperVisible = false;
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
            that.postToService(data, 300, 150);
          });
        }
      },
      // 图片上传，打开文件选择器
      uploadImg (event) {
        // this.option.img
        let that = this;
        let e = event;
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
            //data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          that.option.img = data; //赋值到图片截取弹出层
          that.dialogCropperVisible = true; //确定弹出图片截取层
        }
        // 转化为base64
        reader.readAsDataURL(file);
        // 转化为blob
        //reader.readAsArrayBuffer(file)
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
        console.log('length', that.fileList.length);
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
              console.log('percentage', percentage);
              console.log('cpt', cpt);
            }
          }).then((results) => {
            // 上传完成
            console.log(results,'上传完成');
            that.form.video = "http://shiatang.oss-cn-shanghai.aliyuncs.com/"+key;
            let option = {
              name: fileName,
              size: Math.floor(limit),
              //url: res.data.datas.myfile
            }
            that.fileList.push(option);
          }).catch((err) => {
            console.log(err)
          });

          var obj = document.getElementById('uploadVideo') ;
          obj.select();
          document.selection.clear();
//obj.outerHTML=obj.outerHTML;

        }else{
          // 不超过500m
          this.$alert('上传视频的大小不能超过500mb', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
        //document.getElementById('uploadVideo')[0].value = '';
        //document.getElementById('uploadVideo')[0].outerHTML = '';
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
          console.log(p);
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
      },
      // 富文本编辑器
      editor(){
        let that = this;
        let CKEDITOR = window.CKEDITOR;
        //let editor = CKEDITOR.replace('detail');
        myEditor = CKEDITOR.replace("desc",
                {
                  toolbar: [
                    { name: 'document', items: [ 'Print' ] },
                    { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                    { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
                    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
                    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                    { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                    { name: 'links', items: [ 'Link', 'Unlink' ] },
                    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                    { name: 'insert', items: [ 'Image', 'Table' ] },
                    { name: 'tools', items: [ 'Maximize' ] },
                    { name: 'editing', items: [ 'Scayt' ] }
                  ],
                  customConfig: '',
                  disallowedContent: 'img{width,height,float}',
                  extraAllowedContent: 'img[width,height,align]',
                  extraPlugins: 'tableresize,uploadimage,uploadfile',
                  height: 300,
                  //contentsCss: [ 'https://cdn.ckeditor.com/4.8.0/full-all/contents.css', '../../../src/assets/js/plugins/ckeditor/mystyles.css' ],
                  bodyClass: 'document-editor',
                  format_tags: 'p;h1;h2;h3;pre',
                  removeDialogTabs: 'image:advanced;link:advanced',
                  stylesSet: [
                    /* Inline Styles */
                    { name: 'Marker', element: 'span', attributes: { 'class': 'marker' } },
                    { name: 'Cited Work', element: 'cite' },
                    { name: 'Inline Quotation', element: 'q' },

                    /* Object Styles */
                    {
                      name: 'Special Container',
                      element: 'div',
                      styles: {
                        padding: '5px 10px',
                        background: '#eee',
                        border: '1px solid #ccc'
                      }
                    },
                    {
                      name: 'Compact table',
                      element: 'table',
                      attributes: {
                        cellpadding: '5',
                        cellspacing: '0',
                        border: '1',
                        bordercolor: '#ccc'
                      },
                      styles: {
                        'border-collapse': 'collapse'
                      }
                    },
                    { name: 'Borderless Table', element: 'table', styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
                    { name: 'Square Bulleted List', element: 'ul', styles: { 'list-style-type': 'square' } }
                  ]
                } );
        myEditor.setData("");
      },
    }
  }
</script>
<style lang="less">
  .el-form-item__content{margin-left:78px!important;}
  .container{
    font-size:14px;color:#333;
    padding: 20px;
  .iptFormLen{
    width: 600px;
  }
  .picUpload{display: flex; justify-content: space-between;align-items: center;
  .right{margin-left:10px;
  .des{line-height: 24px;font-size:12px;color:#999;}
  }
  .thumb-zone{width:150px;height:100px;position:relative;
  .del{font-size:20px;position:absolute;top: -8px; right:-8px;}
  }
  .upload-btn{width:80px;height:28px;position:relative;
  .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
  }
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