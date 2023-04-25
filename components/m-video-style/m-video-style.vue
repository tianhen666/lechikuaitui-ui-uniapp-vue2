<template>
  <view class="box">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static/images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '优选视频' }}</text>
        <text class="time">{{ itemData.createTime }}</text>
      </view>
      <view class="right">
        <button class="botton">{{ itemData.shareText || '立即分享' }}</button>
      </view>
    </view>

    <view class="c">
      <view class="title">{{ itemData.name }}</view>
      <view class="warpper">
        <view class="videoImg">
          <image class="img" mode="aspectFit" :src="itemData.coverImage"></image>
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
          coverImage:
            'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5924.jpeg?imageView2/3/w/240/h/315/q/75',
          description:
            '为什么牙齿总是白天不痛，晚上痛？真想竟然是真想竟然是真想竟然是真想竟然是真想竟然是',
          views: 1001,
          tips: '一起来看看吧！',
          createTime: '2023-01-13 15:50:28',
          tag: '优选视频',
          shareText: '立即分享'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    goToPage() {}
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
      padding: 20rpx;
      margin-top: 30rpx;
      .videoImg {
        .img {
          height: 480rpx;
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
}
</style>
