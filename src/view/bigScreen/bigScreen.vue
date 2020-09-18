<template>
  <div class="JurisdContent">

    <!--    头部-->
    <div class="Header">
      <div class="JurisdBox" style="background: transparent">
      </div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="ScriptSection">
        <div class="MenuHeader">
          <span>权限管理</span>
        </div>
        <div class="ScreenContent">
          <div class="ScreenTit">
            <div class="LeftTit" style="cursor: pointer;" @click="ChangeScreen"><img src="../../assets/img/screen.png" alt=""><span>主屏幕</span></div>
            <div class="LeftTit"><span>当前投屏：{{controllerName}}</span></div>
          </div>
          <div class="OneRow">
            <div class="kongName">控制器名称</div>
            <div class="ProName">项目名称</div>
            <div class="operation">操作</div>
          </div>
          <div class="ScreenList">
            <ul>
              <li v-for="(item,index) in BigScreen" @click="ChangeIndex(index,item.id)" :class="index === IndexVal?'active':''">
                <div class="kongName">{{item.controller}}</div>
                <div class="ProName">{{item.project}}</div>
                <div class="operation">
                  <img v-if="index !== IndexVal" src="../../assets/img/competerED.png" alt="">
                  <img v-else src="../../assets/img/compter.png" alt="">
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "bigScreen",
      components: {UserInfo},
      data(){
        return{
          BigScreen:[],
          IndexVal:-1,
          controllerName:'主屏幕',
        }
      },
      methods:{
        //改变投屏显示  设定为投屏列表
        ChangeIndex(index,id){
          this.IndexVal = index

          this.$http.get(this.$conf.env.BigScreenList + `${id}/`).then(res=>{
            this.controllerName = this.BigScreen[index].controller;
            console.log(res)
            this.$alert.successTit(this,res.data.message)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //获取屏幕列表
        GetBigScreenList(){
          this.$http.get(this.$conf.env.BigScreenList).then(res=>{
            this.BigScreen = res.data
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //改变投屏显示  设定为指挥官大屏
        ChangeScreen(){
          this.IndexVal = -1
          this.$http.get(this.$conf.env.ChangeZhiBig).then(res=>{
            this.$alert.successTit(this,res.data.message)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

      },
      created() {
          this.GetBigScreenList()
      }
    }
</script>

<style lang="scss">

  .JurisdContent{
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
      .JurisdBox{
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
    .Menu{
      flex: 1;
      box-sizing: border-box;
      background: #F4F4F4;
      padding:.1rem .12rem;
      overflow: hidden;
      .ScriptSection{
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
          background: #7578C8;
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
        .ScreenContent{
          width: 100%;
          height: calc(100% - .45rem);
          background: #393B6B;
          .ScreenTit{
            width: 100%;
            height: .6rem;
            background: #393B6B;
            padding-left: .22rem;
            padding-right: .46rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
              display: flex;
              align-items: center;
              img{
                width:.37rem;
                height:.34rem;
                display: inline-block;
                vertical-align: middle;
                margin-right: .06rem;
              }
              span{
                font-size:.2rem;
                color:rgba(255,255,255,1);
              }
            }
          }
          /*OneRow  kongName  ProName  operation*/
          .OneRow{
            width: 100%;
            height: .4rem;
            overflow: hidden;
            color: #FFFFFF;
            font-size: .16rem;
            padding-left: .34rem;
            padding-right: .65rem;
            box-sizing: border-box;
            background: #4F53AF;
            .kongName{
              width: 20%;
              height: 100%;
              line-height: .4rem;
              float: left;
            }
            .ProName{
              width: 20%;
              height: 100%;
              line-height: .4rem;
              float: left;
            }
            .operation{
              float: right;
              height: 100%;
              line-height: .4rem;
            }
          }
          .ScreenList{
            width: 100%;
            height: calc(100% - 1rem);
            overflow: hidden;
            ul{
              height: 100%;
              overflow: scroll;
              li{
                width: 100%;
                height: .4rem;
                font-size: .16rem;
                color: #FFFFFF;
                background: #C3C5F1;
                padding-left: .34rem;
                padding-right: .65rem;
                box-sizing: border-box;
                overflow: hidden;
                .kongName{
                  width: 20%;
                  height: 100%;
                  line-height: .4rem;
                  float: left;
                }
                .ProName{
                  width: 20%;
                  height: 100%;
                  line-height: .4rem;
                  float: left;
                }
                .operation{
                  float: right;
                  height: 100%;
                  line-height: .4rem;
                  img{
                    width: .2rem;
                    height: .18rem;
                  }
                }
                &.active{
                  background:rgba(57,59,107,1);
                  box-shadow:0px 3px 1px 0px rgba(2,24,68,0.1);
                }
              }
              &::-webkit-scrollbar {/*滚动条整体样式*/
                width: .12rem;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 4px;
              }
              &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #7578C8;
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
    .el-dialog__wrapper{
      position: absolute;
    }
  }
</style>
