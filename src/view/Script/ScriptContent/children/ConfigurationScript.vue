<template>
  <div class="AllTabList">
    <div class="AllTabTitle">
      <div @click="ChangIdnex(0)" :class="IsIndex === 0 ? 'active' : ''" class="TabSelet Setting">Setting</div>
      <div @click="ChangIdnex(1)" :class="IsIndex === 1 ? 'active' : ''" class="TabSelet Part">Part</div>
    </div>
    <div class="TabDiv">
      <div v-if="IsIndex === 0" class="Setting">
        <div style="display: flex;align-items: center">
          <span>设定时间</span>
          <input type="text" class="Write" v-model="sequencesData.set_time">
          <span class="unit">M</span>
          <span>设定次数</span>
          <input type="text" class="Write" v-model="sequencesData.set_num">
          <span class="unit">次</span>
          <span>间隔运行</span>
          <el-select v-model="sequencesData.is_interval" placeholder="" style="margin: 0 .08rem;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: .1rem">休息时间</span>
          <input type="text" class="Write" v-model="sequencesData.rest_time">
          <span class="unit">M</span>
          <span>运行时间</span>
          <input type="text" class="Write" v-model="sequencesData.run_time">
          <span class="unit">M</span>
          <span>波特率</span>
          <el-select v-model="sequencesData.baud_rate" placeholder="" style="margin: 0 .08rem;">
            <el-option
              v-for="item in optionsTwo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="unit">K</span>
        </div>
        <div class="SettingBut" @click="ababab">保存</div>
      </div>
      <div v-if="IsIndex === 1" class="Part">
        <div style="display: flex;align-items: center">
          <span>Part</span>
          <input type="text" class="PartNum" v-model="Part.PartNumber">
          <input type="text" placeholder="请输入名称" class="WhiteName" v-model="Part.PartName">
        </div>
        <div class="PartBut" @click="CreatePart">保存</div>
      </div>
    </div>
    <div class="TabListBox">
      <div class="TabListLeft">
        <div class="LeftTit">Part</div>
        <div class="LeftList">
          <div class="Row"
               v-for="(item,index) in PartList"
               @click="SelectRow(item.id)"
               :class="SelectPartListId === item.id ?'active':''"
          >
            <span class="PartNumber">{{item.serial_num}}</span>
            <div class="PartName" :class="PartId===item.id ? 'activeT' : ''" @dblclick="ChangePartId(item.id,item.name)">
              <input
                   type="text"
                   v-model="item.name"
                   :disabled="PartId===item.id ? false : true"
                   @blur="ChangeSuccess(item.id,item.name)"
                   @keyup.enter="ChangeSuccess(item.id,item.name)"
              >
            </div>
            <div class="RemovePart" @click.stop="RemovePart(item.id,index)"><img src="../../../../assets/img/removeP.png" alt=""></div>
          </div>
        </div>
      </div>
      <div class="TabListRight">
        <div class="partnametit">Part<img src="../../../../assets/img/saveP.png" alt="" @click="SaveOrder"></div>
        <div class="RightTit">
          <div class="Step">Step.NO</div>
          <div class="Type">Type</div>
          <div class="Order">order</div>
          <div class="bacun"><img src="../../../../assets/img/ADDPart.png" alt="" @click="AddOrder = true"></div>
<!--          <div class="ScollS"></div>-->
        </div>
        <div class="RightContent">
          <div class="TabelScroll">
            <div class="Row" v-for="(item,index) in PartOrderList">
              <div class="Step"><input type="number" @blur="SendData(item.id)" v-model="item.number"></div>
              <div class="Type">
                <el-select v-model="item.order_type.id" placeholder="">
                  <el-option
                    v-for="item in optionsThree"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="Order"><input type="text" v-model="item.content"></div>
              <div class="bacun"><img src="../../../../assets/img/removeP.png" alt="" @click="removeOrder(item.id,index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <el-dialog
      title="新建Order"
      :visible.sync="AddOrder"
      width="30%"
      custom-class="AddOrder"
      :before-close="handleClose">
      <div class="whitenumber">
        <span class="TName">number</span>
        <input type="text" v-model="numners">
      </div>
      <div class="SelectType">
        <span class="TName">Type</span>
        <el-select v-model="valueTypese" placeholder="">
          <el-option
            v-for="item in optionsThree"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="whiteOrder">
          <span class="TName">Order</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <div></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddOrder = false">取 消</el-button>
        <el-button type="primary" @click="SendOrder">确 定</el-button>
      </span>
    </el-dialog>




  </div>
</template>

