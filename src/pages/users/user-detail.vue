<template>
    <div class="fuserDetail clearfix">
        <div class="fl">
            <div class="box">
                <img :src="picHead+users.headImg" alt="">
            </div>
            <div class="info">
                <div class="mar">姓名：{{users.name}}</div>
                <div class="mar">手机：{{users.phone}}</div>
                <div class="mar">微信昵称：{{wxNickName}}</div>
            </div>
            <div class="bicinfo">
                <div class="title">基本信息</div>
                <div class="mar">单位类型 &nbsp;&nbsp;&nbsp;&nbsp;{{users.unitType}}</div>
                <div class="mar">职位 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{users.job}}</div>
                <div class="mar" v-if='subscribeItems'>订阅 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是</div>
                <div class="mar" v-if='subscribeItems==null'>订阅 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;否</div>
                <div class="mar">加入时间 &nbsp;&nbsp;&nbsp;&nbsp;{{users.createTime}}</div>
            </div>
            <div class="bicinfo">
                <div class="title">访问记录</div>
                <div class="bor"></div>
                <div v-for="item in visitedRecords" class="mar">{{item.watchTypeName}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.watchNum}}次</div>
                <!--<div class="mar">产品包名称1 &nbsp;&nbsp;&nbsp;&nbsp;{{numItem.collectNum}}次</div>-->
                <!--<div class="mar">合同模板名称  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100次</div>-->
                <!--<div class="mar">产品包名称3 &nbsp;&nbsp;&nbsp;&nbsp;61010次</div>-->
            </div>
        </div>
        
        <div class="buyerinfo">
            <div class="title">用户轨迹</div>
            <div class="mar">订阅产品包：{{numItem.productPkgNum}}个</div>
            <div class="mar">生成合同：{{numItem.contractNum}}次</div>
            <div class="mar">消费金额：{{numItem.consumeMoney}}元</div>
            <div class="bor"></div>
            <div v-for="item in footprintItems" class="box1 clearfix">
                <div class="left">{{item.time}}</div><div class="right">{{item.content}}</div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {common} from '../../assets/js/common/common'
import {userService} from '../../service/userService.js'
export default {
        name: 'app',
        data: function () {
            return {
                groups: [],
                users: '',
                userNum:0,
                selectUsers:[],
                id:this.$route.params.userId,
                numItem:'',
                footprintItems: [], // 用户轨迹
                visitedRecords: [], // 访问记录
                wxNickName: ''  // 微信昵称
            }
        },
        computed: {
            picHead() {
                return this.$store.state.picHead
            }
        },
        mounted(){
            this.getUsers();
            this.getUserRecords();
        },
        methods: {
            // 查询获取单个用户
            getUsers: function (id) {
                let that = this
                userService.getUserInfo(that.id).then(function (res) {
                    //console.log('单个用户',res.data);
                    let obj = res.data.datas;
                    let userObj = obj.user, baseUserObj = obj.baseUser;
                    that.users = userObj;
                    that.numItem = userObj.numItem;
                    that.wxNickName = baseUserObj.name;
                    that.users.createTime = common.getFormatOfDate(userObj.createTime*1, 'yyyy-MM-dd hh:mm');
                    // 轨迹
                    if(obj.footprintItems!=null){
                        let newFoot = userObj.footprintItems;
                        for(let i=0;i<newFoot.length;i++){
                            newFoot[i].time = common.getFormatOfDate(newFoot[i].time*1, 'yyyy-MM-dd');
                        }
                        that.footprintItems = newFoot;
                    }
                })
            },
            // 用户访问记录
            getUserRecords () {
                let that = this;
                userService.getUserRecords(that.id).then(function (res) {
                    //console.log('用户访问记录', res);
                    if(res.data.success){
                        that.visitedRecords = res.data.datas;
                    }else{}
                });
            }
        },

    }
</script>
<style lang="less" scope>
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}
    .fuserDetail{
        width: 800px;
        /*height: 600px;*/
        margin: 30px;
        border: 1px solid black;
        .fl{
            float: left;
            width: 370px;
            /*height: 600px;*/
            border-right: 1px solid black;
            .box{
                border: 1px solid black;
                border-radius: 50%;
                width: 100px;
                height: 100px;
                float: left;
                margin: 10px;
                margin-left: 20px;
                margin-top: 20px;
                img{
                    height: 100px;
                    height: 100px;
                    overflow: hidden;
                    border-radius: 50%;
                }
            }
            .info{
                font-size: 15px;
                margin-top: 30px;
                margin-left: 10px;
                .mar{
                    padding: 5px;
                }
            }
            .bicinfo{
                margin-top: 40px;
                margin-left: 30px;
                .title{
                    font-weight: bold;
                    font-size: 15px;
                    margin: 10px;
                    margin-bottom: 10px;
                }
                .mar{
                    font-size: 15px;
                    margin: 10px;
                }
                .bor{
                    width: 300px;
                    border-top: 1px solid black;
                }
            }
        }
        .buyerinfo{
            margin: 10px;
            height: 580px;
            width: 400px;
            float: right;
            .title{
                font-size: 15px;
                color: blue;
                margin-top: 20px;
            }
            .mar{
                font-size: 15px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .bor{
                width: 90%;
                border-top: 1px solid black;
            }
            .box1{
                .left{
                    float: left;
                    font-size: 15px;
                    margin-top: 10px;
                    width: 30%;
                }
                .right{
                    float: right;
                    width: 70%;
                    font-size: 15px;
                    margin-top: 10px;
                }
            }
            
            
        }
        
    }
</style>
