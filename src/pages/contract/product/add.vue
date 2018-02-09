<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="产品包名称" prop="title" size="mini">
        <el-input v-model="ruleForm.title" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="产品包封面图" prop="cover">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl"></upload-img>
      </el-form-item>
      <el-form-item label="合作伙伴LOGO" prop="logo">
        <upload-original :options="uploadOrg" v-on:getPictureUrl="myLogoPicUrl"></upload-original>
      </el-form-item>
      <el-form-item label="生成合同banner" prop="banner">
        <upload-original :options="uploadOrgBanner" v-on:getPictureUrl="myBannerPicUrl"></upload-original>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="ruleForm.desc" class="iptLength" resize="none" placeholder="显示在列表页，可写作者简介或内容简介"></el-input>
      </el-form-item>
      <el-form-item label="演示视频" prop="selItem"  size="mini">
        <el-select v-model="ruleForm.selItem" placeholder="请选择">
          <el-option v-for="(item, key, index) in demoList" :label="item.name" :value="item.id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品包详情" prop="detail">
        <el-input type="textarea" v-model="ruleForm.detail" class="iptLength" name="detail"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input size="mini" class="iptPriceLength" v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import uploadImg from '../../../component/upload/uploadLR.vue'
  import uploadOriginal from '../../../component/upload/uploadOriginal.vue'
  import {contractService} from '../../../service/contractService'

  let myEditor;// 富文本编辑器
  export default {
    props: [],
    data () {
      return {
        myOption: {autoCropWidth: 300, autoCropHeight: 200},
        uploadOrg: {
          limit: 1
        },
        uploadOrgBanner: { limit: 1 },
        demoList: [], // 演示视频下拉列表
        ruleForm: {
          title: '', // 产品包名称
          cover: '', // 封面图
          logo: '', // 合作伙伴logo
          banner: '', // banner
          desc: '', // 简介
          selItem: '', // 演示视频
          detail: '', // 详情
          price: '' // 价格
        },
        rules: {
          title: [
            { required: true, message: '请输入产品包名称', trigger: 'blur' },
            { min: 0, max: 15, message: '长度在 15 个字符内', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '请上传封面图', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请上传合作伙伴logo图', trigger: 'blur' }
          ],
          banner: [
            { required: true, message: '请上传生成合同所需banner图', trigger: 'blur' }
          ],
//          desc: [
//            { required: true, message: '请填写简介', trigger: 'blur' },
//            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
//          ],
          selItem: [
            { required: true, message: '请选择演示视频', trigger: 'change' }
          ],
          detail: [
            { required: true, message: '请填写产品包详情', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请填写该产品包的定价', trigger: 'blur' }
          ]
        }
      }
    },
    components: {'upload-img': uploadImg, 'upload-original': uploadOriginal},
    mounted () {
      let that = this;
      that.editor(); // 初始化富文本编辑器
      that.getVideoDemo();// 获得演示视频下拉列表
    },
    methods: {
      submitForm(formName) {
        let that = this;
        that.ruleForm.detail = myEditor.getData();
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            contractService.addProductPackage({
              name: that.ruleForm.title,
              cover: that.ruleForm.cover,
              logo: that.ruleForm.logo,
              banner: that.ruleForm.banner,
              description: that.ruleForm.desc,
              content: that.ruleForm.detail,
              demoVideoId: that.ruleForm.selItem,
              price_s: that.ruleForm.price}).then(function (res) {
              // console.log(res, '添加一个产品包');
              if(res.data.success){
                that.$router.push({name: 'productPackage'}); //
              }else{}
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 获得封面图路径
      myPicUrl (val) {
        let that = this;
        that.ruleForm.cover = val;// 封面图
      },
      // 获得logo图路径
      myLogoPicUrl (val) {
        let that = this;
        that.ruleForm.logo = val;// 合作伙伴logo
      },
      // 获得banner图路径
      myBannerPicUrl (val) {
        let that = this;
        that.ruleForm.banner = val;// banner
      },
      // 获得演示视频列表
      getVideoDemo () {
        let that = this;
        contractService.getVideoDemo().then(function (res) {
          //console.log('yanshi', res);
          if(res.data.success){
            that.demoList = res.data.datas;
          }else{}
        });
      },
      // 富文本编辑器
      editor(){
        let that = this;
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("detail",
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
                  ]
                });
        myEditor.setData("");
      },
    }
  }
</script>
<style lang="less">
  .container{
    font-size:14px;color:#333;
    padding: 20px;
    .iptLength{width:600px;}
    .iptFormLen{width: 600px;}
    .iptPriceLength{width:60px;}
  }
</style>