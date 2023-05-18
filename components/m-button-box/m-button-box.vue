<template>
  <view class="btnBox">
    <view class="btnItem" v-for="(item, index) in bData" :key="index">
      <button class="btn" :class="{ cur: mIndex === index }" @tap="btnTap(index)">
        {{ item.name }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-button-box',
  emits: ['switchClassification'],
  props: {
    bData: {
      type: Array,
      default: () => []
    },
    mIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    btnTap(index) {
      this.$emit('switchClassification', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.btnBox {
  display: flex;
  margin: 0 -10rpx;
  flex-wrap: wrap;
  .btnItem {
    .btn {
      background-color: #fff;
      color: #666;
      font-size: 24rpx;
      line-height: 2.4;
      padding: 0 18rpx;
      margin: 0 10rpx;
      border-radius: 50rpx;
      &:after {
        border: none;
      }
    }
    .cur {
      background-color: $main-color;
      color: #fff;
    }
  }
}
</style>
