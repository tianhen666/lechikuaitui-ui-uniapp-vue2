<template>
  <view>
    <mescroll-body :sticky="true" @init="mescrollInit" @down="downCallback" :up="upOption">
      <!-- 数据列表 -->
      <view class="sticky-tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view>
      <!-- 数据列表 -->
      <swiper :style="{ height: swiperHeight }" :current="tabIndex" @change="swiperChange">
        <swiper-item>
          <mescroll-a :ref="'mescrollItem' + 0" :index="tabIndex" :tabs="tabs" :height="swiperHeight"
            :disable-scroll="disableScroll"></mescroll-a>
        </swiper-item>
        <swiper-item>
          <mescroll-b :ref="'mescrollItem' + 1" :index="tabIndex" :tabs="tabs" :height="swiperHeight"
            :disable-scroll="disableScroll"></mescroll-b>
        </swiper-item>
        <!-- <swiper-item>
          <mescroll-c :ref="'mescrollItem' + 2" :index="tabIndex" :tabs="tabs" :height="swiperHeight"
            :disable-scroll="disableScroll"></mescroll-c>
        </swiper-item> -->
      </swiper>
    </mescroll-body>
  </view>
</template>

<script>
  import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
  import mescrollA from './mescroll-a.vue';
  import mescrollB from './mescroll-b.vue';
  import mescrollC from './mescroll-c.vue';
  export default {
    mixins: [MescrollMixin], // 使用mixin
    components: {
      mescrollA,
      mescrollB,
      mescrollC
    },
    data() {
      return {
        upOption: {
          use: false // 主体框架只启用下拉刷新
        },
        topHeight: uni.upx2px(0), // 顶部内容的高度 (单位px)
        swiperHeight: '', // 需要固定swiper的高度 (单位px)
        tabs: [{
            name: '数据总览'
          },
          {
            name: '线索列表'
          },
          //{name: '员工数据排行'}
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
      this.swiperHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px';
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