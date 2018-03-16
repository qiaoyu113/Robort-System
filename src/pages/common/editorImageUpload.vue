<template>
  <div>
  
  </div>
</template>
<script type="text/ecmascript-6">
  import {pluginService} from '../../service/pluginService'
  export default {
    props: [],
    data () {
      return {}
    },
    components: {},
    mounted () {
      pluginService.uploadFile().then(function (res) {
        if(res.data.success){
          let obj = res.data.datas;
          localStorage.editorImgUrl = obj.resourceUrl + obj.
        }else{

        }
      });
    },
    methods: {}
  }
</script>
<style></style>