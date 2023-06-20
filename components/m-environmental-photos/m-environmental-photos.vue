<template>
  <view v-if="tenantInfo.photograph">
    <view class="tenantInfoName">门诊内部环境照</view>
    <view class="boxenv">
      <view class="imgList">
        <view class="imgItem" v-for="(item, index) in imgList" :key="index">
          <u--image
            @click="previewImage(index)"
            width="100%"
            height="100px"
            mode="aspectFill"
            radius="10"
            :src="item"
          ></u--image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-environmental-photos',
  props: {
    tenantInfo: Object,
    userInfo: Object,
    invitation: Boolean
  },
  data() {
    return {};
  },
  computed: {
    imgList() {
      if (this.tenantInfo.photograph) {
        return this.tenantInfo.photograph.split(',');
      }
      return '';
    }
  },
  methods: {
    previewImage(index = 0) {
      // 预览图片
      uni.previewImage({
        urls: this.imgList,
        current: index
      });
    }
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
}
.boxenv {
  border-radius: 0rpx 0rpx 10rpx 10rpx;
  margin: 0 15px 0;
  padding: 15px;
  border: 1px solid #f1f1f1;
  .imgList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .imgItem {
      width: 300rpx;
      flex: none;
      margin-bottom: 30rpx;
    }
  }
}
</style>
