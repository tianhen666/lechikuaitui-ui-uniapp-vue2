<template>
  <view class="businessCardInformation">
    <!-- 头像 -->
    <view class="headPortrait">
      <u-avatar size="100rpx" :src="_$userInfo.avatar || _$userInfo.savatar"></u-avatar>
    </view>

    <!-- 名称信息 -->
    <view class="nameBox">
      <view class="name">
        <text>{{ _$userInfo.nickname || _$userInfo.snickName }}</text>
      </view>

      <view class="role" v-if="_$isMember">
        <text>{{ _$userInfo.roleName }}</text>
      </view>
      <view class="role" v-else><text>普通用户</text></view>
    </view>

    <!-- 编辑 -->
    <view class="editCard">
      <u-icon name="edit-pen-fill" color="#ffffff" size="16"></u-icon>
      <text class="text" @tap.stop="_$goToPage('/pages/userInfoInput/userInfoInput')">
        编辑名片
      </text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-userInfo',
  props: {
    itemData: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
/*
  头像名片
  */
.businessCardInformation {
  overflow: hidden;
  display: flex;
  align-items: center;
  .headPortrait {
    flex: none;
  }
  .nameBox {
    margin-left: 20rpx;
    margin-right: 20rpx;
    width: 400rpx;

    .name {
      font-size: 30rpx;
      font-weight: 400;
      @include overHeiddenText(1);
    }
    .role {
      color: #c94950;
      border-radius: 50px;
      border: 1px solid #c94950;
      font-size: 21rpx;
      line-height: 1.6;
      text-align: center;
      display: inline-block;
      padding: 0 15rpx;
      margin-top: 20rpx;
    }
  }

  .editCard {
    flex: none;
    display: flex;
    background-color: $main-color;
    padding: 6rpx 16rpx;
    border-radius: 100px;
    .text {
      margin-left: 10rpx;
      font-size: 23rpx;
      color: #fff;
    }
  }
}
</style>
