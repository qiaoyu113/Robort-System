/**
 * Created by 乔宇 on 2017/12/27.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'

export const personalService = {
    api: {},
    /* 活动确认订单 */
    getActivityOrder: function (activityId,params) {
        return axios.put('/shops/'+ store.state.shopId +'/lives/'+ activityId +'/detail' + this.getParam(params));
    },
}