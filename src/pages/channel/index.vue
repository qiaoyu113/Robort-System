<template>
  <div class="container">
    <!--tab切换-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="自建渠道" name="1"></el-tab-pane>
      <el-tab-pane label="用户渠道" name="2"></el-tab-pane>
    </el-tabs>
    <!--按钮、搜索-->
    <p class="opr">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新增分销内容</el-button>
      <el-input
              placeholder="搜索分销内容名称"
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
              prop="type"
              label="内容类型"
              width="130"
              :filters="filterList"
              :filter-method="filterTag"
              filter-placement="bottom-end">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='12'">产品包</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="typeName"
              label="内容名称">
      </el-table-column>
      <el-table-column
              prop="channelNum"
              width="80"
              label="渠道数">
      </el-table-column>
      <el-table-column
              prop="pv"
              width="80"
              label="浏览量">
      </el-table-column>
      <el-table-column
              prop="uv"
              width="80"
              label="访客数">
      </el-table-column>
      <el-table-column
              prop="orderNum"
              width="80"
              label="订单数">
      </el-table-column>
      <!--<el-table-column
              label="佣金总额">
        <template slot-scope="scope">
          <span>{{scope.row.totalAmount | moneyFormate}}</span>
        </template>
      </el-table-column>-->
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
          <el-button @click="exportData(scope.row.id)" type="text" size="small">下载</el-button>
          <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
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
      <span v-if="dialog.typeChose==2">{{ dialog.content }}</span>
      <div class=""  v-if="dialog.typeChose==1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="内容类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择" @change="selectChange">
              <el-option
                      v-for="item in filterList"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容名称" prop="title">
            <el-select
                    v-model="ruleForm.title"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="搜索标题，最多1个">
              <el-option
                      v-for="item in flowList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
            <el-button v-if="dialog.typeChose==1" size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            <el-button v-if="dialog.typeChose==2" size="mini" type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '../../component/pagination/pagination.vue'
  import {common} from '../../assets/js/common/common'
  import {channelService} from '../../service/channelService'
  import axios from 'axios'
  export default {
    props: [],
    data () {
      return {
        tabIndex: '1', // tab切换
        centerDialogVisible: false, // 弹框
        query: '', // 查询条件
        filterList: [], // 筛选条件
        tableData: [], //列表数据
        page: {
          size: 10,
          num: 1,
          totalCount: 0,
          totalPage: 1
        }, // 分页
        dialog: {
          title: '',
          content: '',
          rows: '',
          index: '',
          id: '',
          typeChose: 0 // 1:添加；2：删除
        },
        ruleForm: {
          type: '',
          title: ''
        }, // submit
        rules: {
          type: [
            { required: true, message: '请选择内容类型', trigger: 'blur' },
            { required: true, message: '请选择内容类型', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请选择内容名称', trigger: 'blur' },
            { required: true, message: '请选择内容名称', trigger: 'change' }
          ]
        }, // 验证
        flowList: [], // 联动数组
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      that.getList(); // 获取列表
      that.getContentType(); // 内容类型
    },
    methods: {
      //获得列表
      getList () {
        let that = this;
        that.tableData = []
        channelService.getDistributions({pageNo: that.page.num, pageSize: that.page.size, searchKey: that.query}).then(function (res) {
          //console.log('分销列表', res);
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
      // 获取一个内容类型
      getContentType () {
        let that = this;
        that.filterList = [
          {text: '产品包', value: '12'}
        ];
      },
      //添加分销内容
      add () {
        let that = this;
        that.dialog = {
          title: '新增分销内容',
          content: '',
          typeChose: 1
        };
        that.ruleForm = {
          type: '',
          title: ''
        };
        that.centerDialogVisible = true;
      },
      submitForm(formName) {
        let that = this;

        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            // 通过id获得name
            let typeName = '';
            let newArr = that.flowList;
            for(let i=0;i<newArr.length;i++){
              if(newArr[i].id == that.ruleForm.title){
                typeName = newArr[i].name;
              }
            }
              that.centerDialogVisible = false;
            //
            channelService.addDistribution({
              type: that.ruleForm.type,
              typeName: typeName,
              typeId: that.ruleForm.title}).then(function (res) {
              //console.log(res, '添加一个分销');
              if(res.data.success){
                  that.$notify({
                      title: '添加成功',
                      type: 'success'
                  })
                that.getList();
              }else{
                  that.$notify({
                      title: '添加失败',
                      type: 'info'
                  })}
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      // 联动数组
      selectChange (val) {
        // 根据这个值，更新联动列表
        let that = this;
        that.getFlowList(val); // 获得联动下拉列表
      },
      getFlowList (typ) {
        let that = this;
        that.flowList = [];
        channelService.getContentList({type: typ}).then(function (res) {
          if(res.data.success){
            let newArr = res.data.datas;
            that.flowList = newArr;
            //console.log('联动数组', res);
          }else{}
        });
      },
      // 详情
      toDetail (id) {
        let that = this;
        that.$route.params.channelId = id;
        that.$router.push({name: 'channelDetail'});
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.dialog = {
          title: '删除提示',
          content: '确定将该分销内容删除吗？',
          rows: rows,
          index: index,
          id: id,
          typeChose: 2
        };
        that.centerDialogVisible = true;
      },
      // 导出数据
      exportData (id) {
        let that = this;
        channelService.exportChannelInfo(axios.defaults.baseURL,{id: id});
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
        return row.type == value;
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let id = that.dialog.id;
        let rows = that.dialog.rows;
        let index = that.dialog.index;
        channelService.deleteDistribution({id: id}).then(function (res) {
          //console.log('删除', res);
          if(res.data.success){
            that.centerDialogVisible = false;
            rows.splice(index, 1);
            that.page.num = 1;
            that.getList();
          }
        });
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
  .container{padding: 20px;}
  .container .opr{margin:40px auto 20px;overflow:hidden;}
  .container .opr .left{}
  .container .opr .right{width:250px;float:right;}
  .container .picTxt{display:flex;justify-content:center;align-items:center;float: left}
  .container .picTxt .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .picTxt .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .picTxt .txt{word-wrap:break-word;}
  .container .picTxt .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .picTxt .txt .price{display:block;}
  .titleUnderLine:hover{color:#66b1ff;text-decoration: underline;cursor:pointer;}
</style>