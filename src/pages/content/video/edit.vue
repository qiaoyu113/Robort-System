<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="视频名称" prop="title">
        <el-input v-model="form.title" size="mini" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="pic" class="uploadImg">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl" ref="upCover"></upload-img>
        <!--<div class="picUpload iptFormLen">-->
          <!--<div class="thumb-zone">-->
            <!--<img class="thumb" :src="imgUrl">-->
            <!--<i class="el-icon-circle-close del" v-show="isImageState==1" @click="delImgUrl"></i>-->
          <!--</div>-->
          <!--<div class="right">-->
            <!--<div class="upload-btn">-->
              <!--<el-button type="primary" size="mini">上传文件</el-button>-->
              <!--<input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file">-->
            <!--</div>-->
            <!--<p class="des">1. 建议尺寸为900*600，不大于2m，支持.png .jpg .jpeg</p>-->
            <!--<p class="des">2. 说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。</p>-->
          <!--</div>-->
        <!--</div>-->
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
          <p class="barProg">
            <img class="progress" :width="progressBar">
          </p>
        </div>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input placeholder="请输入简介" v-model="form.desc" name="desc" class="iptFormLen itemLeft"></el-input>
      </el-form-item>

      <div class="switch-lang">以下请填写对应英文版本：</div>


      <el-form-item label="视频名称" prop="title_en">
        <el-input v-model="form.title_en" size="mini" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="pic_en">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl_en" ref="upCover_en"></upload-img>
      </el-form-item>
      <el-form-item label="选择视频" prop="video_en">
        <div class="v-upload-btn">
          <el-button size="mini" type="primary">点击上传</el-button>
          <input type="file" id="uploadVideo_en" accept="*" @change="uploadVideo_en" class="file">
        </div>
        <p class="v-des">请上传mp4格式，且不超过500M</p>
        <div class="video-list">
          <p class="v-des" v-for="(item, key, index) in fileList_en">
            <span>{{ item.name }}</span><!--<span style="margin-left:10px;color:#bbb;">{{item.size}}M</span>-->
            <i class="el-icon-close" @click="delVideo_en" v-if="fileList_en.length > 0"></i>
            <i class="el-icon-circle-check"  v-if="fileList_en.length > 0"></i>
          </p><!-- v-if="percent<1 && percent>0"-->
          <p class="barProg">
            <img class="progress" :width="progressBar_en">
          </p>
        </div>
      </el-form-item>
      <el-form-item label="简介" prop="desc_en">
        <el-input placeholder="请输入简介" v-model="form.desc_en" name="desc_en" class="iptFormLen itemLeft"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')" size="mini">保 存</el-button>
      </el-form-item>
    </el-form>
    <!--截图-->
    <!--<el-dialog title="" :visible.sync="dialogCropperVisible">-->
      <!--<vue-cropper-->
              <!--ref="cropper"-->
              <!--:img="option.img"-->
              <!--:outputSize="option.size"-->
              <!--:outputType="option.outputType"-->
              <!--:info="option.info"-->
              <!--:canScale="option.canScale"-->
              <!--:autoCrop="option.autoCrop"-->
              <!--:autoCropWidth="option.autoCropWidth"-->
              <!--:autoCropHeight="option.autoCropHeight"-->
              <!--:fixed="option.fixed"-->
              <!--:fixedNumber="option.fixedNumber"-->
      <!--&gt;</vue-cropper>-->
      <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button size="mini" type="primary" @click="finish('base64')">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>
