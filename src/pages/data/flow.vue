<template>
  <div class="survey">
     <p class="tishi">本页根据昨日数据来计算，而用户管理页根据当前数据计算，两者不一致。</p>
      <div class="article_div">
      <!-- 总概况 -->
      <div class="v_survey">
        <p class="v_surveytop">昨日流量</p>
        <div class="v_surveybox clearfix">
          <div><p>浏览量（PV）</p><p>100</p></div>
          <div><p>访客数（UV）</p><p>100</p></div>
          <div><p>IP数</p><p>100</p></div>
        </div>
      </div>
      <!-- 图表块 -->
      <div class="v_myChart">
          <div class="v_myCharttop clearfix">
            <div class="v_myCharttopl">指标趋势图</div>
              <div class="v_myCharttopr">
                <el-select v-model="status" placeholder="浏览量（PV）" size="mini" @change='getWalletflows'>
                  <el-option label="浏览量（PV）" value=""></el-option>
                  <el-option label="访客数（UV）" value="1"></el-option>
                  <el-option label="IP数" value="2"></el-option>
                </el-select>

                <el-select style="margin-left:10px;" v-model="time" placeholder="最近7天" size="mini" @change='getWalletflows'>
                  <el-option label="最近7天" value=""></el-option>
                  <el-option label="最近30天" value="1"></el-option>
                </el-select>
              </div>
          </div>
        <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
      </div>
      </div>
    </div>       
  </div>
</template>

