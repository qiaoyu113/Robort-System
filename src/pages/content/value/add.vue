<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title" size="mini">
        <el-input v-model="ruleForm.title" class="iptLength" placeholder="60个字内"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl"></upload-img>
      </el-form-item>
      <el-form-item label="详情" prop="detail">
         <el-input type="textarea" v-model="ruleForm.detail" class="iptLength" name="detail"></el-input>
      </el-form-item>

      <div class="switch-lang">以下请填写对应英文版本：</div>

      <el-form-item label="标题" prop="title_en" size="mini">
        <el-input v-model="ruleForm.title_en" class="iptLength" placeholder="60个字内"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover_en">
        <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl_en"></upload-img>
      </el-form-item>
      <el-form-item label="详情" prop="detail_en">
         <el-input type="textarea" v-model="ruleForm.detail_en" class="iptLength" name="detail_en"></el-input>
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

  let myEditor;// 富文本编辑器
  let myEditor_en;// 富文本编辑器
  export default {
    props: [],
    data () {
      return {
        demoList: [], // 演示视频下拉列表
        ruleForm: {
          title: '', // 产品包名称
          title_en: '', // 产品包名称
//          author: '', // 作者
          cover: '', // 封面图
          cover_en: '', // 封面图
          selItem: '', // 分类
          detail: '', // 详情
          detail_en: '', // 详情
          desc: '', // 简介
          desc_en: '' // 简介
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 0, max: 60, message: '长度在 60 个字符内', trigger: 'blur' }
          ],
          /*author: [
            { required: true, message: '请填写作者名称', trigger: 'blur' }
          ],*/
          cover: [
            { required: true, message: '请上传封面图', trigger: 'blur' }
          ],
          /*selItem: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],*/
          detail: [
            { required: true, message: '请填写详情', trigger: 'blur' }
          ]
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
        }
      }
    },
    components: {'upload-img': uploadImg},
    mounted () {
      let that = this;
      that.editor(); // 富文本编辑器初始化
      that.getDicKey(); // 分类
    },
    methods: {
      submitForm(formName) {
        let that = this;
        that.ruleForm.detail = myEditor.getData();
        that.ruleForm.detail_en = myEditor_en.getData();
        /*if(that.ruleForm.desc.length == 0){
          let textEditor = myEditor.document.getBody().getText();
          that.ruleForm.desc = textEditor.substring(0, 120);
        }*/
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            // 根据classID获得className
            let className = '';
            for(let i=0;i<that.demoList.length;i++){
              if(that.demoList[i].id === that.ruleForm.selItem){
                className = that.demoList[i].name;
              }
            }
            // 表单
            contentService.addValue({name: that.ruleForm.title,
              name_en: that.ruleForm.title_en,
//              author: that.ruleForm.author,
//              description: that.ruleForm.desc,
              content: that.ruleForm.detail,
              content_en: that.ruleForm.detail_en,
//              classId: that.ruleForm.selItem,
//              className: className,
              cover: that.ruleForm.cover,
              cover_en: that.ruleForm.cover_en,
              type: 1}).then(function (res) {
              //console.log(res, '添加一个新闻');
              if(res.data.success){
                that.$router.push({name: 'contentValue'}); //
              }else{}
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /*// 获取分类
      getDicKey() {
        let that = this;
        contentService.getDicKey({type: 1}).then(function (res) {
          //console.log('分类', res);
          if(res.data.success){
            that.demoList = res.data.datas;
          }else{}
        });
      },*/
      // 获取图片服务器路径
      myPicUrl(val){
        let that = this;
        that.ruleForm.cover = val;
      },
      myPicUrl_en(val){
        let that = this;
        that.ruleForm.cover_en = val;
      },
      // 摘要框输入
      /*zy (event) {
        let cur = event.currentTarget;
        let text = cur.childNodes[0];
        let old = text.value;
        if(old.length >= 120){
          text.value = text.value.slice(0,120);
        }else{
          text.value = old;
        }
      },*/
      // 富文本编辑器
      editor(){
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("detail");
        myEditor_en = CKEDITOR.replace("detail_en");
        myEditor.setData("");
        myEditor_en.setData("");
      },
    }
  }
</script>
<style lang="less" scope>
  .container{
    font-size:14px;color:#333;
    padding: 20px;
  .iptLength{width:600px;}
  .iptFormLen{width: 600px;}
  .iptPriceLength{width:60px;}
  }
</style>