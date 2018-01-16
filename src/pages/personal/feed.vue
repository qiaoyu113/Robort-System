<template>
    <div id="feed">
        <div class="title">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            意见反馈
        </div>
        <div class="box">
            <!--意见反馈-->
            <div class="feedTitle">意见反馈</div>
            <div class="feed">
                <div class="feedBox">
                    <textarea placeholder="感谢您对我们企智网的支持，您的意见是我们进步的不竭动力" v-model="areaText"></textarea>
                </div>
                <!--上传图片-->
                <div class="feedImg">
                    <!--展示区-->
                    <div class="imgShow" v-for="(img,index) in Images">
                        <img :src="img.src">
                        <i class="iconfont icon-Shape" @click="delImage(index)"></i>
                    </div>
                    <!--上传按钮-->
                    <div class="upIng">
                        +
                        <input id="file" type="file" @change="onFileChange" multiple>
                    </div>
                </div>
            </div>
            <!--联系方式-->
            <div class="feedTitle">您的联系方式</div>
            <!--姓名和电话-->
            <div class="phone">
                <input type="text" placeholder="姓名" v-model="nameText">
            </div>
            <div class="phone">
                <input type="number" placeholder="电话" v-model="phoneText">
            </div>
            <!--提交-->
            <div class="submit" @click="submit()">提交</div>
            <!--客服-->
            <div class="talk">
                <p>客服：010-65513781</p>
                <p>在线时间：工作日9:00-18:00</p>
            </div>
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
                Images:[
                    {src:'http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg'},
                    {src:'http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg'},
                    {src:'http://test.resource.vjuzhen.com/group1/M00/00/7A/J2pyQFo9-SmASrNsAAAthSeQyC8135.jpg'},
                ],
                hint:false,//提示框
                hintText:'',//提示框里的内容
                hintShow:false,//提示框执行动画
                areaText:'',//输入的内容
                areaPass:false,
                nameText:'',//名字
                namePass:false,
                phoneText:'',//电话
                phonePass:false,
            }
        },
        mounted: function () {
            this.onMove();
        },
        methods: {
            addPic(e){
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
            },
            createImage(file) {
                let vm = this
                if(typeof FileReader==='undefined'){
                    vm.hint = true;
                    vm.hintShow = true;
                    vm.hintText = '您的浏览器不支持图片上传';
                    setTimeout(function(){
                        vm.hintShow = false;
                    },1500)
                    return false;
                }
                let image = new Image();
                let leng=file.length;
                let files = document.getElementById('file');
                for(let i=0;i<leng;i++){
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
                        if(vm.Images.length >= 3){
                            vm.hint = true;
                            vm.hintShow = true;
                            vm.hintText = '最多上传3张';
                            setTimeout(function(){
                                vm.hintShow = false;
                            },1500)
                            files.value = ''
                        }else{
                            vm.Images.push({src:e.target.result});
                            files.value = ''
                        }
                    };
                }
            },
            //删除图片
            delImage:function(index){
                let that = this;
                let imgs = that.Images;
                imgs.splice(index,1)
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
                that.$router.push({name:'help'})
            },
            //提交
            submit:function(){
                let that = this;
                if(!that.areaPass) {
                    that.hint = true;
                    that.hintShow = true;
                    that.hintText = '请填写您的意见';
                    setTimeout(function () {
                        that.hintShow = false;
                    }, 1500)
                    return
                }else if(!that.namePass) {
                    that.hint = true;
                    that.hintShow = true;
                    that.hintText = '请填写您的姓名';
                    setTimeout(function () {
                        that.hintShow = false;
                    }, 1500)
                    return
                }else if(!that.phonePass) {
                    that.hint = true;
                    that.hintShow = true;
                    that.hintText = '请填写正确的手机号';
                    setTimeout(function () {
                        that.hintShow = false;
                    }, 1500)
                    return
                }else{
                    //提交成功
                    alert('成功提交')
                }
            }
        },
        watch:{
            areaText(val){
                if(val.length != 0){
                    this.areaPass = true;
                }else{
                    this.areaPass = false;
                }
            },
            nameText(val){
                if(val.length != 0){
                    this.namePass = true;
                }else{
                    this.namePass = false;
                }
            },
            phoneText(val){
                if(val.length != 0){
                    let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
                    let flag = reg.test(val);
                    if(flag){
                        this.phonePass = true;
                    }else{
                        this.phonePass = false;
                    }
                }else{
                    this.phonePass = false;
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
    #feed {
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
            .feedTitle{
                width:100%;
                font-size: 13px;
                color: #666666;
                margin-top:0.52rem;
                margin-bottom:0.2rem;
                padding:0 0.4rem;
                box-sizing: border-box;
            }
            .feed{
                width:100%;
                background:#fff;
                .feedBox{
                    width:100%;
                    background:#fff;
                    padding:0.27rem;
                    box-sizing: border-box;
                    textarea{
                        width:100%;
                        height:4.8rem;
                        outline: none;
                        border:none;
                        resize:none;
                        font-size: 16px;
                        color: #333;
                    }
                    textarea::-webkit-input-placeholder {
                        color: #BBBBBB;
                    }
                    textarea:-moz-placeholder {
                        color: #BBBBBB;
                    }
                    textarea::-moz-placeholder {
                        color: #BBBBBB;
                    }
                    textarea:-ms-input-placeholder {
                        color: #BBBBBB;
                    }
                }
                .feedImg{
                    width:100%;
                    background:#fff;
                    padding:0.4rem 0.4rem;
                    box-sizing: border-box;
                    overflow: hidden;
                    .imgShow{
                        width:1.33rem;
                        height:1.33rem;
                        float:left;
                        margin-right:0.5rem;
                        position: relative;
                        img{
                            width:100%;
                            height:100%;
                            border-radius: 6px;
                        }
                        i{
                            width:0.3rem;
                            height:0.3rem;
                            position:absolute;
                            right: -0.1rem;
                            top: -0.1rem;
                            color:#BBBBBB;
                            background: #fff;
                            border-radius: 100%;
                        }
                        i::before{
                            width: 0.3rem;
                            height: 0.3rem;
                            position: absolute;
                            right: 0;
                            top: -0.1rem;
                            color: #BBBBBB;
                            background: #fff;
                            border-radius: 100px;
                        }
                    }
                    .upIng{
                        width:1.25rem;
                        height:1.25rem;
                        float:left;
                        margin-right:0.4rem;
                        position: relative;
                        border:2px dashed #BBBBBB;
                        border-radius: 6px;
                        text-align: center;
                        line-height:1.1rem;
                        font-size:28px;
                        color:#bbb;
                        overflow: hidden;
                        input{
                            width:100%;
                            height:100%;
                            position:absolute;
                            left:0;
                            top:0;
                            opacity: 0;
                        }
                    }
                }
            }
            .phone{
                width:100%;
                height:1.47rem;
                padding:0 0.4rem;
                background:#fff;
                box-sizing: border-box;
                input{
                    width:100%;
                    height:100%;
                    border:none;
                    outline:none;
                    font-size:16px;
                    color: #333;
                }
                input::-webkit-input-placeholder {
                    color: #BBBBBB;
                }
                input:-moz-placeholder {
                    color: #BBBBBB;
                }
                input::-moz-placeholder {
                    color: #BBBBBB;
                }
                input:-ms-input-placeholder {
                    color: #BBBBBB;
                }
            }
            .submit{
                width:100%;
                height:1.2rem;
                text-align: center;
                line-height:1.2rem;
                color: #6699FF;
                font-size: 16px;
                background:#fff;
                margin-top:0.54rem;
            }
            .talk{
                width:100%;
                text-align: center;
                font-size: 12px;
                color: #999999;
                margin-top:1.2rem;
                margin-bottom:0.5rem;
                p{
                    font-size: 12px;
                    color: #999999;
                }
            }
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
            opacity: 0.9;
        }
        50%{
            -webkit-transform: scale(2);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.9;
        }
        90%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 0.9;
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