<template>
    <div id="app">
        <main>
            <!-- 左侧导航 -->
            <div class="main-left">
                <div class="logo">茶印管理后台</div>
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
                                    index="1" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>运营管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="电话委托"><router-link :to="{name:'operPhone'}">电话委托</router-link></el-menu-item>
                                    <el-menu-item index="超级用户"><router-link :to="{name:'operPhone'}">超级用户</router-link></el-menu-item>
                                    <el-menu-item index="修改流拍"><router-link :to="{name:'operPhone'}">修改流拍</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="2" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>拍品管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="组管理">组管理</el-menu-item>
                                    <el-menu-item index="专题管理">专题管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="3" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>订单管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="全部订单">全部订单</el-menu-item>
                                    <el-menu-item index="售后订单">售后订单</el-menu-item>
                                    <el-menu-item index="物流管理">物流管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="4" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="全部用户">全部用户</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="5" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>资金管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="交易记录">交易记录</el-menu-item>
                                    <el-menu-item index="审核">审核</el-menu-item>
                                    <el-menu-item index="银行卡流水">银行卡流水</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="6" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="权限设置"><router-link to="/setup/jurisdiction">权限设置</router-link></el-menu-item>
                                    <el-menu-item index="积分设置"><router-link to="/setup/integral">积分设置</router-link></el-menu-item>
                                    <el-menu-item index="会员设置"><router-link to="/setup/member">会员设置</router-link></el-menu-item>
                                    <el-menu-item index="文档设置"><router-link to="/setup/file">文档设置</router-link></el-menu-item>
                                    <el-menu-item index="标签设置"><router-link to="/setup/label">标签设置</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>

            <!-- 右侧主内容区 -->
            <div  class="main-right" >
                <div class="right-top">
                    <div class="topLeft">{{titleName}}</div>
                    <div class="topRight">
                        <div class="rightHome"><a href="www.baidu.com">网站首页</a></div>
                        <div class="User">
                            <div class="UserImg">
                                <img class="image" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=12867320,655225767&fm=27&gp=0.jpg"/>
                            </div>
                            <div class="name">吴彦祖</div>
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
    export default {
        name: 'app',
        data: function (){
            return {
                active:true,
                titleName:'',
            }
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