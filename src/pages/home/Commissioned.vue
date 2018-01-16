<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <div id="comment" v-set-title="title">
        <div class="page-title"><z-history :type="1"></z-history>评论专区
            <span v-if="commentlists.length > 0">({{commentlists.length}}条)</span>
        </div>
        <div class="comment-box">
            <div v-if="commentlists.length < 1" class="commentlists-no">成为第一个评论的人</div>
            <div class="comment-list" v-for="(item,index) in commentlists"  v-if="commentlists.length > 0">
                <div class="comment-list-left" v-if="item.userHeadImg != null && item.userHeadImg != ''">
                    <img :src='$store.state.picHead + item.userHeadImg'>
                </div>
                <div class="comment-list-left" v-if="item.userHeadImg == null || item.userHeadImg == ''">
                    <img src="../../assets/image/header.png">
                </div>
                <div class="comment-list-right">
                    <div class="comment-list-top">
                        <div>
                            <span class="comment-list-name">{{item.userName}}</span>
                            <span class="comment-list-vip">会员</span>
                        </div>
                        <div class="comment-list-reply" @click="onreply(item.id,item.userName,item.userId,0,index)" v-if="backShow">回复</div>
                        <router-link :to="{name:'login'}">
                            <div class="comment-list-reply" v-if="!backShow">回复</div>
                        </router-link>
                    </div>
                    <div class="comment-list-center">{{item.content}}</div>
                    <div class="comment-list-time">{{item.commentTime}}</div>
                    <!--回复区域-->
                    <div class="comment-reply-content" v-if="item.comments != null && item.comments.length != 0">
                        <!--登陆-->
                        <div class="comment-reply-back" v-for="replyuser in item.comments" @click="addreply(item.id,replyuser.userName,replyuser.userId,1,index)" v-if="backShow">
                            <span>{{replyuser.userName}}</span> 回复 <span>{{replyuser.originalUserName}}</span>：{{replyuser.content}}
                        </div>
                        <!--未登陆-->
                        <router-link :to="{name:'login'}">
                            <div class="comment-reply-back" v-for="replyuser in item.comments" v-if="!backShow">
                                <span>{{replyuser.userName}}</span> 回复 <span>{{replyuser.originalUserName}}</span>：{{replyuser.content}}
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 加载 -->
        <div v-infinite-scroll="upCallback" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="infinite-hasfooter">
            <div class="inifinte-text" v-if="!lastPage">正在加载...</div>
            <div class="inifinte-text" v-if="lastPage">--END--</div>
        </div>
    </div>
</template>

<script>
    import {common} from '../../assets/js/common/common'
    import {mjhService} from '../../service/mjhService'
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
                title:"评论区",
                id:'',
                pageNo:1,
                text:[],
                backShow:false,
                commentlists:[],
                time:'',
                param:{id: this.$route.params.id},
                parentMsg:'',
                page:{num:1,size:8},
                busy : false,
                good:null,
                lastPage:false
            }
        },
