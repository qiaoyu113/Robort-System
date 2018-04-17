<!--
author: Zhong Yanlin
create: 2017-12-01
desc:底部导航栏组件
options: listFoot
listFoot:[
  {
    imgType:链接类型
    name:导航名称
  }
]
update: 2018-01-10 by Mu Jinhong
-->
<template>
  <div class="index-bottom" id="index-bottom">
     <router-link v-for="(item, index) in listFoot" :key="item.type" :to="{ name: routeList[item.imgType]}" class="single-bottom index-page" ref="myBoxa" replace>
         <i v-if="item.imgType == footName"  class="iconfont changecolor footer-btn" v-bind:class="actIconList[item.imgType]"></i>
         <i v-else class="iconfont" v-bind:class="iconList[item.imgType]"></i>
     <!--<router-link v-for="(item, index) in listFoot" :key="item.type" :to="{ name: item.imgType == '1'? 'home' : item.imgType == '5'? 'activity':item.imgType == '4'? 'knowledge': item.imgType == '2'? 'mycenter': 'article' }" class="single-bottom index-page" ref="myBoxa" replace>-->
        <!--<i v-if="item.imgType == footName"  class="iconfont changecolor footer-btn" v-bind:class="{'icon-shouyetianchong': item.imgType == '1','icon-huodongtianchong': item.imgType == '5','icon-zhishitianchong': item.imgType == '4','icon-wodetianchong': item.imgType == '2','icon-wenzhangtianchong': item.imgType == '3'}"></i>-->
        <!--<i v-else class="iconfont" v-bind:class="{'icon-shouye1': item.imgType == '1','icon-huodong4': item.imgType == '5','icon-zhishi3': item.imgType == '4','icon-wode1': item.imgType == '2','icon-wenzhang1': item.imgType == '3'}"></i>-->
        <p>{{item.name}}</p>
    </router-link>
  </div>
</template>

<script>
    export default {
        data() {
            return{
                listFoot:[],
                footName: '',
                routePath: '',
                routeName: '',
                routeList:['','home','mycenter','article','knowledge','activity'], //通过数组来进行类型-路由映射
                iconList:['','icon-shouye1','icon-wode1','icon-wenzhang1','icon-zhishi3','icon-huodong4'], //通过数组来进行类型-路由映射
                actIconList:['','icon-shouyetianchong','icon-wodetianchong','icon-wenzhangtianchong','icon-zhishitianchong','icon-huodongtianchong'], //通过数组来进行类型-路由映射
            }
        },
        mounted() {
            const that = this;
            // 请求底部数据
           
        },
        updated: function () {
        },
        method: {
        }
        
    }
</script>

<style lang="less">
    .index-bottom {
        max-width: 450px;
        width: 100%;
        height: 1.334rem;
        background: #FFFFFF;
        box-shadow: 0 -1px 0 0 #DDDDDD;
        position: fixed;
        bottom:0;
        padding-bottom:constant(safe-area-inset-bottom);
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        z-index:20;
        .single-bottom {
            padding:.1rem 0;            
            flex:1;
            -webkit-flex:1;
            -moz-flex:1;
            text-align: center;
            display: inline-block;
            text-decoration-line:none;
            top: 0.10133rem;
            .iconfont{display:inline-block;font-size: .586rem;}
            .changecolor {color:#6699FF}
            p {
                margin-top: .10667rem;
                /*font-size: .02666rem;*/
                color: #666666;
                width: 100%;
                height: .3117rem;
                line-height: .3117rem;
            }
        }
        

    }
    @media only screen and (min-device-width:320px) and (max-device-width:374px) {
        .index-bottom .single-bottom p{font-size: 9px;}
    }
    @media only screen and (min-device-width:375px) and (max-device-width:413px) {
        .index-bottom .single-bottom p{font-size: 10px;}
    }
    @media only screen and (min-device-width:414px) and (max-device-width:474px) {
        .index-bottom .single-bottom p{font-size: 11px;}
    }
    @media only screen and (min-device-width:475px){
        .index-bottom .single-bottom p{font-size: 13px;}
    }

</style>