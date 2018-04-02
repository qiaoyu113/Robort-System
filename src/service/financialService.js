/**
 * Created by 乔宇 on 2017/12/27.
 */
import axios from './axios.js'
import qs from 'qs'

export const financialService = {
    api: {},
    /* 管理员信息 */
    getAdminInfo: function () {
        return axios.get('/admin/adminUsers/me');
    },
    postPassword: function (params) {
        return axios.post('/admin/adminUsers/resetPwd',qs.toString(params));
    },
    postAdminInfo: function (params) {
        return axios.post('/admin/adminUsers/'+params.id+ this.getParam(params));
    },
    /* 账单列表 */
    getwallets: function (params) {
        return axios.get('/admin/wallets'+ this.getParam(params));
    },
    exportwallets: function (api) {
        window.location.href = api + "/admin/export/wallet"
        // return axios.get('/admin/export/wallet');
    },
    /* 获取提现审核 */
    getUserGroupUsers: function (id) {
        return axios.get('/admin/groups/'+id+"/users");
    },
    move2group: function () {
        return axios.put('/admin/groups/move2group'+ this.getParam(params));
    },
    removeGroupUser: function () {
        return axios.delete('/admin/groups/remove'+ this.getParam(params));
    },
    /* 获取订单 */
    getOders: function (params) {
        return axios.get('/admin/orders/'+ this.getParam(params));
    },
    exportOrders: function (api) {
        window.location.href= api + "/admin/export/order"
        // return axios.get('/admin/export/wallet');
    },
    /*获取订单详情*/
    getOdersNo: function (params) {
        return axios.get('/admin/orders/orderNo'+ this.getParam(params));
    },
    getuserId: function (params) {
        return axios.get('/admin/users/'+ params);
    },
    editRemark: function (params) {
        return axios.put('/admin/orders/edit', qs.stringify(params));
    },
    /* 提现审核 */
    getvarifyinfos: function (params) { // pageNo,pageSize,status:0.待审核1.审核通过2.审核未通过,phone
        return axios.get('/admin/varifyinfos' + this.getParam(params));
    },
    getvarifydetail: function (params) {// id 获得服务详情
        return axios.get('/admin/varifyinfos/' + params);
    },
    agreeVarify: function (params) {
        return axios.put('/admin/varifyinfos/agree', qs.stringify(params));
    },
    refuseVarify: function (params) {
        return axios.put('/admin/varifyinfos/refuse', qs.stringify(params));
    },
    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null && param[key] != ''){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    },
}