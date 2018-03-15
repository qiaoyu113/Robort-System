<template>
    <div id="app">
        <main>
            <!-- 左侧导航 -->
            <div class="main-left">
                <div class="logo">合同机器人</div>
                <el-row class="tac">
                    <el-col>
                        <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @select="select"
                                @close="handleClose"
                                text-color="#BFCBD9"
                                active-text-color="#FF9E40">
                            <el-submenu
                                    index="7" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span>合同管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="产品包"><router-link to="/contract/product">产品包</router-link></el-menu-item>
                                    <el-menu-item index="合同模板"><router-link to="/contract/template">合同模板</router-link></el-menu-item>
                                    <el-menu-item index="定制服务"><router-link to="/contract/service">定制服务</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="8" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>内容管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="合作伙伴"><router-link to="/content/partner">合作伙伴</router-link></el-menu-item>
                                    <el-menu-item index="产品功能"><router-link to="/content/product">产品功能</router-link></el-menu-item>
                                    <el-menu-item index="演示视频"><router-link to="/content/video">演示视频</router-link></el-menu-item>
                                    <el-menu-item index="HotDocs代表用户"><router-link to="/content/hotdocs">HotDocs代表用户</router-link></el-menu-item>
                                    <el-menu-item index="关于我们"><router-link to="/content/about">关于我们</router-link></el-menu-item>
                                    <el-menu-item index="新闻管理"><router-link to="/content/news">新闻管理</router-link></el-menu-item>
                                    <!--<el-menu-item index="评论管理"><router-link to="/content/comment">评论管理</router-link></el-menu-item>-->
                                    <el-menu-item index="焦点图管理"><router-link to="/content/banner">焦点图管理</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="1" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>渠道管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="自建渠道"><router-link to="/share/index">自建渠道</router-link></el-menu-item>
                                    <el-menu-item index="用户渠道"><router-link to="/content/users">用户渠道</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="4" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="用户管理"><router-link to="/users">用户管理</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="2" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>消息管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="站内信"><router-link to="/message/messages">站内信</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="3" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>财务管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="提现审核"><router-link to="/financial/manage">提现审核</router-link></el-menu-item>
                                    <el-menu-item index="账户总览"><router-link to="/financial/accounts">账户总览</router-link></el-menu-item>
                                    <el-menu-item index="订单管理"><router-link to="/financial/orders">订单管理</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="9" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    <span>系统设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="字典设置"><router-link to="/system/classify">字典设置</router-link></el-menu-item>
                                    <el-menu-item index="帐号设置"><router-link to="/system/account">帐号设置</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <!-- 右侧主内容区 -->
            <div  class="main-right">
                <div class="right-top">
                    <div class="topLeft">{{titleName}}</div>
                    <div class="topRight">
                        <div class="rightHome"><a href="http://www.docqbot.com " target="_blank">网站首页</a></div>
                        <div class="User">
                            <div class="UserImg">
                                <img class="image" :src="adminPhoto"/>
                            </div>
                            <div class="name">{{adminName}}</div>
                        </div>
                    </div>
                </div>
                <!--展示内容-->
                <div class="showBox">
                    <router-view></router-view>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import {financialService} from '../../service/financialService.js'
    export default {
        name: 'app',
        data: function (){
            return {
                active:true,
                titleName:'',
                adminPhoto: '',
                adminName: ''
            }
        },
        mounted () {
            this.getAdminInfo();
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            select(key,keyPath,indexPath){
                console.log(key,keyPath,indexPath._uid);
                this.titleName = key
            },
            getAdminInfo () {
                let that=this;
                financialService.getAdminInfo().then(function(res){
                    //console.log('当前管理员信息', res);
                    if(res.data.code == 200){
                        let obj = res.data.datas;
                        that.adminPhoto = that.$store.state.picHead + obj.hostLogo;
                        that.adminName = obj.hostName;
                    }else{
                        that.$message.error(res.data.message);
                    }
                })
            }
        }
    }
</script>

<style>
    body{margin: 0;}
    #app {
        min-width: 1200px;
        margin: 0 auto;
        font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
    }

    /* 主内容区 */
    a{text-decoration: none;color: inherit;}
    main{  min-width: 1200px;  display: -webkit-box;  display: -ms-flexbox;  display: flex;  position:fixed; top:0;left:0;right:0;bottom:0;margin:auto;overflow:overlay; background-color: #FCFCFC;  }
    main .main-left{position:absolute;text-align: center;width: 181px;height:100%;float: left;background:#304156; overflow-y: overlay;}
    main .main-left::-webkit-scrollbar {display:none}
    main .main-left .logo{width:100%;height:60px;font-size:16px;font-weight: bold;line-height:60px;color:#BFCBD9;}
    main .main-left .el-menu{background:#304156;}
    .el-submenu .el-menu-item{min-width:180px;}
    .el-menu-item.is-active{color:#3792FF !important;background:#1F2D3D;}
    .el-menu-item-group{background:#1F2D3D;}
    /*.is-opened{background:#1F2D3D;}*/
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover{background:#1F2D3D;}
    .el-submenu .el-menu-item, .el-submenu__title{color:#BFCBD9;text-align:left;}
    main .main-right{  position: absolute;left:180px;right:0;top:0;bottom:0;margin:auto;-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff;overflow: overlay;}
    .right-top{width:100%;height:60px;border-bottom: 1px solid #e6e6e6;padding:0 40px;box-sizing: border-box;}
    .right-top .topLeft{width:300px;height:60px;line-height:60px;float:left;font-size: 14px;color:#97a8be;font-weight: bold;}
    .right-top .topRight{width:300px;height:60px;float:right;}
    .right-top .topRight .rightHome{width:100px;float:left;line-height:60px;}
    .right-top .topRight .User{width:200px;height:60px;line-height:60px;text-align: center;float:left;}
    .right-top .topRight .User .UserImg{width:40px;height:40px;border-radius: 100%;float:left;border:2px solid #eeeeee;overflow: hidden;margin-top:10px;}
    .right-top .topRight .User .UserImg .image{width:100%;height:100%;}
    .right-top .topRight .User .name{float:left;width:80px;text-align: center;color:#969896;line-height: 60px;font-size: 14px;}
</style>