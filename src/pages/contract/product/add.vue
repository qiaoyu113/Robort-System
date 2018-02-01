<template>
  <div class="container">
    <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">-->
      <!--<el-form-item label="产品包名称" prop="title" size="mini">-->
        <!--<el-input v-model="ruleForm.title" class="iptLength"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="产品包封面图" prop="cover">-->
        <!--<el-upload-->
                <!--class="avatar-uploader"-->
                <!--:show-file-list="false"-->
                <!--:on-success="handleAvatarSuccess"-->
                <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
      <!--</el-form-item>&lt;!&ndash;action="https://jsonplaceholder.typicode.com/posts/"&ndash;&gt;-->
      <!--<el-form-item label="合作伙伴LOGO" prop="logo">-->
        <!--<el-upload-->
                <!--class="avatar-uploader"-->
                <!--:show-file-list="false"-->
                <!--:on-success="handleAvatarSuccess"-->
                <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="简介" prop="desc">-->
        <!--<el-input type="textarea" v-model="ruleForm.desc" class="iptLength" resize="none"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="演示视频" prop="selItem"  size="mini">-->
        <!--<el-select v-model="ruleForm.selItem" placeholder="请选择">-->
          <!--<el-option v-for="(item, key, index) in demoList" label="演示视频" value="shanghai" :key="key"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="产品包详情" prop="detail">-->
        <!--<el-input type="textarea" v-model="ruleForm.detail" class="iptLength" name="detail"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="价格" prop="type" prop="price">-->
        <!--<el-input size="mini" class="iptPriceLength" v-model="ruleForm.price"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即发布</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
  </div>
</template>
<script type="text/ecmascript-6">

  let myEditor;// 富文本编辑器
  export default {
    props: [],
    data () {
      return {
        imageUrl: '',
        demoList: [], // 演示视频下拉列表
        ruleForm: {
          title: '', // 产品包名称
          cover: '', // 封面图
          logo: '', // 合作伙伴logo
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
          desc: [
            { required: true, message: '请填写简介', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
          ],
          selItem: [
            { required: true, message: '请选择分类', trigger: 'change' }
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
    components: {},
    mounted () {
      let that = this;
      localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiMeWFiOW8gOWni-W4puS9oOmjniIsInVzZXJJZCI6IjEiLCJwbGF0Zm9ybSI6IlBDSDUiLCJwZXJtaXNzaW9ucyI6WyJYVEdMOlFVRVJZIl0sImV4cCI6MTUxNzYzODM5MywibmJmIjoxNTE3MDMzNTkzfQ.g4jxqOPEm0MrH0q2ecyksVt-3lXJmvMBQVfZmwomd8c';
      that.editor();
    },
    methods: {
      submitForm(formName) {
        let that = this;
        that.ruleForm.detail = myEditor.getData();
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            //alert('submit!');
            contractService.addOneTemplate({name: that.ruleForm.title,
              description: that.ruleForm.desc,
              content: that.ruleForm.detail,
              classId: that.ruleForm.typ.id,
              className: that.ruleForm.typ.name,
              country: that.ruleForm.country,
              hotTemplateId: that.ruleForm.template,
              productPkgId: that.ruleForm.packages, tryUse: that.ruleForm.isTry}).then(function (res) {
              //console.log(res, '添加一个模板信息');
              if(res.data.success){
                that.$router.push({name: 'contractTemplate'}); //
              }else{}
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
    .iptPriceLength{width:60px;}
  }
</style>