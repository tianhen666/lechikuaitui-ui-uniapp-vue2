<script>
import { isWechat, GetQueryString, removeUrlParameters } from '@/utils/index.js';
import dayjs from 'dayjs';
export default {
  onLaunch: function(options) {
    // 2.1 未登录
    if (!this.$store.getters.hasLogin || this.$store.getters.hasLoginExpired) {
      const code = GetQueryString('code');
      const state = GetQueryString('state');
      // 3.1 获取url中参数, 并且判断url种是否有code
      if (code && state) {
        // 通过微信code登录
        this.$store.dispatch('loginWxCodeToken', { type: 31, code, state }).then(res => {
          // 处理租户的ID问题
          if (res.tentId && (!res.accessToken || !res.expiresTime || !res.refreshToken)) {
            // 设置租户
            uni.setStorageSync('TENANTID', res.tentId);

            // 设置ajax的请求头
            uni.$u.http.setConfig(defaultConfig => {
              defaultConfig.header['tenant-id'] = res.tentId;
              return defaultConfig;
            });

            // 重新获取code,获取token
            const href = window.location.href;

            //删除url中code和state
            const newHref = removeUrlParameters(href, ['code', 'state']);

            this.$store
              .dispatch('getWXSocialAuthRedirect', { type: 31, redirectUri: newHref })
              .then(res => {
                window.location.href = res;
              });
          } else {
            // 已登录获取门诊信息
            this.$store.dispatch('getTenantInfo');
            // 已登录获取用户信息
            this.$store.dispatch('ObtainUserInfo');
            // 放行
            this.$resolve();
          }
        });
      } else {
        // 3.2 URL中没有code, 获取微信公众号授权登录链接
        const href = window.location.href;
        //删除url中code和state
        const newHref = removeUrlParameters(href, ['code', 'state']);
        this.$store
          .dispatch('getWXSocialAuthRedirect', { type: 31, redirectUri: newHref })
          .then(res => {
            window.location.href = res;
          });
      }
    } else {
      // 2.2 已登录
      // 已登录获取门诊信息
      this.$store.dispatch('getTenantInfo');
      // 已登录获取用户信息
      this.$store.dispatch('ObtainUserInfo');

      // 放行
      this.$resolve();
    }
  }
};
</script>

<style lang="scss">
/** 引入全局基本样式 */
@import 'styles/base.scss';

/* 引入 uView 基础样式 */
@import '@/uni_modules/uview-ui/index.scss';

/*每个页面公共scss */
@import 'app.scss';
</style>
