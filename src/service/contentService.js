import axios from './axios.js'
import qs from 'qs'

export const contentService = {
    api: {},
    // 合作伙伴
    getPartners: function (params) {
        console.log(params);
        return axios.get('/admin/partners'+ this.getParams(params));
    },
    addPartner: function (params) {
        return axios.post('/admin/partners', qs.stringify(params));
    },
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

