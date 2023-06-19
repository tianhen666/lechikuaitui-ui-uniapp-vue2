<template>
  <!-- 个人工具 -->
  <!-- <view class="commonlyUsedTools">
    <view class="title">
      <view class="left"><text>个人工具</text></view>
    </view>
  
    <view class="commonlyUsedToolsBox">
      <view class="warpper" v-for="(item, index) in 4" :key="index">
        <image class="img" :src="`/static/images/empty/us${index + 1}.png`" mode="aspectFill"></image>
        <text class="name">企业官网</text>
        <text class="desc">未创建</text>
      </view>
    </view>
  </view> -->

  <!-- <u-gap height="6" bgColor="#bbb" style="display: none;"></u-gap> -->
  <!-- 发布任务 -->
  <!-- <view class="releaseTheTask">
    <view class="title">
      <view class="left"><text>发布任务</text></view>
      <view class="right"><u-icon name="edit-pen-fill" color="#bbb" size="18"></u-icon></view>
    </view>
  </view> -->

  <!-- 广告位 -->
  <!-- <view class="advertising">
    <u-swiper
      indicator
      circular
      indicatorMode="dot"
      interval="5000"
      radius="4"
      height="140"
      :list="advertisingList1"
      @click="click"
    ></u-swiper>
  </view> -->
</template>

<script>
// 广告列表
advertisingList1: [
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png'
],
</script>

<style></style>
