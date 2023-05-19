<template>
  <view class="container">
    <image
      class="bg_img"
      src="https://imgs.lechiwl.com/store/tooth/invitbg1.png"
      mode="widthFix"
    ></image>
    <view class="box box1">
      <view class="text1">
        <text class="nickname">{{ invitationInfo.nickname || invitationInfo.snickName }}</text>
        <text class="nickname" style="padding: 0 10rpx;">|</text>
        <text class="nickname" style="padding-right: 10rpx;">{{ invitationInfo.postName }}</text>
        <text>邀请您加入</text>
      </view>
      <view class="text2">{{ invitationTenantInfo.name }}</view>
      <button class="btn" @tap="jionStore">接受邀请</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { handleTenantInfo } from '@/api/materialLibrary.js';
export default {
  data() {
    return {
      invitationTenantID: 0, // 邀请门诊ID
      tenantInfo: {} // 邀请门诊信息
    };
  },
  computed: {
    ...mapState({
      invitationTenantInfo: state => state.tenant.invitationInfo,
      invitationInfo: state => state.user.invitationInfo
    }),
    ...mapGetters(['isMember'])
  },
  async onLoad({ invitationID, invitationTenantID }) {
    console.log(`邀请人ID-${invitationID}`);
    console.log(`需要加入的门诊ID-${invitationTenantID}`);

    // 等待onLaunch执行完成
    await this.$onLaunched;

    // 设置邀请人的ID
    this.invitationID = Number(invitationID) || 0;
    // 邀请的门诊ID
    this.invitationTenantID = Number(invitationTenantID) || 0;

    if (invitationID && invitationTenantID) {
      // 获取邀请人的个人信息
      this.$store.dispatch('invitationInfoFun', {
        clueId: invitationID,
        tenantId: invitationTenantID
      });

      // 获取邀请门诊的个人信息
      this.$store.dispatch('getShareTenantInfo', {
        tenantId: invitationTenantID
      });
    }
  },
  methods: {
    async jionStore() {
      // 判断是否已经加入过门诊,门诊是否还有剩余位置
      const res = await handleTenantInfo({ tenantId: this.invitationTenantID });

      if (res.data) {
        uni.redirectTo({
          url: `/pages/createinviteUserInput/createinviteUserInput?invitationTenantID=${
            this.invitationTenantID
          }&invitationID=${this.invitationID}`
        });
      } else {
        uni.showToast({
          title: '已加入门诊,或剩余员工数量不足',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  margin: 0 20rpx;
  border-radius: 16rpx;
  background-color: #fff;
  padding: 80rpx 30rpx;
}
.bg_img {
  width: 100%;
}
.box1 {
  margin-top: -90rpx;
  position: relative;
  z-index: 2;
  > .text1 {
    color: #aaa;
    font-size: 30rpx;
    text-align: center;
    margin-bottom: 60rpx;
    .nickname {
      font-weight: bold;
      color: #333;
    }
  }
  > .text2 {
    color: $main-color;
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60rpx;
  }
  > .btn {
    border-radius: 8rpx;
    margin: auto;
    font-size: 32rpx;
    font-weight: 500;
    height: 80rpx;
    line-height: 80rpx;
    color: #ffffff;
    background-color: $main-color;
  }
}
</style>
