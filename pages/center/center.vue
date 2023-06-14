<template>
  <view class="container">
    <!-- 提示 弹窗 -->
    <u-toast ref="uToast" />

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
    <view style="margin:0 -30rpx"><u-line color="#ccc"></u-line></view>

    <!-- 显示登录的用户 -->
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

        <!-- 到期时间 -->
        <!-- <view class="expirationTime">
          <text>到期时间：{{ _$mDayJs(_$tenantInfo.expireTime, 2) }}</text>
        </view> -->
      </view>

      <!-- 编辑 -->
      <view class="editCard">
        <u-icon name="edit-pen-fill" color="#909399" size="16"></u-icon>
        <text class="text" @tap.stop="_$goToPage('/pages/userInfoInput/userInfoInput')">
          编辑名片
        </text>
      </view>
    </view>

    <!-- 团队管理  管理用户可见 -->
    <view class="theTeamReport" v-if="_$isMember">
      <view class="title">
        <view class="left"><text>今日概况</text></view>
        <view class="right"><u-icon name="arrow-right" color="#909399" size="16"></u-icon></view>
      </view>

      <view class="theTeamReportBox">
        <view class="warpper">
          <text class="text">阅读次数</text>
          <text class="theNumberOf">{{ centerObj.heat }}</text>
        </view>
        <view class="warpper">
          <text class="text">分享次数</text>
          <text class="theNumberOf">{{ centerObj.threadCount }}</text>
        </view>
        <view class="warpper">
          <text class="text">浏览人数</text>
          <text class="theNumberOf">{{ centerObj.transmitCount }}</text>
        </view>
      </view>
    </view>

    <!-- 创建门诊   普通用户可见 -->
    <view class="createClinic" v-if="!_$isMember">
      <view class="wrapper">
        <button class="btn" @tap.stop="_$createClinic">免费创建门诊</button>
        <text class="desc">您当前还没有门诊哦,请创建一个门诊哦</text>
      </view>
    </view>

    <!-- 管理工具 -->
    <view class="commonlyUsedTools">
      <view class="title">
        <view class="left"><text>管理工具</text></view>
      </view>

      <view class="commonlyUsedToolsBox">
        <view
          class="warpper"
          v-for="(item, index) in managementTool"
          :key="index"
          @tap.stop="verifyIsMemberGoToPage(item.url)"
        >
          <image class="img" :src="item.imgUrl" mode="aspectFill"></image>
          <text class="name">{{ item.name }}</text>
          <!-- <text class="desc">{{ item.desc }}</text> -->
        </view>
      </view>
    </view>

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

    <!-- 列表设置 -->
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

    <!-- 提示弹窗 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$tipsPopupBtn1"
    ></m-uni-popup>
  </view>
</template>

