<script>
import { GetQueryString, removeUrlParameters } from '@/utils/index.js';
import dayjs from 'dayjs';
export default {
  onLaunch: async function(options) {
    // 兼容 ios 通过 uni.navigateTo 路径不变的问题
    if (uni.getSystemInfoSync().platform === 'ios') {
      uni.setStorageSync('IOSPATH', window.location.href);
    }

    // 2.1 未登录
    if (!this.$store.getters.hasLogin || this.$store.getters.hasLoginExpired) {
      // 获取url 中的 微信返回的code 和 state
      const code = GetQueryString('code');
      const state = GetQueryString('state');
      // 3.1 有code,state
      if (code && state) {
        // 向服务发起登录请求, 如果返回的是token
        const loginWxCodeTokenRes = await this.$store.dispatch('loginWxCodeToken', {
          type: 31,
          code,
          state
        });
        // 如果授权登录返回的不是 token
        if (
          loginWxCodeTokenRes.tentId &&
          (!loginWxCodeTokenRes.accessToken ||
            !loginWxCodeTokenRes.expiresTime ||
            !loginWxCodeTokenRes.refreshToken)
        ) {
          // 清理vuex中的登录信息
          this.$store.commit('CLEAR_LOGIN_INFO');

          // 设置设置缓存中的门诊ID
          uni.setStorageSync('TENANTID', loginWxCodeTokenRes.tentId);
          // 设置ajax的请求头
          uni.$u.http.setConfig(defaultConfig => {
            defaultConfig.header['tenant-id'] = loginWxCodeTokenRes.tentId;
            return defaultConfig;
          });
          // 重新向服务器,发起获取微信授权链接请求, 清空当前url中的code,state,防止报错
          const newHref = removeUrlParameters(window.location.href, ['code', 'state']);
          const getWXSocialAuthRedirect = await this.$store.dispatch('getWXSocialAuthRedirect', {
            type: 31,
            redirectUri: newHref
          });
          window.location.href = getWXSocialAuthRedirect;
          return;
        }
      } else {
        // 3.2 没有code 和 state
        // 重新向服务器,发起获取微信授权链接请求,清空当前url中的code,state,防止报错
        const newHref = removeUrlParameters(window.location.href, ['code', 'state']);
        const getWXSocialAuthRedirectRes = await this.$store.dispatch('getWXSocialAuthRedirect', {
          type: 31,
          redirectUri: newHref
        });
        window.location.href = getWXSocialAuthRedirectRes;
        return;
      }
    }

    // 2.2 已登录
    // 从url中获取 tentId 携带门诊ID请求
    const urlTentId = Number(GetQueryString('tentId'));

    // url中TentId存在, 并且当前缓存中的门诊id和url中id 不相等
    if (urlTentId && urlTentId != uni.getStorageSync('TENANTID')) {
      // 向服务器发起用户切换门诊请求
      this._$mCutTenant({ id: urlTentId });
      return;
    }

    // 已登录获取门诊信息
    await this.$store.dispatch('getTenantInfo');
    // 已登录获取用户信息
    await this.$store.dispatch('ObtainUserInfo');

    // 放行
    this.$resolve();
  }
};
</script>

<style lang="scss">
/* 自定义icon */
@import 'static/icon/iconfont.css';

/** 引入全局基本样式 */
@import 'styles/base.scss';

/* 引入 uView 基础样式 */
@import '@/uni_modules/uview-ui/index.scss';

/*每个页面公共scss */
@import 'app.scss';
</style>
