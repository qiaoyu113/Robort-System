<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建产品包</el-button>
      <el-input
              placeholder="搜索产品包名称"
              v-model="query" size="mini" class="right" @keyup.enter.native="getList">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getList"></i>
      </el-input>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            empty-text="暂无数据"
            style="width: 100%">
      <el-table-column
              width="250"
              label="产品包名称">
        <template slot-scope="scope">
          <div class="picTxt">
            <div class="img-cover">
              <img :src="scope.row.cover" class="image">
            </div>
            <div class="txt">
              <p @click="toDetail(scope.row.id)" class="titleUnderLine"><span class="mark" v-if="scope.row.sortNum > 0">置顶</span>{{ scope.row.name }}</p>
              <span class="price">￥{{scope.row.price_s}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              prop="templateNum"
              width="130"
              label="合同数">
      </el-table-column>
      <el-table-column
              prop="close"
              label="产品包状态"
              width="130"
              :filters="[{text: '已上架', value: false}, {text: '已下架', value: true}]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
        <template slot-scope="scope">
          <span v-if="scope.row.close==false">已上架</span>
          <span v-if="scope.row.close==true">已下架</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="subscribeNum"
              width="130"
              label="订阅量">
      </el-table-column>
      <el-table-column
              width="130"
              label="浏览数">
          <template slot-scope="scope">
            <p @click="toScanDetail(scope.row.id)" class="titleUnderLine" v-if="scope.row.watchNum>0">{{ scope.row.watchNum }}</p>
            <p v-else>{{ scope.row.watchNum }}</p>
            <!--<p @click="toScanDetail(scope.row.id)" class="titleUnderLine">{{ scope.row.watchNum }}</p>-->
          </template>
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="创建时间">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="140">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row.id)" type="text" size="small">详情</el-button>
          <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
          <el-button @click="doTop(1,scope.row.id)" type="text" size="small" v-if="scope.row.sortNum > 0">取消置顶</el-button>
          <el-button @click="doTop(2,scope.row.id)" type="text" size="small" v-if="scope.row.sortNum <= 0">置顶</el-button>
          <el-button @click="onOff(1,scope.row.id)" type="text" size="small" v-if="scope.row.close==true">上架</el-button>
          <el-button @click="onOff(2,scope.row.id)" type="text" size="small" v-if="scope.row.close==false">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination :options="page" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
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
  import {common} from '../../assets/js/common/common'
  import {contractService} from '../../service/contractService'
  export default {
    props: [],
    data () {
      return {
        isTop: 0, // 是否显示置顶按钮
        isOnline: 0, // 是否显示上架按钮
        dialog: {
          title: '',
          content: '',
          rows: '',
          index: '',
          id: '',
          oprTyp: 0 //操作类型：1.删除；2.上架；3.下架
        },
        centerDialogVisible: false, // 弹框
        currentPage: 1,
        page: {
          size: 10,
          num: 1,
          totalCount: 0,
          totalPage: 1
        },
        query: '',
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
         that.tableData = []
         contractService.getProductPackages({pageNo: that.page.num, pageSize: that.page.size, name: that.query}).then(function (res) {
           //console.log('产品包列表', res);
           if(res.data.success){
             let table = res.data.datas;
             that.page.totalCount = parseInt(table.totalCount);
             that.page.totalPage = table.totalPage;
             let newArr = res.data.datas.datas;
             for(let i=0;i<newArr.length;i++){
               newArr[i].cover = that.$store.state.picHead + newArr[i].cover;
               newArr[i].createTime = common.getFormatOfDate(newArr[i].createTime*1, 'yyyy-MM-dd hh:mm');
               that.tableData.push(newArr[i]);
             }
           }else{}
         });
      },
      //添加产品包
      add () {
        this.$router.push({name: 'productAdd'});
      },
      // 详情
      toDetail (id) {
        let that = this;
        that.$route.params.prodId = id;
        that.$router.push({name: 'productDetail'});
      },
      toScanDetail (id) {
          let that = this;
          that.$route.params.prodId = id;
          that.$router.push({name: 'productScan'});
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
          content: '删除后该产品包将在列表中移除，同时不会在前台展示，已购买的用户可以继续使用，确定将该产品包删除吗？',
          rows: rows,
          index: index,
          id: id,
          oprTyp: 1
        };
        that.centerDialogVisible = true;
      },
      // 置顶，取消置顶
      doTop (typ, id) {
        let that = this;
        if(typ==1){ // 取消置顶
          contractService.isCancelStick({productPkgId: id}).then(function (res) {
            //console.log(res, '取消置顶');
            if(res.data.success){
              that.getList();
            }else{}
          });
        }
        else if(typ==2){ // 置顶
          contractService.isStick({productPkgId: id}).then(function (res) {
            //console.log(res, '置顶');
            if(res.data.success){
              that.getList();
            }else{}
          });
        }
      },
      //上架，下架
      onOff (typ, id) {
        let that = this;
        if(typ == 1){
          that.dialog = {
            oprTyp: 2,
            id: id,
            title: '上架提示',
            content: '确定上架吗？'
          };
          that.centerDialogVisible = true;
        }
        else if(typ == 2){
          that.dialog = {
            oprTyp: 3,
            id: id,
            title: '下架提示',
            content: '下架后该产品包将不会在前台展示，已购买的用户可以继续使用，确定下架吗？'
          };
          that.centerDialogVisible = true;
        }
      },
      // 分页
      sizeChange (val) {
        let that = this;
        that.page.size = val;
        that.getList();
      },
      currentChange (val) {
        // 当前页，就是当前点击的那一页
        let that = this;
        that.page.num = val;
        that.getList();
      },
      filterTag(value, row) {
         //console.log('Handler value', value, 'row', row);
         return row.close === value;
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let typ = that.dialog.oprTyp;
        let id = that.dialog.id;
        if(typ == 1){
          let rows = that.dialog.rows;
          let index = that.dialog.index;
          contractService.deleteProductPackage(id).then(function (res) {
            console.log('删除', res);
            if(res.data.success){
              that.centerDialogVisible = false;
              rows.splice(index, 1);
              that.page.num = 1;
              that.getList();
            }
          });
        }
        else if(typ == 2){
          contractService.isOnline(id, {close: false}).then(function (res) {
            //console.log('上架', res);
            if(res.data.success){
              that.centerDialogVisible = false;
              that.getList();
            }else{}
          });
        }
        else if(typ == 3){
          contractService.isOnline(id, {close: true}).then(function (res) {
            //console.log('下架', res);
            if(res.data.success){
              that.centerDialogVisible = false;
              that.getList();
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
  .el-table__empty-block{height:300px;}
  .container{padding: 20px;}
  .container .opr{margin:40px auto 20px;overflow:hidden;}
  .container .opr .left{}
  .container .opr .right{width:250px;float:right;}
  .container .picTxt{display:flex;justify-content:flex-start;align-items:center;}
  .container .picTxt .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .picTxt .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .picTxt .txt{word-wrap:break-word;}
  .container .picTxt .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .picTxt .txt .price{display:block;}
  .titleUnderLine:hover{color:#66b1ff;text-decoration: underline;cursor:pointer;}
</style>