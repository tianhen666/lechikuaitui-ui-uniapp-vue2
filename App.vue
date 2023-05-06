<script>
import { isWechat, GetQueryString } from '@/utils/index.js';
import dayjs from 'dayjs';
export default {
  onLaunch: function() {
    // #ifdef H5
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('storeKey')) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('storeKey')))
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      this.$store.commit('CANCEL_PREVIEW');
      sessionStorage.setItem('storeKey', JSON.stringify(this.$store.state));
    });

    // 1.微信浏览器环境执行
    if (isWechat()) {
      // 2.1 未登录
      if (!this.$store.getters.hasLogin || !this.$store.getters.hasLoginExpired) {
        const code = GetQueryString('code');
        const state = GetQueryString('state');
        // 3.1 获取url中参数, 并且判断url种是否有code
        if (code && state) {
          // 通过微信code登录
          this.$store.dispatch('loginWxCodeToken', { type: 31, code, state }).then(res => {
            // 已登录获取门诊信息
            this.$store.dispatch('getTenantInfo');
          });
        } else {
          // 3.2 URL中没有code, 获取微信公众号授权登录链接
          const href = window.location.href;
          this.$store
            .dispatch('getWXSocialAuthRedirect', { type: 31, redirectUri: href })
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
      }
    }
    // #endif
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
