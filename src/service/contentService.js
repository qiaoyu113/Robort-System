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

