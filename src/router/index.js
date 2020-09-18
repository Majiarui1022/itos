import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import ForgetPass from '@/components/ForgetPass'
import layout from '@/components/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/ForgetPass',
      name: 'ForgetPass',
      component: ForgetPass
    },
    {
      path: '/layout',
      name: 'layout',
      redirect: '/index',
      component: layout,
      children:[
        {
          path: '/index',
          name: 'index',
          component: ()=> import('@/view/index/index'),
        },
        {
          path: '/task',
          name: 'task',
          component: ()=> import('@/view/index/task'),
        },
        {
          path: '/settask',
          name: 'settask',
          component: ()=> import('@/view/index/settask'),
        },
        {
          path: '/PM',
          name: 'PM',
          component: ()=> import('@/view/PM/PM'),
        },
        {
          path: '/Script',
          name: 'Script',
          component: ()=> import('@/view/Script/Script'),
        },
        {
          path: '/ScriptManage',
          name: 'ScriptManage',
          component: ()=> import('@/view/Script/ScriptManage'),
        },
        {
          path: '/equipment',
          name: 'equipment',
          component: ()=> import('@/view/equipment/equipment'),
        },
        {
          path: '/addequip',
          name: 'addequip',
          component: ()=> import('@/view/equipment/addequip'),
        },
        {
          path: '/ControllerManage',
          name: 'ControllerManage',
          component: ()=> import('@/view/ControllerManage/ControllerManage'),
        },
        {
          path: '/personnelManage',
          name: 'personnelManage',
          component: ()=> import('@/view/personnelManage/personnelManage'),
        },
        {
          path: '/JurisdictionManage',
          name: 'JurisdictionManage',
          component: ()=> import('@/view/JurisdictionManage/JurisdictionManage'),
        },
        {
          
          path: '/qxpz',
          name: 'qxpz',
          component: ()=> import('@/view/JurisdictionManage/qxpz'),
          
        },
        {
          path: '/ModuleManage',
          name: 'ModuleManage',
          component: ()=> import('@/view/ModuleManage/ModuleManage'),
        },
        {
          path: '/bigScreen',
          name: 'bigScreen',
          component: ()=> import('@/view/bigScreen/bigScreen'),
        },
        {
          path: '/overview',
          name: 'overview',
          component: ()=> import('@/view/overview/overview'),
        },
        {
          path: '/ScriptConfig',
          name: 'ScriptConfig',
          component: ()=> import('@/view/index/ScriptConfig'),
        },
        {
          path: '/locationSet',
          name: 'locationSet',
          component: ()=> import('@/view/locationSet/locationSet'),
        },
        {
          path: '/ScriptAllocation',
          name: 'ScriptAllocation',
          redirect: '/ScriptFirst',
          component: ()=> import('@/view/Script/ScriptContent/ScriptAllocation'),
          children:[
            {
              path: '/TimeConfig',
              name: 'TimeConfig',
              component: ()=> import('@/view/Script/ScriptContent/children/TimeConfig'),
            },
            {
              path: '/ConfigurationScript',
              name: 'ConfigurationScript',
              component: ()=> import('@/view/Script/ScriptContent/children/ConfigurationScript'),
            },
            {
              path: '/ScriptFirst',
              name: 'ScriptFirst',
              component: ()=> import('@/view/Script/ScriptContent/children/ScriptFirst'),
            },
          ]
        }
      ]
    },
    {
      path: '/ShowScreen',
      name: 'ShowScreen',
      component:() => import('@/view/ShowScreen/ShowScreen'),
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component:() => import('@/view/ceshi'),
    },
    {
      path: '/tanguanControl',
      name: 'tanguanControl',
      redirect: '/tanguanmenu',
      component:() => import('@/view/index/tanguan/tanguanControl'),
      children:[
        {
          path: '/tanguanmenu',
          name: 'tanguanmenu',
          component:() => import('@/view/index/tanguan/tanguanmenu'),
        },
        {
          path: '/tanguanDBC',
          name: 'tanguanDBC',
          component:() => import('@/view/index/tanguan/tanguanDBC'),
        }
      ]
    }
  ]
})
