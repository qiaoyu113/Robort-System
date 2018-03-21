/**
 * Created by LXH on 2017/11/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import homeStore from './modules/homeStore'

const store = new Vuex.Store({
    // 定义状态
    state: {
        picHead:'http://test.resource.vjuzhen.com/', // 图片资源地址
        qrCodeDomain: 'http://saqw.cn/d/123456/', // 二维码地址主机头
        indexLogo:'',
        indexName:'',
        fromPath:['home'],
        height:{}
    },
    mutations:{
    },
    actions: {
    },
    modules: {
        homeStore: homeStore,
    }
})
export default store