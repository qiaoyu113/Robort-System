<template>
  <!--title为当前页标题
      组件要小，如遇list，只将item做成组件，其他的都写在页面中 id="home" v-set-title="title"
  -->
  <div>
  </div>
</template>

<script type="text/ecmascript-6">
  import subTitle from '../../component/live/subTitle.vue'
  import liveItem from '../../component/live/item.vue'
  import {appService} from '../../service/appService'
  export default {
    data () {
        //document.title = '直播';
        return {
            liveTitle: {
                titTxt: '直播'
            }
        }
    },
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
  body{background:#f5f5f5;}
  .live-list{
    padding:0 @size15;background:#fff;
    .item{
      .left{
        .cover{width: @size120;height: @size120;}
      }
    }
  }
</style>

