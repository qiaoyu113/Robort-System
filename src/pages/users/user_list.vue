<!-- 用户列表 -->
<template>
    <div class="user_list">
       <div class="v_box" >
        
        <!-- 搜索框 -->
          <div class="search clearfix">
              <div class="search_l">
                 <el-input placeholder="请输入昵称、手机号" v-model="input4" @change="getUserslist()">
                       <!-- <el-button slot="append"><i class="iconfont icon-sousuo"></i></el-button> -->
                       <el-button slot="append" icon="el-icon-search" @click="getUserslist()"></el-button>
                       <!-- <template slot="append"><p><i class="iconfont icon-sousuo"></i></p></template> -->
                 </el-input>
            </div>
            <div class="search_r">
                <el-button>导出表格</el-button>
            </div>
           </div>
           <div class="table">
               <el-table
                  :data="content"
                  border
                   style="width: 100%">
                   <el-table-column
                      type="selection"
                       width="34">
                    </el-table-column>
                     <el-table-column
                       prop="name"
                       label="昵称">
                     </el-table-column>
                     <el-table-column
                       prop="phone"
                       label="手机号">
                     </el-table-column>
                     <el-table-column
                       prop="numItem.pointNum"
                       label="积分"
                       :formatter="formatter">
                     </el-table-column>
                     <el-table-column
                       prop="vipId"
                       label="会员等级"
                       :formatter="formatter">
                     </el-table-column>
                     <el-table-column
                       label="实名认证">
                       <template slot-scope="cope">
                     <span v-if="cope.row.realNameStatus==2">是</span>
                     <span v-if="cope.row.realNameStatus!=2">否</span>
                     </template>
                     </el-table-column>
                     <el-table-column
                       prop="numItem.actOrderNum"
                       label="订单数量"
                       :formatter="formatter">
                     </el-table-column>
                     <el-table-column
                       prop="numItem.consumeMoney"
                       label="订单总额"
                       :formatter="formatter">
                     </el-table-column>
                      <el-table-column
                       label="操作">
                       <template slot-scope="scope">
                         <el-button @click="getUserslistId(scope.row.id)" type="text" size="small">查看</el-button>
                         <el-button @click="passwordshow(scope.row.id,scope.row.realNameStatus)" type="text" size="small">重置密码</el-button>
                         <el-button @click="phoneshow(scope.row.id,scope.row.realNameStatus)" type="text" size="small">修改手机号</el-button>
                       </template>
                     </el-table-column>
                  </el-table>
                  <div class="paging">
                      <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="getAuthLogs"
                    :total="inde">
                  </el-pagination>
                    </div> 
           </div>
       </div>  
       <!-- 蒙层 -->
        <div class="modal" ref="modal"></div>  
        <!-- 重置密码 -->
       <div class="r_password" ref="r_password">
         <div class="top">重置密码<i class="iconfont icon-guanbi2"  @click="passwordclose()"></i></div>
         <div class="con">
              <div class="authentication" v-if="realNameStatus == 2">
                 <p class="h3">请在核对过用户其他信息的情况下，输入验证信息。</p>
                 <div class="row clearfix">
                   <div class="row_l">身份证号 : </div>
                   <div class="row_r"><el-input placeholder="请输入身份证号" v-model="authIdCard"></el-input></div>
                 </div>
                 <div class="row clearfix">
                   <div class="row_l">姓名 : </div>
                   <div class="row_r"><el-input placeholder="请输入姓名" v-model="authRealName"></el-input></div>
                 </div>
                 <div class="btn">
                    <el-button @click="postVerification()">验证</el-button>
                 </div>
              </div>
              <div class="password">
                 <p class="h3"  v-if="realNameStatus != 2">该用户没有实名认证，请核对其他信息。</p>
                 <div class="row clearfix">
                   <div class="row_l">设置新密码 : </div>
                   <div class="row_r"><el-input placeholder="请输入新密码" v-model="passwordIpu"></el-input></div>
                 </div>
                <div class="btn">
                    <el-button @click="postResetpassword">确定</el-button>
                 </div>
              </div>
         </div>
       </div> 
           <!-- 重置手机号 -->
       <div class="r_phone" ref="r_phone">
         <div class="top">重置手机号<i class="iconfont icon-guanbi2"  @click="phoneclose()"></i></div>
         <div class="con">
              <div class="authentication" v-if="realNameStatus == 2">
                 <p class="h3">请在核对过用户其他信息的情况下，输入验证信息。</p>
                 <div class="row clearfix">
                   <div class="row_l">身份证号 : </div>
                   <div class="row_r"><el-input placeholder="请输入身份证号" v-model="authIdCard"></el-input></div>
                 </div>
                 <div class="row clearfix">
                   <div class="row_l">姓名 : </div>
                   <div class="row_r"><el-input placeholder="请输入姓名" v-model="authRealName"></el-input></div>
                 </div>
                 <div class="btn">
                    <el-button @click="postVerification()">验证</el-button>
                 </div>
              </div>
              <div class="password">
                 <p class="h3"  v-if="realNameStatus != 2">该用户没有实名认证，请核对其他信息。</p>
                 <div class="row clearfix">
                   <div class="row_l">新手机号 : </div>
                   <div class="row_r"><el-input placeholder="请输入手机号" v-model="phone"></el-input></div>
                 </div>
                 <div class="row clearfix">
                   <div class="row_l">图片验证码 : </div>
                   <div class="row_r2 clearfix"><el-input placeholder="请输入验证码" v-model="kaptchaValue"></el-input>
                                               <div class="row_r2r">
                                               <img :src="imagekap"/>
                                               <i class="iconfont el-icon-refresh" @click="getKaptchas"></i></div>
                   </div>
                 </div>
                 <div class="row clearfix">
                   <div class="row_l">短信验证码 : </div>
                   <div class="row_r3 clearfix"><el-input placeholder="请输入验证码" v-model="smsCode"></el-input>
                                     <a href="javaScript:;" @click="getSms">发送验证码</a>
                    </div>
                 </div>
                <div class="btn">
                    <el-button @click="postPhone">确定</el-button>
                 </div>
              </div>
         </div>
       </div> 
    
    <!--查看详情-->
            <div :class="detailShow ? 'detailsAni details': 'details'">
                <div class="detailsTop">拍品详情<i class="iconfont icon-guanbi" @click="closeDetail"></i></div>
                <!--订单详情-->
                <div class="detailsBox">
                    <div class="detailsName">
                        <div class="detailsList">拍品名称：{{particulars.title}}</div>
                        <div class="detailsList">拍品编号：{{particulars.completeNo}}</div>
                        <div class="detailsList" v-if="particulars.marketName != null">所属专场：{{particulars.marketName}}</div>
                        <div class="detailsList">库房状态：<span v-if="particulars.inWarehouse">入库</span><span v-if="!particulars.inWarehouse">出库</span></div>
                        <div class="detailsList" v-for="item in particulars.labels">标签：<span style="margin-right:4px">{{item.name}}</span></div>
                        <div class="detailsList" v-for="item in particulars.authors">作者：<span style="margin-right:4px">{{item.name}}</span></div>
                        <div class="detailsList" v-if="particulars.auctionStartTime != null">竞拍时间：{{particulars.auctionStartTime}} — {{particulars.auctionEndTime}}</div>
                        <div class="detailsList" v-if="particulars.auctionEndTime != null">结束时间：{{particulars.auctionEndTime}}</div>
                        <div class="detailsList">拍品认证：<span style="margin-right:5px;" v-for="item in particulars.identifications">{{item}}</span></div>
                        <div class="detailsList" v-for="(item,key,index) in particulars.properties">{{key}}：{{item}}</div>
                    </div>
                    <!--委托方-->
                    <div class="detailSale">
                        <div class="detailSaleTop">委托方<span class="icon" @click="datailShow(1)"><i :class="hint1 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span></div>
                        <div :class="hint1 ? 'detailSaleList hint' : 'detailSaleList'">{{particulars.client}}</div>
                    </div>
                    <!--详情-->
                    <div class="detailSale">
                        <div class="detailSaleTop">详情<span class="icon" @click="datailShow(2)"><i :class="hint2 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span></div>
                        <div :class="hint2 ? 'detailSaleList hint' : 'detailSaleList'" v-html="particulars.content"></div>
                    </div>
                    <!--访问信息-->
                    <div class="detailSale">
                        <div class="detailSaleTop">访问信息<span class="icon" @click="datailShow(3)"><i :class="hint3 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span></div>
                        <div :class="hint3 ? 'detailSaleList hint' : 'detailSaleList'">参拍人数：{{particulars.originNum}}/{{particulars.realNum}}</div>
                        <div :class="hint3 ? 'detailSaleList hint' : 'detailSaleList'">浏览人数：{{particulars.readNum}}</div>
                        <div :class="hint3 ? 'detailSaleList hint' : 'detailSaleList'">人均访问时长：—</div>
                    </div>
                    <!--价格信息-->
                    <div class="detailSale">
                        <div class="detailSaleTop">价格信息<span class="icon" @click="datailShow(4)"><i :class="hint4 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span></div>
                        <div :class="hint4 ? 'detailSaleList hint' : 'detailSaleList'">起拍价：{{particulars.basePrice}}</div>
                        <div :class="hint4 ? 'detailSaleList hint' : 'detailSaleList'">保留价：{{particulars.holdPrice}}</div>
                        <div :class="hint4 ? 'detailSaleList hint' : 'detailSaleList'">当前价：{{particulars.currentPrice }}</div>
                        <div :class="hint4 ? 'detailSaleList hint' : 'detailSaleList'">成交价：<span v-if="particulars.finalPrice != null">{{particulars.finalPrice}}</span><span v-else>—</span></div>
                        <div :class="hint4 ? 'detailSaleList hint' : 'detailSaleList'">买方结算：<span v-if="particulars.finalPrice != null">{{particulars.finalPrice}}</span><span v-else>—</span></div>
                    </div>
                    <!--出价记录-->
                    <div class="detailSale">
                        <div class="detailSaleTop">出价记录<span class="icon" @click="datailShow(5)"><i :class="hint5 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span></div>
                        <div :class="hint5 ? 'detailSaleList hint' : 'detailSaleList'"></div>
                    </div>
                </div>
            </div>



    </div>
