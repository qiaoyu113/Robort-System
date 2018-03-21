<template>
  <div id="ckeditor">
    正在加載...
  </div>
</template>

<script>
  export default {
    mounted(){
      let that = this;
      let CKEDITOR = window.CKEDITOR;
      let ImageUrl = that.$route.query.ImageUrl;
      let CKEditorFuncNum = that.$route.query.CKEditorFuncNum;
      let Message = that.$route.query.Message;
      window.parent.CKEDITOR.tools.callFunction( CKEditorFuncNum, ImageUrl,Message);
    },
    methods: {

    }
  }
</script>
<style></style>