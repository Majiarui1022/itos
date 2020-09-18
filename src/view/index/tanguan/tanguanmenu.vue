<template>
    <div class="tan-menu-box">
      <div class="TanCanLeft">
        <div class="TanLeftTop">
          <!--        选择-->
          <div class="SelectBut">
            <div :class="SelectPro === 0 ?'active':''" @click="ChangeSelect(0)">选择测试教本</div>
            <div :class="SelectPro === 1 ?'active':''" @click="ChangeSelect(1)">选择运行时序</div>
          </div>
          <!--        下拉框-->
          <div class="SelectPart">
            <el-select v-model="ExportSelectName" placeholder="请选择" popper-class="PartSelectList">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="ListPart">
            <div class="ListBox" v-if="SelectPro === 0">
              <ul>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
                <li>
                  <div>Part1</div>
                  <div>BCM0005</div>
                </li>
              </ul>
            </div>
            <div class="ComposeTime" v-else>
              <div class="ComposeTit">
                <div class="ComposeTitLeft">Compose</div>
                <div class="ComposeTitRight">Cycle</div>
              </div>
              <div class="ComposeContent">
                <ul>
                  <li>
                    <div>Part1-Part5</div>
                    <div>3</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="TimeNumBox">
            <div>
              <p>10000</p>
              <p>设定时间(min)</p>
            </div>
            <div>
              <p>4200</p>
              <p>运行时间(min)</p>
            </div>
            <div>
              <p>10:29:57 <span>2019/1/23</span></p>
              <p>开始时间</p>
            </div>
            <div>
              <p>10:29:57 <span>2019/1/25</span></p>
              <p>结束时间</p>
            </div>
          </div>


          <!--        进度条-->
          <div class="ProgressBar">
            <div class="NumShow">25.46%</div>
            <div class="ProgressBotom">
              <div class="ProgressBox">
                <div class="NeiProgress"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="TanLeftBottom">
          <div class="StartBox">
            <div class="But" @click="StartTask">
              <img src="../../../assets/img/start.png" alt="">
              <span>开始</span>
            </div>
            <div class="But">
              <img src="../../../assets/img/end.png" alt="">
              <span>结束</span>
            </div>
          </div>
        </div>
      </div>
      <div class="TanCanRight">
        <div class="Scroll">
          <div class="ContentBox">
            <div class="NumberBox">
              <div class="KuerBox">
                <div class="KuerTit">
                  <span>车速</span>
                  <div class="ExportBox" @click="Showeldialog(true)">
                    <div class="SettingImg"></div>导出
                  </div>
                </div>
                <div class="DrawingBox">
                  <img src="../../../assets/img/ReadNeedle.png" alt="">
                </div>
              </div>
              <div class="KuerBox">
                <div class="KuerTit">
                  <span>发动机转速</span>
                  <div class="ExportBox" @click="Showeldialog(true)">
                    <div class="SettingImg"></div>导出
                  </div>
                </div>
                <div class="DrawingBox">
                  <img src="../../../assets/img/yellowNeed.png" alt="">
                </div>
              </div>
              <div class="KuerBox">
                <div class="KuerTit">
                  <span>油量</span>
                  <div class="ExportBox" @click="Showeldialog(true)">
                    <div class="SettingImg"></div>导出
                  </div>
                </div>
                <div class="DrawingBox">
                  <img src="../../../assets/img/blueNeed.png" alt="">
                </div>
              </div>
              <div class="KuerBox">
                <div class="KuerTit" @click="Showeldialog(true)">
                  <span>催化温度</span>
                  <div class="ExportBox">
                    <div class="SettingImg"></div>导出
                  </div>
                </div>
                <div class="DrawingBox">
                  <p>550</p>
                </div>
              </div>
              <div class="KuerBox">
                <div class="KuerTit">
                  <span>节气门开度</span>
                  <div class="ExportBox">
                    <div class="SettingImg" @click="Showeldialog(true)"></div>导出
                  </div>
                </div>
                <div class="DrawingBox">
                  <p>550</p>
                </div>
              </div>
            </div>
            <div class="LineCharts">
              <div class="ChartsTit">
                <div class="ChartsName">
                  数据折现表 <span>Total flow:134.01</span>
                </div>
                <div class="ChartsBut">
                  <div class="SettingBut" @click="ShowSettig = true"><div class="SettingImg"></div>设置</div>
                  <div class="Export" @click="Showeldialog(true)"><div class="SettingImg"></div>导出</div>
                </div>
              </div>
              <div id="main"></div>
            </div>
            <div class="TabBox">
              <div class="TabelList">
                <el-table
                  :data="ListAA"
                  border
                  height="2.5rem"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    min-width="40%"
                    label="名称">
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    min-width="20%"
                    label="数值">
                  </el-table-column>

                  <el-table-column
                    prop="unit"
                    min-width="20%"
                    label="单位">
                  </el-table-column>

                  <el-table-column
                    min-width="20%"
                    label="状态">
                    <template slot-scope="scope">
                      <span class="circle" :class="scope.row.status === 1 ? 'green': scope.row.status === 0 ? 'none':scope.row.status === 2 ? 'red':''"></span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="TabelList">
                <el-table
                  :data="ListAA"
                  border
                  height="2.5rem"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    min-width="40%"
                    label="名称">
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    min-width="20%"
                    label="数值">
                  </el-table-column>

                  <el-table-column
                    prop="unit"
                    min-width="20%"
                    label="单位">
                  </el-table-column>

                  <el-table-column
                    min-width="20%"
                    label="状态">
                    <template slot-scope="scope">
                      <span class="circle" :class="scope.row.status === 1 ? 'green': scope.row.status === 0 ? 'none':scope.row.status === 2 ? 'red':''"></span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <eldialog-control ref="asdasd"></eldialog-control>
        <Settingdialog> </Settingdialog>
      </div>
      <div :class="[ 'el-transferBox' , ShowSettig ? 'active' : '']">
        <div class="eldilog" @click.stop="aaaaaaa"></div>
        <div class="eldilogIndex">
          <div class="el-transferTit">设置</div>
          <el-transfer
            v-model="value"
            :data="data"
            :titles="titles"
          ></el-transfer>
          <div class="ButBox">
            <span class="But"  @click="ShowSettig = false">取消</span>
            <span class="But" @click="SendTabList">确定</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import EldialogControl from "@/view/index/tanguan/eldialogControl";
  import Settingdialog from "@/view/index/tanguan/Settingdialog";
    export default {
        name: "tanguanmenu",
      components: {Settingdialog, EldialogControl},
      data(){
          return{
            options: [
              {
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }
            ],
            ListAA:[
              {
                name:'燃油压力计量',
                num:'63',
                unit:'Kpa',
                status:1
              },
              {
                name:'燃油压力计量',
                num:'62',
                unit:'Kpa',
                status:2
              },
              {
                name:'燃油压力计量',
                num:'61',
                unit:'Kpa',
                status:2
              },
              {
                name:'燃油压力计量',
                num:'65',
                unit:'Kpa',
                status:0
              },
              {
                name:'燃油压力计量',
                num:'65',
                unit:'Kpa',
                status:0
              },
              {
                name:'燃油压力计量',
                num:'65',
                unit:'Kpa',
                status:0
              },
            ],
            SelectPro:0,
            ExportSelectName:'',
            Showel:true,
            value:[1,2],
            data:[
              {
                key:1,
                label:'去去去去',
              },
              {
                key:2,
                label:'呜呜呜呜',
              },
              {
                key:3,
                label:'额鹅鹅鹅',
              },
              {
                key:4,
                label:'柔柔弱弱',
              },
              {
                key:5,
                label:'吞吞吐吐',
              },
              {
                key:6,
                label:'一样一样',
              },
              {
                key:7,
                label:'噢噢噢噢',
              },
            ],
            titles:['数据名称','展示数据'],
            ShowSettig:false,
            list: [
              {
                x: 1,
                y: 1,
                z: 99,
                k: 11,
                f: 10,
                g: 8,
              },
              {
                x: 2,
                y: 2,
                z: 70,
                k: 11,
                f: 8,
                g: 3,
              },
              {
                x: 3,
                y: 3,
                z: 1,
                k: 11,
                f: 20,
                g: 12,
              },
              {
                x: 4,
                y: 4,
                z: 30,
                k: 11,
                f: 15,
                g: 5,
              },
              {
                x: 5,
                y: 1,
                z: 20,
                k: 11,
                f: 14,
                g: 15,
              },
              {
                x: 6,
                y: 0,
                z: 18,
                k: 11,
                f: 5,
                g: 12,
              },
              {
                x: 7,
                y: 10,
                z: 12,
                k: 11,
                f: 8,
                g: 6,
              }
            ],
            dataX: [],
            dataY: [],
            dataY2: []
          }
      },

      methods:{
        ChangeSelect(val){
          this.SelectPro = val
        },

        Showeldialog(val){
          this.Showel = val
          this.$refs.asdasd.abab(this.Showel)
        },
        aaaaaaa(){
          this.ShowSettig = false
        },
        StartTask(){

        },
        SendTabList(){
          if(this.value.length > 5)return
          console.log(this.value)
          this.ShowSettig = false
        },

        //echarts
        init(dataX, dataY) {
          let myChart = echarts.init(document.getElementById("main"));
          let option = {
            legend: {
              icon: "stack",
              data: ["脱附流量", "inlet_flow[I/min]", "flow_integral","015-02 Sensor Bank 1 Sensor 2 [%][%]","034-Lambda Value Bank 1, Sonde 1 [ ]"],
              textStyle:{
                color:"#D7FAFA",
                fontSize:14,
              },
              top:26,
              itemGap:30
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                animation: true
              }
            },
            // 工具栏
            // toolbox: {
            //   x: 1100,
            //   y: 0,
            //   feature: {
            //     saveAsImage: {
            //       name: `test`
            //     }
            //   }
            // },
            grid: {
              left: "20%", //组件距离容器左边的距离
              right: "5%",
              top: "15%"
            },
            xAxis: {
              type: "category",
              axisLine:{
                lineStyle:{
                  color:"#0D6C81"
                }
              },   //y轴轴线与单位颜色
              axisLabel:{
                shsow:true,
                color:"#00EBE8"
              },        //Y轴字体颜色
              splitLine: {
                // X 轴分隔线样式
                // show: true,
                // lineStyle: {
                //   color: ["#f3f0f0"],
                //   width: 2,
                //   type: "solid"
                // }
              },
              data: dataX
            },
            yAxis: [
              {
                name: "",
                type: "value",
                // max: 100,
                // min: 0,
                axisTick:{
                  lineStyle:{
                    color:"#02F6FF"
                  }
                },   //Y轴小标签颜色
                axisLine:{
                  lineStyle:{
                    color:"#0D6C81"
                  }
                },   //y轴轴线与单位颜色
                axisLabel:{
                  shsow:true,
                  color:"#259CDA"
                },        //Y轴字体颜色
                position: "left",
                splitNumber: 10, // Y 轴分隔格数
                splitLine: {
                  // Y 轴分隔线样式
                  show: false,
                  lineStyle: {
                    color: "blue",
                    width: 2,
                    type: "solid"
                  }
                },
              },
              {
                name: "",
                type: "value",
                position: "left",
                offset: 50,
                axisTick:{
                  lineStyle:{
                    color:"#02F6FF"
                  }
                },   //Y轴小标签颜色
                axisLine:{
                  lineStyle:{
                    color:"#0D6C81"
                  }
                },   //y轴轴线与单位颜色
                axisLabel:{
                  shsow:true,
                  color:"#FF3267"
                },        //Y轴字体颜色
                splitNumber: 10, // Y 轴分隔格数
                splitLine: {
                  // Y 轴分隔线样式
                  show: false,
                  lineStyle: {
                    color: ["#f3f0f0"],
                    width: 2,
                    type: "solid"
                  }
                }
              },
              {
                name: "",
                type: "value",
                offset: 100,
                axisTick:{
                  lineStyle:{
                    color:"#02F6FF"
                  }
                },   //Y轴小标签颜色
                axisLine:{
                  lineStyle:{
                    color:"#0D6C81"
                  }
                },   //y轴轴线与单位颜色
                axisLabel:{
                  shsow:true,
                  color:"#7F15AA"
                },        //Y轴字体颜色
                nameGap: 30, // 上下距离的位置
                position: "left",
                splitNumber: 10, // Y 轴分隔格数
                splitLine: {
                  // Y 轴分隔线样式
                  show: false,
                  lineStyle: {
                    color: ["#f3f0f0"],
                    width: 2,
                    type: "solid"
                  }
                }
              },
              {
                name: "",
                type: "value",
                offset: 150,
                axisTick:{
                  lineStyle:{
                    color:"#02F6FF"
                  }
                },   //Y轴小标签颜色
                axisLine:{
                  lineStyle:{
                    color:"#0D6C81"
                  }
                },   //y轴轴线与单位颜色
                axisLabel:{
                  shsow:true,
                  color:"#7BC010"
                },        //Y轴字体颜色
                nameGap: 30, // 上下距离的位置
                position: "left",
                splitNumber: 10, // Y 轴分隔格数
                splitLine: {
                  // Y 轴分隔线样式
                  show: false,
                  lineStyle: {
                    color: ["#f3f0f0"],
                    width: 2,
                    type: "solid"
                  }
                }
              },
              {
                name: "",
                type: "value",
                offset: 200,
                axisTick:{
                  lineStyle:{
                    color:"#02F6FF"
                  }
                },   //Y轴小标签颜色
                axisLine:{
                  lineStyle:{
                    color:"#0D6C81"
                  }
                },   //y轴轴线与单位颜色
                axisLabel:{
                  shsow:true,
                  color:"#03C8CA"
                },        //Y轴字体颜色
                nameGap: 10, // 上下距离的位置
                position: "left",
                splitNumber: 10, // Y 轴分隔格数
                splitLine: {
                  // Y 轴分隔线样式
                  show: false,
                  lineStyle: {
                    color: ["#f3f0f0"],
                    width: 2,
                    type: "solid"
                  }
                }
              }
            ],
            series: dataY
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);


          $(window).resize(function(){
            setTimeout(()=>{
              console.log(this.myChart)
              myChart.resize();
              myChart.resize();
            },500)
          })
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.dataX = this.list.map(item => item.x);
          // 第1个Y轴
          this.dataY.push({
            name: "脱附流量",
            type: "line", // 直线
            color:'#02F0F4', //改变折线点的颜色
            yAxisIndex: 0, // 第几个Y轴 索引值
            data: this.list.map(item => item.y)
          });
          // 第2个Y轴
          this.dataY.push({
            name: "inlet_flow[I/min]",
            type: "line",
            color:"#82CA0C",
            yAxisIndex: 1, // 第几个Y轴 索引值
            data: this.list.map(item => item.z)
          });
          // 第3个Y轴
          this.dataY.push({
            name: "flow_integral",
            type: "line",
            color:"#A40CCA",
            yAxisIndex: 2, // 第几个Y轴 索引值
            data: this.list.map(item => item.k)
          });
          // 第4个Y轴
          this.dataY.push({
            name: "015-02 Sensor Bank 1 Sensor 2 [%][%]",
            type: "line",
            color:"#FF3267",
            yAxisIndex: 3, // 第几个Y轴 索引值
            data: this.list.map(item => item.f)
          });
          // 第5个Y轴
          this.dataY.push({
            name: "034-Lambda Value Bank 1, Sonde 1 [ ]",
            type: "line",
            color:"#26A3E4",
            yAxisIndex: 4, // 第几个Y轴 索引值
            data: this.list.map(item => item.g)
          });
          this.init(this.dataX, this.dataY);
        });
      }
    }
