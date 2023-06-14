import {
  getTenantUser,
  getShareUser
} from '@/api/materialLibrary.js';
import {
  passwordLogin,
  smsLogin,
  weixinMiniAppLogin,
  logout,
  socialAuthRedirect,
  wxCodeToken
} from '@/api/auth'

const AccessTokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'
const ExpiresTimeKey = 'EXPIRES_TIME'
const user = {
  state: {
    accessToken: uni.getStorageSync(AccessTokenKey), // 访问令牌
    refreshToken: uni.getStorageSync(RefreshTokenKey), // 刷新令牌
    expiresTime: uni.getStorageSync(ExpiresTimeKey) || 0, // 过期时间
    userInfo: {}, // 个人的用户信息
    invitationInfo: {}, // 邀请人的用户信息
  },
  mutations: {
    // 设置邀请人的用户信息
    SET_INVITATION_INFO(state, data) {
      state.invitationInfo = data || {}
    },

    // 更新 state 的通用方法
    SET_STATE_ATTR(state, param) {
      if (param instanceof Array) {
        for (let item of param) {
          state[item.key] = item.val
        }
      } else {
        state[param.key] = param.val
      }
    },
    // 更新令牌
    SET_TOKEN(state, data) {
      // 设置令牌
      const {
        accessToken,
        refreshToken,
        expiresTime
      } = data

      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.expiresTime = expiresTime
      uni.setStorageSync(AccessTokenKey, accessToken)
      uni.setStorageSync(RefreshTokenKey, refreshToken)
      uni.setStorageSync(ExpiresTimeKey, expiresTime)

    },
    // 更新用户信息
    SET_USER_INFO(state, data) {
      state.userInfo = data || {}
    },
    // 清空令牌 和 用户信息
    CLEAR_LOGIN_INFO(state) {
      uni.removeStorageSync(AccessTokenKey)
      uni.removeStorageSync(RefreshTokenKey)
      uni.removeStorageSync(ExpiresTimeKey)
      state.accessToken = ''
      state.refreshToken = ''
      state.expiresTime = 0
      state.userInfo = {}
      state.invitationInfo = {}
    }
  },
  actions: {
    //账号登录
    Login({ state, commit }, { type, data }) {
      if (type === 0) {
        return passwordLogin(data)
          .then(res => {
            commit('SET_TOKEN', res.data)
            return Promise.resolve(res)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      } else if (type === 1) {
        return smsLogin(data)
          .then(res => {
            commit('SET_TOKEN', res.data)
            return Promise.resolve(res)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      } else {
        return weixinMiniAppLogin(data)
          .then(res => {
            commit('SET_TOKEN', res.data)
            return Promise.resolve(res)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }
    },

    // 退出登录
    Logout({ state, commit }) {
      return logout()
        .then(res => {
          return Promise.resolve(res)
        })
        .catch(err => {
          return Promise.reject(err)
        })
        .finally(() => {
          commit('CLEAR_LOGIN_INFO')
        })
    },

    // 获取邀请人的信息
    async invitationInfoFun({ state, commit }, data) {
      const res = await getShareUser(data)
      commit('SET_INVITATION_INFO', res.data)
    },

    // 获得用户基本信息
    async ObtainUserInfo({ state, commit }) {
      const res = await getTenantUser()
      commit('SET_USER_INFO', res.data)
    },

    // 获取微信跳转链接
    async getWXSocialAuthRedirect({ state, commit }, data) {
      const res = await socialAuthRedirect(data)
      return Promise.resolve(res.data)
    },

    // 通过微信授权code登录系统
    async loginWxCodeToken({ state, commit }, data) {
      const res = await wxCodeToken(data)
      commit('SET_TOKEN', res.data)
      return Promise.resolve(res.data)
    }

  }
}
export default user