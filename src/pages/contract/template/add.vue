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
      <el-form-item label="添加到产品包" size="mini" prop="packages" v-if="templateType == 1">
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
      <el-form-item label="常见问题" prop="question1">
        <div class="questions" v-for="question,id in ruleForm.questions">
            <el-input v-model="ruleForm.questions[id].question" class="iptLength db" placeholder="请填写"></el-input>
          <div class="mw600">
            <el-input type="textarea" v-model="ruleForm.questions[id].answer" :name="'add'+id" class="iptLength" placeholder="请填写"></el-input>
          </div>
            <el-button type="primary" @click="deleteQuestion(id)" size="mini" class="delete-question" plain>删除</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-plus" @click="addQuestion()" size="mini" plain>新增常见问题</el-button>
      </el-form-item>
      <el-form-item label="目录" prop="catalogue">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.catalogue" name="list" class="iptLength" placeholder="用户购买之前显示的内容"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="重要免责声明" prop="disclaimer">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.disclaimer" name="disclaimer" class="iptLength" placeholder="重要免责声明"></el-input>
        </div>
      </el-form-item>

      <div class="switch-lang">以下请填写对应英文版本：</div>

      <el-form-item label="合同模板名称" prop="name_en" size="mini">
      <el-input v-model="ruleForm.name_en" class="iptLength"></el-input>
    </el-form-item>
      <el-form-item label="宣传语" prop="slogan_en">
        <el-input type="textarea" v-model="ruleForm.slogan_en" class="iptLength" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description_en">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.description_en" name="detail_en" class="iptLength" placeholder="用户购买之前显示的内容"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="常见问题" prop="question2">
        <div class="questions" v-for="question,id in ruleForm.questions_en">
            <el-input v-model="ruleForm.questions_en[id].question" class="iptLength db" placeholder="请填写"></el-input>
          <div class="mw600">
            <el-input type="textarea" v-model="ruleForm.questions_en[id].answer" :name="'add_en'+id" class="iptLength" placeholder="请填写"></el-input>
          </div>
            <el-button type="primary" @click="deleteQuestion_en(id)" size="mini" class="delete-question" plain>删除</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-plus" @click="addQuestion_en()" size="mini" plain>新增常见问题</el-button>
      </el-form-item>
      <el-form-item label="目录" prop="catalogue_en">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.catalogue_en" name="list_en" class="iptLength" placeholder="用户购买之前显示的内容"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="重要免责声明" prop="disclaimer_en">
        <div class="mw600">
          <el-input type="textarea" v-model="ruleForm.disclaimer_en" name="disclaimer_en" class="iptLength" placeholder="重要免责声明"></el-input>
        </div>
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

  let myEditor, myEditor2,myEditor3,myEditor_en, myEditor2_en,myEditor3_en;// 富文本编辑器

  export default {
    props: [],
    data () {
      return {
        templateType: 1, // 合同模板 or 试用模板
        optionCountry: [], // 国家下拉列表
        hotDog: [], // hotDog模板下拉列表
        hotDogObj: '',
        bType: [], // 所属分类下拉列表
        cPackage: [], // 产品包下拉列表
        ruleForm: {
          name: '', // 模板名称
          slogan: '', // 宣传语
          name_en: '', // 模板名称
          slogan_en: '', // 宣传语
          classify: null, // 分类
          country: '', // 国家
          hotTemplateId: '', // 模板
          packages: '', // 添加到产品包,关联到产品包
          description: '', // 简介
          catalogue: '', // 目录
          disclaimer: '', // 目录
          description_en: '', // 简介
          catalogue_en: '', // 目录
          disclaimer_en: '', // 目录
          price_s: '', // 价格
          questions: [{title:'',answer:''}], // 价格
          questions_en: [{title:'',answer:''}], // 价格
          isTry: false // 是否为试用模板
        },
        rules: {
          name: [
            { required: true, message: '请输入合同模板名称', trigger: 'blur' },
//            { min: 0, max: 15, message: '长度在 15 个字符内', trigger: 'blur' }
          ],
          slogan: [
            { required: true, message: '请填写宣传语', trigger: 'blur' },
//            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
          ],
          name_en: [
            { required: true, message: '请输入合同模板名称', trigger: 'blur' },
//            { min: 0, max: 15, message: '长度在 15 个字符内', trigger: 'blur' }
          ],
          slogan_en: [
            { required: true, message: '请填写宣传语', trigger: 'blur' },
//            { min: 0, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
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
          packages: [
            { required: true, message: '请选择产品包', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写合同模板简介', trigger: 'blur' }
          ],
          /*catalogue: [
            { required: true, message: '请填写合同模板目录', trigger: 'blur' }
          ],*/
          disclaimer: [
            { required: true, message: '请填写重要免责声明', trigger: 'blur' }
          ],
          /*question1: [
            { required: true, message: '请填写问题', trigger: 'blur' }
          ],*/
          description_en: [
            { required: true, message: '请填写合同模板简介', trigger: 'blur' }
          ],
          /*catalogue_en: [
            { required: true, message: '请填写合同模板目录', trigger: 'blur' }
          ],*/
          disclaimer_en: [
            { required: true, message: '请填写重要免责声明', trigger: 'blur' }
          ],
          /*question2: [
            { required: true, message: '请填写问题', trigger: 'blur' }
          ],*/
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
      that.editor();
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
        that.ruleForm.disclaimer = myEditor3.getData();
        that.ruleForm.description_en = myEditor_en.getData();
        that.ruleForm.catalogue_en = myEditor2_en.getData();
        that.ruleForm.disclaimer_en = myEditor3_en.getData();
        that.checkquestions();
        that.checkquestions_en();
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
            var params = {}
              if(that.templateType ==1){
                params = {name: that.ruleForm.name,
                    slogan: that.ruleForm.slogan,
                    name_en: that.ruleForm.name_en,
                    slogan_en: that.ruleForm.slogan_en,
                    classId: that.ruleForm.classify,
                    className: className,
                    country: that.ruleForm.country=='不选择'?'':that.ruleForm.country,
                    hotTemplateId: that.ruleForm.hotTemplateId,
                    productPkgId: that.ruleForm.packages,
                    productPkgName: pakName,
                    description: that.ruleForm.description,
                    catalogue: that.ruleForm.catalogue,
                    disclaimer: that.ruleForm.disclaimer,
                    questions_s  : JSON.stringify(that.ruleForm.questions),
                    description_en: that.ruleForm.description_en,
                    catalogue_en: that.ruleForm.catalogue_en,
                    disclaimer_en: that.ruleForm.disclaimer_en,
                    questions_s_en  : JSON.stringify(that.ruleForm.questions_en),
                    price_s: that.ruleForm.price_s,
                    tryUse: that.ruleForm.isTry}
              }else{
                  params = {
                      name: that.ruleForm.name,
                      slogan: that.ruleForm.slogan,
                      name_en: that.ruleForm.name_en,
                      slogan_en: that.ruleForm.slogan_en,
                      classId: that.ruleForm.classify,
                      className: className,
                      country: that.ruleForm.country=='不选择'?'':that.ruleForm.country,
                      hotTemplateId: that.ruleForm.hotTemplateId,
                      connProductPkgId: that.ruleForm.packages,
                      productPkgName: pakName,
                      description: that.ruleForm.description,
                      catalogue: that.ruleForm.catalogue,
                      questions_s  : JSON.stringify(that.ruleForm.questions),
                      disclaimer: that.ruleForm.disclaimer,
                      description_en: that.ruleForm.description_en,
                      catalogue_en: that.ruleForm.catalogue_en,
                      questions_s_en  : JSON.stringify(that.ruleForm.questions_en),
                      disclaimer_en: that.ruleForm.disclaimer_en,
                      price_s: that.ruleForm.price_s,
                      tryUse: that.ruleForm.isTry}
              }
            contractService.addOneTemplate(params).then(function (res) {
              //console.log(res, '添加一个模板信息');
              if(res.data.success){
                that.$route.params.templateTyp = String(that.templateType);
                that.$router.push({name: 'contractTemplate'}); //
              }else{}
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      //检查是否填写问题
      checkquestion () {
          let that = this
          that.ruleForm.question1 = '1'
          if(that.ruleForm.questions.length){
              for(let i in that.ruleForm.questions){
                let q = that.ruleForm.questions[i]
                if(!q.question){
                    that.ruleForm.question1 = null
                }
            }
          }
      },
      //检查是否填写问题
      checkquestion_en () {
          let that = this
//          that.ruleForm.question2 = '1'
          if(that.ruleForm.questions_en.length){
              for(let i in that.ruleForm.questions_en){
                let q = that.ruleForm.questions_en[i]
                /*if(!q.question){
                    that.ruleForm.question2 = null
                }*/
            }
          }
      },
      // 检查是否填写答案
      checkquestions () {
          let that = this
//          that.ruleForm.question1 = '1'
          if(that.ruleForm.questions && that.ruleForm.questions.length){
              for(let i in that.ruleForm.questions){
//                  console.log(window.editors[i].getData())
                that.ruleForm.questions[i].answer = window.editors[i].getData();
                let q = that.ruleForm.questions[i]
                /*if(!q.answer || !q.question){
                    that.ruleForm.question1 = null
                }*/
            }
          }
      },
      // 检查是否填写答案
      checkquestions_en () {
          let that = this
          that.ruleForm.question2 = '1'
          if(that.ruleForm.questions_en && that.ruleForm.questions_en.length){
              for(let i in that.ruleForm.questions_en){
//                  console.log(window.editors[i].getData())
                that.ruleForm.questions_en[i].answer = window.editors_en[i].getData();
                let q = that.ruleForm.questions_en[i]
                if(!q.answer || !q.question){
                    that.ruleForm.question2 = null
                }
            }
          }
      },
      // 获取模板分类
      getTemplateType () {
        let that = this;
        contractService.getTemplateType({type: 2}).then(function (res) {
          //console.log('模板所属分类', res);
          if(res.data.success){
            that.bType = res.data.datas;
            that.bType.unshift({name:'不选择'})
          }else{}
        });
      },
      // 获取国家列表
      getCountries () {
//        console.log('name map',world.nameMap);
        let that = this;
        that.optionCountry = world.nameMap;
          that.optionCountry[1] = '不选择'
      },
      // 合同模板HotDogs
      getHotDogTemplateType () {
        let that = this;
        contractService.getHotDogsTemplate().then(function (res) {
          //console.log('hotdog', res);
          if(res.data.success){
            that.hotDog = res.data.datas;
            that.hotDog.unshift({DisplayName:'不选择'})
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
      addeditor(id){
        let CKEDITOR = window.CKEDITOR;
        window.editors[id]= CKEDITOR.replace("add"+id);
        window.editors[id].setData("");
        window.editors_en[id]= CKEDITOR.replace("add_en"+id);
        window.editors_en[id].setData("");
      },
      // 富文本编辑器
      editor(){
        let CKEDITOR = window.CKEDITOR;
        myEditor = CKEDITOR.replace("detail");
        myEditor2 = CKEDITOR.replace("list");
        myEditor3 = CKEDITOR.replace("disclaimer");
        myEditor.setData("");
        myEditor2.setData("");
        myEditor3.setData("");
        myEditor_en = CKEDITOR.replace("detail_en");
        myEditor2_en = CKEDITOR.replace("list_en");
        myEditor3_en = CKEDITOR.replace("disclaimer_en");
        myEditor_en.setData("");
        myEditor2_en.setData("");
        myEditor3_en.setData("");
        setTimeout(function () {
            window.editors=[]
            window.editors[0]= CKEDITOR.replace("add0");
            window.editors[0].setData("");
            window.editors_en=[]
            window.editors_en[0]= CKEDITOR.replace("add_en0");
            window.editors_en[0].setData("");
        },200)
      },
      // 富文本编辑器
      addQuestion(){
        let that = this
        that.ruleForm.questions.push({question:'',answer:''})
        let id = that.ruleForm.questions.length-1
        setTimeout(function () {
            window.editors[id]= CKEDITOR.replace("add"+(id));
            window.editors[id].setData("");
        },200)
      },
      // 富文本编辑器
      addQuestion_en(){
        let that = this
        that.ruleForm.questions_en.push({question:'',answer:''})
        let id = that.ruleForm.questions_en.length-1
        setTimeout(function () {
            window.editors_en[id]= CKEDITOR.replace("add_en"+(id));
            window.editors_en[id].setData("");
        },200)
      },
      // 富文本编辑器
      deleteQuestion(id){
          let that = this
//          console.log(id,that.ruleForm.questions.length);
          for(let i=id ;i+1<that.ruleForm.questions.length;i++){
            let data = editors[i+1].getData()
              window.editors[i].setData(data);
          }
          that.ruleForm.questions.splice(id,1)
      },
      // 富文本编辑器
      deleteQuestion_en(id){
          let that = this
//          console.log(id,that.ruleForm.questions.length);
          for(let i=id ;i+1<that.ruleForm.questions_en.length;i++){
            let data = editors_en[i+1].getData()
              window.editors_en[i].setData(data);
          }
          that.ruleForm.questions_en.splice(id,1)
      },
    }
  }
</script>
<style lang="less">
  .container{
    font-size:14px;color:#333;
    padding: 20px;
    .delete-question{ margin: 10px auto 10px 540px;display: block}
    .iptLength{width:600px;}

    .db{display: block}
  }
</style>