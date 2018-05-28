<template>
    <div class="message-box">
        <div class="message">
            <div class="title">
                <span class="el-tabs__item">发站内信</span>
                <div class="el-button el-button--primary el-button--mini right20 mt10" @click="getMessages()">发送记录</div>
            </div>
            <el-form :model="form">
                <el-form-item label="发送范围：" :label-width="formLabelWidth" required>
                    <br>
                    <el-select v-model="form.userGroup" multiple placeholder="请选择组" @change="selectGroup">
                        <el-option
                                v-for="item,index in groups"
                                :key="item.id"
                                :label="item.name"
                                :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发送内容：" :label-width="formLabelWidth" required>
                    <el-input type="textarea" rows="10" maxlength="400"
                            placeholder="请输入发送的内容"
                            v-model="form.text">
                    </el-input>
                    <span class="right20">{{form.text.length}}/400</span>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="send()" class="center-button">确 定</el-button>
        </div>
        <div class="message-list" v-if="showList">
            <div class="title">
                发送记录
                <i class="el-icon-close" @click="closelist()"></i>
            </div>
            <div class="list">
                <div class="item" v-for="item in list">
                    <div class="group-list">
                        <span class="group" v-for="group in item.groupNames">{{group}}</span>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                    <div class="meta">
                        <span>{{item.sendTime | dateFormate}}</span>
                        <span class="right20">接收{{item.recieveNum}}人</span>
                    </div>
                </div>
            </div>
            <div class="paging">
                <el-pagination v-if="total>params.pageSize"
                               @size-change="changeSize"
                               @current-change="changePage"
                               :current-page="1"
                               :page-sizes="[10, 20, 50,100]"
                               :page-size="10"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total*1">
                </el-pagination>
            </div>
        </div>
        <div style="clear: both"></div>
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
                },
                params:{
                    pageNo:1,pageSize:10
                },
                total:0,
                groups:[],
                list:[],
                showList:false
            }
        },
        mounted(){
            let that = this
            that.getUserGroups()
        },
        methods: {
            send:function(){
                let that = this
//                console.log(that.form.userGroup);
                if(that.form.userGroup.length<1){
                    that.$message.error('请选择发送组')
                }else if(!that.form.text){
                    that.$message.error('请输入信内容')
                }else{
                    var ids = [],names = []
                    for(var item in that.form.userGroup){
                        ids.push(that.groups[that.form.userGroup[item]].id)
                        names.push(that.groups[that.form.userGroup[item]].name)
                    }
                    var params={
                        groupIds:ids.toString(),
                        groupNames:names.toString(),
                        type:1,
                        content:that.form.text
                    }
                    userService.sendMessages(params).then(function (res) {
                        if(res.data.success){
                            that.$message({
                                type:'success',message:'发送成功'
                            })
                            that.form.userGroup = []
                            that.form.text = ''
                        }else{
                            that.$message({
                                type:'info',message:res.data.message
                            })
                        }
                    })
                }

            },
            getMessages:function(){
                let that = this
                that.showList = true
                userService.getMessages(that.params).then(function (res) {
//                    console.log(res);
                    that.list=res.data.datas.datas
                    that.total = res.data.datas.totalCount
                })
            },
            closelist:function(){
                let that = this
                that.showList = false
                that.params.pageNo = 1
            },
            getUserGroups:function(){
                let that = this
                userService.getUserGroups().then(function (res) {
//                    console.log(res.data.datas);
                    that.groups = res.data.datas
                    that.groups.unshift({id:1,name:'全部分组'})
                })
            },
            selectGroup:function(group){
                for(let i of group){
                    if(i==0){
                        this.form.userGroup = [0]
                    }
                }
            },
            changeSize: function (size) {
                this.params.pageSize = size
                this.getMessages()
            },
            changePage: function (no) {
                this.params.pageNo = no
                this.getMessages()
            }


        },

    }
</script>

<style lang="less">
    .message-box{
        position: relative;
        margin:40px;
        width:750px;
        .message-list{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            min-height: 100%;
            z-index: 1000;
            background: #fff;
            padding-bottom: 50px;
            border:solid #f0f0f0;
            border-width:1px 1px 0 1px ;
            .title{
                font-size: 18px;
                padding:12px 20px;
                border-bottom: 1px solid #eee;
                i.el-icon-close {
                    float: right;
                    font-size: 24px;
                    color: #777;
                    cursor:pointer;
                }
            }
            .list{
                span.group {
                    padding: 10px;
                    line-height:  35px;
                    border-radius: 5px;
                    border: 1px solid #f0f0f0;
                    margin: 0 20px 0 0;
                }
                .item {
                    padding: 10px 20px;
                    border-bottom:  1px solid #eee;
                }
                .content{
                    font-size: 14px;
                    padding-bottom: 10px;
                    line-height: 35px;
                }
                .meta{
                    color: #999;
                }

            }
        }
    }
    .message{
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
            .el-select{
                width:100%;
            }
        }
        .center-button{
            margin:0 auto;
            display: block;
        }
    }
</style>