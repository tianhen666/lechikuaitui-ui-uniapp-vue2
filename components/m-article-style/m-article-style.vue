<template>
  <view class="box">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static//images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '每日文章' }}</text>
        <text class="time">{{ _$mDayJs(itemData.createTime) }}</text>
      </view>
      <view class="right">
        <button
          @tap="_$verifyPopupGoToPage(`/pages/articleDetails/articleDetails?id=${itemData.id}`)"
          class="botton"
        >
          {{ itemData.shareText || '立即分享' }}
        </button>
      </view>
    </view>

    <view
      class="c"
      @tap="_$verifyPopupGoToPage(`/pages/articleDetails/articleDetails?id=${itemData.id}`)"
    >
      <!-- <view class="title">{{ itemData.name }}</view> -->
      <view class="warpper">
        <view class="img_box">
          <image mode="aspectFill" class="img" :src="itemData.coverImage"></image>
        </view>

        <view class="warpper_right">
          <text class="desc">{{ itemData.name }}</text>
          <!-- <text class="tips">{{ itemData.tips || '一起来看看吧' }}</text> -->
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
      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: ''
    };
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
  border: 1px solid #f1f1f1;
  margin: 24rpx 18rpx;
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
    margin-top: 30rpx;
    padding-left: 84rpx;
    .title {
      font-size: 28rpx;
      @include overHeiddenText(1);
    }

    .warpper {
      background-color: #fafafa;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      padding: 10rpx;
      margin-top: 20rpx;
      .img_box {
        float: none;
        .img {
          width: 150rpx;
          height: 150rpx * 3 * 0.25;
          display: block;
        }
      }
      .warpper_right {
        flex: auto;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 6rpx;
        .desc {
          width: 100%;
          display: block;
          font-size: 26rpx;
          line-height: 1.6;
          text-align: justify;
          @include overHeiddenText;
        }
        .tips {
          display: block;
          font-size: 24rpx;
          color: #aaa;
        }
      }
    }
  }

  > .b {
    padding-left: 84rpx;
    .views {
      font-size: 28rpx;
      color: #bbb;
      margin-top: 30rpx;
    }
  }
}
</style>
