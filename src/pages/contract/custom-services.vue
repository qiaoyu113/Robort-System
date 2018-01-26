<template>
  <div class="container">
    <!--第一层tab-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资讯律师" name="second"></el-tab-pane>
      <el-tab-pane label="合同校审" name="third"></el-tab-pane>
    </el-tabs>
    <!--显示模板-->
    <tab></tab>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import tab from './services/tab.vue'
  export default {
    props: [],
    data () {
      return {
        activeName: 'second',
        tabPosition: '',
      }
    },
    components: {'tab': tab},
    mounted () {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style lang="less">
  .el-tabs--top .el-tabs__item.is-top:nth-child(2){padding-left:20px!important;}
</style>