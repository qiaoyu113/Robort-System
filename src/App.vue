<template>
    <div id="app" class="scroll">
        <!--<router-view class="view"></router-view>-->
        <keep-alive >
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <div class="clearB"></div>
    </div>
</template>

<script>
    import {appService} from './service/appService'
    import Vue from 'vue'
    import Element from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    Vue.use(Element)

    export default {
        name: 'app',
        components: {},
        mounted: function () {
            /*if(appService.getUserInfo()) {
             let now = new Date()
             //                console.log(this.$store.state.userInfo.exp*1000);
             //                console.log(now.getTime());
             let t = this.$store.state.userInfo.exp*1000 - now.getTime() ;   //时间差的毫秒数
             let h = Math.floor(t/(3600*1000))
             if(h<3){
             appService.putToken()
             }
             }*/
            if(!appService.checkLogin()){
                this.$router.push({name:'login'})
            }
        },
        methods: {
        }
    }
</script>

<style lang="less">
    /*@import url('assets/css/base.less');*/
    @import url('assets/css/icon/iconfont.css');
    @import "./assets/css/theme.less";
    @import './assets/css/common/swiper.min.css';
    @import './assets/css/base.less';
    html, body {
        margin: 0 auto;
        width: 100%;
        word-wrap: break-word;
        /*overflow: scroll;*/
        height: 100%;
        /*max-width: 450px;*/
        position:relative;
    }
    body {
        font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif;
    }
    p{margin: 0;}
    #home {
        padding-bottom: 65px;
    }
    .omit {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    /* 弹层样式重置 */
    .el-table th{background:#f5f7fa!important;}
    .el-table td{font-size:14px;color:#333!important;}
    .el-pagination{margin-top:20px;text-align:right;}
    .v-modal{display:none!important;}
    .el-dialog__wrapper{margin-top:0!important;background:rgba(0,0,0,.3)!important;display:flex;justify-content: center;align-items: center;}
</style>