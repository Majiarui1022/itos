<template>
  <div class="ScriptManContent">

    <!--    头部-->
    <div class="Header">
      <div class="SearchBox">
      </div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="ScriptManSection">
        <div class="MenuHeader">
          <span>脚本管理</span>
        </div>
        <div class="ProList">
          <div class="ProN">
            <div>
              <ul>
                <li v-for="(item,index) in ScripList">
                  <div>
                    <p>{{item.name}}</p>
                    <h2>{{item.scripts}}</h2>
                    <div>
                      <div @click="dialogVisible = true ; systemID = item.id ; systemIndex = index">
                        <img src="../../assets/img/addscript.png" alt="">
                        新增脚本
                      </div>
                      <div @click="GoManage(item.id)">
                        <img src="../../assets/img/join.png" alt="">
                        进入管理
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <el-dialog
            :title="dialogname"
            :visible.sync="dialogVisible"
            :before-close="beforeCloseDialog">
            <div class="Label">脚本编号</div>
            <input type="text" placeholder="请输入项目编号" v-model="ProNum">
            <div class="Label">脚本名称</div>
            <input type="text" placeholder="请输入项目名称" v-model="ScriptName">
            <div class="Label">脚本信息</div>
            <el-input
              type="textarea"
              :rows="7"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddScript">确 定</el-button>
              </span>
          </el-dialog>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "ScriptManage",
      components: {UserInfo},
      data(){
        return{
          dialogVisible: false,           //添加项目弹窗
          dialogname:'新增脚本',

          textarea: '',             //脚本信息
          ProNum:'',                //脚本编号
          ScriptName:'',            //脚本名称


          ScripList:[],             //脚本管理系统列表

          systemID:'',              //当前系统ID
          systemIndex:'',           //当前系统下标
        }
      },
      methods:{

          GetScriptList(){
            this.$http.get(this.$conf.env.ScripSystemtList).then(res=>{
              this.ScripList = res.data;
              console.log(res)
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          },

        //获取脚本数量
        GetScriptNum(){
          this.$http.get(this.$conf.env.GetSteamScriptNum + `${this.systemID}`).then(res=>{
            this.ScripList[this.systemIndex].scripts = res.data.scripts;
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },
        AddScript(){
          let Obj = {
            "script_number": this.ProNum,
            "name": this.ScriptName,
            "info": this.textarea,
            "page_system":this.systemID
          }
          this.$http.post(this.$conf.env.AddScriptList,Obj).then(res=>{
            console.log(res);
            this.$alert.successTit(this,'增加成功')
            this.GetScriptNum()
            this.beforeCloseDialog()
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },



        //进入到某个脚本管理
        GoManage(id){
            this.$router.push({
              name:'Script',
              query:{
                id:id
              }
            })
        },



        //关闭弹窗回掉
        beforeCloseDialog(){
          this.ProNum = this.ScriptName = this.textarea = this.systemID = '';
          this.dialogVisible = false
        }
      },
      created() {
          this.GetScriptList()
      },
    }
</script>

<style lang="scss">

  .ScriptManContent{
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
      .ScriptManSection{
        width: 100%;
        height: 100%;
        background: #fff;
        padding: .2rem .39rem 0 .46rem;
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
        }
        .ProList{
          width: 100%;
          height: 7.5rem;
          margin-top:.5rem;
          font-size:.14rem;
          .ProN{
            ul{
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              li{
                width:3.48rem;
                height:2.3rem;
                background:url("../../assets/img/scriptbj.png") no-repeat;
                background-size: 100% 100%;
                border-radius:9px;
                margin-right: .46rem;
                margin-bottom: .28rem;
                &:nth-child(4n){
                  margin-right: 0;
                }
                & > div{
                  width: 100%;
                  height: 100%;
                  padding: .46rem .32rem  0 .32rem;
                  box-sizing: border-box;
                  & > div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div{
                      img{
                        width:.23rem;
                        height:.23rem;
                        vertical-align: middle;
                        margin-right: .09rem;
                      }
                      font-size:.22rem;
                      color:rgba(255,255,255,1);
                      line-height: .23rem;
                      cursor: pointer;
                    }
                  }
                }
                p{
                  font-size:.18rem;
                  color:rgba(255,255,255,1);
                  line-height:.18rem;
                  text-align: center;
                }
                h2{
                  font-size:.48rem;
                  color:rgba(255,255,255,1);
                  line-height: 1.25rem;
                }
              }
            }
          }
          .el-dialog{
            width:6.3rem;
            height:6.8rem;
            background:rgba(255,255,255,1);
            border-radius:6px;
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
              .Label{
                font-size:.19rem;
                line-height: .5rem;
                font-family:Microsoft YaHei;
                color:rgba(44,43,43,1);
              }
              input{
                width:5.4rem;
                height:.53rem;
                border:1px solid rgba(230,230,230,1);
                display: block;
                background: transparent;
                outline: none;
                text-indent: .27rem;
                line-height: .53rem;
              }
              textarea{
                width:5.4rem;
                resize: none;
              }
            }
            .el-dialog__footer{
              padding: 0;
              text-align: center;
              margin-top: .5rem;
            }
          }
        }
      }
    }
    .el-dialog__wrapper{
      position: absolute;
    }
  }

  .el-message{
    min-width: 2.8rem;
    width: 2.8rem;
    .el-icon-info,.el-icon-success{
      font-size: .24rem;
    }
  }
</style>
