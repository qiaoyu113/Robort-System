import axios from './axios.js'
import qs from 'qs'

export const systemService = {
    api: {},
    // 分类管理
    getClassify: function (params) {
        return axios.get('/admin/dictionarys'+ this.getParams(params));
    },
    getClassifyList: function (params) {
        return axios.get('/admin/dictionarys/list'+ this.getParams(params));
    },
    getClassifyAll: function () {
        return axios.get('/admin/dictionarys/alllist');
    },
    addClassify: function (params) {
        return axios.post('/admin/dictionarys', qs.stringify(params));
    },
    editClassify: function (params) {
        return axios.put('/admin/dictionarys', qs.stringify(params));
    },
    getOneClassify: function (params) {
        return axios.get('/admin/dictionarys/' + params);
    },
    deleteClassify: function (params) {
        return axios.delete('/admin/dictionarys'+ this.getParams(params));
    },
    compare : function (prop) {
        return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
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
export  default {systemService}