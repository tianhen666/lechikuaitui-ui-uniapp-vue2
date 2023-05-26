<template>
  <view class="warpper">
    <view class="listBox">
      <u-search
        :showAction="false"
        bgColor="#fff"
        placeholder="输入素材名称搜索"
        v-model="searchName"
        @search="mySearch"
        @custom="mySearch"
      ></u-search>

      <view class="zonglan">
        <view class="listBoxItem">
          <view class="listItem">
            <text class="text2">浏览总人数：</text>
            <text class="text1">{{ total }}</text>
          </view>
        </view>
      </view>
    </view>

    <mescroll-uni
      @init="mescrollInit"
      :height="height"
      :disable-scroll="disableScroll"
      :down="downOption"
      :up="upOption"
      @up="upCallback"
      @down="downCallback"
      @emptyclick="emptyClick"
      :bottombar="false"
      bottom="90px"
    >
      <view class="detailsBox">
        <view
          class="detailsItem"
          v-for="(item, index) in dataList"
          :key="item.id"
          @tap.stop="gotoPage(`/pages/clueDetails/clueDetails?id=${item.id}`)"
        >
          <view class="time">最新浏览时间：{{ mDayJs(item.createTime) }}</view>

          <view class="info">
            <view class="left"><u-avatar :src="item.avatar || item.savatar"></u-avatar></view>

            <view class="right">
              <view class="text1">{{ item.nickname || item.snickName }}</view>
              <view class="text2">联系电话：{{ item.mobile || '无' }}</view>
            </view>
          </view>

          <view class="bottom">
            <view class="bottomItem">
              <text class="text text1">浏览总次数：</text>
              <text class="text text2">{{ item.readerCount }}次</text>
            </view>

            <view class="bottomItem">
              <text class="text text1">浏览素材总数量：</text>
              <text class="text text2">{{ item.sourceMaterialIdCount }}个</text>
            </view>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import dayJs from 'dayjs';
import { getMemberUserList } from '@/api/materialLibrary.js';

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      downOption: {
        auto: false
      },
      upOption: {
        auto: false,
        textNoMore: '--已经到底了--',
        empty: {
          tip: '~ 空空如也 ~'
        }
      },
      dataList: [], //列表数据
      searchName: '',
      total: 0
    };
  },
  props: {
    i: {
      type: Number,
      default() {
        return 0;
      }
    },
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
  async mounted() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;
    // 获取分类
    this.mescroll.resetUpScroll(false);
  },
  methods: {
    downCallback() {
      setTimeout(() => {
        this.mescroll.resetUpScroll(false);
      }, 500);
    },
    upCallback(page) {
      // let keyword = this.tabs[this.i].name;
      getMemberUserList({
        nickName: this.searchName,
        pageNo: page.num,
        pageSize: page.size
      })
        .then(res => {
          this.mescroll.endBySize(res.data.list.length, res.data.total);

          this.total = res.data.total; //数据总量

          if (page.num === 1) this.dataList.length = 0;
          this.dataList = this.dataList.concat(res.data.list);
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
    // 时间转换
    mDayJs(val) {
      return dayJs(val).format('YYYY-MM-DD HH:mm:ss');
    },
    // 页面跳转
    gotoPage(url) {
      uni.navigateTo({
        url: url
      });
    },
    // 搜索
    mySearch(value) {
      this.mescroll.resetUpScroll(false);
    }
  }
};
</script>
<style scoped lang="scss">
.listBox {
  padding: 20rpx 30rpx;

  .zonglan {
    margin-top: 20rpx;
    .listBoxItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .listItem {
        text-align: center;
        .text1 {
          font-weight: bold;
          font-size: 34rpx;
          color: #333;
        }
        .text2 {
          padding-top: 10rpx;
          font-size: 25rpx;
          color: #999;
        }
      }
    }
  }
}

.detailsBox {
  padding: 0 30rpx;

  .detailsItem {
    background-color: #fff;
    border: 1px solid #f1f1f1;
    padding: 26rpx 16rpx;
    border-radius: 10rpx;
    margin-bottom: 30rpx;
    &:last-of-type {
      margin-bottom: 0;
    }

    > .time {
      font-size: 24rpx;
      color: #aaa;
      display: block;
    }

    .info {
      padding: 20rpx;
      border-radius: 10rpx;
      background-color: #fafafa;
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      .left {
        flex: none;
      }
      .right {
        line-height: 40rpx;
        flex: auto;
        margin-left: 30rpx;
        .text1 {
          font-size: 28rpx;
          margin-bottom: 14rpx;
        }
        .text2 {
          font-size: 26rpx;
        }
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20rpx;
      .bottomItem {
        margin-right: 40rpx;
        .text {
          flex: none;
          line-height: 40rpx;
          font-size: 26rpx;
          color: #333;
        }
        .text2 {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
