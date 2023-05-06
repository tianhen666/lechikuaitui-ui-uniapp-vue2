<template>
  <view class="box">
    <view class="bg">
      <view class="avatar">
        <image class="img" :src="userInfo.avatar || userInfo.savatar"></image>
      </view>

      <view class="nameBox">
        <text class="nickname">
          {{ tenantInfo.name }}--{{ userInfo.nickname || userInfo.snickName }}
        </text>
        <text class="slogan">{{ tenantInfo.slogan }}</text>
      </view>

      <view class="bottonBox">
        <view class="bottonBoxItme bottonBoxItme1">
          <image
            class="img"
            src="/static/images/empty/wx.png"
            @tap.stop="showImg(userInfo.wechatCode)"
          ></image>
        </view>
        <view class="bottonBoxItme" @tap.stop="tel(userInfo.mobile || tenantInfo.contactMobile)">
          <image class="img" src="/static/images/empty/tel.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-business-card',
  data() {
    return {
      tenantObj: {}
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    tel(val) {
      uni.makePhoneCall({
        phoneNumber: val
      });
    },
    showImg(val) {
      uni.previewImage({
        urls: [val]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20rpx 20rpx 20rpx;

  .bg {
    background-color: #f1f1f1;
    display: flex;
    padding: 20rpx 16rpx 30rpx;
    border-radius: 10rpx;

    .avatar {
      flex: none;
      position: relative;
      height: 100rpx;
      width: 100rpx;
      margin-right: 26rpx;

      .img {
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
      }
    }

    .nameBox {
      flex: auto;

      .nickname {
        font-size: 30rpx;
        margin-bottom: 18rpx;
        display: block;
        font-weight: bold;
      }

      .slogan {
        display: block;
        font-size: 26rpx;
        color: #aaa;
        width: 100%;
        @include overHeiddenText(1);
      }
    }

    .bottonBox {
      flex: none;
      display: flex;
      align-items: center;

      .bottonBoxItme {
        .img {
          width: 60rpx;
          height: 60rpx;
        }
      }

      .bottonBoxItme1 {
        margin-right: 20rpx;
      }
    }
  }
}
</style>
