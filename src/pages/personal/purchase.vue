<template>
    <div id="purchase">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            我的购买
        </div>
        <div class="purchaseBtn">
            <ul class="purchaseList">
                <li v-for="(p,index) in purchaseMenu"  @click="show(index)">
                    <span class="li">{{p.text}}</span>
                </li>
                <div class="border"></div>
            </ul>
        </div>
        <!--列表内容-->
        <div class="box">
            <!--专栏列表-->
            <div class="special" v-for="s in specials" v-if="index === 0">
                <div class="special-top">
                    <div class="specialName">{{s.name}}</div>
                    <div class="specialText">
                        <div class="specialImg">
                            <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg"/>
                        </div>
                        <div class="specialIns">
                            <p>{{s.qiNum}}期<span v-if="s.up">(更新中...)</span><span v-if="!s.up">(已完结)</span></p>
                            <p>价格：<span>￥{{s.price}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="special-bottom">
                    <div class="specialData" v-if="s.type == 1">已关闭</div>
                    <div class="specialData font1" v-if="s.type == 2">待支付</div>
                    <div class="specialData" v-if="s.type == 3">已完成</div>
                    <div class="PayYes">立即支付</div>
                    <div class="PayNo">取消支付</div>
                </div>
            </div>
            <!--课程列表-->
            <div class="curriculum"  v-if="index === 1"  v-for="c in curriculums">
                <div class="curriculum-top">
                    <div class="curriculumName">{{c.name}}</div>
                    <div class="curriculumText">
                        <div class="curriculumImg">
                            <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg"/>
                        </div>
                        <div class="curriculumIns">
                            <p>{{c.qiNum}}期<span v-if="c.up">(更新中...)</span><span v-if="!c.up">(已完结)</span></p>
                            <p>价格：<span>￥{{c.price}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="curriculum-bottom">
                    <div class="curriculumData" v-if="c.type == 1">已关闭</div>
                    <div class="curriculumData font1" v-if="c.type == 2">待支付</div>
                    <div class="curriculumData" v-if="c.type == 3">已完成</div>
                    <div class="PayYes">立即支付</div>
                    <div class="PayNo">取消支付</div>
                </div>
            </div>
            <!--直播列表-->
            <div class="living"  v-if="index === 2"  v-for="s in living">
                <div class="living-top">
                    <div class="livingName">{{s.name}}</div>
                    <div class="livingText">
                        <div class="livingImg">
                            <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg"/>
                        </div>
                        <div class="livingIns">
                            <p>时间：{{s.time}}</p>
                            <p>价格：<span>￥{{s.price}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="living-bottom">
                    <div class="livingData" v-if="s.type == 1">已关闭</div>
                    <div class="livingData font1" v-if="s.type == 2">待支付</div>
                    <div class="livingData" v-if="s.type == 3">已完成</div>
                    <div class="PayYes">立即支付</div>
                    <div class="PayNo">取消支付</div>
                </div>
            </div>
            <!--活动列表-->
            <div class="activity"  v-if="index === 3"  v-for="s in activity">
                <div class="activity-top">
                    <div class="activityName">{{s.name}}</div>
                    <div class="activityText">
                        <div class="activityImg">
                            <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg"/>
                        </div>
                        <div class="activityIns">
                            <p>时间：{{s.time}}</p>
                            <p>地址：<span>{{s.address}}</span></p>
                            <p>票价：<span>￥{{s.price}}</span></p>
                            <p>张数：<span>{{s.mun}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="activity-bottom">
                    <div class="activityData" v-if="s.type == 1">已关闭</div>
                    <div class="activityData font1" v-if="s.type == 2">待支付</div>
                    <div class="activityData" v-if="s.type == 3">已完成</div>
                    <div class="PayYes">立即支付</div>
                    <div class="PayNo">取消支付</div>
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
                    {text:'课程'},
                    {text:'直播'},
                    {text:'活动'},
                ],
                specials:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',qiNum:20,up:true,price:99,type:1},
                    {name:'这里是标题',qiNum:20,up:true,price:99,type:2},
                    {name:'这里是标题',qiNum:20,up:true,price:99,type:3},
                    {name:'这里是标题',qiNum:20,up:true,price:99,type:3},
                    {name:'这里是标题',qiNum:20,up:true,price:99,type:3},
                    {name:'这里是标题',qiNum:20,up:true,price:99,type:3},
                ],
                curriculums:[
                    {name:'这里是标题',qiNum:20,up:true,price:99,type:3},
                ],
                living:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',qiNum:20,time:'2018-01-01 10:59',price:99,type:1},
                    {name:'这里是标题',qiNum:20,time:'2018-01-01 10:59',price:99,type:2},
                    {name:'这里是标题',qiNum:20,time:'2018-01-01 10:59',price:99,type:3},
                    {name:'这里是标题',qiNum:20,time:'2018-01-01 10:59',price:99,type:3},
                    {name:'这里是标题',qiNum:20,time:'2018-01-01 10:59',price:99,type:3},
                    {name:'这里是标题',qiNum:20,time:'2018-01-01 10:59',price:99,type:3},
                ],
                activity:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:1,mun:2},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:1,mun:2},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:1,mun:2},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',address:'北京市朝阳区东大桥尚都SOHO南塔601',time:'2018-01-01 10:59',price:99,type:1,mun:2},
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
                        that.animate(border, {left: 40},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 32},1, 0.04);
                        }else{
                            that.animate(border, {left: 36},1, 0.04);
                        }
                    }
                }else if(index === 1){
                    if(width >= 400){
                        that.animate(border, {left: 143},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 112},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 130},1, 0.04);
                            }else{
                                that.animate(border, {left: 125},1, 0.04);
                            }
                        }
                    }
                }else if(index ===2){
                    if(width >= 400){
                        that.animate(border, {left: 246},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 192},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 224},1, 0.04);
                            }else{
                                that.animate(border, {left: 215},1, 0.04);
                            }
                        }
                    }
                }else if(index ===3){
                    if(width >= 400){
                        that.animate(border, {left: 349},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 271},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 317},1, 0.04);
                            }else{
                                that.animate(border, {left: 305},1, 0.04);
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
#purchase{
    width:100%;
    background:#F9F9F9;
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
    .purchaseBtn{
        width:100%;
        height:1.07rem;
        position:fixed;
        top:1.1733rem;
        background:#fff;
        border-bottom: 1px solid rgba(221, 221, 221, 0.5);
        overflow: hidden;
        z-index:100;
        .purchaseList{
            width:100%;
            height:1.07rem;
            position: relative;
            li{
                width:25%;
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
                left: 1rem;
                top: 0.85rem;
            }
        }
    }
    .box{
        width:100%;
        position:fixed;
        top:2.2rem;
        bottom:0;
        left:0;
        right:0;
        overflow: scroll;
        .special{
            width:100%;
            overflow: hidden;
            background: #fff;
            margin-top:0.27rem;
            .special-top{
                width:100%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding:0.27rem 0.4rem;
                box-sizing: border-box;
                border-bottom:1px solid rgba(221,221,221,0.50);
                .specialName{
                    width:100%;
                    overflow: hidden;
                    font-size: 16px;
                    color: #333333;
                    font-weight:bold;
                }
                .specialText{
                    width:100%;
                    margin-top:0.2rem;
                    height:2.13rem;
                    .specialImg{
                        width:3.2rem;
                        height:2.13rem;
                        float:left;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .specialIns{
                        width:5rem;
                        height:2.13rem;
                        float:left;
                        padding-left:0.37rem;
                        box-sizing: border-box;
                        font-size: 12px;
                        color: #666666;
                        p{
                            font-size:12px;
                            height:0.5rem;
                            span{
                                font-size:12px;
                            }
                        }
                    }
                }
            }
            .special-bottom{
                width:100%;
                height:1.33rem;
                .specialData{
                    padding:0.4rem;
                    box-sizing: border-box;
                    float:left;
                    font-size: 16px;
                    color: #666666;
                    letter-spacing: 0;
                }
                .font1{
                    font-size: 16px;
                    color: #F4A21B;
                    letter-spacing: 0;
                }
                .PayNo{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #999;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #999;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.3rem;
                }
                .PayYes{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #F4A21B;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #F4A21B;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.4rem;
                }
            }
        }
        .curriculum{
            width:100%;
            overflow: hidden;
            background: #fff;
            margin-top:0.27rem;
            .curriculum-top{
                width:100%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding:0.27rem 0.4rem;
                box-sizing: border-box;
                border-bottom:1px solid rgba(221,221,221,0.50);
                .curriculumName{
                    width:100%;
                    overflow: hidden;
                    font-size: 16px;
                    color: #333333;
                    font-weight:bold;
                }
                .curriculumText{
                    width:100%;
                    margin-top:0.2rem;
                    height:2.13rem;
                    .curriculumImg{
                        width:1.6rem;
                        height:2.13rem;
                        float:left;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .curriculumIns{
                        width:5rem;
                        height:2.13rem;
                        float:left;
                        padding-left:0.37rem;
                        box-sizing: border-box;
                        font-size: 12px;
                        color: #666666;
                        p{
                            font-size:12px;
                            height:0.5rem;
                            span{
                                font-size:12px;
                            }
                        }
                    }
                }
            }
            .curriculum-bottom{
                width:100%;
                height:1.33rem;
                .curriculumData{
                    padding:0.4rem;
                    box-sizing: border-box;
                    float:left;
                    font-size: 16px;
                    color: #666666;
                    letter-spacing: 0;
                }
                .font1{
                    font-size: 16px;
                    color: #F4A21B;
                    letter-spacing: 0;
                }
                .PayNo{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #999;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #999;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.3rem;
                }
                .PayYes{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #F4A21B;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #F4A21B;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.4rem;
                }
            }
        }
        .living{
            width:100%;
            overflow: hidden;
            background: #fff;
            margin-top:0.27rem;
            .living-top{
                width:100%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding:0.27rem 0.4rem;
                box-sizing: border-box;
                border-bottom:1px solid rgba(221,221,221,0.50);
                .livingName{
                    width:100%;
                    overflow: hidden;
                    font-size: 16px;
                    color: #333333;
                    font-weight:bold;
                }
                .livingText{
                    width:100%;
                    margin-top:0.2rem;
                    height:2.13rem;
                    .livingImg{
                        width:2.2rem;
                        height:2.2rem;
                        float:left;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .livingIns{
                        width:5rem;
                        height:2.13rem;
                        float:left;
                        padding-left:0.37rem;
                        box-sizing: border-box;
                        font-size: 12px;
                        color: #666666;
                        p{
                            font-size:12px;
                            height:0.5rem;
                            span{
                                font-size:12px;
                            }
                        }
                    }
                }
            }
            .living-bottom{
                width:100%;
                height:1.33rem;
                .livingData{
                    padding:0.4rem;
                    box-sizing: border-box;
                    float:left;
                    font-size: 16px;
                    color: #666666;
                    letter-spacing: 0;
                }
                .font1{
                    font-size: 16px;
                    color: #F4A21B;
                    letter-spacing: 0;
                }
                .PayNo{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #999;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #999;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.3rem;
                }
                .PayYes{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #F4A21B;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #F4A21B;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.4rem;
                }
            }
        }
        .activity{
            width:100%;
            overflow: hidden;
            background: #fff;
            margin-top:0.27rem;
            .activity-top{
                width:100%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding:0.27rem 0.4rem;
                box-sizing: border-box;
                border-bottom:1px solid rgba(221,221,221,0.50);
                .activityName{
                    width:100%;
                    overflow: hidden;
                    font-size: 16px;
                    color: #333333;
                    font-weight:bold;
                }
                .activityText{
                    width:100%;
                    margin-top:0.2rem;
                    height:2.13rem;
                    .activityImg{
                        width:3.2rem;
                        height:2.13rem;
                        float:left;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .activityIns{
                        width:5rem;
                        height:2.13rem;
                        float:left;
                        padding-left:0.37rem;
                        box-sizing: border-box;
                        font-size: 12px;
                        color: #666666;
                        p{
                            width:100%;
                            font-size:12px;
                            height:0.5rem;
                            display: -webkit-box;
                            -webkit-line-clamp:1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            span{
                                font-size:12px;
                            }
                        }
                    }
                }
            }
            .activity-bottom{
                width:100%;
                height:1.33rem;
                .activityData{
                    padding:0.4rem;
                    box-sizing: border-box;
                    float:left;
                    font-size: 16px;
                    color: #666666;
                    letter-spacing: 0;
                }
                .font1{
                    font-size: 16px;
                    color: #F4A21B;
                    letter-spacing: 0;
                }
                .PayNo{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #999;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #999;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.3rem;
                }
                .PayYes{
                    width:2.13rem;
                    height:0.9rem;
                    border: 1px solid #F4A21B;
                    border-radius: 69px;
                    float:right;
                    text-align: center;
                    line-height:0.9rem;
                    font-size: 14px;
                    color: #F4A21B;
                    letter-spacing: 0;
                    margin-top:0.2rem;
                    margin-right:0.4rem;
                }
            }
        }
    }
}
</style>
