/**
 * Created by 乔宇 on 2017/12/27.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'

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
    getUserGroupUsers: function (id) {
        return axios.get('/admin/groups/'+id+"/users");
    },
    move2group: function () {
        return axios.put('/admin/groups/move2group'+ this.getParam(params));
    },
    removeGroupUser: function () {
        return axios.delete('/admin/groups/remove'+ this.getParam(params));
    },
    /* 获取所有用户列表 */
    getUserList: function () {
        return axios.post('/admin/users/');
    },
    /* 发送站内信 */
    sendMessages: function (params) {
        return axios.post('/admin/innerletters/' + this.getParam(params));
    },
    getMessages: function () {
        return axios.get('/admin/innerletters/');
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