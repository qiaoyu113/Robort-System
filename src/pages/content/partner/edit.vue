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
      <el-form-item v-if="pType==2" label="区域" prop="classType"  size="mini">
        <el-select v-model="ruleForm.classType" placeholder="请选择区域"
                 @change="getCountryList">
          <el-option v-for="(value, index, key) in areaList" :label="value.name" :value="value.typeId" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pType==2" label="国家" prop="classId"  size="mini">
        <el-select v-model="ruleForm.classId" placeholder="请选择国家">
          <el-option v-for="(value, index, key) in countryList" v-if="value.connPartner==false || ruleForm.classId==value.id" :label="value.name" :value="value.id" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item v-if="pType==2" label="合同模板" prop="template"  size="mini">
        <el-select v-model="ruleForm.template" placeholder="请选择合同模板">
          <el-option v-for="(item, index, key) in templateList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="联系方式" prop="phoneNo" size="mini">
        <el-input v-model="ruleForm.phoneNo" class="iptFormLen" placeholder="可填写邮箱/手机号/座机等"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" size="mini" v-if="pType==2">
        <el-input v-model="ruleForm.email" class="iptFormLen" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="网址" prop="url" size="mini" v-if="pType==2">
        <el-input v-model="ruleForm.url" class="iptFormLen" placeholder="请输入网址"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="detail">
        <textarea v-model="ruleForm.detail" class="iptFormLen" name="detail"></textarea>
      </el-form-item>
      <div class="contact-box" v-show="pType==2">
        <el-form-item label="联系人" prop="contactname1" size="mini" class="par-contact">
          <upload-original :options="uploadOrg1" v-on:getPictureUrl="myPicUrl1" ref="upOrg1" class="partner-image"></upload-original>
        </el-form-item>
        <div class="contact">
          <el-form-item prop="contactname1" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactname1" class="contact-input" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="contactphone1" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactphone1" class="contact-input" placeholder="phone"></el-input>
          </el-form-item>
          <el-form-item prop="contactemail1" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactemail1" class="contact-input" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item prop="contactlink1" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactlink1" class="contact-input" placeholder="link"></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="contactcover2" size="mini" class="par-contact">
          <upload-original :options="uploadOrg1" v-on:getPictureUrl="myPicUrl2" ref="upOrg2" class="partner-image"></upload-original>
        </el-form-item>
        <div class="contact">
          <el-form-item prop="contactemail2" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactname2" class="contact-input" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="contactphone2" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactphone2" class="contact-input" placeholder="phone"></el-input>
          </el-form-item>
          <el-form-item prop="contactemail2" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactemail2" class="contact-input" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item prop="contactlink2" size="mini" class="mar10">
            <el-input v-model="ruleForm.contactlink2" class="contact-input" placeholder="link"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="参考资料" size="mini" v-show="pType==2">
        <div class="media" v-for="referenDatas,id in ruleForm.referenDatas">
          <el-input v-model="referenDatas.name" class="title-input" placeholder="标题"></el-input>
          <el-input v-model="referenDatas.link" class="src-input" placeholder="地址"></el-input>
          <el-button type="line" @click="removeRefer(id)" size="mini" plain>删除</el-button>
        </div>
        <el-button type="line"  icon="el-icon-plus" @click="addRefer()" size="mini" plain>新增参考资料</el-button>
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
  import {systemService} from '../../../service/systemService'

  let myEditor;// 富文本编辑器

  export default {
    props: [],
    data () {
      return {
        pkgList: [], // 产品包数组
        areaList: [
            { name:'亚太',typeId:4,list:[] },
            { name:'中东/北非',typeId:5,list:[] },
            { name:'中东欧/中亚',typeId:6,list:[] },
            { name:'西欧',typeId:7,list:[] },
            { name:'撒哈拉以南非洲',typeId:8,list:[] },
            { name:'美洲',typeId:9,list:[] },], // 国家数组
        countryList: [], // 国家数组
        templateList: [], // 合同模板数组
        pType: 1, // 哪种合作伙伴类型1.白标；2.国际；3.国内；partnerTyp
        uploadOrg: {
          limit: 1,
          imgWidth: 300,
          imgHeight: 150,
          // 描述文字一
          des: '建议尺寸为300x150，不大于1m，支持.png .jpg .jpeg',
          // 描述文字二
          des2: '说明：该图片将显示在活动列表页，用于向用户直观传达该活动的内容。'
        },
        ruleForm: {
          id: '', // 唯一标识
          name: '', // 伙伴名称
          imgUrl: '', // 图片
          pkg: '', // 产品包关联
          classType: '', // 区域
          classId: '', // 国家关联
          template: '', // 合同模板关联
          phoneNo: '', // 联系方式
          referenDatas: [{},{},{}], // 联系方式
          contactUsers: [{},{}], // 联系方式
          detail: '' // 简介
        },
        uploadOrg1: {
            limit: 1,
            nodesc:true,
            imgWidth: 140,
            imgHeight: 140,
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
          classType: [
            { required: true, message: '请选择区域', trigger: 'change' }
          ],
          classId: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          phoneNo:[
            { required: true, message: '请输入联系方式', trigger: 'blur' },
          ],
          /*template: [
            { required: true, message: '合同模板关联', trigger: 'change' }
          ],*/
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
      that.editor(); // 富文本编辑器初始化
      if(that.pType === 1){ // 白标合作伙伴
        that.getPackage(); //产品包
      }
      else if(that.pType === 2){ // 国际合作伙伴

          this.rules.email= [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
          ]
          this.rules.url= [
              { required: true, message: '请输入网址', trigger: 'blur' },
          ]
          this.rules.contactname1= [
              { required: true, message: '请输入联系人', trigger: 'blur' },
          ]
          this.rules.contactphone1= [
              { required: true, message: '请输入手机号', trigger: 'blur' },
          ]
          this.rules.contactemail1= [
              { required: true, message: '请输入联系邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
          ]
          this.rules.contactlink1= [
              { required: true, message: '请输入链接', trigger: 'blur' },
          ]
          this.rules.contactlink2= [
              { required: true, message: '请输入链接', trigger: 'blur' },
          ]
          this.rules.contactname2= [
              { required: true, message: '请输入联系人', trigger: 'blur' },
          ]
          this.rules.contactphone2= [
              { required: true, message: '请输入手机号', trigger: 'blur' },
          ]
          this.rules.contactemail2= [
              { required: true, message: '请输入联系邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
          ]
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
            let productPackageId = that.ruleForm.pkg;
            let templateId = that.ruleForm.template;
            let classType = that.ruleForm.classType;
            let classId = that.ruleForm.classId;
            let prov = '';
            let provCode = '';
            let city = '';
            let cityCode = '';
            let phone = that.ruleForm.phoneNo;
            let email = that.ruleForm.email;
            let url = that.ruleForm.url;
            let description = that.ruleForm.detail;
              let contactUsers = [
                  {name:that.ruleForm.contactname1,
                      cover:that.ruleForm.contactcover1,
                      phone:that.ruleForm.contactphone1,
                      link:that.ruleForm.contactlink1,
                      email:that.ruleForm.contactemail1},
                  {name:that.ruleForm.contactname2,
                      cover:that.ruleForm.contactcover2,
                      phone:that.ruleForm.contactphone2,
                      link:that.ruleForm.contactlink2,
                      email:that.ruleForm.contactemail2},
              ]
              let referenDatas = that.ruleForm.referenDatas;
            if(that.pType === 1){ // 白标合作伙伴
              productPackageId = that.ruleForm.pkg;
            }
            else if(that.pType === 2){ // 国际合作伙伴
              this.rules.contactname1= [
                  { required: true, message: '请输入联系人', trigger: 'blur' },
              ]
              this.rules.contactphone1= [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ]
              this.rules.contactemail1= [
                  { required: true, message: '请输入联系邮箱', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
              ]
              this.rules.contactname2= [
                  { required: true, message: '请输入联系人', trigger: 'blur' },
              ]
              this.rules.contactphone2= [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ]
              this.rules.contactemail2= [
                  { required: true, message: '请输入联系邮箱', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
              ]
              templateId = that.ruleForm.template;
              classType = that.ruleForm.classType;
              classId = that.ruleForm.classId;
            }
            // 表单提交
              contentService.editPartner({
              id: id,
              name: name,
              cover: cover,
              type: that.pType,
              productPackageId: productPackageId,
              templateId: templateId,
              classType: classType,
              classId: classId,
              prov: prov,
              provCode: provCode,
              city: city,
              cityCode: cityCode,
              phone: phone,
              email: email,
              url: url,
              contactUsers_s:JSON.stringify(contactUsers),
              referenDatas_s:JSON.stringify(referenDatas),
              description: description}).then(function (res) {
              //console.log('编辑一个合作伙伴', res);
              if(res.data.success){
                that.$route.params.partnerTyp = String(that.pType);
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
      // 获得封面图路径
      myPicUrl1 (val) {
          let that = this
          that.ruleForm.contactcover1= val;// 封面图
      },
      // 获得封面图路径
      myPicUrl2 (val) {
          let that = this;
          that.ruleForm.contactcover2 = val;// 封面图
      },
      // 获取一个合作伙伴
      getPartner () {
        let that = this;
        let id = that.$route.params.partnerId;
        contentService.getPartner(id).then(function (res) {
          //console.log('获得一个', res);
          if(res.data.success){
            let obj = res.data.datas;
            that.ruleForm = {
              id: obj.id, // 唯一标识
              name: obj.name, // 伙伴名称
              imgUrl:obj.cover, // 图片
              pkg: obj.productPackageId, // 产品包关联
              classType: obj.classType, // 国家关联
              classId: obj.classId, // 国家关联
              template: obj.templateId, // 合同模板关联
              phoneNo: obj.phone, // 联系方式
              email: obj.email, // 联系方式
              url: obj.url, // 联系方式
              referenDatas: obj.referenDatas ||  [{},{},{}], // 联系方式
              contactUsers: obj.contactUsers || [{},{}], // 联系方式
              detail: obj.description // 简介
            }
            that.ruleForm.contactcover1 = that.ruleForm.contactUsers[0].cover
            that.ruleForm.contactname1 = that.ruleForm.contactUsers[0].name
            that.ruleForm.contactphone1 = that.ruleForm.contactUsers[0].phone
            that.ruleForm.contactemail1 = that.ruleForm.contactUsers[0].email
            that.ruleForm.contactlink1 = that.ruleForm.contactUsers[0].link
            that.ruleForm.contactcover2 = that.ruleForm.contactUsers[1].cover
            that.ruleForm.contactphone2 = that.ruleForm.contactUsers[1].phone
            that.ruleForm.contactname2 = that.ruleForm.contactUsers[1].name
            that.ruleForm.contactemail2 = that.ruleForm.contactUsers[1].email
            that.ruleForm.contactlink2 = that.ruleForm.contactUsers[1].link

            that.$refs.upOrg.imgUrl = that.$store.state.picHead +  that.ruleForm.imgUrl;
            that.$refs.upOrg1.imgUrl = that.$store.state.picHead +  that.ruleForm.contactcover1;
            that.$refs.upOrg2.imgUrl = that.$store.state.picHead +  that.ruleForm.contactcover2;
            that.$refs.upOrg.isImageState = 1;
              that.getCountryList(obj.classType,1)
            setTimeout(function () {
              myEditor.setData(obj.description);
            }, 1000);
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
      // 获得合同模板
      getTemplate () {
        let that = this;
        contentService.getTemplatesAll().then(function (res) {
          //console.log('合同模板', res);
          if(res.data.success){
            that.templateList = res.data.datas;
          }else{}
        });
      },
      // 富文本编辑器
      editor(){
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("detail");
        //myEditor.setData("");
      },
      getCountryList(v,f){
          let that = this
          var params
          if(!f){
              params = {type: v,connPartner:false}
          }else{
              params = {type: v}
          }
          systemService.getClassifyList(params).then(function(res){
              that.countryList = res.data.datas
              if(!f) that.ruleForm.classId = null
          })
      },
      addRefer(v){
          this.ruleForm.referenDatas.push({})
      },
      removeRefer(id){
          this.ruleForm.referenDatas.splice(id,1)
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
  .flexStart .upload-btn{margin-left:0;}
  .cke_chrome{width: 600px;}
    .contact-box{
      width: 100%;
      height: 158px;
      overflow: hidden;
      .partner-image {
        width: 160px;
        overflow:  hidden;
        display:  inline-block;
        position: relative;
        float: left;
        height: 135px;
        .right{
          position: absolute;
          left: 18px;
          top:108px;
        }
      }
      .mar10{
        margin-bottom: 0px!important;
      }
      .contact {
        float: left;
        width: 150px;
        display:  inline-block;
        .el-form-item__content{
          margin-left: 0!important;
        }
      }
      .par-contact {
        display:  inline-block;
        float: left;
      }
      .contact-input{
        margin-bottom: 10px;
        width:  110px;
      }
    }

    .media{
      margin:0 0 10px 0;
      .title-input {
        width: 240px;
      }
      .src-input{
        width: 360px;
        margin:0 10px;
      }
    }
  }
</style>