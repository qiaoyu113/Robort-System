<!-- 用户列表 -->
<template>
    <div class="user_list">
        <div class="title">
            <div class="add">
                <el-button @click="addGroup()" type="primary">+添加分组</el-button>
            </div>
            <div class="search clearfix">
                <div class="search_l">
                    <el-button @click="exportTable()" type="primary">导出用户</el-button>
                </div>
                <div class="search_r">
                    <el-input placeholder="请输入昵称、手机号" v-model="params.search" @change="search()">
                        <!-- <el-button slot="append"><i class="iconfont icon-sousuo"></i></el-button> -->
                        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                        <!-- <template slot="append"><p><i class="iconfont icon-sousuo"></i></p></template> -->
                    </el-input>
                </div>
            </div>
        </div>
        <div class="v_box">
            <div class="left-panel">
                <div class="group blue" @click="setGroup('all')" :class="{'active':groupIndex==='all'}">
                    全部分组
                    <span style="float: right">{{userNum}}</span>
                </div>
                <div class="group" v-for="group,index in groups" @click="setGroup(index)"
                     :class="{'active':groupIndex*1===index}">{{group.name}}
                    <span style="float: right">{{group.userNum}}</span>
                </div>
            </div>
            <div class="right-panel">
                <!-- 搜索框 -->
                <div class="top">
                    <span>{{grouptitle}}</span>
                    <el-button class="text-button" type="text" @click="editGroup()" v-if="groupIndex!='all'">重命名</el-button>
                    <el-button class="text-button" type="text" @click="deleteGroup()" v-if="groupIndex!='all'">删除</el-button>
                    <div class="right">
                        <el-select size="mini" v-model="moveto" placeholder="移动分组" @change="changeGroup()">
                            <el-option
                                    v-for="item in groups"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button size="mini" type="primary" @click="removeGroupUser()" v-if="groupIndex!='all'">移出分组</el-button>
                    </div>
                </div>
                <div class="table">
                    <el-table
                            :data="users"
                            border
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="头像">
                            <template slot-scope="cope">
                                <div class="potHand"  @click="getUserDetail(cope.row.id)"><img :src="picHead+cope.row.headImg" class="head-img"></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="姓名">
                            <template slot-scope="cope">
                                <div class="potHand"  @click="getUserDetail(cope.row.id)">
                                {{cope.row.name}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="手机号">
                            <template slot-scope="cope">
                                <div class="potHand" @click="getUserDetail(cope.row.id)">{{cope.row.phone}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="单位类型">
                            <template slot-scope="cope">
                                <div class="potHand"  @click="getUserDetail(cope.row.id)">{{cope.row.company}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="职位">
                            <template slot-scope="cope">
                                <div class="potHand"  @click="getUserDetail(cope.row.id)">{{cope.row.job}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="订阅">
                            <template slot-scope="cope">
                                <div class="potHand"  @click="getUserDetail(cope.row.id)">
                                <span v-if="cope.row.subscribeItems">是</span>
                                <span v-else>否</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="加入时间">
                            <template slot-scope="cope">
                                <span class="potHand"  @click="getUserDetail(cope.row.id)">{{cope.row.createTime | dateFormate}}</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="getUserslistId(scope.row.id)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                    <div class="paging">
                        <el-pagination v-if="total>params.pageSize"
                                       @size-change="changeSize"
                                       @current-change="changePage"
                                       :current-page="1"
                                       :page-sizes="[10, 20, 50,100]"
                                       :page-size="10"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 蒙层 -->
        <div class="modal" v-if="addFlag*1!==0">
            <div class="add-group-panel">
                <div class="add-title" v-if="addFlag*1===1">
                    增加分组
                </div>
                <div class="add-title" v-if="addFlag*1===2">
                    编辑分组
                </div>
                <div class="text">
                    <div>请输入分组名称</div>
                    <input type="text" v-model="groupName" placeholder="六个字以内">
                </div>
                <div class="button-group-box">
                    <el-button size="mini"  type="primary" @click="addGroup()">完成</el-button>
                    <el-button size="mini" @click="cancel()">取消</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {userService} from '../../service/userService.js'
    export default {
        name: 'app',
        data: function () {
            return {
                params: {
                    pageNo: 1,
                    pageSize: 10,
                    search: '',
                },
                addFlag: 0,
                total: 0,
                groups: [],
                users: [],
                grouptitle: "全部分组",
                groupIndex: 'all',
                groupName: '',
                groupId: '',
                userNum:0,
                moveto:'',
                selectUsers:[]
            }
        },
        computed: {
            picHead() {
                return this.$store.state.picHead
            }
        },
        mounted(){
            this.getGroups()
            this.getUsers()
        },
        methods: {
            // 获取用户组
            getGroups: function () {
                let that = this
                userService.getUserGroups(that.params).then(function (res) {
//                    console.log(res)
                    that.groups = res.data.datas
                })
            },
            // 获取用户列表
            getUsers: function () {
                let that = this
                userService.getUsers(that.params).then(function (res) {
//                    console.log(res)
                    that.users = res.data.datas.datas
                    that.userNum = res.data.datas.totalCount * 1
                    that.total = res.data.datas.totalCount * 1
                })
            },
            // 获取组用户
            getGroupUsers: function () {
                let that = this
                userService.getGroupUsers(that.params).then(function (res) {
//                    console.log(res)
                    that.users = res.data.datas.datas
                    that.total = res.data.datas.totalCount * 1
                })
            },
            //关闭查看详情
            closeDetail: function () {
                let that = this;
                that.detailShow = false;
            },
            setGroup: function (group) {
                let that = this
                if (group === 'all') {
                    that.params.pageNo=1
                    that.grouptitle = "全部分组"
                    that.groupIndex = "all"
                    that.getUsers(that.params)
                } else {
                    that.params.search=''
                    that.params.pageNo=1
                    that.groupIndex = group * 1
                    that.grouptitle = that.groups[group].name
                    that.params.id = that.groups[group].id
                    that.groupId = that.groups[group].id
                    that.getGroupUsers(that.params)
                }
            },
            search: function () {
                let that = this
                that.grouptitle = "全部分组"
                that.groupIndex = "all"
                that.groupId=''
                that.params.pageNo = 1
                that.getUsers()
            },
            exportTable: function () {
                userService.exportUserList()
            },
            addGroup() {
                let that = this
                that.$prompt('请输入组名', '新增分组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9a-zA-Z\u4e00-\u9fa5]{0,6}$/,
                    inputPlaceholder: '六个字以内',
                    inputErrorMessage: '六个字以内'
                }).then(({ value }) => {
                    userService.postUserGroups({name: value}).then(function (res) {
                        that.init();
                        that.$message({
                            type: 'success',
                            message: '新增分组: ' + value
                        });
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            editGroup() {
                let that = this
                that.$prompt('请修改组名', '编辑分组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9a-zA-Z\u4e00-\u9fa5]{0,6}$/,
                    inputErrorMessage: '六个字以内',
                    inputPlaceholder: '六个字以内',
                    inputValue:that.groupName
                }).then(({ value }) => {
                    userService.putUserGroups({id: that.groupId, name: value}).then(function (res) {
                        that.$message({
                            type: 'success',
                            message: '组名改为: ' + value
                        });
                        that.grouptitle = value
                        that.init();
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            deleteGroup() {
                let that = this
                this.$confirm('此操作将永久删除该分组, 是否继续?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userService.deleteUserGroups({groupId: that.groupId}).then(function (res) {
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.init();
                        that.groupName=''
                        that.grouptitle='全部分组'
                        that.groupIndex='all'
                        that.groupId=''
                        that.params.pageNo=1
                        that.getUsers()
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange: function (val) {
                this.selectUsers = []
                for(var user in val){
                    this.selectUsers.push(val[user].id)
                }
            },
            changeGroup: function () {
//                console.log(this.moveto);
                let that = this
                let params = {}
                if(that.groupIndex==="all"){
                    params={
                        groupIds:[that.moveto].toString(),userIds:(that.selectUsers).toString()
                    }
                }else{
                    params = {
                        fromGroupId:that.groupId,
                        groupIds:[that.moveto].toString(),userIds:(that.selectUsers).toString()
                    }
                }
                userService.move2group(params).then(function (res) {
                    that.params.pageNo = 1
                    that.initUsers()
                    that.moveto=''
                    that.$message({
                        type: 'success',
                        message: '移动分组成功'
                    });
                })
            },
            removeGroupUser: function () {
                let that = this
                var params = {
                   userIds:(that.selectUsers).toString(),
                   groupId:that.groupId
                }
                userService.removeGroupUser(params).then(function (res) {
                    that.params.pageNo = 1
                    that.initUsers()
                    that.moveto=''
                    that.$message({
                        type: 'success',
                        message: '移出分组成功'
                    });
                })

            },
            getUserDetail: function (id) {
                this.$router.push({path:'/users/'+id})
            },
            init: function () {
                this.getGroups()
            },
            initUsers: function () {
                this.getGroups()
                let that = this
                this.params.pageNo=1
                if (that.groupIndex === 'all') {
                    that.getUsers()
                } else {
                    that.getGroupUsers()
                }
            },
            changeSize: function (size) {
                this.params.pageSize = size
                this.getUsers()
            },
            changePage: function (no) {
                this.params.pageNo = no
                this.getUsers()
            }
        },

    }
</script>

<style lang="less" scope>
    .user_list {
       .potHand{width:100%;height:28px;cursor:pointer;}
        .title {
            padding: 20px 20px 0 40px;
            .search {
                float: right;
                width: 380px;
            }
            .search_l, .add, .search_r {
                display: inline-block;
            }
        }
        .v_box {
            margin: 20px 40px;
            min-height:600px;
            position: relative;
            padding-left: 180px;
            border: 1px solid #f0f0f0;

            .search {
                float: right;
                width: 360px;
            }
            .search_l {
                display: inline-block;
            }

            .search_r {
                display: inline-block;
            }
            .title {
                padding: 20px 20px 0 40px;
            }
            .left-panel {
                position: absolute;
                height: 100%;
                width: 180px;
                left: 0;
                top: 0;
                border-right: 1px solid #f0f0f0;
                .group {
                    height: 44px;
                    line-height: 44px;
                    padding: 0 20px;
                    border-bottom: 1px solid #f0f0f0;
                    cursor: pointer;
                }
                .active {
                    background: #409EFF;
                    color: #fff;
                }
            }
            .right-panel {
                .top {
                    line-height: 25px;
                    height: 25px;
                    padding: 12px;
                    font-size: 16px;
                }
                .right{
                    float: right;
                    .el-select {
                        width: 120px;
                    }
                }
            }
            .search {
                margin: 20px 0;
                .search_l {
                    float: left;
                    width: 300px;
                }
                .search_r {
                    float: right;
                }
            }
            .text-button{
                margin:0 20px;
                color:#409EFF;
                border: 0;
            }
            .table {
                width: 100%;
                // padding: 0 20px;
                .paging {
                    float: right;
                    margin-top: 20px;
                }
                .head-img{
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                }

            }
        }
        // 蒙版
        .modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .35);
            z-index: 2000;
            .add-group-panel{
                background: #fff;
                border-radius: 5px;
                .add-title{
                    padding: 10px;
                    font-size: 18px;
                    text-align: center;
                }
                .text {
                    font-size:  14px;
                    padding: 0 40px 20px 40px;
                    line-height:  40px;
                    input[type="text"] {
                        line-height: 30px;
                        padding: 0 12px;
                    }
                }
                .button-group-box {
                    margin: 0 0 20px 55px;
                    display: inline-block;
                }

            }
        }

    }


</style>