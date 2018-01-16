<template>
  <div>
    <!--存放播放器的区域-->
    <div class="live-show" v-if="isShowVideo">
      <live-video></live-video>
    </div>
    <!--直播的三种情况-->
    <div class="live-show" v-else>
      <div></div>
      <div></div>
      <div ></div>
    </div>
    <!--tab切换-->
    <div class="live-mid">
      <span class="live-mid-item cur-item" @click="howToShow(1,$event)">直播简介</span>
      <span class="live-mid-item" @click="howToShow(2,$event)">交流区</span>
      <span class="live-mid-item" @click="howToShow(3,$event)">讲师</span>
    </div>
    <!--详情介绍，交流区，讲师-->
    <div></div>

    直播详情页
  </div>
</template>

<script type="text/ecmascript-6">
  const video = (resolve) => {require(['../../component/video/video.vue'],resolve)}
  import {appService} from '../../service/appService'

  export default {
    data () {
      return {
        isShowVideo: 0, //是否显示播放器

      }
    },
    components: { 'live-video': video},
    syncData({store}) {
      /*基本规则
       * 所有不需要token的请求都放在这里
       * 这里不出现window，document等DOM元素
       * 这里获得的数据都要存储在store中
       * 写法如下
       * */
      const that = this;
      /*
       * 将所有的请求处理以数组放在promise中
       * that.data().data调用数据
       * */
      return Promise.all([
        appervice.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
        }),
        service.getParam().then(res=>{
  //                    store.state.homeStore.noticelist = res.data.datas;
        }),
      ])
    },
    computed: {
      //将存在store中的数据取出
      listImg() {
        return this.$store.state.homeStore.listImg || []
      },
      noticelist() {
        return this.$store.state.homeStore.noticelist || []
      },
    },
    mounted: function() {
      /*
       * 所有需要token的请求都放在这里
       * 可以使用DOM元素
       * 这里的数据可以放在data中
       * */
    },
    methods: {
    }
  }
</script>
<style lang="less">
  /*rem等基本设置都放在base中，不写多个*/
  @import url('../../assets/css/base.less');
</style>

