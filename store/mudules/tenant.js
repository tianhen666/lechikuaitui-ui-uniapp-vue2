 import {
   getTenant,
   getShareTenant
 } from '@/api/materialLibrary.js';

 const tenant = {
   state: {
     info: {},
     invitationInfo: {}
   },
   mutations: {
     //设置邀请人的门诊信息
     SET_INVITATION_TENANT_INFO(state, data) {
       state.invitationInfo = data
     },
     //设置门诊信息
     SET_TENANT_INFO(state, data) {
       state.info = data
     },
   },
   actions: {
     // 获取邀请人的门诊信息
     async getShareTenantInfo({ state, commit }, data) {
       const res = await getShareTenant(data)
       commit('SET_INVITATION_TENANT_INFO', res.data)
     },
     // 获取门诊信息
     async getTenantInfo({ state, commit }) {
       const res = await getTenant()
       commit('SET_TENANT_INFO', res.data)
     }
   }
 }
 export default tenant