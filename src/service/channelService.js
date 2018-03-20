import axios from './axios.js'
import qs from 'qs'

export const channelService = {
    api: {},
    // 渠道管理
    getChannels: function (params) {
        return axios.get('/admin/channel'+ this.getParams(params));
    },
    addChannel: function (params) {
        return axios.post('/admin/channel', qs.stringify(params));
    },
    editChannel: function (params) {
        return axios.put('/admin/channel', qs.stringify(params));
    },
    getChannel: function (params) {
        return axios.get('/admin/channel/' + params.id);
    },
    deleteChannel: function (params) {
        return axios.delete('/admin/channel'+ this.getParams(params));
    },
    // 分销
    getDistributions: function (params) {
        return axios.get('/admin/distributions'+ this.getParams(params));
    },
    addDistribution: function (params) {
        return axios.post('/admin/distributions', qs.stringify(params));
    },
    deleteDistribution: function (params) {
        return axios.delete('/admin/distributions'+ this.getParams(params));
    },
    getContentList: function (params) {
        return axios.get('/admin/distributions/models'+ this.getParams(params));
    },
    // 用户渠道
    getUserChannels: function (params) {
      return axios.get('/admin/users/invite'+ this.getParams(params));
    },
    // 奖励规则
    getRewards: function (params) {
        return axios.get('/rewards'+ this.getParams(params));
    },
    modifyRewards: function (params) {
        return axios.put('/rewards', qs.stringify(params));
    },
    // 渠道导出管理
    exportChannelInfo: function (domain,params) {
        window.open(domain + '/admin/export/channel'+ this.getParams(params));
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
export  default {channelService}

