<template>
    <div class="forderDetail">
        <div class="buyerinfo">
            <div class="title">买家信息</div>
            <div class="info"><span>姓名：{{users.name }}</span><span class="">手机号：{{users.phone}}</span></div>
        </div>
        <div class="buyerinfo">
            <div class="title">订单信息</div>
            <div class="info">
                <span>订单号：{{$route.params.orderNo}}</span>
                <span class="">创建时间：{{orders.createTime}}</span>
            </div>
            <div class="info">
                <span>商品名称：{{orders.orderTitle}}</span>
                <span class="">单价/数量：￥{{orderDetail.price}}/{{orderDetail.status}}</span>
            </div>
            <div class="info">
                <span>金额：{{orders.amount}}</span>
                <span v-if="orders.channelId=='ALIPAY_PC'||orders.channelId=='ALIPAY_MOBILE'||orders.channelId=='ALIPAY_WAP'||orders.channelId=='ALIPAY_QR'">支付方式：微信支付</span>
                <span v-if="orders.channelId=='WX_JSAPI'||orders.channelId=='WX_NATIVE'||orders.channelId=='WX_APP'||orders.channelId=='WX_MWEB'">支付方式：支付宝</span>
                <span v-if="orders.channelId=='IAP'">支付方式：苹果支付</span>
            </div>
            <div class="remark"><span>备注：无</span><span class="fremark">添加备注</span></div>
        </div>
        
    </div>
</template>
<script>
import {financialService} from '../../service/financialService.js'
export default {
        name: 'app',
        data: function (){
            return {
                params:{
                    orderNo:this.$route.params.orderNo,
                },
                orders:'',
                orderDetail:'',
                users:'',
                userId:'',
            }
        },
        mounted(){
            this.getOdersNo()
        },
        methods: {
            getOdersNo:function(){
                let that = this
                console.log(that.params.orderNo)
                financialService.getOdersNo(that.params).then(function (res) {
                    that.orders = res.data.datas
                    that.orderDetail = res.data.datas.orderDetails[0]
                    that.userId = res.data.datas.userId
                     console.log(res.data);
                     that.getUsers()
                })
            },
            getUsers:function(){
                let that = this
                financialService.getuserId(that.userId).then(function (res) {
                    that.users = res.data.datas
                     console.log(res.data);
                })
            }
        },

    }
</script>
<style lang="less">
    .forderDetail{
        width: 850px;
        height: 300px;
        margin: 30px;
        border: 1px solid black;
        .buyerinfo{
            margin: 20px;
            .title{
                font-size: 15px;
                color: blue;
            }
            .info{
                margin-top: 10px;
                span{
                    font-size: 15px;
                    width: 35%;
                    display: inline-block;
                }
                .mar{
                    // margin-left: 40px;
                }
            }
            .remark{
                margin-top: 20px;
                span{
                    font-size: 15px;
                }
                .fremark{
                    margin-left: 30px;
                    color: blue;
                }
            }
        }
        
    }
</style>
