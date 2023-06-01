<template>
  <view class="box">
    <view class="bg">
      <view class="wrapper">
        <!-- 头像 -->
        <view class="avatar">
          <u-avatar size="90rpx" :src="userInfo.avatar || userInfo.savatar"></u-avatar>
        </view>

        <!-- 信息 -->
        <view class="nameBox">
          <view class="nickname">
            <text>{{ tenantInfo.name }}</text>
          </view>

          <view class="postName">
            <text>{{ userInfo.nickname || userInfo.snickName }}</text>
            <text v-if="userInfo.postName" style="padding: 0 10rpx;">|</text>
            <text>{{ userInfo.postName }}</text>
            <text class="slogan" v-if="userInfo.slogan">{{ userInfo.slogan }}</text>
          </view>
        </view>
      </view>

      <!-- 按钮 -->
      <view class="bottonBox">
        <view class="bottonBoxItme bottonBoxItme1">
          <view class="imgBox">
            <image class="img" src="/static/images/myimg/wx1.png" @tap.stop="showImg()"></image>
          </view>
          <text class="desc">添加微信</text>
        </view>

        <view class="bottonBoxItme ">
          <view class="imgBox">
            <image
              class="img"
              src="/static/images/myimg/wx3.png"
              @tap.stop="tel(userInfo.mobile)"
            ></image>
          </view>
          <text class="desc">电话咨询</text>
        </view>

        <!-- <view class="bottonBoxItme ">
          <view class="imgBox">
            <image
              class="img"
              src="/static/images/myimg/wx4.png"
              @tap.stop="onlineConsultation()"
            ></image>
          </view>
          <text class="desc">在线咨询</text>
        </view> -->

        <view class="bottonBoxItme">
          <!-- 跳转微信小程序 -->
          <wx-open-launch-weapp
            id="launchBtn"
            ref="launchBtn"
            :appid="tenantInfo.appId"
            :path="tenantInfo.path"
            :extraData="tenantInfo.extraData"
            style="position: absolute;inset: 0;z-index:9;opacity: 0;"
          >
            <script type="text/wxtag-template">
              <div style="position: absolute;inset: 0;z-index:9;opacity: 0;">跳转小程序</div>
            </script>
          </wx-open-launch-weapp>

          <view class="imgBox"><image class="img" src="/static/images/myimg/wx2.png"></image></view>
          <text class="desc">进入门诊</text>
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
  name: 'm-business-card',
  data() {
    return {
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
    // 弹窗二维码
    showImg() {
      if (this.userInfo?.wechatCode) {
        this.$refs.wPopup.open();
      } else {
        this.mPopupDesc = '没有微信二维码, 请完善个人信息';
        this.mPopupBtn1 = '去完善';
        this.$refs.tipsPopupRef.open();
      }
    },
    // 在线联系
    onlineConsultation() {}
  }
};
</script>

<style lang="scss" scoped>
.box {
  margin: 20rpx auto 0;
  width: 720rpx;
  overflow: hidden;

  .bg {
    background-color: #fff;
    padding: 20rpx;
    border-radius: 24rpx;
    .wrapper {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
        overflow: hidden;
        flex: none;
        position: relative;
        margin-right: 26rpx;
      }
      .nameBox {
        flex: auto;

        .nickname {
          font-size: 30rpx;
          display: block;
          font-weight: bold;
          color: #333;
        }
        .postName {
          margin-top: 10rpx;
          color: #666;
          font-size: 26rpx;
          display: flex;
          align-items: center;
          .slogan {
            padding-left: 10rpx;
            flex: auto;
            color: #aaa;
            @include overHeiddenText(1);
          }
        }
      }
    }
    .bottonBox {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bottonBoxItme {
        position: relative;
        margin-top: 32rpx;
        text-align: center;
        .img {
          display: block;
          width: 70rpx;
          height: 70rpx;
          margin: auto;
        }
        .desc {
          margin-top: 20rpx;
          display: block;
          font-size: 26rpx;
          color: #999;
        }
      }
    }
  }
}
</style>
