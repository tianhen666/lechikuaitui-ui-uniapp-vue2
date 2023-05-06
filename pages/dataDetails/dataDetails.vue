<template>
  <view>
    <view class="box">
      <text class="time">分享时间：{{ mDayJs(dataObj.createTime) }}</text>

      <view class="title">
        <text class="type">
          {{
            dataObj.sourceMaterialType === 1
              ? '文章'
              : dataObj.sourceMaterialType === 2
              ? '视频'
              : dataObj.sourceMaterialType === 3
              ? '海报'
              : ''
          }}
        </text>
        <text class="name">{{ dataObj.name }}</text>
      </view>

      <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>

      <view class="listBoxItem">
        <view class="listItem">
          <text class="text1">{{ dataObj.heat }}</text>
          <text class="text2">阅读次数</text>
        </view>
        <view class="listItem">
          <text class="text1">{{ dataObj.threadCount }}</text>
          <text class="text2">线索量</text>
        </view>
        <view class="listItem">
          <text class="text1">{{ dataObj.transmitCount }}</text>
          <text class="text2">转发量</text>
        </view>
      </view>
    </view>

    <!-- 间隔条 -->
    <u-gap height="16rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#eee"></u-gap>

    <view class="detailsBox">
      <view class="detailsItem" v-for="(item, index) in dataObj.userList" :key="item.id">
        <view class="time">最近访问：{{ mDayJs(item.createTime) }}</view>
        <u-gap height="1rpx" marginTop="8rpx" marginBottom="8rpx" bgColor="#bbb"></u-gap>

        <view class="info">
          <view class="left"><u-avatar :src="item.avatar || item.savatar"></u-avatar></view>

          <view class="right">
            <view class="text1">{{ item.nickname || item.snickName }}</view>
            <view class="text2">联系电话:{{ item.mobile }}</view>
            <!-- <view class="text2">客户位置：xxxxxxxx</view> -->
            <!-- <view class="text2">距离：2.5km</view> -->
          </view>
        </view>

        <u-gap height="1rpx" marginTop="8rpx" marginBottom="8rpx" bgColor="#bbb"></u-gap>

        <view class="bottom">
          <view class="text text1">阅读次数：{{ item.userCount }}次</view>
          <!-- <view class="text text2">文章阅读：{{item.transmitCount}}次</view> -->
          <!-- <view class="text text3">观看视频：{{item.watchVideoCount}}次</view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dayJs from 'dayjs';
import { getSourceMaterialDetailsViewDO } from '@/api/materialLibrary.js';
export default {
  data() {
    return {
      id: 0,
      dataObj: {}
    };
  },
  onLoad({ id }) {
    this.id = id;
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getSourceMaterialDetailsViewDO({
        id: this.id
      });
      this.dataObj = res.data;
    },
    // 时间转换
    mDayJs(val) {
      return dayJs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}

.box {
  padding: 20rpx 30rpx;

  > .time {
    font-size: 26rpx;
    color: #aaa;
  }

  > .title {
    margin-top: 16rpx;
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

  .listBoxItem {
    margin-top: 20rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .listItem {
      text-align: center;
      margin-right: 80rpx;

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

.detailsBox {
  padding: 0 30rpx;

  .detailsItem {
    background-color: #efefef;
    padding: 26rpx 16rpx;
    margin: 30rpx 0;
    border-radius: 10rpx;

    > .time {
      font-size: 26rpx;
      color: #aaa;
    }

    .info {
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
          font-weight: bold;
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
      justify-content: space-between;
      margin-top: 20rpx;

      .text {
        font-size: 25rpx;
      }
    }
  }
}
</style>
