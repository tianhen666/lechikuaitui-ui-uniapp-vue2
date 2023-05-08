<template>
  <view class="box">
    <m-business-card></m-business-card>
    <!-- 标题 -->
    <view class="title">{{ articleObj.name }}</view>

    <!-- 内容 -->
    <view class="content"><mp-html :content="articleObj.content" /></view>

    <m-business-card-a></m-business-card-a>
  </view>
</template>

<script>
import { getSourceMaterialId } from '@/api/materialLibrary.js';
import wx from '@/wxJsSDK/index.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      articleObj: {}
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  onLoad({ id, invitationID }) {
    getSourceMaterialId({ id, clueId: invitationID }).then(res => {
      this.articleObj = res.data;

      // 微信jsdk初始化
      wx.initJssdk(() => {
        // 朋友分享
        wx.updateAppMessageShareData({
          title: `《${this.tenantInfo.name}-${this.userInfo.nickname ||
            this.userInfo.snickName}》推荐-${this.articleObj.name}`,
          desc: this.articleObj.description,
          link: `${window.location.href}&invitationID=${this.userInfo.id}`,
          imgUrl: this.articleObj.coverImage
        });

        // 朋友圈分享
        wx.updateTimelineShareData({
          title: `《${this.tenantInfo.name}-${this.userInfo.nickname ||
            this.userInfo.snickName}》推荐-${this.articleObj.name}`,
          link: `${window.location.href}&invitationID=${this.userInfo.id}`,
          imgUrl: this.articleObj.coverImage
        });
      });
    });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
page {
  background-color: #fff;
}

.title {
  margin: 0 20rpx;
  line-height: 2;
  font-size: 38rpx;
}
</style>
-->
