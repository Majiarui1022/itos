<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <router-view/>
    <div class="Loding"></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
  
    watch:{
      $route(to,from){
        $(".Loding").css({
          width:'100%',
          height:'100%',
          opacity:.7,
          background:'#fff',
          position:'fixed',
          top:0,
          left:0,
          zIndex:2,
          display:'block'
        })
        $(".Loding").animate(
          {
            opacity:.2,
            zIndex:-1
          },400);

        // setTimeout(()=>{
        //   $(".Loding").css({
        //     display:'none'
        //   })
        // },600)
        console.log('我执行了')
      }
    },
  }
</script>

<style>
</style>
