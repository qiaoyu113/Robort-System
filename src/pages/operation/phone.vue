<template>
    <div id="phone">
        <!--导航菜单-->
        <div class="topPhone">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">委托列表</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">委托出价</template>
                    <el-menu-item index="2">未缴纳保证金</el-menu-item>
                    <el-menu-item index="3">委托中</el-menu-item>
                    <el-menu-item index="4">委托结束</el-menu-item>
                    <el-menu-item index="5">委托取消</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!--我的委托-->
        <div class="myErtrust" v-if="showBox == '1'">
            <!--搜索框-->
            <div class="find">
                <el-input
                        placeholder="请输入内容"
                        v-model="findText"
                        clearable>
                </el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <!--table-->
            <template>
                    <el-table
                            :data="tableData3"
                            border
                            highlight-current-row
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                align="center"
                                label="委托编号"
                                width="110">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="昵称"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                align="center"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="commodity"
                                align="center"
                                label="心仪拍品">
                        </el-table-column>
                        <el-table-column
                                prop="dityData"
                                align="center"
                                label="竞拍状态">
                        </el-table-column>
                        <el-table-column
                                prop="cashData"
                                align="center"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="handleClick2(scope.$index)" type="text" size="small">备注</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </template>
            <!--分页-->
            <div class="page">
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="20">
                </el-pagination>
            </div>
        </div>
        <!--未缴纳保证金-->
        <div class="myErtrust" v-if="showBox == '2'">未缴纳保证金</div>
        <!--委托中-->
        <div class="myErtrust" v-if="showBox == '3'">委托中</div>
        <!--委托结束-->
        <div class="myErtrust" v-if="showBox == '4'">委托结束</div>
        <!--委托取消-->
        <div class="myErtrust" v-if="showBox == '5'">委托取消</div>
    </div>
</template>

<script>
    export default {
        data: function (){
            return {
                findText:'',
                activeIndex: '1',
                showBox:'1',//显示的模块
                tableData3: [{
                    date: '12',
                    name: '王小虎',
                    phone:'135463030000',
                    commodity:'拍品1',
                    dityData: '已结束',
                    cashData:'已缴纳',
                    entrust: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },{
                    date: '12',
                    name: '王小虎',
                    phone:'135463030000',
                    commodity:'拍品1',
                    dityData: '已结束',
                    cashData:'已缴纳',
                    entrust: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },{
                    date: '12',
                    name: '王小虎',
                    phone:'135463030000',
                    commodity:'拍品1',
                    dityData: '已结束',
                    cashData:'已缴纳',
                    entrust: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },{
                    date: '12',
                    name: '王小虎',
                    phone:'135463030000',
                    commodity:'拍品1',
                    dityData: '已结束',
                    cashData:'已缴纳',
                    entrust: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },{
                    date: '12',
                    name: '王小虎',
                    phone:'135463030000',
                    commodity:'拍品1',
                    dityData: '已结束',
                    cashData:'已缴纳',
                    entrust: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        methods: {
            //菜单栏点击事件
            handleSelect(tab, event) {
                this.showBox = tab
            },
            //添加备注
            handleClick2(index) {
                console.log(index)
                this.$prompt('请输入备注', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '您的备注是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style lang="less">
.topPhone{
    width:100%;
    /*padding:0 30px;*/
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    background:#fff;
    .el-menu--horizontal{
        height:48px;
    }
    .el-menu--horizontal .el-menu-item{
        font-size:12px;
        height:50px;
        line-height:50px;
    }
    .el-menu--horizontal .el-submenu .el-submenu__title{
        font-size:12px;
        height:50px;
        line-height:50px;
    }
    .el-menu--horizontal .el-submenu .el-submenu__title:hover{
        height:48px;
        line-height:50px;
    }
    .el-menu-item.is-active {
        color: #3792FF !important;
        background: #fff;
        font-size:12px;
        height:50px;
        line-height:50px;
    }
    .el-menu--horizontal .el-submenu .el-menu-item:hover{
        background:#fff;
    }
    .el-tabs__nav-wrap::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        /*background-color: #e4e7ed;*/
        z-index: 1;
    }
    .el-tabs__header{
        margin:0;
    }
}
.myErtrust{
    padding:20px;
    box-sizing: border-box;
    .page{
        width:100%;
        margin-top:40px;
    }
    .find{
        width:300px;
        height:55px;
        .el-input{
            width:200px;
            height:40px;
            float:left;
            margin-right:16px;
        }
        .el-button--primary{
            width:80px;float:right;text-align: center;padding: 11px 10px;
        }
    }
    .el-table {
        .cell {
            font-size: 14px;
            color:#606266;
        }
    }
    .el-table td.is-center, .el-table th.is-center {
        text-align: center;
        margin: 0;
        padding: 5px;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        padding-left: 10px;
        height: 24px;
    }
    .el-button--text{
        color:#1ba1e2;
        font-size:14px;
    }
    .el-button--small, .el-button--small.is-round {
        padding: 5px 15px;
    }
}
</style>