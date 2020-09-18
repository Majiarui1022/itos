<template>
  <div class="LayoutBox">
    <div class="Layout">
      <div class="Aside">
        <div class="Tit">iTos</div>
        <div class="List">
          <el-menu
            :default-active="path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="selectMenu"
            background-color="#393B6A"
            text-color="#A7B1C2"
            active-text-color="#FFF"
          >
            
            <el-menu-item index="/overview">
              <i class="el-icon-menu"></i>
              <span slot="title">概览</span>
            </el-menu-item>
            <el-menu-item index="/PM">
              <i class="el-icon-document"></i>
              <span slot="title">项目管理</span>
            </el-menu-item>
            <el-menu-item index="/task">
              <i class="el-icon-reading"></i>
              <span slot="title">任务管理</span>
            </el-menu-item>
             <el-menu-item index="/Script">
              <i class="el-icon-document"></i>
              <span slot="title">脚本管理</span>
            </el-menu-item>
             <el-menu-item index="/equipment">
              <i class="el-icon-refrigerator"></i>
              <span slot="title">设备管理</span>
            </el-menu-item>
             <el-menu-item index="/ControllerManage">
              <i class="el-icon-film"></i>
              <span slot="title">控制器管理</span>
            </el-menu-item>
             <el-menu-item index="/ModuleManage">
              <i class="el-icon-receiving"></i>
              <span slot="title">模块管理</span>
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/personnelManage">人员管理</el-menu-item>
                <el-menu-item index="/JurisdictionManage">权限管理</el-menu-item>
                <el-menu-item index="/locationSet">位置管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/bigScreen">
              <i class="el-icon-s-platform"></i>
              <span slot="title">大屏管理</span>
            </el-menu-item>
          </el-menu>

          <!-- <ul>
            <li>
              <router-link
                to="/overview"
                :class="$route.path === '/overview' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/overview'"></i>
                <img :src="$route.path === '/overview'?imgOneED:imgOne" alt />
                <span>概览</span>
              </router-link>
            </li>
            <li>
              <router-link to="/PM" :class="$route.path === '/PM' ?'active row' : 'row'">
                <i v-if="$route.path === '/PM'"></i>
                <img :src="$route.path === '/PM'?imgTwoED:imgTwo" alt />
                <span>项目管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/task" :class="$route.path === '/task' ?'active row' : 'row'">
                <i v-if="$route.path === '/task'"></i>
                <img :src="$route.path === '/task'?imgThreeED:imgThree" alt />
                <span>任务管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/Script" :class="$route.path === '/Script' ?'active row' : 'row'">
                <i v-if="$route.path === '/Script'"></i>
                <img :src="$route.path === '/Script'?imgFourED:imgFour" alt />
                <span>脚本管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/equipment"
                :class="$route.path === '/equipment' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/equipment'"></i>
                <img :src="$route.path === '/equipment'?imgFourED:imgFour" alt />
                <span>设备管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/ControllerManage"
                :class="$route.path === '/ControllerManage' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/ControllerManage'"></i>
                <img :src="$route.path === '/ControllerManage'?imgFiveED:imgFive" alt />
                <span>控制器管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/ModuleManage"
                :class="$route.path === '/ModuleManage' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/ModuleManage'"></i>
                <img :src="$route.path === '/ModuleManage'?imgSixED:imgSix" alt />
                <span>模块管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/personnelManage"
                :class="$route.path === '/personnelManage' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/personnelManage'"></i>
                <img :src="$route.path === '/personnelManage'?imgSevenED:imgSeven" alt />
                <span>人员管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/JurisdictionManage"
                :class="$route.path === '/JurisdictionManage' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/JurisdictionManage'"></i>
                <img :src="$route.path === '/JurisdictionManage'?imgEightED:imgEight" alt />
                <span>权限管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/locationSet"
                :class="$route.path === '/locationSet' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/locationSet'"></i>
                <img :src="$route.path === '/locationSet'?imgEightED:imgEight" alt />
                <span>位置管理</span>
              </router-link>
            </li>
            
            <li>
              <router-link
                to="/bigScreen"
                :class="$route.path === '/bigScreen' ?'active row' : 'row'"
              >
                <i v-if="$route.path === '/bigScreen'"></i>
                <img :src="$route.path === '/bigScreen'?imgNightED:imgNight" alt />
                <span>大屏管理</span>
              </router-link>
            </li>
          </ul>-->
        </div>
      </div>
      <div class="Section">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      imgOne: require("../assets/img/overviewimged.png"),
      imgOneED: require("../assets/img/overvireimg.png"),
      imgTwo: require("../assets/img/product.png"),
      imgTwoED: require("../assets/img/producted.png"),
      imgThree: require("../assets/img/task.png"),
      imgThreeED: require("../assets/img/tasked.png"),
      imgFour: require("../assets/img/script.png"),
      imgFourED: require("../assets/img/scripted.png"),
      imgFive: require("../assets/img/controller.png"),
      imgFiveED: require("../assets/img/controllered.png"),
      imgSix: require("../assets/img/module.png"),
      imgSixED: require("../assets/img/moduleed.png"),
      imgSeven: require("../assets/img/personnel.png"),
      imgSevenED: require("../assets/img/personneled.png"),
      imgEight: require("../assets/img/jurisdiction.png"),
      imgEightED: require("../assets/img/jurisdictioned.png"),
      imgNight: require("../assets/img/largeScreen.png"),
      imgNightED: require("../assets/img/largeScreened.png"),
      path : ''
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectMenu(index,indexPath){
      this.$router.push(index)
    },
     onRouteChanged () {
      let that = this
      that.path  = that.$route.path
    }
  },
  mounted(){
      let that = this
      that.path  = that.$route.path
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'onRouteChanged'
  }
};
</script>

<style scoped lang="scss">
$width: 19.206rem;
$height: 10.806rem;
.LayoutBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .Layout {
    width: $width;
    height: $height;
    display: flex;
    margin: 0 auto;
    .Aside {
      width: 2.6rem;
      height: 100%;
      background: #393b6a;
      .Tit {
        font-size: 0.48rem;
        font-family: Microsoft YaHei;
        color: rgba(255, 255, 255, 1);
        line-height: 0.9rem;
        margin-bottom: 0.3rem;
        text-align: center;
      }
      .List {
        ul {
          li {
            width: 100%;
            .row {
              width: calc(100% - 4px - 0.5rem);
              height: 100%;
              padding-left: 0.5rem;
              display: flex;
              align-items: center;
              position: relative;
              img {
                margin-right: 0.21rem;
                width: 0.28rem;
                height: 0.28rem;
              }
              span {
                font-size: 0.18rem;
                color: rgba(255, 255, 255, 1);
                line-height: 0.66rem;
              }
              i {
                width: 4px;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: #fff;
              }
              &.active {
                background: #32335d;
              }
            }
          }
        }
      }
    }
    .Section {
      width: calc(100% - 2.6rem);
      flex: 1;
    }
  }
}
</style>
