<template>
  <view class="box">
    <view
      class="warpperActicle"
      v-for="(itemData, index) in dataList"
      :key="itemData.id"
      @tap.stop="itemClicK(index)"
    >
      <view class="img_box">
        <image mode="aspectFill" class="img" :src="itemData.coverImage"></image>
      </view>

      <view class="warpper_right">
        <text class="desc">{{ `（${tenantInfo.name}）${itemData.name}` }}</text>
        <text class="tips">{{ itemData.tips || '一起来看看吧!' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'm-article-list',
  emits: ['tapItem'],
  props: {
    listType: {
      type: [String],
      default: 'article'
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {};
  },
  methods: {
    itemClicK(index) {
      this.$emit('tapItem', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  .warpperActicle {
    border: 1px solid #f1f1ff;
    background-color: #fff;
    border-radius: 10rpx;
    overflow: hidden;
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    .img_box {
      float: none;
      .img {
        width: 200rpx;
        height: 200rpx * 3 * 0.25;
        display: block;
      }
    }
    .warpper_right {
      flex: auto;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 6rpx;
      .desc {
        width: 100%;
        display: block;
        font-size: 26rpx;
        line-height: 1.8;
        text-align: justify;
        @include overHeiddenText;
      }
      .tips {
        display: block;
        font-size: 24rpx;
        color: #aaa;
      }
    }
  }
}
</style>
