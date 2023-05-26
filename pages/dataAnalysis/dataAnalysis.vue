<template>
  <view>
    <!-- 数据列表 -->
    <view class="tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view>
    <!-- 数据列表 -->
    <swiper :style="{ height: swiperHeight }" :current="tabIndex" @change="swiperChange">
      <swiper-item>
        <mescroll-a
          :i="0"
          :ref="'mescrollItem' + 0"
          :index="tabIndex"
          :tabs="tabs"
          :height="swiperHeight"
          :disable-scroll="disableScroll"
        ></mescroll-a>
      </swiper-item>
      <swiper-item>
        <mescroll-b
          :i="1"
          :ref="'mescrollItem' + 1"
          :index="tabIndex"
          :tabs="tabs"
          :height="swiperHeight"
          :disable-scroll="disableScroll"
        ></mescroll-b>
      </swiper-item>
      <!-- <swiper-item>
          <mescroll-c :i="0" :ref="'mescrollItem' + 2" :index="tabIndex" :tabs="tabs" :height="swiperHeight"
            :disable-scroll="disableScroll"></mescroll-c>
        </swiper-item> -->
    </swiper>
  </view>
</template>

<script>
import mescrollA from './mescroll-a.vue';
import mescrollB from './mescroll-b.vue';
import mescrollC from './mescroll-c.vue';
export default {
  components: {
    mescrollA,
    mescrollB,
    mescrollC
  },
  data() {
    return {
      swiperHeight: '', // 需要固定swiper的高度 (单位px)
      tabs: [
        { name: '素材数据' },
        { name: '浏览人数' }
        //{name: '员工数据排行'}
      ],
      tabIndex: 0, // 当前菜单下标
      disableScroll: false // swiper列表是否禁止滚动
    };
  },
  onLoad() {
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
    swiperChange(e) {
      // 轮播菜单
      this.tabIndex = e.detail.current;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
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
page {
  background-color: #fff;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
