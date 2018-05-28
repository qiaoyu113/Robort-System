/**
 * Created by 乔宇 on 2017/12/27.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'
// const api = "http://6fpqir.natappfree.cc"
const api = 'http://39.106.114.64:8097';

export const userService = {
    api: {},
    /* 获取用户组 */
    getUserGroups: function () {
        return axios.get('/admin/groups/list');
    },
    postUserGroups: function (params) {
        return axios.post('/admin/groups'+ this.getParam(params));
    },
    putUserGroups: function (params) {
        return axios.put('/admin/groups'+ this.getParam(params));
    },
    deleteUserGroups: function (params) {
        return axios.delete('/admin/groups'+ this.getParam(params));
    },
    /* 获取用户组组员信息 */
    getGroupUsers: function (params) {
        return axios.get("/admin/groups/"+params.id+"/users/"+ this.getParam(params));
    },
    move2group: function (params) {
        return axios.put('/admin/groups/move2group'+ this.getParam(params));
    },
    removeGroupUser: function (params) {
        return axios.put('/admin/groups/remove'+ this.getParam(params));
    },
    /* 获取所有用户列表 */
    getUserList: function () {
        return axios.post('/admin/users/');
    },
    exportUserList: function (api) {
        window.location.href = api + "/admin/export/user"
    },
    /* 发送站内信 */
    sendMessages: function (params) {
        return axios.post('/admin/innerletters/' + this.getParam(params));
    },
    getMessages: function (params) {
        return axios.get('/admin/innerletters/'+ this.getParam(params));
    },
    getUsers: function (params) {
        return axios.get('/admin/users/'+ this.getParam(params));
    },
    getUserInfo: function (params) {
        return axios.get('/admin/users/'+params);
    },
    getUserRecords: function (params) {
        return axios.get('/admin/users/' + params + '/watch');
    },
    /* 发送邮件 */
    sendEmails: function (params) {
        return axios.post('/email/', qs.stringify(params));
    },
    getEmails: function (params) {
        return axios.get('/email/'+ this.getParam(params));
    },
    /* 发送短信 */
    saveTexts: function (params) {
        return axios.post('/admin/sms/tempate/', qs.stringify(params));
    },
    deleteTexts: function (params) {
        return axios.delete('/admin/sms/template/'+params);
    },
    sendTexts: function (params) {
        return axios.post('/admin/sms/send/', qs.stringify(params));
    },
    getTexts: function (params) {
        return axios.get('/admin/sms/history'+ this.getParam(params));
    },
    getTextTemps: function (params) {
        return axios.get('/admin/sms/template'+ this.getParam(params));
    },
    getTempList: function () {
        return axios.get('/admin/sms/tempate/list');
    },
    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    },
}