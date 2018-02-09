<template>
  <div class="container">
    <!--第一层tab-->
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="资讯律师" name="1"></el-tab-pane>
      <el-tab-pane label="合同校审" name="2"></el-tab-pane>
    </el-tabs>
    <!--显示模板-->
    <div class="pos">
      <el-radio-group v-model="tabPosition" style="margin-bottom:20px;" size="small">
        <el-badge :value="12" class="item">
          <el-radio-button label="pass" >审核通过的</el-radio-button>
        </el-badge>
        <el-badge :value="1" class="item">
          <el-radio-button label="ready">待审核</el-radio-button>
        </el-badge>
        <el-badge :value="5" class="item">
          <el-radio-button label="cancel">审核未通过</el-radio-button>
        </el-badge>
      </el-radio-group>
    </div>
    <!--按钮、搜索-->
    <p class="opr">
      <el-input
              placeholder="搜索帐号"
              v-model="query" size="mini" class="right">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </p>
    <!--表格-->
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="date"
              label="提交时间"
              width="180">
      </el-table-column>
      <el-table-column
              prop="date"
              label="合同模板"
              width="180">
      </el-table-column>
      <el-table-column
              prop="date"
              label="联系人"
              width="120">
      </el-table-column>
      <el-table-column
              prop="name"
              label="手机号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="需求描述">
      </el-table-column>
      <el-table-column
              label="操作"
              width="140">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row.id)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {contractService} from '../../service/contractService'

  export default {
    props: [],
    data () {
      return {
        tabIndex: '1', // 1:资讯律师； 2.合同校审；
        tabPosition: 'pass', // pass 审核通过的，ready 待审核，cancel 审核未通过
        status: 0, // 审核状态
        query: '', // 查询条件
        myPagination: {
          size:1,
          num: 1,
          totalCount: 0,
          totalPage: 1
        },
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.getList();
    },
    methods: {
      getList() {
        let that = this;
        contractService.getServicesInfo({pageNo: that.myPagination.num, pageSize: that.myPagination.size, status: that.status, phone: that.query}).then(function (res) {
          console.log('列表', res);
          if(res.data.success){
          }else{}
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    watch: {
      tabPosition (cur, old){
        let that = this;
        if(cur == 'pass'){ // 审核通过的
          that.status = 1;
        }
        else if(cur == 'ready'){ // 待审核
          that.status = 0;
        }
        else if(cur == 'cancel'){ // 审核未通过
          that.status = 2;
        }
        that.getList();
      }
    }
  }
</script>
<style lang="less">
  .el-badge__content.is-fixed{z-index: 9;}

  /*.el-tabs--top .el-tabs__item.is-top:nth-child(2){padding-left:20px!important;}*/
  .el-pagination{margin-top:20px;text-align:right;}
  .el-table__empty-block{height:300px;}
  .container{padding: 20px;
    .pos{display:flex;justify-content: center;align-items: center;}
    .real{margin:-10px 20px 20px;}
  }
  .container .opr{margin:0 auto 20px;overflow:hidden;}
  .container .opr .left{}
  .container .opr .right{width:250px;float:right;}
  .container .picTxt{display:flex;justify-content:center;align-items:center;}
  .container .picTxt .img-cover{width:100px;height:80px;margin-right:10px;float:left;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .container .picTxt .img-cover .image{max-width:100px;max-height:80px;width:auto;height:auto;}
  .container .picTxt .txt{word-wrap:break-word;}
  .container .picTxt .txt .mark{width:30px;height:20px;line-height:20px;font-size:12px;margin-right:6px;text-align:center;float:left;display:block;color:#fff;background-color: #e6a23c;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
  .container .picTxt .txt .price{display:block;}
  .titleUnderLine:hover{color:#66b1ff;text-decoration: underline;cursor:pointer;}
</style>