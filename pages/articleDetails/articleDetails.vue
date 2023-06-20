<template>
  <view>
    <!-- 全屏加载 -->
    <u-loading-page
      :loading="loading"
      loading-mode="spinner"
      icon-size="30"
      fontSize="30rpx"
      bgColor="#fff"
      style="position: fixed;inset: 0;z-index: 999;"
      loadingText="正在加载中..."
    ></u-loading-page>

    <mescroll-body
      v-show="!loading"
      @init="mescrollInit"
      @down="downCallback"
      :down="downOption"
      :up="upOption"
      :bottombar="false"
    >
      <view class="boxArticleDetails">
        <!-- 顶部卡片 -->
        <!-- 有邀请人 -->
        <m-business-card
          v-if="invitationID && invitationTenantID"
          :tenantInfo="invitationTenantInfo"
          :userInfo="invitationUserInfo"
          :invitation="true"
        ></m-business-card>
        <!-- 没有邀请人 -->
        <m-business-card
          v-else
          :tenantInfo="tenantInfo"
          :userInfo="userInfo"
          :invitation="false"
        ></m-business-card>

        <view>
          <!-- 标题 -->
          <view class="title" v-if="invitationID && invitationTenantID">
            {{ `(${invitationTenantInfo.name})` + articleObj.name }}
          </view>
          <view class="title" v-else>{{ `(${tenantInfo.name})` + articleObj.name }}</view>

          <!-- 发布时间和分类 -->
          <view class="classAndTime">
            <view class="class">
              <text style="padding-right: 10rpx;">分类:</text>
              <text>{{ articleObj.type }}</text>
            </view>

            <view class="time">
              <text style="padding-right: 10rpx;">创建时间:</text>
              <text>{{ _$mDayJs(articleObj.createTime, 2) }}</text>
            </view>
          </view>

          <!-- 小程序广告 -->
          <!-- 有邀请人 -->
          <view class="applet" v-if="invitationID && invitationTenantID">
            <m-applet-ad
              :tenantInfo="invitationTenantInfo"
              :userInfo="invitationUserInfo"
              :invitation="true"
            ></m-applet-ad>
          </view>
          <!-- 没有邀请人 -->
          <view class="applet" v-else>
            <m-applet-ad
              :tenantInfo="tenantInfo"
              :userInfo="userInfo"
              :invitation="false"
            ></m-applet-ad>
          </view>

          <!-- 内容 -->
          <view class="content">
            <mp-html :content="articleObj.content" lazyLoad @load="htmlLoad" />
          </view>
        </view>

        <!-- 小程序广告 -->
        <!-- 有邀请人 -->
        <view class="applet" v-if="invitationID && invitationTenantID">
          <m-applet-ad
            position="bottom"
            :tenantInfo="invitationTenantInfo"
            :userInfo="invitationUserInfo"
            :invitation="true"
          ></m-applet-ad>
        </view>
        <!-- 没有邀请人 -->
        <view class="applet" v-else>
          <m-applet-ad
            position="bottom"
            :tenantInfo="tenantInfo"
            :userInfo="userInfo"
            :invitation="false"
          ></m-applet-ad>
        </view>

        <!-- 底部卡片 -->
        <!-- 有邀请人 -->
        <m-business-card-bottom
          v-if="invitationID && invitationTenantID"
          :tenantInfo="invitationTenantInfo"
          :userInfo="invitationUserInfo"
          :invitation="true"
        ></m-business-card-bottom>
        <!-- 没有邀请人 -->
        <m-business-card-bottom
          v-else
          :tenantInfo="tenantInfo"
          :userInfo="userInfo"
          :invitation="false"
        ></m-business-card-bottom>

        <!-- 内部环境照 -->
        <!-- 有邀请人 -->
        <m-environmental-photos
          v-if="invitationID && invitationTenantID"
          :tenantInfo="invitationTenantInfo"
          :invitation="true"
        ></m-environmental-photos>
        <!-- 没有邀请人 -->
        <m-environmental-photos
          v-else
          :tenantInfo="tenantInfo"
          :invitation="false"
        ></m-environmental-photos>

        <view class="jszc"><text>口腔推提供技术支持</text></view>
      </view>
    </mescroll-body>

    <!-- 修改成我的, 有邀请人, 并且邀请人不是自己 -->
    <view class="fixdBottom" v-if="!!invitationID && invitationID != userInfo.id">
      <view class="btnBox111" @tap.stop="modifyToMine">
        <button class="btn">免费修改成我的</button>
      </view>
    </view>

    <!-- 立即分享 -->
    <view class="contribute" @tap.stop="pointShareShow = true"><text>分享</text></view>

    <!-- 弹窗提示 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$tipsPopupBtn1"
    ></m-uni-popup>

    <!-- 分享提示 -->
    <point-share
      width="450rpx"
      :show="pointShareShow"
      @close="pointShareShow = false"
    ></point-share>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getSourceMaterialId } from '@/api/materialLibrary.js';
