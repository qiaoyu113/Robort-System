<template>
    <div class="text-box">
        <!--切换选项卡-->
        <el-tabs v-model="tabIndex">
            <el-tab-pane label="发短信" name="1"></el-tab-pane>
            <el-tab-pane label="短信模板" name="2"></el-tab-pane>
            <el-tab-pane label="发送记录" name="3"></el-tab-pane>
        </el-tabs>
        <div class="text" v-if="tabIndex*1===1">
            <div class="title">
                <span class="el-tabs__item">发短信</span>
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
                <el-form-item label="短信模板：" :label-width="formLabelWidth" required>
                    <br>
                    <el-select v-model="form.templateId"  placeholder="请选择模板">
                        <el-option
                                v-for="item,index in tempList"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="定时送达：" :label-width="formLabelWidth">
                    <br>
                    <el-date-picker
                        v-model="form.sendTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="send()" class="center-button">确 定</el-button>
        </div>
        <div class="text-list" v-if="tabIndex*1===2">
            <div class="list">
                <el-button type="primary" @click="showAdd()" size="mini">新建模板</el-button>
                <el-table class="mt20"
                        :data="templateList"
                        empty-text="暂无数据"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            label="模板名称">
                        <template slot-scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="添加时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.applyTime | dateFormate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.varifyStatus*1===1">待审核</span>
                            <span v-if="scope.row.varifyStatus*1===2">通过</span>
                            <span v-if="scope.row.varifyStatus*1===3">未通过</span>
                            <el-tooltip  v-if="scope.row.varifyStatus*1===3" class="item" effect="dark" :content="scope.row.refuseReason" placement="bottom">
                                <el-button>原因</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showTemp(scope.$index)">详情</el-button>
                            <el-button type="text" @click="deleteTemp(scope.row.id)">删除</el-button>
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
        <div class="text-list" v-if="tabIndex*1===3">
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
            <div class="text-item">
                <div class="label">短信主题：</div>
                <div class="content">
                    {{ dialog.title }}
                </div>
            </div>
            <div class="text-item">
                <div class="label">短信内容：</div>
                <div class="content" v-html="dialog.content">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="新建短信模板"
                modal="false"
                :visible.sync="addDialogVisible"
                width="700px"
                center>
            <el-form :model="tempform">
                <el-form-item label="模板名称" :label-width="formLabelWidth" required>
                    <el-input maxlength="40"
                              placeholder="请输入主题"
                              v-model="tempform.title">
                    </el-input>
                </el-form-item>
                <el-form-item label="短信内容" :label-width="formLabelWidth" required>
                    <el-input maxlength="500" type="textarea" rows="10"
                              placeholder="请输入模板内容"
                              v-model="tempform.content">
                    </el-input>
                    <div class="text-content-desc">短信支持退订（结尾自动加上“-回复T退订”，占模版内容6个字数）<br>
                        不能发送营销/贷款/借款/中奖/抽奖类短信<br>
                        短信字数＝短信模板内容字数 + 签名字数，短信字数<=70个字数，按照70个字数一条短信计算，短信字数>70个字数，即为长短信，按照67个字数记为一条短信计算，最大支持500字
                    </div>
                </el-form-item>
                <el-form-item label="申请说明" :label-width="formLabelWidth" required>
                    <el-input type="textarea" rows="10"
                              placeholder="请输入您的用途，便于快速通过审核"
                              v-model="tempform.applyDesc">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="save()">提交</el-button>
            <el-button size="mini" @click="addDialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="提示"
                modal="false"
                :visible.sync="centerVisible"
                width="30%"
                center>
            <div class="text-item">
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
    import {userService} from '../../service/userService.js'
    export default {
        name: 'app',
        data: function (){
            return {
                tabIndex:1,
                userlist:['user1'],
                form:{
                    userGroup:[],sendTime:'',templateId:''
                },
                params:{
                    pageNo:1,pageSize:10
                },
                total:0,
                groups:[],
                templateList:[],
                tempList:[],
                history:[],
                addDialog:{},
                dialog:{},
                msg:{},
                tempform:{title:'',content:'',applyDesc:''},
                centerDialogVisible:false,
                addDialogVisible:false,
                centerVisible:false,
                tooltip:'tooltip',
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        mounted(){
            let that = this
            that.getUserGroups()
            that.getTempList()
        },
        watch:{
            tabIndex (cur, old) {
                let that = this;
                if(cur*1 === 1){
                    that.getTempList()
                }
                else if(cur*1 === 2){
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
//                console.log(that.form);
                if(!that.form.userGroup.length){
                    that.$message.error('请选择发送范围')
                }else if(!that.form.templateId){
                    that.$message.error('请选择短信模板')
                }else{
                    var ids = [],names = []
                    for(var item in that.form.userGroup){
                        ids.push(that.groups[that.form.userGroup[item]].id)
                        names.push(that.groups[that.form.userGroup[item]].name)
                    }
//                    console.log(that.form.sendTime.getTime());
                    var params={
                        groupIds:ids.toString(),
                        groupNames:names.toString(),
                        templateId:that.form.templateId,
                        sendTime:that.form.sendTime.getTime()
                    }
                    userService.sendTexts(params).then(function (res) {
                        if(res.data.success){
                            that.msg={
                                type:'success',title:'发送成功',message:res.data.message
                            }
                            that.form.sendTime = ''
                            that.form.templateId = ''
                            that.form.userGroup = []
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
                if(that.tempform.title.length<1){
                    that.$message.error('请输入主题')
                }else if(!that.tempform.content){
                    that.$message.error('请输入内容')
                }else{
                    userService.saveTexts(that.tempform).then(function (res) {
                        if(res.data.success){
                            that.msg={
                                type:'success',title:'发送成功',message:res.data.message
                            }
                            that.addDialogVisible = false
                            that.tempform.title = ''
                            that.tempform.content = ''
                            that.tempform.applyDesc = ''
                            that.params ={
                                pageNo:1,pageSize:10
                            }
                            that.getTemplates()
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
                    that.history=res.data.datas.datas
//                    console.log(that.history);
                    that.total = res.data.datas.totalCount
                })
            },
            getTemplates:function(){
                let that = this
                userService.getTextTemps(that.params).then(function (res) {
//                    console.log(res);
                    that.templateList=res.data.datas.datas
//                    console.log(that.templateList);
                    that.total = res.data.datas.totalCount
                })
            },
            getTempList:function(){
                let that = this
                userService.getTempList().then(function (res) {
//                    console.log(res);
                    that.tempList=res.data.datas
                })
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
            showTemp:function(i){
                let that = this
                that.centerDialogVisible = true
                that.dialog=that.templateList[i]

            },
            deleteTemp:function(i){
                let that = this
                that.$confirm('此操作将永久删除该模板, 是否继续?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
                    userService.deleteTexts(i).then(function () {
                        that.params ={
                            pageNo:1,pageSize:10
                        }
                        that.getTemplates()
                    })
                })
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
        },

    }
</script>

<style lang="less">
    .text-box{
        position: relative;
        margin:40px;
        width:750px;
        .el-button.el-tooltip {
            border: 0!important;
            background: transparent;
            color: #409EFF;
        }
        .add-text-temp{
            width: 700px;
        }
        .mt20{
            margin-top: 20px;
        }
        .text-content-desc{
            line-height: 22px;
        }
        .text-list{
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
        .text-item{
            padding-left: 65px;
            position: relative;
            .label{
                position: absolute;
                left: 0px;
                display: inline-block;
            }
        }
    }
    .text{
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