<template>
  <view class="warpper">
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
        <view class="zonglan">
          <view class="title"><text>数据详情</text></view>
          <view class="listBoxItem">
            <view class="listItem">
              <text class="text1">666</text>
              <text class="text2">分享总量</text>
            </view>
            <view class="listItem">
              <text class="text1">666</text>
              <text class="text2">分享总量</text>
            </view>
            <view class="listItem">
              <text class="text1">666</text>
              <text class="text2">分享总量</text>
            </view>
            <view class="listItem">
              <text class="text1">666</text>
              <text class="text2">分享总量</text>
            </view>
          </view>
        </view>

        <!-- 间隔条 -->
        <view style="margin: 0 -20rpx;">
          <u-gap height="16rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#eee"></u-gap>
        </view>

        <!-- 数据列表 -->
        <view class="dataList">
          <u-search placeholder="日照香炉生紫烟"></u-search>

          <view class="title">
            <text class="text1">数据详情</text>
            <text class="text2">共66篇</text>
          </view>

          <!-- 间隔 -->
          <view style="margin: 0 -20rpx;">
            <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>
          </view>

          <view class="dataListItem" @tap.stop="gotoPage('/pages/dataDetails/dataDetails')">
            <text class="time">分享时间：2023-04-12 15:49:35</text>
            <view class="dataListItemBox">
              <view class="title">
                <text class="type">文章</text>
                <text class="name">
                  2022世界杯 | 熬夜看球赛，警惕口腔亮“红牌”！ 这份护牙锦囊请收好
                </text>
              </view>

              <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>

              <view class="dataListItemBottom">
                <text class="text1">观看次数</text>
                <text class="text2">66</text>
              </view>
              <view class="dataListItemBottom">
                <text class="text1">观看次数</text>
                <text class="text2">66</text>
              </view>
              <view class="dataListItemBottom">
                <text class="text1">观看次数</text>
                <text class="text2">66</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js';
import { apiGoods } from '@/api/mock.js';

export default {
  mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
  data() {
    return {
      downOption: {
        use: false // 禁用
      },
      upOption: {
        auto: false, // 不自动加载
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
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

    // 跳转页面
    gotoPage(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>
<style scoped lang="scss">
.listBox {
  padding: 0 20rpx;
}
.zonglan {
  padding-top: 30rpx;
  .title {
    font-size: 26rpx;
    font-weight: bold;
  }
  .listBoxItem {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listItem {
      text-align: center;
      .text1 {
        font-size: 25rpx;
        display: block;
      }
      .text2 {
        padding-top: 10rpx;
        font-size: 25rpx;
        display: block;
      }
    }
  }
}

.dataList {
  > .title {
    margin-top: 20rpx;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text1 {
      font-weight: bold;
    }
  }

  .dataListItem {
    .time {
      font-size: 23rpx;
    }

    .dataListItemBox {
      margin-top: 10rpx;
      padding: 16rpx;
      background-color: #efefef;
      border-radius: 20rpx;

      > .title {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .type {
          display: flex;
          flex: none;
          border: 1px solid #aaa;
          padding: 0 10rpx;
          font-size: 20rpx;
          border-radius: 10rpx;
        }
        .name {
          margin-left: 20rpx;
          font-size: 24rpx;
          font-weight: bold;
          @include overHeiddenText(2);
        }
      }

      .dataListItemBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text1 {
          font-size: 24rpx;
        }
        .text2 {
          padding-top: 10rpx;
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
