<template>
  <div class="container">
    <!--切换选项卡-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="合同模板" name="1"></el-tab-pane>
      <el-tab-pane label="试用合同模板" name="2"></el-tab-pane>
    </el-tabs>
    <!--按钮、搜索-->
    <p class="opr">
      <el-button v-if="tabIndex=='1'" type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建合同模板</el-button>
      <el-button v-if="tabIndex=='2'" type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新建试用模板</el-button>
      <el-input
              placeholder="搜索合同模板标题"
              v-model="query" size="mini" class="right middle" @enter.keyup="getList"><!--无效果，因为element会将转化为另外的结构，事件不会触发的input上-->
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getList"></i>
      </el-input>
    </p>
    <!--表格-->
    <div v-if="tabIndex == '1' ">
      <el-table key="btable"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              empty-text="暂无数据"
              @selection-change="handleSelectionChange"
              style="width: 100%">
        <el-table-column
                prop="name"
                width="200"
                label="合同模板名称">
        </el-table-column>
        <el-table-column
                prop="className"
                label="分类"
                width="140"
                :filters="filterList"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <span>{{scope.row.className}}</span>
                <!--<span v-if="scope.row.close==false">已上架</span>-->
                <!--<span v-if="scope.row.close==true">已下架</span>-->
            </template>
        </el-table-column>
        <el-table-column
                prop="productPkgName"
                label="所在产品包">
        </el-table-column>
        <el-table-column
                width="80"
                label="浏览数">
          <template slot-scope="scope">
            <p @click="toScanDetail(scope.row.id)" class="titleUnderLine" v-if="scope.row.watchNum>0">{{ scope.row.watchNum }}</p>
            <p v-else>{{ scope.row.watchNum }}</p>
          </template>
        </el-table-column>
        <el-table-column
                prop="createTime"
                width="180"
                label="发布时间">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="90">
          <template slot-scope="scope">
            <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
            <el-button @click="online(scope.row.id)" type="text" size="small" v-if="scope.row.close== true" class="el-btn-no">上架</el-button>
            <el-button @click="offline(scope.row.id)" type="text" size="small" v-if="scope.row.close== false" class="el-btn-no">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="tabIndex == '2' ">
      <el-table key="atable"
              ref="multipleTable"
              :data="tableData2"
              tooltip-effect="dark"
              empty-text="暂无数据"
              @selection-change="handleSelectionChange"
              style="width: 100%">
        <el-table-column
                prop="name"
                width="200"
                label="合同模板名称">
        </el-table-column>
        <el-table-column
                prop="productPkgName"
                label="本地化产品包">
        </el-table-column>
        <el-table-column
                width="80"
                label="浏览数">
          <template slot-scope="scope">
            <p @click="toScanDetail(scope.row.id)" class="titleUnderLine" v-if="scope.row.watchNum>0">{{ scope.row.watchNum }}</p>
            <p v-else>{{ scope.row.watchNum }}</p>
          </template>
        </el-table-column>
        <el-table-column
                prop="createTime"
                width="180"
                label="发布时间">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="90">
          <template slot-scope="scope">
            <el-button @click="doEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagination v-if="myPagination.totalCount > myPagination.size" :options="myPagination" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
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
  import {contractService} from '../../service/contractService'
  import {common} from '../../assets/js/common/common'
  export default {
    props: [],
    data () {
      return {
        tabIndex: '1', // tab默认显示第一个
        isTop: 0, // 是否显示置顶按钮
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
        tableData2: [], //列表数据
        multipleSelection: [], //列表数据
        filterList:[],
        cPackage: [], //产品包信息
        currentPage: 1, // 分页
        myPagination: {
          size: 1,
          num: 1,
          totalCount: 0,
          totalPage: 1
        }, // 分页
        query: '',
        productPkgId: '',
      }
    },
    components: {pagination},
    mounted () {
      let that = this;
      if(that.tabIndex == '1'){
        that.getList();
        that.getTemplateType();//下拉分类
      }
      if(that.tabIndex == '2'){
        that.getList2();
      }
    },
    methods: {
      //获得列表,分类筛选
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
      getList () {
        let that = this;
        that.tableData = [];
        let flag = false;
        if(that.tabIndex == '1'){
          flag = false;
        }
        else if(that.tabIndex == '2'){
          flag = true;
        }
        contractService.getTemplates({pageNo: that.myPagination.num, pageSize: that.myPagination.size, name: that.query, productPkgId: that.productPkgId, tryUse: flag}).then(function (res) {
          //console.log('模板列表', res);
          if(res.data.success){
            let table = res.data.datas;
            that.myPagination.totalCount = parseInt(table.totalCount);
            that.myPagination.totalPage = table.totalPage;
            let array = res.data.datas.datas;
            for(let i=0;i<array.length;i++){
              array[i].createTime = common.getFormatOfDate(array[i].createTime*1, 'yyyy-MM-dd hh:mm');
              that.tableData.push(array[i]);
            }
          }else{}
        });
      },
      getList2 () {
        let that = this;
        that.tableData2 = [];
        let flag = false;
        if(that.tabIndex == '1'){
          flag = false;
        }
        else if(that.tabIndex == '2'){
          flag = true;
        }
        contractService.getTemplates({pageNo: that.myPagination.num, pageSize: that.myPagination.size, name: that.query, productPkgId: that.productPkgId, tryUse: flag}).then(function (res) {
          //console.log('模板列表', res);
          if(res.data.success){
            let table = res.data.datas;
            that.myPagination.totalCount = parseInt(table.totalCount);
            that.myPagination.totalPage = table.totalPage;
            let array = res.data.datas.datas;
            for(let i=0;i<array.length;i++){
              array[i].createTime = common.getFormatOfDate(array[i].createTime*1, 'yyyy-MM-dd hh:mm');
              that.tableData2.push(array[i]);
            }
          }else{}
        });
      },
      // 分页
      sizeChange (val) {
        let that = this;
        that.myPagination.size = val;
        if(that.tabIndex == '1'){
          that.getList();
        }
        if(that.tabIndex == '2'){
          that.getList2();
        }
      },
      currentChange (val) {
        // 当前页，就是当前点击的那一页
        let that = this;
        that.myPagination.num = val;
        if(that.tabIndex == '1'){
          that.getList();
        }
        if(that.tabIndex == '2'){
          that.getList2();
        }
      },
      // 获取合同模板分类
      getTemplateType () {
        let that = this;
        contractService.getTemplateType({type: 2}).then(function (res) {
          //console.log('分类', res);
          if(res.data.success){
            let array = res.data.datas;
            for(let i=0;i<array.length;i++){
              let vName = array[i].name;
              let obj = {
                text: vName,
                value: vName
              };
              that.filterList.push(obj);
            }
          }else{}
        });
      },
      // 筛选
      filterTag (value, row) {
        return row.className === value;
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
        let that = this;
        that.$route.params.templateTyp = that.tabIndex;
        this.$router.push({name: 'contractTemplateAdd'});
      },
      // 编辑
      doEdit (id) {
        let that = this;
        that.$route.params.templateTyp = that.tabIndex;
        that.$route.params.templateId = id;
        that.$router.push({name: 'contractTemplateEdit'});
      },
      // 删除
      doDelete (id, index, rows) {
        let that = this;
        that.dialog = {
          title: '删除提示',
          content: '删除合同模板后，同时也会从产品包中删除，确定删除吗？',
          id: id,
          oprTyp: 1,
          index: index,
          rows: rows
        };
        that.centerDialogVisible = true;
      },
      //上架
      online (id) {
          let that = this;
          that.dialog = {
              title: '上架提示',
              content: '确定上架吗？',
              id: id,
              oprTyp: 2
          };
          that.centerDialogVisible = true;
      },
      // 下架
      offline (id) {
        let that = this;
          that.dialog = {
            title: '下架提示',
            content: '下架后该产品包将不会在前台展示，已购买的用户可以继续使用，确定下架吗？',
            id: id,
            oprTyp: 3
          };
          that.centerDialogVisible = true;
      },
      // 浏览详情
      toScanDetail (id) {
        let that = this;
        that.$route.params.templateId = id;
        that.$router.push({name: 'contractTemplateScan'});
      },
      //弹出框按钮的操作
      // 确认
      handleOk () {
        let that = this;
        let id = that.dialog.id;
        let typ = that.dialog.oprTyp;
        if(typ === 1){ //删除
            let index = that.dialog.index;
            let rows = that.dialog.rows;
            contractService.deleteOneTemplate(id).then(function (res) {
                //console.log('删除', res);
                if(res.data.success){
                    rows.splice(index, 1);
                    that.getList(); // 数据刷新
                }
            });
        }else{
            let close = false;
            if(typ === 2){ // 上架
                close = false;
            }
            else if(typ === 3){ // 下架
                close = true;
            }
            //console.log('shang', close);
            contractService.isOnlineOfTemplate(id, {close: close}).then(function (res) {
                //console.log('上下架', res);
                if(res.data.success){
                    that.getList(); // 数据刷新
                }else{}
            });
        }
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
    },
    watch: {
      tabIndex (cur, old){
        let that = this;
        if(cur == '1'){
          that.getList();
        }
        else if(cur == '2'){
          that.getList2();
        }
        return cur;
      }
    }
  }
</script>
<style lang="less">
  .el-table th{background:#f5f7fa!important;}
  .el-table td{font-size:14px;color:#333!important;}
  .el-pagination{margin-top:20px;text-align:right;}
  .v-modal{display:none!important;}
  .el-dialog__wrapper{margin-top:0!important;background:rgba(0,0,0,.3)!important;display:flex;justify-content: center;align-items: center;}
  .container{padding: 20px;
    .opr{
      margin:40px auto 20px;overflow:hidden;
      .right{float:right;}
      .middle{width:250px;}
    }
    .el-btn-no{margin-left:0!important;}
  }
  .titleUnderLine:hover{color:#66b1ff;text-decoration: underline;cursor:pointer;}
</style>