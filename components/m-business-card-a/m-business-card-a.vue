<template>
  <view class="box">
    <view class="warpper">
      <view class="left">
        <view class="title">
          <text>{{ tenantInfo.name }}</text>
        </view>
        <view class="name">
          <text>{{ userInfo.nickname || userInfo.snickName }}</text>
        </view>
        <view class="address">
          <text>地址：{{ tenantInfo.address }}</text>
        </view>

        <view class="bottonBox">
          <button class="bottonItem" @tap.stop="tel(userInfo.mobile || tenantInfo.contactMobile)">
            电话咨询
          </button>
          <!-- <button class="bottonItem">在线咨询</button> -->
        </view>
      </view>

      <view class="right">
        <image
          class="img"
          mode="aspectFit"
          :src="userInfo.wechatCode"
          @tap.stop="showImg(userInfo.wechatCode)"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-business-card-a',
  data() {
    return {};
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

<style scoped lang="scss">
.box {
  height: 360rpx;

  .warpper {
    background-color: #fff;
    /* position: fixed;
    z-index: 898;
    bottom: 0; */
    width: 100%;
    padding: 40rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      flex: none;
      width: 50%;

      .title {
        font-size: 30rpx;
        font-weight: bold;
      }

      .name {
        margin-top: 5rpx;
        font-size: 27rpx;
      }

      .address {
        width: 100%;
        margin-top: 16rpx;
        font-size: 27rpx;
        @include overHeiddenText(2);
      }

      .bottonBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;

        .bottonItem {
          background-color: $main-color;
          color: #fff;
          margin: 0;
          line-height: 2;
          font-size: 26rpx;
        }
      }
    }

    .right {
      flex: none;
      width: 42%;

      .img {
        width: 240rpx;
        height: 240rpx;
        display: block;
        margin-left: auto;
      }
    }
  }
}
</style>
