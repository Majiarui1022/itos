<template>
  <div style="height:2rem;" class="rollScreen_container" id ="rollScreen_container">
    <ul class="rollScreen_list" :style = {transform:transform} :class="{rollScreen_list_unanim:num===0}">
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index :style="{height:height+'rem'}">
        <span>{{item}}</span>
      </li>
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index+contentArr.length :style="{height:height+'rem'}">
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'ceshi',
    props: {
      height: {
        default: .28,
        type: Number
      },
      lineNum: {
        default: 5,
        type: Number
      }
    },
    data: function () {
      return {
        contentArr: ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6', '内容7'],
        num: 0
      }
    },
    computed: {
      transform: function () {
        return 'translateY(-' + this.num * this.height + 'rem)'
      }
    },
    created: function () {
      let _this = this
      setInterval(function () {
        if (_this.num !== _this.contentArr.length) {
          _this.num++
        } else {
          _this.num = 0
        }
      }, 3000)
    }
  }
</script>

<style>
  .rollScreen_container{
    display: inline-block;
    position:relative;
    overflow: hidden;
    font-size: .2rem;
  }
  .rollScreen_list{
    transition: 1s linear;
  }
  .rollScreen_list_unanim{
    transition: none
  }
</style>
