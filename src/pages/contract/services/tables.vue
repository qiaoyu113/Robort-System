<template>
  <div>
    <!--表格-->

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['tableInfo'],
    data () {
      return {
        tableData: []
      }
    },
    components: {},
    mounted () {
      console.log('tableInfo', this.tableInfo);
      this.tableData = this.tableInfo.tableData;
      console.log('tableData', this.tableData);
    },
    watch: {
      tableInfo (cur, old) {
        console.log('watch ', cur);
      }
    },
    methods: {}
  }
</script>
<style></style>