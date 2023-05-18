<template>
  <view class="container">
    <image
      class="bg_img"
      src="https://imgs.lechiwl.com/store/tooth/invitbg1.png"
      mode="widthFix"
    ></image>
    <view class="box box1">
      <view class="text1">邀请您加入</view>
      <view class="text2">{{ tenantInfo.name }}</view>
      <button class="btn" @tap="jionStore">接受邀请</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { handleTenantInfo, getOne } from '@/api/materialLibrary.js';
export default {
  data() {
    return {
      tenantId: 0, // 邀请门诊ID
      tenantInfo: {} // 邀请门诊信息
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isMember'])
  },
  onLoad({ tenantId }) {
    this.tenantId = Number(tenantId);

    if (this.tenantId) {
      this.mGetOne();
    }
  },
  methods: {
    async mGetOne() {
      // 获取指定门诊信息
      const res = await getOne({ tenantId: this.tenantId });
      this.tenantInfo = res.data;
    },
    goTopage(url) {
      uni.switchTab({
        url: url
      });
    },
    async jionStore() {
      const res = await handleTenantInfo({ tenantId: this.tenantId });
      uni.redirectTo({
        url: '/pages/createinviteUserInput/createinviteUserInput?tenantId=' + this.tenantId
      });
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
