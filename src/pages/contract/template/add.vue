<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="合同模板名称" prop="title" size="mini">
        <el-input v-model="ruleForm.title" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" class="iptLength" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择分类" prop="typ"  size="mini">
        <el-select v-model="ruleForm.typ" placeholder="请选择">
          <!--<el-option label="投融资" value="shanghai"></el-option>-->
          <!--<el-option label="商务交易" value="beijing"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="选择国家" prop="country"  size="mini">
        <el-select v-model="ruleForm.country" placeholder="请选择">
          <el-option v-for="(value, key) in optionCountry" :label="value" :value="value" :key="key" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择合同模板" prop="template"  size="mini">
        <el-select v-model="ruleForm.template" placeholder="请选择">
          <el-option v-for="item in hotDog" :label="item.DisplayName" :value="item.Id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同模板详情" prop="detail">
        <el-input type="textarea" v-model="ruleForm.detail" name="detail" class="iptLength"></el-input>
      </el-form-item>
      <el-form-item label="添加到产品包" prop="packages"  size="mini">
        <el-select v-model="ruleForm.packages" placeholder="请选择">
          <!--<el-option label="产品包名称1" value="shanghai"></el-option>-->
          <!--<el-option label="产品包名称2" value="beijing"></el-option>-->
          <!--<el-option label="产品包名称3" value="beijing"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {CKEDITER} from '../../../assets/js/plugins/ckeditor/ckeditor'
  import {world} from '../../../service/worldService'
  import {contractService} from '../../../service/contractService'

  export default {
    props: [],
    data () {
      return {
        optionCountry: '', // 国家下拉列表
        hotDog: '', // hotDog模板
        bType: '', // 所属分类
        cPackage: '', // 产品包
        ruleForm: {
          title: '',
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
      CKEDITER.replace('detail');
      that.getTemplateType(); // 分类
      that.getCountries(); // 国家
      that.getHotDogTemplateType(); //HotDog模板
      that.getPackage(); // 产品包
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 获取模板分类
      getTemplateType () {
        let that = this;
        contractService.getTemplateType({type: 3}).then(function (res) {
          console.log('模板所属分类', res);
          if(res.data.success){
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
          console.log('hotdog', res);
          if(res.data.success){
            that.hotDog = res.data.datas;
          }else{}
        });
      },
      // 产品包
      getPackage () {},
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