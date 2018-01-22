<template>
    <div class="integral">
    <!-- 选项卡 -->
       <div class="option clearfix">
        <p :class="{'p_border':indexs==1}" @click="shows(1)">积分设置</p>
        <p :class="{'p_border':indexs==2}" @click="shows(2)">积分操作</p>
       </div>
        <!-- 积分设置 -->
       <div class="v_box" :class="{'show':indexs==1}">
           <div class="table">
               <table>
                   <thead>
                       <tr>
                           <th>项目</th>
                           <th>积分</th>
                           <th>上限</th>
                           <th>说明</th>
                           <th>操作</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>订单完成</td>
                           <td>1元一分</td>
                           <td>无</td>
                           <td>拍卖成交，即可获赠，实际支付1元积1分1分</td>
                           <td>
                              <a href="javaScript:;">编辑</a></td>
                       </tr>
                      <tr>
                           <td>商城消费</td>
                           <td>1元一分</td>
                           <td>无</td>
                           <td>在商城消费任意金额，即可获赠</td>
                           <td>
                              <a href="javaScript:;">编辑</a></td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>  
      <!-- 积分操作 -->
       <div class="v_box2" :class="{'show':indexs==2}">
         <div class="form">
           <div class="ros clearfix">
               <div class="ros_l">用户账号 : </div>
               <div class="ros_r">
                   <el-input v-model="input" placeholder="请输入手机号"></el-input>
               </div>
           </div>
           <div class="ros clearfix">
               <div class="ros_l">用户账号 : </div>
               <div class="ros_r clearfix">
                 <div><el-select v-model="value" placeholder="增加">
                       <el-option
                         v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                       </el-option>
                     </el-select></div>
                     <div><el-input v-model="input" placeholder=""></el-input></div>
                     <div class="jifen">积分</div>
               </div>
           </div>
           <div class="btn">
             <el-button type="primary" plain>确定</el-button>
           </div>
           

         </div>      
    

  
       </div> 


    </div>
</template>

<script>

    // import Vue from 'vue'
    // import Element from 'element-ui'
    // import 'element-ui/lib/theme-default/index.css'

    export default {
        name: 'app',
        data: function (){
            return {
              indexs:1,
              
              input:'',
               options: [{
                   value: '选项1',
                   label: '增加'
                 }, {
                   value: '选项2',
                   label: '减少'
                 }],
                    value: '选项1'
             }
        },
        mounted(){
           
        },
        methods: {
          shows:function(id){
            this.indexs=id
          }

              
        },

    }
</script>

<style lang="less">
  
      .integral{
          .option{
               border-bottom: 1px solid #333;
              
               height: 41px; 
               margin:20px 20px 0;
               p{
                float: left;
                line-height: 40px;
                font-size: 16px;
                color: #999;
                padding: 0 10px;
                cursor: pointer;
               }
               .p_border{
                border-radius: 4px 4px 0 0;
                border:1px solid #333;
                border-bottom: 1px solid #fff;
               }
          }
          .v_box{
            display: none;
            padding: 0 20px;
          
            .table{
                width: 100%;
                margin-top: 40px;
                table{

                    border-collapse: collapse;
                    width: 100%;
                    th{
                        border:1px solid #333;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                    }
                    td{
                        text-align: center;
                        border:1px solid #333;
                        height: 40px;
                        line-height: 40px;
                        color: #666;
                        a{
                            padding: 0 4px;
                        }
                    }
                }

            }
          }
          .v_box2{
            display: none;
            padding: 0 20px;
            .form{
              margin-top: 40px;
              margin-left: 20px;
              .ros{
                  margin-bottom: 20px;
                .ros_l{
                  float: left;
                  line-height: 40px;
                  color: #333;
                  font-size: 14px;
                }
                .ros_r{
                  float: left;
                  margin-left: 14px;
                }
                .clearfix{
                  div{
                    float: left;
                    
                    .el-input{
                       width: 140px;
                       margin-right: 10px;
                    }
                  }
                  .jifen{
                      line-height: 40px;
                      font-size: 16px;
                      color: #333;
                    }
                }
              }
              .btn{
                margin-left: 76px;
                button{
                  width: 120px;

                }
              }
            }
          }
          .show{
            display: block;
          }


      }

</style>
