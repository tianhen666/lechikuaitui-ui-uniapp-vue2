<template>
  <view class="box123">
    <view class="warpper">
      <!-- 左侧 -->
      <view class="left" @tap.stop="showImg()">
        <u--image
          mode="aspectFill"
          radius="10"
          width="134rpx"
          height="134rpx"
          loadingIcon="photo-fill"
          errorIcon="photo-fill"
          bgColor="#fff"
          :src="tenantInfo.tenantLog"
        ></u--image>
      </view>

      <!-- 中间 -->
      <view class="center">
        <view class="title">
          <text>{{ tenantInfo.name }}</text>
        </view>
        <view class="name">
          <text>{{ userInfo.nickname || userInfo.snickName }}</text>
          <text v-if="userInfo.postName" style="padding: 0 10rpx;">|</text>
          <text>{{ userInfo.postName }}</text>
        </view>
        <view class="address">
          <text>{{ tenantInfo.address }}</text>
        </view>
      </view>

      <!-- 右侧 -->
      <view class="right">
        <view class="bottonBox">
          <button class="bottonItem" style="margin-bottom: 30rpx;" @tap.stop="tel(userInfo.mobile)">
            电话咨询
          </button>
          <!-- <button class="bottonItem" @tap.stop="onlineConsultation">在线咨询</button> -->
        </view>
      </view>
    </view>

    <!-- 验证提示弹窗 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$goToPage(`/pages/userInfoInput/userInfoInput`)"
    ></m-uni-popup>

    <!-- 预览提示弹窗 -->
    <m-weChat-code-preview
      :title="tenantInfo.name"
      :imgUrl="userInfo.wechatCode"
      :remark="userInfo.remark"
      ref="wPopup"
    ></m-weChat-code-preview>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-business-card-bottom-invitation',
  data() {
    return {
      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: ''
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    // 拨打电话
    tel(val) {
      if (val) {
        this._$tel(val);
      } else {
        this.mPopupDesc = '没有联系方式, 请完善个人信息';
        this.mPopupBtn1 = '去完善';
        this.$refs.tipsPopupRef.open();
      }
    },
    showImg() {
      if (this.userInfo?.wechatCode) {
        this.$refs.wPopup.open();
      } else {
        this.mPopupDesc = '没有微信二维码, 请完善个人信息';
        this.mPopupBtn1 = '去完善';
        this.$refs.tipsPopupRef.open();
      }
    },
    onlineConsultation() {}
  }
};
</script>

<style scoped lang="scss">
.box123 {
  overflow: hidden;
  margin: 0 auto 20rpx;
  width: 720rpx;
  .warpper {
    background-color: #fcf8ff;
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
          width: 155rpx;
          height: 40rpx;
          line-height: 40rpx;
          background: linear-gradient(135deg, #87cdff 0%, #568cfc 100%);
          border-radius: 29rpx;
          color: #fff;
          margin: 0;
          font-size: 24rpx;
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
