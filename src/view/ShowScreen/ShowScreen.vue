<template>
  <div class="ShowBigScreen">
    <div class="BigScreenBox">
      <div class="TitTop"></div>
      <div class="Content">
        <div class="ConLeft">
          <div class="taskProgress">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(asd,index) in  aa">
                  <div class="TaskBox">
                    <div v-for="(item,val) in proList" v-if="val < (index + 1) * 6 && val >= index * 6">
                      <div class="Name">
                        <span>{{item.project}} ({{item.controller}})</span>
                        <span>{{item.progress}}%</span>
                      </div>
                      <div class="Tiao">
                        <div :style="{width:item.progress + '%'}"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
            </div>
          </div>
          <div class="Controller">
            <div class="ControllerNews">
              <div class="ConTit">
                <div class="Data">日期</div>
                <div class="incident">事件</div>
                <div class="person">操作人</div>
              </div>

              <div class="swiper-containerTwo">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(asd,index) in  bb">
                    <div class="Box">
                      <div class="ConCont"  v-for="(item,val) in ControllersList" v-if="val < (index + 1) * 7 && val >= index * 7">
                        <div class="Data"><span>{{item.create_time[0]}}</span><span>{{item.create_time[1]}}</span></div>
                        <div class="incident">{{item.event}}</div>
                        <div class="person">{{item.user}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="ConMiddle">
          <div class="MiddleTit">
            <div class="cal">
              <p>{{eightCan.year}}年项目数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.project_count">{{eightCan.project_count}}</yd-countup>
            </div>
            <div class="cal">
              <p>{{eightCan.year}}年项目完成数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.complete_project_count">{{eightCan.complete_project_count}}</yd-countup>
            </div>
            <div class="cal">
              <p>30天内项目新增数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.project_count">{{eightCan.project_count}}</yd-countup>
            </div>
            <div class="cal">
              <p>30天内任务新增数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.task_count">{{eightCan.task_count}}</yd-countup>
            </div>
            <div class="cal">
              <p>控制器数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.controller_count">{{eightCan.controller_count}}</yd-countup>
            </div>

            <div class="cal">
              <p>控制器空闲数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.controller_free_count">{{eightCan.controller_free_count}}</yd-countup>
            </div>

            <div class="cal">
              <p>模块数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.module_count">{{eightCan.module_count}}</yd-countup>
            </div>

            <div class="cal">
              <p>模块空闲数量</p>
              <yd-countup   class="Num" :duration="1" :endnum="eightCan.module_free_count">{{eightCan.module_free_count}}</yd-countup>
            </div>
          </div>
          <div class="ModuleShi">
            <div class="ListBox">
              <div class="ListHeader">
                <div class="cal">模块名称</div>
                <div class="cal">模块数量</div>
                <div class="cal">当日</div>
                <div class="cal">近7天内</div>
                <div class="cal">近30天内</div>
                <div class="cal">近60天内</div>
                <div class="cal">近100天</div>
                <div class="cal">近1年内</div>
              </div>
              <div class="ListFather seamless-warp">
                <ul class="List" id="SliderBox"  :style = {transform:transform} :class="{rollScreen_list_unanim:num===0}">
                  <li class="Row" v-for="item in SliderBoxList">
                  <div class="cal">{{item.name}}</div>
                  <div class="cal">{{item.count}}</div>
                  <div class="cal">{{item.rate}}</div>
                  <div class="cal">{{item.rate_7}}</div>
                  <div class="cal">{{item.rate_30}}</div>
                  <div class="cal">{{item.rate_90}}</div>
                  <div class="cal">{{item.rate_180}}</div>
                  <div class="cal">{{item.rate_365}}</div>
                </li>
                  <li class="Row" v-for="item in SliderBoxList">
                  <div class="cal">{{item.name}}</div>
                  <div class="cal">{{item.count}}</div>
                  <div class="cal">{{item.rate}}</div>
                  <div class="cal">{{item.rate_7}}</div>
                  <div class="cal">{{item.rate_30}}</div>
                  <div class="cal">{{item.rate_90}}</div>
                  <div class="cal">{{item.rate_180}}</div>
                  <div class="cal">{{item.rate_365}}</div>
                </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="ModuleEcharts">
            <div class="EchartsBox" id="Echarts">

            </div>
          </div>
        </div>
        <div class="ConRight">
          <div class="CallThePolice">
            <div class="CallThePoliceBox">
              <div class="CallThePoliceTit">
                <div class="cal">日期</div>
                <div class="cal">事件</div>
              </div>
              <div class="CallThePoliceList">
                <div class="swiper-containerCall">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(asd,index) in  cc">
                      <div class="row"  v-for="(item,val) in warningList" v-if="val < (index + 1) * 5 && val >= index * 5">
                          <div class="cal">
                            <span>{{item.create_time[0]}}</span>
                            <span>{{item.create_time[1]}}</span>
                          </div>
                          <div class="cal">{{item.content}}</div>
                        </div>
                    </div>
                  </div>
                  <!-- Add Pagination -->
                  <div class="swiper-pagination"></div>
                </div>
              </div>

            </div>
          </div>
          <div class="humiture">
            <div class="temperatrueBox">
              <div class="swiper-containerTemp">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="temperatrueFlex">
                      <div class="Left">
                        <div class="Radius">
                          <div class="temperatrue">
                            <span>温度</span>
                            <span>32℃</span>
                          </div>
                          <div class="humiturebox">
                            <span>湿度</span>
                            <span>26℃</span>
                          </div>
                        </div>
                        <p>实验室一</p>
                      </div>
                      <div class="Right">
                        <div class="Radius">
                          <div class="temperatrue">
                            <span>温度</span>
                            <span>32℃</span>
                          </div>
                          <div class="humiturebox">
                            <span>湿度</span>
                            <span>26℃</span>
                          </div>
                        </div>
                        <p>实验室二</p>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="temperatrueFlex">
                      <div class="Left">
                        <div class="Radius">
                          <div class="temperatrue">
                            <span>温度</span>
                            <span>32℃</span>
                          </div>
                          <div class="humiturebox">
                            <span>湿度</span>
                            <span>26℃</span>
                          </div>
                        </div>
                        <p>实验室一</p>
                      </div>
                      <div class="Right">
                        <div class="Radius">
                          <div class="temperatrue">
                            <span>温度</span>
                            <span>32℃</span>
                          </div>
                          <div class="humiturebox">
                            <span>湿度</span>
                            <span>26℃</span>
                          </div>
                        </div>
                        <p>实验室二</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
              </div>




            </div>
          </div>
          <div class="monitoring">
            <div class="Monitoringbox">

              <div class="swiper-containerMonitor">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="MoinitoringFlex">
                      <div class="OnerBox"></div>
                      <div class="OnerBox"></div>
                      <div class="OnerBox"></div>
                      <div class="OnerBox"></div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="MoinitoringFlex">
                      <div class="OnerBox"></div>
                      <div class="OnerBox"></div>
                      <div class="OnerBox"></div>
                      <div class="OnerBox"></div>
                    </div>
                  </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Swiper from 'swiper'
    export default {
        name: "ShowScreen",
      data(){
        return{
          proList:[],
          ControllersList:[],
          SliderBoxList:[],
          warningList:[],
          num: 0,
          eightCan:{
            year:0,
            project_count:0,
            complete_project_count:0,
            task_count:0,
            controller_count:0,
            controller_free_count:0,
            module_count:0,
            module_free_count:0
          },
          asbsadasd:210,
          swiperCall:{}
        }
      },
      created(){
        this.GetModuleReat()
        this.GetControllersList()
        this.initWebSocket()
      },
      mounted() {
        this.drawLine();
        var swiperTemp = new Swiper('.swiper-containerTemp', {
          autoplay:true,//等同于以下设置
          loop:true,
          pagination: {
            el: '.swiper-pagination',
          },
        });
        var swiperMonitor = new Swiper('.swiper-containerMonitor', {
          autoplay:true,//等同于以下设置
          loop:true,
          pagination: {
            el: '.swiper-pagination',
          },
        });

      },
      methods:{
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('Echarts'))
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: 'category',
              data: ['08-12', '08-13', '08-14', '08-15', '08-16', '08-17', '08-18'],
              splitLine: {
                show: false
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                  color:'#5E88D4',
                },
              axisLine:{
                lineStyle:{
                  color:'#5E88D4'
                }
              },
              boundaryGap:false

            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: false
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                color:'#5E88D4',
              },
              axisLine:{
                lineStyle:{
                  color:'#5E88D4'
                }
              },
            },
            series: [{
              data: [20, 50, 10, 400, 500, 200, 500],
              type: 'line',
              lineStyle:{
                color:'#0536A9'
              },
              itemStyle:{
                color:'#0536A9',
                normal: {
                  label : {
                    show: true,
                    color:'#00E4FF',
                    position:'right',
                  }
                }
              },
              areaStyle: {
                normal: {
                  color: '#0536A9'
                }
              },
            }]
          });
          $(window).resize(function(){
            setTimeout(()=>{
              myChart.resize();
              myChart.resize();
            },500)
          })
        },
        GetControllersList(){
          //任务进度
          this.$http.get(this.$conf.env.TaskProgress).then(res=>{
            this.proList = res.data
            this.$nextTick(function () {
              var swiper = new Swiper('.swiper-container', {
                autoplay:true,//等同于以下设置
                loop:true,
                pagination: {
                  el: '.swiper-pagination',
                },
              });
            })
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });


          //控制器信息
          this.$http.get(this.$conf.env.BigShowScreen).then(res=>{
            this.ControllersList = res.data
            this.$nextTick(function () {
              var swiperTwo = new Swiper('.swiper-containerTwo', {
                autoplay:true,//等同于以下设置
                loop:true,
                pagination: {
                  el: '.swiper-pagination',
                },
              });
            })
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });






          ///报警信息
          this.$http.get(this.$conf.env.warringMessage).then(res=>{
            this.warningList = res.data
            console.log(res.data)
            this.$nextTick(function () {
              this.swiperCall = new Swiper('.swiper-containerCall', {
                autoplay:true,//等同于以下设置
                loop:true,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                pagination: {
                  el: '.swiper-pagination',
                },
              });
            })
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

          //获取8参数
          this.$http.get(this.$conf.env.TitMiddle).then(res=>{
            this.eightCan = res.data
            console.log(res.data)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },


        //模块使用率
        GetModuleReat(){
          this.$http.get(this.$conf.env.ModuleRate).then(res=>{
            this.SliderBoxList = res.data
            let _this = this
            setInterval(function () {
              if (_this.num !== _this.SliderBoxList.length) {
                _this.num++
              } else {
                _this.num = 0
              }
            }, 3000)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },



        initWebSocket() {
          const wsuri = `ws://10.102.100.120:8003/project/5DHl9Sehw0vkzfST/`;
          this.websock = new WebSocket(wsuri);//这里面的this都指向vue
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        },
        websocketopen() {//打开
        },
        websocketonmessage(e) { //数据接收
          let ObjData = JSON.parse(e.data);
          if(ObjData.text.notification_message){
            this.$nextTick(()=>{
              this.warningList.push(ObjData.text.notification_message)

              this.swiperCall.remove()
              this.swiperCall.update()
            })
            console.log(this.warningList)
          }
        },
        websocketclose() {  //关闭


        },
        websocketerror() {  //失败
        },
      },
      computed:{
        aa(){
          if(this.proList.length / 6 %1 === 0){
            return this.proList.length / 6
          }else{
            return Math.floor(this.proList.length/6) + 1
          }
        },

        bb(){
          if(this.ControllersList.length / 7 %1 === 0){
            return this.ControllersList.length / 7
          }else{
            return Math.floor(this.ControllersList.length/7) + 1
          }
        },
        cc(){
          if(this.warningList.length / 5 %1 === 0){
            return this.warningList.length / 5
          }else{
            return Math.floor(this.warningList.length/5) + 1
          }
        },
        transform: function () {
          return 'translateY(-' + this.num * 0.28 + 'rem)'
        }
      },
      watch:{
        warningList(){
            // var swiperCall = new Swiper('.swiper-containerCall', {
            //     autoplay:false,//等同于以下设置
            //     loop:false,
            //     pagination: {
            //       el: '.swiper-pagination',
            //     },
            //   });
              this.$nextTick(()=>{
                // var swiperCall = new Swiper('.swiper-containerCall', {
                //   autoplay:true,//等同于以下设置
                //   loop:true,
                //   pagination: {
                //     el: '.swiper-pagination',
                //   },
                // });
            })
          }
      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },
    }
</script>

<style lang="scss">

  $width:19.206rem;
  $height:10.806rem;
  .ShowBigScreen{
    width: 100%;
    height: 100%;
    background: #070F29;
    .BigScreenBox{
      width: $width;
      height: $height;
      margin: 0 auto;
      background: url("../../assets/img/scbj.png") no-repeat;
      background-size: 100% 100%;
      .TitTop{
        width: 100%;
        height: 1.1rem;
        background: url("../../assets/img/bjtit.png") no-repeat;
        background-size: 100% 100%;
      }
      .Content{
        width: 100%;
        height: calc(100% - 1.1rem);
        display: flex;
        padding: 0 .34rem;
        box-sizing: border-box;
        justify-content: space-between;
        .ConLeft{
          width: 5.72rem;
          height: 100%;
          .taskProgress{
            width: 100%;
            height: 4.72rem;
            background: url("../../assets/img/taskpart.png") no-repeat;
            background-size: 100% 100%;
            margin-top: -.13rem;
            padding-top: .62rem;
            padding-left: .24rem;
            box-sizing: border-box;
            .swiper-container {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
            .swiper-slide {
              text-align: center;
              /* Center slide text vertically */
              display: -webkit-box;
              display: -ms-flexbox;
              display: -webkit-flex;
              display: flex;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              -webkit-justify-content: center;
              justify-content: center;
              -webkit-box-align: center;
              -ms-flex-align: center;
              -webkit-align-items: center;
              align-items: center;
            }
            .TaskBox{
              width: 5.2rem;
              height: 4.06rem;
            }
            .Name{
              font-size:.14rem;
              font-family:Microsoft YaHei;
              color:rgba(255,255,255,1);
              line-height:.14rem;
              display: flex;
              justify-content: space-between;
              margin-bottom: .08rem;
            }
            .Tiao{
              width: 100%;
              height: .2rem;
              background:rgba(98,104,219,1);
              box-shadow:0px 2px 4px 0px rgba(8,10,66,0.8);
              border-radius:10px;
              margin-bottom: .22rem;
              div{
                width: 80%;
                height: .2rem;
                background:linear-gradient(90deg,rgba(0,15,206,1),rgba(4,253,255,1));
                border-radius:10px;
              }
            }
            .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
              bottom: 0;
            }
            .swiper-pagination-bullet{
              width:.08rem;
              height:.08rem;
              background:rgba(0,146,147,1);
              border-radius:50%;
            }
            .swiper-pagination-bullet-active{
              background: #14FDFF;
              width:.24rem;
              height:.08rem;
              background:rgba(20,253,255,1);
              border-radius:.04rem
            }
          }
          .Controller{
            width: 100%;
            height: 4.84rem;
            background: url("../../assets/img/controllerNews.png") no-repeat;
            background-size: 100% 100%;
            margin-top: .2rem;
            padding-top: .48rem;
            box-sizing: border-box;
            .ControllerNews{
              width: 5.44rem;
              height: 4.2rem;
              margin-left: .16rem;
              /*ConTit   Num  Data  incident  person*/
              .ConTit,.ConCont{
                width: 100%;
                height: .28rem;
                display: flex;
                background:#092647;
                border:1px solid rgba(24,63,96,1);
                box-shadow:0 0 60px 0 rgba(9,38,71,1);
                font-size:.16rem;
                font-family:Microsoft YaHei;
                color:rgba(0,252,249,1);
                margin-bottom: .06rem;
                line-height:.3rem;
                .person,.Num{
                  text-align: center;
                  width: 20%;
                }
                .Data{
                  width: 30%;
                  text-align: center;
                  span{
                    text-align: center;
                    display: block;
                    line-height: .2rem;
                    margin-top: .04rem;
                    font-size: .14rem;
                  }
                }
                .incident{
                  width:60%;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  span{
                    text-align: center;
                    display: block;
                    line-height: .2rem;
                    margin-top: .04rem;
                    font-size: .14rem;
                  }
                }
              }
              .ConCont{
                height: .46rem;
                line-height: .48rem;
                overflow: hidden;
              }
              .swiper-containerTwo {
                width: 100%;
                height: calc(100% - .3rem);
                overflow: hidden;
                position: relative;
              }
              .swiper-slide {
                text-align: center;
                /* Center slide text vertically */
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
                .Box{
                  width: 100%;
                  height: 100%;
                }
              }
              .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
                bottom:-.22rem;
              }
              .swiper-pagination-bullet{
                width:.08rem;
                height:.08rem;
                background:rgba(0,146,147,1);
                border-radius:50%;
              }
              .swiper-pagination-bullet-active{
                background: #14FDFF;
                width:.24rem;
                height:.08rem;
                background:rgba(20,253,255,1);
                border-radius:.04rem
              }
            }
          }
        }
        .ConMiddle{
          width: 7.56rem;
          height: 100%;
          .MiddleTit{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            .cal{
              width:1.8rem;
              height:.84rem;
              background:rgba(20,15,64,1);
              border:1px solid rgba(21, 164, 243, 1);
              border-radius:2px;
              margin-right: .08rem;
              margin-bottom: .18rem;
              &:nth-child(4n){
                margin-right: 0;
              }
              span{
                font-size:.3rem;
                /* font-family:MF ShangHei (Noncommercial);*/
                color:rgba(1,212,249,1);
                line-height:.46rem;
                text-align: center;
                display: block;
              }
              p{
                font-size:.18rem;
                font-family:Microsoft YaHei;
                color:rgba(169,221,238,1);
                line-height:.28rem;
                display: block;
                text-align: center;
              }
            }
          }
          .ModuleShi{
            width:100%;
            height:3.66rem;
            border-radius:8px;
            background: url("../../assets/img/moduleshiy.png");
            background-size: 100% 100% ;
            padding-top: .7rem;
            box-sizing: border-box;
            .ListBox{
              width: 100%;
              height: 2.84rem;
              position: relative;
              .ListHeader{
                width: 100%;
                height: .3rem;
                padding:0 .26rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .cal{
                  width: .78rem;
                  height: .3rem;
                  font-size:.16rem;
                  text-align: center;
                  font-family:Microsoft YaHei;
                  font-weight:bold;
                  color:rgba(177,236,255,1);
                  line-height:.3rem;
                  background: url("../../assets/img/modulebjs.png") no-repeat;
                  background-size: 100% 100%;
                  white-space: nowrap;
                }
              }
              .ListFather{
                width: 100%;
                height: calc(100% - .3rem);
                overflow: hidden;
              }
              .seamless-warp{
                height: calc(100% - .3rem);
                overflow: hidden;
                line-height: .28rem;
              }
              .rollScreen_list_unanim{
                transition: none !important;
              }
              .List{
                width: 100%;
                position: relative;
                transition: 1s linear;
                .Row{
                  width: 100%;
                  height: .28rem;
                  padding:0 .26rem;
                  box-sizing: border-box;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  border-bottom: 1px solid #0E327A;
                  .cal{
                    width: .78rem;
                    height: .28rem;
                    font-size:.16rem;
                    text-align: center;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(177,236,255,1);
                    line-height:.28rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              }
            }
          }
          .ModuleEcharts{
            width: 100%;
            margin-top: .24rem;
            height: 3.62rem;
            background: url("../../assets/img/echartsBJ.png") no-repeat;
            background-size: 100% 100%;
            /*padding-top: .45rem;*/
            /*box-sizing: border-box;*/
            .EchartsBox{
              width: 100%;
              height: 100%;
              .ve-line{
                width: 100%;
                height: 100% !important;
              }
            }
          }
        }
        .ConRight{
          width: 4.8rem;
          height: 100%;
          .CallThePolice{
            width:4.76rem;
            height:3.76rem;
            border-radius:8px;
            background: url("../../assets/img/callPolice.png") no-repeat;
            background-size: 100% 100%;
            padding-top: .44rem;
            box-sizing: border-box;
            margin-top: -.13rem;
            .CallThePoliceBox{
              width: 4.6rem;
              height: 3.4rem;
             /* background: red;*/
              margin-left: .08rem;
            }
            .CallThePoliceTit,.row{
              width: 100%;
              height: .28rem;
              margin-bottom: .06rem;
              background:rgba(8,26,84,0);
              border:1px solid rgba(24,63,96,1);
              box-shadow:0px 0px 60px 0px rgba(9,38,71,1);
              display: flex;
              .cal{
                width: 30%;
                font-size:.16rem;
                font-family:Microsoft YaHei;
                color:rgba(0,252,249,1);
                line-height:.28rem;
                text-align: center;
                &:last-child{
                  width: 70%;
                }
              }
            }
            .CallThePoliceList{
              width: 100%;
              height: calc(100% - .36rem);
              .swiper-containerCall{
                width: 100%;
                height: 100%;
                overflow: hidden;
                position: relative;
              }
              .swiper-wrapper{
              }
              .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
                bottom: 0;
              }
              .swiper-pagination-bullet{
                width:.08rem;
                height:.08rem;
                background:rgba(0,146,147,1);
                border-radius:50%;
              }
              .swiper-pagination-bullet-active{
                background: #14FDFF;
                width:.24rem;
                height:.08rem;
                background:rgba(20,253,255,1);
                border-radius:.04rem
              }
              .swiper-slide {
                text-align: center;
                font-size: 18px;
                display: flex;
                flex-direction: column;
              }
              .row{
                width:4.58rem;
                height:.46rem;
                background:rgba(8,26,84,0);
                border:1px solid rgba(24,63,96,1);
                box-shadow:0px 0px 60px 0px rgba(9,38,71,1);
                .cal{
                  line-height: .46rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span{
                  display: block;
                  line-height: .2rem;
                  margin-top: .02rem;
                }
              }
            }
          }
          .humiture{
            width:4.76rem;
            height:1.96rem;
            border-radius:8px;
            background: url("../../assets/img/humiture.png") no-repeat;
            background-size: 100% 100%;
            margin-top: .22rem;
            padding-top: .42rem;
            box-sizing: border-box;
            .temperatrueBox{
              width: 100%;
              height: 1.45rem;
              padding: 0 .25rem;
              box-sizing: border-box;
              .swiper-containerTemp {
                width: 100% !important;
                height: 100%;
                position: relative;
                overflow: hidden;
              }
              .swiper-slide {
                width: 100%;
                text-align: center;
                font-size: 18px;
                /* Center slide text vertically */
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
              }
              .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
                bottom: -.1rem;
              }
              .swiper-pagination-bullet{
                width:.08rem;
                height:.08rem;
                background:rgba(0,146,147,1);
                border-radius:50%;
              }
              .swiper-pagination-bullet-active{
                background: #14FDFF;
                width:.24rem;
                height:.08rem;
                background:rgba(20,253,255,1);
                border-radius:.04rem
              }
              .temperatrueFlex{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                .Left{
                  border-right: 1px solid #2D275E;
                  padding-right: .06rem;
                }
                .Right{
                  padding-left: .06rem;
                }
                .Left,.Right{
                  width: 49.7%;
                  height: 80%;
                  box-sizing: border-box;
                  .Radius{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .temperatrue{
                      width:.94rem;
                      height:.94rem;
                      background: url("../../assets/img/temperatrue.png") no-repeat;
                      background-size: 100% 100%;
                      span{
                        font-size:.14rem;
                        font-family:Microsoft YaHei;
                        color:rgba(255,255,255,1);
                        line-height:.14rem;
                        background:linear-gradient(0deg,rgba(0,138,255,1) 0%, rgba(255,0,174,1) 100%);
                        -webkit-background-clip:text;
                        -webkit-text-fill-color:transparent;
                        margin-top: .25rem;
                        display: block;
                        text-align: center;
                        &:last-child{
                          font-size:.26rem;
                          color:rgba(255,255,255,1);
                          line-height:.26rem;
                          background:linear-gradient(0deg,rgba(0,138,255,1) 0%, rgba(255,0,174,1) 100%);
                          -webkit-background-clip:text;
                          -webkit-text-fill-color:transparent;
                          margin-top: .08rem;
                        }
                      }
                    }
                    .humiturebox{
                      width:.94rem;
                      height:.94rem;
                      background: url("../../assets/img/humidity.png") no-repeat;
                      background-size: 100% 100%;
                      span{
                        font-size:.14rem;
                        font-family:Microsoft YaHei;
                        color:rgba(255,255,255,1);
                        line-height:.14rem;
                        background:linear-gradient(0deg,rgba(0,255,72,1) 0%, rgba(222,255,0,1) 100%);
                        -webkit-background-clip:text;
                        -webkit-text-fill-color:transparent;
                        margin-top: .25rem;
                        display: block;
                        text-align: center;
                        &:last-child{
                          font-size:.26rem;
                          color:rgba(255,255,255,1);
                          line-height:.26rem;
                          background:linear-gradient(0deg,rgba(0,255,72,1) 0%, rgba(222,255,0,1) 100%);
                          -webkit-background-clip:text;
                          -webkit-text-fill-color:transparent;
                          margin-top: .08rem;
                        }
                      }
                    }
                  }
                  p{
                    font-size:.16rem;
                    font-family:Microsoft YaHei;
                    color:rgba(66,228,251,1);
                    line-height:.16rem;
                    margin-top: .08rem;
                    text-align: center;
                  }
                }
              }
            }
          }
          .monitoring{
            width:4.76rem;
            height:3.6rem;
            border-radius:8px;
            margin-top: .22rem;
            background: url("../../assets/img/monitoring.png") no-repeat;
            background-size: 100% 100%;
            padding-top:.5rem;
            box-sizing: border-box;
            .Monitoringbox{
              width: 4.5rem;
              height: 3rem;
              overflow: hidden;
              margin-left: .12rem;
              position: relative;
              .swiper-containerMonitor {
                width: 100%;
                height: 2.7rem;
              }
              .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
                bottom: -.1rem;
              }
              .swiper-pagination-bullet{
                width:.08rem;
                height:.08rem;
                background:rgba(0,146,147,1);
                border-radius:50%;
              }
              .swiper-pagination-bullet-active{
                background: #14FDFF;
                width:.24rem;
                height:.08rem;
                background:rgba(20,253,255,1);
                border-radius:.04rem
              }
              .swiper-slide {
                width: 100% !important;
                text-align: center;
                font-size: 18px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
              }
              .MoinitoringFlex{
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
              }
              .OnerBox{
                width: 2.2rem;
                height: 1.28rem;
                margin-right: .1rem;
                margin-top:.12rem ;
                background: red;
                &:nth-child(2n){
                  margin-right: 0;
                }
                &:first-child,&:nth-child(2){
                  margin-top: 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
