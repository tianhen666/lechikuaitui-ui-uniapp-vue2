<template>
  <view class="box123">
    <view class="warpper">
      <!-- 左侧 -->
      <view class="left" @tap.stop="showImg()">
        <u--image
          mode="aspectFit"
          width="134rpx"
          height="134rpx"
          loadingIcon="photo-fill"
          errorIcon="photo-fill"
          bgColor="#fff"
          :src="userInfo.wechatCode"
        ></u--image>
      </view>

      <!-- 中间 -->
      <view class="center">
        <view class="title">
          <text>{{ tenantInfo.name }}</text>
        </view>
        <view class="name">
          <text>{{ userInfo.postName }}</text>
          <text style="padding: 0 10rpx;">|</text>
          <text>{{ userInfo.nickname || userInfo.snickName }}</text>
        </view>
        <view class="address">
          <text>{{ tenantInfo.address }}</text>
        </view>
      </view>

      <!-- 右侧 -->
      <view class="right">
        <view class="bottonBox">
          <button
            class="bottonItem"
            style="margin-bottom: 20rpx;"
            @tap.stop="tel(userInfo.mobile || tenantInfo.contactMobile)"
          >
            拨打电话
          </button>
          <button class="bottonItem" @tap.stop="onlineConsultation">在线咨询</button>
        </view>
      </view>
    </view>

    <u-popup :show="mShow" @close="mShow = false" mode="center" closeable round="10rpx">
      <view class="popupBox">
        <view class="title">{{ tenantInfo.name }}</view>
        <view class="desc">添加我的微信</view>
        <image
          style="width: 160px;height: 160px;display: block;margin: auto;"
          :src="userInfo.wechatCode"
        ></image>
        <view class="tips">{{ userInfo.remark }}</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-business-card-bottom-invitation',
  data() {
    return {
      mShow: false
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
      if (val) {
        uni.makePhoneCall({
          phoneNumber: val
        });
      } else {
        uni.showToast({
          title: '没有手机号',
          icon: 'none'
        });
      }
    },
    onlineConsultation() {
      uni.showToast({
        title: '正在努力开发中',
        icon: 'none'
      });
    },
    showImg() {
      if (this.userInfo.wechatCode) {
        this.mShow = true;
      } else {
        uni.showToast({
          title: '没有微信二维码',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.box123 {
  overflow: hidden;
  margin-top: 30rpx;
  .warpper {
    background-color: #fcf8ff;
    width: 694rpx;
    border-radius: 24rpx;
    padding: 20rpx;
    box-sizing: border-box;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      flex: none;
      .img {
        width: 134rpx;
        height: 134rpx;
        display: block;
        margin-left: auto;
      }
    }
    .center {
      flex: auto;
      margin-left: 20rpx;
      .title {
        font-size: 30rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #333333;
        @include overHeiddenText(1);
      }

      .name {
        font-size: 26rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: $sub-color;
        margin-top: 10rpx;
        @include overHeiddenText(1);
      }
      .address {
        margin-top: 10rpx;
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666;
        @include overHeiddenText(2);
      }
    }
    .right {
      .bottonBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .bottonItem {
          width: 160rpx;
          height: 48rpx;
          line-height: 48rpx;
          background: linear-gradient(135deg, #87cdff 0%, #568cfc 100%);
          border-radius: 29rpx;
          color: #fff;
          margin: 0;
          font-size: 26rpx;
          &:after {
            border: none;
          }
        }
      }
    }
  }
}
.popupBox {
  width: 600rpx;
  text-align: center;
  .title {
    font-size: 34rpx;
    line-height: 1;
    padding: 30rpx 0;
  }
  .desc {
    margin: 20rpx 0;
    text-align: center;
    font-size: 28rpx;
  }
  .tips {
    color: #aaa;
    margin: 20rpx 0 40rpx;
    font-size: 28rpx;
  }
}
</style>
