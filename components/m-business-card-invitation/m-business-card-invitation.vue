<template>
  <view class="box">
    <view class="bg">
      <view class="wrapper">
        <!-- 头像 -->
        <view class="avatar">
          <u-avatar
            size="90rpx"
            :src="invitationUserInfo.avatar || invitationUserInfo.savatar"
          ></u-avatar>
        </view>

        <!-- 信息 -->
        <view class="nameBox">
          <view class="nickname">
            <text>{{ invitationTenantInfo.name }}</text>
          </view>
          <view class="postName">
            <text>{{ invitationUserInfo.nickname || invitationUserInfo.snickName }}</text>
            <text v-if="invitationUserInfo.postName" style="padding: 0 10rpx;">|</text>
            <text>{{ invitationUserInfo.postName }}</text>
            <text class="slogan">{{ invitationUserInfo.slogan }}</text>
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
              @tap.stop="_$tel(invitationUserInfo.mobile)"
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
            :appid="invitationTenantInfo.appId"
            :path="invitationTenantInfo.path"
            :extraData="invitationTenantInfo.extraData"
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
  name: 'm-business-card-invitation',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      invitationTenantInfo: state => state.tenant.invitationInfo,
      invitationUserInfo: state => state.user.invitationInfo
    })
  },
  methods: {
    // 微信二维码预览
    showImg() {
      if (this.invitationUserInfo?.wechatCode) {
        this.$refs.wPopup.open();
      } else {
        this._$showToast('没有微信二维码');
      }
    },
    // 在线咨询
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
</style>
