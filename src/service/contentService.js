import axios from './axios.js'
import qs from 'qs'

export const contentService = {
    api: {},
    // 合作伙伴
    getPartners: function (params) {
        return axios.get('/admin/partners'+ this.getParams(params));
    },
    addPartner: function (params) {
        return axios.post('/admin/partners', qs.stringify(params));
    },
    editPartner: function (params) {
        return axios.put('/admin/partners', qs.stringify(params));
    },
    disStickPartner: function (params) {
        return axios.put('/admin/partners/disstick', qs.stringify(params));
    },
    stickPartner: function (params) {
        return axios.put('/admin/partners/stick', qs.stringify(params));
    },
    getPartner: function (params) {
        return axios.get('/admin/partners' + params);
    },
    deletePartner: function (params) {
        return axios.delete('/admin/partners/' + params);
    },
    // 产品功能
    getProductFuc: function (params) {
       return axios.get('/admin/productfunctions' + this.getParams(params));
    },
    addProductFuc: function (params) {
        return axios.post('/admin/productfunctions', qs.stringify(params));
    },
    editProductFuc: function (params) {
        return axios.put('/admin/productfunctions', qs.stringify(params));
    },
    deleteProductFuc: function (params) {
        return axios.delete('/admin/productfunctions/' + params);
    },
    getProductFucInfo: function (params) {
        return axios.get('/admin/productfunctions/' + params);
    },
    // 演示视频
    getVideoDemos: function (params) { // 获得列表
        return axios.get('/admin/demovideos' + this.getParams(params));
    },
    addVideoDemo: function (params) { // 添加演示视频
        return axios.post('/admin/demovideos', qs.stringify(params));
    },
    editVideoDemo: function (params) { // 编辑演示视频
        return axios.put('/admin/demovideos', qs.stringify(params));
    },
    stickVideoDemo: function (params) { // 置顶演示视频
        return axios.put('/admin/demovideos/stick', qs.stringify(params));
    },
    disStickVideoDemo: function (params) { // 取消置顶视频
        return axios.put('/admin/demovideos/disstick', qs.stringify(params));
    },
    deleteVideoDemo: function (params) { // 删除演示视频
        return axios.delete('/admin/demovideos/' + params);
    },
    getVideoDemo: function (params) { // 获得详情
        return axios.get('/admin/demovideos/' + params);
    },
    // HotDocs代表用户
    getHotUsers: function (params) { // 获得代表人员列表
        return axios.get('/admin/hotusers' + this.getParams(params));
    },
    addHotUser: function (params) { // 添加代表人员
        return axios.post('/admin/hotusers', qs.stringify(params));
    },
    editHotUser: function (params) { // 编辑代表人员
        return axios.put('/admin/hotusers', qs.stringify(params));
    },
    deleteHotUser: function (params) { // 删除代表人员
        return axios.delete('/admin/hotusers/' + params);
    },
    getHotUser: function (params) { // 获得代表人员详情
        return axios.get('/admin/hotusers/' + params);
    },
    // 关于我们
    getIntroduces: function (params) {
        return axios.get('/admin/introductions' + this.getParams(params));
    },
    editIntroduce: function (params) {
        return axios.post('/admin/introductions', qs.stringify(params));
    },
    // 新闻管理
    getNewses: function (params) { // 获得新闻列表
        return axios.get('/admin/articles' + this.getParams(params));
    },
    addNews: function (params) { // 添加新闻
        return axios.post('/admin/articles', qs.stringify(params));
    },
    editNews: function (params) { // 编辑新闻
        return axios.put('/admin/articles', qs.stringify(params));
    },
    stickNews: function (params) { // 置顶新闻
        return axios.put('/admin/articles/stick', qs.stringify(params));
    },
    disStickNews: function (params) { // 取消置顶新闻
        return axios.put('/admin/articles/disstick', qs.stringify(params));
    },
    deleteNews: function (params) { // 删除新闻
        return axios.delete('/admin/articles/' + params);
    },
    getNews: function (params) { // 获得新闻详情
        return axios.get('/admin/articles/' + params);
    },
    // 焦点图管理
    getBanners: function (params) {
        return axios.get('/admin/banner' + this.getParams(params));
    },
    addBanner: function (params) {
        return axios.post('/admin/banner', qs.stringify(params));
    },
    editBanner: function (params) {
        return axios.put('/admin/banner', qs.stringify(params));
    },
    getBanner: function (params) {
        return axios.get('/admin/banner/' + params);
    },
    deleteBanner: function (params) {
        return axios.post('/admin/banner/status', qs.stringify(params));
    },
    // 分类
    getDicKey: function (params) {
        return axios.get('/admin/dictionarys/list' + this.getParams(params));
    },
    // 参数拼接
    getParams: function (param) {
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+ key + '=' + param[key] : url += key + '=' + param[key];
            }
        }
        return url ? '?' + url : '';
    }
}
export  default {contentService}

