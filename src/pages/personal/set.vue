<template>
    <div id="set">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            设置
        </div>
        <div class="box">
            <!--账号设置/帮助与反馈-->
            <div class="setList">
                <router-link :to="{name:'set2'}">
                    <div class="setting">
                        账号设置<img src="../../assets/image/go.png"/>
                    </div>
                </router-link>
                <router-link :to="{name:'help'}">
                    <div class="setting">
                        帮助与反馈<img src="../../assets/image/go.png"/>
                    </div>
                </router-link>
            </div>
            <!--关于启智网-->
            <div class="setList">
                <router-link :to="{name:'about'}">
                    <div class="setting">
                        关于启智网<img src="../../assets/image/go.png"/>
                    </div>
                </router-link>
            </div>
            <!--退出登陆按钮-->
            <div class="backLogin" @click="backLogin()">退出登录</div>
            <!--确认退出登录-->
            <div class="backMenu" v-if="backShow">
                <div class="background"></div>
                <div class="backBox">
                    <div class="backMenu-top">
                        <div class="backTitle">确定要退出登陆吗？</div>
                        <div class="backYes">确认</div>
                    </div>
                    <div class="backNo" @click="backNo()">取消</div>
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
                history:'',
                backShow:false,
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
            },
            //点击退出动画
            backLogin:function(){
                this.backShow = true;
            },
            //取消退出
            backNo:function(){
                this.backShow = false;
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
#set{
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
        .setList{
            width:100%;
            padding-left:0.4rem;
            box-sizing: border-box;
            background:#fff;
            margin-top:0.27rem;
            .setting{
                width:100%;
                height:1.47rem;
                line-height:1.47rem;
                border-bottom:1px solid #eee;
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
        a:last-child .setting{
            border:none;
        }
        .backLogin{
            width:100%;
            height:1.47rem;
            line-height:1.47rem;
            font-size: 16px;
            color: #FF3831;
            letter-spacing: 0;
            background:#fff;
            margin-top:0.54rem;
            text-align: center;
        }
        .backMenu{
            width:100%;
            height:6.2rem;
            position:absolute;
            bottom:-100%;
            text-align: center;
            padding:0.6rem 0.2rem;
            box-sizing: border-box;
            animation: show 0.4s ease forwards;
            .background{
                width:100%;
                position:absolute;
                background: #000000;
                opacity: 0.4;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            .backBox{
                width:100%;
                position: absolute;
                left:0;
                top: 0;
                height:100%;
                padding:0.8rem 0.4rem;
                box-sizing: border-box;
                .backMenu-top{
                    width:100%;
                    background:#F9F9F9;
                    box-sizing: border-box;
                    border-radius: 12px;
                    z-index:100;
                    .backTitle{
                        width:100%;
                        font-size:14px;
                        border-bottom:1px solid #959595;
                        padding:0.3rem;
                        box-sizing: border-box;
                        color:#959595;
                    }
                    .backYes{
                        width:100%;
                        padding:0.4rem;
                        color:#FF3831;
                        font-size:16px;
                        box-sizing: border-box;
                    }
                }
                .backNo{
                    width:100%;
                    height:1.5rem;
                    line-height:1.5rem;
                    text-align: center;
                    background:#fff;
                    border-radius: 12px;
                    margin-top:0.4rem;
                    color:#1F85EF;
                    font-size:16px;
                }
            }

        }
    }
}
@keyframes show{
    0%{
        bottom:-100%;
    }
    100%{
        bottom:0;
    }
}
</style>