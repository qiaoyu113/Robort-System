<template>
  <div class="container">
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建产品包</el-button>
      <el-input
              placeholder="搜索产品包名称"
              v-model="input23" size="mini" class="right">
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
              label="产品包名称">
        <template slot-scope="scope">
          <div class="picTxt">
            <div class="img-cover">
              <img :src="scope.row.info.src" class="image">
            </div>
            <p class="txt">
              <router-link :to="scope.row.info.link"><span class="mark">置顶</span>{{ scope.row.info.name }}</router-link>
              <span class="price">￥{{scope.row.info.price}}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              prop="num"
              label="合同数">
      </el-table-column>
      <el-table-column
              prop="state"
              label="产品包状态">
      </el-table-column>
      <el-table-column
              prop="order"
              label="订阅量">
      </el-table-column>
      <el-table-column
              prop="date"
              label="创建时间">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="140">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="del">删除</el-button>
          <el-button type="text" size="small">取消置顶</el-button>
          <el-button type="text" size="small">上架</el-button>
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
            title="提示"
            modal="false"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
          <span>需要注意的是内容是默认不居中的</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {
        centerDialogVisible: false, // 弹框
        tableData: [{
          info: {
            //name: '王小虎京东方快速搭建焚枯食淡过凉开水大驾光临对上了可见芬达上看了',
            name: '王小虎',
            price: '1.00',
            link: 'http://crm.shequnyi.cn/',
            src: '/src/assets/image/demo/1.jpg'
          },
          date: '2016-05-03 11:11',
          num: 10,
          order: 11000,
          state: '已下架'
        }, {
          info: {
            name: '王小虎',
            price: '1.00',
            link: 'http://crm.shequnyi.cn/',
            src: '/src/assets/image/demo/2.jpg'
          },
          date: '2016-05-02 14:00',
          num: 200333,
          order: 1542,
          state: '未开始'

        }, {
          info: {
            name: '王小虎',
            price: '1.00',
            link: 'http://crm.shequnyi.cn/',
            src: '/src/assets/image/demo/3.jpg'
          },
          date: '2016-05-04 11:11',
          num: 200333,
          order: 1542,
          state: '未开始'
        }, {
          info: {
            name: '王小虎',
            price: '1.00',
            link: 'http://crm.shequnyi.cn/',
            src: '/src/assets/image/demo/4.jpg'
          },
          date: '2016-05-01 14:00',
          num: 200333,
          order: 1542,
          state: '进行中'
        }]
      }
    },
    components: {},
    mounted () {},
    methods: {
      add () {
        this.$router.push({name: 'productAdd'});
      },
      del () {
        let that = this;
        that.centerDialogVisible = true;
      },
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
  /*.container{*/
    /*padding: 20px;*/
    /*.opr{*/
      /*margin:*/
      /*overflow:hidden;*/
    /*.left{}*/
    /*.right{}*/
    /*}*/
  /*}*/

</style>