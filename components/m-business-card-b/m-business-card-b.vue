<template>
  <view class="box">
    <view class="warpper">
      <view class="top">
        <view class="left"><u-avatar :src="userInfo.avatar"></u-avatar></view>
        <view class="right">
          <view class="title"><text>{{tenantInfo.name}}--{{userInfo.nickname}}</text></view>
          <view class="desc"><text>{{tenantInfo.address}}</text></view>
        </view>
      </view>

      <view class="btn_box">
        <!-- <view class="btn_item">
          <u-icon name="photo" size="60rpx" labelPos="bottom" labelSize="24rpx" label="进入门诊"></u-icon>
        </view> -->
        <!-- <view class="btn_item">
          <u-icon name="photo" size="60rpx" labelPos="bottom" labelSize="24rpx" label="分享"></u-icon>
        </view> -->
        <view class="btn_item" @tap.stop="mNavigation">
          <u-icon name="photo" size="60rpx" labelPos="bottom" labelSize="24rpx" label="导航"></u-icon>
        </view>
        <view class="btn_item" @tap.stop="tel(userInfo.mobile)">
          <u-icon name="photo" size="60rpx" labelPos="bottom" labelSize="24rpx" label="电话"></u-icon>
        </view>
        <view class="btn_item" @tap.stop='showImg(userInfo.wechatCode)'>
          <u-icon name="photo" size="60rpx" labelPos="bottom" labelSize="24rpx" label="微信"></u-icon>
        </view>
        <!-- <view class="btn_item">
          <u-icon name="photo" size="60rpx" labelPos="bottom" labelSize="24rpx" label="在线咨询"></u-icon>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: 'm-business-card-b',
    data() {
      return {};
    },
    computed: {
      ...mapState({
        tenantInfo: state => state.tenant.info,
        userInfo: state => state.user.userInfo,
      })
    },

    methods: {

      // 开始导航
      mNavigation() {},

      // 拨打电话
      tel(val) {
        uni.makePhoneCall({
          phoneNumber: val
        });
      },
      // 微信二维码
      showImg(val) {
        uni.previewImage({
          urls: [val],
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .box {
    overflow: hidden;

    .warpper {
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      bottom: 0;
      padding: 30rpx 30rpx 40rpx;

      .top {
        display: flex;
        align-items: center;
        flex-direction: row;

        .left {
          flex: none;
        }

        .right {
          flex: auto;
          margin-left: 20rpx;
          font-size: 26rpx;

          .title {
            font-weight: bold;
          }

          .desc {
            margin-top: 10rpx;
            color: #999;
          }
        }
      }

      .btn_box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        margin: 0 -15rpx;
        margin-top: 20rpx;

        .btn_item {
          margin: 0 15rpx;
        }
      }
    }
  }
</style>