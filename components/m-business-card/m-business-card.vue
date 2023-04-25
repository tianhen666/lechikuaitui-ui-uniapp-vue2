<template>
  <view class="box">
    <view class="bg">
      <view class="avatar">
        <image class="img" src="../../static/images/empty/icon1.jpeg"></image>
      </view>

      <view class="nameBox">
        <text class="nickname">xx口腔张医生</text>
        <text class="slogan">牙小新口腔,关爱您的每一颗牙齿</text>
      </view>

      <view class="bottonBox">
        <view class="bottonBoxItme bottonBoxItme1">
          <image class="img" src="/static/images/empty/wx.png"></image>
        </view>
        <view class="bottonBoxItme">
          <image class="img" src="/static/images/empty/tel.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-business-card',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 40rpx 40rpx 20rpx;
  .bg {
    background-color: #fff;
    display: flex;
    padding: 20rpx 16rpx 30rpx;
    border-radius: 10rpx;
    .avatar {
      flex: none;
      position: relative;
      height: 100rpx;
      width: 100rpx;
      margin-right: 26rpx;
      .img {
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    .nameBox {
      flex: auto;
      .nickname {
        font-size: 30rpx;
        margin-bottom: 18rpx;
        display: block;
        font-weight: bold;
      }
      .slogan {
        display: block;
        font-size: 26rpx;
        color: #aaa;
        width: 100%;
        @include overHeiddenText(1);
      }
    }
    .bottonBox {
      flex: none;
      display: flex;
      align-items: center;
      .bottonBoxItme {
        .img {
          width: 60rpx;
          height: 60rpx;
        }
      }
      .bottonBoxItme1 {
        margin-right: 20rpx;
      }
    }
  }
}
</style>
