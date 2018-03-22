<template>
    <div class="forderDetail">
        <div class="buyerinfo">
            <div class="title">买家信息</div>
            <div class="info"><span>姓名：{{users.name }}</span><span class="">手机号：{{users.phone}}</span></div>
        </div>
        <div class="buyerinfo">
            <div class="title">订单信息</div>
            <div class="info">
                <span>订单号：{{$route.params.orderNo}}</span>
                <span class="">创建时间：{{orders.createTime}}</span>
            </div>
            <div class="info">
                <span>商品名称：{{orders.orderTitle}}</span>
                <span class="">单价/数量：￥{{orderDetail.price}}/{{orderDetail.status}}</span>
            </div>
            <div class="info">
                <span>金额：{{orders.amount}}</span>
                <span v-if="orders.channelId=='ALIPAY_PC'||orders.channelId=='ALIPAY_MOBILE'||orders.channelId=='ALIPAY_WAP'||orders.channelId=='ALIPAY_QR'">支付方式：微信支付</span>
                <span v-if="orders.channelId=='WX_JSAPI'||orders.channelId=='WX_NATIVE'||orders.channelId=='WX_APP'||orders.channelId=='WX_MWEB'">支付方式：支付宝</span>
                <span v-if="orders.channelId=='IAP'">支付方式：苹果支付</span>
            </div>
            <div class="remark"><span>备注：<span v-if="orders.content==null">无</span><span v-else>{{orders.content}}</span></span><span class="fremark" @click="doRemark">备注</span></div>
        </div>
        <!--备注功能-->
        <el-dialog :title="备注" :visible.sync="dialogFormVisible" :show-close="false">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" placeholder="请填写备注"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('form')" size="mini">取 消</el-button>
                <el-button type="primary" @click="submit('form')" size="mini">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {common} from '../../assets/js/common/common'
import {financialService} from '../../service/financialService.js'
export default {
        name: 'app',
        data: function (){
            return {
                params:{
                    orderNo:this.$route.params.orderNo,
                },
                orders:'',
                orderDetail:'',
                users:'',
                userId:'',
                dialogFormVisible: false,
                form: {
                    remark: ''
                }, // 新增表单
                rules: {
                    remark: [
                        { required: true, message: '请填写备注', trigger: 'blur' }
                    ]
                }, //表单验证
            }
        },
        mounted(){
            this.getOdersNo()
        },
        methods: {
            getOdersNo:function(){
                let that = this
                financialService.getOdersNo(that.params).then(function (res) {
                    that.orders = res.data.datas;
                    that.orderDetail = res.data.datas.orderDetails[0];
                    that.orderDetail.price = common.getFormatOfPrice(that.orderDetail.price);
                    that.userId = res.data.datas.userId;
                    that.orders.createTime = common.getFormatOfDate(that.orders.createTime*1, 'yyyy-MM-dd hh:mm');
                    that.orders.amount = common.getFormatOfPrice(that.orders.amount);
                     //console.log('单个',res.data);
                    that.form.remark = that.orders.content; // 备注
                     that.getUsers()
                })
            },
            getUsers:function(){
                let that = this
                financialService.getuserId(that.userId).then(function (res) {
                    that.users = res.data.datas
                     //console.log(res.data);
                })
            },
            // 表单
            doRemark () {
                let that = this;
                that.dialogFormVisible = true;
            },
            // 重置
            resetForm (form) {
                let that = this;
                that.$refs[form].resetFields();
                that.dialogFormVisible = false;
            },
            // 表单提交
            submit (form) {
                let that = this;
                // 表单验证
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        //验证成功
                        financialService.editRemark({orderNo: that.params.orderNo, content: that.form.remark}).then(function (res) {
                            //console.log('备注成功', res);
                            if(res.data.success){
                                that.dialogFormVisible = false;
                                that.getOdersNo();
                            }else{}
                        });
                    } else {
                       // console.log('error submit!!');
                        return false;
                    }
                });
            }
        },

    }
</script>
<style lang="less" scope>
    .el-dialog{width:400px;}
    .forderDetail{
        width: 850px;
        height: 300px;
        margin: 30px;
        border: 1px solid black;
        .buyerinfo{
            margin: 20px;
            .title{
                font-size: 15px;
                color: blue;
            }
            .info{
                margin-top: 10px;
                span{
                    font-size: 15px;
                    width: 35%;
                    display: inline-block;
                }
                .mar{
                    // margin-left: 40px;
                }
            }
            .remark{
                margin-top: 20px;
                span{
                    font-size: 15px;
                }
                .fremark{
                    margin-left: 30px;
                    color: blue;
                    cursor:pointer;
                }
            }
        }
        
    }
</style>
