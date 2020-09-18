<template>
  <div class="ScriptConfigBox">
    <div class="Header">
      <div class="SearchBox">
        <input type="text" placeholder="请输入项目名称或控制器名称">
        <div class="SearchBut"></div>
      </div>
      <user-info></user-info>
    </div>
    <div class="ScriptConfigMenu">
      <p class="ScriptConfigTit">脚本配置</p>
      <div class="ScriptConfigContent">
        <div class="ScriptLeft">
          <div class="ScriptTit">脚本</div>
          <div class="ScriptLeftList">
            <ul>
              <li
                v-for="(val,index) in ScriptListData"
                @click="SelectScript(val.id,index)"
                :class="ScriptID === val.id ?'active':''"
              >{{val.script_number}}</li>
            </ul>
          </div>
        </div>
        <div class="ScriptRight">
          <div class="ScriptTit"><p>{{TitName}}</p></div>
          <div class="TabTit">
            <div class="TabPart">Part</div>
            <div class="TabStepNo">Step.No</div>
            <div class="TabInstruct">指令内容</div>
            <div class="TabModule">模块</div>
          </div>
          <div class="ScriptList">
            <div class="ScriptScroll">
              <div class="Part" v-for="(item,index) in TaskModuleScript">
                <div class="PartNum">{{item.serial_num}}</div>
                <div class="PartRightList">
                  <div class="Row" v-for="(val,TwoInx) in item.orders">
                    <div class="PartNo">{{val.number}}</div>
                    <div class="PaartZhiling">{{val.content}}</div>
                    <div class="PaartModule">
                      <el-select v-model="val.modules.id" placeholder="" @change="asdasdasdasd($event,val.order,val.task_order_module_id)">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "ScriptConfig",
      components: {UserInfo},
      data() {
        return {
          options: [],
          value: '',
          ScriptListData:[],
          ScriptID:0,
          TaskModuleScript:[],
          TitName:''
        }
      },
      methods:{
        GetinitData() {
          this.$http.get(this.$conf.env.ScriptsConfig + `${this.$route.query.id}/`).then(res=>{
            this.ScriptListData = res.data
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          });

          this.$http.get(this.$conf.env.TaskModuleList + `${this.$route.query.id}/`).then(res=>{
            for(var i = 0; i < res.data.length ; i++){
              var Obj = {
                label:res.data[i].module_number,
                value:res.data[i].id
              }
              this.options.push(Obj)
              console.log(this.options)
            }
          }).catch(err=>{
            console.log(err)
          });
          //
        },
        //选中脚本
        SelectScript(id,index){
          if(this.ScriptID === id)return
          this.TitName = this.ScriptListData[index].script_number
          this.TaskModuleScript = []
          this.ScriptID = id
          this.$http.get(this.$conf.env.TaskScriptModule + `script=${this.ScriptID}&task=${this.$route.query.id}`).then(res=>{
            console.log(res.data)
            this.TaskModuleScript = res.data
          }).catch(err=>{
            console.log(err)
          });

        },
        asdasdasdasd(val,id,modeid){
          console.log(val)
          var a = this.$route.query.id - 0
          let Data = {
            "task": a,     //任务ID
            "order": id,				//指令ID
            "module": val,       //模块ID
            id:modeid
          }
          this.$http.post(this.$conf.env.ChangeModule,Data).then(res=>{
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          });

        }
      },
      mounted() {
          this.GetinitData()
      }
    }
</script>

