<template>
    <div class="forders">
        <!--切换选项卡-->
        <el-tabs v-model="tabIndex">
            <el-tab-pane label="全部订单" name="1"></el-tab-pane>
        </el-tabs>
        <div class="filter">
            <div class="block">
                <span class="demonstration">时间范围</span>
                <el-date-picker
                        v-model="timeRange"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                </el-date-picker>
            </div>
            <el-button type="primary" size="mini" @click="search()" class="primary-button">搜索</el-button>
        </div>
        <div class="table">
            <div class="title">
                <div class="search-phone right20">
                    <el-input
                            placeholder="订单号/手机号" size="mini"
                            v-model="params.searchKey" class="right20">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="search()" ></i>
                    </el-input>
                </div>
                <div @click="exportOrders()" class="el-button el-button--primary el-button--mini right20 mt10">导出</div>
            </div>
            <el-table
                    :data="orders"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="orderNo"
                        label="订单号">
                </el-table-column>
                <el-table-column
                        prop="user[0].name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="user[0].phone"
                        label="手机">
                </el-table-column>
                <el-table-column
                        prop="orderTitle"
                        label="商品名称">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="金额（元）">
                </el-table-column>
                <el-table-column
                        label="交易时间">
                    <template slot-scope="scope">
                        <span>{{createTime | dateFormate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="支付方式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.channelId=='ALIPAY_PC'||scope.row.channelId=='ALIPAY_MOBILE'||scope.row.channelId=='ALIPAY_WAP'||scope.row.channelId=='ALIPAY_QR'">微信支付</span>
                        <span v-if="scope.row.channelId=='WX_JSAPI'||scope.row.channelId=='WX_NATIVE'||scope.row.channelId=='WX_APP'||scope.row.channelId=='WX_MWEB'">支付宝</span>
                        <span v-if="scope.row.channelId=='IAP'">苹果支付</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <a :href="scope.row.orderNo">详情</a>
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
                tabIndex:"1",
                timeRange:'',
                params:{
                    query:null,
                    pageNo:1,
                    pageSize:10,
//                    orderType:12,
                    timeType:1,
                    searchKey:'',
                    startTime:'',
                    endTime:''
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
            this.getOders()
        },
        methods: {
            exportOrders:function(){
                let that = this
                financialService.exportOrders(that.params)
            },
            getOders:function(){
                let that = this
                financialService.getOders(that.params).then(function (res) {
                    that.orders = res.data.datas.datas
                    that.total = res.data.datas.totalCount*1
                    console.log(that.total);
                })
            },
            changePage:function (page) {
                let that = this
                that.params.pageNo = page
                that.getOders()
            },
            changeSize:function (size) {
                let that = this
                that.params.pageSize = size
                that.getOders()
            },
            search:function () {
                let that = this
                that.params.pageNo = 1
                if(that.timeRange){
                    that.params.startTime = that.timeRange[0]
                    that.params.endTime = that.timeRange[1]
                }else{
                    that.params.startTime = ''
                    that.params.endTime = ''
                }
                that.getOders()
            },

        },

    }
</script>

<style lang="less">
    @import "../../assets/css/common/opration-bar.less";
    .forders{
        margin:20px;
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