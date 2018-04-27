<template>
  <div class="container partner-add">
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
          <el-option v-for="(value, index, key) in countryList" :label="value.name" :value="value.id" :key="value.id"></el-option>
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
          <el-form-item prop="contactcover1" size="mini" class="par-contact">
            <upload-original :options="uploadOrg1" v-on:getPictureUrl="myPicUrl1" ref="upOrg1" class="partner-image"></upload-original>
          </el-form-item>
        </el-form-item>
          <div class="contact">
            <el-form-item prop="contactname1" size="mini">
            <el-input v-model="ruleForm.contactname1" class="contact-input" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item prop="contactphone1" size="mini">
            <el-input v-model="ruleForm.contactphone1" class="contact-input" placeholder="phone"></el-input>
            </el-form-item>
            <el-form-item prop="contactemail1" size="mini">
            <el-input v-model="ruleForm.contactemail1" class="contact-input" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item prop="contactlink1" size="mini">
            <el-input v-model="ruleForm.contactlink1" class="contact-input" placeholder="link"></el-input>
            </el-form-item>
          </div>
        <el-form-item prop="contactcover2" size="mini" class="par-contact">
          <upload-original :options="uploadOrg2" v-on:getPictureUrl="myPicUrl2" ref="upOrg2" class="partner-image"></upload-original>
        </el-form-item>
        <div class="contact">
          <el-form-item prop="contactname2" size="mini">
          <el-input v-model="ruleForm.contactname2" class="contact-input" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="contactphone2" size="mini" >
          <el-input v-model="ruleForm.contactphone2" class="contact-input" placeholder="phone"></el-input>
          </el-form-item>
          <el-form-item prop="contactemail2" size="mini">
          <el-input v-model="ruleForm.contactemail2" class="contact-input" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item prop="contactlink2" size="mini" >
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

      <div class="switch-lang">以下请填写对应英文版本：</div>


      <el-form-item label="伙伴名称" prop="name_en" size="mini">
        <el-input v-model="ruleForm.name_en" class="iptFormLen"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imgUrl_en">
        <upload-original :options="uploadOrg" v-on:getPictureUrl="myPicUrl_en" ref="upOrg_en"></upload-original>
      </el-form-item>
      <el-form-item label="简介" prop="detail_en">
        <textarea v-model="ruleForm.detail_en" class="iptFormLen" name="detail_en"></textarea>
      </el-form-item>
      <div class="contact-box" v-show="pType==2">
        <el-form-item label="联系人" prop="contactname1_en" size="mini" class="par-contact">
          <el-form-item prop="contactcover1" size="mini" class="par-contact">
            <upload-original :options="uploadOrg1" v-on:getPictureUrl="myPicUrl1_en" ref="upOrg1_en" class="partner-image"></upload-original>
          </el-form-item>
        </el-form-item>
          <div class="contact">
            <el-form-item prop="contactname1_en" size="mini">
            <el-input v-model="ruleForm.contactname1_en" class="contact-input" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item prop="contactphone1_en" size="mini">
            <el-input v-model="ruleForm.contactphone1_en" class="contact-input" placeholder="phone"></el-input>
            </el-form-item>
            <el-form-item prop="contactemail1_en" size="mini">
            <el-input v-model="ruleForm.contactemail1_en" class="contact-input" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item prop="contactlink1_en" size="mini">
            <el-input v-model="ruleForm.contactlink1_en" class="contact-input" placeholder="link"></el-input>
            </el-form-item>
          </div>
        <el-form-item prop="contactcover2_en" size="mini" class="par-contact">
          <upload-original :options="uploadOrg2" v-on:getPictureUrl="myPicUrl2_en" ref="upOrg2_en" class="partner-image"></upload-original>
        </el-form-item>
        <div class="contact">
          <el-form-item prop="contactname2_en" size="mini">
          <el-input v-model="ruleForm.contactname2" class="contact-input" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="contactphone2_en" size="mini" >
          <el-input v-model="ruleForm.contactphone2_en" class="contact-input" placeholder="phone"></el-input>
          </el-form-item>
          <el-form-item prop="contactemail2_en" size="mini">
          <el-input v-model="ruleForm.contactemail2_en" class="contact-input" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item prop="contactlink2_en" size="mini" >
          <el-input v-model="ruleForm.contactlink2_en" class="contact-input" placeholder="link"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="参考资料" size="mini" v-show="pType==2">
        <div class="media" v-for="referenDatas,id in ruleForm.referenDatas_en">
          <el-input v-model="referenDatas.name" class="title-input" placeholder="标题"></el-input>
          <el-input v-model="referenDatas.link" class="src-input" placeholder="地址"></el-input>
          <el-button type="line" @click="removeRefer_en(id)" size="mini" plain>删除</el-button>
        </div>
        <el-button type="line"  icon="el-icon-plus" @click="addRefer_en()" size="mini" plain>新增参考资料</el-button>
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
let myEditor_en;// 富文本编辑器

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
      uploadOrg1: {
        limit: 1,
        nodesc:true,
        imgWidth: 140,
        imgHeight: 140,
      },
      uploadOrg2: {
        limit: 1,
        nodesc:true,
        imgWidth: 140,
        imgHeight: 140,
      },
      ruleForm: {
        name: '', // 伙伴名称
        name_en: '', // 伙伴名称
        imgUrl: '', // 图片
        imgUrl_en: '', // 图片
        pkg: '', // 产品包关联
        country: '', // 国家关联
        template: '', // 合同模板关联
        phoneNo: '', // 联系方式
        referenDatas: [{},{},{}], // 联系方式
        referenDatas_en: [{},{},{}], // 联系方式
        contactUsers: [{},{}], // 联系方式
        contactUsers_en: [{},{}], // 联系方式
        detail: '', // 简介
        detail_en: '', // 简介
        classType: '', // 区域
        classId: '', // 国家关联
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
        /*contactcover2: [
          { required: true, message: '请上传联系人头像', trigger: 'blur' },
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
    that.$refs.upOrg_en.isShowDes = true; // 上传图片组件显示描述文字
    //console.log(1233, that.pType);
    that.editor(); // 富文本编辑器初始化
    if(that.pType === 1){ // 白标合作伙伴
      //console.log(1)
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
        this.rules.contactlink2= [
            { required: true, message: '请输入链接', trigger: 'blur' },
        ]
      //console.log(2)
      that.getTemplate(); //合同模板
    }
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.ruleForm.detail = myEditor.getData();
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证成功
          let name = that.ruleForm.name;
          let name_en = that.ruleForm.name_en;
          let cover = that.ruleForm.imgUrl;
          let cover_en = that.ruleForm.imgUrl_en;
          let productPackageId = that.ruleForm.pkg;
          let templateId = that.ruleForm.template;
          let area = that.ruleForm.area;
          let country = that.ruleForm.country;
          let prov = '';
          let provCode = '';
          let city = '';
          let cityCode = '';
          let phone = that.ruleForm.phoneNo;
          let email = that.ruleForm.email;
          let url = that.ruleForm.url;
          let classType = that.ruleForm.classType;
          let classId = that.ruleForm.classId;
          let description = that.ruleForm.detail;
          let description_en = that.ruleForm.detail_en;
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
          let contactUsers_en = [
                  {name:that.ruleForm.contactname1_en,
                  cover:that.ruleForm.contactcover1_en,
                  phone:that.ruleForm.contactphone1_en,
                  link:that.ruleForm.contactlink1_en,
                  email:that.ruleForm.contactemail1_en},
                  {name:that.ruleForm.contactname2_en,
                  cover:that.ruleForm.contactcover2_en,
                  phone:that.ruleForm.contactphone2_en,
                  link:that.ruleForm.contactlink2_en,
                  email:that.ruleForm.contactemail2_en},
              ]
          let referenDatas = that.ruleForm.referenDatas;
          let referenDatas_en = that.ruleForm.referenDatas_en;
          if(that.pType === 1){ // 白标合作伙伴
            productPackageId = that.ruleForm.pkg;
          }
          else if(that.pType === 2){ // 国际合作伙伴
              area = that.ruleForm.area;
              templateId = that.ruleForm.template;
            country = that.ruleForm.country;
          }
          var params = {
            name: name,
            name_en: name_en,
            cover: cover,
            cover_en: cover_en,
            type: that.pType,
            productPackageId: productPackageId,
            templateId: templateId,
            area: area,
            country: country,
            prov: prov,
            provCode: provCode,
            city: city,
            cityCode: cityCode,
            phone: phone,
            email: email,
            classType: classType,
            classId: classId,
            url: url,
            description: description,
            description_en: description_en,
            contactUsers_s:JSON.stringify(contactUsers),
            contactUsers_s_en:JSON.stringify(contactUsers_en),
            referenDatas_s:JSON.stringify(referenDatas),
            referenDatas_s_en:JSON.stringify(referenDatas_en)
          }
//            console.log(params);
            // 表单提交
          contentService.addPartner(params).then(function (res) {
            //console.log('添加一个合作伙伴', res);
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
      let that = this;
        that.ruleForm.contactcover1= val;// 封面图
    },
    // 获得封面图路径
    myPicUrl2 (val) {
      let that = this;
      that.ruleForm.contactcover2 = val;// 封面图
    },
    // 获得封面图路径
    myPicUrl_en (val) {
        let that = this;
      that.ruleForm.imgUrl_en = val;// 封面图
    },
    // 获得封面图路径
    myPicUrl1_en (val) {
      let that = this;
        that.ruleForm.contactcover1_en= val;// 封面图
    },
    // 获得封面图路径
    myPicUrl2_en (val) {
      let that = this;
      that.ruleForm.contactcover2_en = val;// 封面图
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
      myEditor_en = CKEDITOR.replace("detail_en");
      myEditor.setData("");
      myEditor_en.setData("");
    },
    getCountryList(v){
        let that = this
        systemService.getClassifyList({type: v,connPartner:false}).then(function(res){
            that.countryList = res.data.datas
            that.ruleForm.classId = ''
        })
    },
    addRefer(v){
        this.ruleForm.referenDatas.push({})
    },
    addRefer_en(v){
        this.ruleForm.referenDatas_en.push({})
    },
    removeRefer(id){
        this.ruleForm.referenDatas.splice(id,1)
    },
    removeRefer_en(id){
        this.ruleForm.referenDatas_en.splice(id,1)
    }
  }
}
</script>
<style lang="less" scope>
  .container .partner-add{
    font-size:14px;color:#333;
    padding: 20px;
    .iptFormLen {
      width: 600px;
    }
    .flexStart .upload-btn{margin-left:0;}
    .cke_chrome{width: 600px;}
    .contact-box{
      .mar10{
        margin-bottom: 0!important;
      }
      width: 100%;
      height: 180px;
      overflow: hidden;
      .partner-image {
        width: 180px;
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
        /*margin-bottom: 10px;*/
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