<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="合同模板名称" prop="name" size="mini">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="选择分类" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="投融资" value="shanghai"></el-option>
          <el-option label="商务交易" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择国家" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="中国" value="shanghai"></el-option>
          <el-option label="美国" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择合同模板" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="股东协议" value="shanghai"></el-option>
          <el-option label="劳务合同" value="beijing"></el-option>
          <el-option label="社会保险代缴协议" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同模板详情" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="添加到产品包" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="产品包名称1" value="shanghai"></el-option>
          <el-option label="产品包名称2" value="beijing"></el-option>
          <el-option label="产品包名称3" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    components: {},
    mounted () {},
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
    }
  }
</script>
<style lang="less">
  .container{
    font-size:14px;color:#333;
    padding: 20px;
  }
</style>