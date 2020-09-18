// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import $ from 'jquery'

import 'swiper/dist/css/swiper.css';

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

/**@name接口请求 */
import conf from "./config/index.js";
import http from "./track/http.js";

//原型定义
Vue.prototype.$http = http
Vue.prototype.$conf = conf



import scroll from 'vue-seamless-scroll'
Vue.use(scroll)


//公共CSS
import '../src/assets/style/public.scss'

import alert from '../src/assets/alert'
Vue.prototype.$alert = alert

Vue.config.productionTip = false

require('es6-promise').polyfill();
require('es6-promise/auto');

import {CountUp} from 'vue-ydui/dist/lib.rem/countup';//动态数据
Vue.component(CountUp.name, CountUp);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
