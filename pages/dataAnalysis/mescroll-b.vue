<template>
  <view class="warpper">
    <view class="boxTop">
      <view class="search"><u-search placeholder="输入关键词搜索" v-model="searchName" @search="mySearch"
          @custom="mySearch"></u-search></view>
      <view class="total"><text>线索量 {{total}}条</text></view>
    </view>

    <mescroll-uni @init="mescrollInit" :height="height" :disable-scroll="disableScroll" :down="downOption"
      :up="upOption" @up="upCallback" @emptyclick="emptyClick">
      <view class="detailsBox">
        <view class="detailsItem" v-for="(item,index) in dataList" :key="item.id"
          @tap.stop="gotoPage(`/pages/clueDetails/clueDetails?id=${item.id}`)">
          <view class="time">最近访问：{{mDayJs(item.createTime)}}</view>
          <u-gap height="1rpx" marginTop="8rpx" marginBottom="8rpx" bgColor="#bbb"></u-gap>

          <view class="info">
            <view class="left"><u-avatar :src="item.avatar"></u-avatar></view>

            <view class="right">
              <view class="text1">{{item.nickname}}</view>
              <view class="text2">联系电话:{{item.mobile}}</view>
              <!-- <view class="text2">客户位置：xxxxxxxx</view> -->
              <!-- <view class="text2">距离：2.5km</view> -->
            </view>
          </view>

          <u-gap height="1rpx" marginTop="8rpx" marginBottom="8rpx" bgColor="#bbb"></u-gap>

          <view class="bottom">
            <view class="text text1">转发：{{item.readerCount}}次</view>
            <view class="text text2">文章阅读：{{item.transmitCount}}次</view>
            <view class="text text3">观看视频：{{item.watchVideoCount}}次</view>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
  import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
  import MescrollMoreItemMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js';
  import dayJs from 'dayjs'
  import {
    getMemberUserList
  } from '@/api/materialLibrary.js';

  export default {
    mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
    data() {
      return {
        downOption: {
          use: false // 禁用
        },
        upOption: {
          auto: true,
          empty: {
            tip: '~ 空空如也 ~',
            btnText: '去看看'
          }
        },
        dataList: [], //列表数据
        searchName: '',
        total: 0
      };
    },
    props: {
      index: {
        type: Number,
        default () {
          return 0;
        }
      },
      tabs: {
        type: Array,
        default () {
          return [];
        }
      },
      height: [Number, String], // mescroll的高度
      disableScroll: Boolean // 是否禁止滚动, 默认false
    },
    methods: {
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        // let keyword = this.tabs[this.i].name;
        getMemberUserList({
            nickName: this.searchName,
            pageNo: page.num,
            pageSize: page.size,
          })
          .then(res => {
            this.mescroll.endBySize(res.data.list.length, res.data.total);

            this.total = res.data.total //数据总量

            if (page.num === 1) this.dataList.lenght = 0
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
        return dayJs(val).format("YYYY-MM-DD HH:mm:ss")
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
  .boxTop {
    margin: 20rpx 30rpx 0rpx;

    .search {
      margin-bottom: 20rpx;
    }

    .total {
      font-size: 26rpx;
      color: #666;
    }
  }

  .detailsBox {
    padding: 0 30rpx;

    .detailsItem {
      background-color: #efefef;
      padding: 26rpx 16rpx;
      margin: 30rpx 0;
      border-radius: 10rpx;

      >.time {
        font-size: 24rpx;
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