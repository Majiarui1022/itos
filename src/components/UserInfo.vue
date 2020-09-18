<template>
    <div class="Public">
      <div class="UserInfo">
        <div style="width: .72rem;height: 100%" @click="drawer = true">
          <el-badge :value="MassageNum" class="item" :hidden="MassageNum > 0 ? false : true">
            <el-button size="small"><img src="../assets/img/Email.png" alt="" class="Email"></el-button>
          </el-badge>
        </div>
        <img class="UserHeader" :src="imUrl ? imUrl : require('../assets/img/head.png')" alt="">
        <span class="UserName">{{headerImg}}</span>
        <img class="ShowPer" :class="Show === true?'active':''" @click.stop="ChangePer" src="../assets/img/bottom.png" alt="" style="cursor: pointer">
        <div class="userClose" :class="Show === true?'active':''">
          <span @click="CloseLogin">退出登录</span>
        </div>
      </div>



      <el-drawer
        title=""
        :visible.sync="drawer"
        direction="rtl"
        :append-to-body="false"
        custom-class="IndexName">
        <div class="body-fax">
          <div class="tit-fax">
            <div class="row" 
            v-for="(item,index) in Titlist" 
            :key="index"
            @click="SelelctList(item,index)"
            >
            <i class="reading-top" v-if="item.unread"></i>
            {{item.label == 'task' ? '任务信息' : item.label == 'check' ? '审核信息' : '设备信息'}}
            </div>
            <div class="border-falx" :style="{'transform' : `translateX(${(this.selectIndex * 1.2) + 0.2}rem)`}" ></div>
          </div>
          <div class="mes-list" @scroll.passive="getScroll($event)">
            <div class="mes-quer" v-for="(item,index) in NewsList" :key="index">
              <p class="msg-tiemr">{{item.create_time}}</p>
              <div class="menu">
                <div class="menu-tit">
                  <div class="mes-fa">
                    <img src="../assets/img/mesage.png" alt="">
                    <span>任务信息</span>
                  </div>
                  <div class="remove">
                    <img src="../assets/img/removeP.png" alt="" @click="removeMessage(item.id,index)">
                  </div>
                </div>
                <div class="menu-status-conf">{{item.content.text}}</div>
                <div class="menu-info" v-if="item.content.reason">{{item.content.reason}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
</template>


<script>
    export default {
        name: "UserInfo",
      data(){
          return{
            drawer:false,
            MassageNum:0,        //未读消息数
            NewsList:[],
            Show:false,
            headerImg:sessionStorage.getItem('name'),
            imUrl:sessionStorage.getItem('headimg'),
            Titlist : [],
            selectIndex : 0,
            nextUrl : null,
            page : 1
          }
      },
      methods:{
        
        //切换顶部列表
        SelelctList(itme,index){
          this.selectIndex = index;
          this.NewsList = []
          this.page = 1
          this.GetNews(itme.label,index);
          this.$http.put(this.$conf.env.ChangeNewsStatus,{'category':itme.label}).then(res=>{
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

          //获取所有通知信息
        GetNews(name,index){
          this.$http.get(this.$conf.env.NewsTit + `?notification_message__category=${name}&page=${this.page}`).then(res=>{
            this.getTitleList()
            this.getnumber()
            this.NewsList = this.NewsList.concat(res.data.results)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        getnumber(){
          this.$http.get(this.$conf.env.NewsLength).then(res=>{
            this.MassageNum = res.data.message
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
       
        removeMessage(id,index){
          this.$http.delete(this.$conf.env.RemoveNews + `${id}/`).then(res=>{
            $(".mes-quer").eq(index).hide(300);
            setTimeout(()=>{
              this.NewsList.splice(index,0)
              this.getnumber()
            },300)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //退出登录
        CloseLogin(){
          sessionStorage.clear()
          this.$router.push({
            name:'login'
          })
        },
        ChangePer(){
          this.Show = !this.Show
        },


        getTitleList(){
          this.$http.get(this.$conf.env.getMessageTit).then(res=>{
            this.Titlist = res.data.message;
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        getScroll(event) {
          // 滚动条距离底部的距离scrollBottom
          let scrollBottom =
            event.target.scrollHeight -
            event.target.scrollTop -
            event.target.clientHeight;
          if (this.nextUrl != null && scrollBottom < 60) {
            this.page++
          }
        },


      },
      mounted(){
        var that = this
        $('body').click(()=>{
          that.Show = false
        })
        this.getTitleList()
        this.GetNews('task',4)
      },
      created() {
      },
    }
</script>

<style lang="scss">

  .Public{
    .UserInfo{
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .userClose{
        width: 1.2rem;
        position: absolute;
        top: .5rem;
        right: 0;
        background: #fff;
        height: 0;
        border-radius: 5px;
        box-shadow:0 10px 20px 0 rgba(25,25,25,0.2);
        transition:height .4s,opacity .4s,background .4s,color .4s;
        font-size: .16rem;
        text-align: center;
        line-height: .4rem;
        color: #000;
        opacity: 0;
        span{
          cursor: pointer;
        }
        &.active{
          height: .4rem;
          opacity:1;
        }
        &:hover{
          background: #000;
          color: #fff;
        }
      }
      .el-badge{
        display: flex;
        align-items: center;
        width: .38rem;
        height: 100%;
        button{
          display: block;
        }
      }
      .el-badge__content{
        font-size: .12rem;
        height: .16rem;
        line-height: .16rem;
      }
      .el-badge__content.is-fixed{
        transform: translateY(63%) translateX(100%);
        top: -.2rem;
      }
      .el-button--small, .el-button--small.is-round{
        padding: 0;
        border: 0;
      }
      .Email{
        width: .38rem;
        height: .29rem;
      }

      .UserHeader{
        width:.54rem;
        height:.54rem;
        border-radius:50%;
        margin-right: .2rem;
      }
      .UserName{
        font-size:.24rem;
        font-family:Microsoft YaHei;
        color:rgba(43,43,43,1);
      }
      .ShowPer{
        width:.22rem;
        height:.12rem;
        margin-left: .1rem;
        transition:transform .4s;
        transform: rotateZ(-90deg);
        transform-origin:.11rem .06rem;
        &.active{
          transform: rotateZ(0deg);
        }
      }
    }
    //左侧弹窗
    .IndexName{
      width:3.6rem !important;
      background:rgba(57,59,107,1);
      box-shadow:0px 3px 1px 0px rgba(2,24,68,0.1);
      .el-drawer__header{
        display: none;
      }
      .el-drawer__body{
        width: 100%;
        overflow: hidden;
        .body-fax{
          width: 100%;
          height: 100%;
          .tit-fax{
            width: 100%;
            height: .4rem;
            display: flex;
            position: relative;
            .row{
              width: .8rem;
              margin:0 .2rem;
              height: .4rem;
              font-size: .14rem;
              font-weight: 400;
              text-align: center;
              color:#A7B1C2;
              line-height: .4rem;
              cursor: pointer;
              position: relative;
              .reading-top{
                position: absolute;
                right: .05rem;
                top: .1rem;
                width: .06rem;
                height: .06rem;
                background: #ff0606;
                border-radius: 50%;
              }
            }
            .border-falx{
              width: .8rem;
              height: 2px;
              background: red;
              position: absolute;
              left: 0;
              bottom: 0;
              z-index: 2;
             
              transition : transform .3s;
            }
            &::after{
              content: "";
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 2px;
              background-color: #E4E7ED;
              z-index: 1;
            }
          }
          .mes-list{
            width: 100%;
            height: calc(100% - .4rem);
            padding: .2rem .1rem .2rem .1rem;
            box-sizing: border-box;
            overflow-y: auto;
            .mes-quer{
              .msg-tiemr{
                height: .4rem;
                font-size: .14rem;
                text-align: center;
                color: #a7b1c2;
                line-height: .4rem;
              }
              .menu{
                width: 100%;
                background: #45477a;
                padding: .15rem;
                box-sizing: border-box;
                border-radius: .06rem;
                .menu-tit{
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  height: .2rem;
                  align-items: center;
                  .mes-fa{
                    display: flex;
                    justify-content: space-between;
                    img{
                      width: .18rem;
                      height: .18rem;
                      margin-right: .06rem;
                    }
                    span{
                      font-size: .14rem;
                      color: #ffffff;
                    }
                  }
                  .remove{
                    img{
                      width: .13rem;
                      height: .18rem;
                      display: block;
                      cursor: pointer;
                    }
                  }
                }
                .menu-status-conf{
                  font-size: .14rem;
                  color: #ffffff;
                  line-height: .24rem;
                  margin: .1rem 0;
                }
                .menu-info{
                  width: 100%;
                  padding: .1rem;
                  box-sizing: border-box;
                  font-size: .14rem;
                  color: #272962;
                  line-height: .24rem;
                  background: #8C8EBF;
                }
              }
            }
            &::-webkit-scrollbar {/*滚动条整体样式*/
              width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              background: #45477A;
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
              border-radius: 0;
            }

          }
        }
      }
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
