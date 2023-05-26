<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <!-- 分类列表 -->
    <view class="tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view>
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

    <!-- 海报预览 -->
    <m-poster-preview></m-poster-preview>

    <!-- 引导 -->
    <xky-guideStep :step="step"></xky-guideStep>

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
  components: {
    mescrollPoster,
    mescrollActivity,
    mescrollArticle,
    mescrollVideo
  },
  data() {
    return {
      swiperHeight: '', // 需要固定swiper的高度 (单位px)
      tabs: [
        { name: '优选文章' },
        { name: '海报素材' },
        { name: '视频素材' }
        // { name: '营销活动' }
      ],
      tabIndex: 0, // 当前菜单下标
      disableScroll: false, // swiper列表是否禁止滚动

      step: {
        name: 'workbenchKey',
        repeat: false,
        guideList: [
          {
            el: '.tabs',
            tips: '步骤一,选择您需要的素材分类',
            style: 'border-radius: 8rpx;margin: 0;',
            next: '下一步'
          },
          {
            el: '.search',
            tips: '步骤二,输入关键字搜索',
            style: 'border-radius: 8rpx;margin: 0;',
            next: '下一步'
          },
          {
            el: '.btnBox',
            tips: '步骤三,选择素材的子分类',
            style: 'border-radius: 8rpx;margin: 0;',
            next: '下一步'
          },
          {
            el: '.warpperActicle',
            tips: '步骤四,选择一个素材进行分享',
            style: 'border-radius: 8rpx;margin: 0;',
            next: '完成'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['isMember'])
  },
  async onLoad() {
    // 需要固定swiper的高度 (需减去悬浮tabs的高度)
    this.swiperHeight = uni.getSystemInfoSync().windowHeight - 54 + 'px';
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
    swiperChange(e) {
      // 滑动屏
      this.tabIndex = e.detail.current;
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
.tabs {
  margin-top: 10px;
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
