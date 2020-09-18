<template>
  <div class="TimeConfigTabList">
    <div class="AllTabTitle">
      <div class="Part">Part</div>
      <div class="TitleRibs">
        <div class="One">
          <div class="Num">序号</div>
          <div class="TimeName">时序名称</div>
          <div class="ADD"><img src="../../../../assets/img/ADDPart.png" alt="" @click="dialogVisible = true"></div>
        </div>
       <div class="Two">
         <!--      <div class="SCROLL"></div>-->
         <div class="CsTime">时序配置</div>
         <div class="saveTime"><img src="../../../../assets/img/saveP.png" alt="" @click="SaveTimeSequence"></div>
         <!--      <div class="SCROLL"></div>-->
       </div>
      </div>
    </div>
    <div class="AllList">
      <div class="PartListBox">
        <div class="CalPart" v-for="(item,index) in PartList">
          <span>{{item.serial_num}}</span>
          <div>{{item.name}}</div>
        </div>
      </div>
      <div class="PartRightBox">
        <div class="PartLeft">
          <div class="Row" v-for="(item,index) in TimeList" @click="PartSequence(item.id)" :class="TimeID === item.id?'active':''">
            <div class="PartNum">{{index+1}}</div>
            <div class="TimeName" @dblclick="ChangeTimeName(item.id)"><input type="text" v-model="item.name" @blur="SendTimeName(index)" @keydown.enter="SendTimeName(index)" :disabled="ChangeTimeNameID === item.id ? false:''"></div>
            <div class="RemoveTime"><img src="../../../../assets/img/removeP.png" alt="" @click.stop="RemoveTimeName(item.id,index)"></div>
          </div>
        </div>
        <div class="PartRight">
          <div class="PartScroll">
            <div class="Row">
              <div class="SelectSRC">
                <div class="SelectTitle">
                  <div class="CompostTit">Compost</div>
                  <div class="CycleTit">Cycle</div>
                </div>
              </div>
              <div class="ADDTime"><img src="../../../../assets/img/ADDPart.png" alt="" @click="AddTimeSequence"></div>
            </div>
