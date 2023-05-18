<template>
  <view class="boxArticleDetails">
    <u-loading-page
      :loading="loading"
      loading-mode="spinner"
      icon-size="30"
      fontSize="30rpx"
      bgColor="#fff"
      style="position: fixed;inset: 0;z-index: 999;"
      loadingText="正在加载中..."
    ></u-loading-page>

    <view v-show="!loading">
      <!-- 顶部 -->
      <!-- 有邀请人 -->
      <m-business-card-invitation v-if="invitationID"></m-business-card-invitation>
      <!-- 没有邀请人 -->
      <m-business-card v-else></m-business-card>
      <!-- 标题 -->
      <view class="title">{{ articleObj.name }}</view>
      <!-- 内容 -->
      <view class="content">
        <mp-html :content="articleObj.content" lazyLoad @load="htmlLoad" />
      </view>

      <!-- 底部卡片 -->
      <m-business-card-bottom-invitation v-if="invitationID"></m-business-card-bottom-invitation>
      <m-business-card-bottom v-else></m-business-card-bottom>

      <!-- 修改成我的 -->
      <view class="btnBox">
        <view
          class="btn_box"
          v-if="!!invitationID && invitationID != userInfo.id"
          @tap.stop="myClinic"
        >
          <button class="btn">修改成我的门诊</button>
        </view>
        <text class="text">口腔推提供技术支持</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getSourceMaterialId, getUserListTenant, getShareUser } from '@/api/materialLibrary.js';
import wx from '@/wxJsSDK/index.js';
import { mapState, mapGetters } from 'vuex';
import { removeUrlParameters } from '@/utils/index.js';
export default {
  data() {
    return {
      id: 0, //资源ID
      articleObj: {}, // 素材内容

      invitationID: 0, //邀请人的ID
      invitationTenantId: 0, // 邀请人的门诊ID

      loading: true, // 富文本加载中

      tenantlist: [] // 我的门诊列表
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isMember'])
  },
  async onLoad({ id, invitationID, invitationTenantID }) {
    // 等待onLaunch执行完成
    await this.$onLaunched;

    // 设置邀请人的ID
    this.invitationID = invitationID;
    // 邀请的门诊ID
    this.invitationTenantID = invitationTenantID;

    // 设置资源ID
    this.id = id;

    if (invitationID && invitationTenantID) {
      // 获取邀请人的个人信息
      this.$store.dispatch('invitationInfoFun', {
        clueId: invitationID,
        tenantId: invitationTenantID
      });

      // 获取邀请门诊的个人信息
      this.$store.dispatch('getShareTenantInfo', {
        tenantId: invitationTenantID
      });
    }

    // 获取素材资源
    this.getData();

    //获取门诊列表
    this.mGetUserListTenant();
  },
  methods: {
    htmlLoad(val) {
      // 富文本加载完成
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    getData() {
      // 获取资源
      getSourceMaterialId({ id: this.id, clueId: this.invitationID }).then(res => {
        this.articleObj = res.data;

        // 微信jsdk初始化
        wx.initJssdk(() => {
          // 朋友分享
          wx.updateAppMessageShareData({
            title: `${this.tenantInfo.name}--${this.articleObj.name}`,
            desc: this.articleObj.description,
            link: `${window.location.href.split('?')[0]}?id=${this.articleObj.id}&invitationID=${
              this.userInfo.id
            }&invitationTenantID=${this.tenantInfo.id}`,
            imgUrl: this.articleObj.coverImage
          });

          // 朋友圈分享
          wx.updateTimelineShareData({
            title: `${this.tenantInfo.name}--${this.articleObj.name}`,
            link: `${window.location.href.split('?')[0]}?id=${this.articleObj.id}&invitationID=${
              this.userInfo.id
            }&invitationTenantID=${this.tenantInfo.id}`,
            imgUrl: this.articleObj.coverImage
          });
        });
      });
    },
    myClinic() {
      if (this.isMember) {
        // 如果有店铺
        const newHref = removeUrlParameters(window.location.href, [
          'invitationID',
          'invitationTenantID'
        ]);
        window.location.href = newHref;
      } else {
        //如果没有店铺
      }
    },
    async mGetUserListTenant() {
      // 获取当前用户拥有的门诊
      const res = await getUserListTenant();
      this.tenantlist = res.data;
    }
  }
};
</script>

<style scoped lang="scss">
page {
  background-color: #fff;
}

.boxArticleDetails {
  padding-bottom: 60rpx;
  .title {
    margin: 10rpx 50rpx;
    line-height: 2;
    font-size: 38rpx;
  }

  .btnBox {
    overflow: hidden;
    text-align: center;
    margin-top: 30rpx;
    .btn {
      background-color: $sub-color;
      color: #fff;
      font-size: 20rpx;
      line-height: 2.2;
      display: inline-block;
      border-radius: 50px;
    }
    .text {
      color: #999;
      font-size: 20rpx;
    }
  }
}
page {
  background-color: #fff;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
