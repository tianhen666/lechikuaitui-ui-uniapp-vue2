<template>
  <view class="myBox123">
    <view class="item_box" v-for="(item, index) in tenantlist" :key="item.id">
      <view class="top">
        <text>编号：{{ item.id }}</text>
        <text v-if="tenantInfo.id === item.id">(当前登录的门诊)</text>
      </view>
      <view class="center">
        <view class="imgBox"><u-avatar :src="item.tenantLog"></u-avatar></view>
        <view class="info">
          <view class="name">
            <text>{{ item.name }}</text>
          </view>
          <view class="address">
            <text class="addressc">地址：</text>
            <text>{{ item.address }}</text>
          </view>
        </view>
      </view>
      <view class="bottom">
        <button class="btn btn3" @tap.stop="mCutTenant(item)" v-if="tenantInfo.id != item.id">
          进入门诊
        </button>
        <button
          class="btn btn1"
          @tap.stop="_$goToPage(`/pages/tenantInfoInput/tenantInfoInput?id=${item.id}`)"
        >
          编辑
        </button>
        <button class="btn btn2" v-if="tenantInfo.id != item.id" @tap.stop="deleteClinic(item)">
          删除门诊
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserListTenant, deleteTenant } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tenantlist: []
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  async onShow() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    this.mGetUserListTenant();
  },
  methods: {
    /** 获取当前用户下的所有门诊 */
    async mGetUserListTenant() {
      //
      const res = await getUserListTenant();
      this.tenantlist = res.data;
    },
    /** 删除门诊 */
    async deleteClinic(item) {
      uni.showModal({
        title: '提示',
        content: '是否确认删除?',
        success: async val => {
          if (val.confirm) {
            await deleteTenant({ id: item.id });

            // 删除完成重新获取门诊列表
            this.mGetUserListTenant();
          }
        }
      });
    },
    /** 切换门诊 */
    mCutTenant(item) {
      const url =
        window.location.protocol + '//' + window.location.hostname + '/pages/center/center';
      this._$mCutTenant(item, url);
    }
  }
};
</script>

<style lang="scss" scoped>
.myBox123 {
  padding: 0 32rpx;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}

.item_box {
  margin: 30rpx 0;
  padding: 0 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
  &:last-of-type {
    margin-bottom: 0;
  }
  .top {
    color: #999;
    font-size: 28rpx;
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .center {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 30rpx 0;
    .imgBox {
      margin-right: 30rpx;
      flex: none;
    }
    .info {
      flex: 1;
      .name {
        font-weight: bold;
        font-size: 30rpx;
        color: #333;
      }
      .address {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #666;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    padding: 26rpx 0;
    .btn {
      color: #fff;
      background-color: $main-color;
      font-size: 22rpx;
      padding: 0 30rpx;
      line-height: 2.2;
      border-radius: 10rpx;
      margin: 0;
      margin-left: 30rpx;
      &:after {
        border: none;
      }
    }
    .btn3 {
      color: $main-color;
      background-color: #fff;
      border: 1px solid #{$main-color};
    }
    .btn1 {
    }
    .btn2 {
      background-color: $red-color;
    }
  }
}
</style>
