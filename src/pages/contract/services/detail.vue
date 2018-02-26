<template>
  <div class="container">
    <div class="detail">
      <p class="title">服务详情</p>
      <p class="des"><label class="label">提交时间：</label>{{info.createTime}}</p>
      <p class="des"><label class="label">联系人：</label>{{info.name}}</p>
      <p class="des bottomMargin"><label class="label">联系人手机号：</label>{{info.phone}}</p>
      <p class="title">合同模板</p>
      <p class="des">员工期权授予协议</p><!--员工期权授予协议.docx-->
      <p class="des">生成文件：<span class="link">员工期权授予协议.docx<a class="download" >下载</a></span></p>
      <p class="des bottomMargin">第一次合同校审文件：<span class="link">员工期权授予协议.docx<a class="download">下载</a></span></p>
      <p class="title">需求描述</p>
      <p class="des bottomMargin">{{info.description}}</p>
      <div class="btns" v-if="info.status == 0">
        <el-button type="primary" size="mini"  @click="opr(1)">通过</el-button>
        <el-button type="primary" size="mini" @click="opr(2)">拒绝</el-button>
      </div>
      <div class="results" v-else>
        <p class="title">审核结果</p>
        <p class="des" v-if="info.status == 1"><span style="margin-right: 20px;">已通过</span><span>通过时间：{{info.varifyTime}}</span></p>
        <p class="des" v-if="info.status == 2"><span  style="margin-right: 20px;">已拒绝</span><span>拒绝时间：{{info.varifyTime}}</span></p>
        <p class="des">{{info.resultInfo}}</p>
        <p class="des" v-if="info==1">附件<span class="link">员工期权授予协议.docx<a class="download">下载</a></span></p>
      </div>
    </div>
    <!--内容弹出层-->
    <el-dialog
            modal="false"
            :visible.sync="formDialogVisible"
            width="30%"
            center>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上传文件" prop="fileUrl" v-if="dialog.typ==1">
          <upload-file style="margin-top: 6px;" v-on:getFileUrl="getUpdateFileUrl"></upload-file>
        </el-form-item>
        <el-form-item :label="dialog.title" prop="reason">
          <el-input v-model="form.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="formDialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('form')">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {common} from '../../../assets/js/common/common'
  import uploadFile from '../../../component/upload/uploadFile.vue'
  import {contractService} from '../../../service/contractService'

  export default {
    props: [],
    data () {
      return {
        formDialogVisible: false,
        dialog: {
          title: '', //弹框标题
          typ: 1, // 1,通过；2.拒绝；
        },
        info: '', // 详情对象
        form: {
          id: '',
          reason: '',
          fileUrl: ''
        },
        rules: {
          reason: [
            { required: true, message: '请输入你同意的理由', trigger: 'blur'}
          ],
          fileUrl: [
            { required: true, message: '请上传校验后的合同模板', trigger: 'change'}
          ]
        }
      }
    },
    components: { 'upload-file': uploadFile},
    mounted () {
      let that = this;
      that.getInfo();
      //
    },
    methods: {
      opr (typ) {
        let that = this;
        if(typ==1){
          that.dialog={
            title: '通过说明',
            typ: 1,
          }
        }
        if(typ==2){
          that.dialog={
            title: '拒绝说明',
            typ: 2,
          }
        }
        that.formDialogVisible = true;
      },
      getInfo () {
        let that = this, id = that.$route.params.serviceId;
        //获得详情
        contractService.getServiceOne(id).then(function (res) {
          console.log('答案电动蝶阀', res);
          if(res.data.success){
            let obj = res.data.datas;
            let cTime = obj.createTime*1;
            let vTime = obj.varifyTime*1;
            obj.createTime = common.getFormatOfDate(cTime, 'yyyy-MM-dd hh:mm');
            if(obj.varifyTime!=null){
              obj.varifyTime = common.getFormatOfDate(vTime, 'yyyy-MM-dd hh:mm');
            }
            that.getTemplate(res.data.datas.templateId);
            that.info = res.data.datas;
            that.form.id = res.data.datas.id;
          }else{}
        });
      },
      getTemplate (id) {
        let that = this;//, id = that.$route.params.serviceId;
        contractService.getOneTemplate(id).then(function (res) {
          console.log('获取合同1',res);
        });
      },
      submitForm (formName) {
        let that = this;
        that.$refs[formName].validate( (valid) => {
          if(valid){
            // 验证成功
            if(that.dialog.typ==1){
              // 审核通过，同意
              contractService.agreeService({id: that.form.id, resultInfo: that.form.reason, updateUrl: that.form.fileUrl}).then(function (res) {
                console.log('审核通过', res);
                if(res.data.success){
                  that.getInfo();
                  that.formDialogVisible = false;
                }else{}
              });
            }else{
              // 审核未通过，拒绝
              contractService.refuseService({id: that.form.id, resultInfo: that.form.reason}).then(function (resp) {
                console.log('审核未通过', resp);
                if(resp.data.success){
                  that.getInfo();
                  that.formDialogVisible = false;
                }else{}
              });
            }
          }else{
            return false;
          }
        });
      },
      getUpdateFileUrl (val) {// 获得文件路径
        let that = this;
        that.form.fileUrl = val;
        console.log('val', that.form.fileUrl);
      }
    }
  }
</script>
<style lang="less">
  .container{padding: 20px;
    .detail{width: 600px;
      .title{margin-bottom: 15px;font-size: 16px;}
      .des{margin-bottom: 10px;line-height:18px;font-size: 12px;color:#666;
        .link{margin-left: 20px;color:#4EAAFE;
          .download{margin-left: 20px;cursor: pointer;}
        }
      }
      .label{display:block;float:left;}
      .bottomMargin{margin-bottom: 40px;}
      .btns{}
    }
  }
</style>