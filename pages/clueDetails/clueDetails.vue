<template>
  <mescroll-body
    @init="mescrollInit"
    @up="upCallback"
    :down="downOption"
    :up="upOption"
    :bottombar="false"
  >
    <view class="container">
      <!--  个人信息 -->
      <view class="info">
        <view class="left"><u-avatar :src="dataObj.avatar || dataObj.savatar"></u-avatar></view>

        <view class="right">
          <view class="text1">{{ dataObj.nickname || dataObj.snickName }}</view>
          <view class="text2">
            <text>联系电话：{{ dataObj.mobile || '无' }}</text>
            <text class="btn" @tap="tel(dataObj.mobile)" v-if="dataObj.mobile">联系</text>
          </view>
        </view>
      </view>
      <!-- 个人信息 end -->

      <view class="listBox">
        <view class="zonglan">
          <view class="listBoxItem">
            <view class="listItem">
              <text class="text1">{{ dataObj.readerCount || 0 }}</text>
              <text class="text2">浏览总次数</text>
            </view>
            <view class="listItem">
              <text class="text1">{{ dataObj.userCount }}</text>
              <text class="text2">浏览素材总数量</text>
            </view>
          </view>
        </view>
      </view>

      <view class="dataList">
        <view class="dataListItem" v-for="(item, index) in dataList" :key="item.id">
          <text class="time">最新浏览时间：{{ mDayJs(item.createTime) }}</text>
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
          </view>

          <!-- end -->
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import dayJs from 'dayjs';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getMemberUserOneList } from '@/api/materialLibrary.js';
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
    async upCallback(page) {
      const res = await getMemberUserOneList({
        id: this.id,
        pageNo: page.num,
        pageSize: page.size
      });
      if (page.num == 1) this.dataList.length = 0;
      this.dataList.push(...res.data.list);
      this.dataObj = res.data;

      // 当前页加载完成
      this.mescroll.endBySize(res.data.list.length, res.data.userCount);
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
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.container {
  padding: 20rpx 30rpx 40rpx;

  .info {
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    border: 1px solid #f1f1f1;
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
        .btn {
          text-align: center;
          display: inline-block;
          font-size: 20rpx;
          background-color: $main-color;
          color: #fff;
          width: 80rpx;
          height: 30rpx;
          line-height: 30rpx;
          border-radius: 20rpx;
          margin-left: 20rpx;
        }
      }
    }
  }

  .listBox {
    padding: 20rpx 0rpx;

    .zonglan {
      margin-top: 20rpx;
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
  }

  .dataList {
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
}
</style>
