<template>
  <view class="adBox">
    <view class="icon">
      <u-icon name="xiaochengxu" color="#F75236" size="40rpx" customPrefix="custom-icon"></u-icon>
    </view>
    <!-- 跳转微信小程序 -->
    <wx-open-launch-weapp
      id="launchBtn"
      ref="launchBtn"
      :appid="tenantInfo.appId"
      :path="tenantInfo.path"
      :extraData="tenantInfo.extraData"
      style="position: absolute;inset: 0;z-index:11;opacity: 0;"
    >
      <script type="text/wxtag-template">
        <div style="position: absolute;inset: 0;z-index:9;opacity: 0;">跳转小程序</div>
      </script>
    </wx-open-launch-weapp>

    <view class="imgBox">
      <image
        class="img"
        mode="aspectFill"
        :src="
          position === 'top'
            ? 'http://resources.lechiwl.cn//WechatIMG7732.jpeg'
            : position === 'bottom'
            ? 'http://resources.lechiwl.cn//11.jpeg'
            : ''
        "
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-applet-ad',
  props: {
    tenantInfo: Object,
    userInfo: Object,
    position: {
      default: 'top',
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.adBox {
  position: relative;
  padding-top: 80%;
  .imgBox {
    position: absolute;
    inset: 0;
    border-radius: 10rpx;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    width: 20px;
    height: 20px;
    z-index: 10;
  }
}
</style>
