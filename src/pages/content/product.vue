<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opration-bar">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新增</el-button>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            empty-text="暂无数据"
            style="width: 100%"><!--prop="name"style="width:40%"style="width:10%"style="width:10%"style="width:10%"              style="width:20%"-->
      <el-table-column
              fixed
              label="宣传图">
        <template slot-scope="scope">
          <div class="img-cover">
            <img :src="scope.row.cover" class="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              prop = 'name'
              label="标题">
      </el-table-column>
      <el-table-column
              prop = 'description'
              label="介绍">
      </el-table-column>
      <!--<el-table-column-->
              <!--prop="link"              fixed="right"-->
              <!--label="跳转链接">-->
      <!--</el-table-column>-->
      <el-table-column
              label="操作"
              width="90">
        <template slot-scope="scope">
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount" v-if="tableData.length>0">
    </el-pagination>
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
    <!--新增-->
    <el-dialog title="新增产品功能" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="宣传图（大小不超过5M，支持图片格式）" :label-width="formLabelWidth" prop="pic">
          <div class="upload-img" v-model="form.pic">
            <img id="uploadImage" class="image" v-show="isImageState==1">
            <div class="btn" v-show="isImageState==0"><i class="el-icon-plus"></i>
              <input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" class="file">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth" prop="intro">
          <el-input type="textarea" :rows="2" resize="none" placeholder="请输入简介" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth" prop="order">
          <el-select v-model="form.order" placeholder="请选择排序号">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
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
import VueCropper from 'vue-cropper'
import {pluginService} from '../../service/pluginService'
import {contentService} from '../../service/contentService'

  export default {
    props: [],
    data () {
      return {
        form: {
          pic: '',
          title: '',
          intro: '',
          order: ''
        }, // 新增表单
        rules: {
          pic: [
            { required: true, message: '请上传产品功能封面图', trigger: 'blur' },
          ],
          title: [
            { required: true, message: '请输入产品功能名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在30个字符以内', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请填写产品功能简介', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在30个字符以内', trigger: 'blur' }
          ],
          order: [
            { required: true, message: '请选择排序号', trigger: 'change' }
          ]
        }, //表单验证
        couch: {
          rows: null,
          index: -1,
          id: ''
        },
        option: {
          img: '',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 150,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [2, 1]
        }, //截图
        isImageState: 0, // 显示图片区域 or 显示上传图片按钮区域
        currentPage: 1, // 默认当前页为第一页
        page: {
          size: 1,
          num: 1,
          totalCount: 0,
          totalPage: 1,
        },//分页数
        query: '',// 查询条件
        centerDialogVisible: false, // 提示弹框
        dialogFormVisible: false, // 表单弹窗
        dialogCropperVisible: false, // 截图弹框
        tableData: [] //列表数据
      }
    },
    components: { 'vue-cropper': VueCropper},
    mounted () {
      let that = this;
      localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiMeWFiOW8gOWni-W4puS9oOmjniIsInVzZXJJZCI6IjEiLCJwbGF0Zm9ybSI6IlBDSDUiLCJwZXJtaXNzaW9ucyI6WyJYVEdMOlFVRVJZIl0sImV4cCI6MTUxNzYzODM5MywibmJmIjoxNTE3MDMzNTkzfQ.g4jxqOPEm0MrH0q2ecyksVt-3lXJmvMBQVfZmwomd8c';
      that.getList();
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        contentService.getProductFuc({pageNo: that.page.num, pageSize: that.page.size, name: that.query}).then(function(res){
          //console.log('产品功能列表', res);
          if(res.data.success) {
            let page = res.data.datas;
            let table = res.data.datas.datas;
            console.log('page', page);
            console.log('table', table);
            that.page.totalPage = page.totalPage;
            that.page.totalCount = parseInt(page.totalCount);
            for (let i = 0; i < table.length; i++) {
              table[i].cover = that.$store.state.picHead + table[i].cover;
              //that.tableData.push(table[i]);
            }
            that.tableData = table;
          }
        });
      },
      // 分页
      handleSizeChange (val) {
        //console.log(`每页 ${val} 条`);
        let that = this;
        that.page.size = val;
        that.getList();
      },
      handleCurrentChange (val) {
        // 当前页，就是当前点击的那一页
        //console.log(`当前页: ${val}`);
        let that = this;
        that.page.num = val;
        that.getList();
      },
      //添加
      add () {
        let that = this;
        // 重置一下数据
        that.form = {
          pic: '',
          title: '',
          intro: '',
          order: ''
        };
        that.dialogFormVisible = true;
      },
      // 编辑
      doEdit (id) {
        let that = this;
        contentService.getProductFucInfo(id).then(function (res) {
          console.log('编辑', res);
          if(res.data.success){
            let obj = res.data.datas;
            that.form={
              pic: obj.cover,
              title: obj.name,
              intro: obj.description,
              order: obj.sortNum
            }
            //if(obj.cover!=null && obj.cover!==''){
              //that.isImageState=1;
              //document.getElementById('uploadImage').src = that.$store.state.picHead + obj.cover;
            //}
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
          if (valid) { //验证成功
            //alert('submit!');
            console.log('form', that.form);
            contentService.addProductFuc({name: that.form.title, cover: that.form.pic, description: that.form.intro, sortNum: that.form.order}).then(function (res) {
              //console.log('submit success', res);
              if(res.data.success){
                that.dialogFormVisible = false;
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 图片上传至服务器
      postToService (base64, width, height) {
        let that = this;
        console.log(2);
        pluginService.uploadFileBase64({base64Img: base64, width: width, height: height}).then(function (res) {
           //console.log('截取的图片', res);
          if(res.data.success){
            that.form.pic = res.data.datas;
            document.getElementById('uploadImage').src = that.$store.state.picHead + res.data.datas;
            that.isImageState=1;
            that.dialogCropperVisible = false;
          }
        });
      },
      // 图片截取输出
      finish (type) {
        let that = this;
        // 输出
        console.log('截取类型',type);
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
      //弹出框按钮的操作
      // 确认删除
      handleOk () {
        //console.log('确认删除', done);
        let that = this;
        let rows = that.couch.rows;
        let index = that.couch.index;
        let id = that.couch.id;
        this.centerDialogVisible = false;
        contentService.deleteProductFuc(id).then(function (res) {
          //console.log('删除', res);
          if(res.data.success){
            rows.splice(index, 1);
            that.page.num = 1;
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
  .upload-img{width:300px;height:188px;position:relative;
    .image{width:300px;height:150px;}
    .btn{width:300px;height:150px;position:absolute;top:40px;right:0;bottom:0;left: 0;display:flex;justify-content: center;align-items: center;
     -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
     box-sizing: border-box;
     border:1px solid #dcdfe6;
       .file{width:300px;height:150px;position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;cursor: pointer;opacity:0;}
    }

  }
  .container{padding: 20px;}
  .container .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .txt{word-wrap:break-word;}
  .container .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .txt .price{display:block;}
</style>