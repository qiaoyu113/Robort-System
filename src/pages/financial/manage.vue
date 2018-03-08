<template>
    <div class="fmanage">
        <!--切换选项卡-->
        <div class="pos">
            <el-radio-group v-model="tabPosition" style="margin-bottom:20px;" size="small">
                <el-badge class="item" @click="clear()">
                    <el-radio-button label="1">审核通过的</el-radio-button>
                </el-badge>
                <el-badge :value="dealCount" class="item" @click="clear()">
                    <el-radio-button label="0">待审核</el-radio-button>
                </el-badge>
                <el-badge class="item" @click="clear()">
                    <el-radio-button label="2">审核未通过</el-radio-button>
                </el-badge>
            </el-radio-group>
        </div>
        <div class="table">
            <div class="title">
                <div class="search-phone right20">
                    <el-input
                            placeholder="订单号/手机号" size="mini"
                            v-model="params.phone" class="right20">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="search()" ></i>
                    </el-input>
                </div>
            </div>
            <el-table
                    :data="orders"
                    border
                    style="width: 100%">
                <el-table-column
                        label="申请时间">
                    <template slot-scope="scope">
                        <span>{{createTime | dateFormate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="申请人账号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="applyMoney"
                        label="申请金额">
                </el-table-column>
                <el-table-column
                        label="银行">
                    <template slot-scope="scope">
                        <span v-if="bankInfo">{{bankInfo.bankName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="银行卡号">
                    <template slot-scope="scope">
                        <span v-if="bankInfo">{{bankInfo.bankCardNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <a :href="'./refund/'+scope.row.id">查看</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination v-if="total>params.pageSize"
                    @size-change="changeSize"
                    @current-change="changePage"
                    :current-page="1"
                    :page-sizes="[10, 20, 50,100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>
    import {financialService} from '../../service/financialService.js'
    export default {
        name: 'app',
        data: function (){
            return {
                wallets:[],
                tabPosition:"0",
                params:{
                    pageNo:1,
                    pageSize:10,
                    phone:'',
                    status:'0'
                },
                total:0,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        mounted(){
            this.getvarifyinfos()
        },
        watch : {
            tabPosition(cur){
                this.clear()
            }
        },
        methods: {
            getvarifyinfos:function(){
                let that = this
                that.params.status=that.tabPosition
                financialService.getvarifyinfos(that.params).then(function (res) {
                    that.orders = res.data.datas.datas
                    that.total = res.data.datas.totalCount*1
                    console.log(res)
                })
            },
            changePage:function (page) {
                let that = this
                that.params.pageNo = page
                that.getvarifyinfos()
            },
            changeSize:function (size) {
                let that = this
                that.params.pageSize = size
                that.getvarifyinfos()
            },
            search:function () {
                let that = this
                that.getvarifyinfos()
            },
            clear:function () {
                let that = this
                that.params={
                    pageNo:1,
                    pageSize:10,
                    type:3,
                    phone:'',
                    status:that.tabPosition
                }
                that.getvarifyinfos()
            },

        },

    }
</script>

<style lang="less">
    @import "../../assets/css/common/opration-bar.less";
    .fmanage{
        margin:20px;
        .pos{display:flex;justify-content: center;align-items: center;}
        .real{margin:-10px 20px 20px;}
        .el-radio-button:first-child .el-radio-button__inner{
            border-radius:0;
        }
        .left{
            float:left
        }
        .right20{
            float:right;
        }
        .font18{
            font-size: 18px;
        }
        .font16{
            font-size: 16px;
        }
        .filter{
            .primary-button{
                margin: 20px 200px;
            }
        }
        .title{
            height: 44px;
            .search-phone{
                width: 200px;
                margin-left: 20px;
            }
        }
        .banner-text{
            border:1px solid #f0f0f0;
            height: 90px;
            padding:10px 40px 0;
            line-height: 40px;
            margin-bottom: 20px;
            .left{
                display: inline-block;
                float:left;
                font-size: 20px;
                padding-right:60px;
                .money-total{
                    font-size: 28px;
                    color: red;
                }
            }
            .right{
                float:left;
                font-size: 16px;
                padding:10px 0;
                line-height: 30px;
                .f-red{
                    color: red;
                }
            }
        }
    }
</style>