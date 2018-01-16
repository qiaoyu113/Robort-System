import Vue from 'vue'
import {common} from '../assets/js/common/common'

Vue.filter('dateFormate', function (value) {
    function getDateTimeStamp(dateStr){
        return Date.parse(dateStr.replace(/-/gi,"/"));
    }
    // 返回处理后的值
    let result = ''
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - value;
    if(diffValue < 0){return;}
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    // if(monthC>=6){
    //     result = common.getFormatOfDate(value*1, 'yyyy-MM-dd')
    //     console.log(result,'result')
    // }
    // else if(monthC>=1){
    // 	result="" + parseInt(monthC) + "月前";
    // }
    // else if(weekC>=1){
    // 	result="" + parseInt(weekC) + "周前";
    // }
    if(dayC>1){
        result = common.getFormatOfDate(value*1, 'yyyy-MM-dd');
    }
    else if(dayC==1){ //文章信息流时间显示
        result=""+ "昨天";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
        result="刚刚";
    return result;
})

Vue.filter('readNumFormate',function(value) {
    let result =''
    if(value > 10000000000000){
        result = value/10000000000000 + "B"
    } else if(value > 10000000){
        result = value/10000000 + "m"
    } else if(value > 10000){
        result = value/10000 + "k"
    } else if(value < 9999){
        result = value
    }
    return result
})