<template>
    <div id="about">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            关于企智网
        </div>
        <div class="box">
            <div class="logo">
                <div class="logoImg">
                    <img src="../../assets/image/collect.png">
                </div>
                <div class="logoName">企智网-智能创新服务平台</div>
            </div>
            <!--关于-->
            <div class="about">
                <router-link :to="{name:'relation'}">
                    <div class="aboutList">
                        <div class="aboutListS">
                            合作&联系<img src="../../assets/image/go.png"/>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{name:'serve'}">
                    <div class="aboutList">
                        <div class="aboutListS">
                            服务使用协议<img src="../../assets/image/go.png"/>
                        </div>
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

            }
        },
        mounted: function () {
            this.onMove();
        },
        methods: {
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
    #about {
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
            .logo{
                width:100%;
                text-align: center;
                background:#fff;
                padding:0.8rem 0;
                box-sizing: border-box;
                margin-top:0.27rem;
                .logoImg{
                    width:1.47rem;
                    height:1.47rem;
                    margin:auto;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .logoName{
                    width:100%;
                    line-height:1rem;
                    font-size: 16px;
                    color: #333333;
                }
            }
            .about{
                margin-top:0.27rem;
                .aboutList{
                    width:100%;
                    padding-left:0.4rem;
                    box-sizing: border-box;
                    background:#fff;
                    .aboutListS{
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
                a:last-child{
                    .aboutList{
                        .aboutListS{
                            border:none;
                        }
                    }
                }
            }
        }
    }
</style>