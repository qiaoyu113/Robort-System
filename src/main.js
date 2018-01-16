import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routers from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// import VueLazyload from 'vue-lazyload'
import store from './vuex';
import './mixin/directive';
import './mixin/filter';
import VueCropper from 'vue-cropper';
import wx from 'weixin-js-sdk'
// import './assets/js/common/infinite'
// import infiniteScroll from 'vue-infinite-scroll';

// Vue.use(infiniteScroll)

//视频播放器
// require ('video.js/dist/video-js.css')
// require ('vue-video-player/src/custom-theme.css')
// import VideoPlayer from 'vue-video-player'
// VideoPlayer.config({
//   youtube: true,
//   switcher: true,
//   hls: true
// })
// Vue.use(VideoPlayer)

// 开启debug
Vue.config.debug = true
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueCropper)

// 定义全局组件
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'
import zfooter from './component/common/footer.vue'
import zhistory from './component/common/goback.vue'
import pheader from './component/personal/header.vue'
import backhome from './component/common/back-home.vue'
import poption from './component/personal/option.vue'

Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)
Vue.component('z-footer', zfooter)
Vue.component('z-history', zhistory)
Vue.component('pheader', pheader)
Vue.component('z-home', backhome)
Vue.component('poption', poption)


const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes:routers,
})

router.beforeEach((to, from, next) => {
    if(from.name == 'home' || from.name == 'activityList' || from.name == 'activity' || from.name == 'article' || from.name == 'columnlist' || from.name == 'knowledge' || from.name == 'articleList' || from.name == 'live'){
        store.state.height[from.name] = document.body.scrollTop
        // console.log(document.body.scrollTop,111);
    }
    next()
})
router.afterEach((to, from, next) => {
  // console.log('main',store.state.fromPath)
    if(store.state.height[to.name]){
        // console.log(store.state.height[to.name],222);
        setTimeout(function () {
            document.body.scrollTop = store.state.height[to.name]
        },100)
    }
    function checkUrl() {
        if(to.name=='login' || to.name=='password' || to.name=='find' || to.name=='bind' || to.name=='register') return false
        else if(to.name=='wxbaselogin' || to.name=='wxlogin' || to.name=='wblogin' || to.name=='qqlogin' || to.name=='wxbaselogin') return false
        else if(to.name=='weChatAct' || to.name=='weChatAdmin' || to.name=='wxBind' || to.name=='wxcode' || to.name=='payOk') return false
        else if(to.name=='pay' || to.name=='pay2' || to.name=='applyAdmin') return false
        else{ return true}
    }
  if( checkUrl()) {
      let i = store.state.fromPath.length-1
      // console.log('from',store.state.fromPath[i],'to',to.path);
      if(store.state.fromPath[i] != to.path){
          if(to.name != 'home'){
              if (i<2 || store.state.fromPath[i - 1] != to.path){
                  // console.log('记录frompath');
                  store.state.fromPath.push(to.path);
              }
          }else if(store.state.fromPath[i] !='home'){
              store.state.fromPath.push('home');
          }
      }

      if (i<1 || store.state.fromPath[i - 1] != to.path) {
          // console.log('增加state');
          window.history.pushState({}, '', window.location.href)
      } else if (store.state.fromPath[i - 1] == to.path) {
          // console.log('删除frompath',store.state.fromPath);
          store.state.fromPath.pop();
      }
  }
});
const app = new Vue({
  router:router,
  render :h =>h(App),
  store : store
}).$mount('#app')