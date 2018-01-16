<template>
    <div id="vip">
        <div class="title" @click="back()">
            <i class="iconfont icon-fanhui"></i>
            会员中心
        </div>
        <div class="vipCenter">
            <!--非会员-->
            <div class="vipCard" v-if="!isVip">
                <p>开通VIP</p>
                <p>享受会员,这里在加点什么话</p>
            </div>
            <!--是会员-->
            <div class="vipCard2" v-if="isVip">
                <div class="vipImg">
                    <img src="../../assets/image/header.png">
                </div>
                <div class="vipText">
                    <p>我是吴彦祖</p>
                    <p>2018-02-12到期</p>
                </div>
            </div>
            <!--会员套餐-->
            <div class="vipCombo">
                <div class="vipCombo-title">会员套餐</div>
                <div class="vipCombo-btn" v-for="v in vips">
                    <p>{{v.day}}天</p>
                    <div class="vipPay" @click="payVip(v.id)">{{v.money}}元</div>
                </div>
            </div>
            <!--会员专享-->
            <div class="exclusive">
                <div class="exclusive-top">会员专享</div>
                <div class="exclusive-text">
                    <div class="exclusive-img">
                        <img src="../../assets/image/collect.png"/>
                    </div>
                    <div class="exclusiveName">
                        <p>会员专享</p>
                        <p>参与会员用户专属内容</p>
                    </div>
                </div>
                <div class="exclusive-text">
                    <div class="exclusive-img">
                        <img src="../../assets/image/collect.png"/>
                    </div>
                    <div class="exclusiveName">
                        <p>尊贵身份标识</p>
                        <p>点亮会员专属标识</p>
                    </div>
                </div>
                <div class="exclusive-text">
                    <div class="exclusive-img">
                        <img src="../../assets/image/collect.png"/>
                    </div>
                    <div class="exclusiveName">
                        <p>会员折扣</p>
                        <p>会员购买付费内容享会员价</p>
                    </div>
                </div>
                <div class="exclusive-text">
                    <div class="exclusive-img">
                        <img src="../../assets/image/collect.png"/>
                    </div>
                    <div class="exclusiveName">
                        <p>线下活动优先权</p>
                        <p>线下活动无需审核即可参与</p>
                    </div>
                </div>
            </div>
            <!--会员须知-->
            <div class="vipKnow">
                <div class="vipKnow-top">会员须知</div>
                <div class="vipKnowText">
                    <p>1.会员属平台会员，非社群号会员，适用于企智全平台；</p>
                    <br/>
                    <p> 2.会员的购买及续期均按小时计算，从开通成功之时算起，多次购买按累加计算会员有效期；</p>
                    <br/>
                    <p>3.会员一经购买不可退费；</p>
                    <br/>
                    <p>4.最终解释权归企智网平台所有。</p>
                </div>
            </div>
        </div>
        <!--提示弹窗-->
        <div class="pop-up" v-if="shadeShow">
            <div class="pop-top">您正在购买30天会员，确定开通30天会员吗？</div>
            <div class="pop-btn">
                <div class="popNo" @click="shadeNo()">取消</div>
                <div class="popYes" @click="payOK()">购买</div>
            </div>
        </div>
        <!--遮罩层-->
        <div class="shade" v-if="shadeShow"></div>
    </div>
</template>

