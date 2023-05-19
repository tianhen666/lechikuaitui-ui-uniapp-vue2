<template>
  <view class="container">
    <!-- 提示 -->
    <u-toast ref="uToast" />
    <!-- 切换门诊列表 -->
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
      <text class="left">当前门诊</text>
      <view class="right" v-if="tenantlist.length > 1" @tap.stop="show = true">
        <text class="text">{{ tenantInfo.name }}</text>
        <u-icon name="arrow-down-fill" color="#909399" size="14"></u-icon>
      </view>
      <view class="right" v-else>
        <text class="text">{{ tenantInfo.name }}</text>
      </view>
    </view>

    <view style="margin: 0 -30rpx;"><u-gap height="1" bgColor="#eee"></u-gap></view>

    <!-- 显示登录的用户 -->
    <view class="businessCardInformation">
      <view class="headPortrait">
        <u-avatar :src="userInfo.avatar || userInfo.savatar"></u-avatar>
      </view>

      <view class="nameBox">
        <view class="name">
          <text>{{ userInfo.nickname || userInfo.snickName }}</text>
        </view>
        <view class="role" v-if="isMember">
          <text>{{ userInfo.roleName }}</text>
        </view>
        <view class="role" v-else><text>普通用户</text></view>
      </view>

      <view class="editCard">
        <u-icon name="edit-pen-fill" color="#909399" size="16"></u-icon>
        <text class="text" @tap.stop="gotoPage('/pages/userInfoInput/userInfoInput')">
          编辑名片
        </text>
      </view>
    </view>
    <view style="margin: 0 -30rpx;"><u-gap height="6" bgColor="#eee"></u-gap></view>

    <!-- 团队管理  普通会员不可见 -->
    <view class="theTeamReport" v-if="isMember">
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
      <view style="margin: 0 -30rpx;"><u-gap height="6" bgColor="#eee"></u-gap></view>
    </view>

    <!-- 创建门诊   普通会员可见 -->
    <view class="createClinic" v-if="!isMember">
      <view class="wrapper">
        <button class="btn" @tap.stop="createClinic">创建我的门诊</button>
        <text class="desc">您当前还没有门诊哦,创建一个门诊</text>
      </view>
      <view style="margin: 0 -30rpx;"><u-gap height="6" bgColor="#eee"></u-gap></view>
    </view>

    <!-- 管理工具 -->
    <view class="commonlyUsedTools" v-if="isMember">
      <view class="title">
        <view class="left"><text>管理工具</text></view>
      </view>

      <view class="commonlyUsedToolsBox">
        <view
          class="warpper"
          v-for="(item, index) in managementTool"
          :key="index"
          @tap.stop="gotoPage(item.url)"
        >
          <image class="img" :src="item.imgUrl" mode="aspectFill"></image>
          <text class="name">{{ item.name }}</text>
          <!-- <text class="desc">{{ item.desc }}</text> -->
        </view>
      </view>
      <view style="margin: 0 -30rpx;"><u-gap height="6" bgColor="#eee"></u-gap></view>
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
import { removeUrlParameters } from '@/utils/index.js';
import wx from '@/wxJsSDK/index.js';
import { getMemberUser, getUserListTenant, cutTenant } from '@/api/materialLibrary.js';
import { mapState, mapGetters } from 'vuex';
import { onLoad } from '../../uni_modules/uview-ui/libs/mixin/mixin';
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
          name: '充值中心',
          desc: '未创建',
          imgUrl: '/static/images/empty/us7.png',
          url: '/pages/voucherCenter/voucherCenter'
        },
        {
          name: '订单管理',
          desc: '未创建',
          imgUrl: '/static/images/empty/us6.png',
          url: '/pages/myOrder/myOrder'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isMember'])
  },
  async onLoad() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    this.mGetMemberUser();
    this.mGetUserListTenant();
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
    //创建门诊
    createClinic() {
      if (this.userInfo.mobile) {
        this.gotoPage('/pages/tenantInfoInput/tenantInfoInput');
      } else {
        this.gotoPage('/pages/userInfoInput/userInfoInput?newClinic=1');
      }
    },

    // 底部列表点击
    ListOfSet({ name }) {
      if (name === 'setUp') {
        this.gotoPage('/pages/setUp/setUp');
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
        this.gotoPage('/pages/feedback/feedback');
      }
    },

    actionSheetSelect(val) {
      this.show = false;
      if (val.id === -1) {
        uni.navigateTo({
          url: '/pages/tenantInfoInput/tenantInfoInput'
        });
        return;
      }

      // 门诊ID不相等
      if (this.tenantInfo.id === val.id) {
        return;
      }

      // 选择其他门诊
      this.mCutTenant(val);
    },

    async mCutTenant(val) {
      // 切换门诊
      const res = await cutTenant({ id: val.id });

      // 清理当前的缓存
      uni.clearStorageSync();
      // 设置切换的缓存
      uni.setStorageSync('TENANTID', val.id);

      // 重新打开当前网页
      const href = window.location.href;
      //删除url中code和state
      const newHref = removeUrlParameters(href, ['code', 'state']);
      //重新获取授权链接
      this.$store
        .dispatch('getWXSocialAuthRedirect', { type: 31, redirectUri: newHref })
        .then(res => {
          window.location.href = res;
        });
    },

    // 获取个人中心的数据
    async mGetMemberUser() {
      const res = await getMemberUser();
      this.centerObj = res.data;
    },

    // 获取当前用户下的所有门诊
    async mGetUserListTenant() {
      const res = await getUserListTenant();
      this.tenantlist = [{ name: '创建一个新门诊', color: '#3898ff', fontSize: '28rpx', id: -1 }];
      res.data.forEach(item => {
        if (item.id === this.tenantInfo.id) {
          item.subname = '当前所在门诊';
        }
      });
      this.tenantlist.unshift(...res.data);
    },

    gotoPage(url) {
      // 页面跳转
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>

<style scoped lang="scss">
page {
  background-color: #fff;
}

.container {
  padding: 0 30rpx;
  .title {
    height: 70rpx;
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
    height: 80rpx;

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
    padding: 30rpx 0;

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
        display: inline-block;
        padding: 0 20rpx;
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
      justify-content: space-between;
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
