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
        // picHead:'http://test.resource.vjuzhen.com/', // 图片资源地址
        // qrCodeDomain: 'http://test.tj.docqbot.com/d/', // 二维码地址主机头
        // api:'http://39.106.114.64:8097/', // api地址
        picHead:'http://resource.docqbot.com/', // 图片资源地址
        api:'http://admin.api.docqbot.com/', // api地址
        qrCodeDomain: 'http://tj.docqbot.com/d/', // 二维码地址主机头
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