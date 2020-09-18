<template>
  <div class="PMContent">

    <!--    头部-->
    <div class="Header">
      <div class="SearchBox">
      </div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="PMSection">
        <div class="MenuHeader">
          <span>任务管理</span>
          <div class="RightBox">
            <div class="Create"  @click="ProjectChange(1)">
              <img src="../../assets/img/create.png" alt="">
              创建
            </div>
          </div>
        </div>

        <div class="select-fax">
          <div class="item-select">
            <span class="item-tit">任务 状态：</span>
            <el-select @change="SelectList" v-model="valueT" placeholder="请选择">
              <el-option
                v-for="item in StatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
           <div class="item-select">
            <span class="item-tit">计划时间：</span>

            <el-date-picker
              v-model="selectTimer"
              type="date"
              @change="SelectList"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>

          </div>
          <div class="item-select">
            <div class="SearchBox">
              <input type="text" placeholder="请输入关键字搜索" v-model="SearchPM" @keyup.enter="SelectList">
              <div @click="SelectList" class="SearchBut"></div>
            </div>
          </div>
        </div>

        <div class="ProList">
          <div class="ProN">
            <div class="ProHeader">
              <div class="ProNum">任务编号</div>
              <div class="ProName">任务名称</div>
              <div class="ProCreatName">项目名称</div>
              <div class="CrateTime">控制器编号</div>
              <div class="status">状态</div>
              <div class="Crateperson">创建人</div>
              <div class="jihua">计划</div>
              <div class="Operation">操作</div>
            </div>
            <div class="proMenu">
              <div class="procant" v-for="(item,index) in ProList" :key="index">
                <div class="ProNum">{{item.task_number}}</div>
                <div class="ProName">{{item.name}}</div>
                <div class="ProCreatName">{{item.project}}</div>
                <div class="CrateTime">{{item.controller}}</div>
                <div class="status">{{item.status}}</div>
                <div class="Crateperson">{{item.user}}</div>
                <div class="jihua">{{item.estimated_date.date}} <span v-if="item.estimated_date.result == 'overdue'">逾期</span></div>
                <div class="Operation">
                <div v-if="item.status != '新建' && item.status != '未通过'">
                  <img src="../../assets/img/sh.png" alt="" @click="ProjectChange(3,item.id,item.status)">
                  <span>审核</span>
                </div>
                <div v-if="item.status == '新建' || item.status == '未通过'">
                  <img src="../../assets/img/tij.png" alt=""  @click="comittask(item.id)">
                  <span>提交</span>
                </div>
                <div v-else>
                  <img src="../../assets/img/jr.png" alt="">
                  <span>进入</span>
                </div>
                <div>
                  <img src="../../assets/img/createPro.png" alt="" @click="ProjectChange(2,item.id)">
                  <span>编辑</span>
                </div>
                <div>
                  <img src="../../assets/img/setting.png" alt="" @click="GetOnecPro(item.id)">
                  <span>配置</span>
                </div>
                <div>
                  <img src="../../assets/img/removePro.png" alt="" @click="RemovePro(item.id,item.name)">
                  <span>删除</span>
                </div>
                
              </div>
            </div>
            </div>
            <el-dialog
              :title="dialogname"
              :visible.sync="dialogVisible"
              :before-close="beforeCloseS"
              custom-class="pro">
              <!-- <div class="Label">项目编号</div>
              <input type="text" placeholder="请输入项目编号" v-model="ProNumber"> -->
              <div class="scriptlist">
                <div class="row row-header">
                    <div class="bh">脚本编号</div>
                    <div class="name">脚本名称</div>
                </div>
                <div class="row-list">
                  <div class="row" v-for="(item,index) in tdpzlist" :key="index">
                    <div class="bh">{{item.script_number}}</div>
                    <div class="name">{{item.name}}</div>
                    <img src="../../assets/img/ri.png" alt="" @click="showtd(item)">
                  </div>
                </div>
              </div>


                <el-dialog
                  width="30%"
                  :title="tdname"
                  :visible.sync="innerVisible"
                  append-to-body>

                </el-dialog>


              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="SendDataSystem()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
        <el-pagination
          background
          layout=" prev, pager, next, jumper"
          :total="total"
          :page-size="PageSize"
          :current-page.sync="CurrentChange"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
      </div>
    </div>
    <div class="ProjectCompleTion" v-if="IsTrue">
      <h2>项目完成</h2>
      <p>项目编号：{{ProNumber}}</p>
      <p>项目名称：{{Name}}</p>
      <div class="But">
        <div class="No" @click="IsTrue = false , ProNumber = Name  = value = ProID = ''">取消</div>
        <div class="Yes" @click="OkProject">完成</div>
      </div>
    </div>




  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
      name: "task",
      components: {UserInfo},
      data(){
        return{
          total:12,     //总条数
          PageSize:this.$store.state.limit,      //一页显示多少条
          CurrentChange:1,         //当前页码
          ProList:[
            {
              num:'001',
              proname:'红旗测试',
              createName:'犬夜叉',
              createData:'2019-08-27',
              id:1
            },
            {
              num:'002',
              proname:'红旗测试',
              createName:'桔梗',
              createData:'2019-08-27',
              id:2
            },
            {
              num:'003',
              proname:'红旗测试',
              createName:'杀生丸',
              createData:'2019-08-27',
              id:3
            },
            {
              num:'004',
              proname:'红旗测试',
              createName:'露西亚',
              createData:'2019-08-27',
              id:4
            },
          ],

          IsTrue:false,      //自制弹窗   完成项目按钮
          IsSelect:true,     //选择新增OR编辑  true  为新增  false  为编辑

          dialogVisible: false,           //添加项目弹窗
          dialogname:'通道配置',

          options: [],
          value: '',
          valueT : '',
          ProNumber:'',     //项目编号
          Name:'',          //项目名称


          ProID:'',
          SearchPM:'',

          input : '',


          StatusList : [
              {
              value : '',
              label : '全部'
            },
            {
              value : 'free',
              label : '未开始'
            },

            {
              value : 'using',
              label : '工作中'
            },

            {
              value : 'fault',
              label : '故障'
            },
            {
              value : 'finish',
              label : '完成'
            },
          ],
          selectTimer : '',
          tdpzlist : [],


          innerVisible : false,
          tdlist : [],
          tdname : ''
        }
      },
      methods:{

        //提交任务
        comittask(id){
          this.$http.put(this.$conf.env.comTask + `${id}/`).then(res=>{
            this.$alert.successTit(this,'提交成功')
            this.getProList()
          }).catch(err=>{
            // this.$alert.errorTit(this,err.response.data.err)
          });
        },
        showtd(item){
          if(item.channels.length < 1){
            this.$alert.Tit(this,'此任务无通道需要配置')
            return;
          }
          console.log(item);
          this.tdname = item.name
          this.innerVisible = true
          this.tdlist = item;

        },

         //初始化页码
        SelectList(){
          this.CurrentChange = 1;
          this.getProList()
          console.log(this.selectTimer)
        },


        handleCurrentChange(val){
          this.CurrentChange = val
          this.getProList()
         },
        //IsSelect   选择新增OR编辑  true  为新增  false  为编辑
        ProjectChange(val,id,status){
          console.log(this.value)
          if(val === 1){
            this.IsSelect = true
            this.dialogname = '新增项目'
            this.$router.push({
              name : 'settask',
              query:{
                sta : val
              }
            })
          }else if(val === 3){
            this.IsSelect = false
            this.dialogname = '编辑项目'
            this.getOnecPro(id)
            this.$router.push({
              name : 'settask',
              query:{
                id : id,
                sta : val,
                status : status == '已提交' ? 1 : 2
              }
            })
          }else{
            this.IsSelect = false
            this.dialogname = '编辑项目'
            this.getOnecPro(id)
            this.$router.push({
              name : 'settask',
              query:{
                id : id,
                sta : val
              }
            })
          }
          // this.dialogVisible = true;
        },


        //新增项目，修改项目
        SendDataSystem(){
          console.log(this.value)
          let Obj = {
            "pro_number": this.ProNumber,
            "name":this.Name,
            "page_system": this.value
          }
          if(this.IsSelect){
            this.$http.post(this.$conf.env.GetOnecPro,Obj).then(res=>{
              this.getProList()
              this.$alert.successTit(this,'添加成功')
            }).catch(err=>{
              // this.$alert.errorTit(this,err.response.data.err)
            });
          }else{
            this.$http.put(this.$conf.env.GetOnecPro + `${this.ProID}/`,Obj).then(res=>{
              this.$alert.successTit(this,'修改成功')
              this.getProList()
            }).catch(err=>{
              // this.$alert.errorTit(this,err.response.data.err)
            });
          }
          this.beforeCloseS()
        },

        //点击完成项目按钮获取某个项目信息
        GetOnecPro(id){
          this.dialogVisible = true
          // this.getOnecPro(id)
          this.$http.get(this.$conf.env.taskchann + `?task_id=${id}&page=1&page_size=999`).then(res=>{
            console.log(res)
            this.tdpzlist = res.data.results
          }).catch(err=>{
            // this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //获取某个项目
        getOnecPro(id){
          this.$http.get(this.$conf.env.GetOnecPro + `${id}/`).then(res=>{
            this.ProNumber = res.data.pro_number
            this.Name = res.data.name
            this.value = res.data.page_system.id
            this.ProID = res.data.id
            console.log(res.data)
          }).catch(err=>{
            // this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //获取某一页
        getProList(){
          this.$http.get(this.$conf.env.TaskList + `?page=${this.CurrentChange}&status=${this.valueT}&estimated_start_time=${this.selectTimer == null ? '' : this.selectTimer}&search=${this.SearchPM}&page_size=${this.PageSize}`).then(res=>{
            this.ProList = res.data.results
            this.total = res.data.count
            console.log(res)
          }).catch(err=>{
            // this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //获取所有系统
        getSystem(){
          this.$http.get(this.$conf.env.GetSystem).then(res=>{
            console.log(res)
            for(var i in res.data.message){

              let a = {
                value:res.data[i].id,
                label:res.data[i].name
              }
              this.options.push(a)
            }
            console.log(this.options)
          }).catch(err=>{
            // this.$alert.errorTit(this,err.response.data.err)
          });

        },
        //完成某个项目
        OkProject(){

          this.$http.put(this.$conf.env.OkProJectY + `${this.ProID}/`).then(res=>{
            console.log(res)
            this.IsTrue = false
            this.$alert.successTit(this,'项目已完成')
          }).catch(err=>{
            // this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //删除某条项目
        RemovePro(id,name){
          this.$confirm(`此操作将永久删除${name}, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.$http.delete(this.$conf.env.TaskList + `${id}/`).then(res=>{
              if(this.ProList.length < 2 && this.CurrentChange > 1){
                this.CurrentChange = this.CurrentChange - 1
              }
              this.$message({
                type: 'success',
                duration:1000,
                message: '删除成功!'
              });
              this.getProList()
            }).catch(err=>{
              // this.$alert.errorTit(this,err.response.data.err)
            })
          })
        },
        //弹窗关闭清空所有值
        beforeCloseS(){
          this.value = this.Name = this.ProNumber = ''
          this.dialogVisible = false
        }
      },
      created() {
        this.getProList()
        this.getSystem()
      }
    }
</script>

<style lang="scss" scope>

  .PMContent{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
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
     
    }
    .Menu{
      flex: 1;
      box-sizing: border-box;
      background: #F4F4F4;
      padding:.1rem .12rem;
      overflow: hidden;
      .PMSection{
        width: 100%;
        height: 100%;
        background: #fff;
        padding: .2rem .75rem 0 .52rem;
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
        .MenuHeader{
          width: 100%;
          height: .45rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            font-size:.32rem;
            color:rgba(51,51,51,1);
            line-height: .45rem;
          }
          .RightBox{
            display: flex;
            .el-select{
              width:2.1rem;
              height:.42rem;
              background:rgba(253,253,253,1);
              box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
              border-radius:21px;
              .el-input{
                height:100%;
              }
              input{
                padding: 0;
                text-indent: .17rem;
                border-radius: 21px;
                width: 100%;
                height: 100%;
              }
              .el-input__icon{
                line-height: .42rem;
                display: block;
              }
            }
            .Create{
              background:rgba(253,253,253,1);
              box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
              border-radius:21px;
              padding-left: .17rem;
              padding-right: .23rem;
              align-items: center;
              display: flex;
              font-size:.2rem;
              font-family:Microsoft YaHei;
              color:rgba(70,74,83,1);
              margin-left: .22rem;
              cursor: pointer;
              line-height: .42rem;
              img{
                width: .25rem;
                height: .25rem;
                margin-right: .1rem;
              }
            }
          }
        }
        .select-fax{
          width: 100%;
          height: .5rem;
          display: flex;
          .item-select{
            margin-right: .6rem;
            display: flex;
            align-items: center;
            .item-tit{
              font-size: .18rem;
              color: #666666;
            }
            /deep/ .el-select{
              width: 2rem;
              height: .32rem;
              input{
                height: .45rem;
                font-size: .16rem;
                color: #333333;
                padding: 0 .12rem;
              }
              .el-select__caret{
                font-size: .16rem;
                width: .17rem;
              }
            }
             .SearchBox{
              width:3rem;
              height:.32rem;
              background:rgba(242,242,242,1);
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
            /deep/ .el-input{
              width: 2rem;
              height: .32rem;
              border: .01rem solid #c9c9c9;
              border-radius: .04rem;
               input{
                width: 2rem;
                height: 100%;
                background: transparent;
                border: 0;
                outline: none;
                border-top-left-radius: 23px;
                border-bottom-left-radius: 23px;
                border-radius: .04rem;
                padding: 0 .4rem;
               }
               i{
                 line-height: .32rem;
               }
            }
          }
        }
        .ProList{
          width: 100%;
          height: 7.5rem;
          font-size:.14rem;
          .ProN{
            border:1px solid #E4EAEC;
            .ProHeader{
              width: 100%;
              height: .5rem;
              background:rgba(228,234,236,1);
              color:rgba(62,62,62,1);
              line-height:.5rem;
              display: flex;
              /*ProNum  ProName  ProCreatName  CrateTime  Operation*/
              > div{
                height: .5rem;
              }
              .status{
                width: 5%;
              }
              .Crateperson{
                width: 5%;
              }
              .ProCreatName,.ProNum,.Operation,.ProName,.CrateTime,.jihua{
                width: 15%;
               
              }
              .ProNum{
                padding-left: .2rem;
                box-sizing: border-box;
              }
              .Operation{
                text-align: center;
              }

            }
            .proMenu{
              width: 100%;
              .procant{
                width: 100%;
                height: .5rem;
                background:rgba(228,234,236,1);
                color:rgba(62,62,62,1);
                line-height:.5rem;
                display: flex;
                background: #fff;
                > div{
                  height: .5rem;
                }
                .status{
                  width: 5%;
                }
                .Crateperson{
                  width: 5%;
                }
                .jihua{
                  display: flex;
                  align-items: center;
                  span{
                    width: .62rem;
                    height: 28rpx;
                    background: #ff0000;
                    border: .01rem solid #cb0101;
                    border-radius: .04rem;
                    text-align: center;
                    line-height: .28rem;
                    display: block;
                    margin-left: .1rem;
                    color: #FFF;
                  }
                }
                .ProCreatName,.ProNum,.Operation,.ProName,.CrateTime,.jihua{
                  width: 15%;
                }
                &:nth-child(2n){
                  background: #E4EAEC;
                }
                .Operation{
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  padding-right: .2rem;
                  box-sizing: border-box;
                  > div{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    span{
                      width: .72rem;
                      height: .36rem;
                      background: rgba(0,0,0,0.5);
                      box-shadow: .02rem 0 .06rem 0 rgba(32,121,232,0.16);
                      font-size: .14rem;
                      text-align: center;
                      color: #ffffff;
                      line-height: .36rem;
                      position: absolute;
                      right: -.68rem;
                      top: -.26rem;
                      border-radius: .06rem;
                      opacity: 0;
                      transition: opacity .3s;
                      z-index: -1;
                    }
                    
                  }
                  img{
                    width: .26rem;
                    height: .28rem;
                    margin: .08rem;
                    cursor: pointer;
                    &:hover{
                      + span{
                        opacity: 1;
                      z-index: 3;
                      }
                    }
                  }
                }
                .ProNum{
                  padding-left: .2rem;
                  box-sizing: border-box;
                }
              }
            }
          }
        }
        .el-pagination{
          display: flex;
          justify-content: flex-end;
          margin-top: .3rem;
        }
        .el-pagination__jump{
          font-size:.14rem;
          color:rgba(87,96,119,1);
          line-height:.48rem;
        }
        .el-pagination__editor.el-input .el-input__inner{
          height: .46rem;
        }
        .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
          border:1px solid rgba(194,202,216,1);
          background: #fff;
          width: .48rem;
          height: .48rem;
          border-right: 0;
          line-height: .48rem;
          margin:0;
          font-size:.16rem;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(87,96,119,1);
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background: #C2CAD8;
        }
        .el-pagination.is-background .el-pager li:not(.disabled):hover{
          color: #576077;
        }
        .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
          color: #C2CAD8;
        }
        .btn-next{
          border-right:1px solid rgba(194,202,216,1) !important;
        }
        .btn-prev,.btn-next{
          background: #fff !important;
        }
        .pro{
          width: 5.38rem;
          height: 4rem;
          background: #ffffff;
          border-radius: .06rem;
          .el-dialog__header{
            padding: .32rem 0 0;
            text-align: center;
            font-size:.32rem;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(48,48,48,1);
            line-height:.43rem;
          }
          .el-dialog__headerbtn{
            width: .38rem;
            height: .38rem;
            background: #B2B2B2;
            border-radius: 50%;
            i{
              color: #fff;
            }
          }
          .el-dialog__body{
            padding: 0 .31rem;
            margin-top: .14rem;
            .scriptlist{
              width: 4.8rem;
              height: 2.6rem;
              background: #ffffff;
              border: 1px solid #393b6a;
              margin: 0 auto;
              .row{
                width: 100%;
                height: .3rem;
                display: flex;
                justify-content: space-between;
                padding-right: .2rem;
                box-sizing: border-box;
                align-items: center;
                div{
                  font-size: .14rem;
                  text-align: left;
                  color: #3e3e3e;
                  line-height: .3rem;
                }
                .bh{
                  width: 1.41rem;
                  padding-left: .14rem;
                  box-sizing: border-box;
                }
                .name{
                  width: 2.87rem;
                }
                img{
                  width: .16rem;
                  height: .16rem;
                  cursor: pointer;
                }
              }
              .row-list{
                width: 100%;
                height: calc(100% - .3rem);
                overflow-x: hidden;
                overflow-y: auto;

                  &::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 4px;
                  }
                  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 5px;
                    background: #F1F1F1;
                  }
                  &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    border-radius: 0;
                    background: transparent;
                  }
              }
              .row-header{
                background: #e4eaec;
              }
            }
          }
          .el-dialog__footer{
            padding: 0;
            text-align: center;
            margin-top: .5rem;
            display: none;
          }
        }
      }
    }
    .ProjectCompleTion{
      position: absolute;
      left: 50%;
      top: 50%;
      width:4rem;
      height:3rem;
      background:rgba(232,233,255,1);
      box-shadow:0px 5px 5px 1px rgba(2,24,68,0.19);
      border-radius:5px;
      margin-left: -2rem;
      margin-top: -1.5rem;
      padding: 0 .43rem;
      box-sizing: border-box;
      h2{
        font-size:.26rem;
        font-family:Microsoft YaHei;
        color:#3E3E3E;
        font-weight: 400;
        line-height:.74rem;
        text-align: center;
        margin-bottom: .08rem;
      }
      p{
        font-size:.16rem;
        font-family:Microsoft YaHei;
        color:rgba(62,62,62,1);
        line-height:.5rem;
      }
      .But{
        display: flex;
        justify-content: space-between;
        margin-top: .5rem;
        .No,.Yes{
          width:1.42rem;
          height:.4rem;
          border:1px solid rgba(191,191,191,1);
          border-radius:4px;
          font-size:.24rem;
          font-family:Microsoft YaHei;
          color:rgba(25,25,25,1);
          line-height:.4rem;
          text-align: center;
          cursor: pointer;
        }
        .Yes{
          background:rgba(109,124,255,1);
          color: #fff;
        }
      }
    }
    .el-dialog__wrapper{
      position: absolute;
    }
  }
</style>
