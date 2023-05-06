<template>
  <view class="container">
    <view class="info">
      <view class="avatar"><u-avatar :src="dataObj.avatar || dataObj.savatar"></u-avatar></view>
      <view class="name">
        <text>{{ dataObj.nickname || dataObj.snickName }}</text>
      </view>
      <view class="tel">
        <text>手机号码：{{ dataObj.mobile }}</text>
        <text class="btn" @tap="tel(dataObj.mobile)">联系</text>
      </view>
      <!-- <view class="address"><text>客户位置：浙江省杭州市拱墅区万达写字楼</text></view> -->
    </view>

    <!-- 间隔 -->
    <view style="margin:0 -20rpx;">
      <u-gap height="6" marginTop="10rpx" marginBottom="10rpx" bgColor="#efefef"></u-gap>
    </view>

    <view class="listWarpper">
      <view class="top">
        <text class="text">阅读次数：{{ dataObj.readerCount }}篇</text>
        <text class="text">线索量：{{ dataObj.transmitCount }}条</text>
        <text class="text">转发量：{{ dataObj.watchVideoCount }}次</text>
      </view>
      <view style="margin:0 -20rpx;">
        <u-gap height="1" marginTop="10rpx" marginBottom="10rpx" bgColor="#efefef"></u-gap>
      </view>

      <view class="listContainer">
        <view class="title">
          <text style="font-weight: bold;">历史记录</text>
          <text>（共计 {{ (dataObj.list && dataObj.list.length) || 0 }} 条）</text>
        </view>

        <view class="dataListItem" v-for="(item, index) in dataObj.list" :key="item.id">
          <view class="dataListItemBox">
            <view class="title">
              <text class="type">
                {{
                  item.sourceMaterialType === 1
                    ? '文章'
                    : item.sourceMaterialType === 2
                    ? '视频'
                    : item.sourceMaterialType === 3
                    ? '海报'
                    : ''
                }}
              </text>
              <text class="name">{{ item.name }}</text>
            </view>

            <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>

            <view class="dataListItemBottom">
              <text class="text1">最新阅读时间</text>
              <text class="text2">{{ mDayJs(item.createTime) }}</text>
            </view>
            <view class="dataListItemBottom">
              <text class="text1">阅读次数</text>
              <text class="text2">{{ item.heat }}</text>
            </view>
            <view class="dataListItemBottom">
              <text class="text1">转发次数</text>
              <text class="text2">{{ item.isTransmit }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dayJs from 'dayjs';
import { getMemberUserOneList } from '@/api/materialLibrary.js';
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
    // 获取数据列表
    async getList() {
      const res = await getMemberUserOneList({
        id: this.id
      });
      this.dataObj = res.data;
    },
    // 拨打电话
    tel(val) {
      uni.makePhoneCall({
        phoneNumber: val
      });
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

.container {
  padding: 20rpx;

  .info {
    text-align: center;
    line-height: 1.8;
    font-size: 27rpx;

    .avatar {
      display: inline-block;
    }

    .name {
      font-weight: bold;
    }

    .tel {
      .btn {
        background-color: $main-color;
        color: #fff;
        font-size: 24rpx;
        padding: 2rpx 10rpx;
        border-radius: 10rpx;
        margin-left: 20rpx;
      }
    }
  }

  .listWarpper {
    .top {
      font-size: 26rpx;
      margin: 0 -20rpx;
      line-height: 2;

      .text {
        margin: 0 20rpx;
      }
    }

    .listContainer {
      > .title {
        font-size: 26rpx;
      }

      .dataListItem {
        .dataListItemBox {
          margin-top: 20rpx;
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
  }
}
</style>
