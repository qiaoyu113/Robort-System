<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="新闻标题" prop="title" size="mini">
      <el-input v-model="ruleForm.title" class="iptLength" placeholder="60个字内"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author" size="mini">
      <el-input v-model="ruleForm.author" class="iptLength"></el-input>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <upload-img :options="myOption" v-on:getPictureUrl="myPicUrl"></upload-img>
    </el-form-item>
    <el-form-item label="分类" prop="selItem"  size="mini">
      <el-select v-model="ruleForm.selItem" placeholder="请选择">
        <el-option v-for="(item, key, index) in demoList" :label="item.name" :value="item" :key="key"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻详情" prop="detail">
       <el-input type="textarea" v-model="ruleForm.detail" class="iptLength" name="detail"></el-input>
    </el-form-item>
    <el-form-item label="摘要" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc" class="iptLength" resize="none" placeholder="120字以内，不输入默认抓取新闻详情"></el-input>
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
  export default {
    props: [],
    data () {
      return {
        demoList: [{name: '分类一', id: '1'}], // 演示视频下拉列表
        ruleForm: {
          title: '', // 产品包名称
          author: '', // 作者
          cover: '', // 封面图
          selItem: '', // 分类
          detail: '', // 详情
          desc: '' // 简介
        },
        rules: {
          title: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 0, max: 60, message: '长度在 60 个字符内', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请填写作者名称', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '请上传封面图', trigger: 'blur' }
          ],
          selItem: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          detail: [
            { required: true, message: '请填写新闻详情', trigger: 'blur' }
          ]
        },
        myOption: {
          autoCropWidth: 300,
          autoCropHeight: 200
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
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            console.log('that.ruleForm.selItem',that.ruleForm.selItem);
            console.log('that.ruleForm.selItem.id',that.ruleForm.selItem.id);
            console.log('that.ruleForm.selItem.name',that.ruleForm.selItem.name);
            contentService.addNews({name: that.ruleForm.title,
              author: that.ruleForm.author,
              description: that.ruleForm.desc,
              content: that.ruleForm.detail,
              classId: that.ruleForm.selItem.id,
              className: that.ruleForm.selItem.name,
              cover: that.ruleForm.cover,
              type: 1}).then(function (res) {
              console.log(res, '添加一个新闻');
              if(res.data.success){
                that.$router.push({name: 'news'}); //
              }else{}
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 获取分类
      getDicKey() {
        let that = this;
        contentService.getDicKey({type: 1}).then(function (res) {
          //console.log('分类', res);
          if(res.data.success){
            //that.demoList = res.data.datas;
          }else{}
        });
      },
      // 获取图片服务器路径
      myPicUrl(val){
        let that = this;
        that.ruleForm.cover = val;
      },
      // 富文本编辑器
      editor(){
        let that = this;
        let CKEDITOR = window.CKEDITOR;
        //let editor = CKEDITOR.replace('detail');
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
  .container{
    font-size:14px;color:#333;
    padding: 20px;
  .iptLength{width:600px;}
  .iptFormLen{width: 600px;}
  .iptPriceLength{width:60px;}
  }
</style>