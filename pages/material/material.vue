<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <mescroll-body
      :sticky="true"
      @init="mescrollInit"
      @down="downCallback"
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
        <!-- 海报 -->
        <swiper-item>
          <mescroll-poster
            :i="0"
            ref="mescrollItem0"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-poster>
        </swiper-item>

        <!-- 视频 -->
        <swiper-item>
          <mescroll-video
            :i="1"
            ref="mescrollItem1"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-video>
        </swiper-item>

        <!-- 文章 -->
        <swiper-item>
          <mescroll-article
            ref="mescrollItem2"
            :i="2"
            :index="tabIndex"
            :tabs="tabs"
            :height="swiperHeight"
            :disable-scroll="disableScroll"
          ></mescroll-article>
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
      /*轮播图广告*/
      list1: [
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png'
      ],
      upOption: {
        use: false // 主体框架只启用下拉刷新
      },
      topHeight: uni.upx2px(340), // 顶部内容的高度 (单位px)
      swiperHeight: '', // 需要固定swiper的高度 (单位px)
      tabs: [
        {
          name: '海报素材'
        },
        {
          name: '视频素材'
        },
        {
          name: '优选文章'
        }
        // { name: '营销活动' }
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
    this.swiperHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 1 + 'px';
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
      /*下拉刷新的回调 */
      this.mescroll.endSuccess();
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
