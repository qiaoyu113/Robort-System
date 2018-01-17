<template>
    <div class="jurisdiction">
    <!-- 选项卡 -->
       <div class="option clearfix">
        <p :class="{'p_border':indexs==1}">角色设置</p>
        <p :class="{'p_border':indexs==2}">账号设置</p>
       </div>
        <!-- 角色设置 -->
       <div class="v_box" :class="{'show':indexs==1}">
            <div class="establish clearfix"><el-button>创建角色</el-button></div>
           <div class="table">
               <table>
                   <thead>
                       <tr>
                           <th>角色名称</th>
                           <th>功能权限数</th>
                           <th>成员数量</th>
                           <th>操作</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>审核人员</td>
                           <td>12</td>
                           <td>15</td>
                           <td>
                              <a href="javaScript:;">编辑</a>
                              <a href="javaScript:;">删除</a>
                              <a href="javaScript:;">分配角色</a></td>
                       </tr>
                       <tr>
                           <td>运营</td>
                           <td>12</td>
                           <td>15</td>
                           <td>
                              <a href="javaScript:;">编辑</a>
                              <a href="javaScript:;">删除</a>
                              <a href="javaScript:;">分配角色</a></td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>  
      <!-- 账号设置 -->
       <div class="v_box2" :class="{'show':indexs==2}">
       <!-- 搜索框 -->
          <div class="search clearfix">
              <div class="search_l">
                 <el-input placeholder="请输入内容" v-model="input4">
                       <!-- <el-button slot="append"><i class="iconfont icon-sousuo"></i></el-button> -->
                       <!-- <el-button slot="append" icon="el-icon-circle-plus"></el-button> -->
                       <!-- <template slot="append"><p><i class="iconfont icon-sousuo"></i></p></template> -->
                 </el-input>

  
            </div>
            <div class="search_r">

                <el-button>添加账号</el-button>
            </div>
           </div>
           
           <div class="table">
               <table>
                   <thead>
                       <tr>
                           <th>角色名称</th>
                           <th>功能权限数</th>
                           <th>成员数量</th>
                           <th>操作</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>审核人员</td>
                           <td>12</td>
                           <td>15</td>
                           <td>
                              <a href="javaScript:;">编辑</a>
                              <a href="javaScript:;">删除</a>
                              <a href="javaScript:;">分配角色</a></td>
                       </tr>
                       <tr>
                           <td>运营</td>
                           <td>12</td>
                           <td>15</td>
                           <td>
                              <a href="javaScript:;">编辑</a>
                              <a href="javaScript:;">删除</a>
                              <a href="javaScript:;">分配角色</a></td>
                       </tr>
                   </tbody>
               </table>
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
              indexs:2,
              input4:'',
            }
        },
        mounted(){
           
        },
        methods: {

              
        },

    }
</script>

<style lang="less">
  
      .jurisdiction{
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
            .establish{
                margin: 20px 0;
                float: right;

            }
            .table{
                width: 100%;
                table{
                    border-collapse: collapse;
                    width: 100%;
                    th{
                        border:1px solid #333;
                        height: 40px;
                        line-height: 40px;
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
            .search{
                margin:20px 0;
                
                .search_l{
                    float: left;
                    width: 300px; 
                }
                .search_r{
                    float: right;
                }
            }
            .table{
                width: 100%;
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
          .show{
            display: block;
          }


      }

  
</style>