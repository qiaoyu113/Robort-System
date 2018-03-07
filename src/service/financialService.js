/**
 * Created by 乔宇 on 2017/12/27.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'
const api = "http://6fpqir.natappfree.cc"

export const financialService = {
    api: {},
    /* 管理员信息 */
    getAdminInfo: function () {
        return axios.get('/admin/adminUsers/me');
    },
    postAdminInfo: function (params) {
        return axios.post('/admin/adminUsers/'+params.id+ this.getParam(params));
    },
    /* 账单列表 */
    getwallets: function (params) {
        return axios.get('/admin/wallets'+ this.getParam(params));
    },
    exportwallets: function () {
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
    exportOrders: function () {
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
    /* 提现审核 */
    getvarifyinfos: function (params) {
        return axios.get('/admin/varifyinfos'+ this.getParam(params));
    },
    passvarifyinfo: function () {
        return axios.get('/admin/varifyinfos'+ this.getParam(params));
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