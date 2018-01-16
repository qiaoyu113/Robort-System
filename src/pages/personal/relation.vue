<template>
    <div id="relation">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            合作&联系
        </div>
        <div class="box">
            <!--关于-->
            <div class="about">
                <div class="aboutList">
                    <div class="aboutListS">
                        <div class="aboutListLeft">投稿</div>
                        <div class="aboutListRight">tougao@shitang.com</div>
                    </div>
                </div>
                <div class="aboutList">
                    <div class="aboutListS">
                        <div class="aboutListLeft">电话</div>
                        <div class="aboutListRight">010-65513781</div>
                    </div>
                </div>
                <div class="aboutList">
                    <div class="aboutListS">
                        <div class="aboutListLeft">客服QQ</div>
                        <div class="aboutListRight">3489881562</div>
                    </div>
                </div>
                <div class="aboutList">
                    <div class="aboutListS2">
                        <div class="aboutListLeft">地址</div>
                        <div class="aboutListRight2">北京朝阳区东大桥8号SOHO尚都南塔601-602</div>
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
                text:'本届大会以“智·商”为主题，包括两天的主论坛，5场主题分论坛，马蹄社等活动，国内外电商领域知名企业高管、专家学者、媒体代表共计4000人次出席。值得关注的是，在本届大会上，数字化、智能化、场景化已成为主旋律，大数据算法、内容、社交正在和产业紧密融合。反映了，商业正处在迭代进化的边缘，这是一个低维向高维迈进的历史性时刻。',
                title:'问题标题，显示全？',
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
    #relation {
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
                    padding:0 0.4rem;
                    box-sizing: border-box;
                    background:#fff;
                    .aboutListS{
                        width:100%;
                        height:1.47rem;
                        border-bottom:1px solid #eee;
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: 0;
                        position: relative;
                        .aboutListLeft{
                            float:left;
                            line-height:1.47rem;
                            font-size: 16px;
                            color: #333333;
                        }
                        .aboutListRight{
                            width:6rem;
                            text-align: right;
                            float:right;
                            line-height:1.47rem;
                            color: #666666;
                            font-size: 14px;
                        }
                    }
                    .aboutListS2{
                        width:100%;
                        height:1.47rem;
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: 0;
                        position: relative;
                        .aboutListLeft{
                            float:left;
                            line-height:1.47rem;
                            font-size: 16px;
                            color: #333333;
                        }
                        .aboutListRight2{
                            width:6rem;
                            float:right;
                            text-align: right;
                            padding:0.2rem;
                            box-sizing: border-box;
                            color: #666666;
                            font-size: 14px;
                        }
                    }
                }
                .aboutList:last-child{
                    .aboutListS{
                        border:none;
                    }
                }
            }
        }
    }
</style>