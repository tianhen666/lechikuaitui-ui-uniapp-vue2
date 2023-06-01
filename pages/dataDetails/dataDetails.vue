<template>
  <mescroll-body
    @init="mescrollInit"
    @up="upCallback"
    :down="downOption"
    :up="upOption"
    :bottombar="false"
  >
    <view class="dataDetails">
      <view class="box">
        <view class="listBoxItem">
          <view class="listItem">
            <text class="text1">{{ dataObj.heat }}</text>
            <text class="text2">浏览总次数</text>
          </view>
          <view class="listItem">
            <text class="text1">{{ dataObj.threadCount }}</text>
            <text class="text2">浏览总人数</text>
          </view>
        </view>
      </view>

      <view class="detailsBox">
        <view class="detailsItem" v-for="(item, index) in dataList" :key="item.id">
          <view class="time">最新浏览时间：{{ _$mDayJs(item.createTime) }}</view>

          <view class="info">
            <view class="left"><u-avatar :src="item.avatar || item.savatar"></u-avatar></view>

            <view class="right">
              <view class="text1">{{ item.nickname || item.snickName }}</view>
              <view class="text2">联系电话：{{ item.mobile || '无' }}</view>
            </view>
          </view>

          <view class="bottom">
            <view class="bottomItem">
              <text class="text text1">浏览次数：</text>
              <text class="text text2">{{ item.userCount }}次</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import dayJs from 'dayjs';
import { getSourceMaterialDetailsViewDO } from '@/api/materialLibrary.js';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      upOption: {
        auto: false,
        textNoMore: '--已经到底了--'
      },
      downOption: {
        use: false
      },
      id: 0,
      dataObj: {},
      dataList: []
    };
  },
  async onLoad({ id }) {
    this.id = Number(id) || 0;

    // 等待onLaunch 加载完成
    await this.$onLaunched;

    this.mescroll.resetUpScroll(false);
  },
  methods: {
    loadData() {
      setTimeout(() => {
        this.mescroll.resetUpScroll(false);
      }, 500);
    },
    // 上拉回调
    async upCallback(page) {
      const res = await getSourceMaterialDetailsViewDO({
        id: this.id,
        pageNo: page.num,
        pageSize: page.size
      });
      this.dataObj = res.data;

      if (page.num == 1) this.dataList.length = 0;
      this.dataList.push(...res.data.userList);
      this.dataObj = res.data;

      setTimeout(() => {
        // 当前页加载完成
        this.mescroll.endBySize(res.data.userList.length, res.data.threadCount);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.dataDetails {
  padding-bottom: 40rpx;
}
.box {
  padding: 20rpx 30rpx;

  .listBoxItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .listItem {
      text-align: center;
      margin-right: 80rpx;

      .text1 {
        font-weight: bold;
        font-size: 34rpx;
        display: block;
        color: #333;
      }

      .text2 {
        padding-top: 10rpx;
        font-size: 25rpx;
        display: block;
        color: #999;
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
