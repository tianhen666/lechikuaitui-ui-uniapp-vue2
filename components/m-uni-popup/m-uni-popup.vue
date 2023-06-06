<template>
  <view>
    <!-- 弹出提示 -->
    <uni-popup ref="mPopup" type="center">
      <view class="mPopupBox">
        <view class="closeIcon" @tap.stop="close">
          <image class="img" src="@/static/images/myimg/close.png"></image>
        </view>
        <view class="title12312">提示</view>
        <view class="des">{{ mPopupDesc }}</view>
        <view class="btnBox">
          <button class="btn btn1" @tap.stop="clickBtn1Fun">{{ mPopupBtn1 || '确定' }}</button>
          <button class="btn btn2" @tap.stop="close">取消</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'm-uni-popup',
  eimits: ['Btn1Fun'],
  props: {
    mPopupDesc: String,
    mPopupBtn1: String
  },
  methods: {
    // 提示弹窗关闭
    close() {
      this.$refs.mPopup.close();
    },
    // 提示打开弹窗
    open() {
      this.$refs.mPopup.open();
    },
    // 点击确定按钮
    clickBtn1Fun() {
      this.$emit('Btn1Fun');
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
.mPopupBox {
  background-color: #fff;
  width: 600rpx;
  border-radius: 10rpx;
  overflow: hidden;
  padding: 20rpx 30rpx 60rpx;
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
  .title12312 {
    margin: 30rpx 20rpx;
    text-align: center;
    font-size: 34rpx;
    line-height: 1;
  }
  .des {
    text-align: center;
    color: #999;
    font-size: 26rpx;
  }
  .btnBox {
    margin-top: 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .btn {
      height: 60rpx;
      line-height: 60rpx;
      padding: 0 55rpx;
      font-size: 26rpx;
      margin: 0;
      &:after {
        border: none;
      }
    }
    .btn1 {
      background-color: $main-color;
      color: #fff;
      border: 1px solid $main-color;
    }
    .btn2 {
      color: $main-color;
      border: 1px solid $main-color;
    }
  }
}
</style>
