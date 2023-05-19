<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <mescroll-body
      :sticky="true"
      @init="mescrollInit"
      @down="downCallback"
      :down="downOption"
      :up="upOption"
      :bottombar="false"
    >
      <!-- 顶部内容 -->
      <!-- <view :style="{
          height: topHeight + 'px',
          overflow: 'hidden'
        }">
        <u-swiper :list="list1" radius="0" indicator circular :height="topHeight" :interval="10000"
          @click="bannerTap"></u-swiper>
      </view> -->
      <!-- 数据列表 -->
      <view class="sticky-tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view>
      <!-- 数据列表 -->
      <swiper :style="{ height: swiperHeight }" :current="tabIndex" @change="swiperChange">
        <!-- 文章 -->
        <swiper-item>
          <mescroll-article
            ref="mescrollItem0"
            :i="0"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-article>
        </swiper-item>
        <!-- 海报 -->
        <swiper-item>
          <mescroll-poster
            :i="1"
            ref="mescrollItem1"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-poster>
        </swiper-item>

        <!-- 视频 -->
        <swiper-item>
          <mescroll-video
            :i="2"
            ref="mescrollItem2"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-video>
        </swiper-item>

        <!-- 活动 -->
        <!-- <swiper-item>
          <mescroll-activity
            ref="mescrollItem3"
            :i="3"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-activity>
        </swiper-item> -->
      </swiper>
    </mescroll-body>

    <!-- 海报预览 -->
    <m-poster-preview></m-poster-preview>

    <!-- 我要投稿 -->
    <view class="contribute" v-if="isMember" @tap.stop="goToPage('/pages/contribute/contribute')">
      <text>投稿</text>
    </view>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import mescrollPoster from './mescroll-poster.vue';
import mescrollActivity from './mescroll-activity.vue';
import mescrollArticle from './mescroll-article.vue';
import mescrollVideo from './mescroll-video.vue';

import { createSourceMaterial } from '@/api/materialLibrary.js';
import { mapGetters } from 'vuex';
export default {
  mixins: [MescrollMixin], // 使用mixin
  components: {
    mescrollPoster,
    mescrollActivity,
    mescrollArticle,
    mescrollVideo
  },
  data() {
    return {
      /*轮播图广告*/
      list1: [
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png'
      ],
      upOption: {
        use: false // 主体框架只启用下拉刷新
      },
      downOption: {
        auto: false // 不自动加载
      },
      topHeight: uni.upx2px(340), // 顶部内容的高度 (单位px)
      swiperHeight: '', // 需要固定swiper的高度 (单位px)
      tabs: [
        { name: '优选文章' },
        { name: '海报素材' },
        { name: '视频素材' }
        // { name: '营销活动' }
      ],
      tabIndex: 0, // 当前菜单下标
      disableScroll: false // swiper列表是否禁止滚动
    };
  },
  computed: {
    ...mapGetters(['isMember'])
  },
  watch: {
    tabIndex(i) {
      if (this.disableScroll) {
        this.disableScroll = false;
        this.$nextTick(() => {
          let mescroll = this.getMescroll(i);
          mescroll && mescroll.scrollTo(0, 0);
          setTimeout(() => {
            this.disableScroll = true;
          }, 300);
        });
      }
    }
  },
  async onLoad() {
    // 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
    this.swiperHeight = uni.getSystemInfoSync().windowHeight - 44 + 'px';
  },
  mounted() {
    // #ifdef H5
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0
    }); // 刷新浏览器,重置滚动条
    // #endif
  },
  methods: {
    downCallback() {
      this.getMescroll(this.tabIndex).resetUpScroll(false);
      /*下拉刷新的回调 */
      setTimeout(() => {
        this.mescroll.endSuccess();
      }, 1000);
    },
    swiperChange(e) {
      // 轮播菜单
      this.tabIndex = e.detail.current;
    },
    getMescroll(i) {
      // 获取指定下标的mescroll对象
      let mescrollItem = this.$refs['mescrollItem' + i];
      if (mescrollItem) return mescrollItem.mescroll;
      return null;
    },
    onPageScroll(e) {
      // 当滚动条小于顶部高度时内部禁止滚动
      // this.disableScroll = Math.ceil(e.scrollTop) < this.topHeight;
      this.disableScroll = false;
    },
    bannerTap(index) {
      // banner图点击
      this.$refs.uToast.show({
        message: '图片' + index
      });
    },
    goToPage(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sticky-tabs {
  z-index: 90;
  position: sticky;
  top: var(--window-top);

  /deep/ .me-tabs {
    height: 44px !important;
    line-height: 44px !important;
    border: none;
    background-color: transparent;
  }

  /deep/ .me-tabs .tab-item {
    padding: 0;
    height: 44px !important;
    line-height: 44px !important;
    font-size: 28rpx;
    font-weight: 600;
    font-family: PingFangSC-Semibold, PingFang SC;
  }
  /deep/ .me-tabs .tabs-item {
    padding-bottom: 0;
    transition: all 0.3s;
  }
  /deep/ .me-tabs .active {
    font-size: 30rpx !important;
    color: $main-color !important;
  }
  /deep/ .me-tabs .tabs-line {
    width: 22px;
    bottom: 3px;
    background-color: transparent;
    height: 6px;
    &:after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      background-image: url('@/static/images/myimg/sicon.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
  }
}

.contribute {
  position: fixed;
  background-color: $main-color;
  color: #fff;
  right: 10px;
  bottom: var(--window-bottom);
  margin-bottom: var(--window-bottom);
  font-size: 24rpx;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

page {
  background-color: #fff;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