<script>
import wx from '@/wxJsSDK/index.js';
import { delay } from '@/utils/index.js';
import { getMemberUser, getUserListTenant } from '@/api/materialLibrary.js';
export default {
  data() {
    return {
      // 广告列表
      advertisingList1: [
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png'
      ],

      // 切换门诊
      title: '选择需要登录的门诊',
      tenantlist: [],
      show: false,

      // 个人页面显示
      centerObj: {},

      // 管理工具
      managementTool: [
        // { name: '企业官网', desc: '未创建', imgUrl: '/static/images/empty/us4.png', url: '' },
        {
          name: '门诊管理',
          desc: '未创建',
          imgUrl: '/static/images/empty/us5.png',
          url: '/pages/clinicManagement/clinicManagement'
        },
        {
          name: '员工管理',
          desc: '未创建',
          imgUrl: '/static/images/empty/us3.png',
          url: '/pages/staffManagement/staffManagement'
        },
        {
          name: '门诊环境',
          desc: '未创建',
          imgUrl: '/static/images/empty/us7.png',
          url: '/pages/photo/photo'
        }
        // {
        //   name: '订单管理',
        //   desc: '未创建',
        //   imgUrl: '/static/images/empty/us6.png',
        //   url: '/pages/myOrder/myOrder'
        // }
      ],

      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: ''
    };
  },
  async onReady() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    this.mGetMemberUser();
    this.mGetUserListTenant();
  },
  methods: {
    // 验证是否为管理员,验证通过跳转
    verifyIsMemberGoToPage(path) {
      if (!this._$isMember) {
        this.mPopupDesc = '没有门诊, 请创建门诊';
        this.mPopupBtn1 = '免费创建门诊';
        this.$refs.tipsPopupRef.open();
        return false;
      }
      this._$goToPage(path);
    },

    // 底部列表点击
    ListOfSet({ name }) {
      if (name === 'setUp') {
        this.verifyIsMemberGoToPage('/pages/setUp/setUp');
      }
      if (name === 'onlineCustomerService') {
        uni.showToast({
          title: '正在努力开发中...',
          icon: 'none'
        });
      }
      if (name === 'usingTheTutorial') {
        uni.showToast({
          title: '正在努力开发中...',
          icon: 'none'
        });
      }
      if (name === 'feedback') {
        this._$goToPage('/pages/feedback/feedback');
      }
    },

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

    /** 获取个人中心的数据 */
    async mGetMemberUser() {
      const res = await getMemberUser();
      this.centerObj = res.data;
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

<style scoped lang="scss">
page {
  background-color: #fff;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.container {
  padding: 0 30rpx;
  padding-bottom: 30rpx;
  .title {
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 30rpx;
      font-weight: bold;
      flex: none;
    }
    .right {
    }
  }

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

  /*
  头像名片
  */
  .businessCardInformation {
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 40rpx 0;
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
        padding: 0 10rpx;
        margin-top: 20rpx;
      }
    }

    .editCard {
      flex: none;
      display: flex;
      .text {
        margin-left: 10rpx;
        font-size: 26rpx;
        color: #999;
      }
    }
  }

  /*
  会员续费
  */
  .expirationTime {
    height: 25rpx;
    font-size: 25rpx;
    color: #7b7b7b;
    line-height: 25rpx;
    margin-top: 24rpx;
  }

  .theTeamReport {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 10rpx 20rpx 30rpx;
    border: 1px solid #f1f1f1;
    .theTeamReportBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      .warpper {
        display: flex;
        flex-direction: column;
        text-align: center;
        .theNumberOf {
          margin-top: 20rpx;
          font-weight: bold;
          font-size: 45rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          color: #fe9f26;
          line-height: 45rpx;
        }
        .text {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #9f9f9f;
          line-height: 28rpx;
        }
      }
    }
  }

  .commonlyUsedTools {
    padding: 10rpx 20rpx 30rpx;
    border-radius: 20rpx;
    background-color: #fff;
    margin-top: 30rpx;
    border: 1px solid #f1f1f1;
    .commonlyUsedToolsBox {
      margin-top: 15rpx;
      display: grid;
      row-gap: 20rpx;
      justify-content: space-between;
      justify-items: center;
      grid-template-columns: repeat(4, 120rpx);
      padding-bottom: 30rpx;

      .warpper {
        text-align: center;
        .img {
          width: 75rpx;
          height: 75rpx;
        }
        .name {
          display: block;
          font-size: 24rpx;
          @include overHeiddenText(1);
        }
        .desc {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }

  .advertising {
    padding: 30rpx 30rpx;
    background-color: #eee;
  }

  .theListOfSet {
    padding: 10rpx 20rpx 30rpx;
    border-radius: 20rpx;
    background-color: #fff;
    margin-top: 30rpx;
    border: 1px solid #f1f1f1;

    /deep/ .u-cell__body {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .createClinic {
    .wrapper {
      padding: 40rpx 0 40rpx;
      text-align: center;
      .btn {
        color: #fff;
        background-color: $main-color;
        border-radius: 100px;
        overflow: hidden;
        line-height: 2.2;
        font-size: 26rpx;
        width: 300rpx;
        &:after {
          border: none;
        }
      }
      .desc {
        display: block;
        margin-top: 20rpx;
        color: #aaa;
        font-size: 25rpx;
      }
    }
  }
}
</style>
