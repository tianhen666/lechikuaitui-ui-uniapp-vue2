<template>
  <view>
    <!-- 切换门诊列表 弹窗 -->
    <u-action-sheet
      :actions="tenantlist"
      :description="title"
      round="10"
      :show="show"
      :closeOnClickAction="false"
      :closeOnClickOverlay="true"
      @select="actionSheetSelect"
      @close="show = false"
      cancelText="取消"
    ></u-action-sheet>

    <!-- 显示当前登录的门诊 -->
    <view class="switchTheClinic">
      <text class="left">登录的门诊</text>
      <view class="right" v-if="tenantlist.length > 1" @tap.stop="show = true">
        <text class="text">{{ _$tenantInfo.name }}</text>
        <u-icon name="arrow-down-fill" color="#909399" size="14"></u-icon>
      </view>
      <view class="right" v-else>
        <text class="text">{{ _$tenantInfo.name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserListTenant } from '@/api/materialLibrary.js';
import { delay } from '@/utils/index.js';
export default {
  name: 'm-switchTheClinic',
  props: {
    itemData: Object
  },
  data() {
    return {
      // 切换门诊
      title: '选择需要登录的门诊',
      tenantlist: [],
      show: false
    };
  },
  async mounted() {
    await this.$onLaunched;

    this.mGetUserListTenant();
  },
  methods: {
    // 选择切换门诊面板弹窗执行
    actionSheetSelect(val) {
      this.show = false;
      // { name: '创建一个新门诊', color: '#3898ff', fontSize: '28rpx', id: -1 }
      if (val.id === -1) {
        this._$createClinic();
        return;
      }
      // 门诊相等不操作
      if (this._$tenantInfo.id === val.id) {
        return;
      }
      // 切换门诊
      this._$mCutTenant(val);
    },

    /** 获取当前用户下的所有门诊 */
    async mGetUserListTenant() {
      const res = await getUserListTenant();
      this.tenantlist = [{ name: '创建新门诊', color: '#3898ff', fontSize: '28rpx', id: -1 }];

      await delay(100);
      // 标识当前所在门诊
      res.data.forEach(item => {
        if (item.id === this._$tenantInfo.id) {
          item.subname = '当前所在门诊';
        }
      });
      this.tenantlist.unshift(...res.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.switchTheClinic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  .left {
    font-size: 26rpx;
    color: #666;
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .text {
      margin-right: 10rpx;
    }
  }
}
</style>
