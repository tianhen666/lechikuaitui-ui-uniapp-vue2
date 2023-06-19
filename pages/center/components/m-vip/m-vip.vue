<template>
  <view class="containerVip12">
    <!-- vip续费 -->
    <view class="vip">
      <image class="image" src="/static/images/myimg/vip.png" mode="aspectFill"></image>
      <view class="name">口腔推企业会员</view>
      <view class="time_text" v-if="validationExpiration">
        {{ `您的企业会员, 将在 ${_$mDayJs(itemData.expireTime, 3)} 到期` }}
      </view>
      <view class="time_text" v-else>
        {{ `您的企业会员, 在${_$mDayJs(itemData.expireTime, 3)} 已到期` }}
      </view>

      <!-- 按钮联系客服 -->
      <view class="btn" @tap="kefu">联系客服</view>
      <!-- <view class="btn" @tap="kefu" v-if="validationExpiration">联系客服</view>
      <view class="btn" @tap="_$goToPage('/pages/voucherCenter/voucherCenter')" v-else>
        立即续费
      </view> -->
    </view>

    <!-- 联系客服弹窗 -->
    <m-weChat-code-preview
      :title="'添加客服微信'"
      :imgUrl="'/static/images/myimg/kefu.jpeg'"
      :remark="'长按微信二维码,添加客服微信'"
      ref="wPopup"
    ></m-weChat-code-preview>
  </view>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'm-vip',
  props: {
    itemData: Object
  },
  computed: {
    // 验证时间是否过期
    validationExpiration() {
      return this.itemData.expireTime / 1000 - dayjs().unix() > 0;
    }
  },
  data() {
    return {};
  },
  methods: {
    kefu() {
      this.$refs.wPopup.open();
    }
  }
};
</script>

<style lang="scss" scoped>
.containerVip12 {
  position: relative;
  z-index: 2;
  color: #ffffff;
  margin: auto;
  overflow: hidden;

  .vip {
    width: 100%;
    position: relative;
    width: 100%;
    height: 188rpx;

    > .name {
      color: #a35e25;
      font-weight: bold;
      position: absolute;
      top: 20rpx;
      left: 20rpx;
      font-size: 34rpx;
    }
    > .image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 188rpx;
    }
    > .time_text {
      top: 74rpx;
      left: 20rpx;
      position: absolute;
      z-index: 1;
      color: #ae590e;
      font-size: 24rpx;
    }
    > .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 1;
      top: 126rpx;
      left: 20rpx;
      width: 138rpx;
      height: 44rpx;
      color: #ae590e;
      font-size: 24rpx;
      background: url('@/static/images/myimg/vip_bg.png') no-repeat;
      background-size: cover;
    }
  }
}
</style>