<script>
    export default {
        name: "ConfigurationScript",
      data() {
        return {
          options: [
            {
            value: false,
            label: 'OFF'
          }, {
            value: true,
            label: 'ON'
          }],
          optionsTwo: [],
          optionsThree:[],
          value: '',
          value2:'',


          IsIndex:0,
          PartList:[],                            //Part列表
          PartId:-1,
          SelectPartListId:0,
          PartOrderList:[],

          //添加Part
          Part:{
            PartNumber:'',
            PartName:''
          },
          sequencesData:{},

          SendOrderList:[],
          AddOrder:false,
          textarea: '',
          valueTypese:'',
          numners:''
        }
      },
      methods:{
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
          ababab(){
            this.sequencesData.script = this.$route.query.id
            this.$http.post(this.$conf.env.deployScript,this.sequencesData).then(res=>{
              console.log(res.data)
              this.$alert.successTit(this,'保存成功')
            }).catch(err=>{
              console.log(err)
              this.$alert.errorTit(this,err.response.data.err)
            });

          },
        ChangIdnex(val){
          console.log(val)
          this.IsIndex = val
        },
        GetBaud(){
          this.$http.get(this.$conf.env.deployScript).then(res=>{
            for(var i in res.data){
              let Obj = {
                value:res.data[i].id,
                label:res.data[i].value
              }
              this.optionsTwo.push(Obj)
            }
            console.log(this.optionsTwo)
          }).catch(err=>{
            console.log(err)
          });

          //获取Part列表
          this.$http.get(this.$conf.env.ScriptAllPart + `${this.$route.query.id}`).then(res=>{
            this.PartList = res.data
          }).catch(err=>{
            console.log(err)
          });

          //获取全部波特率详情
          this.$http.get(this.$conf.env.deployScript + `${this.$route.query.id}`).then(res=>{
            console.log(res.data)
            this.sequencesData = res.data.sequences
            console.log(this.sequencesData)
          }).catch(err=>{
            console.log(err)
          });

          //获取全部Type

          this.$http.get(this.$conf.env.GetTypeList).then(res=>{
            for(var i in res.data){
              let Obj = {
                value:res.data[i].id,
                label:res.data[i].name
              }
              this.optionsThree.push(Obj)
            }
          }).catch(err=>{
            console.log(err)
          });
        },
        //双击修改part
        ChangePartId(id){
          this.PartId = id
        },


        //part修改提交
        ChangeSuccess(id,name){
          let Obj = {
            "id": id,
            "name": name
          }
          this.$http.put(this.$conf.env.ChangePartName + `${id}/`,Obj).then(res=>{
            this.PartId = -1
          }).catch(err=>{
            console.log(err)
          });
        },


        //选中Part
        SelectRow(id){
          if(this.SelectPartListId === id)return
          this.SelectPartListId = id
          this.$http.get(this.$conf.env.GetPartOrder + `${id}`).then(res=>{
            this.PartOrderList = res.data
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          });

        },

        //删除某个Part
        RemovePart(id,index){
          this.$confirm('此操作将永久删除该Part, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {   this.$http.delete(this.$conf.env.ChangePartName + `${id}`).then(res=>{
            if(this.SelectPartListId === id){
              if(index + 1 >= this.PartList.length){
                if(index - 1 < 0){
                  this.SelectPartListId = 0
                  this.PartOrderList = []
                  this.PartList.splice(index,1)
                }else{
                  this.SelectRow(this.PartList[index-1].id)
                  this.PartList.splice(index,1)
                }
              }else{
                this.SelectRow(this.PartList[index+1].id)
                this.PartList.splice(index,1)
              }
            }else{
              this.PartList.splice(index,1)
            }
          }).catch(err=>{
            console.log(err)
          });
          }).catch(() => {

          });
        },

        //创建某个Part
        CreatePart(){
          if(this.Part.PartName === '' ||  this.Part.PartNumber === '')return
          let Obj = {
            "serial_num": this.Part.PartNumber,
            "name": this.Part.PartName,
            "script": this.$route.query.id
          }
          this.$http.post(this.$conf.env.ChangePartName,Obj).then(res=>{
            this.PartList.push(res.data)
            this.Part.PartNumber = this.Part.PartName = ''
          }).catch(err=>{
            console.log(err)
          });

        },


        //创建指令
        SendOrder(){
          if(this.SelectPartListId === 0)return
          let Obj = {
            "part": this.SelectPartListId,
            "number": this.numners,
            "order_type": this.valueTypese,
            "content": this.textarea
          }
          this.$http.post(this.$conf.env.CreateOrder,Obj).then(res=>{
            this.PartOrderList.push(res.data)
            console.log(res.data)
            this.AddOrder = false
            this.numners = this.valueTypese = this.textarea = ''
          }).catch(err=>{
            console.log(err)
                this.$alert.errorTit(this,err.response.data.err)
          });

        },

        // //创建can指令
        // CreateCan(){
        //   if(this.SelectPartListId === 0)return
        //     let Obj = {
        //       content:{
        //         "order_type": "CAN",
        //         "can_send_id": this.Can.SendID,
        //         length_send: this.Can.Length - 0,
        //         "message_send":this.Can.massage,
        //         timeout:this.Can.Timeout- 0
        //       },
        //       number:this.Can.Ptep - 0,
        //       part:this.SelectPartListId
        //     }
        //   this.$http.post(this.$conf.env.CreateOrder,Obj).then(res=>{
        //     console.log(res.data)
        //     this.PartOrderList.push(res.data)
        //   }).catch(err=>{
        //     console.log(err)
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        //
        // },





        //修改指令
        SendData(id){
            for(var i in this.SendOrderList){
                if(this.SendOrderList[i] === id){
                    return
                }
            }
          this.SendOrderList.push(id)
          console.log(this.SendOrderList)
        },

        // 保存修改
        SaveOrder(){
          if(this.SelectPartListId === 0)return
          console.log(this.PartOrderList)
          this.$http.put(this.$conf.env.CreateOrder + `${this.SelectPartListId}/`,this.PartOrderList).then(res=>{
            this.$alert.successTit(this,'保存成功')
           console.log(res)
          }).catch(err=>{
            console.log(err)
          });

        },


        //删除指令
        removeOrder(id,index){

          this.$confirm('您确认删除吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$http.delete(this.$conf.env.CreateOrder + `${id}/`).then(res=>{
              for(var i in this.SendOrderList){
                if(this.SendOrderList[i] === id){
                  this.SendOrderList.splice(i,1)
                }
              }
              this.PartOrderList.splice(index,1)
              console.log(this.SendOrderList)
              console.log(this.PartOrderList)
            }).catch(err=>{
              console.log(err)
            });
          }).catch(()=>{

          })
        }

      },
      mounted() {
      },
      created() {
          this.GetBaud()
      }
    }
