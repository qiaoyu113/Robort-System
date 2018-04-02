<template>
  <div class="container">
    <!--tab切换-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="自建渠道" name="1"></el-tab-pane>
      <el-tab-pane label="用户渠道" name="2"></el-tab-pane>
    </el-tabs>
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" size="mini" class="left" @click="add">设置规则</el-button>
      <el-input
              placeholder="搜索用户手机号"
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
              prop="name"
              label="用户姓名">
      </el-table-column>
      <el-table-column
              prop="phone"
              label="手机号">
      </el-table-column>
      <el-table-column
              prop="numItem.inviteNum"
              width="130"
              label="邀请用户数">
      </el-table-column>
      <el-table-column
              prop="numItem.inviteBuyNum"
              width="140"
              label="成功订阅用户数">
      </el-table-column>
      <el-table-column
              label="获得佣金总额">
        <template slot-scope="scope">
          <span>{{scope.row.numItem.commission | moneyFormate}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="生成时间">
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination :options="page" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
    <!--弹框-->
    <el-dialog
            title="设置规则"
            modal="false"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="可获佣金"  prop="money">
          <el-input v-model="ruleForm.money" class="digIptLen"></el-input><span class="yuan">元</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '../../component/pagination/pagination.vue'
  import {common} from '../../assets/js/common/common'
  import {channelService} from '../../service/channelService'
  export default {
    props: [],
    data () {
      return {
        tabIndex: '2', // tab切换
        centerDialogVisible: false, // 弹框
        query: '', // 查询条件
        tableData: [], //列表数据
        page: {
          size: 10,
          num: 1,
          totalCount: 0,
          totalPage: 1
        }, // 分页
        ruleForm: {
          id: '',
          money: 500,
        },
        rules: {
          money: [
            { required: true, message: '请填写佣金', trigger: 'blur' }
          ]
        }, // 验证
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      that.getList(); // 获取列表
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        that.tableData = []
        channelService.getUserChannels({pageNo: that.page.num, pageSize: that.page.size, searchKey: that.query}).then(function (res) {
          //console.log('用户渠道', res);
          if(res.data.success){
            let table = res.data.datas;
            that.page.totalCount = table.totalCount==null? 0 : parseInt(table.totalCount);
            that.page.totalPage = table.totalPage;
            let newArr = res.data.datas.datas;
            for(let i=0;i<newArr.length;i++){
              newArr[i].createTime = common.getFormatOfDate(newArr[i].createTime*1, 'yyyy-MM-dd hh:mm');
              that.tableData.push(newArr[i]);
            }
          }else{}
        });
      },
      // 获得奖励规则
      getRewords () {
        let that = this;
        channelService.getRewards().then(function (res) {
          //console.log('奖励',res);
          if(res.data.success){
            let obj = res.data.datas;
            that.ruleForm = {
              id: obj.id,
              money: obj.money_s
            };
          }else{}
        });
      },
      //添加分销内容
      add () {
        let that = this;
        that.getRewords();
        that.centerDialogVisible = true;
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            channelService.modifyRewards({id: that.ruleForm.id,money_s: that.ruleForm.money}).then(function (res) {
              //console.log(res, '添加一个规则');
              if(res.data.success){
                that.centerDialogVisible = false;
                that.getList();
              }else{}
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
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
      }
    },
    watch: {
      tabIndex (cur, old) {
        let that = this;
        if(cur == '1'){that.$router.push({name: 'channelSelf'});}
        if(cur == '2'){that.$router.push({name: 'channelUser'});}
      }
    }
  }
</script>
<style lang="less" scope>
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .el-table__empty-block{height:300px;}
  .digIptLen{width:120px;}
  .yuan{margin-left: 15px;}
  .container{padding: 20px;}
  .container .opr{margin:40px auto 20px;overflow:hidden;}
  .container .opr .left{}
  .container .opr .right{width:250px;float:right;}
</style>