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

