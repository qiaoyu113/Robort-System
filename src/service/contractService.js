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
        return axios.post('/admin/productpkgs/up_down', qs.stringify(params));
    },
    removePkgTemplate: function (params) { // 移除
        return axios.delete('/admin/productpkgs/removetemplate' + this.getParams(params));
    },
    isStick: function (params) { // 置顶
        return axios.put('/admin/productpkgs/stick', qs.stringify(params));
    },
    isCancelStick: function (params) { // 取消置顶
        return axios.put('/admin/productpkgs/disstick', qs.stringify(params));
    },
    isOnline: function (id, params) { // 上架、下架
        return axios.put('/admin/productpkgs/close/' + id, qs.stringify(params));
    },
    contractPackageAndTemplate: function (params) { // 产品包添加模板
        return axios.put('/admin/productpkgs/addtemplates', qs.stringify(params));
    },
    getScanNum: function (params) {
        return axios.get('/admin/users/watch' + this.getParams(params));
    },
    // 合同模板
    getTemplates: function (params) { // 获取模板列表
        return axios.get('/admin/templates' + this.getParams(params));
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
    getTemplateAll: function (params) {
        return axios.get('/admin/templates/list' + this.getParams(params));
    },
    isOnlineOfTemplate: function (id, params) {
        return axios.put('/admin/templates/close/' + id , qs.stringify(params));// id
    },
    // 定制服务
    getServicesInfo: function (params) { // pageNo,pageSize,status:0.待审核1.审核通过2.审核未通过,phone
        return axios.get('/admin/varifyinfos' + this.getParams(params));
    },
    getServiceOne: function (params) {// id
        return axios.get('/admin/varifyinfos/' + params);
    },
    agreeService: function (params) {
        return axios.put('/admin/varifyinfos/agree', qs.stringify(params));
    },
    refuseService: function (params) {
        return axios.put('/admin/varifyinfos/refuse', qs.stringify(params));
    },
    getHotDogsTemplate: function (params) { // 获得HotDog模板
       return axios.get('/admin/hotdocs/templates' + this.getParams(params));
    },
    getPackage: function (params) { // 获取产品包信息
        return axios.get('/admin/productpkgs/list' + this.getParams(params));
    },
    // 合同模板分类
    getTemplateType: function (params) {
        return axios.get('/admin/dictionarys/list' + this.getParams(params));
    },
    // 演示视频下拉菜单
    getVideoDemo: function (params) {
        return axios.get('/admin/demovideos/list' + this.getParams(params));
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
