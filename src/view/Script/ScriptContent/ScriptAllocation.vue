<template>
  <div class="ScriptContent">
    <div class="Header">
      <!-- <div class="SearchBox"> -->
        <!-- <input type="text" placeholder="请输入项目名称或控制器名称" v-model="producename" @keyup.enter="getlist">
        <div class="SearchBut" @click="getlist"></div> -->
      <!-- </div> -->
      <UserInfo></UserInfo>
    </div>
    <div class="script-menu">
      <div class="script-label">
        <div class="script-fir">Script</div>
        <div class="script-threshold">Threshold</div>
        <div class="script-timing">Timing</div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo";
export default {
  name: "ScriptAllocation",
  components: { UserInfo },
  data(){
    return{
    }
  }
};
</script>

<style scoped lang="scss">
.ScriptContent {
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
          background: url("../../../assets/img/search.png") center no-repeat;
          background-size: .26rem .28rem;
          cursor: pointer;
        }
      }
    }
    .script-menu{
      flex: 1;
      width: 100%;
      padding: .1rem .12rem;
      box-sizing: border-box;
      .script-label{
        width: 100%;
        height: .4rem;
        background: #393b6a;
        display: flex;
        &> div{
          width: 1rem;
          height: 100%;
          font-size: .16rem;
          text-align: left;
          color: #ffffff;
          line-height: .4rem;
          text-align: center;
          cursor: pointer;
        }
      }
     
    }
  }
</style>