<style lang="scss">

  .ScriptConfigBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .Header{
      width: 100%;
      height:.9rem;
      background:rgba(255,255,255,1);
      box-shadow:0 2px 5px 0 rgba(2,24,68,0.08);
      padding-left: .58rem;
      padding-right: .87rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .SearchBox{
        width:4rem;
        height:.45rem;
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
    }
    .ScriptConfigMenu{
      flex: 1;
      width: 100%;
      height: calc(100% - .9rem);
      padding: .1rem .12rem;
      box-sizing: border-box;
      background: #F4F4F4;
      .ScriptConfigTit{
        font-size: .3rem;
        line-height: .74rem;
        color:rgba(51,51,51,1);
        text-indent: .52rem;
        background: #fff;
      }
      .ScriptConfigContent{
        width: calc(100% - 2px);
        height: calc(100% - .74rem - 2px - .4rem);
        background: #8082B8;
        border: 1px solid #2D2E5D;
        display: flex;
        justify-content: space-between;
        .ScriptTit{
          width: 100%;
          height: .4rem;
          font-size:.2rem;
          color:#2D2E5D;
          line-height:.4rem;
          text-align: center;
          border-bottom: 1px solid #2D2E5D;
        }
        .ScriptLeft{
          width: 2.6rem;
          height: 100%;
          border-right: 1px solid #2D2E5D;
          .ScriptLeftList{
            width: 100%;
            height: calc(100% - .4rem - 1px);
            ul{
              width: 100%;
              height: 100%;
              li{
                width: 100%;
                height: .4rem;
                font-size:.18rem;
                font-family:Microsoft YaHei;
                line-height:.4rem;
                text-align: center;
                white-space: nowrap;
                color: #2D2E5D;
                cursor: pointer;
                &.active{
                  background: #2D2E5D;
                  color:rgba(112,115,177,1);
                }
              }
            }
          }
        }
        .ScriptRight{
          width:calc(100% - 2.6rem);
          height: 100%;
          .TabTit{
            width: 100%;
            height: .4rem;
            border-bottom: 1px solid #2D2E5D;
            overflow: hidden;
            div{
              border-right: 1px solid #2D2E5D;
              height: .4rem;
              float: left;
              font-size:.16rem;
              font-family:Microsoft YaHei;
              color:rgba(45,46,93,1);
              line-height: .4rem;
              text-align: center;
            }
            .TabPart{
              width: .6rem;
            }
            .TabCheck{
              width: .3rem;
            }
            .TabStepNo{
              width: .7rem;
            }
            .TabInstruct{
              width: 6.66rem;
            }
            .TabModule{
              min-width: 5.2rem;
              border-right: 0;
            }
          }
          .ScriptList{
            width: 100%;
            height: calc(100% - .8rem);
            overflow: hidden;
            .ScriptScroll{
              width: 100%;
              height: 100%;
              overflow-y: scroll;
              padding-right: 1px;
              box-sizing: border-box;
              .Part{
                width: 100%;
                display: flex;
                .PartNum{
                  width: .6rem;
                  flex-wrap: wrap;
                  display: flex;
                  align-items: center;
                  font-size: .17rem;
                  justify-content: center;
                  float: left;
                  border-right: 1px solid #2D2E5D;
                  border-bottom: 1px solid #2D2E5D;
                }
                .PartRightList{
                  div{
                    font-size: .17rem;
                    text-align: center;
                    float: left;
                    line-height: .3rem;
                    height: .3rem;
                    border-right: 1px solid #2D2E5D;
                    border-bottom: 1px solid #2D2E5D;
                  }
                  width: calc(100% - .6rem);
                  .Row{
                    width: 100%;
                    .PartNo{
                      width: .7rem;
                    }
                    .PaartZhiling{
                      width: 6.66rem;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    }
                    .PaartModule{
                      min-width: 5.2rem;
                      border-right: 0;
                      white-space: nowrap;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      .el-select{
                        display: flex;
                        border: 0;
                      }
                      .el-input{
                        border: 0;
                        width: 1.84rem;
                      }
                      .el-input--suffix .el-input__inner{
                        padding: 0 .05rem;
                      }
                      .el-input__inner{
                        height: .22rem;
                        line-height: .22rem;
                        font-size: .14rem;
                        color: #222222;
                      }
                    }
                  }
                }
              }
              &::-webkit-scrollbar {/*滚动条整体样式*/
                width: .20rem;     /*高宽分别对应横竖滚动条的尺寸*/
                height: .14rem;
              }
              &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                width: .20rem;
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #393B6A;
              }
              &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
                width: .20rem;
                border-radius: 0;
                background: transparent;
              }
            }
          }
        }
      }
    }
  }
</style>
