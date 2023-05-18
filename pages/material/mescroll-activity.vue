<template>
  <view class="warpper">
    <view class="boxTop">
      <view class="search">
        <u-search
          bgColor="#fff"
          :showAction="false"
          height="72rpx"
          placeholder="日照香炉生紫烟"
        ></u-search>
      </view>
      <m-button-box
        :m-index="btnIndex"
        @switch-classification="switchClassification"
      ></m-button-box>
    </view>

    <mescroll-uni
      @init="mescrollInit"
      :height="height"
      :disable-scroll="disableScroll"
      :down="downOption"
      :up="upOption"
      @up="upCallback"
      @emptyclick="emptyClick"
    >
      <view class="listBox">
        <m-article-list @tapItem="tapItem" list-type="activity"></m-article-list>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { apiGoods } from '@/api/mock.js';

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      downOption: {
        use: false // 禁用
      },
      upOption: {
        auto: false, // 不自动加载
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        }
      },
      goods: [], //列表数据
      btnIndex: 0
    };
  },
  props: {
    index: {
      type: Number,
      default() {
        return 0;
      }
    },
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    height: [Number, String], // mescroll的高度
    disableScroll: Boolean // 是否禁止滚动, 默认false
  },
  methods: {
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      //联网加载数据
      let keyword = this.tabs[this.i].name;
      apiGoods(page.num, page.size, keyword)
        .then(res => {
          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endSuccess(res.list.length);
          //设置列表数据
          if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
          this.goods = this.goods.concat(res.list); //追加新数据
        })
        .catch(() => {
          //联网失败, 结束加载
          this.mescroll.endErr();
        });
    },
    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      });
    },

    // 切换分类索引
    switchClassification(index) {
      this.btnIndex = index;
    },

    //点击单个项目
    tapItem(item) {
      this.gotoPage('/pages/activityDetails/activityDetails');
    },
    // 页面跳转
    gotoPage(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>
<style scoped lang="scss">
.boxTop {
  padding: 20rpx 20rpx 20rpx;
  .search {
    margin-bottom: 30rpx;
  }
}
.listBox {
  padding: 0 20rpx;
}
</style>
