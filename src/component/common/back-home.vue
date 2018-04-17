<!--
author: Zhong Yanlin
create: 2017-12-01
desc:在任何页面增加一个返回主页按钮
options: none
-->
<template>
  <div id="back-home" >
    <router-link :to="{name:'home'}">
        <div class="back-home-btn">
          <i class="iconfont footer-btn icon-shouyetianchong"></i>
        </div>
    </router-link>
  </div>
</template>

<script>
    export default {
        props:['type'],
        mounted: function() {
            //console.log(this.$route.fullPath);
        },
        methods: {
        }
    }
</script>

<style  lang="less" scoped>
    #back-home{
        position: fixed;
        bottom:2rem;
        right:.5rem;
        z-index:1000;
    }
  .back-home-btn{
      height: 1.4rem;
      width: 1.4rem;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
      line-height:1.4rem;
      text-align:center;
      .icon-shouyetianchong {
          font-size: .73rem;
      }
  }
</style>
