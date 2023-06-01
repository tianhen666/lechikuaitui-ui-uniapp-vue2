<template>
  <view class="box">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static/images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '推荐视频' }}</text>
        <text class="time">{{ _$mDayJs(itemData.createTime) }}</text>
      </view>
      <view class="right">
        <button
          class="botton"
          @tap.stop="_$verifyPopupGoToPage(`/pages/videoDetails/videoDetails?id=${itemData.id}`)"
        >
          {{ itemData.shareText || '立即分享' }}
        </button>
      </view>
    </view>

    <view
      class="c"
      @tap.stop="_$verifyPopupGoToPage(`/pages/videoDetails/videoDetails?id=${itemData.id}`)"
    >
      <!-- <view class="title">{{ itemData.name }}</view> -->
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
          color="#aaa"
          size="34rpx"
          :label="'浏览 ' + itemData.heat"
          labelSize="24rpx"
          labelColor="#aaa"
          space="10rpx"
        ></u-icon>
      </view>
    </view>

    <!-- 提示弹窗 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$tipsPopupBtn1"
    ></m-uni-popup>
  </view>
</template>

<script>
export default {
  name: 'm-article-style',
  props: {
    itemData: Object
  },
  data() {
    return {
      mPopupDesc: '',
      mPopupBtn1: ''
    };
  },
  methods: {}
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
        font-size: 28rpx;
        margin-bottom: 10rpx;
        font-weight: bold;
        color: $main-color;
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
    padding-left: 84rpx;
    .title {
      font-size: 26rpx;
      line-height: 1.5;
      @include overHeiddenText(2);
    }
    .warpper {
      .videoImg {
        position: relative;
        display: inline-block;
        .img {
          display: block;
          width: 240rpx;
        }
      }
    }
  }
  > .b {
    padding-left: 84rpx;
    .views {
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
