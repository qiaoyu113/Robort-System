import axios from './axios.js'
import qs from 'qs'

export const loginService = {
    api: {},
    // 登录
    login: function(params) {
        return axios.post('/tokens/password', qs.stringify(params));
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
export default {loginService}
