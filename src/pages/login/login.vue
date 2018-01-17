<template>
    <div id="login">
        <div class="loginBox">
            <div class="loginText">系统登录</div>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="user">
                    <el-input v-model.number="ruleForm2.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <!--滑动验证-->
                <div id="captcha-box"></div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {commonService} from '../../service/commonService'
    export default {
        data() {
            let checkUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }else{
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    geetesst: false,
                    user: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    user: [
                        { validator: checkUser, trigger: 'blur' }
                    ],
                }
            };
        },
        mounted:function(){
            let captchaBox = document.getElementById('captcha-box');
            let that = this
            commonService.getGaptchas().then(function(res){
                initGeetest({
                    // 以下配置参数来自服务端 SDK
                    gt:res.data.gt,
                    challenge: res.data.challenge,
                    product: "float", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: res.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                    width: '100%',
                }, function (captchaObj) {
                    // 这里可以调用验证实例 captchaObj 的实例方法
                    captchaObj.appendTo(captchaBox);
                    captchaObj.onSuccess(function () {
                        that.geetesst = true;
                    })
                })
            })
        },
        methods: {
            submitForm(formName) {
                let that = this
                that.$refs[formName].validate((valid) => {
                    console.log(valid)
                    let geetesst = that.geetesst
                    if(geetesst){
                        if (valid) {
                            alert('submit!');
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    }else{
                        alert('请点击按钮验证验证码')
                    }
                });
            },
        }
    }
</script>

<style lang="less">
#login{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    background:#2d3a4b;
    .loginBox{
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
        .loginText{
            width:100%;
            font-size: 26px;
            font-weight: bold;
            color: #eee;
            margin: 0 auto 40px auto;
            text-align: center;
        }
    }
}
.el-form-item{
    width:100%;
    /*height:50px;*/
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}
.el-input__inner{
    border:none;
    background:none;
    color:#fff;
}
.el-button--primary{
    width:100%;
}
.el-form-item:last-child .el-form-item__content{
    margin-left:0 !important;
}
.el-form-item__error{
    margin-left: -100px;
}
    #captcha-box{
        width:100%;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        margin-bottom:30px;
        overflow: hidden;
    }
</style>