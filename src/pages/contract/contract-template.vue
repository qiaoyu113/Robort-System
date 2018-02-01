<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建合同模板</el-button>
      <!--<el-button type="primary" icon="el-icon-refresh" size="mini" class="right" @click="" plain>同步最新模板</el-button>-->
      <el-input
              placeholder="搜索合同模板标题"
              v-model="query" size="mini" class="right middle" @enter.keyup="getList"><!--无效果，因为element会将转化为另外的结构，事件不会触发的input上-->
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getList"></i>
      </el-input>
    </p>
    <!--表格-->
    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            empty-text="暂无数据"
            @selection-change="handleSelectionChange"
            style="width: 100%">
      <!--<el-table-column type="selection" width="30"></el-table-column>-->
      <el-table-column
              prop="title"
              label="合同模板名称">
      </el-table-column>
      <el-table-column
              prop="typ"
              label="分类">
          <el-select placeholder="请选择">
              <el-option label="dddd" value="dddddd"></el-option>
          </el-select>
      </el-table-column>
      <el-table-column
              prop="packages"
              label="所在产品包">
      </el-table-column>
      <el-table-column
              prop="date"
              label="创建时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="90">
        <template slot-scope="scope">
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
          <el-button @click="online(scope.row.id)" type="text" size="small" v-if="scope.row.close== true" class="el-btn-no">上架</el-button>
          <el-button @click="offline(scope.row.id)" type="text" size="small" v-if="scope.row.close== false" class="el-btn-no">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 2, 3, 4]"
              :page-size="page.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.totalCount" v-if="tableData.length>0">
      </el-pagination>
    <!--弹框-->
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
  </div>
</template>
<script type="text/ecmascript-6">
  import {contractService} from '../../service/contractService'
  import {common} from '../../assets/js/common/common'
  export default {
    props: [],
    data () {
      return {
        isTop: 0, // 是否显示置顶按钮
        dialog: {
          title: '',
          content: '',
          id: 0,
          oprTyp: 0, //操作类型：1.删除；2.上架；3.下架
          index: '', //删除所需要的
          rows: '' //删除所需要的
        },
        centerDialogVisible: false, // 弹框
        tableData: [], //列表数据
        multipleSelection: [], //列表数据
        cPackage: [], //产品包信息
        currentPage: 1, // 分页
        page: {
          size: 1,
          num: 1,
          totalCount: 0,
          totalPage: 0
        }, // 分页
        query: '',
        productPkgId: '',
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.getPackage();
      that.getList();
    },
    methods: {
      //获得列表,分类筛选
      getList () {
        let that = this;
        that.tableData = [];
        contractService.getTemplates({pageNo: that.page.num, pageSize: that.page.size, name: that.query, productPkgId: that.productPkgId}).then(function (res) {
           //console.log('模板列表', res);
          if(res.data.success){
            let array = res.data.datas.datas;
            let record = res.data.datas;
            that.page.totalCount = parseInt(record.totalCount);
            that.page.totalPage = record.totalPage;
            for(let i=0;i<array.length;i++){
              let obj = {
                id: array[i].id,
                title: array[i].name,
                typ: array[i].className,
                packages: '——',
                date: common.getFormatOfDate(array[i].createTime*1, 'yyyy-MM-dd hh:mm'),
                close: array[i].close //是否下架
              };
              for(let j=0;j<that.cPackage.length;j++){
                if(that.cPackage.id == array[i].productPkgId) {
                   obj.packages = that.cPackage.name;
                }
              }
              that.tableData.push(obj);
            }
          }else{}
        });
      },
      // 获得产品包名称
      getPackage () {
        let that = this;
        contractService.getPackage().then(function (res) {
          if(res.data.success){
            that.cPackage = res.data.datas;
          }else{}
        });
      },
      // 分页
      handleSizeChange (val) {
        //console.log(`每页 ${val} 条`);
        let that = this;
        that.page.size = val;
        that.getList();
      },
      handleCurrentChange (val) {
            // 当前页，就是当前点击的那一页
            //console.log(`当前页: ${val}`);
            let that = this;
            that.currentPage = val;
            that.page.num = val;
            that.getList();
      },
      //添加合同模板
      add () {
        this.$router.push({name: 'contractTemplateAdd'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.templateId = id;
        that.$router.push({name: 'contractTemplateEdit'});
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.dialog = {
          title: '删除提示',
          content: '删除合同模板后，同时也会从产品包中删除，确定删除吗？',
          id: id,
          oprTyp: 1,
          index: index,
          rows: rows
        };
        that.centerDialogVisible = true;
      },
      //上架
      online (id) {
          let that = this;
          that.dialog = {
              title: '上架提示',
              content: '确定上架吗？',
              id: id,
              oprTyp: 2
          };
          that.centerDialogVisible = true;
      },
      // 下架
      offline (id) {
        let that = this;
          that.dialog = {
            title: '下架提示',
            content: '下架后该产品包将不会在前台展示，已购买的用户可以继续使用，确定下架吗？',
            id: id,
            oprTyp: 3
          };
          that.centerDialogVisible = true;
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let id = that.dialog.id;
        let typ = that.dialog.oprTyp;
        if(typ === 1){ //删除
            let index = that.dialog.index;
            let rows = that.dialog.rows;
            contractService.deleteOneTemplate(id).then(function (res) {
                //console.log('删除', res);
                if(res.data.success){
                    rows.splice(index, 1);
                    that.getList(); // 数据刷新
                }
            });
        }else{
            let close = false;
            if(typ === 2){ // 上架
                close = false;
            }
            else if(typ === 3){ // 下架
                close = true;
            }
            //console.log('shang', close);
            contractService.isOnlineOfTemplate(id, {close: close}).then(function (res) {
                //console.log('上下架', res);
                if(res.data.success){
                    that.getList(); // 数据刷新
                }else{}
            });
        }
        that.centerDialogVisible = false;

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
  .v-modal{display:none!important;}
  .el-dialog__wrapper{margin-top:0!important;background:rgba(0,0,0,.3)!important;display:flex;justify-content: center;align-items: center;}
  .container{padding: 20px;
    .opr{
      margin:40px auto 20px;overflow:hidden;
      .right{float:right;}
      .middle{width:250px;}
    }
    .el-btn-no{margin-left:0!important;}
  }
  /*.container .opr{margin:40px auto 20px;overflow:hidden;}*/
  /*.container .opr .left{}*/
  /*.container .opr .right{width:250px;float:right;}*/
  /*.container .picTxt{display:flex;justify-content:center;align-items:center;}*/
  /*.container .picTxt .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}*/
  /*.container .picTxt .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}*/
  /*.container .picTxt .txt{word-wrap:break-word;}*/
  /*.container .picTxt .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}*/
  /*.container .picTxt .txt .price{display:block;}*/
</style>