<template>
    <div id="help">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            帮助与反馈
        </div>
        <div class="box">
            <!--意见反馈-->
            <router-link :to="{name:'feed'}">
                <div class="help">
                    <div class="helpList">
                        意见反馈<img src="../../assets/image/go.png"/>
                    </div>
                </div>
            </router-link>
            <!--常见问题-->
            <div class="optTitle">常见问题</div>
            <div class="optList">
                <router-link :to="{name:'question'}">
                    <div class="binding">
                        <div class="bindingLeft">你们app真的太好用了</div>
                        <div class="bindingRight"><img src="../../assets/image/go.png"/></div>
                    </div>
                </router-link>
                <router-link :to="{name:'question'}">
                    <div class="binding">
                        <div class="bindingLeft">你们app真的太好用了</div>
                        <div class="bindingRight"><img src="../../assets/image/go.png"/></div>
                    </div>
                </router-link>
                <router-link :to="{name:'question'}">
                    <div class="binding">
                        <div class="bindingLeft">你们app真的太好用了</div>
                        <div class="bindingRight"><img src="../../assets/image/go.png"/></div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {commonService} from '../../service/personalService'
    export default {
        data () {
            return {
                history:'',
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
                that.$router.replace({name:'set'})
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
    #help {
        width: 100%;
        background: #F9F9F9;
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        .title {
            width: 100%;
            height: 1.1733rem;
            line-height: 1.1733rem;
            text-align: center;
            position: fixed;
            top: 0;
            font-size: 0.48rem;
            color: #333;
            letter-spacing: 0.3px;
            background: #fff;
            z-index: 100;
            border-bottom: 1px solid rgba(221, 221, 221, 0.50);
            i {
                font-size: .6933rem;
                color: #999;
                text-align: left;
                position: absolute;
                top: 0;
                left: 0.2667rem;
            }
        }
        .box {
            width: 100%;
            position: fixed;
            top: 1.1733rem;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: scroll;
            .help{
                width:100%;
                height:1.47rem;
                line-height:1.47rem;
                padding-left:0.4rem;
                box-sizing: border-box;
                background:#fff;
                margin-top:0.27rem;
                .helpList{
                    width:100%;
                    height:1.47rem;
                    line-height:1.47rem;
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 0;
                    position: relative;
                    img{
                        position:absolute;
                        right:0;
                        top:0;
                        bottom:0;
                        margin:auto;
                        width:0.9rem;
                        height:0.9rem;
                    }
                }
            }
            .optTitle{
                width:100%;
                font-size: 13px;
                color: #666666;
                margin-top:0.5rem;
                padding:0 0.4rem;
                box-sizing: border-box;
            }
            .optList{
                width:100%;
                font-size: 16px;
                color: #333333;
                padding-left:0.4rem;
                box-sizing: border-box;
                letter-spacing: 0;
                position: relative;
                background:#fff;
                margin-top:0.27rem;
                .binding{
                    width:100%;
                    height:1.47rem;
                    line-height:1.47rem;
                    border-bottom:1px solid #eee;
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 0;
                    position: relative;
                    .bindingLeft{
                        width:8.6rem;
                        float:left;
                        font-size: 16px;
                        color: #333333;
                        display: -webkit-box;
                        -webkit-line-clamp:1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        letter-spacing: 0;
                    }
                    .bindingRight{
                        font-size: 14px;
                        color: #999999;
                        letter-spacing: 0;
                        position:absolute;
                        right:0;
                        top: 0.3rem;
                        img{
                            width:0.9rem;
                            height:0.9rem;
                        }
                    }
                }
            }
            .optList a:last-child .binding{
                border:none;
            }
        }
    }
</style>