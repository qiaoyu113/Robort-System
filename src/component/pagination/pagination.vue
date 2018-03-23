<template>
  <el-pagination
          background
          v-if="options.totalCount > options.size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="options.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="options.totalCount">
  </el-pagination>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['options'],
    data () {
      return {
        currentPage: 1
      }
    },
    components: {},
    mounted () {},
    methods: {
      // 分页，每页n条
      handleSizeChange (val) {
        //console.log('每页'+val+'条');
        let that = this;
        that.$emit('sizeChange', val);
      },
      // 分页，当前页，就是当前点击的那一页
      handleCurrentChange (val) {
        let that = this;
        //console.log('当前'+val+'页码');
        that.currentPage = val;
        that.$emit('currentChange', val);
      },
    }
  }
</script>
<style></style>