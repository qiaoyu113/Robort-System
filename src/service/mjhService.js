/**
 * Created by mu on 2017/12/28.
 */
import axios from './axios.js';
import qs from 'qs'
import store from '../vuex/'

export const mjhService = {
    api:{
    },
    /*  评论接口（接收）  */
    getComments:function(level,pageNo,pageSize,parentId,typeId,type){
        return axios.get('/comments'+ this.getParam(level,pageNo,pageSize,parentId,typeId,type));
    },
    /*  评论接口（发送）
    * id,parentId,type,typeId,typeTitle,
    * originalUserId,originalUserName,userId, userName,
    * userHeadImg,content,commentTime,top,show,admin,adminId
    * */
    postComments:function(param){
        return axios.post('/comments',qs.stringify(param));
    },
    /*  收藏接口 */
    getCollect:function(articleId,params){
        return axios.post('/shops/999999/articles/'+ articleId + '/collect',qs.stringify(params));
    },
    /*  点赞接口 */
    getLike:function(params){
        return axios.post('/shops/999999/cdks/login',qs.stringify(params));
    },
    /*  是否点赞收藏 */
    hasLike:function(params){
        return axios.get('/shops/999999/users/collect/exist'+ this.getParam(params));
    },
    /*  点赞数（文章详情） */
    hasLikeNum:function(params){
        return axios.get('/shops/999999/articles/'+ params);
    },
    /*  点击赞/取消赞 */
    BtnLikeNum:function(id,params){
        return axios.post('/shops/999999/articles/'+ id +'/like',qs.stringify(params));
    },
    /*  点击收藏/取消点击收藏(文章) */
    BtnCollectNum:function(id,params){
        return axios.post('/shops/999999/articles/'+ id +'/collect',qs.stringify(params));
    },
    /*  点击收藏/取消点击收藏(活动) */
    BtnCollectAct:function(id,params){
        return axios.post('/shops/999999/activities/'+ id +'/collect',qs.stringify(params));
    },
    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    }
}
export default {mjhService}