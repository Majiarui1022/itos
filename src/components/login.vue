<template>
  <div class="BigFatBox">
    <div class="LoginBox">
      <div class="Login">
        <img src="../assets/img/tit.png" alt="">
        <div class="LoginUser">
          <p class="UserTit">欢迎使用</p>
          <div class="writeWord">
            <div class="LoginIcon">
              <img src="../assets/img/user.png" alt="">
            </div>
            <input type="text" placeholder="请输入账号" v-model="UserMobile">
          </div>
          <div class="writeWord">
            <div class="LoginIcon">
              <img src="../assets/img/pass.png" alt="">
            </div>
            <input type="password" placeholder="请输入密码" v-model="UserPass">
          </div>
          <div class="LoginBut" v-on:click="GetLogin">确定</div>
          <router-link to="ForgetPass">忘记密码？</router-link>
        </div>
      </div>
      <div class="btv">
        <p>
          <span>©2019 控福（上海）智能科技有限公司 版权所有</span>
          <img src="../assets/img/icon.d0289dc.png" alt="">
          <a href="http://www.beian.miit.gov.cn">沪ICP备18031142号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        UserMobile:'kungfu001',
        UserPass:'123456'
      }
    },
    methods:{
      GetLogin(){
        let Obj = {
          "username": this.UserMobile,
          "password": this.UserPass
        }
        this.$http.post(this.$conf.env.LoginUser,Obj).then(res=>{
          sessionStorage.setItem('T_ok',res.data.token)
          sessionStorage.setItem('name',res.data.name)
          sessionStorage.setItem('headimg',res.data.head_img)
          this.$router.push({
            name:'overview'
          })
        }).catch(err=>{
          if(err.response.data.non_field_errors){
            this.$alert.errorTit(this,'账号或密码错误')
          }else{
            this.$alert.errorTit(this,'异常错误')
          }

        });
      }
    },
    mounted(){
      console.log(this)
    }
  }
</script>

<style scoped lang="scss">
  @import '../../static/font/font.css';
  $width:19.206rem;
  $height:10.806rem;
  .BigFatBox{
    width: 100%;
    height: 100%;
    background: #0B1430;
    overflow: hidden;
    .LoginBox{
      width: $width;
      height: $height;
      background: url("../assets/img/login.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      margin: 0 auto;
      .Login{
        width:6.31rem;
        height:4.8rem;
        position: absolute;
        left: 10.68rem;
        top: 2.77rem;
        img{
          width: 100%;
          display: block;
        }
        .LoginUser{
          width:100%;
          height:3.62rem;
          background:rgba(32,163,245,1);
          background: url("../assets/img/loginUser.png") no-repeat;
          background-size: 100% 100%;
          margin-top: .36rem;
          padding: .2rem .58rem 0 .58rem;
          box-sizing: border-box;
          .UserTit{
            font-size:.32rem;
            font-family:haha;
            color:rgba(0,191,244,1);
            line-height:.68rem;
            text-align: center;
          }
          .writeWord{
            width:5.15rem;
            height:.56rem;
            border:3px solid rgba(32,163,245,1);
            margin-bottom: .24rem;
            display: flex;
            .LoginIcon{
              height: 100%;
              width: .58rem;
              img{
                width: .28rem;
                height: .32rem;
                margin: .1rem auto 0;
                display: block;
              }
            }
            input{
              flex: 1;
              border:0;
              outline: none;
              background: transparent;
              font-size:.24rem;
              font-family:Microsoft YaHei;
              color:rgba(75,126,176,1);
              line-height:3.62rem;
              &::-webkit-input-placeholder{
                color:rgba(75,126,176,1);
              }
              &::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color:rgba(75,126,176,1);
              }
              &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color:rgba(75,126,176,1);
              }
              &:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color:rgba(75,126,176,1);
              }
            }
          }
          .LoginBut{
            width:5.15rem;
            height:.56rem;
            background:rgba(32,163,245,1);
            font-size:.32rem;
            font-family: haha;
            color:rgba(255,255,255,1);
            line-height:.56rem;
            text-align: center;
            cursor: pointer;
            &:active{
              background:#0783cb;
            }
          }
          a{
            display: block;
            text-align: right;
            font-size:.18rem;
            color:rgba(0,191,244,1);
            font-family: haha;
            line-height: .18rem;
            margin-top:.14rem;
            &:active{
              color:#0584ae;
            }
          }
        }
      }
      .btv{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        font-size: .14rem;
        text-align: center;
        line-height: .36rem;
        color: #666666;
        img{
          vertical-align: middle;
        }
        a{
          color: #fff;
        }
      }
    }
  }
</style>
