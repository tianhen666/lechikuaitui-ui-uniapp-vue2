import dayjs from 'dayjs';
const getters = {
  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  userInfo: state => state.user.userInfo,
  hasLogin: state => !!state.user.accessToken,
  hasLoginExpired: state => {
    return (state.user.expiresTime - dayjs().unix() * 1000 > 0)
  }
}
export default getters