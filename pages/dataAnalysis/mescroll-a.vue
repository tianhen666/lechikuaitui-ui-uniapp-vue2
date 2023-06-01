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
            <text class="text1">{{ totalShare }}</text>
            <text class="text2">分享总量</text>
          </view>
          <view class="listItem">
            <text class="text1">{{ totalRead }}</text>
            <text class="text2">浏览总量</text>
          </view>
          <view class="listItem">
            <text class="text1">{{ articleClue }}</text>
            <text class="text2">文章总浏览</text>
          </view>
          <view class="listItem">
            <text class="text1">{{ videoClues }}</text>
            <text class="text2">视频总浏览</text>
          </view>
        </view>
      </view>
    </view>

    <mescroll-uni
      @init="mescrollInit"
      :height="height"
      :disable-scroll="disableScroll"
      :down="downOption"
      @down="downCallback"
      :up="upOption"
      @up="upCallback"
      @emptyclick="emptyClick"
      :bottombar="false"
      bottom="110px"
    >
      <!-- 数据列表 -->
      <view class="dataList">
        <view
          class="dataListItem"
          v-for="(item, index) in dataList"
          :key="item.id"
          @tap.stop="_$goToPage(`/pages/dataDetails/dataDetails?id=${item.id}`)"
        >
          <text class="time">最新浏览时间：{{ _$mDayJs(item.createTime) }}</text>

          <view class="type">
            <text>
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
          </view>

          <!-- 文章显示 -->
          <view class="warpper123123" v-if="item.sourceMaterialType === 1">
            <view class="img_box">
              <image mode="aspectFill" class="img" :src="item.coverImage"></image>
            </view>

            <view class="warpper123123_right">
              <view class="title">
                <text>{{ item.name }}</text>
              </view>
              <!-- <text class="desc">{{ item.description  }}</text> -->
            </view>
          </view>

          <!-- 视频显示 -->
          <view class="warpper456456" v-if="item.sourceMaterialType === 2">
            <view class="title">
              <text>{{ item.name }}</text>
            </view>
            <view class="imgBox">
              <!-- 视频播放图标 -->
              <view class="play-icon"></view>
              <image
                mode="heightFix"
                class="img"
                src="http://resources.lechiwl.cn/2.png?imageView2/0/w/300/h/360/q/75"
              ></image>
            </view>
          </view>

          <!-- 海报显示 -->
          <view class="warpper456456" v-if="item.sourceMaterialType === 3">
            <view class="title">
              <text>{{ item.name }}</text>
            </view>
            <view class="imgBox">
              <image
                mode="heightFix"
                class="img"
                src="http://resources.lechiwl.cn/2.png?imageView2/0/w/300/h/360/q/75"
              ></image>
            </view>
          </view>

          <view class="bottom">
            <view class="dataListItemBottom">
              <text class="text1">浏览总次数:</text>
              <text class="text2">{{ item.heat }}次</text>
            </view>
            <view class="dataListItemBottom">
              <text class="text1">浏览总人数:</text>
              <text class="text2">{{ item.threadCount }}人</text>
            </view>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getSourceMaterialDataViewDO } from '@/api/materialLibrary.js';
import dayJs from 'dayjs';

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
      searchName: '', // 搜索关键字

      dataList: [], //列表数据
      articleClue: 0, //文章浏览
      totalRead: 0, // 阅读总量
      totalShare: 0, // 分享总量
      videoClues: 0 //视频浏览
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
    this.loadData();
  },
  methods: {
    loadData() {
      setTimeout(() => {
        this.mescroll.resetUpScroll(true);
      }, 500);
    },
    downCallback() {
      this.loadData();
    },
    upCallback(page) {
      //联网加载数据
      // let keyword = this.tabs[this.i].name;
      getSourceMaterialDataViewDO({
        name: this.searchName,
        pageNo: page.num,
        pageSize: page.size
      })
        .then(res => {
          this.mescroll.endSuccess(res.data.dataPageResult.length, true);
          this.articleClue = res.data.articleClue; //文章线索
          this.totalRead = res.data.totalRead; // 阅读总量
          this.totalShare = res.data.totalShare; // 分享总量
          this.videoClues = res.data.videoClues; //视频线索

          if (page.num === 1) this.dataList.length = 0;
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
    // 搜索
    mySearch(value) {
      this.loadData();
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
}

.dataList {
  padding: 0rpx 30rpx;
  .dataListItem {
    position: relative;
    margin-top: 10rpx;
    padding: 16rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    border: 1px solid #f1f1f1;

    &:last-of-type {
      margin-bottom: 0;
    }

    .time {
      font-size: 25rpx;
      color: #aaa;
      display: block;
    }
    .type {
      background-color: $main-color;
      color: #fff;
      font-size: 20rpx;
      text-align: center;
      width: 80rpx;
      height: 30rpx;
      line-height: 30rpx;
      border-radius: 20rpx;
      position: absolute;
      right: 16rpx;
      top: 16rpx;
    }

    /*文章显示*/
    .warpper123123 {
      background-color: #fafafa;
      border-radius: 10rpx;
      display: flex;
      padding: 20rpx;
      margin-top: 20rpx;
      .img_box {
        float: none;
        width: 200rpx;
        .img {
          border-radius: 10rpx;
          overflow: hidden;
          width: 200rpx;
          height: 200rpx * 3 * 0.25;
          display: block;
        }
      }
      .warpper123123_right {
        flex: auto;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 6rpx;
        .title {
          font-size: 26rpx;
          line-height: 1.6;
          margin-top: 20rpx;
          color: #929292;
          @include overHeiddenText(2);
        }
        .desc {
          width: 100%;
          display: block;
          font-size: 26rpx;
          line-height: 1.8;
          text-align: justify;
          @include overHeiddenText(1);
        }
        .tips {
          display: block;
          font-size: 24rpx;
          color: #aaa;
        }
      }
    }

    /*视频显示*/
    .warpper456456 {
      background-color: #f1f1f1;
      padding: 20rpx;
      margin-top: 20rpx;
      border-radius: 10rpx;
      .title {
        font-size: 26rpx;
        line-height: 1.6;
        margin-bottom: 10rpx;
        color: #929292;
        @include overHeiddenText(2);
        text-align: center;
      }
      .imgBox {
        position: relative;
        height: 300rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          height: 100%;
        }
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      .dataListItemBottom {
        flex: none;
        line-height: 40rpx;
        margin-right: 40rpx;
        font-size: 26rpx;
        color: #333;
        .text1 {
          margin-right: 10rpx;
        }
        .text2 {
          font-weight: bold;
        }
      }
    }
  }
}

.play-icon {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 50rpx;
  height: 50rpx;
  margin-left: -25rpx;
  margin-top: -25rpx;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon:before {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10rpx 0 10rpx 18rpx;
  border-color: transparent transparent transparent #fff;
}
</style>
