/**
 * Created by mu on 2017/12/28.
 */
import axios from './axios.js';
import qs from 'qs'
import store from '../vuex/'

export const statisticsService = {
    api:{
    },
    // 流量分析
    getFlow: function (params) {
        return axios.get('/admin/statistics/flow'+ this.getParams(params));
    },
    getParams: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    }
}
export default {statisticsService}