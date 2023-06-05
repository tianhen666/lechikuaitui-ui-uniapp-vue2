<template>
  <view>
    <!-- 弹窗start -->
    <uni-popup ref="wPopup" type="center">
      <view class="popupBox">
        <view class="closeIcon" @tap.stop="close()">
          <image class="img" src="@/static/images/myimg/close.png"></image>
        </view>
        <!-- <view class="title">{{ title }}</view> -->
        <view class="desc">{{ desc }}</view>
        <image
          style="width: 240px;display: block;margin: auto;"
          :src="imgUrl"
          mode="widthFix"
        ></image>
        <view class="tips">{{ remark }}</view>
      </view>
    </uni-popup>
    <!-- 弹窗end -->
  </view>
</template>

<script>
export default {
  name: 'm-weChat-code-preview',
  props: {
    desc: {
      type: String,
      default: '添加我的微信'
    },
    title: {
      type: String,
      default: '店铺标题'
    },
    imgUrl: {
      type: String,
      default: ''
    },
    remark: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  methods: {
    // 打开弹窗
    open() {
      this.$refs.wPopup.open();
    },
    // 关闭弹窗
    close() {
      this.$refs.wPopup.close();
    }
  }
};
</script>

<style scoped lang="scss">
.popupBox {
  background-color: #fff;
  width: 600rpx;
  border-radius: 10rpx;
  overflow: hidden;
  padding: 40rpx 30rpx 60rpx;
  box-sizing: border-box;
  position: relative;
  .closeIcon {
    position: absolute;
    right: 15rpx;
    top: 15rpx;
    .img {
      width: 35rpx;
      height: 35rpx;
    }
  }
  .title {
    font-size: 34rpx;
    line-height: 1;
    text-align: center;
  }
  .desc {
    margin: 20rpx 0;
    text-align: center;
    font-size: 28rpx;
    color: #666;
  }
  .tips {
    text-align: center;
    color: #aaa;
    margin: 20rpx 0 0;
    font-size: 28rpx;
  }
}
</style>
