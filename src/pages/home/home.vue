<template>
    <div id="app">
        <main>
            <!-- 左侧导航 -->
            <div class="main-left">
                <div class="logo">合同机器人</div>
                <el-row class="tac">
                    <el-col>
                        <el-menu ref="menu"
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
                                    <i class="iconfont icon-neirong"></i>
                                    <span>合同管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="产品包"><router-link to="/contract/product">产品包</router-link></el-menu-item>
                                    <!--<el-menu-item index="合同模板"><router-link :to="{}/contract/template">合同模板</router-link></el-menu-item>-->
                                    <el-menu-item index="合同模板"><router-link :to="{name: 'contractTemplate',params:{templateTyp: '1'}}">合同模板</router-link></el-menu-item>
                                    <!--<el-menu-item index="定制服务"><router-link to="/contract/service">定制服务</router-link></el-menu-item>-->
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="8" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="iconfont icon-huodong3"></i>
                                    <span>内容管理</span>
                                </template>
                                <el-menu-item-group>
                                    <!--<el-menu-item index="合作伙伴"><router-link to="/content/partner">合作伙伴</router-link></el-menu-item>-->
                                    <el-menu-item index="合作伙伴"><router-link :to="{name: 'partner', params:{partnerTyp: '1'}}">合作伙伴</router-link></el-menu-item>
                                    <el-menu-item index="产品功能"><router-link to="/content/product">产品功能</router-link></el-menu-item>
                                    <el-menu-item index="价值定位"><router-link to="/content/value">价值定位</router-link></el-menu-item>
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
                                    <i class="iconfont icon-qud"></i>
                                    <span>渠道管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="自建渠道"><router-link to="/channel/self">自建渠道</router-link></el-menu-item>
                                    <el-menu-item index="用户渠道"><router-link to="/channel/users">用户渠道</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="4" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="iconfont icon-qunzu"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="用户管理"><router-link to="/users">用户管理</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="2" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="iconfont icon-xinxi"></i>
                                    <span>消息管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="站内信"><router-link to="/message/messages">站内信</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="3" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="iconfont icon-qianbao"></i>
                                    <span>财务管理</span>
                                </template>
                                <el-menu-item-group>
                                    <!--<el-menu-item index="提现审核"><router-link to="/financial/manage">提现审核</router-link></el-menu-item>-->
                                    <el-menu-item index="提现审核"><router-link :to="{name: 'manage',params:{tabIndex: '0'}}">提现审核</router-link></el-menu-item>
                                    <el-menu-item index="账户总览"><router-link to="/financial/accounts">账户总览</router-link></el-menu-item>
                                    <el-menu-item index="订单管理"><router-link to="/financial/orders">订单管理</router-link></el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu
                                    index="9" background-color="#304156" text-color="#fff" active-text-color="#fff">
                                <template slot="title">
                                    <i class="iconfont icon-shezhi"></i>
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
                        <div class="User" @click="show">
                            <div class="UserImg">
                                <img class="image" :src="adminPhoto"/>
                            </div>
                            <div class="name">{{adminName}}</div>
                        </div>
                        <div class="logout" v-if="showl" @click="logout">退出</div>
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
    import axios from 'axios'
    export default {
        name: 'app',
        data: function (){
            return {
                active:true,
                titleName:'',
                adminPhoto: '',
                adminName: '',
                showl:false,
            }
        },
        mounted () {
            // 富文本编辑器，本地图片上传
            localStorage.beforeA = axios.defaults.baseURL + '/ckFiles';
            localStorage.afterB = 'http://' + window.location.host + '/editor/image';
            // 获得管理员信息
            this.getAdminInfo();
            var r = this.$route.name
            var that =this
                /*case:{name: 'jurisdiction',path:'/setup/jurisdiction',component: jurisdiction},
                {name: 'integral',path:'/setup/integral',component: integral},
                {name: 'member',path:'/setup/member',component: member},
                {name: 'file',path:'/setup/file',component: file},
                {name: 'label',path:'/setup/label',component: label},
                {name: 'operPhone',path:'/operation/operPhone',component: operPhone},*/
//                产品7，内容8，渠道1，用户4，消息2，财务3，系统9
            console.log(this.$refs.menu);
            this.$refs.menu.open(7);
            switch (r) {
                case 'sysClassify': that.titleName = "字典设置";this.$refs.menu.open(9);break;
                case 'sysAccount' : that.titleName = "账号设置";this.$refs.menu.open(9);break;
                case 'productPackage' : that.titleName = "产品包";this.$refs.menu.open(7);break;
                case 'productAdd' : that.titleName = "产品包";this.$refs.menu.open(7);break;
                case 'productEdit' : that.titleName = "产品包";this.$refs.menu.open(7);break;
                case 'productDetail' : that.titleName = "产品包";this.$refs.menu.open(7);break;
                case 'productScan' : that.titleName = "产品包";this.$refs.menu.open(7);break;
                case 'contractTemplateAdd' : that.titleName = "合同模板";this.$refs.menu.open(7);break;
                case 'contractTemplateEdit' : that.titleName = "合同模板";this.$refs.menu.open(7);break;
                case 'contractTemplateScan' : that.titleName = "合同模板";this.$refs.menu.open(7);break;
                case 'contractTemplate' : that.titleName = "合同模板";this.$refs.menu.open(7);break;
                case 'contractServices' : that.titleName = "合同模板";this.$refs.menu.open(7);break;
                case 'contractServiceDetail' : that.titleName = "合同模板";this.$refs.menu.open(7);break;
                case 'partner' : that.titleName = "合作伙伴";this.$refs.menu.open(8);break;
                case 'partnerAdd' : that.titleName = "合作伙伴";this.$refs.menu.open(8);break;
                case 'partnerEdit' : that.titleName = "合作伙伴";this.$refs.menu.open(8);break;
                case 'productFunc' : that.titleName = "产品功能";this.$refs.menu.open(8);break;
                case 'productValue' : that.titleName = "价值定位";this.$refs.menu.open(8);break;
                case 'videoDemo' : that.titleName = "演示视频";this.$refs.menu.open(8);break;
                case 'videoDemoAdd' : that.titleName = "演示视频";this.$refs.menu.open(8);break;
                case 'videoDemoEdit' : that.titleName = "演示视频";this.$refs.menu.open(8);break;
                case 'HotDocs' : that.titleName = "HotDocs代表用户";this.$refs.menu.open(8);break;
                case 'HotDocsAdd' : that.titleName = "HotDocs代表用户";this.$refs.menu.open(8);break;
                case 'HotDocsEdit' : that.titleName = "HotDocs代表用户";this.$refs.menu.open(8);break;
                case 'aboutUs' : that.titleName = "关于我们";this.$refs.menu.open(8);break;
                case 'news' : that.titleName = "新闻管理";this.$refs.menu.open(8);break;
                case 'newsAdd' : that.titleName = "新闻管理";this.$refs.menu.open(8);break;
                case 'newsEdit' : that.titleName = "新闻管理";this.$refs.menu.open(8);break;
                case 'banner' : that.titleName = "焦点图管理";this.$refs.menu.open(8);break;
                case 'messages' : that.titleName = "站内信";this.$refs.menu.open(2);break;
                case 'manage' : that.titleName = "提现审核";this.$refs.menu.open(3);break;
                case 'accounts' : that.titleName = "账户总览";this.$refs.menu.open(3);break;
                case 'orders' : that.titleName = "订单管理";this.$refs.menu.open(3);break;
                case 'order-detail' : that.titleName = "订单管理";this.$refs.menu.open(3);break;
                case 'refund' : that.titleName = "提现审核";this.$refs.menu.open(3);break;
                case 'users' : that.titleName = "用户管理";this.$refs.menu.open(4);break;
                case 'user-detail' : that.titleName = "用户管理";this.$refs.menu.open(4);break;
                case 'channelSelf' : that.titleName = "渠道管理";this.$refs.menu.open(1);break;
                case 'channelUser' : that.titleName = "渠道管理";this.$refs.menu.open(1);break;
                case 'channelDetail' : that.titleName = "渠道管理";this.$refs.menu.open(1);break;
                default:break;
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            select(key,keyPath,indexPath){
                //console.log(key,keyPath,indexPath._uid);
                this.titleName = key
            },
            show(){
                this.showl = true;
            },
            logout(){
                localStorage.removeItem('token')
                this.$router.push({name:'login'})
            },
            getAdminInfo () {
                let that=this;
                financialService.getAdminInfo().then(function(res){
                    //console.log('当前管理员信息', res);
                    if(res.data.code == 200){
                        let obj = res.data.datas;
                        that.adminPhoto = that.$store.state.picHead + obj.hostLogo;
                        that.adminName = obj.hostName;
                        if(that.$route.path=='/'){
                            that.$router.push({name: 'productPackage'});
                        }
                    }else{
                        that.$message.error(res.data.message);
                    }
                })
            }
        }
    }
</script>

<style lang="less" scope>
    @import "../../assets/css/icon/iconfont.css";
    body{margin: 0;}
    #app {
        min-width: 1200px;
        margin: 0 auto;
        font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
        .logout{
            position: absolute;
            top: 60px;
            border: 1px solid #f0f0f0;
            width: 100px;
            height: 40px;
            line-height: 40px;
            right: 120px;
            text-align: center;
            cursor: pointer;
        }
    }

    /* 主内容区 */
    a{text-decoration: none;color: inherit;}
    main{  min-width: 1200px;  display: -webkit-box;  display: -ms-flexbox;  display: flex;  position:fixed; top:0;left:0;right:0;bottom:0;margin:auto;overflow:overlay; background-color: #FCFCFC;  }
    main .main-left{position:absolute;text-align: center;width: 181px;height:100%;float: left;background:#304156; overflow-y: scroll;}
    main .main-left::-webkit-scrollbar {display:none}
    main .main-left .logo{width:100%;height:60px;font-size:16px;font-weight: bold;line-height:60px;color:#BFCBD9;}
    main .main-left .el-menu{background:#304156;}
    .el-submenu .el-menu-item{min-width:180px;
      a{display:block;width:100%;height:100%;}
    }
    .el-menu-item.is-active{color:#3792FF !important;background:#1F2D3D;}
    .el-menu-item-group{background:#1F2D3D;}
    /*.is-opened{background:#1F2D3D;}*/
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover{background:#1F2D3D;}
    .el-submenu .el-menu-item, .el-submenu__title{color:#BFCBD9;text-align:left;}
    main .main-right{  position: absolute;left:180px;right:0;top:0;bottom:0;margin:auto;-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff;overflow: scroll;}
    .right-top{width:100%;height:60px;border-bottom: 1px solid #e6e6e6;padding:0 40px;box-sizing: border-box;}
    .right-top .topLeft{width:300px;height:60px;line-height:60px;float:left;font-size: 14px;color:#97a8be;font-weight: bold;}
    .right-top .topRight{width:300px;height:60px;float:right;}
    .right-top .topRight .rightHome{width:100px;float:left;line-height:60px;}
    .right-top .topRight .User{width:200px;height:60px;line-height:60px;text-align: center;float:left;}
    .right-top .topRight .User .UserImg{width:40px;height:40px;border-radius: 100%;float:left;border:2px solid #eeeeee;overflow: hidden;margin-top:10px;}
    .right-top .topRight .User .UserImg .image{width:100%;height:100%;}
    .right-top .topRight .User .name{float:left;width:80px;text-align: center;color:#969896;line-height: 60px;font-size: 14px;}
    .el-submenu__title i{width:24px;height:18px;font-size:18px;color:#BFCBD9;}
</style>