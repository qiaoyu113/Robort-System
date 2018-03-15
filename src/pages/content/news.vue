<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opration-bar">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新增</el-button>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            empty-text="暂无数据"
            style="width: 100%"><!--prop="name"style="width:40%"style="width:10%"style="width:10%"style="width:10%"              style="width:20%"-->
      <el-table-column
              label="配图">
        <template slot-scope="scope">
          <div class="img-cover">
            <img :src="scope.row.cover" class="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              label="标题">
        <template slot-scope="scope">
          <span class="top-mark" v-if="scope.row.sortNum > 0">置顶</span>
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop = 'className'
              label="所属分类">
      </el-table-column>
      <el-table-column
      prop="createTime"
      label="发布时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="140">
        <template slot-scope="scope">
          <el-button @click="toTop(scope.row.id)" type="text" size="small" v-if="scope.row.sortNum <= 0">置顶</el-button>
          <el-button @click="cancelTop(scope.row.id)" type="text" size="small" v-if="scope.row.sortNum > 0">取消置顶</el-button>
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination :options="page" v-on:currentChange="handleCurrentChange" v-on:sizeChange="handleSizeChange"></pagination>
    <!--弹框-->
    <el-dialog
            title="删除提示"
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
  import pagination from '../../component/pagination/pagination.vue'
  import VueCropper from 'vue-cropper'
  import {common} from '../../assets/js/common/common'
  import {contentService} from '../../service/contentService'

  export default {
    props: [],
    data () {
      return {
        couch: {
          rows: null,
          index: -1,
          id: ''
        },// 删除使用
        isTop: 1, // 是置顶按钮
        currentPage: 1, // 默认当前页为第一页
        page: {
          size: 10,
          num: 1,
          totalCount: 0,
          totalPage: 1,
        },//分页数
        query: '',// 查询条件
        centerDialogVisible: false, // 提示弹框
        tableData: [] //列表数据
      }
    },
    components: { 'vue-cropper': VueCropper,pagination},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        contentService.getNewses({pageNo: that.page.num, pageSize: that.page.size, name: that.query, type: 1}).then(function(res){
          //console.log('新闻列表', res);
          if(res.data.success) {
            let page = res.data.datas;
            let table = res.data.datas.datas;
            //console.log('page', page);
            //console.log('table', table);
            that.page.totalPage = page.totalPage;
            that.page.totalCount = parseInt(page.totalCount);
            for (let i = 0; i < table.length; i++) {
              table[i].cover = that.$store.state.picHead + table[i].cover;
              table[i].createTime = common.getFormatOfDate(table[i].createTime*1, 'yyyy-MM-dd hh:mm');
            }
            that.tableData = table;
          }
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
        let that = this;
        that.currentPage = val;
        that.page.num = val;
        that.getList();
      },
      //添加
      add () {
        let that = this;
        that.$router.push({name: 'newsAdd'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.newsId = id;
        that.$router.push({name: 'newsEdit'});
      },
      // 置顶
      toTop (id) {
        let that = this;
        contentService.stickNews({articleId: id}).then(function (res) {
          //console.log('置顶', res);
          if(res.data.success){

            that.getList();
          }
        });
      },
      // 取消置顶
      cancelTop(id){
        let that = this;
        contentService.disStickNews({articleId: id}).then(function (res) {
          //console.log('取消置顶', res);
          if(res.data.success){
            that.getList();
          }
        });
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.centerDialogVisible = true;
        that.couch = {
          rows: rows,
          index: index,
          id: id
        };
      },
      //弹出框按钮的操作
      // 确认删除
      handleOk () {
        //console.log('确认删除', done);
        let that = this;
        let rows = that.couch.rows;
        let index = that.couch.index;
        let id = that.couch.id;
        this.centerDialogVisible = false;
        contentService.deleteNews(id).then(function (res) {
          console.log('删除', res);
          if(res.data.success){
            rows.splice(index, 1);
            that.page.num = 1;
            that.getList();
          }
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
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-table__empty-block{height:400px!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .v-modal{display:none!important;}
  .el-dialog__wrapper{margin-top:0!important;background:rgba(0,0,0,.3)!important;display:flex;justify-content: center;align-items: center;}
  .container{padding: 20px;}
  .container .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .txt{word-wrap:break-word;}
  .top-mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .txt .price{display:block;}
</style>