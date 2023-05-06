 import {
   getTenant
 } from '@/api/materialLibrary.js';

 const tenant = {
   state: {
     info: {},
   },
   mutations: {
     //设置门诊信息
     SET_INFO(state, data) {
       state.info = data
     },
   },
   actions: {

     // 获取门诊信息
     async getTenantInfo({ state, commit }) {
       try {
         const res = await getTenant()
         commit('SET_INFO', res.data)
       } catch (error) {
         // #ifdef H5
         console.log(error)
         //清楚缓存
         uni.clearStorage()
         //重新加载
         window.location.reload()
         // #endif
       }

     }
   }
 }
 export default tenant