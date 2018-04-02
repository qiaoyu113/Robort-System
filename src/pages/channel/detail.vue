<template>
    <div class="container">
        <!--面包屑-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'channelSelf' }" class="blue">渠道分销</el-breadcrumb-item>
            <el-breadcrumb-item>分销内容详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--按钮、搜索-->
        <p class="opr">
            <el-button type="primary" icon="el-icon-plus" size="mini" class="left" @click="add">新增渠道</el-button>
            <el-input
                    placeholder="搜索渠道名称"
                    v-model="query" size="mini" class="right" @keyup.enter.native="getList">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getList"></i>
            </el-input>
            <el-button type="primary" plain size="mini" class="right exportBtn" @click="exportData">导出记录</el-button>
        </p>
        <!--表格-->
        <el-table
                :data="tableData"
                empty-text="暂无数据"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="渠道名称">
            </el-table-column>
            <el-table-column
                    prop="pv"
                    width="80"
                    label="浏览量">
            </el-table-column>
            <el-table-column
                    prop="uv"
                    width="80"
                    label="访客数">
            </el-table-column>
            <el-table-column
                    prop="orderNum"
                    width="80"
                    label="订单数">
            </el-table-column>
            <el-table-column
                    label="获得佣金总额">
                <template slot-scope="scope">
                    <span>{{scope.row.totalAmount | moneyFormate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="140">
                <template slot-scope="scope">
                    <el-button @click="doPush(scope.row.id)" type="text" size="small">推广</el-button>
                    <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click.native.prevent="doDelete(scope.row.id, scope.$index, tableData)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <pagination :options="page" v-on:currentChange="currentChange" v-on:sizeChange="sizeChange"></pagination>
        <!--统计图-->
        <line-chart :lineOption="myLine" ref="myLineIndex" v-on:trendChange="trendChange" v-on:indexChange="indexChange"></line-chart>
        <!--弹框-->
        <el-dialog
                :title="dialog.title"
                modal="false"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span v-if="dialog.typeChose==2">{{ dialog.content }}</span>
            <div class=""  v-if="dialog.typeChose==1 || dialog.typeChose==3">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="渠道名称" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="可获佣金" prop="money">
                        <el-input v-model="ruleForm.money" class="digIptLen"></el-input><span class="yuan">元</span>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="dialog.typeChose==4" class="to-push">
                <div class="top">
                    <div class="canvas" id="canvasContainer"></div>
                    <p class="info">
                        <span class="txt">使用手机微信扫一扫打开查看</span>
                        <el-button type="primary" plain size="mini" icon="el-icon-download" class="info-btn" @click="downLoadQRCode">下载二维码</el-button>
                    </p>
                </div>
                <div class="bot">
                    <el-input v-model="extensionUrl" class="botIpt" size="mini" id="botIpt"></el-input>
                    <el-button type="primary" plain size="mini" class="fz" @click="copyUrl">复制链接</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer" v-if="dialog.typeChose > 0 && dialog.typeChose <4">
            <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
            <el-button v-if="dialog.typeChose==1 || dialog.typeChose==3" size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            <el-button v-if="dialog.typeChose==2" size="mini" type="primary" @click="handleOk">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import QRCode from 'qrcodejs2'
    import pagination from '../../component/pagination/pagination.vue'
    import lineChart from '../../component/echart/line.vue'
    import {common} from '../../assets/js/common/common'
    import {channelService} from '../../service/channelService'
    import axios from 'axios'
    export default {
        props: [],
        data () {
            return {
                centerDialogVisible: false, // 弹框
                query: '', // 查询条件
                dateCondition: '1', // 时间查询条件7天或者一个月
                indexCondition: '1', // 1,浏览数/2,访客量/3订单数/4金额
                filterList: [], // 筛选条件
                tableData: [], //列表数据
                id: this.$route.params.channelId, // 分销id
                extensionUrl: '', // 推广链接
                page: {
                    size: 10,
                    num: 1,
                    totalCount: 0,
                    totalPage: 1
                }, // 分页
                dialog: {
                    title: '',
                    content: '',
                    rows: '',
                    index: '',
                    id: '',
                    typeChose: 0 // 1:添加；2：删除；3：编辑；
                },
                ruleForm: {
                    id: '', // 渠道id
                    title: '', // 渠道名称
                    money: '' // 佣金
                }, // submit
                rules: {
                    money: [
                        { required: true, message: '请输入佣金金额', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入渠道名称', trigger: 'blur' }
                    ]
                }, // 验证
                xAxisData: [], // 横轴，时间
                seriesData: [], // 数据
                legendData: [], // lengend
                myLine: {
                    title: '渠道统计', // 统计图标题
                    subTitle: '说明：最多展示最新建立的10个渠道',
                }
            }
        },
        components: {pagination, 'line-chart': lineChart},
        mounted () {
            let that = this;
            that.getList(); // 获取列表
            that.getStatistics(); // 统计图数据
        },
        methods: {
            //获得列表
            getList () {
                let that = this;
                that.tableData = [];
                channelService.getChannels({pageNo: that.page.num, pageSize: that.page.size, query: that.query, id: that.id}).then(function (res) {
                    //console.log('渠道列表', res);
                    if(res.data.success){
                        let table = res.data.datas;
                        that.page.totalCount = table.totalCount==null? 0 : parseInt(table.totalCount);
                        that.page.totalPage = table.totalPage;
                        let newArr = res.data.datas.datas;
                        for(let i=0;i<newArr.length;i++){
                            newArr[i].createTime = common.getFormatOfDate(newArr[i].createTime*1, 'yyyy-MM-dd hh:mm');
                            that.tableData.push(newArr[i]);
                        }
                    }else{}
                });
            },
            //添加一个渠道
            add () {
                let that = this;
                that.dialog = {
                    title: '新增渠道',
                    content: '',
                    typeChose: 1
                };
                that.ruleForm = {
                    money: '',
                    title: ''
                };
                that.centerDialogVisible = true;
            },
            // 编辑一个渠道
            edit (id) {
                let that = this;
                that.dialog = {
                    title: '编辑渠道',
                    typeChose: 3
                };
                that.getChannelOne(id);
            },
            // 推广
            doPush (id) {
                let that = this;
                that.dialog = {
                    title: '推广',
                    typeChose: 4
                };
                that.getChannelOne(id);
            },
            // 下载二维码
            downLoadQRCode () {
                let that = this;
                let canvas = document.getElementById('canvasContainer').childNodes[0];
                console.log('canvas', canvas);
                let MIME_TYPE = 'image/png';
                let dlLink = document.createElement('a');
                dlLink.download = 'qrcode.png';
                dlLink.href = canvas.toDataURL('image/png');
                dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.href].join(':');
                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            },
            // 复制链接
            copyUrl () {
                let that = this;
                let obj = document.getElementById('botIpt');
                obj.select();
                document.execCommand("Copy");
                that.$message({
                    message: '复制成功！',
                    type: 'success'
                });
            },
            // 导出数据
            exportData () {
                let that = this;
                channelService.exportChannelInfo(axios.defaults.baseURL,{id: that.id});
            },
            // 统计图，指标下拉列表变化
            indexChange (val) {
                let that = this;
                that.indexCondition = val;
                that.getStatistics();
            },
            // 统计图，趋势下拉列表变化
            trendChange (val) {
                let that = this;
                that.dateCondition = val;
                that.getStatistics();
            },
            // 统计图,获取数据
            getStatistics () {
                let that = this;
                that.xAxisData = []; // 横轴，时间
                that.seriesData = []; // 数据
                that.legendData = []; // lengend
                channelService.getStatistics({id: that.id, type: that.dateCondition, typeId: that.indexCondition}).then(function (res) {
                    //console.log('统计图信息', res);
                    if(res.data.success){
                        if(that.dateCondition == '1'){
                            for(let i=1;i<8;i++){
                                that.xAxisData.push(that.getXAxis(i));
                            }
                            that.$refs.myLineIndex.xAxisData = that.xAxisData; // 横轴(从当期时间起到7天前的数据)
                        }
                        if(that.dateCondition == '2'){
                            for(let i=1;i<31;i++){
                                that.xAxisData.push(that.getXAxis(i));
                            }
                            that.$refs.myLineIndex.xAxisData = that.xAxisData;  // 横轴(从当期时间起到30天前的数据)
                        }
                        let newArr = res.data.datas;
                        for(let i=0;i<newArr.length;i++){
                            let temp = {
                                name: newArr[i].name, //渠道名称
                                type:'line',
                                stack: '总量',
                                data: newArr[i].value // n天的n数
                            };
                            that.seriesData.push(temp);
                        };
                        that.$refs.myLineIndex.seriesData = that.seriesData; // 数据
                    }else{}
                });
            },
            // 统计图，获得横轴
            getXAxis (returnNum) {
                let n = returnNum;
                let d = new Date();
                let year = d.getFullYear();
                let mon = d.getMonth() + 1;
                let day = d.getDate();
                if(day <= n) {
                    if(mon > 1) {
                        mon = mon - 1;
                    } else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate();
                let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
                return s;
            },
            // 表单提交
            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) { // 验证成功
                        // 添加
                        if(that.dialog.typeChose == 1){
                            channelService.addChannel({
                                id: that.id,
                                name: that.ruleForm.title,
                                percent: that.ruleForm.money}).then(function (res) {
                                //console.log(res, '添加一个渠道');
                                if(res.data.success){
                                    that.centerDialogVisible = false;
                                    that.getList();
                                }else{}
                            });
                        }
                        // 编辑
                        else if(that.dialog.typeChose == 3){
                            channelService.editChannel({
                                id: that.ruleForm.id,// 渠道本身id
                                name: that.ruleForm.title,
                                percent: that.ruleForm.money}).then(function (res) {
                                //console.log(res, '编辑一个渠道');
                                if(res.data.success){
                                    that.centerDialogVisible = false;
                                    that.getList();
                                }else{}
                            });
                        }else{}

                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 获得一个渠道
            getChannelOne (id) {
                let that = this;
                channelService.getChannel({id: id}).then(function (res) {
                    //console.log('编辑', res);
                    if(res.data.success){
                        let obj = res.data.datas;
                        if(that.dialog.typeChose==3){
                            that.ruleForm = {
                                id: obj.id,
                                money: obj.percent,
                                title: obj.name
                            };
                        }
                        that.centerDialogVisible = true;
                        if(that.dialog.typeChose==4){
                            //that.extensionUrl = obj.landingUrl;
                            //let url = 'www.baidu.com';
                            let url = that.$store.state.qrCodeDomain + obj.url;
                            that.extensionUrl = url;
                            setTimeout(function () {
                                let ele = document.getElementById('canvasContainer');
                                if(ele.childNodes.length < 2){
                                    var qrcode = new QRCode(ele,{
                                        width:120,
                                        height:120,
                                        correctLevel : QRCode.CorrectLevel.H,
                                        text: url
                                    });
                                }
                            },1);

                        }

                    }else{}
                });
            },
            // 删除
            doDelete (id, index, rows) {
                let that = this;
                that.dialog = {
                    title: '删除提示',
                    content: '确认删除该渠道吗？删除后不能再查看，删除不可恢复。',
                    rows: rows,
                    index: index,
                    id: id,
                    typeChose: 2
                };
                that.centerDialogVisible = true;
            },
            // 分页
            sizeChange (val) {
                let that = this;
                that.page.size = val;
                that.getList();
            },
            currentChange (val) {
                // 当前页，就是当前点击的那一页
                let that = this;
                that.page.num = val;
                that.getList();
            },
            //弹出框按钮的操作
            // 确认删除
            handleOk () {
                let that = this;
                let id = that.dialog.id;
                let rows = that.dialog.rows;
                let index = that.dialog.index;
                channelService.deleteChannel({id: id}).then(function (res) {
                    //console.log('删除', res);
                    if(res.data.success){
                        that.centerDialogVisible = false;
                        rows.splice(index, 1);
                        that.page.num = 1;
                        that.getList();
                    }
                });
            }
        },
        watch: {
        }
    }
</script>
<style lang="less" scope>
    .el-table th{background:#f5f7fa!important;}
    .el-table td{font-size:14px;color:#333!important;}
    .el-pagination{margin-top:20px;text-align:right;}
    .el-table__empty-block{height:300px;}
    .container{padding: 20px;}
    .container .opr{margin:40px auto 20px;overflow:hidden;}
    .container .opr .left{}
    .container .opr .right{width:250px;float:right;}
    .exportBtn{width:100px!important;margin-right: 15px;}
    .digIptLen{width: 100px;}
    .yuan{margin-left: 15px;}
    .to-push{
        width:307px;
        .top{
            display:flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            .canvas{width: 120px;height:120px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;}
            .info{
                width:183px;
                .txt{margin: 10px 0 5px;display:block;}
                .info-btn{margin:0 34px;}
            }
        }
        .bot{
            display:flex;
            justify-content: center;
            align-items:center;
            .botIpt{}
            .fz{
                color: #C1232B;
            }
        }
    }
</style>