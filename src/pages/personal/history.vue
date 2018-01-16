<template>
    <div id="history">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            浏览历史
        </div>
        <div class="box">
            <div class="history" v-for="v in history">
                <div class="historyList">
                    <div class="historyName">{{v.name}}</div>
                    <div class="historyData">{{v.text}}</div>
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
                history:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                ],
            }
        },
        mounted: function () {
            this.onMove();
        },
        methods: {
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
#history{
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
        border-bottom:1px solid rgba(221,221,221,0.50);
        i{
            font-size: .6933rem;
            color: #999;
            text-align: left;
            position: absolute;
            top: 0;
            left: 0.2667rem;
        }
    }
    .box{
        width:100%;
        position: fixed;
        top: 1.1733rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: scroll;
        .history{
            width:100%;
            padding:0.4rem 0.4rem 0 0.4rem;
            box-sizing: border-box;
            .historyList{
                width:100%;
                padding-bottom:0.4rem;
                box-sizing: border-box;
                border-bottom:1px solid #eee;
                .historyName{
                    width:100%;
                    font-weight: bold;
                    font-size: 16px;
                    color: #333333;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .historyData{
                    font-size: 12px;
                    color: #999999;
                    margin-top:0.4rem;
                }
            }
        }
    }
}
</style>