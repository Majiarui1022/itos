<template>
  <div class="overviewBox">
    <div class="Header">
      <div class="SearchBox">
      </div>
      <UserInfo></UserInfo>
    </div>


    <div class="Menu">
      <div class="overviewSection">
        <div class="OvervierScroll">
          <div class="OvervierTit">
            <div class="swiper-containertit">
              <div class="swiper-wrapper">


                  
                <div class="swiper-slide">
                  <div class="Cal">
                    <p class="Name">近30天新增项目</p>
                    <yd-countup   class="Num" :duration="1" :endnum="new_projects_count_of_30">{{new_projects_count_of_30}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">近30天新增任务</p>
                    <yd-countup  class="Num" :duration="1" :endnum="new_tasks_count_of_30">{{new_tasks_count_of_30}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">进行中任务</p>
                    <yd-countup  class="Num" :duration="1" :endnum="using_tasks_count">{{using_tasks_count}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">近30天完成任务</p>
                    <yd-countup  class="Num" :duration="1" :endnum="finish_tasks_count_of_30">{{finish_tasks_count_of_30}}</yd-countup>
                  </div>
                </div>

                 

                <div class="swiper-slide">
                  <div class="Cal">
                    <p class="Name">近15天计划完成任务</p>
                    <yd-countup   class="Num" :duration="1" :endnum="plan_to_finish_tasks_count_of_15">{{plan_to_finish_tasks_count_of_15}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">近3天计划完成任务</p>
                    <yd-countup  class="Num" :duration="1" :endnum="plan_to_finish_tasks_count_of_3">{{plan_to_finish_tasks_count_of_3}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">超时任务</p>
                    <yd-countup  class="Num" :duration="1" :endnum="timeout_tasks_count">{{timeout_tasks_count}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">超时3天任务</p>
                    <yd-countup  class="Num" :duration="1" :endnum="timeout_tasks_count_of_3">{{timeout_tasks_count_of_3}}</yd-countup>
                  </div>

                </div>
                 <div class="swiper-slide">
                  <div class="Cal">
                    <p class="Name">设备数量</p>
                    <yd-countup  class="Num" :duration="1" :endnum="equipments_count">{{equipments_count}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">控制器数量</p>
                    <yd-countup  class="Num" :duration="1" :endnum="controllers_count">{{controllers_count}}</yd-countup>
                  </div>
                  <div class="Cal">
                    <p class="Name">模块数量</p>
                    <yd-countup  class="Num" :duration="1" :endnum="modules_count">{{modules_count}}</yd-countup>
                  </div>

                </div>
              </div>
               <div class="swiper-button-prev"></div>
              <!--左箭头-->
              <div class="swiper-button-next"></div>
              <!--右箭头--> 
            </div>
            
          </div>
          <div class="OvervierContent">
            <div class="SliderBox">
              <div class="Tit">任务进度</div>
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" :key="index" v-for="(asd,index) in aa">
                    <div class="TaskOBox">
                      <div class="Row" :key="val" v-for="(item,val) in TaskListOver" v-if="val < (index + 1) * 10 && val >= index * 10">
                        <div class="Cal"><span>{{item.name}} ({{item.task_number}})</span><span>{{item.progress}}%</span></div>
                        <div class="Cal jin">
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
            <div class="OvervierTabBox">
              <div class="OvervierTab">
                <p>模块使用率</p>
                <div class="TabBox">
                  <div class="TabTit">
                    <div class="ModuleName">模块名称</div>
                    <div class="ModuleNum">模块数量</div>
                    <div class="Today">当日</div>
                    <div class="lastWeek">近7日内</div>
                    <div class="lastMoth">近30天内</div>
                    <div class="lastThreeMoth">近90天内</div>
                    <div class="lastHalfAYear">近180天内</div>
                    <div class="lastYear">近一年内</div>
                  </div>
                  <div class="Tab">
                    <ul class="TabScroll" :style = {transform:transform} :class="{rollScreen_list_unanim:num===0}">
                      <li class="Row" :key="index + 999" v-for="(item,index) in SliderBoxList">
                        <div class="block-row">
                          <div class="cal first">{{item.name}}</div>
                          <div class="cal">{{item.count}}</div>
                          <div class="cal">{{item.rate}}</div>
                          <div class="cal">{{item.rate_7}}</div>
                          <div class="cal">{{item.rate_30}}</div>
                          <div class="cal">{{item.rate_90}}</div>
                          <div class="cal">{{item.rate_180}}</div>
                          <div class="cal">{{item.rate_365}}</div>
                        </div>
                      </li>
                      <li class="Row" :key="index" v-for="(item,index) in SliderBoxList">
                        <div class="block-row" v-if="SliderBoxList.length > 9">
                          <div class="cal first">{{item.name}}</div>
                          <div class="cal">{{item.count}}</div>
                          <div class="cal">{{item.rate}}</div>
                          <div class="cal">{{item.rate_7}}</div>
                          <div class="cal">{{item.rate_30}}</div>
                          <div class="cal">{{item.rate_90}}</div>
                          <div class="cal">{{item.rate_180}}</div>
                          <div class="cal">{{item.rate_365}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="OvervierCanvas" id="Echarts"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Swiper from  'swiper'
  import UserInfo from "@/components/UserInfo";
  import echarts from 'echarts'
    export default {
        name: "overview",
      components: {UserInfo},
      data(){
          return{
            MassageNum:0,
            drawer:false,   //消息通知
            Prolistss:[
              {
                tit:'报警信息',
                content:'2019-08-21 15:26  控制器01-DJG-687 故障 ',
                id:1
              },
              {
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:2
              },
              {
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:3
              },
              {
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },{
                tit:'报警信息',
                content:'2019-08-20 15:26  控制器01-DJG-687 故障 ',
                id:4
              },
            ],

            new_projects_count_of_30 : 0,
            new_tasks_count_of_30 : 0,
            using_tasks_count :0,
            finish_tasks_count_of_30 : 0,
            plan_to_finish_tasks_count_of_15 : 0,
            plan_to_finish_tasks_count_of_3 : 0,
            timeout_tasks_count : 0,
            timeout_tasks_count_of_3 : 0,
            equipments_count : 0,
            controllers_count : 0,
            modules_count : 0,


            TaskListOver:[],
            num: 0,
            SliderBoxList:[],
            XCharts : [],
            YCharts : []
          }
      },
      mounted(){
        console.log(this.$store.state.limit)
        this.drawLine();
      },
      methods:{

        RemovePro(index){
          let a = 1
         // let Timer = setInterval(()=>{
         //   a = a - 0.1
         //
         //   $(".List").children(".Row")[index].css({
         //      opacity:`a`
         //   })
         //   if(a === 0){
         //     clearInterval(Timer)
         //   }
         // },100)
            let Dom  = $(".List").children(".Row")[index]
          Dom.css({
            "background-color":"yellow"
          })
            console.log()
        },
        drawLine(){
            //控制器使用率
          this.$http.get(this.$conf.env.controllerRates).then(res=>{
              for(var i in res.data.message){
                this.XCharts.push(res.data.message[i].statistics_date);
                this.YCharts.push(res.data.message[i].rate);
              }
              this.EchartsInit()
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
         
        },
        getPro(){
           //概览信息
          this.$http.get(this.$conf.env.infoSet).then(res=>{
            var {
              new_projects_count_of_30 , 
              new_tasks_count_of_30 , 
              using_tasks_count , 
              finish_tasks_count_of_30 , 
              plan_to_finish_tasks_count_of_15 , 
              plan_to_finish_tasks_count_of_3,
              timeout_tasks_count,
              timeout_tasks_count_of_3,
              equipments_count,
              controllers_count,
              modules_count
            } = res.data.message

            this.new_projects_count_of_30  = new_projects_count_of_30;
            this.new_tasks_count_of_30 = new_tasks_count_of_30;
            this.using_tasks_count  = using_tasks_count;
            this.finish_tasks_count_of_30  = finish_tasks_count_of_30;
            this.plan_to_finish_tasks_count_of_15 = plan_to_finish_tasks_count_of_15;
            this.plan_to_finish_tasks_count_of_3  = plan_to_finish_tasks_count_of_3;
            this.timeout_tasks_count = timeout_tasks_count;
            this.timeout_tasks_count_of_3  = timeout_tasks_count_of_3;
            this.equipments_count  = equipments_count;
            this.controllers_count  = controllers_count;
            this.modules_count = modules_count
            var swiper = new Swiper('.swiper-containertit', {
                speed: 500,
                slidesPerView: 'auto',
                centeredSlides: true,
                allowTouchMove: false,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },

            });
            swiper.$el.parent('.OvervierTit')[0].onmouseover = function() {
              swiper.$el.addClass('mouse-hover');
            };
            swiper.$el.parent('.OvervierTit')[0].onmouseout = function() {
              swiper.$el.removeClass('mouse-hover');
            };


          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });





          // //进行中的项目
          // this.$http.get(this.$conf.env.Runproject).then(res=>{
          //   this.runproject = res.data.message
          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });
          // //进行中的任务
          // this.$http.get(this.$conf.env.Runtask).then(res=>{
          //   this.runteskl = res.data.message
          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });
          // //我的脚本
          // this.$http.get(this.$conf.env.myscript).then(res=>{
          //   this.myscript = res.data.message
          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });
          // //脚本赋值数
          // this.$http.get(this.$conf.env.Runcount).then(res=>{
          //   this.scriptprocess = res.data.message;
            

          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });

          //任务进度
          // this.$http.get(this.$conf.env.TaskRundu).then(res=>{
          //   console.log(res.data)
          //   this.TaskListOver = res.data

          //   this.$nextTick(function () {
          //     var swiper = new Swiper('.swiper-container', {
          //       autoplay:true,//等同于以下设置
          //       loop:true,
          //       pagination: {
          //         el: '.swiper-pagination',
          //       },
          //     });
          //   })
          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });
        },
        //模块使用率
        GetModuleReat(){
          this.$http.get(this.$conf.env.ModuleRate).then(res=>{
            this.SliderBoxList = res.data.message
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
        //控制器使用率图形构建
        EchartsInit(){
          var _that = this
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('Echarts'))
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: 'category',
              data: _that.XCharts,
              splitLine: {
                show: false
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                color:'#B7B9C2',
              },
              axisLine:{
                lineStyle:{
                  color:'#B7B9C2'
                }
              },
              boundaryGap:false

            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle:{
                  color:'#F8F8F9'
                }
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                color:'#B7B9C2',
              },
              axisLine:{
                lineStyle:{
                  color:'transparent'
                }
              },
            },
            series: [{
              data:  _that.YCharts,
              type: 'line',
              lineStyle:{
                color:'#0654FF'
              },
              symbolSize: 8,//拐点大小
              itemStyle:{
                color:'#0050FF',
                borderWidth:2
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#EBF0FF'},
                      {offset: 1, color: '#FDFDFF'}
                    ]
                  )
                }
              },
            }]
          });
           $(window).resize(function(){
            setTimeout(()=>{
              console.log(myChart)
              myChart.resize();
              myChart.resize();
            },500)
          })
        }
      },
      computed:{
        aa(){
          if(this.TaskListOver.length / 10 %1 === 0){
            return this.TaskListOver.length / 6
          }else{
            return Math.floor(this.TaskListOver.length/10) + 1
          }
        },
        transform: function () {
          if(this.SliderBoxList.length > 9){
            return 'translateY(-' + this.num * 0.32 + 'rem)'
          }else{
            return 'translateY(-' + 0 + 'rem)'
          }
        }
      },
      created() {
        this.getPro()
        this.GetModuleReat()
      }
    }
