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
          :src="invitationTenantInfo.tenantLog"
        ></u--image>
      </view>

      <!-- 中间 -->
      <view class="center">
        <view class="title">
          <text>{{ invitationTenantInfo.name }}</text>
        </view>
        <view class="name">
          <text>{{ invitationUserInfo.nickname || invitationUserInfo.snickName }}</text>
          <text v-if="invitationUserInfo.postName" style="padding: 0 10rpx;">|</text>
          <text>{{ invitationUserInfo.postName }}</text>
        </view>
        <view class="address">
          <text>{{ invitationTenantInfo.address }}</text>
        </view>
      </view>

      <!-- 右侧 -->
      <view class="right">
        <view class="bottonBox">
          <button
            class="bottonItem"
            style="margin-bottom: 30rpx;"
            @tap.stop="_$tel(invitationUserInfo.mobile)"
          >
            电话咨询
          </button>
          <!-- <button class="bottonItem" @tap.stop="onlineConsultation">在线咨询</button> -->
        </view>
      </view>
    </view>

    <m-weChat-code-preview
      :title="invitationTenantInfo.name"
      :imgUrl="invitationUserInfo.wechatCode"
      :remark="invitationUserInfo.remark"
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
      mShow: false
    };
  },
  computed: {
    ...mapState({
      invitationTenantInfo: state => state.tenant.invitationInfo,
      invitationUserInfo: state => state.user.invitationInfo
    })
  },
  methods: {
    // 在线咨询
    onlineConsultation() {},
    // 微信预览
    showImg() {
      if (this.invitationUserInfo.wechatCode) {
        this.$refs.wPopup.open();
      } else {
        this._$showToast('没有微信二维码');
      }
    }
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
    }
    .center {
      flex: auto;
      margin-left: 20rpx;
      .title {
        font-size: 28rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #333333;
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
        color: #333333;
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
</style>
