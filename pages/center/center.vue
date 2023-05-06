<template>
  <view class="container">
    <!-- 提示 -->
    <u-toast ref="uToast" />
    <!-- 切换门诊列表 -->
    <u-action-sheet
      :actions="tenantlist"
      :title="title"
      :show="show"
      :closeOnClickAction="false"
      :closeOnClickOverlay="true"
      @select="actionSheetSelect"
      @close="show = false"
      cancelText="取消"
    ></u-action-sheet>

    <view class="switchTheClinic">
      <text class="left">当前门诊</text>
      <view class="right" @tap.stop="show = true">
        <text class="text">{{ tenantInfo.name }}</text>
        <u-icon name="arrow-down-fill" color="#909399" size="14"></u-icon>
      </view>
    </view>

    <view class="businessCardInformation">
      <view class="headPortrait">
        <u-avatar :src="userInfo.avatar || userInfo.savatar"></u-avatar>
      </view>

      <view class="nameBox">
        <view class="name">
          <text>{{ userInfo.nickname || userInfo.snickName }}</text>
        </view>
        <view class="role"><text>超级管理员</text></view>
      </view>

      <view class="editCard">
        <u-icon name="edit-pen-fill" color="#909399" size="16"></u-icon>
        <text class="text">编辑名片</text>
      </view>
    </view>
    <u-gap height="8" bgColor="#eee"></u-gap>

    <!-- 团队管理 -->
    <view class="theTeamReport">
      <view class="title">
        <view class="left"><text>团队报告</text></view>
        <view class="right"><u-icon name="arrow-right" color="#909399" size="16"></u-icon></view>
      </view>

      <view class="theTeamReportBox">
        <view class="warpper">
          <text class="theNumberOf">{{ centerObj.heat }}</text>
          <text class="text">阅读次数</text>
        </view>
        <view class="warpper">
          <text class="theNumberOf">{{ centerObj.threadCount }}</text>
          <text class="text">分享次数</text>
        </view>
        <view class="warpper">
          <text class="theNumberOf">{{ centerObj.transmitCount }}</text>
          <text class="text">新增线索</text>
        </view>
        <!-- <view class="warpper">
          <text class="theNumberOf">0</text>
          <text class="text">阅读次数</text>
        </view> -->
      </view>
    </view>
    <u-gap height="8" bgColor="#eee"></u-gap>

    <!-- 管理工具 -->
    <!-- <view class="commonlyUsedTools">
      <view class="title">
        <view class="left"><text>管理工具</text></view>
      </view>

      <view class="commonlyUsedToolsBox">
        <view class="warpper" v-for="(item, index) in 6" :key="index">
          <image class="img" :src="`/static/images/empty/us${index + 1}.png`" mode="aspectFill"></image>
          <text class="name">企业官网</text>
          <text class="desc">未创建</text>
        </view>
      </view>
    </view>
    <u-gap height="8" bgColor="#eee"></u-gap> -->

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
      <u-cell-group :border="false" :customStyle="{ margin: '0 -15px' }">
        <u-cell
          title="设置"
          name="setUp"
          isLink
          :titleStyle="{ 'font-size': '27rpx', 'margin-left': '10rpx' }"
          @click="ListOfSet"
        >
          <u-icon slot="icon" size="20" name="search"></u-icon>
        </u-cell>
        <u-cell
          title="在线客服"
          name="onlineCustomerService"
          isLink
          :titleStyle="{ 'font-size': '27rpx', 'margin-left': '10rpx' }"
          @click="ListOfSet"
        >
          <u-icon slot="icon" size="20" name="setting-fill"></u-icon>
        </u-cell>
        <u-cell
          title="使用教程"
          name="usingTheTutorial"
          isLink
          :titleStyle="{ 'font-size': '27rpx', 'margin-left': '10rpx' }"
          @click="ListOfSet"
        >
          <u-icon slot="icon" size="20" name="setting-fill"></u-icon>
        </u-cell>
        <u-cell
          title="意见反馈"
          name="feedback"
          isLink
          :titleStyle="{ 'font-size': '27rpx', 'margin-left': '10rpx' }"
          @click="ListOfSet"
        >
          <u-icon slot="icon" size="20" name="setting-fill"></u-icon>
        </u-cell>
      </u-cell-group>
    </view>

    <!-- <u-gap height="20" bgColor="#eee"></u-gap> -->
  </view>
</template>

<script>
import wx from '@/wxJsSDK/index.js';
import { getMemberUser } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
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
      tenantlist: [
        {
          name: '选项一'
        }
      ],
      show: false,

      // 个人中心信息获取
      centerObj: {}
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  onLoad() {
    this.mGetMemberUser();
  },
  mounted() {
    // wx.openLocation({
    //   latitude: 30.25308298,
    //   longitude: 120.2155118,
    //   name: '测试位置', // 位置名
    //   address: '测试位置,测试位置', // 地址详情说明
    //   scale: 10 // 地图缩放级别,整型值,范围从1~28。默认为最大
    // });
  },
  methods: {
    // 底部列表点击
    ListOfSet({ name }) {
      if (name === 'setUp') {
        this.$refs.uToast.show({
          message: '正常开发中'
        });
      }
      if (name === 'onlineCustomerService') {
        this.$refs.uToast.show({
          message: '正常开发中'
        });
      }
      if (name === 'usingTheTutorial') {
        this.$refs.uToast.show({
          message: '正常开发中'
        });
      }
      if (name === 'feedback') {
        this.$refs.uToast.show({
          message: '正常开发中'
        });
      }
    },
    // 选择其他门诊
    actionSheetSelect(val) {
      console.log(val);
    },

    // 获取个人中心信息
    async mGetMemberUser() {
      const res = await getMemberUser();
      this.centerObj = res.data;
    }
  }
};
</script>

<style scoped lang="scss">
page {
  background-color: #fff;
}

.container {
  .title {
    height: 70rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      font-size: 28rpx;
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
    padding: 0 30rpx;
    height: 80rpx;
    border-bottom: 1px solid #e1e1e1;

    .left {
      font-size: 26rpx;
      color: #999;
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

  .businessCardInformation {
    display: flex;
    align-items: center;
    padding: 30rpx 30rpx;

    .headPortrait {
      flex: none;
    }

    .nameBox {
      flex: auto;
      margin-left: 20rpx;

      .name {
        font-size: 28rpx;
        font-weight: bold;
      }

      .role {
        margin-top: 10rpx;
        color: #c94950;
        border-radius: 50px;
        border: 1px solid #c94950;
        font-size: 21rpx;
        line-height: 1.6;
        text-align: center;
        width: 140rpx;
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

  .theTeamReport {
    .theTeamReportBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 30rpx;
      margin-top: 10rpx;

      .warpper {
        display: flex;
        flex-direction: column;
        text-align: center;

        .theNumberOf {
          font-weight: bold;
        }

        .text {
          color: #999;
          font-size: 24rpx;
        }
      }
    }
  }

  .commonlyUsedTools {
    padding-bottom: 30rpx;

    .commonlyUsedToolsBox {
      margin-top: 10rpx;
      display: grid;
      row-gap: 20rpx;
      justify-content: space-around;
      justify-items: center;
      grid-template-columns: repeat(4, 120rpx);

      .warpper {
        text-align: center;

        .img {
          width: 90rpx;
          height: 90rpx;
        }

        .name {
          display: block;
          font-size: 24rpx;
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
    padding: 0 30rpx;
  }
}
</style>
