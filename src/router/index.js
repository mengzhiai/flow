/*
 * @Author: your name
 * @Date: 2019-11-21 08:56:39
 * @LastEditTime: 2019-12-02 15:07:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \drag\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import flowMain from '../views/flowMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'flowMain',
    component: flowMain
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
