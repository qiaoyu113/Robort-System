<template>
  <div class="container">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'productPackage' }">产品包</el-breadcrumb-item>
      <el-breadcrumb-item>产品包详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--详情-->
    <div class="detailRow">
        <div class="cell">
            <div class="picTxt">
                <div class="img-cover">
                    <img :src="detailObj.cover" class="image">
                </div>
                <div class="txt">{{detailObj.name}}</div>
            </div>
        </div>
        <div class="cell">
            <div class="txt">合同数：{{detailObj.templateNum}}</div>
        </div>
        <div class="cell">
            <span v-if="detailObj.close==false">已上架</span>
            <span v-if="detailObj.close==true">已下架</span>
        </div>
        <div class="cell">
            <div class="txt">￥{{detailObj.price_s}}</div>
        </div>
        <div class="cell">
            <el-button @click.native.prevent="doDelete" type="text" size="small">删除</el-button>
            <el-button @click="onOff(1)" type="text" size="small" v-if="detailObj.close==true">上架</el-button>
            <el-button @click="onOff(2)" type="text" size="small" v-if="detailObj.close==false">下架</el-button>
        </div>
    </div>
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">添加合同模板</el-button>
      <el-input
              placeholder="搜索名称"
              v-model="query" size="mini" class="right">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getList"></i>
      </el-input>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            empty-text="暂无数据"
            style="width: 100%" class="dataTable">
      <el-table-column
              prop = 'name'
              label="合同模板名称">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="添加时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="60">
        <template slot-scope="scope">
          <el-button @click="moveHandle(1,scope.row.id)" type="text" size="small">上移</el-button>
          <el-button @click="moveHandle(2,scope.row.id)" type="text" size="small">下移</el-button>
          <el-button @click="moveHandle(3,scope.row.id)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination v-if="myPagination.totalCount > myPagination.size" :options="myPagination" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
    <!--提示弹框-->
    <el-dialog
            :title="dialog.title"
            modal="false"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
      <span>{{ dialog.content }}</span>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="handleOk">确 定</el-button>
          </span>
    </el-dialog>
      <!--内容弹框-->
      <el-dialog title="选择合同模板" :visible.sync="dialogFormVisible">
          <el-form :model="form">
              <el-form-item label="" :label-width="formLabelWidth">
                  <el-input
                          placeholder="请输入名称"
                          v-model="form.cQuery">
                      <el-button slot="append" icon="el-icon-search" @click="getTemplateOptions"></el-button>
                  </el-input>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                  <el-checkbox-group v-model="ckChecked" class="ckGroup">
                      <el-checkbox v-for="item in ckData" :label="item.id" :key="item"  class="ckItem">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addTemplatesOk">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {common} from '../../../assets/js/common/common'
  import pagination from '../../../component/pagination/pagination.vue'
  import {contractService} from '../../../service/contractService'
  export default {
    props: [],
    data () {
      return {
        detailObj:'',//详情对象
        dialog: { // 提示弹出设置
          title: '',
          content: '',
          oprTyp: 0 //操作类型：1.删除；2.上架；3.下架
        },
        centerDialogVisible: false, //提示弹框
        dialogFormVisible: false, // 内容弹层
        myPagination: {
          size: 1,
          num: 10,
          totalCount: 0,
          totalPage: 1
        },// 分页
        query: '', // 表格查询条件
        ckData: [], // 复选框
        ckChecked: [],
        form: {
            cQuery: '', // 弹窗查询条件
            checkedTemp: ''
        },
        tableData: [] //模板列表数据
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      that.getInfo();
      that.getList();
      that.getTemplateOptions();
    },
    methods: {
     // 获取一个产品包详情
     getInfo () {
            let that = this;
            let id = that.$route.params.prodId;
            contractService.getProductPackage(id).then(function (res) {
                //console.log('产品包详情', res);
                if(res.data.success){
                    let dat = res.data.datas;
                    dat.cover = that.$store.state.picHead + dat.cover;
                    that.detailObj = dat;
                }else{}
            });
     },
    // 添加一个产品包和合同模板的关联
    add () {
        let that = this;
        that.dialogFormVisible = true;
    },
    addTemplatesOk () { // 为一个产品包添加模板
        let that = this;
        let strfy = that.ckChecked.join(',');
        let id = that.$route.params.prodId;
        contractService.contractPackageAndTemplate({productPkgId: id, templateIds: strfy}).then(function (res) {
            //console.log('为一个产品包添加模板',res);
            if(res.data.success){
                that.dialogFormVisible = false;
                that.getList();
            }else{}
        });
    },
      //获得列表//
      getList () {
        let that = this;
        that.tableData = [];
        let id = that.$route.params.prodId;
        contractService.getTemplates({pageNo: that.myPagination.num, pageSize: that.myPagination.size, name: that.query, productPkgId: id}).then(function (res) {
          console.log('产品包下的合同列表', res);
          if(res.data.success){
            let table = res.data.datas;
            that.myPagination.totalCount = parseInt(table.totalCount);
            that.myPagination.totalPage = table.totalPage;
            let newArr = res.data.datas.datas;
            for(let i=0;i<newArr.length;i++){
              newArr[i].cover = that.$store.state.picHead + newArr[i].cover;
              newArr[i].createTime = common.getFormatOfDate(newArr[i].createTime*1, 'yyyy-MM-dd hh:mm');
              that.tableData.push(newArr[i]);
            }
          }else{}
        });
      },
      // 获取合同模板名称
      getTemplateOptions () {
          let that = this;
          contractService.getTemplateAll({name: that.form.cQuery}).then(function (res) {
              //console.log('合同模板下拉',res);
              if(res.data.success){
                  let array = res.data.datas;
                  that.ckData = array;
              }else{}
          })
      },
      // 产品包的模板，上下移动，移除上移，下移，移除
        moveHandle (typ, id) {
            let that = this;
            let pId = that.$route.params.prodId;
            //console.log(pId, 'pid', id, 'id');
            if(typ==1){ // 上移
                contractService.moveUpAndDown({productPkgId: pId, templateId: id, up: true}).then(function (res) {
                    //console.log(res, '上移');
                    if(res.data.success){
                        that.getList();
                    }else{}
                });
            }
            else if(typ==2){ // 下移
                contractService.moveUpAndDown({productPkgId: pId, templateId: id, up: false}).then(function (res) {
                    //console.log(res, '下移');
                    if(res.data.success){
                        that.getList();
                    }else{}
                });
            }
            else if(typ==3){ // 移除
                contractService.removePkgTemplate({productPkgId: pId, templateId: id}).then(function (res) {
                    //console.log(res, '移除');
                    if(res.data.success){
                        that.getList();
                    }else{}
                });
            }
        },
      //----------------------------------------
      // 删除
      doDelete () {
        let that = this;
        that.dialog = {
          title: '删除提示',
          content: '删除后该产品包将在列表中移除，同时不会在前台展示，已购买的用户可以继续使用，确定将该产品包删除吗？',
          oprTyp: 1
        };
        that.centerDialogVisible = true;
      },
      //上架，下架
      onOff (typ) {
        let that = this;
        if(typ == 1){
          that.dialog = {
            oprTyp: 2,
            title: '上架提示',
            content: '确定上架吗？'
          };
          console.log(that.dialog);
          that.centerDialogVisible = true;
        }
        else if(typ == 2){
          that.dialog = {
            oprTyp: 3,
            title: '下架提示',
            content: '下架后该产品包将不会在前台展示，已购买的用户可以继续使用，确定下架吗？'
          };
          that.centerDialogVisible = true;
        }
      },
      // 分页
      sizeChange (val) {
        let that = this;
        that.myPagination.size = val;
        that.getList();
      },
      currentChange (val) {
        // 当前页，就是当前点击的那一页
        let that = this;
        that.myPagination.num = val;
        that.getList();
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let typ = that.dialog.oprTyp;
        let id = that.$route.params.prodId;;
        if(typ == 1){
          contractService.deleteProductPackage(id).then(function (res) {
            //console.log('删除', res);
            if(res.data.success){
              that.centerDialogVisible = false;
              that.$router.push({name: 'productPackage'});
            }
          });
        }
        else if(typ == 2){
          contractService.isOnline(id, {close: false}).then(function (res) {
            //console.log('上架', res);
            if(res.data.success){
              that.centerDialogVisible = false;
              that.getInfo();
            }else{}
          });
        }
        else if(typ == 3){
          contractService.isOnline(id, {close: true}).then(function (res) {
            //console.log('下架', res);
            if(res.data.success){
              that.centerDialogVisible = false;
              that.getInfo();
            }else{}
          });
        }

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
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .el-breadcrumb{margin-bottom: 20px;}
  .el-table__empty-block{height:300px;}
  .container{padding: 20px;}
  .container .opr{margin:40px auto 20px;overflow:hidden;}
  .container .opr .left{}
  .container .opr .right{width:250px;float:right;}
  .container .picTxt{display:flex;justify-content:center;align-items:center;}
  .container .picTxt .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .picTxt .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .picTxt .txt{word-wrap:break-word;}
  .container .picTxt .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .picTxt .txt .price{display:block;}
  .detailRow{
      display:flex;justify-content:space-between; align-items: center;
      .cell{

      }
  }
  .dataTable{
      .el-button{margin-left:10px;}
  }
  .ckGroup{width:100%;height:150px;overflow-y:auto;
      .ckItem{width:100%;margin-bottom:10px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
      .el-checkbox{margin-left: 0;}
  }
</style>