<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="产品包名称" prop="title" size="mini">
        <el-input v-model="ruleForm.title" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="产品包封面图" prop="cover">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl"></upload-img>
        <!--<upload-original :options="uploadOrgth" v-on:getPictureUrl="myPicUrl"></upload-original>-->
      </el-form-item>
      <!--<el-form-item label="合作伙伴LOGO" prop="logo">
        <upload-original :options="uploadOrg" v-on:getPictureUrl="myLogoPicUrl"></upload-original>
      </el-form-item>-->
      <el-form-item label="生成合同banner" prop="banner">
        <upload-original :options="uploadOrgBanner" v-on:getPictureUrl="myBannerPicUrl"></upload-original>
      </el-form-item>
      <el-form-item label="宣传语">
        <el-input type="textarea" v-model="ruleForm.desc" class="iptLength" resize="none" placeholder="显示在列表页，可写作者简介或内容简介"></el-input>
      </el-form-item>
      <!--<el-form-item label="演示视频" prop="selItem"  size="mini">
        <el-select v-model="ruleForm.selItem" placeholder="请选择">
          <el-option v-for="(item, key, index) in demoList" :label="item.name" :value="item.id" :key="key"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="简介" prop="detail">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.detail" class="iptLength" name="detail"></el-input>
        </div>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <div>
          <label>现价</label>
          <el-input size="mini" class="iptPriceLength" v-model="ruleForm.price"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="oriPrice_s">
        <div>
          <label>原价</label>
          <el-input size="mini" class="iptPriceLength" v-model="ruleForm.oriPrice_s"></el-input>
        </div>
      </el-form-item>

      <div class="switch-lang">以下请填写对应英文版本：</div>


      <el-form-item label="产品包名称" prop="title_en" size="mini">
        <el-input v-model="ruleForm.title_en" class="iptLength"></el-input>
      </el-form-item>

      <el-form-item label="产品包封面图" prop="cover_en">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl_en"></upload-img>
      </el-form-item>
      <el-form-item label="生成合同banner" prop="banner_en">
        <upload-original :options="uploadOrgBanner" v-on:getPictureUrl="myBannerPicUrl_en"></upload-original>
      </el-form-item>
      <el-form-item label="宣传语">
        <el-input type="textarea" v-model="ruleForm.desc_en" class="iptLength" resize="none" placeholder="显示在列表页，可写作者简介或内容简介"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="detail_en">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.detail_en" class="iptLength" name="detail_en"></el-input>
        </div>
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
  let myEditor_en;// 富文本编辑器
  export default {
    props: [],
    data () {
      return {
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
        },
        uploadOrgth: {
          limit: 2,
          imgWidth: 900,
          imgHeight: 600,
          // 描述文字一
          des: '建议尺寸为900*600，不大于2m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        },
        uploadOrg: {
          limit: 1,
          imgWidth: 300,
          imgHeight: 150,
          // 描述文字一
          des: '建议尺寸为300x150，不大于1m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        },
        uploadOrgBanner: {
          limit: 1,
          imgWidth: 1440,
          imgHeight: 140,
          // 描述文字一
          des: '建议尺寸为1440x140，不大于2m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        },
        demoList: [], // 演示视频下拉列表
        ruleForm: {
          title: '', // 产品包名称
          title_en: '', // 产品包名称
          cover: '', // 封面图
          logo: '', // 合作伙伴logo
          banner: '', // banner
          desc: '', // 简介
          desc_en: '', // 简介
          selItem: '', // 演示视频
          detail: '', // 详情
          detail_en: '', // 详情
          price: '' // 价格
        },
        rules: {
          title: [
            { required: true, message: '请输入产品包名称', trigger: 'blur' },
//            { min: 0, max: 20, message: '长度在 20 个字符内', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '请上传封面图', trigger: 'blur' }
          ],
          /*logo: [
            { required: true, message: '请上传合作伙伴logo图', trigger: 'blur' }
          ],*/
          banner: [
            { required: true, message: '请上传生成合同所需banner图', trigger: 'blur' }
          ],
//          desc: [
//            { required: true, message: '请填写简介', trigger: 'blur' },
//            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
//          ],
//          selItem: [
//            { required: true, message: '请选择演示视频', trigger: 'change' }
//          ],
          detail: [
            { required: true, message: '请填写产品包详情', trigger: 'blur' }
          ],
          price: [
            { required: false, message: '请填写该产品包的定价', trigger: 'blur' }
          ],
          oriPrice_s: [
            { required: false, message: '请填写该产品包的原价', trigger: 'blur' }
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
        that.ruleForm.detail_en = myEditor_en.getData();
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            contractService.addProductPackage({
              name: that.ruleForm.title,
              name_en: that.ruleForm.title_en,
              cover: that.ruleForm.cover,
              cover_en: that.ruleForm.cover_en,
//              logo: that.ruleForm.logo,
              banner: that.ruleForm.banner,
              banner_en: that.ruleForm.banner_en,
              description: that.ruleForm.desc,
              description_en: that.ruleForm.desc_en,
              content: that.ruleForm.detail,
              content_en: that.ruleForm.detail_en,
              demoVideoId: that.ruleForm.selItem,
              oriPrice_s: that.ruleForm.oriPrice_s,
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
      // 获得封面图路径
      myPicUrl_en (val) {
        let that = this;
        that.ruleForm.cover_en = val;// 封面图
      },
      // 获得banner图路径
      myBannerPicUrl_en (val) {
        let that = this;
        that.ruleForm.banner_en = val;// banner
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
        myEditor = CKEDITOR.replace("detail");
        myEditor.setData("");
        myEditor_en = CKEDITOR.replace("detail_en");
        myEditor_en.setData("");
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