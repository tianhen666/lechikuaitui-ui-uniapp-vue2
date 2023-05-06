<template>
  <view class="box" @tap.stop="itemClicK(itemData)">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static//images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '优选海报' }}</text>
        <text class="time">{{ mDayJs(itemData.createTime) }}</text>
      </view>
      <view class="right">
        <button class="botton">{{ itemData.shareText || '立即分享' }}</button>
      </view>
    </view>

    <view class="c">
      <view class="title">{{ itemData.name }}</view>
      <view class="warpper">
        <view class="postImg">
          <image class="img" mode="aspectFit" :src="itemData.content+'?imageView2/0/w/300/h/360/q/75'"></image>
        </view>
      </view>
    </view>

    <view class="b">
      <view class="views">
        <u-icon name="eye" color="#bbb" size="30rpx" :label="'浏览 ' + itemData.heat" labelSize="22rpx" labelColor="#bbb"
          space="10rpx"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
  import dayJs from 'dayjs'
  export default {
    name: 'm-article-style',
    props: {
      itemData: Object
    },
    data() {
      return {};
    },
    methods: {
      mDayJs(val) {
        return dayJs(val).format("YYYY-MM-DD HH:mm:ss")
      },
      //点击单个项目
      itemClicK(item) {
        this.$store.commit('SET_PREVIEW', item);
      },
    }
  };
</script>

<style lang="scss" scoped>
  .box {
    background-color: #fff;
    margin: 24rpx 18rpx;
    padding: 20rpx 20rpx 30rpx;
    border-radius: 10rpx;

    >.t {
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

    >.c {
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

        .postImg {
          .img {
            height: 480rpx;
            width: 100%;
          }
        }
      }
    }

    >.b {
      .views {
        font-size: 24rpx;
        color: #bbb;
        margin-top: 20rpx;
      }
    }
  }
</style>