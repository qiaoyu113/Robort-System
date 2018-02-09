<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="合同模板名称" prop="title" size="mini">
        <el-input v-model="ruleForm.title" class="iptLength"></el-input>
        <el-checkbox v-model="ruleForm.isTry">设为试用模板</el-checkbox>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" class="iptLength" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择分类" prop="typ"  size="mini">
        <el-select v-model="ruleForm.typ" placeholder="请选择">
          <el-option :label="item.name" :value="item" v-for="(item, key, index) in bType" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择国家" prop="country"  size="mini">
        <el-select v-model="ruleForm.country" placeholder="请选择">
          <el-option v-for="(value, key, index) in optionCountry" :label="value" :value="value" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择合同模板" prop="template"  size="mini">
        <el-select v-model="ruleForm.template" placeholder="请选择"><!--@change="templateItem(item)"-->
          <el-option v-for="(item, key, index) in hotDog" :label="item.DisplayName" :value="item.Id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同模板详情" prop="detail">
        <el-input type="textarea" v-model="ruleForm.detail" name="detail" class="iptLength" placeholder="用户购买之前显示的内容"></el-input>
      </el-form-item>
      <el-form-item label="添加到产品包" prop="packages"  size="mini">
        <el-select v-model="ruleForm.packages" placeholder="请选择">
          <el-option v-for="(item, key, index) in cPackage" :label="item.name" :value="item.id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {world} from '../../../service/worldService'
  import {contractService} from '../../../service/contractService'

  let myEditor;// 富文本编辑器

  export default {
    props: [],
    data () {
      return {
        optionCountry: '', // 国家下拉列表
        hotDog: '', // hotDog模板下拉列表
        hotDogObj: '',
        bType: '', // 所属分类下拉列表
        cPackage: '', // 产品包下拉列表
        ruleForm: {
          title: '',
          isTry: false,
          desc: '',
          typ: '',
          country: '',
          template: '',
          detail: '',
          packages: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入合同模板名称', trigger: 'blur' },
            { min: 0, max: 15, message: '长度在 15 个字符内', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写简介', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
          ],
          typ: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          country: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          template: [
            { required: true, message: '请选择模板', trigger: 'change' }
          ],
          detail: [
            { required: true, message: '请填写合同模板详情', trigger: 'blur' }
          ]
        }
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.editor(); // 初始化富文本编辑器
      that.getOneTemplate(); // 得到信息
      that.getTemplateType(); // 分类
      that.getCountries(); // 国家
      that.getHotDogTemplateType(); //HotDog模板
      that.getPackage(); // 产品包

    },
    methods: {
      submitForm(formName) {
        let that = this;
        that.ruleForm.detail = myEditor.getData();
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            //alert('submit!');
            contractService.editOneTemplate({id: that.$route.params.templateId,
              name: that.ruleForm.title,
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
      // 获得模板信息
      getOneTemplate () {
        let that = this;
        let id = that.$route.params.templateId;
        contractService.getOneTemplate(id).then(function (res) {
          console.log('ma', res);
          if(res.data.success){
            let obj = res.data.datas;
            that.ruleForm = {
              title: obj.name,
              isTry: obj.tryUse,
              desc: obj.description,
              typ: {
                id: obj.classId,
                name: obj.className
              },
              country: obj.country,
              template: obj.hotTemplateId,
              //detail: '',
              packages: obj.productPkgId
            }
            myEditor.setData(obj.content);
          }else{}
        });
      },
      // 获取模板分类
      getTemplateType () {
        let that = this;
        contractService.getTemplateType({type: 3}).then(function (res) {
          //console.log('模板所属分类', res);
          if(res.data.success){
            that.bType = res.data.datas;
          }else{}
        });
      },
      // 获取国家列表
      getCountries () {
        //console.log('name map',world.nameMap);
        let that = this;
        that.optionCountry = world.nameMap;
      },
      // 合同模板HotDogs
      getHotDogTemplateType () {
        let that = this;
        contractService.getHotDogsTemplate().then(function (res) {
          //console.log('hotdog', res);
          if(res.data.success){
            that.hotDog = res.data.datas;
          }else{}
        });
      },
      // 产品包
      getPackage () {
        let that = this;
        contractService.getPackage().then(function (res) {
          //console.log('产品包', res);
          if(res.data.success){
            that.cPackage = res.data.datas;
          }else{}
        });
      },
      // 点击选择合同模板
      templateItem (item) {
        let that = this;
        that.hotDogObj = item;
      },
      // 富文本编辑器
      editor(){
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
  }
</style>