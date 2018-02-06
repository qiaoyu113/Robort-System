<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="作者" prop="author" size="mini">
        <el-input v-model="ruleForm.author" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl" ref="uImg"></upload-img>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import uploadImg from '../../../component/upload/uploadLR.vue'
  import {contentService} from '../../../service/contentService'
  export default {
    props: [],
    data () {
      return {
        ruleForm: {
          id: '', // id
          author: '', // 作者
          cover: '', // 封面图
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
        myOption: {
          autoCropWidth: 300,
          autoCropHeight: 200
        }
      }
    },
    components: {'upload-img': uploadImg},
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
              cover: that.ruleForm.cover}).then(function (res) {
              if(res.data.success){
                that.$router.push({name: 'HotDocs'}); //
              }else{}
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getHotUser () {
        let that = this, id = that.$route.params.hotDocsId;
        contentService.getHotUser(id).then(function (res) {
          console.log('详情', res);
          if(res.data.success) {
            let obj = res.data.datas;
            that.ruleForm = {
              id: obj.id,
              author: obj.name, // 名称
              cover: obj.cover // 封面图
            }
            that.$refs.uImg.isImageState = 1;
            that.$refs.uImg.imgUrl = that.$store.state.picHead + obj.cover;
          }else{}
        });
      },
      // 获取图片服务器路径
      myPicUrl(val){
        let that = this;
        that.ruleForm.cover = val;
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