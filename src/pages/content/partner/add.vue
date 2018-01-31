<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="伙伴名称" prop="name" size="mini">
        <el-input v-model="ruleForm.name" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imgUrl">
        <div class="picUpload iptFormLen">
          <img class="thumb">
          <div class="right">
            <el-button type="primary" size="mini">上传文件</el-button>
            <p class="des">1. 建议尺寸为300*150，不大于2m，支持.png .jpg .jpeg</p>
            <p class="des">2. 说明：该图片将显示在活合作伙伴列表页，用于向用户直观传达所有合作伙伴。</p>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-if="pType==1" label="产品包关联" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="请选择产品包" value="shanghai"></el-option>
          <el-option label="获取产品包列表" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pType==2" label="国家" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择国家">
          <el-option label="请选择产品包" value="shanghai"></el-option>
          <el-option label="获取产品包列表" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pType==2" label="合同模板" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择合同模板">
          <el-option label="请选择产品包" value="shanghai"></el-option>
          <el-option label="获取产品包列表" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pType==3" label="省市" prop="region"  size="mini">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="请选择产品包" value="shanghai"></el-option>
          <el-option label="获取产品包列表" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phoneNo" size="mini">
        <el-input v-model="ruleForm.phoneNo" class="iptFormLen" placeholder="可填写邮箱/手机号/座机等"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <textarea v-model="ruleForm.desc" class="iptFormLen" name="editor"></textarea>
        <!--<el-input type="textarea" v-model="ruleForm.desc" class="iptFormLen"></el-input>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {CKEDITOR} from '../../../assets/js/plugins/ckeditor4/ckeditor'
  import {contentService} from '../../../service/contentService'
  export default {
    props: [],
    data () {
      return {
        ruleForm: {
          pType: 1, // 哪种合作伙伴类型1.白标；2.国际；3.国内；
          name: '', // 伙伴名称
          imgUrl: '', // 图片
          region: '', // 产品包关联
          //type: [], // 伙伴名称
          phoneNo: '', // 联系方式
          desc: '' // 简介
        },
        rules: {
          name: [
            { required: true, message: '请输入合作伙伴名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '请上传合作伙伴图片', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择产品包关联', trigger: 'change' }
          ],
//          type: [
//            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
//          ],
          phoneNo: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写简介', trigger: 'blur' }
          ]
        }
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.pType = that.$route.params.partnerTyp;
      //CKEDITOR.replace( 'editor' );
    },
    methods: {
      submitForm(formName) {
        let that = this;
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        let name = '', cover = '', productPackageId = '', templateId = '', country = '',
                prov = '', provCode = '', city = '', cityCode = '', phone = '', description = '';
        // 表单提交
        contentService.addPartner({name: name,
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

        });
      },
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
    .picUpload{display: flex; justify-content: space-between;align-items: center;
      .right{margin-left:10px;
        .des{line-height: 24px;font-size:12px;color:#999;}
      }
    }
    .thumb{width:200px;height:100px;}
  }
</style>