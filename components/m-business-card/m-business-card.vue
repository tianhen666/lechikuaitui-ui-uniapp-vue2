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
              @tap.stop="tel(userInfo.mobile || tenantInfo.contactMobile)"
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

        <view class="bottonBoxItme ">
          <view class="imgBox">
            <image class="img" src="/static/images/myimg/wx2.png" @tap.stop="goToPage()"></image>
          </view>
          <text class="desc">进入门诊</text>
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
          mode="widthFix"
        ></image>
        <view class="tips">{{ userInfo.remark }}</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-business-card',
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
      uni.makePhoneCall({
        phoneNumber: val
      });
    },
    showImg() {
      if (this.userInfo?.wechatCode) {
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
    },
    goToPage() {
      uni.switchTab({
        url: '/pages/material/material'
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