<!--            循环-->
            <div class="Row" v-for="(item,index) in SequencePart">
              <div class="SelectContent">
                  <div class="CompostTit">
                    <el-select v-model="item.part1" placeholder="">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                     &nbsp;&nbsp; —— &nbsp;&nbsp;
                    <el-select v-model="item.part2" placeholder="">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="CycleTit"><el-input v-model="item.cycle_num" placeholder=""></el-input></div>
                </div>
              <div class="ADDTime"><img src="../../../../assets/img/removeP.png" alt="" @click="RemoveSequence(item.id,index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="AddTime"
      append-to-body
      :before-close="handleClose">
      <div class="TimeNameBox">
        <input type="text" v-model="AddTimeName">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="AddTimeSend">保 存</el-button>
    <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "TimeConfig",
      data() {
        return {
          options: [],
          PartList:[],              //part列表
          TimeList:[],                //测试时序

          TimeID:0,
          SequencePart:'',
          ChangeTimeNameID:0,

          dialogVisible: false,             //弹窗
          AddTimeName:''
        }
      },
      methods:{
        GetTimeData(){
          //获取Part列表
          this.$http.get(this.$conf.env.ScriptAllPart + `${this.$route.query.id}`).then(res=>{
            this.PartList = res.data
            for(var i in res.data){
              let Obj = {
                value: res.data[i].id,
                label: res.data[i].serial_num
              }
              this.options.push(Obj)
            }
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });


          //全部Part时序
          this.$http.get(this.$conf.env.AllTime + `?script=${this.$route.query.id}`).then(res=>{
            this.TimeList = res.data
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });

        },
        PartSequence(id){
          if(this.TimeID === id)return
          this.TimeID = id
          if(this.TimeID === 0)return
          this.SequencePart = []
          //全部Part组合
          this.$http.get(this.$conf.env.AllSequence_Part + `?sequence_part=${id}`).then(res=>{
            this.SequencePart = res.data
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });

        },
        //修改时序名称
        ChangeTimeName(id){
          this.ChangeTimeNameID = id
        },
        //失焦提交时序名称
        SendTimeName(index){
          let Obj = {
            name:this.TimeList[index].name
          }
          this.$http.put(this.$conf.env.AllTime + `${this.ChangeTimeNameID}/`,Obj).then(res=>{
            this.ChangeTimeNameID = 0
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        //删除时序名称
          RemoveTimeName(id,index){
            this.$confirm('您确认删除吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.$http.delete(this.$conf.env.AllTime + `${id}/`).then(res=>{
                if(this.TimeID !== id){
                  this.TimeList.splice(index,1)
                  return
                }
                if(index + 1 >= this.TimeList.length){
                  if(index - 1 < 0){
                    this.PartSequence(0)
                  }else{
                    this.PartSequence(this.TimeList[index - 1].id)
                  }
                }else{
                  this.PartSequence(this.TimeList[index + 1].id)
                }

                this.TimeList.splice(index,1)
                console.log(this.TimeID)
              }).catch(err=>{
                console.log(err)
                this.$alert.errorTit(this,err.response.data.err)
              });
            }).catch(()=>{

            })
          },
        //弹框关闭的回掉
        handleClose(done) {
          this.$confirm('您暂未提交确定关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },



        //添加时序名称
        AddTimeSend(){
          let Obj = {
            "script": this.$route.query.id,
            "name":this.AddTimeName
          }
          this.$http.post(this.$conf.env.AllTime,Obj).then(res=>{
            console.log(res.data)
            this.TimeList.push(res.data)
            console.log(this.TimeList)
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });
          this.dialogVisible = false
        },

        //添加时序配置
        AddTimeSequence(){
          if(this.options.length < 1)return
          if(this.TimeID === 0)return
            let Obj = {
              cycle_num: '',
              part1: this.options[0].value,
              part2: this.options[0].value
            }
          this.SequencePart.push(Obj)

        },


        //保存时序配置
        SaveTimeSequence(){
          if(this.TimeID === 0)return
          this.$http.put(this.$conf.env.AllSequence_Part + `${this.TimeID}/`,this.SequencePart).then(res=>{
            console.log(res.data)
            this.PartList = res.data
            this.$alert.successTit(this,'保存成功')
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        //删除时序配置
        RemoveSequence(id,index){
          if(id){
            this.$confirm('您确认删除吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.$http.delete(this.$conf.env.AllSequence_Part + `${id}/`).then(res=>{
                console.log(res.data)
                this.SequencePart.splice(index,1)
              }).catch(err=>{
                console.log(err)
                this.$alert.errorTit(this,err.response.data.err)
              });
            }).catch(()=>{

            })
          }else{
            this.SequencePart.splice(index,1)
          }
        }
      },
      mounted(){
        this.GetTimeData()
      },
      created() {

      }
    }
</script>

<style lang="scss">
  .TimeConfigTabList{
    width: 100%;
    height: 100%;
    background: #8082B8;
    overflow: hidden;
    .AllTabTitle{
      height: .4rem;
      .Part{
        width: 20%;
        border-right: 1px solid #2D2E5D;
        border-bottom: 1px solid #2D2E5D;
        height: .4rem;
        float: left;
        text-align: center;
        font-size:.2rem;
        font-family:Microsoft YaHei;
        color:rgba(45,46,93,1);
        line-height:.4rem;
        box-sizing: border-box;
      }
      .TitleRibs{
        width: 80%;
        float: left;
        height: .4rem;
        .One{
          width: 50%;
          float: left;
          border-right: 1px solid #2D2E5D;
          box-sizing: border-box;
        }
        .Two{
          width: 50%;
          float: left;
        }
        .One,.Two{
          div{
            border-right: 1px solid #2D2E5D;
            border-bottom: 1px solid #2D2E5D;
            height: .4rem;
            float: left;
            text-align: center;
            font-size:.2rem;
            font-family:Microsoft YaHei;
            color:rgba(45,46,93,1);
            line-height:.4rem;
            box-sizing: border-box;
          }
        }
      }
      .Num{
        width: 15%;
      }
      .TimeName{
        width:80%;
      }
      .ADD{
        width: 5%;
        border-right: 0 !important;
        img{
          cursor: pointer;
        }
      }
      .CsTime{
        width:92%;
      }
      .saveTime{
        width: 8%;
        img{
          cursor: pointer;
        }
      }
    }
    .AllList{
      width: 100%;
      height: calc(100% - .4rem);
      .PartListBox{
        width: 20%;
        height: 100%;
        border-right: 1px solid #2D2E5D;
        float: left;
        box-sizing: border-box;
        .CalPart{
          width:100%;
          height:.4rem;
          display: flex;
          align-items: center;
          color:rgba(45,46,93,1);
          font-family:Microsoft YaHei;
          font-size:.16rem;
          span{
            display: block;
            width: .6rem;
          }
          div{
            width: 2.5rem;
            height: .3rem;
            margin: 0 .08rem 0 .04rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: .3rem;
          }
        }
      }
      .PartRightBox{
        width:80%;
        height: 100%;
        float: left;
        img{
          cursor: pointer;
        }
        .PartLeft{
          width:50%;
          height: 100%;
          float: left;
          box-sizing: border-box;
          border-right: 1px solid #2D2E5D;
          .Row{
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            div{
              text-align: center;
              font-size: .16rem;
              float: left;
              height: .3rem;
              line-height: .3rem;;
              border-right: 1px solid #2D2E5D;
              border-bottom: 1px solid #2D2E5D;
              box-sizing: border-box;
            }
            .PartNum{
              width: 15%;
            }
            .TimeName{
              width: 80%;
              input{
                width: 100%;
                height: 100%;
                display: block;
                background: transparent;
                border: 0;
                outline: none;
                text-align: center;
                color: #2D2E5D;
              }
            }
            .RemoveTime{
              width:5%;
              border-right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            &.active{
              background: #2D2E5D;
              color: #7073B1;
              .TimeName{
                input{
                  color: #7073B1;
                }
              }
            }
          }
        }
        .PartRight{
          width: 50%;
          float: left;
          .PartScroll{
            width: 100%;
            .Row{
              width: 100%;
              height: .3rem;
              div{
                float: left;
                box-sizing: border-box;
                border-right: 1px solid #2D2E5D;
                border-bottom: 1px solid #2D2E5D;
                height: .3rem;
                font-size:.16rem;
                font-family:Source Han Sans CN;
                color:rgba(34,34,34,1);
                text-align: center;
                line-height: .3rem;
                img{
                  display: inline-block;
                }
              }
              .SelectContent{
                width: 92%;
                height: .3rem;
                .CompostTit{
                  width: 60%;
                  box-sizing: border-box;
                  border-right: 1px solid #2D2E5D;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  div{
                    clear: both;
                    height: .24rem;
                    border: 0;
                  }
                  .el-select{
                    clear: both;
                    width:1rem;
                  }
                  .el-input--suffix .el-input__inner{
                    padding:0 .05rem;
                    height: .24rem;
                    line-height: .24rem;
                    display: block;
                  }
                  .el-input__icon{
                    line-height: .28rem;
                    font-size: .14rem;
                  }
                }
                .CycleTit{
                  width: 40%;
                  border-right: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  div{
                    clear: both;
                    height: .24rem;
                    border: 0;
                  }
                  .el-input{
                    width: 1rem;
                    display: block;
                    margin: 0 auto;
                    height: .24rem;
                    line-height: .24rem;
                  }
                  .el-input__inner{
                    display: block;
                    line-height: .24rem;
                    padding:0 .05rem;
                    height: .24rem;
                    text-align: center;
                  }
                }
              }
            }
            .SelectSRC{
              width: 92%;
              height: .3rem;
              .SelectTitle{
                width: 100%;
                height: .3rem;
                border-right: 0;
                .CompostTit{
                  width: 60%;
                  box-sizing: border-box;
                  border-right: 1px solid #2D2E5D;
                }
                .CycleTit{
                  width: 40%;
                  border-right: 0;
                }
              }
            }
            .ADDTime{
              width: 8%;
            }
          }
        }
      }
    }
  }
  .AddTime{
    width:4.24rem !important;
    height:2.14rem;
    background:rgba(86,88,154,1) !important;
    border-radius:5px;
    margin-top: 3.56rem !important;
    .el-dialog__header{
      padding: .3rem 0 .22rem;
      span{
        display: block;
        text-align: center;
        font-size:.18rem;
        font-family:Source Han Sans CN;
        color:rgba(255,255,255,1);
      }
    }
    .el-dialog__body{
      padding: 0;
      .TimeNameBox{
        width: 3rem;
        height: .3rem;
        margin: 0 auto;
        input{
          width: 100%;
          height: 100%;
          background: #fff;
          outline: none;
          border: 0;
          text-indent: .16rem;
          line-height: .3rem;
          font-size:.16rem;
          font-family:Source Han Sans CN;
          color:rgba(45,46,93,1);
          border-radius:5px;
        }
      }
    }
    .el-dialog__footer{
      padding: 0;
      text-align: center;
      >span{
        margin-top: .32rem;
        display: flex !important;
        justify-content: center;
        align-items: center;
        .el-button{
          padding: .1rem .34rem;
          background:rgba(8,194,201,1);
          border-radius:5px;
          font-size:.18rem;
          font-family:Source Han Sans CN;
          color:rgba(255,255,255,1);
          border: 0;
        }
      }
    }
  }
</style>
