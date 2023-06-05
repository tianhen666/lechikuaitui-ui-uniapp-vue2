<template>
  <view>
    <view class="tenantInfoName">{{ tenantInfo.name }}</view>
    <view class="box123">
      <view class="warpper">
        <!-- 左侧 -->
        <view class="left">
          <view class="infoBox11">
            <u--image
              shape="circle"
              mode="aspectFill"
              radius="10"
              width="100rpx"
              height="100rpx"
              :src="userInfo.avatar || userInfo.savatar"
            ></u--image>

            <view style="flex: auto;margin-left: 13px;">
              <view class="nickname">
                <text>{{ userInfo.nickname || userInfo.snickName }}</text>
              </view>
              <view class="postName">
                <text>{{ userInfo.postName }}</text>
              </view>
            </view>
          </view>
          <view class="tel" @tap.stop="tel(userInfo.mobile)">{{ userInfo.mobile }}</view>
        </view>

        <!-- 右侧 -->
        <view class="right">
          <u-image
            width="200rpx"
            height="200rpx"
            mode="aspectFill"
            :src="userInfo.wechatCode"
            @click="showImg()"
          ></u-image>
        </view>
      </view>

      <view class="bottonBox">
        <u-button
          hover-class=""
          icon="phone-fill"
          iconColor="#3898ff"
          size="small"
          :customStyle="btnCustomStyel"
          @tap.stop="tel(userInfo.mobile)"
        >
          <text style="margin-left: 10px;">电话咨询</text>
        </u-button>

        <!-- <u-button
          hover-class=""
          icon="chat-fill"
          iconColor="#3898ff"
          size="small"
          :customStyle="btnCustomStyel"
          @tap.stop="onlineConsultation"
        >
          <text style="margin-left: 10px;">在线咨询</text>
        </u-button> -->
      </view>

      <u-line color="#3898ff" dashed margin="15px 0 15px" />

      <view class="address">
        <view class="map">
          <map
            style="width: 100%;"
            :longitude="tenantInfo.lng"
            :markers="markers"
            scale="17"
            :latitude="tenantInfo.lat"
            width="100%"
          ></map>
        </view>

        <view class="addressText">
          <u-icon name="map-fill" color="#3898ff" size="20px"></u-icon>
          <text class="text">{{ tenantInfo.address }}</text>
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
  </view>
</template>

<script>
export default {
  name: 'm-business-card-bottom',
  props: {
    tenantInfo: Object,
    userInfo: Object,
    invitation: Boolean
  },
  data() {
    return {
      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: '',

      btnCustomStyel: {
        height: '35px',
        backgroundColor: '#fff',
        color: '#333',
        fontSize: '28rpx',
        borderColor: '#3898ff',
        width: '130px',
        margin: '0'
      }
    };
  },
  computed: {
    markers() {
      return [
        {
          id: '1',
          longitude: this.tenantInfo.lng,
          latitude: this.tenantInfo.lat,
          iconPath: '/static/images/myimg/Marker.png',
          label: {
            content: '门诊地址',
            x: -30,
            color: '#eb4f27'
          },
          callout: {
            content: this.tenantInfo.address,
            display: 'ALWAYS',
            color: '#333',
            borderRadius: 5
          }
        }
      ];
    }
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

    // 显示微信二维码
    showImg() {
      if (this.userInfo?.wechatCode) {
        this.$refs.wPopup.open();
      } else {
        this.mPopupDesc = '没有微信二维码, 请完善个人信息';
        this.mPopupBtn1 = '去完善';
        this.$refs.tipsPopupRef.open();
      }
    },

    // 在线咨询
    onlineConsultation() {}
  }
};
</script>

<style scoped lang="scss">
.tenantInfoName {
  border-radius: 10rpx 10rpx 0 0;
  margin: 30px 15px 0;
  background-color: $main-color;
  color: #fff;
  padding: 0 30rpx;
  line-height: 70rpx;
  font-weight: 600;
  @include overHeiddenText(1);
}
.box123 {
  border-radius: 0 0 10rpx 10rpx;
  margin: 0 15px 0;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  overflow: hidden;
  padding: 30rpx 30rpx;

  .warpper {
    border-top: none;
    box-sizing: border-box;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      flex: none;
      .infoBox11 {
        display: flex;
        .nickname {
          color: #333;
        }
        .postName {
          margin-top: 10rpx;
          font-size: 28rpx;
          color: #888;
        }
      }
      .tel {
        font-size: 40rpx;
        color: $main-color;
        margin-top: 20rpx;
        letter-spacing: 1px;
      }
    }
    .right {
    }
  }

  .bottonBox {
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
  }

  .address {
    .addressText {
      margin-top: 30rpx;
      display: flex;
      > .text {
        flex: auto;
        margin-left: 10rpx;
        font-size: 28rpx;
        color: $main-color;
        @include overHeiddenText(2);
      }
    }
  }
}
</style>