<script>
    import {commonService} from '../../service/personalService'
    export default {
        data () {
            return {
                isVip:true,//             判断是不是会员
                shadeShow:false,// 是否显示弹窗
                payShow:false,//购买完成的动画
                vips:[
                    {id:1,day:30,money:10},
                    {id:2,day:180,money:100},
                    {id:3,day:360,money:300},
                ]
            }
        },
        mounted: function () {
            let that = this;
            that.onMove();
        },
        methods: {
            //购买vip按钮
            payVip:function(id){
                let that = this;
                that.shadeShow = true;
            },
            //取消购买和购买成功的效果
            shadeNo:function(){
                let that = this;
                that.shadeShow = false;
            },
            //购买成功效果
            payOK:function(){
                let that = this;
                that.shadeShow = false;
            },
            //返回按钮
            back:function(){
                let that = this;
                that.$router.replace({name:'mycenter'})
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
                overscroll(document.querySelector('.vipCenter'));
                document.body.addEventListener('touchmove', function(evt) {
                    //In this case, the default behavior is scrolling the body, which
                    //would result in an overflow.  Since we don't want that, we preventDefault.
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
        },
    }
</script>

<style lang="less">
    *{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color:transparent;
    }
    #vip{
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
            border-bottom: 1px solid rgba(221, 221, 221, 0.5);
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
        .vipCenter{
            width:100%;
            position: fixed;
            top:1.173rem;
            bottom:0;
            background:#F9F9F9;
            overflow: scroll;
            .vipCard{
                width:9.2rem;
                height:2.2rem;
                background:#333333;
                border-radius: 10px;
                margin:0.4rem auto;
                padding:0.53rem 0.4rem;
                box-sizing: border-box;
                p{
                    width:100%;
                    font-size: 15px;
                    color: #FDE4A4;
                }
            }
            .vipCard2{
                width:9.2rem;
                height:2.2rem;
                background:#333333;
                border-radius: 10px;
                margin:0.4rem auto;
                padding:0.32rem 0.53rem;
                box-sizing: border-box;
                .vipImg{
                    width:1.47rem;
                    height:1.47rem;
                    float:left;
                    border: 2px solid #A58455;
                    border-radius: 100%;
                    overflow: hidden;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 100%;
                    }
                }
                .vipText{
                    width:3rem;
                    float:left;
                    margin-left:0.4rem;
                    p:nth-child(1){
                        line-height:0.9rem;
                        font-size: 16px;
                        color: #FFFFFF;
                    }
                    p:nth-child(2){
                        font-size: 12px;
                        color: #EEEEEE;
                    }
                }
            }
            .vipCombo{
                width:100%;
                padding:0.4rem 0.4rem 0 0.4rem;
                box-sizing: border-box;
                background:#ffffff;
                .vipCombo-title{
                    width:100%;
                    font-size: 18px;
                    color: #333333;
                    letter-spacing: 0.3px;
                    font-weight: bold;
                }
                .vipCombo-btn{
                    width:100%;
                    height:2.19rem;
                    border-bottom:1px solid #eeeeee;
                    p{
                        float:left;
                        line-height:2.19rem;
                        font-size: 16px;
                        color: #333333;
                        font-weight: bold;
                    }
                    .vipPay{
                        width:1.7rem;
                        height:0.9rem;
                        float:right;
                        text-align: center;
                        line-height:0.9rem;
                        background: #333333;
                        border-radius: 74px;
                        font-size: 16px;
                        color: #FDE4A4;
                        letter-spacing: 0.27px;
                        margin: 0.55rem 0;
                    }
                }
                .vipCombo-btn:last-child{
                    border:none;
                }
            }
        }
        .exclusive{
            width:100%;
            padding:0.4rem 0.4rem 0 0.4rem;
            box-sizing: border-box;
            background:#fff;
            margin-top:0.27rem;
            .exclusive-top{
                width:100%;
                font-size: 18px;
                color: #333333;
                letter-spacing: 0.3px;
                font-weight: bold;
            }
            .exclusive-text{
                width:100%;
                height:2rem;
                box-sizing: border-box;
                border-bottom:1px solid #EEEEEE;
                .exclusive-img{
                    width:1.07rem;
                    height:1.07rem;
                    margin-top:0.4rem;
                    float:left;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .exclusiveName{
                    float:left;
                    margin-left:0.45rem;
                    margin-top:0.4rem;
                    p:nth-child(1){
                        font-size: 15px;
                        color: #333333;
                        letter-spacing: 0.25px;
                        font-weight: bold;
                    }
                    p:nth-child(2){
                        font-size: 13px;
                        color: #333333;
                        letter-spacing: 0.22px;
                        margin-top:0.1rem;
                    }
                }
            }
            .exclusive-text:last-child{
                border:none;
            }
        }
        .vipKnow{
            width:100%;
            margin-top:0.27rem;
            background:#fff;
            padding:0.4rem;
            box-sizing: border-box;
            .vipKnow-top{
                width:100%;
                font-size: 18px;
                color: #333333;
                letter-spacing: 0.3px;
                font-weight: bold;
            }
            .vipKnowText{
                margin-top:0.4rem;
                p{
                    font-size: 15px;
                    color: #333333;
                    letter-spacing: 0.27px;
                }
            }
        }
        .pop-up{
            width:7.2rem;
            height:3.58rem;
            position:fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background: #FFFFFF;
            border: 1px solid #EEEEEE;
            z-index:300;
            .pop-top{
                width:100%;
                height:2.4rem;
                padding:0.53rem;
                box-sizing: border-box;
                border-bottom:1px solid #EEEEEE;
            }
            .pop-btn{
                width:100%;
                height:1.17rem;
                .popNo{
                    width:50%;
                    float:left;
                    height:1.17rem;
                    border-right:1px solid #eee;
                    text-align: center;
                    line-height:1.17rem;
                    font-size: 17px;
                    color: #666666;
                }
                .popYes{
                    width:calc(50% - 1px);
                    float:left;
                    height:1.17rem;
                    text-align: center;
                    line-height:1.17rem;
                    font-size: 17px;
                    color:#007AFF;
                }
            }
        }
        .shade{
            width:100%;
            position:fixed;
            height:100%;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background:#333;
            opacity: 0.65;
            z-index:200;
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