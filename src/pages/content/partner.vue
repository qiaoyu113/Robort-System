<template>
  <div class="container">
    <!--切换选项卡-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="白标合作伙伴" name="1"></el-tab-pane>
      <el-tab-pane label="全球合作伙伴" name="2"></el-tab-pane>
    </el-tabs>
    <!--按钮、搜索-->
    <p class="opration-bar">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建合作伙伴</el-button>
      <el-input
              placeholder="搜索名称"
              v-model="query" size="mini" class="right normal">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
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
              label="伙伴名称">
        <template slot-scope="scope">
          <p class="txt"><span class="top-mark" v-if="scope.row.sortNum > 0">置顶</span>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="添加时间">
      </el-table-column>
      <el-table-column
              label="操作"
              width="150">
        <template slot-scope="scope">
          <el-button @click="doTop(1, scope.row.id)" type="text" size="small" v-if="scope.row.sortNum > 0">取消置顶</el-button>
          <el-button @click="doTop(2, scope.row.id)" type="text" size="small" v-if="scope.row.sortNum <= 0">置顶</el-button>
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination v-if="myPagination.totalCount > myPagination.size" :options="myPagination" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
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
  import pagination from '../../component/pagination/pagination.vue'
  import {common} from '../../assets/js/common/common'
  import {contentService} from '../../service/contentService'

  export default {
    props: [],
    data () {
      return {
        tabIndex: '1',
        pType: 1, // 哪种合作伙伴类型1.白标；2.国际；3.国内；
        isTop: 0, // 是否显示置顶按钮
        dialog: {
          id: ''
        },
        myPagination: {
          size: 1,
          num: 1,
          totalCount: 0,
          totalPage: 1
        },
        query: '',// 查询条件
        centerDialogVisible: false, // 弹框
        tableData: [] //列表数据
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      //获得列表partnerTyp
      getList () {
        let that = this;
        let typ = parseInt(that.tabIndex);
        //console.log('tabIndex', typ);
        that.tableData = [];
        contentService.getPartners({pageNo: that.myPagination.num, pageSize: that.myPagination.size, name: that.query, type: typ}).then(function(res){
          //console.log('partners', res);
          if(res.data.success){
            let table = res.data.datas;
            that.myPagination.totalCount = parseInt(table.totalCount);
            that.myPagination.totalPage = table.totalPage;
            let array = res.data.datas.datas;
            for(let i=0;i<array.length;i++){
              array[i].cover = that.$store.state.picHead + array[i].cover;
              array[i].createTime = common.getFormatOfDate(array[i].createTime*1, 'yyyy-MM-dd hh:mm');
              that.tableData.push(array[i]);
            }
          }else{}
        });
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
      //添加
      add () {
        let that = this;
        that.$route.params.partnerTyp = that.tabIndex;
        that.$router.push({name: 'partnerAdd'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.partnerTyp = that.tabIndex;
        that.$route.params.partnerId = id;
        that.$router.push({name: 'partnerEdit'});
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        let sid = id;
        that.dialog = {
          id: sid,
          rows: rows,
          index: index,
        };
        that.centerDialogVisible = true;
      },
      // 置顶
      doTop (typ, id) {
        let that = this;
        if(typ == 1){
          contentService.disStickPartner({partnerId: id}).then(function (res) {
            //console.log('取消置顶', res);
            if(res.data.success){
              that.getList();
            }else{}
          });
        }
        else if(typ == 2){
          contentService.stickPartner({partnerId: id}).then(function (res) {
            //console.log('置顶', res);
            if(res.data.success){
              that.getList();
            }else{}
          });
        }
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let id = that.dialog.id;
        let rows = that.dialog.rows;
        let index = that.dialog.index;
        contentService.deletePartner(id).then(function (res) {
          //console.log('删除', res);
          if(res.data.success){
            that.centerDialogVisible = false;
            rows.splice(index, 1);
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
    },
    watch: {
      tabIndex (cur, old){
        let that = this;
        let tab = parseInt(cur);
        if(tab==1){
          that.getList();
        }if(tab==2){
          that.getList();
        }
        return cur;
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/common/opration-bar.less";
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .el-table__empty-block{height: 300px;}
  .container{padding: 20px;}
  .container .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .txt{word-wrap:break-word;}
  .container .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .txt .price{display:block;}
  .top-mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
</style>