</template>

<script>
    import {commonService} from '../../service/commonService.js'
    export default {
        name: 'app',
        data: function (){
            return {
              input4:'',
              inde:1,
              userId:'',
              content:[],
              realNameStatus:2,
              authRealName:'',
              authIdCard:'',
              passwordIpu:'',
              imagekap:'',
              phone:'',
              kaptchaValue:'',
              kaptchaKey:'',
              smsCode:'',
              particulars:'',

                 detailShow:false,
                hint1:false,//详情的显示隐藏
                hint2:false,//详情的显示隐藏
                hint3:false,//详情的显示隐藏
                hint4:false,//详情的显示隐藏
                hint5:false,//详情的显示隐藏
            }
        },
 
        computed: {
            https() {
                return this.$store.state.picHead
            },
        },
        mounted(){
           this.getUserslist()
           this.getKaptchas()
        },
        methods: {
          // 重置密码
          passwordshow:function(id,val){
              this.userId=id
              this.realNameStatus=val
              this.$refs.modal.style.display="block"
              this.$refs.r_password.style.display="block"
              // this.getAuths()
          },
          passwordclose:function(){
              this.$refs.modal.style.display="none"
              this.$refs.r_password.style.display="none"
              this.passwordIpu=''
              this.authIdCard=''
              this.authRealName=''
          },
           // 重置手机号
          phoneshow:function(id,val){
              this.userId=id
              this.realNameStatus=val
              this.$refs.modal.style.display="block"
              this.$refs.r_phone.style.display="block"
          
          },
          phoneclose:function(){
              this.$refs.modal.style.display="none"
              this.$refs.r_phone.style.display="none"
              this.authIdCard=''
              this.authRealName=''
              this.phone=''
              this.kaptchaValue=''
              this.smsCode=''
          },
           // 获取用户列表
          getUserslist:function(val){
            let that=this
             if(val==undefined){
                val=1
              }
            commonService.getUserslist({pageNo:val,pageSize:30,query:that.input4}).then(function(res){
                  // console.log(res)
                     that.content=res.data.datas.datas
                     that.inde=res.data.datas.totalPage*10
              })
          },
           // 获取用户个人详情信息
          getUserslistId:function(id){
            let that=this
            that.detailShow=true
            commonService.getUserslistId(id).then(function(res){
                  console.log(res)

                     // that.content=res.data.datas.datas
                     // that.inde=res.data.datas.totalPage*10
              })
          },
          // 实名认证验证
          postVerification:function(){
            let that=this
            commonService.postVerification(that.userId,{authIdCard:that.authIdCard,authRealName:that.authRealName}).then(function(res){
                     if(res.data.code == 200){
                        that.$message.success('成功');
                     }else{
                      that.$message.error(res.data.message);
                     }
              })
          },
          // 重置密码
           postResetpassword:function(){
            let that=this
            commonService.postResetpassword({id:that.userId,password:that.passwordIpu}).then(function(res){
                     if(res.data.code == 200){
                        that.$message.success('成功');
                        that.passwordclose()
                     }else{
                      that.$message.error(res.data.message);
                     }
              })
          },
           // 获取图片验证码
          getKaptchas:function(val){
            let that=this
            commonService.getKaptchas().then(function(res){
                  that.imagekap=res.data.datas.imageString
                  that.kaptchaKey=res.data.datas.kaptchaKey
              })
          },
          // 获取手机验证码验证码
          getSms:function(){
            let that=this
            commonService.getSms({phone:that.phone,type:6,kaptchaValue:that.kaptchaValue,kaptchaKey:that.kaptchaKey}).then(function(res){
                   if(res.data.code == 200){
                        that.$message.success('已发送短信验证码');
                     }else{
                      that.$message.error(res.data.message);
                     }

              })
          },
           // 更新手机号
          postPhone:function(){
            let that=this
            commonService.postPhone({id:that.userId,phone:that.phone,type:6,smsCode:that.smsCode}).then(function(res){
                  // that.imagekap=res.data.datas.imageString
                   if(res.data.code == 200){
                       that.phoneclose()
                     }else{
                      that.$message.error(res.data.message);
                     }
              })
          },
          // 查看详情
           detailBtn:function(id){
                let that = this;
                that.particulars = '';
                that.hint1 = false;
                that.hint2 = false;
                that.hint3 = false;
                that.hint4 = false;
                that.hint5 = false;
                that.detailShow = true;
                commonService.getAuctions({},id).then(function(res){
                    if(res.data.code === 200){
                        that.particulars = res.data.datas;
                        if(that.particulars.auctionStartTime != null){
                            that.particulars.auctionStartTime = common.getFormatOfDate(that.particulars.auctionStartTime,'yyyy-MM-dd h:m:s')
                        }
                        if(that.particulars.auctionEndTime != null){
                            that.particulars.auctionEndTime = common.getFormatOfDate(that.particulars.auctionEndTime,'yyyy-MM-dd h:m:s')
                        }
                        let checks1 = res.data.datas.identifications;
                        let index = checks1.length;
                        for(let i = 0;i < index;i++){
                            if(i === 0){
                                checks1.splice(i,1,'认证1')
                            }else if(i === 1){
                                checks1.splice(i,1,'认证2')
                            }else if(i === 2){
                                checks1.splice(i,1,'认证3')
                            }else if(i === 3){
                                checks1.splice(i,1,'认证4')
                            }else if(i === 4){
                                checks1.splice(i,1,'认证5')
                            }
                        }
                        that.particulars.identifications = checks1;
                    }
                })
            },
            //关闭查看详情
            closeDetail:function(){
                let that = this;
                that.detailShow = false;
            },
            //详情的上拉下拉
            datailShow(num){
                let that = this;
                if(num === 1){
                    that.hint1 = !that.hint1;
                }else if(num === 2){
                    that.hint2 = !that.hint2;
                }else if(num === 3){
                    that.hint3 = !that.hint3;
                }else if(num === 4){
                    that.hint4 = !that.hint4;
                }else if(num === 5){
                    that.hint5 = !that.hint5;
                }
            },

              
        },

    }
