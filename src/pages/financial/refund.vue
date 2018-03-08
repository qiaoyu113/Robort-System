<template>
    <div class="frefundInfo">
        <div class="buyerinfo">
            <div class="title">个人资料</div>
            <div class="mar">申请时间：{{orders.createTime}}</div>
            <div class="mar">申请帐号：{{orders.name}}</div>
            <div class="mar">姓名：{{orders.name}}</div>
        </div>
        <div class="buyerinfo">
            <div class="title">提现账户</div>
            <div class="mar">身份证号：{{orders.userId}}</div>
            <div class="mar">银行：{{orders.bankInfo}}</div>
            <div class="mar">银行卡号：{{orders.bankInfo}}</div>
            <div class="mar">提现金额：{{orders.applyMoney}}</div>
        </div>
        <div class="buyerinfo">
            <div class="title">审核操作</div>
            <input class="radio" type="radio"  checked="checked" name="audit"/>通过
            <input class="radio" type="radio" name="audit"/>拒绝
            <br>
            <div >
                <span class="mar">备注：</span>
                <textarea  rows="3" cols="30"></textarea>
            </div>
            <div  v-if='orders.description'>
                <span class="mar">备注：</span>
                <span class="ccc">{{orders.description}}</span>
            </div>
            
            <div class="box">
                <upload-original :options="uploadOrg" v-on:getPictureUrl="getPictureUrl" ref="upOrg"></upload-original>
            </div>
        </div>
    </div>
</template>
<script>
import {financialService} from '../../service/financialService.js'
import uploadOriginal from '../../component/upload/uploadOriginal.vue'

export default {
        name: 'app',
        components: {'upload-original': uploadOriginal},
        data: function (){
            return {
                params:{
                    id:this.$route.params.orderId,
                },
                orders:'',
                uploadOrg: {
                    limit:1,
                   
                },
                picUrl:'',
                imgUrl:'',
            }
        },
        mounted(){
            this.getvarifydetail()
        },
        methods: {
            getvarifydetail:function(){
                let that = this
                console.log(that.params.id)
                financialService.getvarifydetail(that.params.id).then(function (res) {
                    that.orders = res.data.datas
                    that.picUrl = res.data.datas.updateUrl
                     console.log(res.data);
                })
            },
            getPictureUrl:function(url){
                let that=this;
                if(url){
                    that.imgurl = url
                } else {
                    that.imgUrl = that.$store.state.picHead+that.picurl
                    console.log(that.imgUrl)
                }
            },
            
        },

    }
</script>

<style lang="less">
    .frefundInfo{
        width: 400px;
        height: 600px;
        margin: 30px;
        border: 1px solid black;
        .buyerinfo{
            margin: 20px;
            margin-top: 50px;
            .title{
                font-size: 15px;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .mar{
                font-size: 15px;
                margin: 5px 0 5px 50px;
            }
            .ccc{
                font-size: 15px;
                margin-top: 10px;
            }
            .radio{
                margin-top: 10px;
                margin-left: 50px;
                font-size: 15px;
            }
            textarea{
                margin-top: 10px;
                resize: none;
            }
            .box{
                margin-top: 10px;
                margin-left: 100px;
                font-size: 15px;
                width: 100px;
                height: 100px;
                border: 1px solid black;
            }
        }
        
    }
</style>
