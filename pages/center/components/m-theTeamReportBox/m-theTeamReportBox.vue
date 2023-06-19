<template>
  <view class="theTeamReport">
    <view class="title">
      <view class="left"><text>今日概况</text></view>
      <view class="right"><u-icon name="arrow-right" color="#909399" size="16"></u-icon></view>
    </view>

    <view class="theTeamReportBox">
      <view class="warpper">
        <text class="text">阅读次数</text>
        <text class="theNumberOf">{{ itemData.heat }}</text>
      </view>
      <view class="warpper">
        <text class="text">分享次数</text>
        <text class="theNumberOf">{{ itemData.threadCount }}</text>
      </view>
      <view class="warpper">
        <text class="text">浏览人数</text>
        <text class="theNumberOf">{{ itemData.transmitCount }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-theTeamReportBox',
  props: {
    itemData: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.theTeamReport {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 10rpx 20rpx 30rpx;
  border: 1px solid #f1f1f1;

  .theTeamReportBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
    .warpper {
      display: flex;
      flex-direction: column;
      text-align: center;
      .theNumberOf {
        margin-top: 20rpx;
        font-weight: bold;
        font-size: 45rpx;
        font-family: DINAlternate-Bold, DINAlternate;
        color: #fe9f26;
        line-height: 45rpx;
      }
      .text {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #9f9f9f;
        line-height: 28rpx;
      }
    }
  }
}
</style>
