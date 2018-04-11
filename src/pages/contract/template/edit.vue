<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="合同模板名称" prop="name" size="mini">
        <el-input v-model="ruleForm.name" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="宣传语" prop="slogan">
        <el-input type="textarea" v-model="ruleForm.slogan" class="iptLength" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择分类" prop="classify"  size="mini" v-if="templateType == 1">
        <el-select v-model="ruleForm.classify" placeholder="请选择">
          <el-option v-for="(item, key, index) in bType" :label="item.name" :value="item.id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择国家" prop="country"  size="mini" v-if="templateType == 1">
        <el-select v-model="ruleForm.country" placeholder="请选择">
          <el-option v-for="(value, key, index) in optionCountry" :label="value" :value="value" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择合同模板" prop="hotTemplateId"  size="mini">
        <el-select v-model="ruleForm.hotTemplateId" placeholder="请选择">
          <el-option v-for="(item, key, index) in hotDog" :label="item.DisplayName" :value="item.Id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加到产品包" size="mini" v-if="templateType == 1">
        <el-select v-model="ruleForm.packages" placeholder="请选择">
          <el-option v-for="(item, key, index) in cPackage" :label="item.name" :value="item.id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联产品包" prop="packages" size="mini" v-if="templateType == 2">
        <el-select v-model="ruleForm.packages" placeholder="请选择">
          <el-option v-for="(item, key, index) in cPackage" :label="item.name" :value="item.id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" name="detail" class="iptLength" placeholder="用户购买之前显示的内容"></el-input>
      </el-form-item>
      <el-form-item label="目录" prop="catalogue">
        <el-input type="textarea" v-model="ruleForm.catalogue" name="list" class="iptLength" placeholder="用户购买之前显示的内容"></el-input>
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

  let myEditor, myEditor2;// 富文本编辑器

  export default {
    props: [],
    data () {
      return {
        templateType: 1, // 合同模板 or 试用模板
        optionCountry: '', // 国家下拉列表
        hotDog: '', // hotDog模板下拉列表
        hotDogObj: '',
        bType: '', // 所属分类下拉列表
        cPackage: '', // 产品包下拉列表
        ruleForm: {
          id: '',
          name: '', // 模板名称
          slogan: '', // 宣传语
          classify: null, // 分类
          country: '', // 国家
          hotTemplateId: '', // 模板
          packages: '', // 添加到产品包,关联到产品包
          description: '', // 简介
          catalogue: '', // 目录
          price_s: '', // 价格
          isTry: false // 是否为试用模板
        },
        rules: {
          name: [
            { required: true, message: '请输入合同模板名称', trigger: 'blur' },
            { min: 0, max: 15, message: '长度在 15 个字符内', trigger: 'blur' }
          ],
          slogan: [
            { required: true, message: '请填写宣传语', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
          ],
          classify: [
            { required: false, message: '请选择分类', trigger: 'change' }
          ],
          country: [
            { required: false, message: '请选择国家', trigger: 'change' }
          ],
          hotTemplateId: [
            { required: false, message: '请选择模板', trigger: 'change' }
          ],
//          packages: [
//            { required: true, message: '请选择产品包', trigger: 'change' }
//          ],
          description: [
            { required: true, message: '请填写合同模板简介', trigger: 'blur' }
          ],
          catalogue: [
            { required: true, message: '请填写合同模板目录', trigger: 'blur' }
          ]
        }
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.templateType = parseInt(that.$route.params.templateTyp);
      if(that.templateType==1){
        that.ruleForm.isTry = false;
      }
      else if(that.templateType==2){
        that.ruleForm.isTry = true;
      }
      that.editor(); // 初始化富文本编辑器
      that.getTemplateType(); // 分类
      that.getCountries(); // 国家
      that.getHotDogTemplateType(); //HotDog模板
      that.getPackage(); // 产品包

    },
    methods: {
      submitForm(formName) {
        let that = this;
        that.ruleForm.description = myEditor.getData();
        that.ruleForm.catalogue = myEditor2.getData();
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            let pakName = '';
            let className = '';
            for(let i=0;i<that.bType.length;i++){
              if(that.ruleForm.classify == that.bType[i].id){
                className = that.bType[i].name;
              }
            }
            for(let i=0;i<that.cPackage.length;i++){
              if(that.ruleForm.packages == that.cPackage[i].id){
                pakName = that.cPackage[i].name;
              }
            }
            //console.log('ruleForm', that.ruleForm);
            contractService.editOneTemplate({id: that.$route.params.templateId,
              name: that.ruleForm.name,
              slogan: that.ruleForm.slogan,
              classId: that.ruleForm.classify,
              className: className,
              country: that.ruleForm.country,
              hotTemplateId: that.ruleForm.hotTemplateId,
              productPkgId: that.ruleForm.packages,
              connProductPkgId: that.ruleForm.packages,
              productPkgName: pakName,
              description: that.ruleForm.description,
              catalogue: that.ruleForm.catalogue,
              price_s: that.ruleForm.price_s, tryUse: that.ruleForm.isTry}).then(function (res) {
              //console.log(res, '添加一个模板信息');
              if(res.data.success){
                that.$route.params.templateTyp = String(that.templateType);
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
          //console.log('ma', res);
          if(res.data.success){
            let obj = res.data.datas;
            setTimeout(function () {
              myEditor.setData(obj.description);
              myEditor2.setData(obj.catalogue);
            },1000); // 延迟一秒加载数据，使编辑器完全加载上
            that.ruleForm = {
              name: obj.name, // 模板名称
              slogan: obj.slogan, // 宣传语
              classify: obj.classId, // 分类
              country: obj.country, // 国家
              hotTemplateId: obj.hotTemplateId, // 模板
              packages: obj.productPkgId, // 添加到产品包,关联到产品包
              description: obj.description, // 简介
              catalogue: obj.catalogue, // 目录
              price_s: obj.price_s, // 价格
              isTry: obj.tryUse
            };
          }else{}
        });
      },
      // 获取模板分类
      getTemplateType () {
        let that = this;
        contractService.getTemplateType({type: 2}).then(function (res) {
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
        let that = this;
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("detail");
        myEditor2 = CKEDITOR.replace("list");
        that.getOneTemplate(); // 得到信息
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