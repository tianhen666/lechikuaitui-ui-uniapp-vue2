<template>
  <view>
    <view class="box">
      <text class="time">分享时间：2023-04-12 15:49:35</text>

      <view class="title">
        <text class="type">文章</text>
        <text class="name">2022世界杯 | 熬夜看球赛，警惕口腔亮“红牌”！ 这份护牙锦囊请收好</text>
      </view>

      <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>

      <view class="listBoxItem">
        <view class="listItem">
          <text class="text1">666</text>
          <text class="text2">分享总量</text>
        </view>
        <view class="listItem">
          <text class="text1">666</text>
          <text class="text2">分享总量</text>
        </view>
        <view class="listItem">
          <text class="text1">666</text>
          <text class="text2">分享总量</text>
        </view>
      </view>
    </view>

    <!-- 间隔条 -->
    <u-gap height="16rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#eee"></u-gap>

    <view class="detailsBox">
      <view class="detailsItem" v-for="index in 10" :key="index">
        <view class="time">最近访问：2023-04-13 17:21:47</view>
        <u-gap height="1rpx" marginTop="8rpx" marginBottom="8rpx" bgColor="#bbb"></u-gap>

        <view class="info">
          <view class="left"><u-avatar :src="src"></u-avatar></view>

          <view class="right">
            <view class="text1">张三@客户昵称</view>
            <view class="text2">联系电话:17730225541</view>
            <view class="text2">客户位置：xxxxxxxx</view>
            <view class="text2">距离：2.5km</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}

.box {
  padding: 20rpx 30rpx;
  > .time {
    font-size: 26rpx;
    color: #aaa;
  }
  > .title {
    margin-top: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .type {
      display: flex;
      flex: none;
      border: 1px solid #aaa;
      padding: 0 10rpx;
      font-size: 20rpx;
      border-radius: 10rpx;
    }
    .name {
      margin-left: 20rpx;
      font-size: 24rpx;
      font-weight: bold;
      @include overHeiddenText(2);
    }
  }
  .listBoxItem {
    margin-top: 20rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .listItem {
      text-align: center;
      margin-right: 80rpx;
      .text1 {
        font-size: 25rpx;
        display: block;
      }
      .text2 {
        padding-top: 10rpx;
        font-size: 25rpx;
        display: block;
      }
    }
  }
}

.detailsBox {
  padding: 0 30rpx;
  .detailsItem {
    background-color: #efefef;
    padding: 26rpx 16rpx;
    margin: 30rpx 0;
    border-radius: 10rpx;
    > .time {
      font-size: 26rpx;
      color: #aaa;
    }
    .info {
      display: flex;
      margin-top: 20rpx;
      .left {
        flex: none;
      }
      .right {
        line-height: 40rpx;
        flex: auto;
        margin-left: 30rpx;
        .text1 {
          font-size: 28rpx;
          font-weight: bold;
          margin-bottom: 14rpx;
        }
        .text2 {
          font-size: 26rpx;
        }
      }
    }
  }
}
</style>
