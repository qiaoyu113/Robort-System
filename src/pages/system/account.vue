<template>
  <!-- 账号设置 -->
  <div class="system-account">
    <div class="box">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="账号" size="mini">
          {{list.account}}
          <div class="reset-pass" @click="show()">修改密码</div>
        </el-form-item>
        <el-form-item label="头像" prop="imgUrl">
          <upload-original :options="uploadOrg" v-on:getPictureUrl="getPictureUrl" ref="upOrg"></upload-original>
        </el-form-item>
        <el-form-item label="名称" prop="hostName">
          <el-input v-model="userForm.hostName" placeholder="请输入昵称" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="hostPhone">
          <el-input v-model="userForm.hostPhone" placeholder="请输入客服电话"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit()" class="primary-button">保存</el-button>
    </div>
    <!-- 蒙版 -->
    <div class="modal" ref="modal"></div>
    <!-- 修改密码 -->
    <div class="thepassword" ref="thepassword">
      <div class="top">修改密码<i class="iconfont icon-guanbi2"  @click="close()"></i></div>
      <div class="modifybox">
        <div class="modifros clearfix">
          <p class="modifros_l">原密码 : </p>
          <p class="modifros_r"><el-input type="password" v-model="oldpwd" placeholder="请输入原密码"></el-input></p>
        </div>
        <div class="modifros clearfix">
          <p class="modifros_l">新密码 : </p>
          <p class="modifros_r"><el-input type="password" v-model="newpwd1" placeholder="请输入新密码"></el-input></p>
        </div>
        <div class="modifros clearfix">
          <p class="modifros_l">确认密码 : </p>
          <p class="modifros_r"><el-input type="password" v-model="newpwd2" placeholder="再次输入新密码"></el-input></p>
        </div>
        <el-button @click='postPassword()'>确定</el-button>
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
                input:'',
                oldpwd:'',
                newpwd1:'',
                newpwd2:'',
                list:'',
                id:'',
                rules: {
                    hostName: [
                        { required: true, message: '请输入昵称', trigger: 'change' },
                        { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
                    ],
                    hostPhone: [
                        { required: true, message: '请输入客服电话', trigger: 'change'}
                    ],
                },
                userForm:{
                    hostName:'',
                    hostPhone:'',
                    imgUrl:''
                },
                uploadOrg: {
                    limit:1,
                    noSizeLimit:true,
                    // 描述文字一
                    des: '建议不大于1m，支持.png .jpg .jpeg',
                    // 描述文字二
                    des2: '说明：该图片为展示头像。'
                },
            }
        },
        mounted(){
            this.getUsers()
        },
        methods: {
            show:function(){
                this.$refs.modal.style.display="block"
                this.$refs.thepassword.style.display="block"
            },
            close:function(){
                this.$refs.modal.style.display="none"
                this.$refs.thepassword.style.display="none"
            },
            // 修改密码
            postPassword:function(){
                let that=this;
                if(that.oldpwd == that.newpwd1){
                    that.$message({
                        type: 'info',
                        message: '旧密码和新密码相同，请重新输入'
                    });
                    that.oldpwd ='';that.newpwd1 ='';that.newpwd2 =''
                }else if(that.newpwd1!==that.newpwd2){
                    that.$message({
                        type: 'info',
                        message: "两次密码输入不相同，请重新输入"
                    });
                    that.oldpwd ='';that.newpwd1 ='';that.newpwd2 =''

                }else {
                    financialService.postPassword({
                        oldpwd: that.oldpwd,
                        newpwd1: that.newpwd1,
                        newpwd2: that.newpwd2
                    }).then(function (res) {
                        if (res.data.code == 200) {
                            that.getUsers()
                            that.close()
                            that.$message({
                                type: 'success',
                                message: "修改密码成功"
                            });
                            that.oldpwd ='';that.newpwd1 ='';that.newpwd2 =''
                        } else {
                            that.$message.error(res.data.message);
                        }
                    })
                }

            },
            // 修改昵称和手机号
            submit:function(){
                let that=this;
                if(that.list.hostCompany!=that.userForm.hostName || that.list.hostPhone!=that.userForm.hostPhone || that.list.hostLogo!=that.userForm.hostLogo){
                    financialService.postAdminInfo({id:that.id,hostName:that.userForm.hostName,hostPhone:that.userForm.hostPhone,hostLogo:that.userForm.hostLogo}).then(function(res){
                        if(res.data.code == 200){
                            that.getUsers()
                        }
                    })
                }
            },
            // 获取账号信息
            getUsers:function(){
                let that=this;
                financialService.getAdminInfo().then(function(res){
                    console.log(res.data.datas)
                    that.list=res.data.datas
                    that.userForm.hostName=that.list.hostName
                    that.userForm.hostPhone=that.list.hostPhone
                    that.userForm.hostLogo = that.list.hostLogo
                    if(that.userForm.hostLogo){
                        that.userForm.imgUrl = that.$store.state.picHead+that.userForm.hostLogo
                        that.$refs.upOrg.imgUrl = that.userForm.imgUrl;
                        that.$refs.upOrg.isImageState = 1;
                    }
                    that.id=that.list.id

                })
            },
            getPictureUrl:function(url){
                let that=this;
                if(url){
                    that.userForm.hostLogo = url
                    console.log(url)
                } else {
                    that.userForm.imgUrl = that.$store.state.picHead+that.userForm.hostLogo
                    that.userForm.hostLogo = url = that.list.hostLogo
                }

            },


        },

    }
</script>

<style lang="less">
  .system-account{
    .reset-pass{
      color: #1ba1e2;
      font-size: 10px;
      cursor: pointer;
      width: 80px;
    }
    .primary-button{
      margin: 40px 0 0 200px;
    }
    .box{
      padding: 0 20px;
      margin-top: 40px;
      margin-left: 10px;
        .el-input{
          font-size: 14px;
          line-height: 36px;
          color: #333;
          width:300px;
      }
    }
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
    .thepassword{
      display: none;
      position: fixed;
      left: 50%;
      top: 140px;
      z-index: 2001;
      background: #fff;
      width: 400px;
      margin-left: -200px;
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
      .modifybox{
        padding: 20px 20px;
        max-height: 340px;
        overflow-y: auto;
        .modifros{
          margin-top: 10px;
          .modifros_l{
            float: left;
            width: 60px;
            line-height: 34px;
          }
          .modifros_r{
            float: left;
            margin-left:10px;
            input{
              width: 284px;
              height: 34px;
            }
          }
        }

        button{
          margin: 20px 0 0px 145px;
        }
      }
    }
  }

</style>
