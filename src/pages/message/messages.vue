<template>
    <div class="message">
        <div class="title">
            <span class="el-tabs__item">发站内信</span>
            <div class="el-button el-button--primary el-button--mini right20 mt10">发送记录</div>
        </div>
        <el-form :model="form">
            <el-form-item label="发送范围：" :label-width="formLabelWidth">
                <br>
                <el-select v-model="form.userGroup" placeholder="请选择组">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <el-select
                        v-model="form.users"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;"
                        placeholder="请选择用户">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发送内容：" :label-width="formLabelWidth">
                <el-input type="textarea" rows="10"
                        placeholder="请输入发送的内容"
                        v-model="form.text">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="send()" class="center-button">确 定</el-button>
    </div>
</template>


<script>
    import {userService} from '../../service/userService.js'
    export default {
        name: 'app',
        data: function (){
            return {
                userlist:['user1'],
                form:{
                    checkedUser:[],text:''
                }
            }
        },
        mounted(){
            this.getMessages()
        },
        methods: {
            getUsers:function(){
                this.$refs.modal.style.display="block"
                this.$refs.thepassword.style.display="block"
            },
            getMessages:function(){
                userService.getMessages()
            },


        },

    }
</script>

<style lang="less">
    .message{
        margin:40px;
        width:700px;
        padding-bottom: 20px;
        border:1px solid #f0f0f0;
        .right20{
            float:right;margin-right: 20px;
        }
        .mt10{
            margin-top:6px;
        }
        .title{
            border-bottom:1px solid #f0f0f0;
            line-height: 40px;
        }
        form{
            padding:20px;
        }
        .center-button{
            margin:0 auto;
            display: block;
        }
    }
</style>