</script>

<style lang="less">
  
      .user_list{
     
          .v_box{
            padding: 0 20px;
            margin-top: 40px;
            .search{
                margin:20px 0;   
                .search_l{
                    float: left;
                    width: 300px; 
                }
                .search_r{
                    float: right;
                }
            }
            .table{
                width: 100%;
                // padding: 0 20px;
                .paging{
                float: right;
                margin-top: 20px;
               } 
              
            }
          }
                    // 蒙版
         .modal{
                display:none; 
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: .5;
                background: #000;
                z-index: 2000;
          }
          // 重置密码
          .r_password{
             display: none;
             position: fixed;
             left: 50%;
             top: 80px;
             z-index: 2001;
             background: #fff;
             width: 600px;
             margin-left: -300px;
             border:1px solid #f5f7fa;
              .top{
                font-size: 16px;
                line-height: 40px;
                border-bottom: 1px solid #f5f7fa;
                padding-left:20px;
                position: relative;
                i{
                   font-size: 22px;
                   line-height: 40px;
                   position: absolute;
                   right:20px;
                   top: 0; 
                   color: #888;
                   cursor: pointer;
                }
              }
              .con{
                padding: 20px;
                .h3{
                  font-size: 14px;
                  line-height: 40px;
                }
                .row{
                  margin-top: 10px;
                  .row_l{
                    float: left;
                    width: 80px;
                    font-size: 14px;
                    line-height: 36px;
                  }
                  .row_r{
                    float: left;
                    width: 420px;
                  }
                }
                .btn{
                  margin-left: 200px;
                  margin-top: 20px;
                }
                
              }
          }
            // 重置手机号
          .r_phone{
             display: none;
             position: fixed;
             left: 50%;
             top: 80px;
             z-index: 2001;
             background: #fff;
             width: 600px;
             margin-left: -300px;
             border:1px solid #f5f7fa;
              .top{
                font-size: 16px;
                line-height: 40px;
                border-bottom: 1px solid #f5f7fa;
                padding-left:20px;
                position: relative;
                i{
                   font-size: 22px;
                   line-height: 40px;
                   position: absolute;
                   right:20px;
                   top: 0; 
                   color: #888;
                   cursor: pointer;
                }
              }
              .con{
                padding: 20px;
                .h3{
                  font-size: 14px;
                  line-height: 40px;
                }
                .row{
                  margin-top: 10px;
                  .row_l{
                    float: left;
                    width: 80px;
                    font-size: 14px;
                    line-height: 36px;
                  }
                  .row_r{
                    float: left;
                    width: 420px;
                  }
                  .row_r2{
                    float: left;
                    width: 420px;
                    div{
                      float: left;
                      width: 240px;
                    }
                    .row_r2r{
                      float: left;
                      width: 170px;
                      i{
                        line-height: 36px;
                        font-size: 20px;
                        cursor: pointer;
                      }
                    }
                    
                  }
                  .row_r3{
                    float: left;
                    width: 420px;
                    div{
                      float: left;
                      width: 300px;
                    }
                    a{
                      float: left;
                      font-size: 14px;
                      color: #409EFF;
                      line-height: 36px;
                      margin-left: 10px;
                    }
                  }
                }
                .btn{
                  margin-left: 200px;
                  margin-top: 20px;
                }
                
              }
          }

          // 查看详情
@keyframes show{
            0%  {right:-400px; }
            100%{right:0; }
        }
        .detailsAni{
            -webkit-animation:show 0.2s linear 1;
            -webkit-animation-fill-mode:both;
        }
        .details{
            width:400px;
            position:fixed;
            right:-400px;
            top:0;
            height:100%;
            background:#fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
            z-index: 100;
            overflow-y:auto;
            .detailsTop{
                width:100%;
                padding:10px;
                box-sizing: border-box;
                border-bottom:1px solid #dddddd;
                font-size:16px;
                line-height:20px;
                i{float:right;font-size:13px;margin-right:10px;cursor: pointer;margin-top:2px;color:#333;}
            }
            .detailsBox{
                width:100%;
                box-sizing: border-box;
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select:none;
                -khtml-user-select:none;
                -webkit-user-select:none;
                -ms-user-select:none;
                user-select:none;
                .detailsName{
                    width:100%;
                    padding:10px;
                    box-sizing: border-box;
                    border-bottom:1px solid #dddddd;
                    .detailsList{
                        font-size:13px;
                        color:#333;
                        line-height:20px;
                    }
                }
                .detailSale{
                    width:100%;
                    border-bottom: 1px solid #dddddd;
                    padding:10px;
                    box-sizing: border-box;
                    .detailSaleTop{
                        padding:10px 0;
                        box-sizing: border-box;
                        font-size:12px;
                        .icon{
                            font-size:18px;
                            float:right;
                            cursor: pointer;
                            margin-right:10px;
                        }
                    }
                    .hint{
                        height:0;
                    }
                    .detailSaleList{
                        width:100%;
                        font-size:13px;
                        color:#333;
                        margin:6px 0;
                        overflow: hidden;
                    }
                    .detailTable{
                        width:100%;
                        font-size:13px;
                        color:#333;
                        line-height:20px;
                        margin:5px 0;
                        overflow: hidden;
                        .detailTableList{
                            width:33%;
                            float:left;
                        }
                    }
                    .user{
                        width:100%;
                        height:50px;
                        padding:5px 0;
                        box-sizing: border-box;
                        .userImg{
                            width:40px;
                            height:40px;
                            overflow: hidden;
                            border-radius: 100%;
                            float:left;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        .userName{
                            width:calc(100% - 50px);
                            height:40px;
                            float:left;
                            margin-left:10px;
                            p{
                                line-height:20px;
                            }
                        }
                    }
                }
            }

        }
        
      }

  
</style>