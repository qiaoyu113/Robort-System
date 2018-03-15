<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新增代表用户</el-button>
      <el-input
              placeholder="搜索用户名称"
              v-model="query" size="mini" class="right middle" @keyup.enter.native="getList"><!--无效果，因为element会将转化为另外的结构，事件不会触发的input上-->
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
              label="配图">
        <template slot-scope="scope">
          <div class="img-cover">
            <img :src="scope.row.cover" class="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              prop="name"
              label="用户名称">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="添加时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="90">
        <template slot-scope="scope">
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination :options="page" v-on:currentChange="handleCurrentChange" v-on:sizeChange="handleSizeChange"></pagination>
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
  import pagination from '../../component/pagination/pagination.vue'
  import {contentService} from '../../service/contentService'
  import {common} from '../../assets/js/common/common'
  export default {
    props: [],
    data () {
      return {
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
        currentPage: 1, // 分页
        page: {
          size: 10,
          num: 1,
          totalCount: 0,
          totalPage: 0
        }, // 分页
        query: '',
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表,分类筛选
      getList () {
        let that = this;
        that.tableData = [];
        contentService.getHotUsers({pageNo: that.page.num, pageSize: that.page.size, name: that.query}).then(function (res) {
          //console.log('用户列表', res);
          if(res.data.success){
            let array = res.data.datas.datas;
            let record = res.data.datas;
            that.page.totalCount = parseInt(record.totalCount);
            that.page.totalPage = record.totalPage;
            for(let i=0;i<array.length;i++){
              let obj = {
                id: array[i].id,
                name: array[i].name,
                cover: that.$store.state.picHead + array[i].cover,
                createTime: common.getFormatOfDate(array[i].createTime*1, 'yyyy-MM-dd hh:mm')
              };
              that.tableData.push(obj);
            }
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
        this.$router.push({name: 'HotDocsAdd'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.hotDocsId = id;
        that.$router.push({name: 'HotDocsEdit'});
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.dialog = {
          title: '删除提示',
          content: '确定删除吗？',
          id: id,
          oprTyp: 1,
          index: index,
          rows: rows
        };
        that.centerDialogVisible = true;
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let id = that.dialog.id;
        let typ = that.dialog.oprTyp;
        let index = that.dialog.index;
        let rows = that.dialog.rows;
        contentService.deleteHotUser(id).then(function (res) {
          //console.log('删除', res);
          if(res.data.success){
            rows.splice(index, 1);
            that.getList(); // 数据刷新
          }
        });
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
  .container{padding: 20px;
    .opr{
      margin:40px auto 20px;overflow:hidden;
    .right{float:right;}
    .middle{width:250px;}
    }
    .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
      .image{max-width:100px;max-height:80px;width:auto;height:auto;}
    }
    .el-btn-no{margin-left:0!important;}
  }
</style>