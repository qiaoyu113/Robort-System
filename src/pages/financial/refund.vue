<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" class="bread">
            <el-breadcrumb-item :to="{ name: 'manage' }">提现审核</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--详情-->
        <div class="frefundInfo">
            <div class="buyerinfo">
                <div class="title">个人资料</div>
                <div class="mar">申请时间：{{orders.createTime}}</div>
                <div class="mar">申请帐号：{{orders.name}}</div>
                <div class="mar">姓名：{{orders.name}}</div>
            </div>
            <div class="buyerinfo">
                <div class="title">提现账户</div>
                <div class="mar">身份证号：{{account.idCardNo}}</div>
                <div class="mar">银行：{{account.bankName}}</div>
                <div class="mar">银行卡号：{{account.bankCardNo}}</div>
                <div class="mar">提现金额：{{orders.applyMoney}}</div>
            </div>
            <div class="buyerinfo">
                <el-form ref="form" :model="myForm" :rules="rules">
                    <div class="title">审核操作</div>
                    <el-form-item class="radio-group">
                        <el-radio v-model="myForm.chose" label="1">通过</el-radio>
                        <el-radio v-model="myForm.chose" label="2">拒绝</el-radio>
                    </el-form-item>
                    <el-form-item class="remark"  v-if='orders.status==0' prop="remark">
                        <span class="mar">备注：</span>
                        <textarea  rows="3" cols="30" v-model="myForm.remark"></textarea>
                    </el-form-item>
                    <el-form-item class="remark" v-if='orders.status!=0'>
                        <span class="mar">备注：</span>
                        <span class="ccc">{{orders.resultInfo}}</span>
                    </el-form-item>
                    <el-form-item class="box" v-if="orders.status==0" prop="showImgUrl">
                        <upload-original :options="uploadOrg" v-on:getPictureUrl="getPictureUrl" ref="upOrg"></upload-original>
                    </el-form-item>
                    <el-form-item class="box" v-if="orders.status!=0">
                        <div class="thumb-zone">
                            <img class="thumb" :src="picUrl">
                        </div>
                    </el-form-item>
                    <el-form-item class="f-btn" v-if="orders.status==0">
                        <el-button type="primary" size="mini" class="f-el-btn" @click="submitForm('form')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {financialService} from '../../service/financialService.js'
import uploadOriginal from '../../component/upload/uploadOriginal.vue'

export default {
        name: 'app',
        components: {'upload-original': uploadOriginal},
        data: function (){
            return {
                params:{
                    id:this.$route.params.orderId,
                },
                orders:'',
                uploadOrg: {
                    limit:1,
                },
                myForm: {
                    chose: '1',
                    remark: '',
                    showImgUrl: ''
                },
                rules: {
                    remark: [
                        { required: true, message: '请输入您的理由', trigger: 'blur'}
                    ],
                    showImgUrl: [
                        { required: true, message: '请上传凭证', trigger: 'blur'},
                        { required: true, message: '请上传凭证', trigger: 'change'}
                    ]
                },
                picUrl:'', // 当状态为审核过的时候，显示凭证
                imgUrl:'',
                account:'',
            }
        },
        mounted(){
            this.getvarifydetail()
        },
        methods: {
            submitForm (formName) {
                let that = this;
                that.$refs[formName].validate( (valid) => {
                    if(valid){
                        // 验证成功
                        // 同意操作
                        if(that.myForm.chose == '1'){
                            //console.log('formInfo agree', that.myForm,that.params.id);
                            financialService.agreeVarify({id: that.params.id, type: 3,resultInfo: that.myForm.remark, certificate: that.myForm.showImgUrl}).then(function (res) {
                                //console.log('同意', res);
                                if(res.data.success){
                                    that.$router.push({name: 'manage'});
                                }else{}
                            });
                        }
                        // 拒绝操作
                        else if(that.myForm.chose == '2'){
                            //console.log('formInfo refuse', that.myForm, that.params.id);
                            financialService.refuseVarify({id: that.params.id, type: 3,resultInfo: that.myForm.remark, certificate: that.myForm.showImgUrl}).then(function (res) {
                                //console.log('拒绝', res);
                                if(res.data.success){
                                    that.$router.push({name: 'manage'});
                                }else{}
                            });
                        }

                    }else{
                        return false;
                    }
                });
            },
            getvarifydetail:function(){
                let that = this
                financialService.getvarifydetail(that.params.id).then(function (res) {
                    //console.log('提现详情', res);
                    let obj = res.data.datas;
                    if(obj.status != 0){ // 已经审核过的
                        that.myForm.chose = obj.status+'';//通过还是未通过
                        that.picUrl = that.$store.state.picHead + obj.certificate;
                    }
                    if(obj.bankInfo == null){
                        that.account = {
                            idCardNo: '',
                            bankName: '',
                            bankCardNo: '',
                            applyMoney: ''
                        };
                    }else{
                        that.account = obj.bankInfo;
                    }
                    that.orders = obj;
                })
            },
            getPictureUrl:function(url){
                let that=this;
                that.myForm.showImgUrl = url;
//                if(url){
//                    that.imgUrl = url;
//                    console.log(that.imgUrl)
//                } else {
//                    that.imgUrl = that.$store.state.picHead+that.picUrl;
//                    console.log(that.imgUrl)
//                }
            },
            
        },

    }
</script>

<style lang="less">
    .bread{width: 300px;margin: 20px 0 0 30px;}
    .frefundInfo{
        width: 400px;
        height: 688px;
        margin: 30px;
        border: 1px solid #bbb;
        border-radius: 4px;
        .buyerinfo{
            margin: 20px;
            margin-top: 50px;
            .title{
                font-size: 15px;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .mar{
                font-size: 15px;
                margin: 5px 0 5px 50px;
            }
            .ccc{
                font-size: 15px;
                /*margin-top: 10px;*/
            }
            .radio{
                margin-top: 10px;
                margin-left: 50px;
                font-size: 15px;
            }
            .remark{
                .el-form-item__content{display:flex;align-items: center;
                  .el-form-item__error{left: 100px;}
                }
            }
            .radio-group{
                .el-form-item__content{margin-left: 92px;}
            }
            /*.el-form-item{margin-bottom:0;}*/
            textarea{
                width: 255px;
                margin-top: 10px;
                resize: none;
            }
            .box{
                margin-top: 10px;
                margin-left: 100px;
                font-size: 15px;
                /*width: 100px;*/
                height: 100px;
                /*border: 1px solid black;*/
                .thumb-zone{
                    width: 150px;height:100px;display:flex;justify-content: center;align-items: center;
                    border: 1px solid #bbb;
                    .thumb{max-width: 100%;max-height: 100%;width:auto;height:auto;}
                }
            }
            .f-btn{
                margin-top: 20px;
                .f-el-btn{
                    margin-left: 100px;
                }
            }
        }
        
    }
</style>