<script>
  import uploadImg from '../../../component/upload/uploadLR.vue'
  import {pluginService} from '../../../service/pluginService'
  import {contentService} from '../../../service/contentService'
  let myEditor;// 富文本编辑器
  let myEditor_en;// 富文本编辑器
  export default {
    props: [],
    data () {
      return {
        form: {
          title: '', // 名称
          title_en: '', // 名称
          pic: '', // 图片
          pic_en: '', // 图片
          originCover:'', //原图
          originCover_en:'',//原图
          video: '', // 视频
          video_en: '', // 视频
          desc: '' ,//简介
          desc_en: '' //简介
        }, // 新增表单
        rules: {
          title: [
            { required: true, message: '请输入演示视频名称', trigger: 'blur' },
//            { min: 0, max: 30, message: '长度在30个字符以内', trigger: 'blur' }
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
          progressBar: 0,
          progressBar_en: 0,
        fileList: [],
        fileList_en: [],
        ossOption: { // oss上传
          region: 'oss-cn-shanghai',
          accessKeyId: '',
          accessKeySecret: '',
          stsToken: '',
          bucket: 'shiatang'
        },
        myOption: {
          // 只有自动截图开启 宽度高度才生效
          fill:true,
          autoCropWidth: 900,
          autoCropHeight: 600,
          // 开启宽度和高度比例
          fixedNumber: [3, 2],
          // 描述文字一
          des: '建议尺寸为900*600，不大于2m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        }

      }
    },
    components: {'upload-img': uploadImg},
    mounted () {
      let that = this;
      that.editor(); // 初始化富文本编辑器
      that.getYunToken(); // 得到阿里云token
      that.getInfo();
    },
    methods: {
      // 表单提交
      submit (form) {
        let that = this;
        that.form.desc = myEditor.getData();
        that.form.desc_en = myEditor_en.getData();
        // 表单验证
        this.$refs[form].validate((valid) => {
          if (valid) { //验证成功
            //alert('submit!');
            //console.log('tijiao', that.form);
            contentService.editVideoDemo({
              id: that.$route.params.videoId,
              name: that.form.title,
              name_en: that.form.title_en,
              originCover:that.form.originCover,
              originCover_en:that.form.originCover_en,
              cover: that.form.pic,
              cover_en: that.form.pic_en,
              video: that.form.video,
              video_en: that.form.video_en,
              description: that.form.desc,
              description_en: that.form.desc_en}).then(function (res) {
              //console.log('submit success', res);
              if(res.data.success){
                //that.dialogFormVisible = false;
                that.$router.push({name: 'videoDemo'});
              }
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      // 获得封面图路径
      myPicUrl (val) {
        let that = this;
        that.form.pic = val[1];// 封面图
        that.form.originCover = val[0];// 封面图
      },
      // 获得封面图路径
      myPicUrl_en (val) {
        let that = this;
        that.form.pic_en = val[1];// 封面图
        that.form.originCover_en = val[0];// 封面图
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
            progress: function*(percentage, cpt) {
              // 上传进度
                that.progressBar = percentage*100 + '%';
//                console.log('percentage', percentage);
//              console.log('cpt', cpt);
            }
          }).then((results) => {
            // 上传完成
            //console.log(results,'上传完成');
            that.form.video = "https://shiatang.oss-cn-shanghai.aliyuncs.com/"+key;
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
          if(document.selection)document.selection.clear();
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
      // 视频上传
      uploadVideo_en (event) {
        let that = this;
        let e = event || window.event;
        let file = e.target.files[0];
        let fileName = file.name;
        let limit = parseFloat(file.size / 1024 / 1024) ; //  kb=file.size / 1024; mb= file.size / 1024 / 1024;
        let key ='upload/'+that.getNowFormatDate()+'/'+ file.name; // 新文件名称
        let  suffix = file.name.substr(file.name.lastIndexOf(".")).toLowerCase(); // 文件后缀名
        // 只可以上传一个视频
        if(that.fileList_en.length >= 1){
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
            progress: function*(percentage, cpt) {
              // 上传进度
                that.progressBar_en = percentage*100 + '%';
//                console.log('percentage', percentage);
//              console.log('cpt', cpt);
            }
          }).then((results) => {
            // 上传完成
            //console.log(results,'上传完成');
            that.form.video_en = "https://shiatang.oss-cn-shanghai.aliyuncs.com/"+key;
            let option = {
              name: fileName,
              size: Math.floor(limit),
              //url: res.data.datas.myfile
            }
            that.fileList_en.push(option);
          }).catch((err) => {
            console.log(err)
          });

          var obj = document.getElementById('uploadVideo') ;
          obj.select();
          if(document.selection)document.selection.clear();
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
      getInfo () {
        let that = this;
        let id = that.$route.params.videoId;
        contentService.getVideoDemo(id).then(function (res) {
          //console.log('详情', res);
          if(res.data.success){
            let obj = res.data.datas;
            that.form ={
              title: obj.name, // 名称
              title_en: obj.name_en, // 名称
              pic: obj.cover, // 图片
              pic_en: obj.cover_en, // 图片
              video: obj.video, // 视频
              video_en: obj.video_en, // 视频
              desc: obj.description, //简介
              desc_en: obj.description_en //简介
            }
            that.$refs.upCover.isImageState = 1; // 显示删除图片图标
            that.$refs.upCover.imgUrl = that.$store.state.picHead + obj.cover; // 图片显示路径
            that.$refs.upCover_en.isImageState = 1; // 显示删除图片图标
            that.$refs.upCover_en.imgUrl = that.$store.state.picHead + obj.cover_en; // 图片显示路径
            let arr = that.form.video ? that.form.video.split('/'):[];
            let arr_en = that.form.video_en ? that.form.video_en.split('/'):[];
              that.fileList = (arr.length >0) ?[{
                name: arr[arr.length - 1],
                size: '',
            }]:[]
            that.fileList_en = (arr_en.length >0) ?[{
              name: arr_en[arr.length-1],
              size: '',
            }]:[];
//              console.log(that.form.video_en,arr_en,that.fileList_en);
            setTimeout(function(){
                myEditor.setData(that.form.desc);
                myEditor_en.setData(that.form.desc_en);
            },100)

          }
        });
      },
      progress (p) {
        return function (done) {
          done();
        };
      },
      progress_en (p) {
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
      },
      // 删除视频
      delVideo_en () {
        let that = this;
        that.fileList_en = [];
        that.form.video_en = '';
      },
      // 富文本编辑器
      editor(){
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("desc");
        myEditor_en = CKEDITOR.replace("desc_en");
        //myEditor.setData("");
      },
    }
  }
</script>
<style lang="less" scope>
  .el-form-item__content{margin-left:78px;}
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
  .el-icon-close{margin-left:10p
  x;cursor:pointer; display:none;}
  .v-des:hover{background:#eee;}
  .v-des:hover .el-icon-circle-check{display:none;}
  .v-des:hover .el-icon-close{display:block;}
  }
  .v-upload-btn{width:80px;height:28px;position:relative;
  .file{width:80px;height:28px;position:absolute;top:0; left:0;cursor: pointer;opacity:0;}
  }
  .thumb{width:150px;height:100px;}
  }
  .barProg{width: 200px;height:2px;}
  .progress{height:2px;background:#409EFF;
    -webkit-border-radius:1px;
    -moz-border-radius:1px;
    border-radius:1px;}
    .uploadImg{
      .el-dialog{
        width: 1000px !important;
        height: 710px !important;
        overflow: visible !important;
        transform: scale(.8) !important;
        max-height: 120vh !important;
        .el-dialog__body{
          width: 900px !important;
          height: 600px !important;
          padding: 10px 50px !important;
          .vue-cropper{
            width: 100% !important;
            height: 100% !important;
            .cropper-box-canvas{
              img{
                width: auto !important;
                height:100% !important;
              }
            }
          }
        }
          
      }
    }
</style>