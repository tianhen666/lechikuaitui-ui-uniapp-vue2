<template>
  <view class="createClinic">
    <view class="wrapper">
      <button class="btn" @tap.stop="_$createClinic">认证我的门诊</button>
      <text class="desc">您当前还没有门诊, 请创建一个门诊</text>
    </view>
  </view>
</template>

<script></script>

<style lang="scss" scoped>
.createClinic {
  .wrapper {
    padding: 40rpx 0 40rpx;
    text-align: center;
    .btn {
      color: #fff;
      background-color: $main-color;
      border-radius: 100px;
      overflow: hidden;
      line-height: 2.2;
      font-size: 26rpx;
      width: 300rpx;
      &:after {
        border: none;
      }
    }
    .desc {
      display: block;
      margin-top: 20rpx;
      color: #aaa;
      font-size: 25rpx;
    }
  }
}
</style>
