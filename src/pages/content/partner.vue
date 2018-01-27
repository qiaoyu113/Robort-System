<template>
  <div class="container">
    <!--切换选项卡-->
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="白标合作伙伴" name="first"></el-tab-pane>
      <el-tab-pane label="全球合作伙伴" name="second"></el-tab-pane>
      <el-tab-pane label="国内战略合作伙伴" name="third"></el-tab-pane>
    </el-tabs>
    <!--按钮、搜索-->
    <p class="opration-bar">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建合作伙伴</el-button>
      <el-input
              placeholder="搜索名称"
              v-model="input23" size="mini" class="right normal">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            empty-text="暂无数据"
            style="width: 100%"><!--prop="name"style="width:40%"style="width:10%"style="width:10%"style="width:10%"              style="width:20%"-->
      <el-table-column
              fixed
              label="配图">
        <template slot-scope="scope">
          <div class="img-cover">
            <img :src="scope.row.src" class="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              label="伙伴名称">
        <template slot-scope="scope">
          <p class="txt">
            <router-link :to="scope.row.link"><span class="mark">置顶</span>{{ scope.row.name }}</router-link>
          </p>
        </template>
      </el-table-column>
      <el-table-column
              prop="date"
              label="添加时间">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="140">
        <template slot-scope="scope">
          <el-button @click="doTop($event)" type="text" size="small" v-if="isTop==1">取消置顶</el-button>
          <el-button @click="doTop($event)" type="text" size="small" v-if="isTop==0">置顶</el-button>
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
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
  import {conService} from '../../service/contentService'

  export default {
    props: [],
    data () {
      return {
        tabIndex: 'first',
        pType: 1, // 哪种合作伙伴类型1.白标；2.国际；3.国内；
        isTop: 0, // 是否显示置顶按钮
        dialog: {
          title: '',
          content: '',
          prodId: 0,
          oprTyp: 0 //操作类型：1.删除；2.上架；3.下架
        },
        page: {size: 10, num: 1},//分页数
        query: '',// 查询条件
        centerDialogVisible: false, // 弹框
        tableData: [] //列表数据
      }
    },
    components: {},
    mounted () {
      let that = this;
      localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiMeWFiOW8gOWni-W4puS9oOmjniIsInVzZXJJZCI6IjEiLCJwbGF0Zm9ybSI6IlBDSDUiLCJwZXJtaXNzaW9ucyI6WyJYVEdMOlFVRVJZIl0sImV4cCI6MTUxNzYzODM5MywibmJmIjoxNTE3MDMzNTkzfQ.g4jxqOPEm0MrH0q2ecyksVt-3lXJmvMBQVfZmwomd8c';
      that.getList();
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        conService.getPartners({pageNo: that.page.num, pageSize: that.page.size, name: that.query}).then(function(res){
          console.log('partners', res);
        });
//        that.tableData = [
//          {
//            id: 3,
//            name: '王小虎',
//            link: 'http://crm.shequnyi.cn/',
//            src: '/src/assets/image/demo/1.jpg',
//            date: '2016-05-03 11:11',
//            num: 10,
//            order: 11000,
//            state: '已下架'
//          }, {
//            id: 2,
//            name: '王小虎',
//            link: 'http://crm.shequnyi.cn/',
//            src: '/src/assets/image/demo/2.jpg',
//            date: '2016-05-02 14:00',
//            num: 200333,
//            order: 1542,
//            state: '未开始'
//          },
//          {
//            id: 4,
//            name: '王小虎',
//            link: 'http://crm.shequnyi.cn/',
//            src: '/src/assets/image/demo/3.jpg',
//            date: '2016-05-04 11:11',
//            num: 200333,
//            order: 1542,
//            state: '未开始'
//          },
//          {
//            id: 1,
//            name: '王小虎',
//            link: 'http://crm.shequnyi.cn/',
//            src: '/src/assets/image/demo/4.jpg',
//            date: '2016-05-01 14:00',
//            num: 200333,
//            order: 1542,
//            state: '进行中'
//          }];
      },
      //添加
      add () {
        let that = this;
        that.$route.params.partnerTyp = that.pType;
        that.$router.push({name: 'partnerAdd'});
      },
      // 详情
      toDetail (id) {
        let that = this;
        that.$route.params.prodId = id;
        that.$router.push({name: 'productDetail'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.prodId = id;
        that.$router.push({name: 'productEdit'});
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.dialog = {
          title: '删除提示',
          content: '删除后该产品包将在列表中移除，同时不会在前台展示，已购买的用户可以继续使用，确定将该产品包删除吗？'
        };
        that.centerDialogVisible = true;
        rows.splice(index, 1);
      },
      // 置顶
      doTop (event) {
        let obj = event.currentTarget; // 当前对象
        if(obj.innerHTML == '置顶'){
          obj.innerHTML = '取消置顶';
        }else{
          obj.innerHTML = '置顶';
        }
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
  @import "../../assets/css/common/opration-bar.less";
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .v-modal{z-index:2000!important;}
  .el-dialog{z-index:2018;}
  .container{padding: 20px;}
  .container .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .txt{word-wrap:break-word;}
  .container .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .txt .price{display:block;}
</style>