<script>
    import {statisticsService} from '../../service/statisticsService'
    // import {common} from '../../assets/js/common/common'
    // import CKEDITOR from "../../../src/assets/js/common/ckeditor/ckeditor"
    // let myEditor;// 富文本编辑器
    // 引入基本模板
   // let echarts = require('echarts/lib/echarts')
   // require('echarts/lib/chart/bar')
   let echarts = require('echarts')

  export default {
    props: [],
    data () {
      return {
        // 操作区
        status: '', // 选择需求状态
        query: '', // 查询条件
        dicId: '30', //行业状态
        // 列表
        tableData: [], //列表数据
        // 分页
        inde:1,
        pages:{
           no:1,
           size:10,
        },
        totaldata:'',//总额

       startTime:'',         //时间
       endTime:'',           //时间
       timeshow:false,          //是否隐藏
       timetext:'最近30天',
       time:'最近7天',
    
     
        pickerOptions0: {  
        disabledDate:(time)=> {  
          // 最多只能选择3个月的

          let ayearAgo = Date.now() - (31536000000 / 4) 
          return time.getTime() > Date.now() || time.getTime() < ayearAgo 
        }
      }, 
      pickerOptions1: {  
        disabledDate :(time)=> {  
          let aa = this.startTime
          return time.getTime() > Date.now() || time.getTime() < aa 
        }  
       }, 

      }
    },
    // components: {pagination},
    mounted () {
      // let that = this;
      // that.getList();
      this.getWalletflows(1)
    //   this.getUserwallets()

      this.drawLine()
    
    },
    methods: {
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
             tooltip: {
                trigger: 'axis'
            },
            lineStyle:{
                normal:{
                    color:'#32A8FF'
                }
            },
            
            toolbox: {
              feature: {
                  saveAsImage: {}//将统计图保存为
              }
              ,right:100
              ,top:0
            },
            grid: {
              left: '0%',
              right: '4%',
              bottom: '9%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap:false,
              data:['11.07','11.08','11.09','11.10','11.11','11.12','11.13','11.14','11.15','11.16']
          },
          yAxis: {
              type: 'value'
              /*min:0,
              max:60,
              splitNumber:6*/
          },
          series: [
              {
                  name:'浏览次数',
                  type:'line',
                  stack: '总量1',
                  // areaStyle: {normal: {}},
                  data:['10','22','10','50','13','31','15','10','22','10'],
                  itemStyle : {normal : {color:'#32A8FF'}},
                  areaStyle:{
                    normal:{
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                            offset: 0,
                            color: 'rgba(80,141,255,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(56,155,255,0.25)'
                        },{
                            offset: 1,
                            color: 'rgba(38,197,254,0.00)'
                        }])
                    }
                }
              }
          ]
        });
    },
       //时间
      timebox:function(){
      	  if(this.timeshow==false){
                  this.timeshow=true
      	  }else if(this.timeshow!=false){
      	  	      this.timeshow=false
      	  }
      },
    times:function(){
    	  this.timetext='自定义'
    },

      time:function(id){
           var now=new Date(this.day)  //当前日期
            var nowDay = now.getDate(); //当前日
            var nowMonth = now.getMonth(); //当前月
            var nowYear = now.getYear(); //当前年
                nowYear += (nowYear < 2000) ? 1900 : 0;
            // var newDate=now.getTime()//当前毫秒数
            if(id==1){
                 var endDate = new Date(nowYear, nowMonth, nowDay - 1);
                 var endDates = new Date(nowYear, nowMonth, nowDay);
                 this.startTime=endDate.getTime()
                  this.endTime=endDates.getTime() - 1
                  // document.getElementById('timetext').html('昨天')
                  this.timetext='昨天'
            }
             if(id==2){
                var nowDayOfWeek = now.getDay(); //今天本周的第几天
                var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
                var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
                 this.startTime=weekStartDate.getTime()
                  this.endTime=weekEndDate.getTime() - 1
                 // document.getElementById('timetext').text('上周')
                  this.timetext='上周'
            }
             if(id==3){
               var startTimes = new Date(nowYear, nowMonth, 1);
                var endDate = new Date(nowYear, nowMonth, nowDay + 1);
                 this.startTime=startTimes.getTime()
                  this.endTime=endDate.getTime() - 1
                  // document.getElementById('timetext').html('本月')
                   this.timetext='本月'
            }
             if(id==4){
              var monthStartDate = new Date(nowYear, nowMonth - 1, nowDay);
                var monthEndDate = new Date(nowYear, nowMonth, nowDay);
                var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
                var startTimes=new Date(nowYear, nowMonth - 1, 1);
                var endTimes=new Date(nowYear, nowMonth - 1, days + 1);
                 this.startTime=startTimes.getTime()
                  this.endTime=endTimes.getTime() - 1
                 // document.getElementById('timetext').html('上月')
                  this.timetext='上月'
            }
             if(id==5){
                 var todayDate = new Date(nowYear, nowMonth, nowDay - 6);
                 var endDate = new Date(nowYear, nowMonth, nowDay + 1);
                 this.startTime=todayDate.getTime()
                  this.endTime=endDate.getTime() - 1
                  // document.getElementById('timetext').html('最近7天')
                   this.timetext='最近7天'
            }
             if(id==6){
             
                 var todayDate = new Date(nowYear, nowMonth, nowDay - 14);
                  var endDate = new Date(nowYear, nowMonth, nowDay + 1);
                 this.startTime=todayDate.getTime()
                  this.endTime=endDate.getTime() - 1
                 // document.getElementById('timetext').html('最近15天')
                  this.timetext='最近15天'
            }
             if(id==7){
                 var todayDate = new Date(nowYear, nowMonth, nowDay - 29);
                  var endDate = new Date(nowYear, nowMonth, nowDay + 1);
                 this.startTime=todayDate.getTime()
                  this.endTime=endDate.getTime() - 1
                  // document.getElementById('timetext').html('最近30天')
                   this.timetext='最近30天'
            }
            // if(this.startTime!=''){
            //   this.startTimes=publics.stamp(this.startTime)
            //  this.endTimes=publics.stamp(this.endTime)
            // }
             
        },

      //分页
      handleSizeChange(val){
          this.pages.size=val
        //   this.getWalletflows()
      },
      handleCurrentChange(val){
          this.pages.no=val
        //   this.getWalletflows()
      },
      // 
   
      //获得列表
      getWalletflows (item) {
        let that = this;
        statisticsService.getFlow({dateType:item}).then(function (res) { 
                  if(res.data.code==200){
                          that.tableData=res.data.datas.records
                          that.inde=res.data.datas.total
                  }
                  
        });
      },
       //获得总额
      getUserwallets () {
        let that = this;
        commonService.getUserwallets().then(function (res) {
                  if(res.data.code==200){
                          that.totaldata=res.data.datas
                  }
                  
        });
      },
 
       
       
     
  
    },
   
  }
