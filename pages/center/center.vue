<template>
  <view class="container">
    <!-- 提示 弹窗 -->
    <u-toast ref="uToast" />

    <!-- 切换弹窗 -->
    <view class="mSwitchTheClinic">
      <mSwitchTheClinic :itemData="_$tenantInfo"></mSwitchTheClinic>
      <view style="margin:0 -30rpx"><u-line color="#ccc"></u-line></view>
      <u-gap height="24" bgColor="transparent"></u-gap>
    </view>

    <!-- 用户名片 -->
    <view class="userInfoBox">
      <mUserInfo :itemData="_$tenantInfo"></mUserInfo>
      <u-gap height="24" bgColor="transparent"></u-gap>
    </view>

    <!-- vip -->
    <view class="vipBox" v-if="_$isMember">
      <mVip :itemData="_$tenantInfo"></mVip>
      <u-gap height="15" bgColor="transparent"></u-gap>
    </view>

    <!-- 团队数据  管理用户可见 -->
    <view class="mTheTeamReportBox" v-if="_$isMember">
      <mTheTeamReportBox :itemData="centerObj"></mTheTeamReportBox>
      <u-gap height="15" bgColor="transparent"></u-gap>
    </view>

    <!-- 创建门诊   普通用户可见 -->
    <view class="mCreateClinic" v-if="!_$isMember">
      <mCreateClinic :itemData="_$tenantInfo"></mCreateClinic>
      <u-gap height="15" bgColor="transparent"></u-gap>
    </view>

    <!-- 管理工具 -->
    <view class="mCommonlyUsedTools">
      <mCommonlyUsedTools :itemData="_$tenantInfo"></mCommonlyUsedTools>
      <u-gap height="15" bgColor="transparent"></u-gap>
    </view>

    <!-- 底部按钮列表 -->
    <view class="mTheListOfSet">
      <mTheListOfSet :itemData="_$tenantInfo"></mTheListOfSet>
      <u-gap height="15" bgColor="transparent"></u-gap>
    </view>

    <!-- 提示弹窗 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$tipsPopupBtn1"
    ></m-uni-popup>
  </view>
</template>

<script>
import wx from '@/wxJsSDK/index.js';
import { delay } from '@/utils/index.js';
import { getMemberUser, getUserListTenant } from '@/api/materialLibrary.js';
import mUserInfo from './components/m-userInfo/m-userInfo.vue';
import mSwitchTheClinic from './components/m-switchTheClinic/m-switchTheClinic.vue';
import mTheTeamReportBox from './components/m-theTeamReportBox/m-theTeamReportBox.vue';
import mVip from './components/m-vip/m-vip.vue';
import mCreateClinic from './components/m-createClinic/m-createClinic.vue';
import mCommonlyUsedTools from './components/m-commonlyUsedTools/m-commonlyUsedTools.vue';
import mTheListOfSet from './components/m-theListOfSet/m-theListOfSet.vue';
export default {
  components: {
    mUserInfo,
    mSwitchTheClinic,
    mTheTeamReportBox,
    mCreateClinic,
    mVip,
    mCommonlyUsedTools,
    mTheListOfSet
  },
  data() {
    return {
      // 个人中心页面预显示数据
      centerObj: {},

      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: ''
    };
  },
  async onReady() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    this.mGetMemberUser();
  },
  methods: {
    /** 获取个人中心的数据 */
    async mGetMemberUser() {
      const res = await getMemberUser();
      this.centerObj = res.data;
    }
  }
};
</script>

<style scoped lang="scss">
page {
  background-color: #fafafa;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.container {
  padding: 0 30rpx;
  padding-bottom: 30rpx;

  /*  标题  */
  /deep/ .title {
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 30rpx;
      font-weight: bold;
      flex: none;
    }
    .right {
    }
  }

  .advertising {
    padding: 30rpx 30rpx;
    background-color: #eee;
  }
}
</style>
