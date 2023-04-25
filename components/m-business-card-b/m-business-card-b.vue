<template>
  <view class="box">
    <view class="warpper">
      <view class="top">
        <view class="left"><u-avatar src="/static/img/index/bfq.png"></u-avatar></view>
        <view class="right">
          <view class="title"><text>xx口腔张医生</text></view>
          <view class="desc"><text>xx口腔（浙江省杭州市拱墅区万达写字楼905</text></view>
        </view>
      </view>

      <view class="btn_box">
        <view class="btn_item">
          <u-icon
            name="photo"
            size="60rpx"
            labelPos="bottom"
            labelSize="24rpx"
            label="进入门诊"
          ></u-icon>
        </view>
        <view class="btn_item">
          <u-icon
            name="photo"
            size="60rpx"
            labelPos="bottom"
            labelSize="24rpx"
            label="分享"
          ></u-icon>
        </view>
        <view class="btn_item">
          <u-icon
            name="photo"
            size="60rpx"
            labelPos="bottom"
            labelSize="24rpx"
            label="导航"
          ></u-icon>
        </view>
        <view class="btn_item">
          <u-icon
            name="photo"
            size="60rpx"
            labelPos="bottom"
            labelSize="24rpx"
            label="电话"
          ></u-icon>
        </view>
        <view class="btn_item">
          <u-icon
            name="photo"
            size="60rpx"
            labelPos="bottom"
            labelSize="24rpx"
            label="微信"
          ></u-icon>
        </view>
        <view class="btn_item">
          <u-icon
            name="photo"
            size="60rpx"
            labelPos="bottom"
            labelSize="24rpx"
            label="在线咨询"
          ></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-business-card-b',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
  .warpper {
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    padding: 30rpx 30rpx 40rpx;
    .top {
      display: flex;
      align-items: center;
      flex-direction: row;
      .left {
        flex: none;
      }
      .right {
        flex: auto;
        margin-left: 20rpx;
        font-size: 26rpx;
        .title {
          font-weight: bold;
        }
        .desc {
          margin-top: 10rpx;
          color: #999;
        }
      }
    }

    .btn_box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-direction: row;
      margin: 0 -15rpx;
      margin-top: 20rpx;
      .btn_item {
        margin: 0 15rpx;
      }
    }
  }
}
</style>
