<template>
    <div class="container">
        <!--面包屑-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'contractTemplate' }">合同模板</el-breadcrumb-item>
            <el-breadcrumb-item>浏览数详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--表格-->
        <el-table
                :data="tableData"
                empty-text="暂无数据"
                style="width: 100%" class="dataTable">
            <el-table-column
                    prop = 'user[0].name'
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="watchNum"
                    label="次数">
            </el-table-column>
        </el-table>
        <!--分页-->
        <pagination v-if="myPagination.totalCount > myPagination.size" :options="myPagination" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
    </div>
</template>
<script type="text/ecmascript-6">
    import {common} from '../../../assets/js/common/common'
    import pagination from '../../../component/pagination/pagination.vue'
    import {contractService} from '../../../service/contractService'
    export default {
        props: [],
        data () {
            return {
                myPagination: {
                    size: 1,
                    num: 1,
                    totalCount: 0,
                    totalPage: 1
                },
                tableData: [] //模板列表数据
            }
        },
        components: {pagination},
        mounted () {
            let that = this;
            that.getList();
        },
        methods: {
            //获得列表//
            getList () {
                let that = this;
                that.tableData = [];
                let id = that.$route.params.templateId;
                contractService.getScanNum({pageNo: that.myPagination.num, pageSize: that.myPagination.size,watchTypeId: id}).then(function (res) {
                    //console.log('产品包浏览数列表', res);
                    if(res.data.success){
                        let table = res.data.datas;
                        that.myPagination.totalCount = parseInt(table.totalCount);
                        that.myPagination.totalPage = table.totalPage;
                        that.tableData = res.data.datas.datas;
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
        }
    }
</script>
<style lang="less">
    .el-table th{background:#f5f7fa!important;}
    .el-table td{font-size:14px;color:#333!important;}
    .el-pagination{margin-top:20px;text-align:right;}
    .el-breadcrumb{margin-bottom: 20px;}
    .el-table__empty-block{height:300px;}
    .container{padding: 20px;}
    .dataTable{
     .el-button{margin-left:10px;}
    }
</style>