<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建合同模板</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" class="right" @click="" plain>同步最新模板</el-button>
      <el-input
              placeholder="搜索合同模板标题"
              v-model="input23" size="mini" class="right middle">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
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
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column
              prop="title"
              label="合同模板名称">
      </el-table-column>
      <el-table-column
              prop="typ"
              label="分类">
      </el-table-column>
      <el-table-column
              prop="package"
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
          <el-button @click="onOff($event)" type="text" size="small" v-if="isOnline==0" class="el-btn-no">上架</el-button>
          <el-button @click="onOff($event)" type="text" size="small" v-if="isOnline==1" class="el-btn-no">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
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
            <el-button size="mini" type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {
        isTop: 0, // 是否显示置顶按钮
        isOnline: 0, // 是否显示上架按钮
        dialog: {
          title: '',
          content: '',
          prodId: 0,
          oprTyp: 0 //操作类型：1.删除；2.上架；3.下架
        },
        centerDialogVisible: false, // 弹框
        tableData: [], //列表数据
        multipleSelection: [], //列表数据
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表,分类筛选
      getList () {
        let that = this;
        that.tableData = [
          {
            id: 1,
            title: '王小虎',
            typ: '金融',
            package: '合同模板所在产品包的名称',
            date: '2016-05-01 14:00'
          }, {
            id: 2,
            title: '王小虎',
            typ: '商务交易',
            package: '合同模板所在产品包的名称',
            date: '2016-05-02 14:00'
          },
          {
            id: 3,
            title: '王小虎',
            typ: '娱乐',
            package: '合同模板所在产品包的名称',
            date: '2016-05-03 14:00'
          },
          {
            id: 4,
            title: '王小虎',
            typ: '商务交易',
            package: '合同模板所在产品包的名称',
            date: '2016-05-04 14:00'
          }];
      },
      //添加产品包
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
          content: '删除合同模板后，同时也会从产品包中删除，确定删除吗？'
        };
        that.centerDialogVisible = true;
        rows.splice(index, 1);
      },
      //上架
      onOff (event) {
        let that = this;
        let obj = event.currentTarget; // 当前对象
        console.log(obj.innerHTML)
        if(obj.innerHTML == '上架'){
          that.dialog = {
            title: '上架提示',
            content: '确定上架吗？'
          };
          that.centerDialogVisible = true;
          obj.innerHTML = '下架';
        }else{
          that.dialog = {
            title: '下架提示',
            content: '下架后该产品包将不会在前台展示，已购买的用户可以继续使用，确定下架吗？'
          };
          that.centerDialogVisible = true;
          obj.innerHTML = '上架';
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //弹出框按钮的操作
      // 确认
      handleOk (done) {

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
  .v-modal{z-index:2000!important;}
  .el-dialog{z-index:2018;}
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