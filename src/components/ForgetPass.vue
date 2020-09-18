<template>
  <div class="BigFatBox">
    <div class="LoginBox">
      <div class="Login">
        <img src="../assets/img/tit.png" alt="" class="BackLogin">
        <div class="LoginUser">
          <p class="UserTit">
            <img src="../assets/img/back.png" alt="" @click="GoBack">
            找回密码</p>
          <div class="writeWord">
            <div class="LoginIcon">
              <img src="../assets/img/user.png" alt="">
            </div>
            <input type="number" v-model="form.mobile" placeholder="请输入手机号码">
          </div>
          <div class="writeWord">
            <div class="LoginIcon">
              <img src="../assets/img/CodeIcon.png" alt="">
            </div>
            <input type="text" placeholder="请输入验证码" v-model="form.sms_code">
            <div class="GetCode" @click="getcode">
              <p :style="{'cursor' : codestatus ? 'pointer' : 'default'}">{{codeinfo}}</p>
            </div>
          </div>
          <div class="writeWord">
            <div class="LoginIcon">
              <img src="../assets/img/pass.png" alt="">
            </div>
            <input type="password" v-model="form.password" placeholder="请输入密码">
          </div>
          <div class="writeWord">
            <div class="LoginIcon">
              <img src="../assets/img/pass.png" alt="">
            </div>
            <input type="password" v-model="form.password2" placeholder="请重新输入密码">
          </div>
          <div class="LoginBut" @click="forgetpass">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ForgetPass", 
    data(){
      return{
        codeinfo : '发送验证码',
        codestatus : true,            //true 可发  false  等待
        form :{
          mobile : '',
          sms_code : '',
          password : '',
          password2 : ''
        },
        timer : null,
      }
    },
    methods:{
      GoBack(){
        this.$router.go(-1)
      },
      getcode(){
          if( this.codestatus === false)return
          if(!(/^1[3456789]\d{9}$/.test(this.form.mobile))){ 
              this.$alert.errorTit(this,'请输入正确手机号码')
              this.codestatus = false
              return false; 
          } 
          this.$http.post(this.$conf.env.SendPhoneCode,{mobile : this.form.mobile}).then(res=>{
            console.log(res)
            this.countDowm()
          }).catch(err=>{

          })
      },

      //倒计时
      countDowm(){
        var num = 60;
        this.timer = setInterval(()=>{
          num--;
          this.codeinfo = '重新发送' + (num > 0 ? num : '');
          this.codestatus = num <= 0;
          if(num == 0){
            clearInterval(this.timer)
            this.codestatus = true
          }
        },1000)
      },


      //忘记密码
      forgetpass(){
        if(!(/^1[3456789]\d{9}$/.test(this.form.mobile))){ 
              this.$alert.errorTit(this,'请输入正确手机号码')
              return false; 
          } 
         if(this.form.sms_code == ''){ 
              this.$alert.errorTit(this,'验证码不能为空')
              return false; 
          } 
          if(this.form.password == ''){ 
              this.$alert.errorTit(this,'密码不能为空')
              return false; 
          } 
           if(this.form.password2 != this.form.password){ 
              this.$alert.errorTit(this,'两次密码输入不一致')
              return false; 
          } 

          this.$http.putfal(this.$conf.env.ForgetPass,this.form).then(res=>{
            console.log(res)
            this.$router.go(-1)
          }).catch(err=>{

          })
      }
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
        .BackLogin{
          width: 100%;
          display: block;
        }
        .LoginUser{
          width:100%;
          height:5.4rem;
          background:rgba(32,163,245,1);
          background: url("../assets/img/Forget.png") no-repeat;
          background-size: 100% 100%;
          margin-top: .36rem;
          padding: .2rem .58rem 0 .58rem;
          box-sizing: border-box;
          .UserTit{
            font-size:.32rem;
            font-family:haha;
            color:rgba(0,191,244,1);
            line-height:.68rem;
            position: relative;
            text-align: center;
            img{
              width: .44rem;
              height: .44rem;
              position: absolute;
              left: 0;
              top: .08rem;
              cursor: pointer;
              &:active{
                width: .4rem;
                height: .4rem;
                left: .02rem;
                top: .1rem;
              }
            }
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
            .GetCode{
              width: 1.45rem;
              height: 100%;
              padding: .07rem 0;
              p{
                line-height: .42rem;
                font-size:.24rem;
                font-family:Microsoft YaHei;
                color:rgba(4,171,225,1);
                text-align: center;
                border-left: 1px solid #00BFF4;
                &:active{
                  color: #0691bf;
                }
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
        }
      }
    }
  }
</style>
