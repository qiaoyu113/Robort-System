<template>
    <div class="faccounts">
        <div class="banner-text">
            <div class="left">
                <div class="font18">累计收入</div>
                <span class="money-total">{{totalMoney}}</span><span class="font16">&nbsp;元</span>
            </div>
            <div class="right">
                <div>微信收入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="f-red">{{wxMoney}}</span>元</div>
                <div>支付宝收入&nbsp;&nbsp;&nbsp;<span class="f-red">{{alipayMoney}}</span>元</div>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <span class="font16">收入记录</span>
                <div @click="exportwallets()" class="el-button el-button--primary el-button--mini right20 mt10">导出记录</div>
            </div>
            <el-table
                    :data="wallets"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="orderNo"
                        label="订单号">
                </el-table-column>
                <el-table-column
                        prop="typeTitle"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="flowAmount"
                        label="收入">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <a :href="'./orders/'+scope.row.orderNo">详情</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" v-if="total > params.pageSize">
            <el-pagination
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
    import {common} from '../../assets/js/common/common'
    import {financialService} from '../../service/financialService.js'
    export default {
        name: 'app',
        data: function (){
            return {
                wallets:[],
                params:{
                    query:null,
                    pageNo:1,
                    pageSize:10,
                },
                totalMoney:0.00,
                wxMoney:0.00,
                alipayMoney:0.00,
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
            let that = this
            that.getwallets()
            financialService.getAdminInfo().then(function (res){
                that.totalMoney = res.data.datas.wallet.totalMoney
                that.wxMoney = res.data.datas.wallet.wxMoney
                that.alipayMoney = res.data.datas.wallet.alipayMoney
            })
        },
        methods: {
            exportwallets:function(){
                let that = this
                financialService.exportwallets()
            },
            getwallets:function(){
                let that = this;
                that.wallets = [];
                financialService.getwallets(this.params).then(function (res) {
                    let newArr = res.data.datas.datas;
                    for(let i=0;i<newArr.length;i++){
                      newArr[i].createTime = common.getFormatOfDate(newArr[i].createTime*1,'yyyy-MM-dd hh:mm:ss');
                    };
                    that.wallets = newArr;
                    that.total = res.data.datas.totalCount*1;

                })
            },
            changePage:function (page) {
                let that = this;
                that.params.pageNo = page;
                that.getwallets();
            },
            changeSize:function (size) {
                let that = this;
                that.params.pageNo = 1;
                that.params.pageSize = size;
                that.getwallets();
            },
        },

    }
</script>

<style lang="less">
    .faccounts{
        margin:40px;
        .right20{
            float:right;margin-right: 20px;
        }
        .font18{
            font-size: 18px;
        }
        .font16{
            font-size: 16px;
        }
        .title{
            border-bottom:1px solid #f0f0f0;
            line-height: 44px;
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