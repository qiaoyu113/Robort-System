<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="伙伴名称" prop="name" size="mini">
        <el-input v-model="ruleForm.name" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imgUrl">
        <upload-original :options="uploadOrg" v-on:getPictureUrl="myPicUrl" ref="upOrg"></upload-original>
      </el-form-item>
      <el-form-item v-if="pType==1" label="产品包关联" prop="pkg"  size="mini">
        <el-select v-model="ruleForm.pkg" placeholder="请选择">
          <el-option v-for="item in pkgList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pType==2" label="国家" prop="country"  size="mini">
        <el-select v-model="ruleForm.country" placeholder="请选择国家">
          <el-option v-for="(value, index, key) in countryList" :label="value" :value="value" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pType==2" label="合同模板" prop="template"  size="mini">
        <el-select v-model="ruleForm.template" placeholder="请选择合同模板">
          <el-option v-for="(item, index, key) in templateList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phoneNo" size="mini">
        <el-input v-model="ruleForm.phoneNo" class="iptFormLen" placeholder="可填写邮箱/手机号/座机等"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="detail">
        <textarea v-model="ruleForm.detail" class="iptFormLen" name="detail"></textarea>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import uploadOriginal from '../../../component/upload/uploadOriginal.vue'
  import {world} from '../../../service/worldService'
  import {contentService} from '../../../service/contentService'

  let myEditor;// 富文本编辑器

  export default {
    props: [],
    data () {
      return {
        pkgList: [], // 产品包数组
        countryList: [], // 国家数组
        templateList: [], // 合同模板数组
        pType: 1, // 哪种合作伙伴类型1.白标；2.国际；3.国内；partnerTyp
        uploadOrg: {limit: 1},
        ruleForm: {
          id: '', // 唯一标识
          name: '', // 伙伴名称
          imgUrl: '', // 图片
          pkg: '', // 产品包关联
          country: '', // 国家关联
          template: '', // 合同模板关联
          phoneNo: '', // 联系方式
          detail: '' // 简介
        },
        rules: {
          name: [
            { required: true, message: '请输入合作伙伴名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '请上传合作伙伴图片', trigger: 'blur' }
          ],
          pkg: [
            { required: true, message: '请选择产品包关联', trigger: 'change' }
          ],
          country: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          template: [
            { required: true, message: '合同模板关联', trigger: 'change' }
          ],
          phoneNo: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
//          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
//          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          detail: [
            { required: true, message: '请填写简介', trigger: 'blur' }
          ]
        }
      }
    },
    components: {'upload-original': uploadOriginal},
    mounted () {
      let that = this;
      that.pType = parseInt(that.$route.params.partnerTyp);
      that.$refs.upOrg.isShowDes = true; // 上传图片组件显示描述文字
      console.log(1233, that.pType);
      that.editor(); // 富文本编辑器初始化
      if(that.pType === 1){ // 白标合作伙伴
        console.log(1)
        that.getPackage(); //产品包
      }
      else if(that.pType === 2){ // 国际合作伙伴
        console.log(2)
        that.getCountry(); //国家
        that.getTemplate(); //合同模板
      }
      that.getPartner();
    },
    methods: {
      submitForm(formName) {
        let that = this;
        that.ruleForm.detail = myEditor.getData();
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            let id = that.ruleForm.id;
            let name = that.ruleForm.name;
            let cover = that.ruleForm.imgUrl;
            let productPackageId = '';
            let templateId = '';
            let country = '';
            let prov = '';
            let provCode = '';
            let city = '';
            let cityCode = '';
            let phone = that.ruleForm.phoneNo;
            let description = that.ruleForm.detail;
            if(that.pType === 1){ // 白标合作伙伴
              productPackageId = that.ruleForm.pkg;
            }
            else if(that.pType === 2){ // 国际合作伙伴
              templateId = that.ruleForm.template;
              country = that.ruleForm.country;
            }
            // 表单提交
            contentService.editPartner({
              id: id,
              name: name,
              cover: cover,
              type: that.pType,
              productPackageId: productPackageId,
              templateId: templateId,
              country: country,
              prov: prov,
              provCode: provCode,
              city: city,
              cityCode: cityCode,
              phone: phone,
              description: description}).then(function (res) {
              console.log('编辑一个合作伙伴', res);
              if(res.data.success){
                that.$router.push({name: 'partner'});
              }
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
        that.ruleForm.imgUrl = val;// 封面图
      },
      // 获取一个合作伙伴
      getPartner () {
        let that = this;
        let id = that.$route.params.partnerId;
        contentService.getPartner(id).then(function (res) {
          console.log('获得一个', res);
          if(res.data.success){
            let obj = res.data.datas;
            that.ruleForm = {
              id: obj.id, // 唯一标识
              name: obj.name, // 伙伴名称
              imgUrl: that.$store.state.picHead + obj.cover, // 图片
              pkg: obj.productPackageId, // 产品包关联
              country: obj.country, // 国家关联
              template: obj.templateId, // 合同模板关联
              phoneNo: obj.phone, // 联系方式
              detail: obj.description // 简介
            }
            that.$refs.upOrg.imgUrl = that.ruleForm.imgUrl;
            that.$refs.upOrg.isImageState = 1;
            myEditor.setData(obj.description);
          }else{}
        });
      },
      // 获得产品包列表
      getPackage () {
        let that = this;
        contentService.getPackage().then(function (res) {
          //console.log('产品包', res);
          if(res.data.success){
            let array = res.data.datas;
            that.pkgList = array;
          }else{}
        });
      },
      // 获得国家
      getCountry () {
        let that = this;
        that.countryList = world.nameMap;
        //console.log('国家', that.countryList );
      },
      // 获得合同模板
      getTemplate () {
        let that = this;
        contentService.getTemplates().then(function (res) {
          //console.log('合同模板', res);
          if(res.data.success){
            that.templateList = res.data.datas;
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
      }
    }
  }
</script>
<style lang="less">
  .container{
    font-size:14px;color:#333;
    padding: 20px;
  .iptFormLen{
    width: 600px;
  }
  .picUpload{display: flex; justify-content: space-between;align-items: center;}
  .flexStart .upload-btn{margin-left:0;}
  .cke_chrome{width: 600px;}
  }
</style>