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
      default: () => [
        {
          name: '最多使用'
        },
        {
          name: '12312'
        },
        {
          name: '更多'
        }
      ]
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
      console.log(index);
      this.$emit('switchClassification', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.btnBox {
  display: flex;
  margin: 0 -10rpx;
  .btnItem {
    .btn {
      background-color: #eee;
      color: #666;
      font-size: 22rpx;
      line-height: 2;
      padding: 0 12rpx;
      margin: 0 10rpx;
    }
    .cur {
      background-color: $main-color;
      color: #fff;
    }
  }
}
</style>
