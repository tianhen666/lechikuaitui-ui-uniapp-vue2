import dayjs from 'dayjs';
const getters = {
  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  userInfo: state => state.user.userInfo, // 用户信息
  tenantInfo: state => state.tenant.info, // 门店信息
  hasLogin: state => !!state.user.accessToken, // 判断是否登录
  hasLoginExpired: state => {
    return (state.user.expiresTime - dayjs().unix() * 1000 < 0)
  }, // 判断登录是否过期
  isMember: state => !!state.user.userInfo.rid, // 是否加入过某一个店铺
  isTenantExpired: state => {
    return (state.tenant.info.expireTime - dayjs().unix() * 1000 < 0)
  }, // 判断店铺是否过期
}
export default getters