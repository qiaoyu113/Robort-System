<template>
    <div id="password">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            设置
        </div>
        <div class="box">
            <!--旧密码-->
            <div class="oldPass" v-if="passCode">
                <input type="password" placeholder="旧密码" v-model="password"/>
            </div>
            <!--新密码-->
            <div class="newPass">
                <div class="new">
                    <input type="password" placeholder="新密码" v-model="passwordNew"/>
                </div>
                <div class="new">
                    <input type="password" placeholder="确认新密码" v-model="passwordNew2"/>
                </div>
            </div>
            <!--确认修改-->
            <div class="saveYes save" v-if="passCode && inp1 && inp2 && inp3" @click="save()">确认修改</div>
            <div class="saveYes save" v-else-if="!passCode && inp2 && inp3" @click="save()">确认修改</div>
            <div class="saveYes" v-else>确认修改</div>
            <!--提示-->
            <div v-if="hintShow">
                <div class="hint" v-if="hint">{{hintText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {commonService} from '../../service/personalService'
    export default {
        data () {
            return {
                password:'',
                passwordNew:'',
                passwordNew2:'',
                inp1:false,
                inp2:false,
                inp3:false,
                passCode:true,//是否有旧密码
                hint:false,//提示框
                hintText:'',//提示框里的内容
                hintShow:false,//提示框执行动画
            }
        },
        mounted: function () {
            this.onMove();
            this.password = '';
            this.passwordNew = '';
            this.passwordNew2 = '';
        },
        methods: {
            //修改密码
            save:function(){
                let that = this;
                //有旧密码
                if(that.passCode){
                    if(that.passwordNew.length < 6){
                        that.hint = true;
                        that.hintShow = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        setTimeout(function(){
                            that.hintShow = false;
                        },1500)
                        return;
                    }else if(that.passwordNew.length > 24){
                        that.hint = true;
                        that.hintShow = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        setTimeout(function(){
                            that.hintShow = false;
                        },1500)
                        return;
                    }else if(that.passwordNew != this.passwordNew2){
                        that.hint = true;
                        that.hintShow = true;
                        that.hintText = '两次输入的密码不一致';
                        setTimeout(function(){
                            that.hintShow = false;
                        },1500)
                        return;
                    }else if(that.passwordNew.length<=24 && that.passwordNew.length>=6) {
                        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
                        if (!regExp.test(that.passwordNew)) {
                            that.hint = true;
                            that.hintShow = true;
                            that.hintText = '请输入6~24位字母、数字组合的密码';
                            setTimeout(function(){
                                that.hintShow = false;
                            },1500)
                        }else{
                            commonService.myPassword({oldPassword:that.passwordOld,newPassword:that.passwordNew}).then(function(res){
                                if(res.data.code === 513107){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else if(res.data.code === 513103){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '旧密码不能为空';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else if(res.data.code === 513104){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '请输入6~24位字母、数字组合的密码';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else if(res.data.code === 513114){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else{
                                    that.exitShow = true;
                                }
                            })
                        }
                    }
                }else{
                    //没有旧密码
                    if(that.passwordNew.length < 6){
                        that.hint = true;
                        that.hintShow = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        setTimeout(function(){
                            that.hintShow = false;
                        },1500)
                        return;
                    }else if(that.passwordNew.length > 24){
                        that.hint = true;
                        that.hintShow = true;
                        that.hintText = '请输入6~24位字母、数字组合的密码';
                        setTimeout(function(){
                            that.hintShow = false;
                        },1500)
                        return;
                    }else if(that.passwordNew != this.passwordNew2){
                        that.hint = true;
                        that.hintShow = true;
                        that.hintText = '两次输入的密码不一致';
                        setTimeout(function(){
                            that.hintShow = false;
                        },1500)
                        return;
                    }else if(that.passwordNew.length<=24 && that.passwordNew.length>=6) {
                        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
                        if (!regExp.test(that.passwordNew)) {
                            that.hint = true;
                            that.hintShow = true;
                            that.hintText = '请输入6~24位字母、数字组合的密码';
                            setTimeout(function(){
                                that.hintShow = false;
                            },1500)
                        }else{
                            commonService.myPassword2({password:that.passwordNew}).then(function(res){
                                if(res.data.code === 513107){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else if(res.data.code === 513103){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '旧密码不能为空';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else if(res.data.code === 513104){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '请输入6~24位字母、数字组合的密码';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else if(res.data.code === 513114){
                                    that.hint = true;
                                    that.hintShow = true;
                                    that.hintText = '旧密码错误,请重新输入';
                                    setTimeout(function(){
                                        that.hintShow = false;
                                    },1500)
                                }else{
                                    that.exitShow = true;
                                }
                            })
                        }
                    }
                }
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
                that.$router.replace({name:'set2'})
            }
        },
        watch:{
            password(val){
                let that = this;
                if(val.length > 0){
                    that.inp1 = true
                }else{
                    that.inp1 = false
                }
            },
            passwordNew(val){
                let that = this;
                if(val.length > 0){
                    that.inp2 = true
                }else{
                    that.inp2 = false
                }
            },
            passwordNew2(val){
                let that = this;
                if(val.length > 0){
                    that.inp3 = true
                }else{
                    that.inp3 = false
                }
            }
        }
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
    #password {
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
            .oldPass{
                width:100%;
                height:1.47rem;
                margin-top:0.27rem;
                padding:0.2rem 0.4rem;
                box-sizing: border-box;
                background:#fff;
                input{
                    width:100%;
                    height:100%;
                    border: none;
                    outline: none;
                }
                input::-webkit-input-placeholder{
                    font-size: 16px;
                    color: #BBBBBB;
                }
                input:-moz-placeholder{
                    font-size: 16px;
                    color: #BBBBBB;
                }
                input::-moz-placeholder{
                    font-size: 16px;
                    color: #BBBBBB;
                }
                input:-ms-input-placeholder{
                    font-size: 16px;
                    color: #BBBBBB;
                }
            }
            .newPass{
                width:100%;
                background:#fff;
                margin-top:0.27rem;
                .new{
                    width:100%;
                    height:1.47rem;
                    padding:0.2rem 0.4rem;
                    box-sizing: border-box;
                    input{
                        width:100%;
                        height:100%;
                        border: none;
                        outline: none;
                    }
                    input::-webkit-input-placeholder{
                        font-size: 16px;
                        color: #BBBBBB;
                    }
                    input:-moz-placeholder{
                        font-size: 16px;
                        color: #BBBBBB;
                    }
                    input::-moz-placeholder{
                        font-size: 16px;
                        color: #BBBBBB;
                    }
                    input:-ms-input-placeholder{
                        font-size: 16px;
                        color: #BBBBBB;
                    }
                }
            }
            .saveYes{
                width:100%;
                height:1.2rem;
                line-height:1.2rem;
                text-align: center;
                font-size: 16px;
                color: #BBBBBB;
                background:#fff;
                margin-top:0.54rem;
            }
            .save{
                color:#6699FF;
            }
            .hint{
                width:80%;
                height:1.2rem;
                line-height:1.2rem;
                color:#fff;
                background:#333;
                opacity: 0;
                position:fixed;
                left:0;
                top:0;
                bottom:0;
                right:0;
                margin:auto;
                font-size:14px;
                animation: show_state 2.5s ease 0s;
                text-align: center;
            }
        }
    }
    @keyframes show_state{
        0%{
            -webkit-transform: scale(.1);
            -moz-transform: scale(.1);
            -o-transform: scale(.1);
            -ms-transform: scale(.1);
            transform: scale(.1);
            opacity: 0;
        }
        30%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.7;
        }
        50%{
            -webkit-transform: scale(2);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.7;
        }
        90%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.7;
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
</style>