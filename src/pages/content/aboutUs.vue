<template>
  <div class="container">
    <!--切换选项卡-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="合同机器人使命" name="1"></el-tab-pane>
      <el-tab-pane label="解决方案" name="2"></el-tab-pane>
      <el-tab-pane label="技术合作伙伴" name="3"></el-tab-pane>
      <el-tab-pane label="内容合作伙伴" name="4"></el-tab-pane>
      <el-tab-pane label="更多信息" name="5"></el-tab-pane>
    </el-tabs>
    <!---->
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.content" type="textarea" resize="none" :rows="8" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="视频链接" v-if="isShowLink">
        <el-input v-model="form.link" class="iptLength" placeholder="http://"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')" size="mini">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {contentService} from '../../service/contentService'

  export default {
    props: [],
    data () {
      return {
        tabIndex: '1', // 显示第一个选项卡
        form: {
          id: '',
          content: '',
          link: ''
        }, // 新增表单
        rules: {
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ]
        }, //表单验证
        isShowLink: 0 // 是否显示视频链接
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        let typ = parseInt(that.tabIndex);
        // 1.合通机器人使命/2.解决方案/3.技术合作伙伴/4.内容合作伙伴/5.更多信息
        contentService.getIntroduces({type: typ}).then(function(res){
          //console.log('简介', res);
          if(res.data.success) {
            let obj = res.data.datas;
            if(obj!=null){
              that.tabIndex = '' + obj.type; // 显示对应选项卡
              that.form = {
                id: obj.id,
                content: obj.description,
                link: obj.videoLink
              }
            }
          }
        });
      },
      // 表单提交
      submit (form) {
        let that = this;
        // 表单验证
        this.$refs[form].validate((valid) => {
          if (valid) { //验证成功bannerType 0：图片；1：视频
            let typ = parseInt(that.tabIndex);
            contentService.editIntroduce({id: that.form.id, description: that.form.content, videoLink: that.form.link, type: typ}).then(function (res) {
              console.log('编辑', res);
              if(res.data.success){
                //that.dialogFormVisible = false;
                //that.getList();
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    watch: {
      tabIndex (cur, old){
        let that = this;
        let tab = parseInt(cur);
        if(tab==1 || tab==4){
          that.isShowLink = 0;
        }else{
          that.isShowLink = 1;
        }
        that.form = {
          id: '',
          content: '',
          link: ''
        };
        that.getList();
      }
    }
  }
</script>
<style lang="less">
  .container{padding: 20px;}
  .iptLength{width: 600px;}
</style>