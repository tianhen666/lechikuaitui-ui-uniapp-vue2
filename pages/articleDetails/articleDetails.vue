<template>
  <mescroll-body
    :sticky="true"
    @init="mescrollInit"
    @down="downCallback"
    :down="downOption"
    :up="upOption"
    :bottombar="false"
  >
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
        <!-- 顶部卡片 -->
        <!-- 有邀请人 -->
        <m-business-card-invitation v-if="invitationID"></m-business-card-invitation>
        <!-- 没有邀请人 -->
        <m-business-card v-else></m-business-card>

        <view
          style="background-color: #fff;
        border-radius: 20rpx;
        width: 720rpx;
        margin: 20rpx auto;
        overflow: hidden;
        padding-bottom: 40rpx;
        "
        >
          <!-- 标题 -->
          <view class="title">{{ articleObj.name }}</view>

          <!-- 发布时间和分类 -->
          <view class="classAndTime">
            <view class="class">
              <text style="padding-right: 10rpx;">分类:</text>
              <text>{{ articleObj.type }}</text>
            </view>

            <view class="time">
              <text style="padding-right: 10rpx;">创建时间:</text>
              <text>{{ mDayjs(articleObj.createTime) }}</text>
            </view>
          </view>

          <view style="margin-top: 15rpx;padding: 10rpx 20rpx 0;">
            <u-line color="#ddd"></u-line>
          </view>

          <!-- 内容 -->
          <view class="content">
            <mp-html :content="articleObj.content" lazyLoad @load="htmlLoad" />
          </view>
        </view>

        <!-- 底部卡片 -->
        <!-- 有邀请人 -->
        <m-business-card-bottom-invitation v-if="invitationID"></m-business-card-bottom-invitation>
        <!-- 没有邀请人 -->
        <m-business-card-bottom v-else></m-business-card-bottom>

        <view class="btnBox"><text class="text">口腔推提供技术支持</text></view>

        <!-- 修改成我的,有邀请人并且邀请人不是自己 -->
        <view class="fixdBottom" v-if="!!invitationID && invitationID != userInfo.id">
          <view class="btnBox111" @tap.stop="myClinic">
            <button class="btn">修改成我的</button>
          </view>
        </view>

        <!-- 没有邀请人并且没有店铺 -->
        <view class="fixdBottom" v-if="!invitationID && !isMember">
          <view class="btnBox111" @tap.stop="createClinic">
            <button class="btn">创建我的店铺</button>
          </view>
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getSourceMaterialId } from '@/api/materialLibrary.js';
import wx from '@/wxJsSDK/index.js';
import { mapState, mapGetters } from 'vuex';
import { removeUrlParameters } from '@/utils/index.js';
import dayjs from 'dayjs';
export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      upOption: {
        use: false, // 主体框架只启用下拉刷新
        toTop: {
          bottom: 360
        }
      },
      downOption: {
        auto: false // 不自动加载
      },

      id: 0, //资源ID
      articleObj: {}, // 素材内容

      invitationID: 0, //邀请人的ID
      invitationTenantID: 0, // 邀请人的门诊ID

      loading: true // 富文本加载中
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
    this.invitationID = Number(invitationID) || 0;
    // 邀请的门诊ID
    this.invitationTenantID = Number(invitationTenantID) || 0;

    // 设置资源ID
    this.id = Number(id) || 0;

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
  },
  methods: {
    /*下拉刷新的回调 */
    downCallback() {
      setTimeout(() => {
        this.mescroll.endSuccess();
      }, 1000);
    },
    mDayjs(val) {
      // 时间处理
      return dayjs(val).format('YYYY-MM-DD HH:ss:mm');
    },
    htmlLoad(val) {
      // 富文本加载完成
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    getData() {
      // 获取资源
      getSourceMaterialId({
        id: this.id,
        clueId: this.invitationID,
        clueTenantId: this.invitationTenantID
      }).then(res => {
        this.articleObj = res.data;

        // 设置标题
        uni.setNavigationBarTitle({
          title: this.articleObj.name || '文章详情'
        });

        // 微信jsdk初始化
        wx.initJssdk(() => {
          // 朋友分享
          wx.updateAppMessageShareData({
            title: `（${this.tenantInfo.name}）${this.articleObj.name}`,
            desc: this.articleObj.description,
            link: `${window.location.href.split('?')[0]}?id=${this.articleObj.id}&invitationID=${
              this.userInfo.id
            }&invitationTenantID=${this.tenantInfo.id}`,
            imgUrl: this.articleObj.coverImage
          });

          // 朋友圈分享
          wx.updateTimelineShareData({
            title: `（${this.tenantInfo.name}）${this.articleObj.name}`,
            link: `${window.location.href.split('?')[0]}?id=${this.articleObj.id}&invitationID=${
              this.userInfo.id
            }&invitationTenantID=${this.tenantInfo.id}`,
            imgUrl: this.articleObj.coverImage
          });
        });
      });
    },
    // 判断是否有店铺
    myClinic() {
      if (this.isMember) {
        // 如果有店铺
        uni.redirectTo({
          url: `/pages/articleDetails/articleDetails?id=${this.id}`
        });
      } else {
        //如果没有店铺
        this.createClinic();
      }
    },
    //创建店铺
    createClinic() {
      // 判断是否有手机号
      if (this.userInfo.mobile) {
        this.gotoPage('/pages/tenantInfoInput/tenantInfoInput');
      } else {
        this.gotoPage('/pages/userInfoInput/userInfoInput?newClinic=1');
      }
    },
    // 关闭所有页面跳转
    gotoPage(url) {
      uni.reLaunch({
        url: url
      });
    }
  }
};
</script>

<style scoped lang="scss">
.boxArticleDetails {
  .title {
    line-height: 1.4;
    font-size: 38rpx;
    padding: 20rpx 20rpx 0;
  }

  .classAndTime {
    padding: 10rpx 20rpx 0;
    font-size: 25rpx;
    margin-top: 0;
    .class {
      color: #999;
    }
    .time {
      color: #999;
      margin-top: 10rpx;
    }
  }

  .btnBox {
    overflow: hidden;
    text-align: center;
    padding-bottom: 20rpx;
    .text {
      color: #999;
      font-size: 22rpx;
    }
  }

  .fixdBottom {
    height: 90rpx;
    .btnBox111 {
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: #eee;
      height: 90rpx;
      z-index: 999;
      .btn {
        margin-top: 15rpx;
        width: 680rpx;
        background-color: $sub-color;
        color: #fff;
        font-size: 25rpx;
        height: 55rpx;
        line-height: 55rpx;
        border-radius: 50px;
      }
    }
  }
}

page {
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
