<template>
  <div class="tab-container">
    <!--第二层tab-->
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
    <!--具体内容-->
    <div class="real">
      <p class="opration-bar">
        <el-input
                placeholder="搜索产品包名称"
                v-model="input23" size="mini" class="right normal">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </p>
      <el-table
              :data="tableData"
              empty-text="暂无数据"
              style="width: 100%">
        <el-table-column
                prop="date"
                label="提交时间">
        </el-table-column>
        <el-table-column
                prop="templateName"
                label="合同模板">
        </el-table-column>
        <el-table-column
                prop="contactPeo"
                label="联系人">
        </el-table-column>
        <el-table-column
                prop="contactPhone"
                label="手机号">
        </el-table-column>
        <el-table-column
                prop="des"
                label="需求描述">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="60">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row.id)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {
        tableData: [],
        tabPosition: 'pass'
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.getList();
      console.log('tab tableInfo', that.tableInfo);
    },
    methods: {
      getList () {
        let that = this;
        that.tableData=[
            {
                date: '2018-06-12 12:30',
                templateName: '员工期权授予协议',
                contactPeo: 'dandan',
                contactPhone: '15678987230',
                des: '我需要律师审核一下的合同，第一条是射蚂蚁四，发后打开撒发打发汇顶科技萨芬带回家sad的就撒回放',
                oprTyp: 11
            },
            {
              date: '2018-06-13 12:30',
              templateName: '员工期权授予协议',
              contactPeo: 'dandan',
              contactPhone: '15678954334',
              des: '我需要律师审核一下的合同，第一条是射蚂蚁四，发后打开撒发打发汇顶科技萨芬带回家sad的就撒回放',
              oprTyp: 11
            },
            {
              date: '2018-06-14 12:30',
              templateName: '员工期权授予协议',
              contactPeo: 'dandan',
              contactPhone: '15656664723',
              des: '我需要律师审核一下的合同，第一条是射蚂蚁四，发后打开撒发打发汇顶科技萨芬带回家sad的就撒回放',
              oprTyp: 11
            }
        ]

      }
    }
  }
</script>
<style lang="less">
  @import "../../../assets/css/common/opration-bar.less";
  .el-badge__content.is-fixed{z-index: 9;}
  .tab-container{
    margin-top: 20px;
    .pos{display:flex;justify-content: center;align-items: center;}
    .real{margin:-10px 20px 20px;}
  }

</style>