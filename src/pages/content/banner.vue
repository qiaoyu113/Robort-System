<template>
  <div class="container">
    <!--切换选项卡-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="首页" name="first"></el-tab-pane>
    </el-tabs>
    <!--按钮、搜索-->
    <p class="opration-bar">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新增</el-button>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            empty-text="暂无数据"
            style="width: 100%">
      <el-table-column
              prop = 'sortNum'
              label="排序号">
      </el-table-column>
      <el-table-column
              label="图片">
        <template slot-scope="scope">
          <div class="img-cover">
            <img :src="scope.row.picUrl" class="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              prop = 'picTitle'
              label="标题">
      </el-table-column>
      <el-table-column
              prop = 'createDate'
              label="创建时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="90">
        <template slot-scope="scope">
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框-->
    <el-dialog
            title="删除提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="handleOk">确 定</el-button>
          </span>
    </el-dialog>
    <!--新增-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="上传主显图（大小不超过5M，支持图片格式）" :label-width="formLabelWidth" prop="pic">
          <div class="upload-img">
            <upload-original :options="uploadOrg" v-on:getPictureUrl="myPicUrl" ref="upOrgs"></upload-original>
          </div>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth" prop="link">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">跳转链接</el-radio>
            <el-radio :label="2">添加视频</el-radio>
          </el-radio-group>
          <el-input placeholder="http://" v-model="form.link" v-if="form.radio==1"></el-input>
          <div style="margin-top:10px;" v-if="form.radio==2">
            <div class="v-upload-btn">
              <el-button size="mini" type="primary">点击上传</el-button>
              <input type="file" id="uploadVideo" accept="*" @change="uploadVideo" class="file">
            </div>
            <p class="v-des">请上传mp4格式，且不超过500M</p>
            <div class="video-list">
              <p class="v-des" v-for="(item, key, index) in fileList">
                <span>{{ item.name }}</span>
                <i class="el-icon-close" @click="delVideo" v-if="fileList.length > 0"></i>
                <i class="el-icon-circle-check"  v-if="fileList.length > 0"></i>
              </p>
              <img class="progress">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth" prop="order">
          <el-select v-model="form.order" placeholder="请选择排序号">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submit('form')" size="mini">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import uploadOriginal from '../../component/upload/uploadOriginal.vue'
  import {common} from '../../assets/js/common/common'
  import {pluginService} from '../../service/pluginService'
  import {contentService} from '../../service/contentService'

  export default {
    props: [],
    data () {
      return {
        tabIndex: 'first', // 显示第一个选项卡
        isAddEdit: 1, //1.添加；2.编辑
        dialogTitle: '',//添加标题 or 编辑标题
        form: {
          id: '',
          pic: '',
          title: '',
          radio: 1,
          link: '',
          order: ''
        }, // 新增表单
        rules: {
          pic: [
            { required: true, message: '请上传焦点图', trigger: 'blur' },
          ],
          link: [
            { required: true, message: '请填写链接', trigger: 'blur' }
          ],
          order: [
            { required: true, message: '请选择排序号', trigger: 'change' }
          ]
        }, //表单验证
        couch: {
          rows: null,
          index: -1,
          id: ''
        },// 删除使用
        uploadOrg: {
          limit: 5,
          imgWidth: 1440,
          imgHeight: 560,
          // 描述文字一
          des: '建议尺寸为1440x560，或者图片尺寸为18:7，不大于5m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        },
        fileList: [], // 视频
        ossOption: { // oss上传
          region: 'oss-cn-shanghai',
          accessKeyId: '',
          accessKeySecret: '',
          stsToken: '',
          bucket: 'shiatang'
        },
        centerDialogVisible: false, // 提示弹框
        dialogFormVisible: false, // 表单弹窗
        dialogCropperVisible: false, // 截图弹框
        tableData: [] //列表数据
      }
    },
    components: { 'upload-original': uploadOriginal},
    mounted () {
      let that = this;
      that.getList();
      that.getYunToken();
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        contentService.getBanners({type: 0, status: 1}).then(function(res){
          //console.log('焦点图列表', res);
          if(res.data.success) {
            let table = res.data.datas;
            for (let i = 0; i < table.length; i++) {
              table[i].picUrl = that.$store.state.picHead + table[i].picUrl;
              table[i].createDate = common.getFormatOfDate(table[i].createDate*1, 'yyyy-MM-dd hh:mm');
            }
            that.tableData = table;
          }
        });
      },
      //添加
      add () {
        let that = this;
        // 重置一下数据
        that.form = {
          pic: '',
          title: '',
          radio: 1,
          link: '',
          order: ''
        };
        that.isAddEdit = 1;

        that.dialogTitle = '新增焦点图';
        that.dialogFormVisible = true;
      },
      // 编辑
      doEdit (id) {
        let that = this;
        contentService.getBanner(id).then(function (res) {
          //console.log('编辑', res);
          if(res.data.success){
            let obj = res.data.datas;
            that.form={
              id: obj.id,
              pic: obj.picUrl,
              title: obj.picTitle,
              radio: 1,
              link: '',
              order: obj.sortNum
            };
            setTimeout(function () {
            that.$refs.upOrgs.imgUrl = that.$store.state.picHead + obj.picUrl;
            that.$refs.upOrgs.isImageState = 1;
            },1);
            if(obj.bannerType == '0'){
              that.form.radio = 1;
              that.form.link = obj.picLink;
            }
            else if(obj.bannerType == '1'){
              that.form.radio = 2;
              that.form.link = obj.videoUrl;
              let arr = obj.videoUrl.split('/');
              that.fileList =[{
                name: arr[arr.length-1],
                size: '',
              }];
            }
            that.isAddEdit = 2;
            that.dialogTitle = '编辑焦点图';
            that.dialogFormVisible = true;
          }
        });

      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.centerDialogVisible = true;
        that.couch = {
          rows: rows,
          index: index,
          id: id
        };
      },
      // 表单提交
      submit (form) {
        let that = this;
        // 表单验证
        this.$refs[form].validate((valid) => {
          if (valid) { //验证成功bannerType 0：图片；1：视频
            let videoUrl = '';
            let picLink = '';
            let bannerType = 0;
            if(that.form.radio == 1){
              bannerType = 0;
              picLink = that.form.link;
            }else if (that.form.radio == 2){
              bannerType = 1;
              videoUrl = that.form.link;
            }
            if(that.isAddEdit == 1){
              contentService.addBanner({picUrl: that.form.pic, videoUrl: videoUrl, picTitle: that.form.title, picLink: picLink, type: 0,bannerType: bannerType, sortNum: that.form.order}).then(function (res) {
                //console.log('submit add success', res);
                if(res.data.success){
                  that.dialogFormVisible = false;
                  that.getList();
                }
              });
            }else if(that.isAddEdit == 2){
              contentService.editBanner({id: that.form.id,picUrl: that.form.pic, videoUrl: videoUrl, picTitle: that.form.title, picLink: picLink, type: 0,bannerType: bannerType, sortNum: that.form.order}).then(function (res) {
                //console.log('submit edit success', res);
                if(res.data.success){
                  that.dialogFormVisible = false;
                  that.getList();
                }
              });
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 获取图片路径
      myPicUrl (cur) {
        let that = this;
        that.form.pic = cur;
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
            that.form.link = "http://shiatang.oss-cn-shanghai.aliyuncs.com/"+key;
            let option = {
              name: fileName,
              size: Math.floor(limit),
            }
            that.fileList.push(option);
          }).catch((err) => {
            console.log(err)
          });

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
      delVideo () {// 删除视频
        let that = this;
        that.fileList = [];
        that.form.video = '';
//          document.getElementById('uploadVideo').outerHTML = ''// 清空文件选择器;
      },
      //弹出框按钮的操作
      // 确认删除
      handleOk () {
        //console.log('确认删除', done);
        let that = this;
        let rows = that.couch.rows;
        let index = that.couch.index;
        let id = that.couch.id;
        this.centerDialogVisible = false;
        contentService.deleteBanner({bannerId: id, status: 2}).then(function (res) {
          //console.log('删除', res);
          if(res.data.success){
            rows.splice(index, 1);
            that.getList();
          }
        });
      },
      // 关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/common/opration-bar.less";
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-table__empty-block{height:400px!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .v-modal{display:none!important;}
  .el-dialog__wrapper{margin-top:0!important;background:rgba(0,0,0,.3)!important;display:flex;justify-content: center;align-items: center;}
  .el-dialog{z-index:2018;}
  .vue-cropper{height:500px!important;}
  .upload-img{height:138px;
    .picUpload{float:left;}
  }
  .container{padding: 20px;}
  .container .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .txt{word-wrap:break-word;}
  .container .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .txt .price{display:block;}
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
</style>