<template>
  <view>
    <mescroll-body :sticky="true" @init="mescrollInit" @down="downCallback" :up="upOption">
      <!-- 顶部内容 -->
      <view :style="{ height: topHeight + 'px', overflow: 'hidden' }">
        <image style="width: 100%;height: 340rpx;" src="https://www.mescroll.com/img/swiper1.jpg" />
      </view>

      <!-- 数据列表 -->
      <view class="sticky-tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view>
      <!-- 数据列表 -->
      <swiper :style="{ height: swiperHeight }" :current="tabIndex" @change="swiperChange">
        <swiper-item v-for="(tab, i) in tabs" :key="i">
          <!-- 海报 -->
          <mescroll-poster
            :ref="'mescrollItem' + i"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
            v-if="i === 0"
          ></mescroll-poster>
          <!-- 视频 -->
          <mescroll-video
            :ref="'mescrollItem' + i"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
            v-if="i === 1"
          ></mescroll-video>
          <!-- 文章 -->
          <mescroll-article
            :ref="'mescrollItem' + i"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
            v-if="i === 2"
          ></mescroll-article>
          <!-- 活动 -->
          <mescroll-activity
            :ref="'mescrollItem' + i"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
            v-if="i === 3"
          ></mescroll-activity>
        </swiper-item>
      </swiper>
    </mescroll-body>

    <!-- 海报预览 -->
    <m-poster-preview></m-poster-preview>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import mescrollPoster from './mescroll-poster.vue';
import mescrollActivity from './mescroll-activity.vue';
import mescrollArticle from './mescroll-article.vue';
import mescrollVideo from './mescroll-video.vue';
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
      upOption: {
        use: false // 主体框架只启用下拉刷新
      },
      topHeight: uni.upx2px(340), // 顶部内容的高度 (单位px)
      swiperHeight: '', // 需要固定swiper的高度 (单位px)
      tabs: [
        { name: '海报素材' },
        { name: '视频素材' },
        { name: '优选文章' },
        { name: '营销活动' }
      ],
      tabIndex: 0, // 当前菜单下标
      disableScroll: true // swiper列表是否禁止滚动
    };
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
  onLoad() {
    // 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
    this.swiperHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px';
  },
  mounted() {
    // #ifdef H5
    uni.pageScrollTo({ scrollTop: 0, duration: 0 }); // 刷新浏览器,重置滚动条
    // #endif
  },
  methods: {
    downCallback() {
      /*下拉刷新的回调 */
      this.mescroll.endSuccess();
    },
    swiperChange(e) {
      // 轮播菜单
      this.tabIndex = e.detail.current;
    },
    getMescroll(i) {
      // 获取指定下标的mescroll对象
      let mescrollItems = this.$refs.mescrollItem;
      if (mescrollItems) {
        let item = mescrollItems[i];
        if (item) return item.mescroll;
      }
      return null;
    },
    onPageScroll(e) {
      // 页面的滚动事件
      this.disableScroll = Math.ceil(e.scrollTop) < this.topHeight;
    }
  }
};
</script>

<style lang="scss">
.sticky-tabs {
  z-index: 90;
  position: sticky;
  top: var(--window-top);
  background-color: #fff;
}
page {
  background-color: #fff;
}
</style>
