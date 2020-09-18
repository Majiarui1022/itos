<template>
  <div class="TanguanBox">
    <div class="TanTit">
      <p>碳罐脱附能力测试设备—控制器01</p>
      <div class="ExportTit">
        <router-link tag="div" :to="$route.path === '/tanguanDBC'? '/tanguanmenu':'/tanguanDBC'">{{$route.path === '/tanguanDBC'?'控制器':'DBC解析'}}</router-link>
        <div class="Expotr" @click="Showeldialog(false)">导出</div>
        <router-link tag="div" to="/index" class="Close">关闭</router-link>
      </div>
    </div>
    <div class="TanCantent">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
    export default {
        name: "tanguanControl",
      data() {
        return {

        }
      },
    }
</script>

<style lang="scss">

  .TanguanBox{
    width: 100%;
    height: 100%;
    .TanTit{
      width:100%;
      height:.8rem;
      background:rgba(5,25,40,1);
      position: relative;
      p{
        font-size:.28rem;
        font-family:SourceHanSansCN;
        color:rgba(131,182,223,1);
        text-align: center;
        line-height: .8rem;
      }
      .ExportTit{
        position: absolute;
        top: 0;
        right: 0;
        overflow: hidden;
        div{
          width:1rem;
          height:.8rem;
          text-align: center;
          line-height: .8rem;
          color: #83B6DF;
          font-size:.2rem;
          font-family:SourceHanSansCN;
          float: left;
          transition: background .3s ,color .3s;
          cursor: pointer;
          &:hover{
            background: #0AD2DA;
            color: #FFFFFF;
          }
        }
      }
    }
    .TanCantent{
      width: 100%;
      height: calc(100% - .8rem);
    }

  }

</style>































