<template>
    <div id="interested">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            感兴趣
        </div>
        <div class="interestedBtn">
            <ul class="interestedList">
                <li v-for="(p,index) in purchaseMenu"  @click="show(index)">
                    <span class="li">{{p.text}}</span>
                </li>
                <div class="border"></div>
            </ul>
        </div>
        <!--列表内容-->
        <div class="box">
            <!--专栏-->
            <div class="column" v-for="s in specials" v-if="index === 0">
                <div class="columnList">
                    <div class="columnListImg">
                        <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg">
                    </div>
                    <div class="columnListName">{{s.name}}</div>
                    <div class="columnListText">{{s.text}}</div>
                    <div class="columnListData" v-if="s.up">已更新{{s.type}}期 <span>|</span> 更新的文章题目</div>
                    <div class="columnListData" v-if="!s.up">
                        已更新{{s.type}}期
                        <div class="price"><span>￥{{s.price}}</span>￥{{s.pricevip}}<div class="vip">VIP</div></div>
                    </div>
                </div>
            </div>
            <!--直播-->
            <div class="living" v-for="v in living" v-if="index === 1">
                <div class="livingList">
                    <div class="livingListImg">
                        <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg">
                        <div class="title">直播中</div>
                        <div class="title">回放</div>
                    </div>
                    <div class="livingListRight">
                        <div class="livingListName">{{v.name}}</div>
                        <div class="livingListTime">{{v.time}}</div>
                        <!--正在直播-->
                        <div class="livingListIng" v-if="v.type === 1">{{v.num}}再看</div>
                        <!--正在回放-->
                        <div class="livingListIng" v-if="v.type === 2">{{v.num}}预约</div>
                        <!--预约-->
                        <div class="livingListIng" v-if="v.type === 3">{{v.num}}报名</div>
                        <!--价格-->
                        <div class="livingListPrice" v-if="v.price != 0">￥{{v.price}}</div>
                        <div class="livingListPrice" v-if="v.price == 0">免费</div>
                    </div>
                </div>
            </div>
            <!--活动-->
            <div class="activity" v-for="a in activity" v-if="index === 2">
                <div class="activityList">
                    <div class="activityImg">
                        <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg">
                    </div>
                    <div class="activityName">{{a.name}}</div>
                    <div class="activityText">
                        <div class="data">{{a.time}} {{a.address}}</div>
                        <span v-if="a.price == 0">免费</span>
                        <span v-if="a.price != 0">￥{{a.price}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {commonService} from '../../service/personalService'
    export default {
        data () {
            return {
                index:0,//判断当前为什么类型
                purchaseMenu:[
                    {text:'专栏'},
                    {text:'直播'},
                    {text:'活动'},
                ],
                specials:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'折扣率阿斯蒂芬暗室逢灯微软阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬',qiNum:20,up:true,price:10000,type:1,pricevip:9000},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'折扣率阿斯蒂芬暗室逢灯微软阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬',qiNum:20,up:false,price:9900,type:1,pricevip:999},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'折扣率阿斯蒂芬暗室逢灯微软阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬',qiNum:20,up:false,price:99,type:1,pricevip:90},
                ],
                living:[
                    {name:'这里是标题啦啦啦啦啦',qiNum:20,time:'2018-01-01 10:59',price:99,type:1,num:32120},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',qiNum:20,time:'2018-01-01 10:59',price:0,type:2,num:32120},
                    {name:'这里是标题啦啦啦啦啦啦劳动123',qiNum:20,time:'2018-01-01 10:59',price:99,type:3,num:32120},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',qiNum:20,time:'2018-01-01 10:59',price:99,type:1,num:32120},
                ],
                activity:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:1,mun:2103230},
                    {name:'这里是标题啦啦啦',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:0,type:2,mun:202},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:3,mun:2323},
                    {name:'这里是标题啦啦啦啦啦啦',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:1,mun:2323},
                ]
            }
        },
        mounted: function () {
            let list = document.getElementsByClassName('li')
            list[0].classList.add('font1');
            this.onMove();
        },
        methods: {
            //查看已购买的类别
            show:function(index){
                let that = this;
                let list = document.getElementsByClassName('li');
                let border = document.getElementsByClassName('border')[0];
                for(let i=0;i<list.length;i++){
                    list[i].classList.remove('font1');
                }
                list[index].classList.add('font1');
                let width = document.body.clientWidth;
                that.index = index;
                if(index === 0){
                    if(width >= 400){
                        that.animate(border, {left: 58},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 45},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 53},1, 0.04);
                            }else{
                                that.animate(border, {left: 49},1, 0.04);
                            }
                        }
                    }
                }else if(index === 1){
                    if(width >= 400){
                        that.animate(border, {left: 193},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 150},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 176},1, 0.04);
                            }else{
                                that.animate(border, {left: 168},1, 0.04);
                            }
                        }
                    }
                }else if(index ===2) {
                    if (width >= 400) {
                        that.animate(border, {left: 329}, 1, 0.04);
                    } else if (width <= 399) {
                        if (width < 330) {
                            that.animate(border, {left: 255}, 1, 0.04);
                        } else {
                            if (width === 375) {
                                that.animate(border, {left: 300}, 1, 0.04);
                            } else {
                                that.animate(border, {left: 287}, 1, 0.04);
                            }
                        }
                    }
                }
            },
            //点击菜单栏的运动效果
            animate:function(obj, json, interval, sp, fn) {
                clearInterval(obj.timer);
                function getStyle(obj, arr) {
                    if(obj.currentStyle){
                        return obj.currentStyle[arr];
                    } else {
                        return document.defaultView.getComputedStyle(obj, null)[arr];
                    }
                }
                obj.timer = setInterval(function(){
                    let flag = true;
                    for(let arr in json) {
                        let icur = 0;
                        if(arr == "opacity") {
                            icur = Math.round(parseFloat(getStyle(obj, arr))*100);
                        } else {
                            icur = parseInt(getStyle(obj, arr));
                        }
                        let speed = (json[arr] - icur) * sp;
                        speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
                        if(icur != json[arr]){
                            flag = false;
                        }
                        if(arr == "opacity"){
                            obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                            obj.style.opacity = (icur + speed)/100;
                        }else {
                            obj.style[arr] = icur + speed + "px";
                        }
                    }
                    if(flag){
                        clearInterval(obj.timer);
                        if(fn){
                            fn();
                        }
                    }
                },interval);
            },
            //页面滑动问题
            onMove:function(){
                let overscroll = function(el) {
                    el.addEventListener('touchstart', function() {
                        let top = el.scrollTop
                            , totalScroll = el.scrollHeight
                            , currentScroll = top + el.offsetHeight
                        //If we're at the top or the bottom of the containers
                        //scroll, push up or down one pixel.
                        //
                        //this prevents the scroll from "passing through" to
                        //the body.
                        if(top === 0) {
                            el.scrollTop = 1
                        } else if(currentScroll === totalScroll) {
                            el.scrollTop = top - 1
                        }
                    })
                    el.addEventListener('touchmove', function(evt) {
                        //if the content is actually scrollable, i.e. the content is long enough
                        //that scrolling can occur
                        if(el.offsetHeight < el.scrollHeight)
                            evt._isScroller = true
                    })
                }
                overscroll(document.querySelector('.box'));
                document.body.addEventListener('touchmove', function(evt) {
                    //In this case, the default behavior is scrolling the body, which
                    //would result in an overflow.  Since we don't want that, we preventDefault.
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
            //返回按钮
            back:function(){
                let that = this;
                that.$router.replace({name:'mycenter'})
            }
        },
    }
</script>

<style lang="less">
    *{-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}
    .noscroll,
    .noscroll body {
        overflow: hidden;
    }
    .noscroll body {
        position: relative;
    }
    #interested{
        width:100%;
        background:#fff;
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        .title{
            width:100%;
            height: 1.1733rem;
            line-height: 1.1733rem;
            text-align: center;
            position:fixed;
            top:0;
            font-size: 0.48rem;
            color: #333;
            letter-spacing: 0.3px;
            background: #fff;
            z-index:100;
            i{
                font-size: .6933rem;
                color: #999;
                text-align: left;
                position: absolute;
                top: 0;
                left: 0.2667rem;
            }
        }
        .interestedBtn{
            width:100%;
            height:1.07rem;
            position:fixed;
            top:1.1733rem;
            background:#fff;
            border-bottom: 1px solid rgba(221, 221, 221, 0.5);
            overflow: hidden;
            z-index:100;
            .interestedList{
                width:100%;
                height:1.07rem;
                position: relative;
                li{
                    width:33%;
                    height:1.07rem;
                    line-height:1.07rem;
                    float:left;
                    text-align: center;
                    color:#666;
                    font-size:15px;
                    .font1{
                        border-width:0.3rem;
                        /*border-bottom:2px solid #FFCC00;*/
                        color:#333;
                        font-size:17px;
                    }
                }
                .border{
                    width:0.55rem;
                    border-bottom:2px solid #FFCC00;
                    position:absolute;
                    left: 1.4rem;
                    top: 0.85rem;
                }
            }
        }
        .box {
            width: 100%;
            position: fixed;
            top: 2.2rem;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: scroll;
            .column{
                width:100%;
                padding:0.4rem 0.4rem 0 0.4rem;
                box-sizing: border-box;
                overflow: hidden;
                .columnList{
                    width:100%;
                    border-bottom:1px solid #EEEEEE;
                    padding-bottom:0.2rem;
                    .columnListImg{
                        width:100%;
                        height:4.6rem;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .columnListName{
                        width:100%;
                        margin:0.27rem 0;
                        box-sizing: border-box;
                        font-weight: bold;
                        font-size: 16px;
                        color: #333333;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .columnListText{
                        width:100%;
                        font-size: 14px;
                        color: #999999;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .columnListData{
                        width:100%;
                        margin:0.27rem 0;
                        font-size: 14px;
                        color: #999999;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        .price{
                            float:right;
                            font-size: 14px;
                            color: #333333;
                            overflow: hidden;
                            span{
                                font-size: 16px;
                                color: #F4A21B;
                                margin-right:0.2rem;
                            }
                            .vip{
                                width:0.67rem;
                                overflow: hidden;
                                float:right;
                                font-size:12px;
                                background: #333333;
                                color: #F8E0A2;
                                text-align: center;
                                margin-top:0.1rem;
                                margin-left:0.2rem;
                            }
                        }
                    }
                }
            }
            .living{
                width:100%;
                padding:0.4rem 0.4rem 0 0.4rem;
                box-sizing: border-box;
                overflow: hidden;
                .livingList{
                    width:100%;
                    padding-bottom:0.4rem;
                    box-sizing: border-box;
                    overflow: hidden;
                    border-bottom:1px solid #eee;
                    position:relative;
                    .livingListImg{
                        width:3.2rem;
                        height:3.2rem;
                        float:left;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .livingListRight{
                        width:6rem;
                        float:left;
                        padding-left:0.4rem;
                        box-sizing: border-box;
                        .livingListName{
                            width:100%;
                            font-size: 16px;
                            color: #333333;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            font-weight: bold;
                        }
                        .livingListTime{
                            font-size: 14px;
                            color: #666666;
                        }
                        .livingListIng{
                            font-size: 14px;
                            color: #999999;
                        }
                       .livingListPrice{
                           font-size: 16px;
                           color: #F4A21B;
                           position:absolute;
                           bottom: 0.4rem;
                       }
                    }
                }
            }
            .activity{
                width:100%;
                padding:0.4rem 0.4rem 0 0.4rem;
                box-sizing: border-box;
                .activityList{
                    width:100%;
                    overflow: hidden;
                    padding-bottom:0.4rem;
                    box-sizing: border-box;
                    border-bottom:1px solid #eee;
                    .activityImg{
                        width:100%;
                        height:4.5rem;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .activityName{
                        font-size: 16px;
                        color: #333333;
                        margin:0.27rem 0;
                        font-weight: bold;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .activityText{
                        width:100%;
                        font-size: 13px;
                        color: #999999;
                        .data{
                            width:70%;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            float:left;
                            font-size: 13px;
                            color: #999999;
                        }
                        span{
                            float:right;
                            font-size: 13px;
                            color: #F4A21B;
                        }
                    }
                }
            }
        }
    }
</style>