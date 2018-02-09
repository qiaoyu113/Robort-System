<template>
  <div class="container">
    <!--新闻分类-->
    <div class="classify">
      <p class="title">新闻分类</p>
      <div class="content">
        <span class="item" v-for="item in newsList" :key="item.id">
          {{item.name}}
          <span class="itemEdit">
            <i class="el-icon-edit" @click="doEdit(item.id)"></i>
            <i class="el-icon-delete" @click="doDelete(item.id)"></i>
          </span>
        </span>
        <span class="item" @click="add(1)"><i class="el-icon-plus"></i></span>
      </div>
    </div>
    <!--合同模板分类-->
    <div class="classify">
      <p class="title">合同模板分类</p>
      <div class="content">
        <span class="item" v-for="item in templateListList" :key="item.id">
          {{item.name}}
          <span class="itemEdit">
            <i class="el-icon-edit" @click="doEdit(item.id)"></i>
            <i class="el-icon-delete" @click="doDelete(item.id)"></i>
          </span>
        </span>
        <span class="item" @click="add(2)"><i class="el-icon-plus"></i></span>
      </div>
    </div>
    <!--内容弹框-->
    <el-dialog
            :title="dialog.title"
            modal="false"
            :visible.sync="formDialogVisible"
            width="30%"
            center>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="formDialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('form')">确 定</el-button>
          </span>
    </el-dialog>
    <!--弹框-->
    <el-dialog
            title="删除提示"
            modal="false"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="handleOk">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {systemService} from '../../service/systemService'

  export default {
    props: [],
    data () {
      return {
        form: {
          id: '',
          name: '',
          typ: 0, // 判断是新闻还是模板
          addOrEdit: 0, // 默认添加
        },
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 0, max: 5, message: '分类名称的字数需在5字以内', trigger: 'blur' }
          ],
        },
        dialog: {
          id: '',
          title: '',
          content: ''
        },
        query: '',// 查询条件
        centerDialogVisible: false, // 弹框
        formDialogVisible: false, // 内容弹框
        newsList: [], //新闻分类
        templateList: [] //模板分类
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表partnerTyp
      getList () {
        let that = this;
        that.newsList = [];
        that.templateListList = [];
        systemService.getClassifyList({type: null}).then(function(res){
          //console.log('分类', res);
          if(res.data.success){
            let array = res.data.datas;
            for(let i=0;i<array.length;i++){
              if(array[i].type == 1){
                that.newsList.push(array[i]); // 新闻分类
              }
              if(array[i].type == 2){
                that.templateListList.push(array[i]);// 合同模板分类
              }
            }
          }else{}
        });
      },
      //添加
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            if(that.form.addOrEdit == 0){
              systemService.addClassify({name: that.form.name, type: that.form.typ}).then(function (res) {
                console.log('add', res);
                if(res.data.success){
                  that.formDialogVisible = false;
                  that.getList();
                }else{}
              });
            }
            if(that.form.addOrEdit == 1){
              systemService.editClassify({id: that.form.id, name: that.form.name, type: that.form.typ}).then(function (res) {
                console.log('edit 修改分类', res);
                if(res.data.success){
                  that.formDialogVisible = false;
                  that.getList();
                }else{}
              });
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      add (id) {
        let that = this;
        that.form = {
          id: '',
          name: '',
          typ: 0,
          addOrEdit: 0 // 添加
        };
        if(id==1){
          that.form.typ = 1;
        }
        else if(id==2){
          that.form.typ = 2;
        }
        that.formDialogVisible = true;

      },
      // 编辑
      doEdit (id) {
        let that = this;
        systemService.getOneClassify(id).then(function (res) {
          //console.log('edit',res);
          if(res.data.success){
            let obj = res.data.datas;
            that.form = {
              id: obj.id,
              name: obj.name,
              typ: obj.type,
              addOrEdit: 1 //编辑
            }
            that.formDialogVisible = true;
          }else{}
        });
      },
      // 删除
      doDelete (id) {
        let that = this;
        that.dialog = {
          id: id,
          title: '删除提示',
          content: '确认删除该分类吗？删除后该分类将不会再显示，删除不可恢复？'
        };
        that.centerDialogVisible = true;
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let id = that.dialog.id;
        systemService.deleteClassify({id: id}).then(function (res) {
          console.log('删除', res);
          if(res.data.success){
            that.centerDialogVisible = false;
            that.getList();
          }else{}
        });
      },
      // 关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/common/opration-bar.less";
  .container{padding: 20px;
    .classify{width: 800px;min-height:150px;margin-bottom:40px;border:1px solid #ccc;
      .title{height: 40px;line-height: 40px;font-size:16px;color:#333;padding:0 20px;border-bottom:1px solid #ccc;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
      .content{min-height:110px;display:flex;align-items:center; justify-content: flex-start; flex-wrap: wrap;
        .item{min-width: 80px;height:30px;line-height:30px;margin:10px 0  10px 20px;color:#666;text-align:center;border:1px solid #eee;
          -webkit-border-radius:30px;
          -moz-border-radius:30px;
          border-radius: 30px;
          cursor:pointer;
          position: relative;
          .el-icon-plus{font-size:18px;line-height:30px;}
          .itemEdit{
             position:absolute;
             width:100%;height:100%;top:0;left:0;right:0;bottom:0;z-index:1;background:rgba(244,244,244,.9);
            -webkit-border-radius:30px;
            -moz-border-radius:30px;
            border-radius: 30px;
            display:none;align-items:center; justify-content: space-around;
            font-size: 16px;color:#409eff;
            .el-icon-edit{cursor: pointer;}
            .el-icon-delete{cursor: pointer;}
          }
        }
        .item:hover .itemEdit{display:flex;}
      }
    }
  }
</style>