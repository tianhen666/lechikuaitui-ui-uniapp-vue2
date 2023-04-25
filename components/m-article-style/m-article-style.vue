<template>
  <view class="box" @tap="goToPage('/pages/articleDetails/articleDetails')">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static//images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '优选文章' }}</text>
        <text class="time">{{ itemData.createTime }}</text>
      </view>
      <view class="right">
        <button class="botton">{{ itemData.shareText || '立即分享' }}</button>
      </view>
    </view>

    <view class="c">
      <view class="title">{{ itemData.name }}</view>
      <view class="warpper">
        <view class="img_box">
          <image mode="aspectFill" class="img" :src="itemData.coverImage"></image>
        </view>

        <view class="warpper_right">
          <text class="desc">{{ itemData.description }}</text>
          <text class="tips">{{ itemData.tips }}</text>
        </view>
      </view>
    </view>

    <view class="b">
      <view class="views">
        <u-icon
          name="eye"
          color="#bbb"
          size="30rpx"
          :label="'浏览' + itemData.views"
          labelSize="22rpx"
          labelColor="#bbb"
          space="10rpx"
        ></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-article-style',
  props: {
    itemData: {
      type: Object,
      default() {
        return {
          name: '牙齿错颌畸形有哪些危害？牙齿错颌畸形有哪些危害牙齿错颌畸形有哪些危害',
          coverImage: '/static/images/test/WechatIMG134.jpeg',
          description:
            '为什么牙齿总是白天不痛，晚上痛？真想竟然是真想竟然是真想竟然是真想竟然是真想竟然是',
          views: 1001,
          tips: '一起来看看吧！',
          createTime: '2023-01-13 15:50:28',
          tag: '优选文章',
          shareText: '立即分享'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    goToPage(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
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
      font-size: 30rpx;
      @include overHeiddenText(1);
    }
    .warpper {
      border: 1px solid #e1e1e1;
      background-color: #efefef;
      display: flex;
      padding: 20rpx;
      margin-top: 20rpx;
      .img_box {
        float: none;
        .img {
          width: 200rpx;
          height: 200rpx * 3 * 0.25;
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
          line-height: 1.8;
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
    .views {
      font-size: 24rpx;
      color: #bbb;
      margin-top: 30rpx;
    }
  }
}
</style>
