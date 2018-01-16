<template>
    <div id="personal">
        <!--个人中心头部(已登录)-->
        <div class="header-per" v-if="loginFlag">
            <router-link :to="{name:'setting',params:{id : this.user.id}}">
                <div class="header-left">
                    <img v-if="user.img" :src="this.$store.state.picHead + user.img"/>
                    <img v-if="!user.img" src="../../assets/image/header.png"></div>
                <div class="header-right">
                    <div class="header-right-left">
                        <div class="header-name">{{user.name}}
                            <img v-if="grade == 1" src="../../assets/image/grade1.png" />
                            <img v-if="grade == 2" src="../../assets/image/grade2.png" />
                            <img v-if="grade == 3" src="../../assets/image/grade3.png" />
                            <img v-if="grade == 4" src="../../assets/image/grade4.png" />
                            <img v-if="grade == 5" src="../../assets/image/grade5.png" />
                            <span v-if="!grade"></span>
                        </div>
                        <div class="header-text">{{user.text}}</div>
                    </div>
                    <div class="header-right-right">
                        <img src="../../assets/image/go.png"/>
                    </div>
                </div>
            </router-link>
        </div>
        <!--个人中心头部(未登录)-->
        <div class="header-per" v-else>
            <div class="header-left">
                <img src="../../assets/image/header.png">
            </div>
            <div class="header-right">
                <router-link :to="login() ? '':{path:'login/phone'}">
                    <div class="no-user">立即登录<img src="../../assets/image/go.png"/></div>
                </router-link>
            </div>
        </div>
        <!--个人中心-->
        <div class="personal-buy">
            <!--登录状态下-->
            <router-link :to="login() ? {name:'purchased',params:{id : this.user.id}} : {name:'login',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">我的社群号主页</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'vip',params:{id : this.user.id}} : {name:'login1',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">会员中心</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'purchase',params:{id : this.user.id}} : {name:'login2',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">我的购买</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'interested',params:{id : this.user.id}} : {name:'login3',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">我的感兴趣</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'collect',params:{id : this.user.id}} : {name:'login4',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">我的收藏</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'history',params:{id : this.user.id}} : {name:'login5',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">浏览历史</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'set',params:{id : this.user.id}} : {name:'login5',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">设置</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
            <router-link :to="login() ? {name:'purchased7',params:{id : this.user.id}} : {name:'login5',params:{id : this.user.id}}">
                <div class="buy">
                    <i class="iconfont icon-xing"></i>
                    <div class="buy-right">
                        <div class="buy-text">申请社群号</div>
                        <div class="btn-mun"><span v-if="loginFlag">{{user.buymun}}</span><img src="../../assets/image/go.png"/></div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import {commonService} from '../../service/personalService'
export default {
    data () {
        return {
//                判断是否登录
            loginFlag: true,
//                钻石等级
            grade: '1',
            user:{
                id:'',
                name:'吴彦祖',
                text:'123',
                img:'',
                buymun:'0',
                activityNum:'0',
                shopNum:'0',
                collectNum:'0',
                messageNum:'0',
                shopid:'',
            },
        }
    },
    mounted:function(){

    },
    methods:{
//            增加登录前记录地址
        login(){
            return true
//            if(appService.checkLogin()){
//                return true
//            }else{
//                common.getRedirectPath(this)
//                localStorage.redirectUrl = location.href
//                return false
//            }
        }
    },
}
</script>

<style lang="less">
    body{
        background: #F9F9F9;
    }
    #personal {
        background: #F9F9F9;
        .header-per{
            width:100%;
            height:3.2rem;
            background:#fff;
            padding:0.8rem 0;
            box-sizing:border-box;
            .header-left{
                width:1.47rem;
                height:1.47rem;
                float:left;
                border-radius: 50%;
                margin-left:0.6rem;
                img{
                    width:100%;
                    height:100%;
                    border-radius: 50%;
                }
            }
            .header-right{
                width:7.52rem;
                height:1.47rem;
                float:right;
                .header-right-left{
                    width:6.6rem;
                    height:1.47rem;
                    float:left;
                    .header-name{
                        height:0.77rem;
                        line-height:0.77rem;
                        font-size: 18px;
                        color: #333333;
                        text-align: left;
                        img{
                            width:0.45rem;
                            height:0.37rem;
                            margin-left:0.1rem;
                            margin-top: .2rem;
                        }
                    }
                    .header-text{
                        height:0.7rem;
                        line-height:0.7rem;
                        opacity: 0.8;
                        font-size: 13px;
                        color: #333333;
                        text-align: left;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }
                }
                .header-right-right{
                    width:0.92rem;
                    height:1.47rem;
                    line-height:1.47rem;
                    float:left;
                    font-size:18px;
                    color:#DDDDDD;
                    img{
                        width:0.72rem;
                        height:0.72rem;
                        float:right;
                        margin-top:0.37rem;
                    }
                }
                .no-user{
                    width:7.52rem;
                    height:1.47rem;
                    line-height:1.4rem;
                    font-size: 15px;
                    color: #333333;
                    text-align: left;
                    img{
                        width:0.72rem;
                        height:0.72rem;
                        float:right;
                        margin-top:0.37rem;
                    }
                }
            }
        }
        .personal-buy{
            width:100%;
            padding-left:0.64rem;
            box-sizing: border-box;
            margin-top:0.27rem;
            background:#fff;
            a:last-child{
                .buy-right{
                    border-bottom:none;
                }
            }
            .buy{
                width:100%;
                height:1.26rem;
                overflow: hidden;
                .buy-right{
                    width:8.5rem;
                    float:right;
                    border-bottom:1px solid #EEEEEE;
                }
                i{
                    width:0.56rem;
                    height:0.56rem;
                    float:left;
                    display: block;
                    margin-top:0.32rem;
                    font-size:18px;
                }
                img{
                    width:0.56rem;
                    height:0.56rem;
                    float:left;
                    margin-top:0.3rem;
                }
                .buy-text{
                    font-size: 15px;
                    color: #333333;
                    letter-spacing: 0;
                    line-height: 1.2rem;
                    text-align: left;
                    float:left;
                }
                .btn-mun{
                    line-height:1.2rem;
                    font-size: 14px;
                    color: #BBBBBB;
                    float:right;
                    margin-right:0.2rem;
                    span{
                        float:left;
                    }
                }
            }
        }
    }
</style>