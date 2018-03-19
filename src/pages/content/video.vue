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
            style="width: 100%">
      <el-table-column
              fixed
              label="配图">
        <template slot-scope="scope">
          <div class="img-cover">
            <img :src="scope.row.cover" class="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              label="视频名称">
        <template slot-scope="scope">
          <span class="top-mark" v-if="scope.row.sortNum > 0">置顶</span>
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop = 'createTime'
              label="添加时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="150">
        <template slot-scope="scope">
          <el-button @click="toTop(scope.row.id)" v-if="scope.row.sortNum <= 0" type="text" size="small">置顶</el-button>
          <el-button @click="toDown(scope.row.id)" v-if="scope.row.sortNum > 0" type="text" size="small">取消置顶</el-button>
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
        currentPage: 1, // 默认当前页为第一页
        page: {
          size: 10,
          num: 1,
          totalCount: 0,
          totalPage: 1,
        },//分页数
        query: '',// 查询条件
        centerDialogVisible: false, // 提示弹框
        dialogFormVisible: false, // 表单弹窗
        dialogCropperVisible: false, // 截图弹框
        tableData: [] //列表数据
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        contentService.getVideoDemos({pageNo: that.page.num, pageSize: that.page.size, name: that.query}).then(function(res){
          //console.log('演示视频列表', res);
          if(res.data.success) {
            let page = res.data.datas;
            let table = res.data.datas.datas;
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
      //添加
      add () {
        let that = this;
        that.$router.push({name: 'videoDemoAdd'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.videoId = id;
        that.$router.push({name: 'videoDemoEdit'});
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
      // 置顶
      toTop (id) {
          let that = this;
          contentService.stickVideoDemo({demoVideoId: id}).then(function (res) {
              //console.log('置顶操作', res);
              if(res.data.success){
                  that.getList();
              }
          });
      },
      // 取消置顶
      toDown (id) {
          let that = this;
          contentService.disStickVideoDemo({demoVideoId: id}).then(function (res) {
              //console.log('置顶操作', res);
              if(res.data.success){
                  that.getList();
              }
          });
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
        contentService.deleteVideoDemo(id).then(function (res) {
          //console.log('删除', res);
          if(res.data.success){
            rows.splice(index, 1);
            that.page.num = 1;
            that.currentPage = 1;
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
  .el-dialog{z-index:2018;}
  .vue-cropper{height:500px!important;}
  .upload-img{width:300px;height:188px;position:relative;
  .image{width:300px;height:150px;}
  .btn{width:300px;height:150px;position:absolute;top:40px;right:0;bottom:0;left: 0;display:flex;justify-content: center;align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border:1px solid #dcdfe6;
  .file{width:300px;height:150px;position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;cursor: pointer;opacity:0;}
  }
  .del{font-size: 20px;position:absolute;top: 30px;right: -8px;z-index:1;/*color:#ddd;*/cursor:pointer;}
  }
  .container{padding: 20px;}
  .container .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .txt{word-wrap:break-word;}
  .container .txt .mark,.top-mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .txt .price{display:block;}
</style>