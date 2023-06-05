import dayJs from 'dayjs';
import { mapState, mapGetters } from 'vuex';
import { cutTenant, updateFileNamer } from '@/api/materialLibrary.js';
import { removeUrlParameters } from '@/utils/index.js';
export default {
  install(Vue) {
    Vue.mixin({
      computed: {
        ...mapState({
          _$tenantInfo: state => state.tenant.info, // 门诊信息
          _$userInfo: state => state.user.userInfo // 用户信息
        }),
        // isMember 是否当前店铺管理员,  isTenantExpired 当前店铺是否过期
        ...mapGetters({
          _$isMember: 'isMember',
          _$isTenantExpired: 'isTenantExpired'
        })
      },
      methods: {

        /** ------ 通用业务逻辑 ------*/

        /** 创建门诊 */
        _$createClinic() {
          //有手机号直接创建
          if (this._$userInfo.mobile) {
            this._$goToPage('/pages/tenantInfoInput/tenantInfoInput');
          } else {
            // 没有手机号完善信息后创建
            this._$goToPage('/pages/userInfoInput/userInfoInput?newClinic=1');
          }
        },

        /** 业务验证 --验证不通过弹出弹窗-- **/
        _$verifyPopup() {
          // 没有门诊
          if (!this._$isMember) {
            this.mPopupDesc = '没有门诊, 请创建门诊';
            this.mPopupBtn1 = '免费创建门诊';
            this.$refs.tipsPopupRef.open();
            return false;
          }
          // 门诊已过期
          if (this._$isTenantExpired) {
            this.mPopupDesc = '门诊已到期, 请开通vip';
            this.mPopupBtn1 = '去开通vip';
            this.$refs.tipsPopupRef.open();
            return false;
          }
          return true
        },

        /** 弹窗确定按钮 */
        _$tipsPopupBtn1() {
          // 没有门诊
          if (!this._$isMember) {
            this._$createClinic();
            return;
          }
          // 门诊已过期
          if (this._$isTenantExpired) {
            this._$goToPage('/pages/voucherCenter/voucherCenter');
            return;
          }
        },

        /** 验证通过后跳转  */
        _$verifyPopupGoToPage(path) {
          if (this._$verifyPopup()) {
            // 进入页面
            this._$goToPage(path);
          }
        },

        /** 切换门诊 */
        async _$mCutTenant(val) {
          // 发送切换请求
          const res = await cutTenant({ id: val.id });
          // 清理当前的缓存
          uni.clearStorageSync();
          // 设置切换的缓存
          uni.setStorageSync('TENANTID', val.id);

          // 重新授权
          const href = window.location.href;
          //删除url中code和state
          const newHref = removeUrlParameters(href, ['code', 'state']);
          this.$store
            .dispatch('getWXSocialAuthRedirect', { type: 31, redirectUri: newHref })
            .then(res => {
              window.location.href = res;
            });
        },

        /** 上传 */
        _$uploadFilePromise(url) {
          return new Promise((resolve, reject) => {
            updateFileNamer(url).then(res => {
              resolve(res);
            });
          });
        },














        /** ------ 工具函数 ------*/

        /** 复制文案 */
        _$copy(val) {
          uni.setClipboardData({
            data: val,
            success: function() {
              uni.showToast({
                title: '复制成功',
                icon: 'none'
              });
            }
          });
        },

        /** 时间转换 */
        _$mDayJs(val, type = 1) {
          switch (type) {
            case 1:
              return dayJs(val).format('YYYY-MM-DD HH:mm:ss');
              break;
            case 2:
              return dayJs(val).format('YYYY-MM-DD');
              break;
            default:
              return dayJs(val).format('YYYY-MM-DD HH:mm:ss');
          }
        },

        /** 页面跳转 */
        _$goToPage(url) {
          uni.navigateTo({ url });
        },

        /** 关闭当前页面跳转 */
        _$redirectToGoToPage(url) {
          uni.redirectTo({ url });
        },

        /** 关闭所有页面跳转(tabbar和普通页面) */
        _$reLaunchGotoPage(url) {
          uni.reLaunch({ url });
        },

        /** 跳转到tabbar页面 ,关闭其他非tabber页面*/
        _$switchTabGotoPage(url) {
          uni.switchTab({ url });
        },

        /** 拨打电话 */
        _$tel(val) {
          if (val) {
            uni.makePhoneCall({
              phoneNumber: val
            });
          } else {
            this._$showToast('没有手机号');
          }
        },

        /** 无图标提示 */
        _$showToast(val) {
          uni.showToast({
            title: val,
            icon: 'none'
          });
        }


      }
    })
  }
}