</script>
<style lang="scss">
  .AllTabList{
    width: 100%;
    height: 100%;
    background: #8082B8;
    overflow: hidden;
    .AllTabTitle{
      height: .4rem;
      width: 100%;
      background:rgba(57,59,106,1);
      .TabSelet{
        width:1.8rem;
        height:.4rem;
        float: left;
        font-size:.18rem;
        font-family:Microsoft YaHei;
        color:#99A2B7 !important;
        line-height:.4rem;
        text-align: center;
        cursor: pointer;
        &.active{
          background:rgba(45,46,93,1);
          color: #FFFFFF;
        }
      }
    }
    .TabDiv{
      width:100%;
      height:.8rem;
      background:rgba(45,46,93,1);
      .Setting{
        width: 100%;
        height: 100%;
        padding-left: .18rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: .27rem;
        .SettingBut{
          width:1.04rem;
          height:.4rem;
          background:rgba(8,194,201,1);
          border-radius:5px;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(255,255,255,1);
          line-height:.4rem;
          text-align: center;
          cursor: pointer;
          &:active{
            font-size: .18rem;
          }
        }
        span{
          font-size:.16rem;
          font-family:Microsoft YaHei;
          color:rgba(2,246,255,1);
        }
        .Write{
          width:.7rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-radius:5px;
          border: 0;
          outline: none;
          padding: 0 .1rem;
          margin: 0 .08rem;
          color: #2D2E5D;
          font-size:.16rem;
          font-weight:bold;
          line-height: .4rem;
        }
        .el-select{
          width:1rem;
          height:.4rem;
          border-radius:5px;
          display: flex;
        }
        .el-input__inner{
          line-height: .4rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-color:rgba(112,115,177,1);
          color: #2D2E5D;
          font-size:.16rem;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(45,46,93,1);
        }
        .unit{
          margin-right: .18rem;
        }
      }
      .Part{
        display: flex;
        width: 100%;
        height: 100%;
        padding-left: .18rem;
        align-items: center;
        justify-content: space-between;
        padding-right: .27rem;
        box-sizing: border-box;
        span{
          font-size:.16rem;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(2,246,255,1);
          line-height:.4rem;
        }
        .PartNum{
          width:.8rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-radius:5px;
          font-size:.16rem;
          font-family:Microsoft YaHei;
          color:rgba(2,246,255,1);
          line-height:.4rem;
          border: 0;
          outline: none;
          text-indent: .24rem;
          margin: 0 .1rem;
        }
        .WhiteName{
          width:2rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-radius:5px;
          text-indent: .16rem;
          font-size:.16rem;
          font-family:Microsoft YaHei;
          color:rgba(65,66,136,1);
          line-height:.4rem;
          border: 0;
          outline: none;
          color: #414288;
          //修改placeholder的默认颜色：
        }
        input::-webkit-input-placeholder{
          color:#414288;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#414288;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#414288;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#414288;
        }
        .PartBut{
          width:1.04rem;
          height:.4rem;
          background:rgba(8,194,201,1);
          border-radius:5px;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(255,255,255,1);
          line-height:.4rem;
          text-align: center;
          cursor: pointer;
          &:active{
            /*background:rgba(8,210,180,1) ;*/
            font-size: .18rem;
          }
        }
      }
      .CAN{
        display: flex;
        width: 100%;
        height: 100%;
        padding-left: .18rem;
        align-items: center;
        justify-content: space-between;
        padding-right: .27rem;
        box-sizing: border-box;
        span{
          font-size:.16rem;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(2,246,255,1);
          line-height:.4rem;
        }
        input{
          width:2rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-radius:5px;
          outline: none;
          border: 0;
          margin-left: .1rem;
          margin-right: .26rem;
          text-indent: .1rem;
        }
        .small{
          width:.8rem;
        }
        .CAMBut{
          width:1.04rem;
          height:.4rem;
          background:rgba(8,194,201,1);
          border-radius:5px;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(255,255,255,1);
          line-height:.4rem;
          text-align: center;
          cursor: pointer;
        }
      }
      .Delay{
        display: flex;
        width: 100%;
        height: 100%;
        padding-left: .18rem;
        align-items: center;
        justify-content: space-between;
        padding-right: .27rem;
        box-sizing: border-box;
        span{
          font-size:.16rem;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(2,246,255,1);
          line-height:.4rem;
        }
        .PartNum{
          width:.8rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-radius:5px;
          font-size:.16rem;
          font-family:Microsoft YaHei;
          color:rgba(2,246,255,1);
          line-height:.4rem;
          border: 0;
          outline: none;
          text-indent: .24rem;
          margin: 0 .1rem;
        }
        .WhiteName{
          width:2rem;
          height:.4rem;
          background:rgba(112,115,177,1);
          border-radius:5px;
          text-indent: .16rem;
          font-size:.16rem;
          font-family:Microsoft YaHei;
          color:rgba(65,66,136,1);
          line-height:.4rem;
          border: 0;
          outline: none;
          color: #414288;
          margin: 0 .1rem;
          //修改placeholder的默认颜色：
        }
        input::-webkit-input-placeholder{
          color:#414288;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#414288;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#414288;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#414288;
        }
        .PartBut{
          width:1.04rem;
          height:.4rem;
          background:rgba(8,194,201,1);
          border-radius:5px;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(255,255,255,1);
          line-height:.4rem;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .TabListBox{
      width: 100%;
      height: calc(100% - 1.2rem);
      .TabListLeft{
        width: 3rem;
        height: 100%;
        border-right: 1px solid #2D2E5D;
        box-sizing: border-box;
        float: left;
        .LeftTit{
          width: 100%;
          height: .4rem;
          border-bottom: 1px solid #2D2E5D;
          box-sizing: border-box;
          text-align: center;
          line-height: .4rem;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(45,46,93,1);
        }
        .LeftList{
          width: 100%;
          height: calc(100% - .4rem);
          line-height: .4rem;
          font-size:.18rem;
          font-family:Microsoft YaHei;
          color:rgba(45,46,93,1);
          .Row{
            width: 100%;
            height: .4rem;
            padding:0 .1rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            .RemovePart{
              width: .14rem;
              display: flex;
              align-items: center;
              img{
                width:.14rem;
                height:.18rem;
                display: block;
              }
            }
            .PartNumber{
              width: .56rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .PartName{
              width:1.8rem;
              height:.3rem;
              border-radius:4px;
              margin-top: .05rem;
              input{
                width: 100%;
                height: 100%;
                cursor: pointer;
                background: transparent;
                outline: none;
                border:0;
                line-height: .3rem;
                display: block;
                text-indent: .1rem;
                color: #2D2E5D;
              }
              &.activeT{
                background:rgba(213,214,247,1);
              }
            }
            &.active{
              background: #2D2E5D;
              color: #7073B1;
              input{
                color: #7073B1;
              }
            }
          }
        }
      }
      .TabListRight{
        width: calc(100% - 3rem);
        height: 100%;
        float: left;
        .partnametit{
          width: 100%;
          height: .4rem;
          border-bottom: 1px solid #2D2E5D;
          box-sizing: border-box;
          text-align: center;
          line-height: .4rem;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(45,46,93,1);
          img{
            width:.22rem;
            height:.2rem;
            cursor: pointer;
            vertical-align: middle;
            display: inline-block;
            margin-left: .1rem;
          }
        }
        .RightTit{
          width: 100%;
          height: .4rem;
          border-bottom: 1px solid #2D2E5D;
          box-sizing: border-box;
          text-align: center;
          line-height: .4rem;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(45,46,93,1);
          > div{
            height: 100%;
            border-right: 1px solid #2D2E5D;
            box-sizing: border-box;
            float: left;
          }
          .Step,.Type{
            width: 8%;
          }
          .Order{
            width: 80%;
          }
          .bacun{
            width: 3%;
            img{
              width:.22rem;
              height:.22rem;
              cursor: pointer;
            }
          }
          /*.ScollS{*/
          /*  width: 1%;*/
          /*}*/
        }
        .RightContent{
          width: 100%;
          height: calc(100% - .8rem);
          .TabelScroll{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            box-sizing: border-box;
            text-align: center;
            line-height: .3rem;
            font-size:.2rem;
            color:rgba(45,46,93,1);
            .Row{
              width: 100%;
              height: .3rem;
              > div{
                border-right: 1px solid #2D2E5D;
                box-sizing: border-box;
                float: left;
                height: .3rem;
                border-bottom: 1px solid #2D2E5D;
              }
              input{
                width: 100%;
                height: 100%;
                background: transparent;
                border: 0;
                outline: none;
                text-align: center;
              }
            }
            .Step,.Type{
              width: 8%;
              input{
                color:rgba(45,46,93,1);
              }
              i{
                color:rgba(45,46,93,1);
              }
            }
            .Order{
              width: 80%;
            }
            .bacun{
              width: 3%;
              img{
                width:.14rem;
                height:.18rem;
                cursor: pointer;
              }
            }
            &::-webkit-scrollbar {/*滚动条整体样式*/
              width:0;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              width:.14rem;
              background:rgba(57,59,106,1);
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
              /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
              border-radius: 0;
              background: transparent;
            }
          }
        }
      }
    }
  }
  .AddOrder{
    width:6.60rem !important;
    height:5.34rem;
    background: #56589a !important;
    border-radius: 5px;
    margin-top: 3.56rem !important;
    .el-dialog__header{
      height: .6rem;
      padding: 0;
      span{
        display: block;
        text-align: center;
        line-height: .6rem;
        color: #fff;
        font-size: .2rem;
      }
      .el-dialog__headerbtn .el-dialog__close{
        font-size: .24rem;
      }
    }
    .el-dialog__body{
      width: 100%;
      height: 3.6rem;
      padding: 0;
      .TName{
        font-size: .2rem;
        color:#fff;
        line-height: .4rem;
        margin-right: .16rem;
      }
      .whitenumber{
        display: flex;
        align-items: center;
        justify-content: center;
        input{
          width:4rem;
          height: .4rem;
          background: #fff;
          outline: none;
          border: 0;
          text-indent: .16rem;
          line-height: .3rem;
          font-size: .16rem;
          font-family: Source Han Sans CN;
          color: #2d2e5d;
          border-radius: 5px;
          margin-right: .2rem;
        }
      }
      .SelectType{
        display: flex;
        justify-content: center;
        margin-top:.24rem;
        input{
          width:4rem;
          height: .4rem;
          background: #fff;
          outline: none;
          border: 0;
          text-indent: .16rem;
          line-height: .3rem;
          font-size: .16rem;
          font-family: Source Han Sans CN;
          color: #2d2e5d;
          border-radius: 5px;
          padding: 0 .08rem;
        }
      }
      .whiteOrder{
        display: flex;
        justify-content: center;
        margin-top:.16rem;
        .el-textarea{
          width:4rem;
          height:2rem;
          background:rgba(255,255,255,1);
          textarea{
            resize: none;
            display: block;
            width: 100%;
            height:100%;
            border: 0;
            font-size: .16rem;
            line-height: .24rem;
          }
        }
      }
    }
    .el-dialog__footer{
      padding: 0;
      height: .8rem;
      .dialog-footer{
        height: .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
          width: 1rem;
          height: .4rem;

          background: #08c2c9;
          border-radius: 5px;
          font-size: .18rem;
          color: #fff;
          border: 0;
        }
      }
    }
  }
</style>
