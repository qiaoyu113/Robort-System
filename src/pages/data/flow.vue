<template>
  <div class="survey">
     <p class="tishi">本页根据昨日数据来计算，而用户管理页根据当前数据计算，两者不一致。</p>
      <div class="article_div">
      <!-- 总概况 -->
      <div class="v_survey">
        <p class="v_surveytop">昨日流量</p>
        <div class="v_surveybox clearfix">
          <div><p>浏览量（PV）</p><p>{{yesPV}}</p></div>
          <div><p>访客数（UV）</p><p>{{yesUV}}</p></div>
          <div><p>IP数</p><p>{{yesIP}}</p></div>
        </div>
      </div>
      <!-- 图表块 -->
      <div class="v_myChart">
          <div class="v_myCharttop clearfix">
            <div class="v_myCharttopl">指标趋势图</div>
              <div class="v_myCharttopr">
                <el-select v-model="status" placeholder="浏览量（PV）" size="mini" @change='getnum(status)'>
                  <el-option label="浏览量（PV）" value="1"></el-option>
                  <el-option label="访客数（UV）" value="2"></el-option>
                  <el-option label="IP数" value="3"></el-option>
                </el-select>

                <el-select style="margin-left:10px;" v-model="time" placeholder="最近7天" size="mini" @change='getWalletflows(time)'>
                  <el-option label="最近7天" value="1"></el-option>
                  <el-option label="最近30天" value="2"></el-option>
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
    import {common} from '../../assets/js/common/common'
   let echarts = require('echarts')
  export default {
    props: [],
    data () {
      return {
        status:'1',
       time:'1',
       totalData:{},
        yesPV:'',
        yesUV:'',
        yesIP:'',
        tendency:[],
        times:[],
        datas:[],
        text:'',

      }
    },
    mounted () {
      this.getWalletflows(this.time)
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
              left: '1%',
              right: '4%',
              bottom: '9%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap:false,
              data:this.datas
          },
          yAxis: {
              type: 'value'
              /*min:0,
              max:60,
              splitNumber:6*/
          },
          series: [
              {
                  name:this.text,
                  type:'line',
                  stack: '总量1',
                  // areaStyle: {normal: {}},
                  data:this.times,
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
    // 进行筛选
    getnum(status){
      let times = new Array();
      let dates = new Array();
      for(var i = 0; i < this.tendency.length; i++){
        switch (Number(status)){
            case 1:
                times.push(this.tendency[this.tendency.length - i - 1].pv);
                this.text = '浏览次数';
                break;
            case 2:
                times.push(this.tendency[this.tendency.length - i - 1].cookiev);
                this.text = '浏览人数';
                break;
            case 3:
                times.push(this.tendency[this.tendency.length - i - 1].uv);
                this.text = 'IP数';
                break;
        }
        var date = this.tendency[this.tendency.length - i - 1].date;
        dates.push(common.getFormatOfDate(date,"MM-dd"));
      }

      this.times = times.reverse();
      this.datas = dates.reverse();
      this.drawLine()
    },
      //获得列表
      getWalletflows (item) {
        let that = this;
        statisticsService.getFlow({dateType:item}).then(function (res) { 
          if(res.data.code==200){
              that.totalData=res.data.datas
              that.yesPV = that.totalData.yesterdayAndAll[0].pv
              that.yesUV = that.totalData.yesterdayAndAll[0].cookiev
              that.yesIP = that.totalData.yesterdayAndAll[0].uv
              that.tendency = that.totalData.tendency
              that.getnum(that.status)
          }
                  
        });
      }
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