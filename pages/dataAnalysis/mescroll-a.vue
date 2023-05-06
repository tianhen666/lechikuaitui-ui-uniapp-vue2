<template>
  <view class="warpper">
    <mescroll-uni @init="mescrollInit" :height="height" :disable-scroll="disableScroll" :down="downOption"
      :up="upOption" @up="upCallback" @emptyclick="emptyClick" :bottombar="false">
      <view class="listBox">
        <view class="zonglan">
          <view class="title"><text>数据详情</text></view>
          <view class="listBoxItem">
            <view class="listItem">
              <text class="text1">{{totalShare}}</text>
              <text class="text2">分享总量</text>
            </view>
            <view class="listItem">
              <text class="text1">{{totalRead}}</text>
              <text class="text2">阅读总量</text>
            </view>
            <view class="listItem">
              <text class="text1">{{videoClues}}</text>
              <text class="text2">视频线索</text>
            </view>
            <view class="listItem">
              <text class="text1">{{articleClue}}</text>
              <text class="text2">文章线索</text>
            </view>
          </view>
        </view>

        <!-- 间隔条 -->
        <view style="margin: 0 -20rpx;">
          <u-gap height="16rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#eee"></u-gap>
        </view>

        <!-- 数据列表 -->
        <view class="dataList">
          <u-search placeholder="输入关键字搜索" v-model="searchName" @search="mySearch" @custom="mySearch"></u-search>

          <view class="title">
            <text class="text1">数据详情</text>
            <text class="text2">共{{count}}篇</text>
          </view>

          <!-- 间隔 -->
          <view style="margin: 0 -20rpx;">
            <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>
          </view>

          <view class="dataListItem" v-for="(item,index) in dataList" :key="item.id"
            @tap.stop="gotoPage(`/pages/dataDetails/dataDetails?id=${item.id}`)">
            <text class="time">分享时间：{{mDayJs(item.createTime)}}</text>
            <view class="dataListItemBox">
              <view class="title">
                <text class="type">{{
                  item.sourceMaterialType===1?"文章":item.sourceMaterialType===2?"视频":item.sourceMaterialType===3?"海报":""
                }}</text>
                <text class="name">
                  {{item.name}}
                </text>
              </view>

              <u-gap height="1rpx" marginTop="20rpx" marginBottom="20rpx" bgColor="#bbb"></u-gap>

              <view class="dataListItemBottom">
                <text class="text1">阅读次数</text>
                <text class="text2">{{item.heat}}次</text>
              </view>
              <view class="dataListItemBottom">
                <text class="text1">获取线索量</text>
                <text class="text2">{{item.threadCount}}个</text>
              </view>
              <view class="dataListItemBottom">
                <text class="text1">转发总量</text>
                <text class="text2">{{item.transmitCount}}次</text>
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
  import {
    getSourceMaterialDataViewDO
  } from '@/api/materialLibrary.js'
  import dayJs from 'dayjs'

  export default {
    mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
    data() {
      return {
        downOption: {
          use: false // 禁用
        },
        upOption: {
          auto: true,
          textNoMore: "已经到底了",
          empty: {
            tip: '~ 空空如也 ~', // 提示
            btnText: '去看看'
          }
        },
        searchName: '', // 搜索关键字

        dataList: [], //列表数据
        articleClue: 0, //文章线索
        totalRead: 0, // 阅读总量
        totalShare: 0, // 分享总量
        videoClues: 0, //视频线索
        count: 0 // 总计多少个资源
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
        //联网加载数据
        // let keyword = this.tabs[this.i].name;

        getSourceMaterialDataViewDO({
            name: this.searchName
          })
          .then(res => {
            this.mescroll.endSuccess(res.data.dataPageResult, false)
            this.articleClue = res.data.articleClue //文章线索
            this.totalRead = res.data.totalRead // 阅读总量
            this.totalShare = res.data.totalShare // 分享总量
            this.videoClues = res.data.videoClues //视频线索
            this.count = res.data.count

            if (page.num === 1) this.dataList.lenght = 0
            this.dataList = this.dataList.concat(res.data.dataPageResult);
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
      // 跳转页面
      gotoPage(url) {
        uni.navigateTo({
          url: url
        });
      },
      // 时间转换
      mDayJs(val) {
        return dayJs(val).format("YYYY-MM-DD HH:mm:ss")
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
    >.title {
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

        >.title {
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