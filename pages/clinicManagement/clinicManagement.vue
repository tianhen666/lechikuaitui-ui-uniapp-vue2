<template>
  <view class="myBox">
    <view class="item_box" v-for="(item, index) in tenantlist" :key="item.id">
      <view class="item">
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
          <button class="btn btn3" @tap.stop="_$mCutTenant(item)" v-if="tenantInfo.id != item.id">
            进入门诊
          </button>
          <button
            class="btn btn1"
            v-if="tenantInfo.id === item.id"
            @tap.stop="_$goToPage(`/pages/tenantInfoInput/tenantInfoInput?id=${item.id}`)"
          >
            编辑
          </button>
          <!-- <button class="btn btn2" v-if="tenantInfo.id != item.id" @tap.stop="deleteClinic(item)">
            删除
          </button> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserListTenant, updateTenant } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tenantlist: []
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info
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
            await updateTenant({ deleted: 1, id: item.id });
            this.mGetUserListTenant();
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.item_box {
  .item {
    background-color: #fff;
    padding: 0 20rpx;
    margin-bottom: 30rpx;
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
        &:after {
          border: none;
        }
      }
      .btn3 {
        margin-right: 30rpx;
        color: $main-color;
        background-color: #fff;
        border: 1px solid #{$main-color};
      }
      .btn1 {
        margin-right: 30rpx;
      }
      .btn2 {
        background-color: $red-color;
      }
    }
  }
}
</style>
