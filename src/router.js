/**
 * Created by zhong on 2017/10/24.
 *
 * (resolve) =>{require(['../components/test.vue'],resolve)}
 *
 */
import Vue from 'vue'
import store from './vuex'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义全局组件
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'
import zfooter from './component/common/footer.vue'
import zhistory from './component/common/goback.vue'
import backhome from './component/common/back-home.vue'


Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)
Vue.component('z-footer', zfooter)
Vue.component('z-history', zhistory)
Vue.component('z-home', backhome)


// 定义组件

const short = (resolve) => {require(['./pages/short.vue'],resolve)}
const home = (resolve) => {require(['./pages/home/home.vue'],resolve)}
// 直播
const live = (resolve) => {require(['./pages/home/home.vue'],resolve)}
const liveDetails = (resolve) => {require(['./pages/home/home.vue'],resolve)}
//个人中心
const mycenter = (resolve) => {require(['./pages/personal/mycenter.vue'],resolve)}
const setting = (resolve) => {require(['./pages/personal/setting.vue'],resolve)}
const vip = (resolve) => {require(['./pages/personal/vip.vue'],resolve)}
const comment = (resolve) => {require(['./pages/home/comment.vue'],resolve)}
const purchase = (resolve) => {require(['./pages/personal/purchase.vue'],resolve)}
const interested = (resolve) => {require(['./pages/personal/interested.vue'],resolve)}
const collect = (resolve) => {require(['./pages/personal/collect.vue'],resolve)}
const history = (resolve) => {require(['./pages/personal/history.vue'],resolve)}
const set = (resolve) => {require(['./pages/personal/set.vue'],resolve)}
const set2 = (resolve) => {require(['./pages/personal/set2.vue'],resolve)}
const password = (resolve) => {require(['./pages/personal/password.vue'],resolve)}
const help = (resolve) => {require(['./pages/personal/help.vue'],resolve)}
const feed = (resolve) => {require(['./pages/personal/feed.vue'],resolve)}
const question = (resolve) => {require(['./pages/personal/question.vue'],resolve)}
const about = (resolve) => {require(['./pages/personal/about.vue'],resolve)}
const relation = (resolve) => {require(['./pages/personal/relation.vue'],resolve)}
const serve = (resolve) => {require(['./pages/personal/serve.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {path: '/d/:shortId', component: short},
    {name: 'home',path:'/',component: home, meta: {keepAlive: true}},
    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
    // 直播
    {name: 'live',path:'/lives',component: live},
    {name: 'liveDetails',path:'/lives/detail/:liveDetailId',component: liveDetails},
    // 个人中心
    {name: 'mycenter',path:'/mycenter',component: mycenter},
    {name: 'setting',path:'/setting',component: setting},
    {name: 'vip',path:'/vip',component: vip},
    {name: 'comment',path:'/comment',component: comment},
    {name: 'purchase',path:'/purchase',component: purchase},
    {name: 'interested',path:'/interested',component: interested},
    {name: 'collect',path:'/collect',component: collect},
    {name: 'history',path:'/history',component: history},
    {name: 'set',path:'/set',component: set},
    {name: 'set2',path:'/set2',component: set2},
    {name: 'password',path:'/password',component: password},
    {name: 'help',path:'/help',component: help},
    {name: 'feed',path:'/feed',component: feed},
    {name: 'question',path:'/question',component: question},
    {name: 'about',path:'/about',component: about},
    {name: 'relation',path:'/relation',component: relation},
    {name: 'serve',path:'/serve',component: serve},
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})

let isClient = typeof window != 'undefined' ? true : false
router.beforeEach((to, from, next) => {
    if(from.name == 'home' || from.name == 'activityList' || from.name == 'activity' || from.name == 'article' || from.name == 'columnlist' || from.name == 'knowledge' || from.name == 'articleList' || from.name == 'live'){
        if(!isClient) return
        store.state.height[from.name] = document.body.scrollTop
        // console.log(document.body.scrollTop,111);
    }
    next()
})
router.afterEach((to, from, next) => {

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
            if(!isClient) return
            window.history.pushState({}, '', window.location.href)
        } else if (store.state.fromPath[i - 1] == to.path) {
            // console.log('删除frompath',store.state.fromPath);
            store.state.fromPath.pop();
        }
    }
});

export default router