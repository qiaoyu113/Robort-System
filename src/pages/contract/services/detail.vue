<template>
  <div class="container">
    <div class="detail">
      <p class="title">服务详情</p>
      <p class="des"><label class="label">提交时间：</label>2018-12-13 23:59</p>
      <p class="des"><label class="label">联系人：</label>heidi</p>
      <p class="des bottomMargin"><label class="label">联系人手机号：</label>13285744569</p>
      <p class="title">合同模板</p>
      <p class="des">员工期权授予协议</p>
      <p class="des">生成文件：<span class="link">员工期权授予协议.docx<a class="download">下载</a></span></p>
      <p class="des bottomMargin">第一次合同校审文件：<span class="link">员工期权授予协议.docx<a class="download">下载</a></span></p>
      <p class="title">需求描述</p>
      <p class="des bottomMargin">
        我需要律师审核一下的合同，第一条是射蚂蚁四，发后打开撒发打发汇顶科技萨芬带回家sad的就撒回放</p>
      <div class="btns">
        <el-button type="primary" size="mini"  @click="opr(1)">通过</el-button>
        <el-button type="primary" size="mini" @click="opr(2)">拒绝</el-button>
      </div>
      <p class="title">审核结果</p>
      <p class="des"><span>已通过</span><span>通过时间：</span></p>
      <p class="des">本文件中有很多问题需要自诩一下，合同中第一条，第二条经销上的信息是什么情况我改怎么天线写，如果遇到什么问题，我要怎么解决呀？</p>
      <p class="des">附件<span class="link">员工期权授予协议.docx<a class="download">下载</a></span></p>
    </div>
    <!--内容弹出层-->
    <el-dialog
            modal="false"
            :visible.sync="formDialogVisible"
            width="30%"
            center>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="dialog.title" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="name" v-if="dialog.typ==1">
          <el-input v-model="form.name"></el-input>
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
  export default {
    props: [],
    data () {
      return {
        formDialogVisible: false,
        dialog: {
          title: '', //弹框标题
          typ: 1, // 1,通过；2.拒绝；
        },
        form: {
          name: ''
        },
        rules: {
          name: [
            {}
          ]
        }
      }
    },
    components: {},
    mounted () {},
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
      .btns{

      }
    }
  }
</style>