</script>
<style lang="less">
  .survey{
      padding: 20px;
      .tishi{
        border: 1px solid #DADADA;
        background: #FFFEDB;
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
      }
  	.v_survey{
  		background: #fff;
  		padding: 20px 0;
        // border: 1px solid #dcdfe6;
        // -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        //  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
         margin-bottom: 20px;
  		.v_surveytop{
  			line-height: 40px;
  			color: #333;
  			margin-left: 20px;
  		} 
  		.v_surveybox{
  			div{
  				border:1px solid #dcdfe6;
  				border-radius: 6px;
  				float: left;
  				width: 200px;
  				height: 40px;
  				padding: 10px 0;
          margin-left: 20px;
          font-size: 14px;
  				p{
  					line-height: 20px;
  					text-align: center;

  				}

  			}
  		}
  	}
  	.v_myChart{
  		  padding: 0 20px;
  		  .v_myCharttop{
  		  	 .v_myCharttopl{
  		  	 	//  float: left;
  		  	 	 line-height: 28px;
                 color: #333;
  		  	 }
  		  	 .v_myCharttopr{
             float: left;
             margin-top:10px;
  		  	 	 .p_surface_title_r{
                       float: right;
    // margin-top: 8px;
                     margin-left: 10px;
                   }
  .p_surface_title_r_div{
    width: 120px;
    height: 26px;
    border:1px solid #f29700;
    border-radius: 3px;
   
    position: relative;
  }
  .p_surface_title_r_div_text{
      text-align: center;
  }
  .p_surface_title_r_div p{
    line-height: 26px;
    font-size: 14px;
    color: #f29700;
    cursor: pointer; 

  }

  .p_surface_title_r_div_fixed{
    display: block;
    position:absolute;
    top: 36px;
    right: 0px;
    width: 460px;
    z-index: 999;
    border:1px solid #f29700;
    border-radius:4px;
    background: #fff;
    padding: 0px 20px;

  }
  .p_surface_title_r_div_fixed li{
    float: left;
    width: 120px;
    margin-left: 30px;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
  }
  .p_surface_title_r_div_fixed .v_li{
          color: #f29700;
  }
  .p_surface_title_r_div_operation{
      border-top: 1px solid #e5e5e5;
      padding: 14px 0;
  }
  .p_surface_title_r_div_cancel{
       float: right;
      width: 60px;
      height: 32px;
      border:1px solid #e5e5e5;
      text-align: center;
      margin-right: 20px;
      line-height: 32px;
      cursor: pointer;
  }
  .p_surface_title_r_div_determine{
      float: right;
      width: 60px;
      height: 32px;
      background: #f29700;
      color: #fff;
      border:1px solid #f29700; 
      border-radius: 3px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
  }
  		  	 }
  		  }
  	}
  	.article_div{
     	background: #fff;
        // border: 1px solid #dcdfe6;
        // -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        //  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
         .top{
         	background:#f5f7fa;
         	height: 40px;
         	// border-top: 1px solid #dcdfe6;
         	border-bottom: 1px solid #e4e7ed;
         	.v_div{
         		float: left;
         		height: 40px;
         		padding: 0 20px;
         		line-height: 40px;
         		color: #909399;
         		font-size: 14px;
         		
         	}
         	.v_div:hover{
         		color: #F29700;

         	}
         	.router-link-active{
         		div{

         		border-left: 1px solid #e4e7ed;
         		border-right: 1px solid #e4e7ed;
         		border-top: 1px solid #e4e7ed;
                border-bottom: 1px solid #fff; 
         		color: #F29700;
         		background: #fff;
         	}
         	}
         	
         	a:first-child .v_div{

         		border-left: none;
         	}

         }
         .v_box{
         	// height: 200px;

    .income{
       padding: 15px;
      .searchIpt {
        width: 250px;
      }
      .v_table{
      	.v_tablel{
      		float: left;
      		line-height: 28px;
      		color: #333;
      	}
      	.opr{
      		float: right;
        margin-bottom: 20px;
      }
      }
      
      .has-gutter{
        background: #909399;
      }
      .el-table th{
        background: #eee;
      }
      .v_paging{
         margin-top: 20px;
         text-align: right;
      }


      
    }
  .price{width: 100%;white-space: nowrap; text-overflow:ellipsis; overflow:hidden;}
           }
}
  }
</style>