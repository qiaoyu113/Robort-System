/**
 * Created by LXH on 2017/11/1.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'

export const commonService = {
    api: {},
    /* 获取Geetest */
    getGaptchas: function (params) {
        return axios.get('/gaptchas' + this.getParam(params))
    },
    /* 校验Geetest */
    postGaptchas: function (params) {
        return axios.post('/gaptchas',qs.stringify(params))
    },
    /* 通用：验证验证码的对错 */
    postValidateImg: function (params) {
        return axios.post('/kaptchas',qs.stringify(params))
    },
    /* 通用：获取短信验证码 */
    getValidateMess: function (params) {
        return axios.get('/sms' + this.getParam(params))
    },
    getOauth: function (params) {
        return axios.get('/tokens/oauth' + this.getParam(params))
    },
    /* 知识订单 */
    getInfo: function (params) {
        return axios.get('/shops/'+ store.state.shopId +'/columns/detail' + this.getParam(params));
    },
    /* 会员确认订单 */
    getVip: function (id) {
        return axios.put('/shops/'+store.state.shopId+'/vips/orderconfirm?vipId=' + id);
    },
    /* 会员提交订单 */
    vipSubmit: function (params) {
        return axios.put('/shops/'+store.state.shopId+'/vips/ordersubmit' + this.getParam(params));
    },
    /* 活动确认订单 */
    getActivity: function (actId,params) {
        return axios.post('/shops/' + store.state.shopId + '/activities/'+ actId +'/order',qs.stringify(params));
    },
    /* 直播确认订单 */
    getLivesOrder: function (watchNo,params) {
        return axios.put('/shops/'+ store.state.shopId +'/lives/'+ watchNo +'/detail' + this.getParam(params));
    },
    /* 直播去支付 */
    LivesOrderPay: function (livesId,params) {
        return axios.put('/shops/'+ store.state.shopId +'/lives/' + livesId + '/order' + this.getParam(params));
    },
    /* 活动确认订单 */
    getActivityOrder: function (activityId,params) {
        return axios.put('/shops/'+ store.state.shopId +'/lives/'+ activityId +'/detail' + this.getParam(params));
    },
    /* 获取活动详情 */
    ActivityOrder: function (activityId,params) {
        return axios.get('/shops/'+ store.state.shopId +'/activities/'+ activityId +'/detail' + this.getParam(params));
    },
    /* 活动去支付 */
    ActivityOrderPay: function (activityId,params) {
        return axios.post('/shops/'+ store.state.shopId +'/activities/'+ activityId +'/order' + this.getParam(params),{responseType:'text'});
    },
    // 选择票种后初步检查是否可购
    checkTicket: function(actId,params){
        return axios.post('/shops/'+store.state.shopId+'/activities/' + actId + '/check',qs.stringify(params))
    },
    /*  确认支付页执行  */
    getOrders:function(params){
        return axios.get('/orders/'+ params);
    },
    /* （本地）下单请求订单号 */
    getOder: function (params) {
        return axios.post('/shops/'+ store.state.shopId +'/columns/order',qs.stringify(params))
    },
    /* （本地）获取订单内容 */
    getOderform: function (params) {
        return axios.post('/shops/'+store.state.shopId+'/orders/',qs.stringify(params))
    },
    /* （本地）获取订单内容 */
    getUrl: function (shortUrl) {
        return axios.get('/d/'+shortUrl)
    },
    /*   订单详情页请求  */
    orderItem:function(id){
        return axios.get('/orders/' + id)
    },
    /*  支付宝接口  */
    getAlipay:function(params){
        return axios.put('/orders' + this.getParam(params))
    },
    /*  获取微信授权地址  */
    getWxpay:function(params,loginType,platform,jumpRouter,wxscope){
        return axios.get('/tokens/oauth' + this.getParam(params,loginType,platform,jumpRouter,wxscope))
    },
    /*  绑定微信  */
    wxBind:function (code) {
        return axios.post('/tokens/wxbind',qs.stringify(code))
    },
    /*  个人中心页  */
    myCenter:function () {
        return axios.get('/shops/'+ store.state.shopId + '/users')
    },
    /*  个人中心设置接口  */
    myCenterSet:function(params){
        return axios.post('/shops/'+ store.state.shopId +'/users/info',qs.stringify(params));
    },
    /*  个人中心设置地址接口  */
    myCenterAddress:function(params){
        return axios.get('/shops/'+ store.state.shopId +'/users/address'+ this.getParam(params))
    },
    /*  个人中心设置地址编辑接口  */
    myAddressEdit:function(params){
        return axios.get('/shops/'+ store.state.shopId +'/users/address/'+ params);
    },
    /*  个人中心设置地址编辑保存接口  */
    myAddressSave:function(id,params){
        return axios.post('/shops/'+ store.state.shopId +'/users/address/' + id ,qs.stringify(params));
    },
    /*  个人中心设置地址新增保存接口  */
    myAddressNew:function(params){
        return axios.post('/shops/'+ store.state.shopId +'/users/address/',qs.stringify(params));
    },
    /*  个人中心设置地址删除接口  */
    myAddressDel:function(id){
        return axios.delete('/shops/'+ store.state.shopId +'/users/address/' + id);
    },
    /*  个人中心设置修改密码接口  */
    myPassword:function(params){
        return axios.put('/passwords/password' + this.getParam(params));
    },
    /*  个人中心设置密码接口  */
    myPassword2:function(params){
        return axios.put('/passwords/set' + this.getParam(params));
    },
    /*  个人中心设置修改头像接口  */
    myImage:function(params){
        return axios.post('/files/base64',qs.stringify(params));
    },
    /*  个人中心设置退出 接口 */
    myExit:function(){
        return axios.delete('/tokens');
    },
    /*  个人中心我的已购*/
    myBought:function(params){
        return axios.get('/shops/'+ store.state.shopId +'/users/bought' + this.getParam(params) );
    },
    /*  个人中心我的活动*/
    myActivity:function(params){
        return axios.get('/orders/user' + this.getParam(params) );
    },
    /*  个人中心我的收藏*/
    myCollect:function(params){
        return axios.get('/shops/'+ store.state.shopId +'/users/collect' + this.getParam(params) );
    },
    /*  个人中心vipId查询*/
    vipLevel:function(id){
        return axios.get('/shops/'+ store.state.shopId +'/vips/' + id);
    },
    /*  个人中心消息*/
    getInformation:function(params){
        return axios.get('/innerletter' + this.getParam(params));
    },
    /*  个人中心消息已读*/
    postInformation:function(params){
        return axios.post('/innerletter',qs.stringify(params));
    },
    /*  个人中心会员中心 */
    getvipLevel:function(){
        return axios.get('/shops/'+ store.state.shopId +'/vips/');
    },
    /*  个人中心兑换码 */
    getCode:function(params){
        return axios.post('/shops/'+ store.state.shopId +'/cdks/login',qs.stringify(params));
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
        return axios.post('/shops/'+ store.state.shopId +'/articles/'+ articleId + '/collect',qs.stringify(params));
    },
    /*  点赞接口 */
    getLike:function(params){
        return axios.post('/shops/'+ store.state.shopId +'/cdks/login',qs.stringify(params));
    },
    /*  是否点赞收藏 */
    hasLike:function(params){
        return axios.get('/shops/'+ store.state.shopId +'/users/collect/exist'+ this.getParam(params));
    },
    /*  点赞数（文章详情） */
    hasLikeNum:function(params){
        return axios.get('/shops/'+ store.state.shopId +'/articles/'+ params);
    },
    /*  点击赞/取消赞 */
    BtnLikeNum:function(id,params){
        return axios.post('/shops/'+ store.state.shopId +'/articles/'+ id +'/like',qs.stringify(params));
    },
    /*  点击收藏/取消点击收藏(文章) */
    BtnCollectNum:function(id,params){
        return axios.post('/shops/'+ store.state.shopId +'/articles/'+ id +'/collect',qs.stringify(params));
    },
    /*  点击收藏/取消点击收藏(活动) */
    BtnCollectAct:function(id,params){
        return axios.post('/shops/'+ store.state.shopId +'/activities/'+ id +'/collect',qs.stringify(params));
    },
    /*  订单详情页退款 */
    orderRefund:function(orderNo,params){
        return axios.put('/orders/'+ orderNo +'/refundApply' + this.getParam(params));
    },
    /*   取消订单页  */
    noPay:function(orderNo,params){
        return axios.put('/orders/'+ orderNo +'/cancel' + this.getParam(params));
    },
    /*   电子票查询   */
    getTicket:function(orderNo){
        return axios.get('/mytickets/orderNo/'+ orderNo);
    },
    /*   微信状态下兑换码使用   */
    getUnionid:function(id){
        return axios.post('tokens/unionid',qs.stringify(id));
    },
    /* 添加浏览数 */
    addReadNo: function(shopId, typeId, params) {
        return axios.post('/shops/' + shopId + '/read/' + typeId + '/inc', qs.stringify(params))
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
export default {commonService}
