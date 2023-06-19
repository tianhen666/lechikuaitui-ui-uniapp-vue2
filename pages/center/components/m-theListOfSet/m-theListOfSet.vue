<template>
  <view class="theListOfSet">
    <view class="title">
      <view class="left"><text>其他选项</text></view>
    </view>

    <u-cell-group :border="false">
      <u-cell
        title="通用设置"
        name="setUp"
        isLink
        titleStyle="font-size:28rpx;margin-left:15rpx"
        iconStyle="width:55rpx;height:55rpx;"
        icon="../../static/img/index/sz.png"
        :border="false"
        @click="ListOfSet"
      ></u-cell>
      <!-- <u-cell
        title="在线客服"
        name="onlineCustomerService"
        isLink
        titleStyle="font-size:28rpx;margin-left:15rpx"
        iconStyle="width:55rpx;height:55rpx;"
        icon="../../static/img/index/zxzx.png"
        :border="false"
        @click="ListOfSet"
      ></u-cell> -->
      <!-- <u-cell
        title="使用教程"
        name="usingTheTutorial"
        isLink
        titleStyle="font-size:28rpx;margin-left:15rpx"
        iconStyle="width:55rpx;height:55rpx;"
        icon="../../static/img/index/syjc.png"
        :border="false"
        @click="ListOfSet"
      ></u-cell> -->
      <u-cell
        title="意见反馈"
        name="feedback"
        isLink
        titleStyle="font-size:28rpx;margin-left:15rpx"
        iconStyle="width:55rpx;height:55rpx;"
        icon="../../static/img/index/yjfk.png"
        :border="false"
        @click="ListOfSet"
      ></u-cell>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  name: 'm-theListOfSet',
  props: {
    itemData: Object
  },
  data() {
    return {};
  },
  methods: {
    // 底部列表点击
    ListOfSet({ name }) {
      // 设置按钮
      if (name === 'setUp') {
        this.verifyIsMemberGoToPage('/pages/setUp/setUp');
      }

      // 在线咨询
      if (name === 'onlineCustomerService') {
        uni.showToast({
          title: '正在努力开发中...',
          icon: 'none'
        });
      }

      // 使用教程
      if (name === 'usingTheTutorial') {
        uni.showToast({
          title: '正在努力开发中...',
          icon: 'none'
        });
      }

      // 意见反馈
      if (name === 'feedback') {
        this._$goToPage('/pages/feedback/feedback');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.theListOfSet {
  padding: 10rpx 20rpx 30rpx;
  border-radius: 20rpx;
  background-color: #fff;
  border: 1px solid #f1f1f1;

  /deep/ .u-cell__body {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
