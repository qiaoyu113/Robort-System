import axios from './axios.js'
import qs from 'qs'

export const contractService = {
    api: {},
    // 产品包管理
    getProductPackages: function (params) {
        return axios.get('/admin/productpkgs' + this.getParams(params));
    },
    addProductPackage: function (params) {
        return axios.post('/admin/productpkgs', qs.stringify(params));
    },
    editProductPackage: function (params) {
        return axios.put('/admin/productpkgs', qs.stringify(params));
    },
    deleteProductPackage: function (params) {
        return axios.delete('/admin/productpkgs/' + params);
    },
    getProductPackage: function (params) {
        return axios.get('/admin/productpkgs/' + params);
    },
    moveUpAndDown: function (params) { // 上移、下移
        return axios.delete('/admin/productpkgs/up_down', qs.stringify(params));
    },
    isStick: function (params) { // 置顶
        return axios.put('/admin/productpkgs/stick', qs.stringify(params));
    },
    isCancelStick: function (params) { // 取消置顶
        return axios.put('/admin/productpkgs/disstick', qs.stringify(params));
    },
    isOnline: function (params) { // 上架、下架
        return axios.put('/admin/productpkgs/close/', qs.stringify(params));
    },
    contractPackageAndTemplate: function (params) {
        return axios.put('/admin/productpkgs/addtemplates', qs.stringify(params));
    },
    // 合同管理
    getTemplates: function (params) { // 获取模板列表
        return axios.get('/admin/templates/' + this.getParams(params));
    },
    addOneTemplate: function (params) { // 添加一个模板
        return axios.post('/admin/templates', qs.stringify(params));
    },
    editOneTemplate: function (params) { // 编辑一个模板
        return axios.put('/admin/templates', qs.stringify(params));
    },
    deleteOneTemplate: function (params) { // 删除一个模板
        return axios.delete('/admin/templates/' + params);//templateId
    },
    getOneTemplate: function (params) { // 获取一个模板信息
        return axios.get('/admin/templates/' + params);// id
    },
    getTemplateType: function (params) { // 获取模板分类
        return axios.get('/admin/dictionarys/list' + this.getParams(params));
    },
    getHotDogsTemplate: function (params) {
       return axios.get('/admin/hotdocs/templates' + this.getParams(params));
    },
    getParams: function (param) {
        let url = '';
        for(let key in param){
            if(param[key] !== null){
               url ? url += '&'+ key + '=' + param[key] : url += key + '=' + param[key];
            }
        }
        return url ? '?' + url: ''
    }
}
export default {contractService}
