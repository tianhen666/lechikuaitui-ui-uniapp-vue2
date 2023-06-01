<template>
  <view class="box">
    <view class="t">
      <view class="left">
        <image mode="aspectFill" class="img" src="/static//images/empty/icon1.jpeg"></image>
      </view>
      <view class="center">
        <text class="text">{{ itemData.tag || '优选海报' }}</text>
        <text class="time">{{ _$mDayJs(itemData.createTime) }}</text>
      </view>
      <view class="right" @tap.stop="verifyPopupShareTap">
        <button class="botton">{{ itemData.shareText || '立即分享' }}</button>
      </view>
    </view>

    <view
      class="c"
      @tap.stop="_$verifyPopupGoToPage(`/pages/generatePoster/generatePoster?id=${itemData.id}`)"
    >
      <!-- <view class="title">{{ itemData.name }}</view> -->
      <view class="warpper">
        <view class="postImg">
          <image
            class="img"
            mode="widthFix"
            :src="itemData.content + '?imageView2/0/w/300/h/360/q/75'"
          ></image>
        </view>
      </view>
    </view>

    <view class="b">
      <view class="views">
        <view style="margin-right: 30rpx;">
          <u-icon
            name="eye"
            color="#aaa"
            size="34rpx"
            :label="'浏览 ' + itemData.heat"
            labelSize="24rpx"
            labelColor="#aaa"
            space="10rpx"
          ></u-icon>
        </view>

        <view
          style="margin-right: 30rpx;"
          @click.stop="verifyPopupCopy(itemData.name)"
          :class="'copyText' + itemData.id"
        >
          <u-icon
            name="file-text"
            color="#aaa"
            size="34rpx"
            :label="'复制文案'"
            labelSize="24rpx"
            labelColor="#aaa"
            space="10rpx"
          ></u-icon>
        </view>

        <view
          :class="'creatPoster' + itemData.id"
          @tap.stop="
            _$verifyPopupGoToPage(`/pages/generatePoster/generatePoster?id=${itemData.id}`)
          "
        >
          <u-icon
            name="photo"
            color="#aaa"
            size="34rpx"
            :label="'生成海报'"
            labelSize="24rpx"
            labelColor="#aaa"
            space="10rpx"
          ></u-icon>
        </view>
      </view>
    </view>

    <!-- 提示弹窗 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$tipsPopupBtn1"
    ></m-uni-popup>

    <!-- 引导 -->
    <m-xky-guideStep ref="guideStep" :step="step"></m-xky-guideStep>
  </view>
</template>

<script>
export default {
  name: 'm-article-style',
  props: {
    itemData: Object
  },
  data() {
    const step = {
      name: 'creatPosterTisp',
      repeat: true,
      guideList: [
        {
          el: '.copyText' + this.itemData.id,
          tips: '步骤一,复制海报文案',
          style: 'border-radius: 8rpx;margin: 0;',
          next: '下一步'
        },
        {
          el: '.creatPoster' + this.itemData.id,
          tips: '步骤二,生成海报',
          style: 'border-radius: 8rpx;margin: 0;',
          next: '完成'
        }
      ]
    };
    return {
      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: '',

      step: step //引导步骤
    };
  },
  methods: {
    /** 验证后分享提示  */
    verifyPopupShareTap() {
      if (this._$verifyPopup()) {
        // 引导步骤
        this.$refs.guideStep.getDomInfo();
      }
    },
    /** 验证后复制  */
    verifyPopupCopy(val) {
      if (this._$verifyPopup()) {
        this._$copy(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid #f1f1f1;
  background-color: #fff;
  margin: 24rpx 18rpx;
  padding: 20rpx 20rpx 30rpx;
  border-radius: 10rpx;
  overflow: hidden;
  > .t {
    display: flex;
    align-items: center;
    .left {
      flex: none;
      .img {
        width: 60rpx;
        height: 60rpx;
        display: block;
      }
    }
    .center {
      flex: auto;
      margin-left: 24rpx;
      .text {
        display: block;
        font-size: 28rpx;
        margin-bottom: 10rpx;
        font-weight: bold;
        color: $main-color;
      }
      .time {
        display: block;
        font-size: 24rpx;
        color: #aaa;
      }
    }
    .right {
      flex: none;
      .botton {
        background-color: $main-color;
        color: #fff;
        font-size: 22rpx;
        line-height: 2;
        padding: 0 12rpx;
        &:after {
          border: none;
        }
      }
    }
  }
  > .c {
    margin-top: 30rpx;
    padding-left: 84rpx;
    .title {
      font-size: 28rpx;
      @include overHeiddenText(2);
    }
    .warpper {
      border-radius: 10rpx;
      display: inline-block;
      .postImg {
        .img {
          width: 240rpx;
          display: block;
        }
      }
    }
  }
  > .b {
    padding-left: 84rpx;
    .views {
      display: flex;
      margin-top: 20rpx;
    }
  }
}
</style>
