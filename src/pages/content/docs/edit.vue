<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名称" prop="author" size="mini">
        <el-input v-model="ruleForm.author" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <upload-original :options="uploadOrg" v-on:getPictureUrl="myPicUrl" ref="uImg"></upload-original>
      </el-form-item>


      <div class="switch-lang">以下请填写对应英文版本：</div>

      <el-form-item label="用户名称" prop="author_en" size="mini">
        <el-input v-model="ruleForm.author_en" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover_en">
        <upload-original :options="uploadOrg" v-on:getPictureUrl="myPicUrl_en" ref="uImg_en"></upload-original>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import uploadOriginal from '../../../component/upload/uploadOriginal.vue'
  import {contentService} from '../../../service/contentService'
  export default {
    props: [],
    data () {
      return {
        ruleForm: {
          id: '', // id
          author: '', // 作者
          author_en: '', // 作者
          cover: '', // 封面图
          cover_en: '', // 封面图
        },
        rules: {
          author: [
            { required: true, message: '请填写用户名称', trigger: 'blur' },
            { min: 0, max: 30, message: '请填写30个字以内的用户名称', trigger: 'blur' },
          ],
          cover: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
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
      }
    },
    components: {'upload-original': uploadOriginal},
    mounted () {
      this.getHotUser();
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            contentService.editHotUser({
              id: that.ruleForm.id,
              name: that.ruleForm.author,
              name_en: that.ruleForm.author_en,
              cover: that.ruleForm.cover,
              cover_en: that.ruleForm.cover_en,
            }).then(function (res) {
              if(res.data.success){
                that.$router.push({name: 'HotDocs'}); //
              }else{}
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      getHotUser () {
        let that = this, id = that.$route.params.hotDocsId;
        contentService.getHotUser(id).then(function (res) {
          //console.log('详情', res);
          if(res.data.success) {
            let obj = res.data.datas;
            that.ruleForm = {
              id: obj.id,
              author: obj.name, // 名称
              author_en: obj.name_en, // 名称
              cover: obj.cover, // 封面图
              cover_en: obj.cover_en // 封面图
            }
            that.$refs.uImg.isImageState = 1;
            that.$refs.uImg.imgUrl = that.$store.state.picHead + obj.cover;
            that.$refs.uImg_en.isImageState = 1;
            that.$refs.uImg_en.imgUrl = that.$store.state.picHead + obj.cover_en;
          }else{}
        });
      },
      // 获取图片服务器路径
      myPicUrl(val){
        let that = this;
        that.ruleForm.cover = val;
      },
      // 获取图片服务器路径
      myPicUrl_en(val){
        let that = this;
        that.ruleForm.cover_en = val;
      }
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