</script>

<style lang="scss">
  .tan-menu-box{
    width: 100%;
    height: 100%;
    .TanCanLeft,.TanCanRight{
      float: left;
      height: 100%;
    }
    .TanCanLeft{
      width: 5.7rem;
      .TanLeftTop{
        width: 100%;
        height: 8.16rem;
        background: #091E2F;
        padding: 0 .3rem;
        box-sizing: border-box;
        .SelectBut{
          overflow: hidden;
          div{
            width:1.66rem;
            height:.5rem;
            float: left;
            margin:.2rem .16rem .2rem 0;
            background: url("../../../assets/img/bjTime.png") no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: .5rem;
            font-size:.2rem;
            font-weight:bold;
            cursor: pointer;
            color: #0493AB;
            &.active{
              color:rgba(2,246,255,1);
            }
          }
        }
        .SelectPart{
          width: 100%;
          height: .46rem;
          .el-select{
            display: block;
            input{
              background: #091E2F;
              color: #02F6FF;
              border-color:#02F6FF;
              font-size: .24rem;
              height: .46rem;
              //修改placeholder的默认颜色：
              &::-webkit-input-placeholder{
                color:#02F6FF;
              }
              &::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color:#02F6FF;
              }
              &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color:#02F6FF;
              }
              &:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color:#02F6FF;
              }
            }
            .el-input .el-select__caret{
              color: #02F6FF;
              font-size: .24rem;
              line-height: .46rem;
            }
          }
        }
        .ListPart{
          width:5.1rem;
          height:2.82rem;
          background:rgba(31,83,125,1);
          border:1px solid rgba(2,246,255,1);
          border-top: 0;
          margin-bottom: .5rem;
          .ListBox{
            width: 100%;
            height: 100%;
            ul{
              width: 100%;
              height: 100%;
              overflow-x: hidden;
              overflow-y: auto;
              li{
                line-height: .42rem;
                font-size:.2rem;
                color:rgba(2,246,255,1);
                overflow: hidden;
                div{
                  float: left;
                  padding-left: .14rem;
                  box-sizing: border-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &:first-child{
                    width: 20%;
                  }
                  &:last-child{
                    width: 80%;
                  }
                }
              }

              &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 4px;
              }
              &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #06A9AF;
              }
              &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                border-radius: 0;
                background: transparent;
              }
            }
          }
          .ComposeTime{
            width: 100%;
            height: 100%;
            .ComposeTit{
              width: 100%;
              height: .4rem;
              overflow: hidden;
              .ComposeTitLeft,.ComposeTitRight{
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                font-size:.2rem;
                color:rgba(2,246,255,1);
                background:rgba(17,55,86,1);
                line-height:.4rem;
              }
              .ComposeTitLeft{
                background:rgba(11,42,68,1);
              }
            }
            .ComposeContent{
              width: 100%;
              height: calc(100% - .4rem);
              ul{
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
                li{
                  width: 100%;
                  overflow: hidden;
                  height: .4rem;
                  div{
                    float: left;
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    font-size:.18rem;
                    font-family:Source Han Sans CN;
                    color:rgba(2,246,255,1);
                    line-height:.4rem;
                  }
                }
                &::-webkit-scrollbar {/*滚动条整体样式*/
                  width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
                  height: 4px;
                }
                &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                  border-radius: 5px;
                  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                  background: #06A9AF;
                }
                &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                  border-radius: 0;
                  background: transparent;
                }
              }
            }
          }
        }
        .TimeNumBox{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: .16rem;
          div{
            width:2.5rem;
            height:.82rem;
            background:rgba(5,25,40,1);
            box-shadow:0px 2px 10px 0px rgba(0, 64, 45, 0.35);
            border-radius:3px;
            margin-bottom: .16rem;
            padding-left: .16rem;
            box-sizing: border-box;
            p{
              &:first-child{
                font-size:.25rem;
                color:rgba(131,182,223,1);
                line-height: .5rem;
                span{
                  font-size: .12rem;
                }
              }
              &:last-child{
                font-size:.16rem;
                color:rgba(173,204,217,1);
              }
            }
          }
        }
        .ProgressBar{
          width:100%;
          height:1.1rem;
          background:rgba(5,25,40,1);
          box-shadow:1px 1px 6px 0px rgba(0, 0, 0, 0.5);
          background: url("../../../assets/img/di.png") no-repeat;
          background-size: 100% 100%;
          .NumShow{
            width: 100%;
            height: .4rem;
            padding-right: .5rem;
            line-height: .4rem;
            font-size:.14rem;
            color:rgba(2,246,255,1);
            text-align: right;
            box-sizing: border-box;
          }
          .ProgressBotom{
            width: 100%;
            height: calc(100% - .4rem);
            display: flex;
            justify-content: center;
            align-items: center;
            .ProgressBox{
              width:4.81rem;
              height: .44rem;
              background:rgba(21,59,90,1);
              box-shadow:-1px -1px 6px 0px rgba(0, 0, 0, 0.5);
              border-radius:5px;
              .NeiProgress{
                width: 25.46%;
                background: url("../../../assets/img/press.png") no-repeat;
                background-size: 100% 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .TanLeftBottom{
        width: 100%;
        height: calc(100% - 8.16rem);
        background: #091E2F;
        .StartBox{
          width:100%;
          height:1.83rem;
          background:rgba(5,25,40,1);
          box-shadow:0px 7px 16px 0px rgba(1, 44, 31, 0.35);
          border-radius:3px;
          text-align: center;
          .But{
            font-size:.24rem;
            color:rgba(131,182,223,1);
            display: inline-block;
            margin:.46rem .6rem 0;
            cursor: pointer;
            img{
              display: block;
              margin-bottom: .08rem;
            }
          }
        }
      }
    }
    .TanCanRight{
      width: calc(100% - 5.7rem);
      background: #0B2A44;
      padding: .1rem .05rem 0 .05rem;
      box-sizing: border-box;
      .Scroll{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .ContentBox{
          width: 100%;
          padding: .1rem .15rem 0;
          box-sizing: border-box;
          height: 100%;
          .NumberBox{
            width: 100%;
            height: 2.54rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .KuerBox{
              width: 2.54rem;
              height: 2.54rem;
              background:rgba(11,42,68,1);
              box-shadow:-3px -3px 5px 1px rgba(3,22,38,0.8), 3px 3px 5px 1px rgba(3,22,38,0.8);
              border-radius:2px;
              .KuerTit{
                width: 100%;
                height: .36rem;
                padding-left: .1rem;
                padding-right: .13rem;
                position: relative;
                box-sizing: border-box;
                span{
                  font-size:.14rem;
                  color:rgba(1,255,246,1);
                  line-height: .36rem;
                  display: block;
                }
                .ExportBox{
                  width:.58rem;
                  height:.24rem;
                  background:rgba(45,90,128,1);
                  border-radius:12px;
                  position: absolute;
                  top: .12rem;
                  right: .13rem;
                  font-size: .12rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 .06rem;
                  box-sizing: border-box;
                  color: #C6F4FF;
                  cursor: pointer;
                  .SettingImg{
                    width: .14rem;
                    height: .15rem;
                    background: url("../../../assets/img/TexporT.png") no-repeat;
                    background-size: .14rem .15rem;
                  }
                  &:hover{
                    background-color:#fff;
                    color: #000;
                    .SettingImg{
                      background: url("../../../assets/img/ExportEd.png") no-repeat;
                      background-size: .14rem .15rem;
                    }
                  }
                }
              }
              .DrawingBox{
                width: 100%;
                height: calc(100% - .36rem);
                position: relative;
                img{
                  width: .16rem;
                  height: 1rem;
                  position: absolute;
                  left: 1.18rem;
                  top: .18rem;
                  transition:transform .2s ;
                  transform: rotateZ(90deg);
                  transform-origin: .08rem  .92rem;
                }
              }
              &:nth-child(1){
                .DrawingBox{
                  background: url("../../../assets/img/speedofmotor.png") center center no-repeat;
                  background-size: 2.07rem 2.06rem;
                }
              }
              &:nth-child(2){
                .DrawingBox {
                  background: url("../../../assets/img/engineS.png") center center no-repeat;
                  background-size: 2.07rem 2.06rem;
                }
              }
              &:nth-child(3){
                .DrawingBox {
                  background: url("../../../assets/img/oilmass.png") center center no-repeat;
                  background-size: 2.07rem 2.06rem;
                }
              }
              &:nth-child(4){
                .DrawingBox {
                  background: url("../../../assets/img/purple.png") center center no-repeat;
                  background-size: 2.07rem 1.86rem;
                  p{
                    font-size:.24rem;
                    color:rgba(255,255,255,1);
                    text-align: center;
                    line-height: 2.4rem;
                  }
                }
              }
              &:nth-child(5){
                .DrawingBox {
                  background: url("../../../assets/img/skyblue.png") center center no-repeat;
                  background-size: 2.07rem 1.86rem;
                  p{
                    font-size:.24rem;
                    color:rgba(255,255,255,1);
                    text-align: center;
                    line-height: 2.4rem;
                  }
                }
              }
            }
          }
          .LineCharts{
            width:100%;
            height:8.4rem;
            background:rgba(18,49,75,1);
            box-shadow:3px 3px 5px 1px rgba(3,22,38,0.8);
            border-radius:5px;
            margin-top: .22rem;
            .ChartsTit{
              width:100%;
              height:.5rem;
              background:rgba(9,30,47,1);
              border-radius:5px;
              padding:  0 .2rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-sizing: border-box;
              .ChartsName{
                font-size:.18rem;
                color:rgba(0,235,232,1);
                line-height: .5rem;
                span{
                  font-size:.16rem;
                  color:rgba(0,235,232,1);
                  margin-left: .3rem;
                }
              }
              .ChartsBut{
                display: flex;
                font-size:.12rem;
                color:rgba(198,244,255,1);
                text-align: right;
                line-height: .24rem;
                .SettingBut{
                  width:.58rem;
                  height:.24rem;
                  background-color:rgba(45,90,128,1);
                  border-radius:.12rem;
                  padding: 0 .06rem;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  cursor: pointer;
                  .SettingImg{
                    width: .14rem;
                    height: .15rem;
                    background: url("../../../assets/img/Tsettinged.png") no-repeat;
                    background-size: .14rem .15rem;
                  }
                  &:hover{
                    background-color:#fff;
                    color: #000;
                    .SettingImg{
                      background: url("../../../assets/img/Tsetting.png") no-repeat;
                      background-size: .14rem .15rem;
                    }
                  }
                }
                .Export{
                  width:.58rem;
                  height:.24rem;
                  background:rgba(45,90,128,1);
                  border-radius:.12rem;
                  margin-left: .08rem;
                  padding: 0 .06rem;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  cursor: pointer;
                  .SettingImg{
                    width: .14rem;
                    height: .15rem;
                    background: url("../../../assets/img/TexporT.png") no-repeat;
                    background-size: .14rem .15rem;
                  }
                  &:hover{
                    background-color:#fff;
                    color: #000;
                    .SettingImg{
                      background: url("../../../assets/img/ExportEd.png") no-repeat;
                      background-size: .14rem .15rem;
                    }
                  }
                }
              }
            }
            #main{
              width: 100%;
              height: calc(8.4rem - .5rem);
            }
          }
          .TabBox{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: .2rem;
            margin-bottom: 1.67rem;
            .TabelList{
              width:6.5rem;
              height:2.83rem;
              border:1px solid rgba(5,25,40,1);
              box-shadow:0px 8px 7px 1px rgba(0, 0, 0, 0.35);
              border-radius:2px;
              .el-table td>.cell{
                .circle{
                  width:.16rem;
                  height:.16rem;
                  border-radius:50%;
                  margin: 0 auto;
                  display: block;
                  &.red{
                    background:rgba(255,3,9,1);
                  }
                  &.green{
                    background:rgba(3,255,33,1);
                  }
                  &.none{
                    display: none;
                  }
                }
              }
              .el-table{
                width: 100%;
              }
              .el-table th, .el-table tr{
                background: #051928;
                border-top: 1px solid #0B365A;
                text-align: center;
              }
              .el-table tr td{
                color:#1C83D0;
                text-align: center;
              }
              .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
                border-color:#0B365A;
              }
              .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
                border-color:#0B365A;
              }
              .el-table--border td, .el-table--border th{
                color:#00FCFF;
              }
              .el-table--enable-row-hover .el-table__body tr:hover>td{
                background: #051928;
              }
              .el-table__body-wrapper{
                background: #051928;
              }
              .el-table--border::after, .el-table--group::after{
                width: 0;
              }
              .el-table--border, .el-table--group{
                border-color: #0B365A;
              }


              .el-table--scrollable-y .el-table__body-wrapper {
                &::-webkit-scrollbar { /*滚动条整体样式*/
                  width: .12rem; /*高宽分别对应横竖滚动条的尺寸*/
                  height: 4px;
                }

                &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
                  border-radius: 5px;
                  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  background: #393B6A;
                }

                &::-webkit-scrollbar-track { /*滚动条里面轨道*/
                  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
                  border-radius: 0;
                  background: #8082B8;
                }
              }



            }
          }
        }
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
          display: none;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #06A9AF;
          display: none;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: transparent;
          display: none;
        }
      }
    }
  }
  .el-transferBox{
    width:9rem;
    height:6.24rem;
    background:rgba(4,24,39,1);
    box-shadow:0px 0px 18px 2px rgba(5,21,34,0.3);
    border-radius:.08rem;
    position: fixed;
    left: 50%;
    top: 42%;
    margin-left: -4.5rem;
    margin-top: -3.12rem;
    padding: .15rem .1rem .4rem .65rem;
    box-sizing: border-box;
    z-index: -1;
    opacity: 0;
    transition: top .4s , opacity .4s , z-index .4s;
    .eldilog{
      width: 19.21rem;
      height: 10.81rem;
      position: fixed;
      left: 0;
      top: 0;
      background: #000;
      opacity: .4;
      z-index: 2;
    }
    .eldilogIndex{
      width: 100%;
      height: 100%;
      position: absolute;
      left: .65rem;
      top: .15rem;
      z-index: 4;
      .el-transferTit{
        height: .56rem;
        width: 100%;
        font-size:.3rem;
        color:rgba(2,246,255,1);
        text-align: center;
        line-height: .56rem;
      }
      .el-transfer{
        width: 100%;
        height: 4rem;
        .el-transfer-panel{
          width:3.6rem;
          height:4rem;
          background:rgba(18,49,75,1);
          border:1px solid rgba(10,210,218,1);
          border-radius:.08rem;
          .el-transfer-panel__header{
            background: transparent;
            height: .4rem;
            border-color:rgba(10,210,218,1);
            .el-checkbox__input{
              display: none;
            }
            .el-checkbox{
              line-height: .4rem;
            }
            .el-checkbox__label{
              color: rgba(10,210,218,1);
              font-size:.2rem;
              font-family:Source Han Sans CN;
            }
            span{
              color: rgba(10,210,218,1);
              font-size:.2rem;
              line-height: .4rem;
            }
          }
          .el-transfer-panel__body{
            height: 3.6rem;
            .el-transfer-panel__list{
              height: 3.6rem;
              label{
                display: flex;
                align-items: center;
                height: .3rem;
                .el-checkbox__inner{
                  width: .2rem;
                  height: .2rem;
                  background: transparent;
                }
                .el-checkbox__label{
                  font-size:.16rem;
                  font-family:Source Han Sans CN;
                  color:rgba(10,210,218,1);
                  padding-left: .44rem;
                  line-height: .3rem;
                  height: .3rem;
                }
              }
              .is-checked{
                .el-checkbox__inner{
                  border: 0;
                  &::after{
                    width: 100%;
                    height: 100%;
                    transform: rotateY(0deg);
                    display: block;
                    left: 0;
                    background: url("../../../assets/img/kuerG.png") no-repeat;
                    background-size: 100% 100%;
                    border: 0;
                  }
                }
              }
            }
          }
        }
      }
      .el-transfer__buttons{
        .el-transfer__button{
          background:rgba(10,210,218,1);
          &:hover{
            background: #3BEDF4;
          }
        }
        .is-disabled{
          border: 1px solid #DCDFE6;
          background-color: #F5F7FA;
          color: #C0C4CC;
          &:hover{
            background-color: #F5F7FA;
          }
        }
      }
      .ButBox{
        width: 100%;
        height: .4rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: .32rem;
        .But{
          width:1.2rem;
          height:.4rem;
          background:rgba(10,210,218,1);
          border-radius:.08rem;
          margin: 0 .4rem;
          font-size:.2rem;
          color:rgba(255,255,255,1);
          line-height: .4rem;
          cursor: pointer;
          &:hover{
            background: #3BEDF4;
          }
          &:first-child{
            margin-left: .1rem;
          }
        }
      }
    }
    &.active{
      top: 50%;
      opacity: 1;
      z-index: 3;
    }
  }
  .PartSelectList{

  }
</style>
