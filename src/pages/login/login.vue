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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var checkUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    user: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    user: [
                        { validator: checkUser, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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
.el-form-item__content:last-child{
    margin-left:0 !important;
}
</style>