</script>

<style lang="scss">

  .overviewBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .Header{
      width: 100%;
      height:.9rem;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 5px 0px rgba(2,24,68,0.08);
      padding-left: .58rem;
      padding-right: .87rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .SearchBox{
        width:4rem;
        height:.45rem;
        border-radius:23px;
        display: flex;
        input{
          width: 3.28rem;
          height: 100%;
          background: transparent;
          border: 0;
          outline: none;
          border-top-left-radius: 23px;
          border-bottom-left-radius: 23px;
          text-indent: 24px;
        }
        .SearchBut{
          width: .72rem;
          height: 100%;
          border-top-right-radius: 23px;
          border-bottom-right-radius: 23px;
          background: url("../../assets/img/search.png") center no-repeat;
          background-size: .26rem .28rem;
          cursor: pointer;
        }
      }
    }
    .Menu{
      flex: 1;
      box-sizing: border-box;
      background: #F4F4F4;
      padding:.1rem .12rem;
      overflow: hidden;
      .overviewSection{
        width: 100%;
        height: 100%;
        background: #fff;
        padding: .2rem .22rem 0 .22rem;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: .12rem;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #e6e6e6;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
          border-radius: 0;
          background: transparent;
        }
        .OvervierScroll{
          width: 100%;
          height: 100%;
          .OvervierTit{
            width: 100%;
            height: 1.85rem;
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            position: relative;
              /deep/ .mouse-hover .swiper-button-next, .mouse-hover .swiper-button-prev {
                opacity: 1 !important;
              }
              /deep/ .swiper-containertit{
                width: 100%;
                height: 100%;
                .swiper-slide{
                  display: flex;
                }
                .swiper-button-next, .swiper-button-prev {
                  top: 50%;
                  background-color: rgba(210,210,210,.6);
                  background-size: .15rem .15rem;
                  border-radius: 50%;
                  width: .52rem;
                  height: .52rem;
                  transition: all .5s;
                  outline: none;
                  opacity: 0;
                  margin-top: -.26rem;
                }
                
                .swiper-button-next:hover, .swiper-button-prev:hover {
                  background-color: rgba(210,210,210,.8);
                }
                .swiper-button-next {
                  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
                  right: .2rem;
                }
                .swiper-button-prev {
                  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
                  left: .2rem;
                }
                .swiper-container .swiper-button-next.swiper-button-disabled, .swiper-container .swiper-button-prev.swiper-button-disabled {
                  opacity: 0;
                }
              }
            .Cal{
              width:3.76rem;
              height:1.85rem;
              border-radius:10px;
              margin-right: .27rem;
              &:last-child{
                margin-right: 0;
              }
              .Name{
                font-size:.3rem;
                font-family:Microsoft YaHei;
                color:rgba(255,255,255,1);
                line-height:.58rem;
                text-indent: .22rem;
              }
              .Num{
                font-size:.7rem;
                font-family:Microsoft YaHei;
                color:rgba(254,254,254,1);
                line-height:.7rem;
                margin-top:.2rem;;
                text-align: center;
                display: block;
              }
              &:nth-child(1){
                background: url("../../assets/img/One.png") no-repeat;
                background-size: 100% 100%;
              }
              &:nth-child(2){
                background: url("../../assets/img/two.png") no-repeat;
                background-size: 100% 100%;
              }
              &:nth-child(3){
                background: url("../../assets/img/three.png") no-repeat;
                background-size: 100% 100%;
              }
              &:nth-child(4){
                background: url("../../assets/img/four.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
          .OvervierContent{
            width: 100%;
            height: 7.2rem;
            display: flex;
            justify-content: space-between;
            margin-top: .16rem;
            .SliderBox{
              width:6.88rem;
              height:7.2rem;
              background:rgba(255,255,255,1);
              box-shadow:0px 7px 13px 0px rgba(0, 0, 0, 0.2);
              padding-left:.26rem;
              padding-right: .42rem;
              padding-top: .12rem;
              box-sizing: border-box;
              position: relative;
              .swiper-container {
                width: 100%;
                height: 6.56rem;
                position: initial;
              }
              .swiper-slide {
                /* Center slide text vertically */
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                justify-content: center;
                align-items: center;
                .TaskOBox{
                  width: 98%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                }
              }
              .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
                bottom:0;
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
              .Tit{
                width: 100%;
                font-size:.24rem;
                color:rgba(57,59,106,1);
                line-height:.24rem;
                text-indent: -.12rem;
              }
              .Row{
                width:100%;
                margin-top: .22rem;
                .Cal{
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  span{
                    font-size:.14rem;
                    font-family:Microsoft YaHei;
                    color:rgba(51,51,51,1);
                    line-height:.14rem;
                    margin-bottom: .08rem;
                  }
                }
                .jin{
                  height: .19rem;
                  background:rgba(222,224,255,1);
                  box-shadow:0px 2px 4px 0px rgba(8,10,66,0.8);
                  border-radius:10px;
                  div{
                    width: 80%;
                    background:linear-gradient(90deg,rgba(0,15,206,1),rgba(4,253,255,1));
                    border-radius:10px;
                  }
                }
              }
            }
            .OvervierTabBox{
              width: 8.8rem;
              height: 7.2rem;
              .OvervierTab{
                width:100%;
                height:3.76rem;
                background:rgba(255,255,255,1);
                box-shadow:0 7px 13px 0 rgba(0, 0, 0, 0.2);
                padding: 0 .12rem .04rem .24rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                p{
                  font-size:.24rem;
                  color:rgba(57,59,106,1);
                  line-height:.44rem;
                  margin-bottom: .1rem;
                }
                .TabBox{
                  flex: 1;
                  height: 3.22rem;
                  display: flex;
                  flex-direction: column;
                  .TabTit{
                    width: 100%;
                    height: .32rem;
                    background: #EDF3FE;
                    display: flex;
                    .ModuleName{
                      width: 2.84rem !important;
                    }
                    div{
                      width: .8rem;
                      height: 100%;
                      text-align: center;
                      font-size:.14rem;
                      color:rgba(51,51,51,1);
                      line-height:.32rem;
                    }
                  }
                  .Tab{
                    flex: 1;
                    overflow: hidden;
                    height: calc(100% - .3rem);
                    line-height: .28rem;
                    .TabScroll{
                      width: 100%;
                      height: 100%;
                      transition: 1s linear;
                      .Row{
                        width: 100%;
                        .block-row{
                          width: 100%;
                          height: 100%;
                          height: .32rem;
                          overflow: hidden;
                        }
                        .first{
                          width: 2.84rem !important;
                        }
                        .cal{
                          width: .8rem;
                          height: 100%;
                          text-align: center;
                          font-size:.14rem;
                          color:rgba(51,51,51,1);
                          line-height:.32rem;
                          float: left;
                        }
                        &:nth-child(2n){
                          background: #EDF3FE;
                        }
                      }
                      &::-webkit-scrollbar {/*滚动条整体样式*/
                        width: .1rem;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 4px;
                        display: none;
                      }
                      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        border-radius: 5px;
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                        background: #e6e6e6;
                        display: none;
                      }
                      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
                        border-radius: 0;
                        background: transparent;
                        display: none;
                      }
                    }
                  }
                  .rollScreen_list_unanim{
                    transition: none !important;
                  }
                }
              }
              .OvervierCanvas{
                width:100%;
                height:3.37rem;
                background:rgba(255,255,255,1);
                box-shadow:0 7px 13px 0 rgba(0, 0, 0, 0.2);
                margin-top: .08rem;
              }
            }
          }
        }

      }
    }
  }
</style>
