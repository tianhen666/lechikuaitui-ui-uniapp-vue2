<template>
  <view class="box">
    <view class="bg">
      <view class="wrapper">
        <!-- 头像 -->
        <view class="avatar">
          <u-avatar size="90rpx" :src="invitationInfo.avatar || invitationInfo.savatar"></u-avatar>
        </view>

        <!-- 信息 -->
        <view class="nameBox">
          <view class="nickname">
            <text>{{ invitationTenantInfo.name }}</text>
          </view>
          <view class="postName">
            <text>{{ invitationInfo.nickname || invitationInfo.snickName }}</text>
            <text v-if="invitationInfo.postName" style="padding: 0 10rpx;">|</text>
            <text>{{ invitationInfo.postName }}</text>
            <text class="slogan">{{ invitationInfo.slogan }}</text>
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
              @tap.stop="tel(invitationInfo.mobile || invitationTenantInfo.contactMobile)"
            ></image>
          </view>
          <text class="desc">电话咨询</text>
        </view>

        <view class="bottonBoxItme ">
          <view class="imgBox">
            <image
              class="img"
              src="/static/images/myimg/wx4.png"
              @tap.stop="onlineConsultation()"
            ></image>
          </view>
          <text class="desc">在线咨询</text>
        </view>

        <view class="bottonBoxItme">
          <!-- 跳转微信小程序 -->
          <wx-open-launch-weapp
            id="launch-btn"
            ref="launchBtn"
            appid="wxc4b2eb2e4a97ff84"
            path="pages/main/index/index"
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
    <u-popup :show="mShow" @close="mShow = false" mode="center" closeable round="10rpx">
      <view class="popupBox">
        <view class="title">{{ invitationTenantInfo.name }}</view>
        <view class="desc">添加我的微信</view>
        <image
          style="width: 160px;height: 160px;display: block;margin: auto;"
          :src="invitationInfo.wechatCode"
          mode="widthFix"
        ></image>
        <view class="tips">{{ invitationInfo.remark }}</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-business-card-invitation',
  data() {
    return {
      mShow: false
    };
  },
  computed: {
    ...mapState({
      invitationTenantInfo: state => state.tenant.invitationInfo,
      invitationInfo: state => state.user.invitationInfo
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
    showImg() {
      if (this.invitationInfo?.wechatCode) {
        this.mShow = true;
      } else {
        uni.showToast({
          title: '没有微信二维码',
          icon: 'none'
        });
      }
    },
    onlineConsultation() {
      uni.showToast({
        title: '正在努力开发中',
        icon: 'none'
      });
    }
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
          margin-bottom: 18rpx;
          display: block;
          font-weight: bold;
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
