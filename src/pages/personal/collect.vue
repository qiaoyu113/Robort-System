<template>
    <div id="collect">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            收藏
        </div>
        <div class="collectBtn">
            <ul class="collectList">
                <li v-for="(p,index) in purchaseMenu"  @click="show(index)">
                    <span class="li">{{p.text}}</span>
                </li>
                <div class="border"></div>
            </ul>
        </div>
        <div class="box">
            <!--文章-->
            <div class="article" v-for="v in article" v-if="index === 0">
                <div class="articleList">
                    <div class="articleImg">
                        <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg">
                    </div>
                    <div class="articleText">
                        <div class="articleName">{{v.name}}</div>
                        <div class="articleData">
                            <span>{{v.text}}·{{v.time}}</span>
                            <div class="look">
                                <i class="iconfont icon-fanhui"></i>{{v.people}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--专题-->
            <div class="special" v-for="s in special" v-if="index === 1">
                <div class="specialList">
                    <div class="specialImg">
                        <img src="http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg">
                    </div>
                    <div class="specialName">{{s.name}}</div>
                    <div class="specialText">
                        {{s.text}} {{s.time}}
                        <span>
                            <i class="iconfont icon-fanhui"></i>{{s.people}}
                        </span>
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
                    {text:'文章'},
                    {text:'专题'},
                ],
                article:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦',text:'商业',qiNum:20,up:false,price:9900,type:1,pricevip:999,time:'2018-01-01',people:'34k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'人工智能',qiNum:20,up:false,price:99,type:1,pricevip:90,time:'2018-01-01',people:'1.4k'},
                ],
                special:[
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
                    {name:'这里是标题啦啦啦啦啦啦劳动法暗室逢灯啊是佛为阿斯蒂芬阿斯蒂芬暗室逢灯阿斯蒂芬阿斯顿发啊',text:'汽车',qiNum:20,up:true,price:10000,type:1,pricevip:9000,time:'1小时前',people:'1.4k'},
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
                        that.animate(border, {left: 92},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 72},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 84},1, 0.04);
                            }else{
                                that.animate(border, {left: 80},1, 0.04);
                            }
                        }
                    }
                }else if(index === 1){
                    if(width >= 400){
                        that.animate(border, {left: 299},1, 0.04);
                    }else if(width <= 399){
                        if(width<330){
                            that.animate(border, {left: 232},1, 0.04);
                        }else{
                            if(width===375){
                                that.animate(border, {left: 273},1, 0.04);
                            }else{
                                that.animate(border, {left: 260},1, 0.04);
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
#collect{
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
    .collectBtn{
        width:100%;
        height:1.07rem;
        position:fixed;
        top:1.1733rem;
        background:#fff;
        border-bottom: 1px solid rgba(221, 221, 221, 0.5);
        overflow: hidden;
        z-index:100;
        .collectList{
            width:100%;
            height:1.07rem;
            position: relative;
            li{
                width:50%;
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
                left: 2.25rem;
                top: 0.85rem;
            }
        }
    }
    .box{
        width: 100%;
        position: fixed;
        top: 2.2rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: scroll;
        .article{
            width:100%;
            padding:0.4rem 0.4rem 0 0.4rem;
            box-sizing: border-box;
            .articleList{
                width:100%;
                padding-bottom:0.4rem;
                box-sizing: border-box;
                overflow: hidden;
                border-bottom:1px solid #eee;
                .articleImg{
                    width:3rem;
                    height:2.13rem;
                    float:left;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .articleText{
                    width:6rem;
                    height:2.13rem;
                    float:left;
                    padding-left:0.4rem;
                    box-sizing: border-box;
                    position: relative;
                    .articleName{
                        width:100%;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        font-weight: bold;
                    }
                    .articleData{
                        width:100%;
                        position:absolute;
                        bottom:0;
                        span{
                            font-size: 12px;
                            color: #999999;
                        }
                        .look{
                            float:right;
                            font-size: 12px;
                            color: #999999;
                            margin-right: 0.4rem;
                            i{
                                float: left;
                            }
                        }
                    }
                }
            }
        }
        .special{
            width:100%;
            padding:0.4rem 0.4rem 0 0.4rem;
            box-sizing: border-box;
            .specialList{
                width:100%;
                padding-bottom:0.4rem;
                box-sizing: border-box;
                border-bottom:1px solid #eee;
                .specialImg{
                    width:100%;
                    height:4.6rem;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .specialName{
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
                .specialText{
                    width:100%;
                    font-size: 12px;
                    color: #999999;
                    span{
                        float:right;
                        font-size: 12px;
                        color: #999999;
                        i{
                            float: left;
                        }
                    }
                }
            }
        }
    }
}
</style>