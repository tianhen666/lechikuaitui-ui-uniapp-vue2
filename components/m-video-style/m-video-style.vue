<template>
  <view class="box" @tap.stop="goToPage(`/pages/videoDetails/videoDetails?id=${itemData.id}`)">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static/images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '推荐视频' }}</text>
        <text class="time">{{ mDayJs(itemData.createTime) }}</text>
      </view>
      <view class="right">
        <button class="botton">{{ itemData.shareText || '立即分享' }}</button>
      </view>
    </view>

    <view class="c">
      <view class="title">{{ itemData.name }}</view>
      <view class="warpper">
        <view class="videoImg">
          <!-- 视频播放图标 -->
          <view class="play-icon"></view>
          <image
            class="img"
            mode="aspectFit"
            :src="itemData.content + '?vframe/jpg/offset/2/w/300'"
          ></image>
        </view>
      </view>
    </view>

    <view class="b">
      <view class="views">
        <u-icon
          name="eye"
          color="#bbb"
          size="30rpx"
          :label="'浏览 ' + itemData.heat"
          labelSize="22rpx"
          labelColor="#bbb"
          space="10rpx"
        ></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
import dayJs from 'dayjs';
export default {
  name: 'm-article-style',
  props: {
    itemData: Object
  },
  data() {
    return {};
  },
  methods: {
    goToPage(url) {
      uni.navigateTo({
        url: url
      });
    },
    mDayJs(val) {
      // 时间转换
      return dayJs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid #f1f1f1;
  background-color: #fff;
  margin: 24rpx 10rpx;
  padding: 20rpx 20rpx 30rpx;
  border-radius: 10rpx;

  > .t {
    display: flex;
    align-items: center;

    .left {
      flex: none;

      .img {
        width: 60rpx;
        height: 60rpx;
        display: block;
      }
    }

    .center {
      flex: auto;
      margin-left: 24rpx;

      .text {
        display: block;
        font-size: 25rpx;
        margin-bottom: 4rpx;
      }

      .time {
        display: block;
        font-size: 24rpx;
        color: #aaa;
      }
    }

    .right {
      flex: none;

      .botton {
        background-color: $main-color;
        color: #fff;
        font-size: 22rpx;
        line-height: 2;
        padding: 0 12rpx;
      }
    }
  }

  > .c {
    margin-top: 20rpx;

    .title {
      font-size: 26rpx;
      line-height: 1.5;
      @include overHeiddenText(2);
    }

    .warpper {
      background-color: #fafafa;
      padding: 20rpx;
      margin-top: 10rpx;
      border-radius: 10rpx;
      .videoImg {
        position: relative;

        .img {
          height: 300rpx;
          width: 100%;
        }
      }
    }
  }

  > .b {
    .views {
      font-size: 24rpx;
      color: #bbb;
      margin-top: 20rpx;
    }
  }

  .play-icon {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: 50rpx;
    height: 50rpx;
    margin-left: -25rpx;
    margin-top: -25rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-icon:before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10rpx 0 10rpx 18rpx;
    border-color: transparent transparent transparent #fff;
  }
}
</style>
