<template>
    <div id="serve">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            服务使用协议
        </div>
        <div class="box">
            <div class="serve">
                <div class="serveTop">服务使用协议</div>
                <div class="serveBox">
                    <p>一、大家好，刚刚听了海尔的宋总和多样屋潘总演讲，两位所在的品牌大家都比较熟知了</p>
                    <p>二、数据米铺相对于前两位品牌来说我们还是一个新生儿，到现在4年多的时间，这四年我们一直专注于做一件事，就是CRM会员营销。</p>
                    <p>三、大家可能觉得这是一个很简单的事情，但对于我们来说如何做到差异化，把服务做到极致，这是我们思考的问题。</p>
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
                that.$router.replace({name:'about'})
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
    #serve {
        width: 100%;
        background: #fff;
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
            .serve{
                width:100%;
                background:#fff;
                .serveTop{
                    width:100%;
                    padding:0.8rem 0;
                    text-align: center;
                    font-size: 14px;
                    color: #333333;
                }
                .serveBox{
                    width:100%;
                    padding:0 0.4rem;
                    font-size: 14px;
                    color: #333333;
                    box-sizing: border-box;
                    line-height:0.9rem;
                }
            }
        }
    }
</style>