<template>
  <view class="box">
    <view class="warpper">
      <view class="left">
        <view class="title"><text>xxx口腔</text></view>
        <view class="name"><text>门诊部张医生</text></view>
        <view class="address"><text>地址：浙江省杭州市拱墅区万达 写字楼905</text></view>

        <view class="bottonBox">
          <button class="bottonItem">电话咨询</button>
          <button class="bottonItem">在线咨询</button>
        </view>
      </view>

      <view class="right">
        <image class="img" src="/static/images/test/WechatIMG138.jpeg"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-business-card-a',
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.box {
  height: 360rpx;
  .warpper {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 40rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      flex: none;
      width: 50%;
      .title {
        font-size: 30rpx;
        font-weight: bold;
      }
      .name {
        margin-top: 5rpx;
        font-size: 27rpx;
      }
      .address {
        width: 100%;
        margin-top: 16rpx;
        font-size: 27rpx;
        @include overHeiddenText(2);
      }
      .bottonBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;
        .bottonItem {
          background-color: $main-color;
          color: #fff;
          margin: 0;
          line-height: 2;
          font-size: 26rpx;
        }
      }
    }
    .right {
      flex: none;
      width: 42%;
      .img {
        width: 240rpx;
        height: 240rpx;
        display: block;
        margin-left: auto;
      }
    }
  }
}
</style>