//         syncData({store}) {
//             /*基本规则
//             * 所有不需要token的请求都放在这里
//             * 这里不出现window，document等DOM元素
//             * 这里获得的数据都要存储在store中
//             * 写法如下
//             * */
//             const that = this;
//             /*
//             * 将所有的请求处理以数组放在promise中
//             * that.data().data调用数据
//             * */
//             return Promise.all([
//                 appervice.getParam().then(res=>{
// //                    store.state.homeStore.listImg = res.data;
//                 }),
//                 service.getParam().then(res=>{
// //                    store.state.homeStore.noticelist = res.data.datas;
//                 }),
//             ])
//         },
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
            /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */
            let that = this;
            let token = window.localStorage.getItem('token');
            if(token){
                that.backShow = true;
            }else{
                that.backShow = false;
            }
        },
        methods: {
            //回复楼主
            onreply:function(id,name,userId,type,index){
                this.$store.state.userId = userId;
                this.$store.state.replyId = id;
                this.$store.state.replyName = name;
                this.$store.state.type = type;
                this.$refs.selectfood.writeing(index);
            },
            //有回复
            addreply:function(id,name,userId,type,index){
                //调用组件
                this.$store.state.userId = userId;
                this.$store.state.replyId = id;
                this.$store.state.replyName = name;
                this.$store.state.type = type;
                this.$refs.selectfood.writeing(index);
            },
            upCallback: function (index) {
                let that = this;
                that.busy = true;
                index ? that.page.num=index :''
                let params = {level:'1',pageNo:that.page.num,pageSize:that.page.size,typeId:'5a40a2ecfde98828ea931d8f',type:1}
                that.getListData(params)
            },
            getListData:function(params) {
                //延时一秒,模拟联网
                let that = this;
                mjhService.getComments(params).then(function(res){
                    if(res.datas = 'success') {
                        let dataArr = that.getFormats(res.data.datas.datas);
                        if(that.page.num == 1){
                            that.commentlists = [];
                        }
                        for (let i = 0; i < dataArr.length; i++) {
                            that.commentlists.push(dataArr[i]);
                        }
                        console.log(that.commentlists)
                        //          加载完成后busy为false，如果最后一页则lastpage为true
                        if(that.page.num < res.data.datas.totalPage){
                            that.busy = false
                        }else{
                            that.lastPage = true
                        }
                        //          加载完成后给页数+1
                        that.page.num = that.page.num+1
                    }
                }, function() {
                })
            },
            //循环遍历
            getFormats: function (array) {
                let that = this;
                for (let i = 0; i < array.length; i++) {
                    array[i].commentTime = common.getFormatOfDate(array[i].commentTime,'yyyy-MM-dd h:m:s')
                }
                return array
            }
        }
    }
</script>
<style lang="less" scoped>
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/common/listheader.less');
    body{
        background:#fff;
    }
    .comment-box{
        margin-top: 1.5rem;
        width:100%;
        padding:0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
        margin-bottom: .2rem;
        .commentlists-no{
            height:2.1rem;
            line-height:2.1rem;
            font-size: 13px;
            color: #999999;
            letter-spacing: 0;
        }
        .comment-list {
            width: 100%;
            padding: 16px 0 16px 0;
            border-bottom: 1px solid #EEEEEE;
            display:inline-block;
            .comment-list-left {
                width: 1.1rem;
                height:1.1rem;
                border-radius: 100%;
                overflow: hidden;
                float:left;
                img {
                    width:100%;
                    height:100%;

                }
            }
            .comment-list-right{
                width:7.5rem;
                float:left;
                margin-left:0.27rem;
                .comment-list-top{
                    width:100%;
                    height:0.67rem;
                    .comment-list-name{
                        font-size: 14px;
                        color: #666666;
                        float:left;
                        margin-top: 3px;
                    }
                    .comment-list-vip{
                        margin-top: 3px;
                        text-align: center;
                        float:left;
                        margin-left: 10px;
                        background: #FFCC00;
                        border-radius: 24px;
                        width: 41px;
                        height: 17px;
                        font-size: 12px;
                        color: #FFFFFF;
                        letter-spacing: 0.2px;
                    }
                    .comment-list-reply{
                        text-align: center;
                        width:1.33rem;
                        height:0.67rem;
                        float:right;
                        line-height:0.67rem;
                        background: #F9F9F9;
                        border-radius: 50px;
                        font-size: 12px;
                        color: #333333;
                        letter-spacing: 0;
                        text-align: center;
                    }
                }
                .comment-list-center{
                    text-align:left;
                    font-size: 14px;
                    color: #1F2D3D;
                    letter-spacing: 0;
                    line-height: 20px;
                    margin-top:5px;
                }
                .comment-list-time{
                    width:100%;
                    height:0.43rem;
                    margin-top:0.27rem;
                    font-size: 11px;
                    color: #999999;
                    letter-spacing: 0;
                    text-align: left;
                }
                .comment-reply-content{
                    background: #F9F9F9;
                    border-radius: 2px;
                    padding:0.27rem 0.27rem 0 0.27rem;
                    text-align:left;
                    font-size: 14px;
                    color: #151515;
                    letter-spacing: 0;
                    line-height: 20px;
                    margin-top:0.37rem;
                    overflow: hidden;
                    .comment-reply-back{
                        margin-bottom:0.26rem;
                    }
                    span{
                        color:#999;
                        font-size: 14px;
                    }
                }
            }
        }
        .comment-list:last-child{
            border-bottom: none;
        }
    }
</style>

