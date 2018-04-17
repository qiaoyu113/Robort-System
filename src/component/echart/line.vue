<!--
author: Liu Xiaohong
create: 2018-02-28
desc:折线图
options: none

-->
<template>
  <div class="chartCover">
    <div class="selectBox">
      <el-select v-model="opIndex" placeholder="请选择指标" size="mini">
        <el-option
                v-for="item in filterList"
                :key="item.value"
                :label="item.text"
                :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="trendIndex" placeholder="请选择趋势" size="mini">
        <el-option
                v-for="item in trendList"
                :key="item.value"
                :label="item.text"
                :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="main" class="myChart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from '../../assets/js/plugins/echart/echarts.min'
  export default {
    props: ['lineOption'],
    data () {
      return {
        opIndex: '1', // 指标model
        filterList: [
          {text: '浏览数', value: '1'},
          {text: '访客数', value: '2'},
          {text: '成交单数', value: '3'},
          {text: '收入', value: '4'},
        ],
        trendIndex: '1', // 趋势model
        trendList: [
          {text: '最近7天', value: '1'},
          {text: '最近30天', value: '2'},
        ],
        xAxisData: [], // 横轴，时间
        seriesData: [], // 数据
      }
    },
    components: {},
    mounted () {
      // 基于准备好的dom，初始化echarts实例
      this.initChart();
    },
    methods: {
      initChart () {
        let that = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        let option = null;
        option = {
          title: {
            text: that.lineOption.title,
            subtext: that.lineOption.subTitle,
          },
          tooltip: {
            trigger: 'axis',
            //formatter: '{b}: {c}'
          },
          legend: {
            bottom: 0 //图例的位置，bottom: 0 即为位于底部
          },
          grid: {  // 统计图表
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          toolbox: { //下载图片的工具
            feature: {
              saveAsImage: {}
            },
            right: '4%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: that.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: that.seriesData
        };
        // 使用刚指定的配置项和数据显示图表。
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      }
    },
    watch: {
      opIndex (cur, old) {
        this.$emit('indexChange', cur);
        //this.initChart();
      },
      trendIndex (cur, old) {
        this.$emit('trendChange', cur);
        //this.initChart();
      },
      xAxisData (cur, old) {
        this.xAxisData = cur;
        this.initChart();
      }, // 横轴，时间
      seriesData (cur, old) {
        this.seriesData = cur;
        this.initChart();
      }, // 数据
    }
  }
</script>
<style lang="less" scope>
  .chartCover{margin: 40px 0 0;position:relative;}
  .myChart{width:100%;height:600px;}
  .selectBox{position:absolute;top:0;left: 20%;z-index:3;}
  .el-select{margin: 0 10px;}
</style>