import wx from '@/wxJsSDK/index.js';
import { mapState, mapGetters } from 'vuex';
import { delay } from '@/utils/index.js';
export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      upOption: {
        use: false, // 主体框架只启用下拉刷新
        toTop: {
          bottom: 460,
          zIndex: 20
        }
      },
      downOption: {
        auto: false // 不自动加载
      },

      id: 0, //资源ID
      articleObj: {}, // 素材内容

      invitationID: 0, //邀请人的ID
      invitationTenantID: 0, // 邀请人的门诊ID

      loading: true, // 富文本加载中

      // 分享引导
      pointShareShow: false,

      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: ''
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo,
      invitationTenantInfo: state => state.tenant.invitationInfo,
      invitationUserInfo: state => state.user.invitationInfo
    }),
    ...mapGetters(['isMember', 'isTenantExpired'])
  },
  async onLoad({ id, invitationID, invitationTenantID }) {
    // 等待onLaunch执行完成
    await this.$onLaunched;

    // 设置邀请人的ID
    this.invitationID = Number(invitationID) || 0;
    // 邀请的门诊ID
    this.invitationTenantID = Number(invitationTenantID) || 0;

    // 设置资源ID
    this.id = Number(id) || 0;

    // 获取邀请人的, 个人信息, 门诊信息
    if (invitationID && invitationTenantID) {
      this.$store.dispatch('invitationInfoFun', {
        clueId: invitationID,
        tenantId: invitationTenantID
      });

      this.$store.dispatch('getShareTenantInfo', {
        tenantId: invitationTenantID
      });
    }

    // 获取素材资源
    this.getData();
  },
  methods: {
    /*下拉刷新的回调 */
    downCallback() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
    /*富文本加载完成 */
    htmlLoad(val) {
      this.loading = false;
    },

    /** 获取资源 */
    async getData() {
      // 稍微延时下,防止邀请人的信息没有加载
      await delay(300);

      getSourceMaterialId({
        id: this.id,
        clueId: this.invitationID,
        clueTenantId: this.invitationTenantID
      }).then(res => {
        this.articleObj = res.data;

        // 设置页面标题
        let tenantName = '';
        if (this.invitationID && this.invitationTenantID) {
          tenantName = this.invitationTenantInfo.name;
        } else {
          tenantName = this.tenantInfo.name;
        }
        uni.setNavigationBarTitle({
          title: `(${tenantName})` + this.articleObj.name || '文章详情'
        });

        // 微信jsdk初始化
        wx.initJssdk(() => {
          // 朋友分享
          wx.updateAppMessageShareData({
            title: `（${this.tenantInfo.name}）${this.articleObj.name}` || '',
            desc: this.articleObj.description || '',
            link: `${window.location.href.split('?')[0]}?id=${this.articleObj.id}&invitationID=${
              this.userInfo.id
            }&invitationTenantID=${this.tenantInfo.id}`,
            imgUrl: this.articleObj.coverImage
          });

          // 朋友圈分享
          wx.updateTimelineShareData({
            title: `（${this.tenantInfo.name}）${this.articleObj.name}` || '',
            link: `${window.location.href.split('?')[0]}?id=${this.articleObj.id}&invitationID=${
              this.userInfo.id
            }&invitationTenantID=${this.tenantInfo.id}`,
            imgUrl: this.articleObj.coverImage
          });

          this.mescroll.endSuccess();
        });
      });
    },
    // 修改成我的
    modifyToMine() {
      if (this._$verifyPopup()) {
        this._$reLaunchGotoPage(`/pages/articleDetails/articleDetails?id=${this.id}`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
page {
  background-color: #fff;
}
.boxArticleDetails {
  .title {
    margin-top: 30rpx;
    line-height: 1.6;
    font-size: 38rpx;
    padding: 20rpx 15px 0;
  }

  .classAndTime {
    padding: 0 15px 0;
    font-size: 25rpx;
    margin-top: 20rpx;
    display: flex;
    .class {
      color: #999;
    }
    .time {
      color: #999;
      margin-left: 30rpx;
    }
  }

  .applet {
    padding: 5px 15px 0px;
    margin: 15px 0px;
  }

  .jszc {
    padding-top: 30rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    text-align: center;
    color: #999;
    font-size: 22rpx;
  }
}

.fixdBottom {
  height: 80rpx;
  padding-top: 10rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  .btnBox111 {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #eee;
    height: 70rpx;
    z-index: 999;
    padding-top: 20rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    .btn {
      width: 680rpx;
      background-color: $sub-color;
      color: #fff;
      font-size: 28rpx;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 50px;
    }
  }
}

.contribute {
  position: fixed;
  z-index: 20;
  background-color: $main-color;
  color: #fff;
  right: 10px;
  bottom: 600rpx;
  font-size: 24rpx;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
