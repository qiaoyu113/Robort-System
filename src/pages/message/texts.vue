<template>
    <div class="message-box">
        <!--切换选项卡-->
        <el-tabs v-model="tabIndex">
            <el-tab-pane label="发短信" name="1"></el-tab-pane>
            <el-tab-pane label="短信模板" name="2"></el-tab-pane>
            <el-tab-pane label="发送记录" name="3"></el-tab-pane>
        </el-tabs>
        <div class="message" v-if="tabIndex*1===1">
            <div class="title">
                <span class="el-tabs__item">发短信</span>
            </div>
            <el-form :model="form">
                <el-form-item label="主题" :label-width="formLabelWidth" required>
                    <el-input maxlength="40"
                              placeholder="请输入主题"
                              v-model="form.title">
                    </el-input>
                </el-form-item>
                <el-form-item label="发送范围：" :label-width="formLabelWidth" required>
                    <br>
                    <el-select v-model="form.userGroup" multiple placeholder="请选择组">
                        <el-option
                                v-for="item,index in groups"
                                :key="item.id"
                                :label="item.name"
                                :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="短信模板：" :label-width="formLabelWidth" required>
                    <br>
                    <el-select v-model="form.template"  placeholder="请选择组">
                        <el-option
                                v-for="item,index in templates"
                                :key="item.id"
                                :label="item.name"
                                :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="send()" class="center-button">确 定</el-button>
        </div>
        <div class="message-list" v-if="tabIndex*1===2">
            <div class="list">
                <el-button type="primary" @click="showAdd()" size="mini">新建模板</el-button>
                <el-table
                        :data="templateList"
                        empty-text="暂无数据"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            label="模板名称">
                        <template slot-scope="scope">
                            <span v-for="item in scope.row.groupNames">{{item}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="添加时间">
                        <template slot-scope="scope">
                            <span  @click="showDetail(scope.$index)">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="审核状态">
                        <template slot-scope="scope">
                            {{ scope.row.sendTime | dateFormate }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            {{ scope.row.sendTime | dateFormate }}
                        </template>
                    </el-table-column>
                </el-table>
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
        <div class="message-list" v-if="tabIndex*1===3">
            <div class="list">
                <el-table
                        :data="history"
                        empty-text="暂无数据"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            label="发送对象">
                        <template slot-scope="scope">
                            <span v-for="item in scope.row.groupNames">{{item}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="主题">
                        <template slot-scope="scope">
                            <span  @click="showDetail(scope.$index)">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="发送时间">
                        <template slot-scope="scope">
                            {{ scope.row.sendTime | dateFormate }}
                        </template>
                    </el-table-column>
                </el-table>
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
        <el-dialog
                title="邮件详情"
                modal="false"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <div class="message-item">
                <div class="label">主题：</div>
                <div class="content">
                    {{ dialog.title }}
                </div>
            </div>
            <div class="message-item">
                <div class="label">邮件详情：</div>
                <div class="content" v-html="dialog.content">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="邮件详情"
                modal="false"
                :visible.sync="addDialogVisible"
                width="30%"
                center>
            <div class="message-item">
                <div class="label">主题：</div>
                <div class="content">
                    {{ addDialog.title }}
                </div>
            </div>
            <div class="message-item">
                <div class="label">邮件详情：</div>
                <div class="content" v-html="addDialog.content">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="addDialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="提示"
                modal="false"
                :visible.sync="centerVisible"
                width="30%"
                center>
            <div class="message-item">
                <div class="content">
                    {{ msg.message }}
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerVisible = false">确定</el-button>
          </span>
        </el-dialog>
        <div style="clear: both"></div>
    </div>
</template>


<script>
    let myEditor;// 富文本编辑器
    import {userService} from '../../service/userService.js'
    export default {
        name: 'app',
        data: function (){
            return {
                tabIndex:1,
                userlist:['user1'],
                form:{
                    checkedUser:[],text:'',detail:''
                },
                params:{
                    pageNo:1,pageSize:10
                },
                total:0,
                groups:[],
                templateList:[],
                addDialog:{},
                dialog:{},
                msg:{},
                centerDialogVisible:false,
                addDialogVisible:false,
                centerVisible:false
            }
        },
        mounted(){
            let that = this
            that.editor()
            that.getUserGroups()
        },
        watch:{
            tabIndex (cur, old) {
                let that = this;
                if(cur*1 === 2){
                    that.params ={
                        pageNo:1,pageSize:10
                    }
                    this.getTemplates()
                }
                else if(cur*1 === 3){
                    that.params ={
                        pageNo:1,pageSize:10
                    }
                    this.getMessages()
                }
            }
        },
        methods: {
            send:function(){
                let that = this
                that.form.detail = myEditor.getData();
                if(that.form.userGroup.length<1){
                    that.$message.error('请选择发送组')
                }else if(!that.form.title){
                    that.$message.error('请输入主题')
                }else if(!that.form.detail){
                    that.$message.error('请输入信内容')
                }else{
                    var ids = [],names = []
                    for(var item in that.form.userGroup){
                        ids.push(that.groups[that.form.userGroup[item]].id)
                        names.push(that.groups[that.form.userGroup[item]].name)
                    }
                    var params={
                        groupIds:ids,
                        groupNames:names,
                        type:1,
                        title:that.form.title,
                        content:that.form.detail
                    }
                    userService.sendTexts(params).then(function (res) {
                        if(res.data.success){
                            that.msg={
                                type:'success',title:'发送成功',message:res.data.message
                            }
                            that.centerVisible
                            that.form.title = ''
                            that.form.userGroup = []
                            setTimeout(function () {
                                myEditor.setData("");
                                that.form.detail = ''
                            },0)
                        }else{
                            that.$message({
                                type:'info',message:res.data.message
                            })
                        }
                    })
                }

            },
            save:function(){
                let that = this
                that.form.detail = myEditor.getData();
                if(that.form.userGroup.length<1){
                    that.$message.error('请选择发送组')
                }else if(!that.form.title){
                    that.$message.error('请输入主题')
                }else if(!that.form.detail){
                    that.$message.error('请输入信内容')
                }else{
                    var ids = [],names = []
                    for(var item in that.form.userGroup){
                        ids.push(that.groups[that.form.userGroup[item]].id)
                        names.push(that.groups[that.form.userGroup[item]].name)
                    }
                    var params={
                        groupIds:ids,
                        groupNames:names,
                        type:1,
                        title:that.form.title,
                        content:that.form.detail
                    }
                    userService.saveTexts(params).then(function (res) {
                        if(res.data.success){
                            that.msg={
                                type:'success',title:'发送成功',message:res.data.message
                            }
                            that.centerVisible
                            that.form.title = ''
                            that.form.userGroup = []
                            setTimeout(function () {
                                myEditor.setData("");
                                that.form.detail = ''
                            },0)
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
                userService.getTexts(that.params).then(function (res) {
//                    console.log(res);
                    that.list=res.data.datas.datas
                    console.log(that.list);
                    that.total = res.data.datas.totalCount
                })
            },
            getTemplates:function(){
                let that = this
                that.showList = true
                userService.getTextTemps(that.params).then(function (res) {
//                    console.log(res);
                    that.list=res.data.datas.datas
                    console.log(that.list);
                    that.total = res.data.datas.totalCount
                })
            },
            getUserGroups:function(){
                let that = this
                userService.getUserGroups().then(function (res) {
//                    console.log(res.data.datas);
                    that.groups = res.data.datas
                })
            },
            showDetail:function(i){
                let that = this
                that.centerDialogVisible = true
                that.dialog=that.list[i]

            },
            showAdd:function(){
                let that = this
                that.addDialogVisible = true
                that.addDialog={}
            },
            changeSize: function (size) {
                this.params.pageSize = size
                if(this.tabIndex*1 === 2){
                    this.getTemplates()
                }else if(this.tabIndex*1 === 3){
                    this.getMessages()
                }
            },
            changePage: function (no) {
                this.params.pageNo = no
                if(this.tabIndex*1 === 2){
                    this.getTemplates()
                }else if(this.tabIndex*1 === 3){
                    this.getMessages()
                }
            },
            // 富文本编辑器
            editor(){
                let CKEDITOR = window.CKEDITOR;
                myEditor = CKEDITOR.replace("detail");
                myEditor.setData("");
            },
        },

    }
</script>

<style lang="less">
    .message-box{
        position: relative;
        margin:40px;
        width:750px;
        .message-list{
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
        .message-item{
            padding-left: 65px;
            position: relative;
            .label{
                position: absolute;
                left: 0px;
                display: inline-block;
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