<template>
   <div class="PMContent">
    <!--    头部-->
    <div class="Header">
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="PerSonneSection">
        <div class="MenuHeader">
            <div class="title-name">设备管理员——权限配置</div>
        </div>
        <div class="tab">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                 <div class="th">
                    <div class="td">模块</div>
                    <div class="td">子模块</div>
                </div>
                <div class="tr" v-for="(item,index) in allList" :key="index">
                    <div class="td">
                        {{item.total}}
                    </div>
                    <div class="td">
                        <el-checkbox v-for="(val,inx) in item.detail" :key="inx" :label="val.id">{{val.name}}</el-checkbox>
                    </div>
                </div>

                <div class="tr">
                    <div class="td">
                        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
                    </div>
                    <div class="td">
                        <el-button type="primary" @click="saveqx">保存</el-button>
                    </div>
                </div>
    
            </el-checkbox-group>
           
        </div>
      </div>
    </div>

  
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo";
export default {
  name: "qxpz",
  components: { UserInfo },
  data(){
      return{
        checkedCities : [],
        allList : [],
        isIndeterminate: true,
        checkAll : false
      }
  },
  methods:{
      handleCheckedCitiesChange(){

      },
      handleCheckAllChange(val){
          console.log(val)
      },
      saveqx(){
          let obj = {
              group : this.$route.query.id,
              permissions : this.checkedCities
          }
        this.$http.post(this.$conf.env.qzchange,obj).then(res=>{
            this.$alert.successTit(this,'修改成功')
            this.$router.go(-1)
        }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
        });
      }
  },
  mounted(){
        this.$http.get(this.$conf.env.qxpzlist).then(res=>{
            console.log(res)
        this.allList = res.data
        this.$http.get(this.$conf.env.qxsuc + `${this.$route.query.id}/`).then(res=>{
            this.checkedCities = res.data.message
        }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
        });
      }).catch(err=>{
        this.$alert.errorTit(this,err.response.data.err)
      });
  }

}
</script>

<style lang="scss">
    .PMContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .Header {
    width: 100%;
    height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(2, 24, 68, 0.08);
    padding-left: 0.58rem;
    padding-right: 0.87rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .SearchBox {
      width: 4rem;
      height: 0.45rem;
      background: rgba(242, 242, 242, 1);
      border-radius: 23px;
      display: flex;
      input {
        width: 3.28rem;
        height: 100%;
        background: transparent;
        border: 0;
        outline: none;
        border-top-left-radius: 23px;
        border-bottom-left-radius: 23px;
        text-indent: 24px;
      }
      .SearchBut {
        width: 0.72rem;
        height: 100%;
        border-top-right-radius: 23px;
        border-bottom-right-radius: 23px;
        background: url("../../assets/img/search.png") center no-repeat;
        background-size: 0.26rem 0.28rem;
        cursor: pointer;
      }
    }
  }
  .Menu {
    flex: 1;
    box-sizing: border-box;
    background: #f4f4f4;
    padding: 0.1rem 0.12rem;
    overflow: hidden;
    .PerSonneSection {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 0.2rem 0.75rem 0 0.52rem;
      box-sizing: border-box;
      overflow-y: scroll;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0.12rem; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #e6e6e6;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        border-radius: 0;
        background: transparent;
      }
      .MenuHeader {
        width: 100%;
        height: 0.45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-name{
            font-size: .24rem;
            color: #393b6a;
        }
      }
      .tab{
          .th{
              width: 100%;
              height: .41rem;
              display: flex;
              .td{
                  text-align: center !important;
                  line-height: .41rem;
              }
          }
          .tr{
              width: 100%;
              height: .59rem;
              display: flex;
              &:last-child{
                  .td{
                    border-bottom: 1px solid #393B6A;
                  }
              }
          }
          .td{
                border: 1px solid #393B6A;
                border-bottom: 0;
                height: 100%;
                box-sizing: border-box;
                font-size: .16rem;
                color: #333333;
                line-height: .59rem;
              &:first-child{
                width: 2.01rem;
                border-right: 0;
                padding-right: .2rem;
                text-align: center;
              }
              &:last-child{
                padding-left: .2rem;
                width: calc(100% - 2.01rem);
              }
          }
      }
    }
  }
}
</style>